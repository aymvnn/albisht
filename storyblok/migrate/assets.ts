/**
 * Upload public/photos/** to the Storyblok Asset Library, organised into
 * folders by category (craft / hall / heritage / majlis / reveal), and write
 * storyblok/migrate/asset-map.json mapping each app path
 * ("/photos/<cat>/<file>") to its Storyblok asset { id, url, alt }.
 *
 * Idempotent: paths already present in asset-map.json are skipped, so re-runs
 * only upload new photos.
 *
 * Resilience: if you skip this step, the content migration falls back to the
 * original "/photos/..." paths, which the Next app still serves from /public.
 * Running this step is what lets the brand owner swap images in the CMS.
 */

import fs from "node:fs";
import path from "node:path";
import { BASE, SPACE, mapi } from "./mapi";

const TOKEN = process.env.STORYBLOK_OAUTH_TOKEN as string;
const PHOTOS_DIR = path.resolve(process.cwd(), "public", "photos");
const MAP_PATH = path.resolve(process.cwd(), "storyblok", "migrate", "asset-map.json");

type AssetRecord = { id: number | null; url: string; alt: string };
type AssetMap = Record<string, AssetRecord>;

function loadMap(): AssetMap {
  try {
    return JSON.parse(fs.readFileSync(MAP_PATH, "utf8")) as AssetMap;
  } catch {
    return {};
  }
}

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(jpe?g|png|webp|avif)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

async function ensureAssetFolder(name: string): Promise<number | undefined> {
  const data = await mapi<{ asset_folders: { id: number; name: string }[] }>(
    "GET",
    "/asset_folders"
  );
  const found = data.asset_folders?.find((f) => f.name === name);
  if (found) return found.id;
  const created = await mapi<{ asset_folder: { id: number } }>(
    "POST",
    "/asset_folders",
    { asset_folder: { name } }
  );
  console.log(`  + asset folder ${name}`);
  return created.asset_folder.id;
}

type Signed = {
  id: number;
  public_url: string;
  fields: Record<string, string>;
  post_url: string;
};

async function uploadOne(
  absPath: string,
  folderId: number | undefined
): Promise<AssetRecord> {
  const filename = path.basename(absPath);
  const size = fs.statSync(absPath).size;

  // 1) signed request
  const signed = await mapi<Signed>("POST", "/assets", {
    filename,
    size: `${size}`,
    asset_folder_id: folderId,
    validate_upload: 1,
  });

  // 2) upload binary to S3
  const buf = fs.readFileSync(absPath);
  const form = new FormData();
  for (const [k, v] of Object.entries(signed.fields)) form.append(k, v);
  form.append("file", new Blob([buf]), filename);
  const up = await fetch(signed.post_url, { method: "POST", body: form });
  if (!up.ok) throw new Error(`S3 upload failed for ${filename}: ${up.status}`);

  // 3) finalize (registers dimensions; tolerate non-fatal failure)
  try {
    await fetch(`${BASE}/spaces/${SPACE}/assets/${signed.id}/finish`, {
      method: "GET",
      headers: { Authorization: TOKEN },
    });
  } catch {
    /* public_url is already valid */
  }

  // Storyblok returns the raw S3 URL; normalise to the canonical CDN host
  // (a.storyblok.com) that next/image is configured to allow.
  const url = signed.public_url.replace(
    "https://s3.amazonaws.com/a.storyblok.com/",
    "https://a.storyblok.com/"
  );
  return { id: signed.id, url, alt: "" };
}

export async function uploadAssets() {
  if (!fs.existsSync(PHOTOS_DIR)) {
    console.error(`No photos dir at ${PHOTOS_DIR}`);
    process.exit(1);
  }
  const map = loadMap();
  const files = walk(PHOTOS_DIR);
  console.log(`Found ${files.length} photos; ${Object.keys(map).length} already mapped.`);

  // category folder cache
  const folderIds = new Map<string, number | undefined>();

  for (const abs of files) {
    const rel = "/" + path.relative(path.resolve(process.cwd(), "public"), abs).split(path.sep).join("/");
    if (map[rel]) continue; // already uploaded

    const category = path.basename(path.dirname(abs)); // craft / hall / …
    if (!folderIds.has(category)) {
      folderIds.set(category, await ensureAssetFolder(category));
    }
    try {
      const rec = await uploadOne(abs, folderIds.get(category));
      map[rel] = rec;
      console.log(`  ↑ ${rel} → ${rec.url}`);
      // persist after each upload so a crash doesn't lose progress
      fs.writeFileSync(MAP_PATH, JSON.stringify(map, null, 2));
    } catch (err) {
      console.error(`  ✗ ${rel}`, err);
    }
  }
  console.log(`Done. asset-map.json has ${Object.keys(map).length} entries.`);
}
