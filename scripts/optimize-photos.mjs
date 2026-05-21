import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import { join, dirname, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PHOTOS = join(__dirname, "..", "public", "photos");
const OUT = join(__dirname, "..", "public", "photos-opt");

const MAX_WIDTH = 2200;
const QUALITY = 78;

async function walk(dir, files = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, files);
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

async function ensureDir(d) {
  try {
    await mkdir(d, { recursive: true });
  } catch {}
}

const files = await walk(PHOTOS);
console.log(`Found ${files.length} photos. Optimizing...`);

let totalIn = 0;
let totalOut = 0;

for (const f of files) {
  const rel = f.substring(PHOTOS.length + 1);
  const outDir = join(OUT, dirname(rel));
  await ensureDir(outDir);

  const outBase = basename(rel, extname(rel));
  const outFile = join(outDir, `${outBase}.jpg`);

  const inStat = await stat(f);
  totalIn += inStat.size;

  await sharp(f)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
    .toFile(outFile);

  const outStat = await stat(outFile);
  totalOut += outStat.size;

  const pct = ((1 - outStat.size / inStat.size) * 100).toFixed(0);
  console.log(`  ${rel}: ${(inStat.size / 1024).toFixed(0)}KB → ${(outStat.size / 1024).toFixed(0)}KB (-${pct}%)`);
}

console.log(`\nTotal: ${(totalIn / 1024 / 1024).toFixed(1)}MB → ${(totalOut / 1024 / 1024).toFixed(1)}MB`);
