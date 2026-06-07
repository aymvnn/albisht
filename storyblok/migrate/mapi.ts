/**
 * Storyblok Management API client + helpers.
 *
 * Run with tsx (see package.json scripts). Requires env:
 *   STORYBLOK_OAUTH_TOKEN  — Personal Access Token (Account → Access Tokens)
 *   STORYBLOK_SPACE_ID     — numeric space id
 *   STORYBLOK_REGION       — eu (default) | us | ap | ca
 *
 * Everything is idempotent: stories/components/folders are matched by
 * slug/name and updated in place, so the migration can be re-run safely.
 */

import crypto from "node:crypto";

const TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = process.env.STORYBLOK_SPACE_ID;
const REGION = (process.env.STORYBLOK_REGION || "eu").toLowerCase();

if (!TOKEN || !SPACE_ID) {
  throw new Error(
    "Missing STORYBLOK_OAUTH_TOKEN or STORYBLOK_SPACE_ID. See storyblok/README.md."
  );
}

const MAPI_BASE =
  REGION === "us"
    ? "https://api-us.storyblok.com/v1"
    : REGION === "ap"
    ? "https://api-ap.storyblok.com/v1"
    : REGION === "ca"
    ? "https://api-ca.storyblok.com/v1"
    : "https://mapi.storyblok.com/v1";

export const SPACE = SPACE_ID;
export const BASE = MAPI_BASE;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Authenticated MAPI request with 429 back-off. */
export async function mapi<T = any>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const url = `${MAPI_BASE}/spaces/${SPACE_ID}${path}`;
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(url, {
      method,
      headers: {
        Authorization: TOKEN as string,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 429) {
      const wait = 1000 * (attempt + 1);
      console.warn(`  · rate-limited, waiting ${wait}ms…`);
      await sleep(wait);
      continue;
    }
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`MAPI ${method} ${path} → ${res.status}: ${text}`);
    }
    // gentle pacing to stay under the per-second cap
    await sleep(120);
    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
  }
  throw new Error(`MAPI ${method} ${path} gave up after repeated 429s`);
}

/* ---- i18n helper ----------------------------------------------------- */

/**
 * Emit a field fragment carrying both the default (Arabic) value and its
 * English field-level translation. Spread into a content / blok object:
 *   { ...tr("headline", "...ar...", "...en..."), price_qar: 39000 }
 * produces { headline, headline__i18n__en }.
 */
export function tr(key: string, ar: string, en: string): Record<string, string> {
  return { [key]: ar, [`${key}__i18n__en`]: en };
}

/** Build a nestable blok object with a component name + uid. */
export function blok(
  component: string,
  fields: Record<string, unknown>
): Record<string, unknown> {
  return { _uid: crypto.randomUUID(), component, ...fields };
}

/* ---- languages ------------------------------------------------------- */

export async function ensureLanguage(code: string, name: string): Promise<void> {
  const { space } = await mapi<{ space: { languages?: { code: string }[] } }>(
    "GET",
    ""
  );
  const langs = space.languages || [];
  if (langs.some((l) => l.code === code)) {
    console.log(`  language "${code}" already present`);
    return;
  }
  await mapi("PUT", "", {
    space: { languages: [...langs, { code, name }] },
  });
  console.log(`  added language "${code}" (${name})`);
}

/* ---- components ------------------------------------------------------ */

type ComponentDef = {
  name: string;
  display_name?: string;
  schema: Record<string, unknown>;
  is_root?: boolean;
  is_nestable?: boolean;
};

export async function upsertComponent(def: ComponentDef): Promise<void> {
  const { components } = await mapi<{ components: { id: number; name: string }[] }>(
    "GET",
    "/components"
  );
  const existing = components.find((c) => c.name === def.name);
  if (existing) {
    await mapi("PUT", `/components/${existing.id}`, { component: def });
    console.log(`  ~ component ${def.name}`);
  } else {
    await mapi("POST", "/components", { component: def });
    console.log(`  + component ${def.name}`);
  }
}

/* ---- stories & folders ---------------------------------------------- */

export type UpsertStoryInput = {
  name: string;
  slug: string;
  /** Full slug used to find an existing story (defaults to slug). */
  fullSlug?: string;
  contentType: string;
  content: Record<string, unknown>;
  parentId?: number;
  isStartpage?: boolean;
  publish?: boolean;
};

async function findStory(fullSlug: string): Promise<{ id: number } | null> {
  const data = await mapi<{ stories: { id: number; full_slug: string }[] }>(
    "GET",
    `/stories?with_slug=${encodeURIComponent(fullSlug)}`
  );
  return data.stories?.[0] ?? null;
}

export async function upsertStory(input: UpsertStoryInput): Promise<number> {
  const fullSlug = input.fullSlug ?? input.slug;
  const existing = await findStory(fullSlug);
  const story: Record<string, unknown> = {
    name: input.name,
    slug: input.slug,
    parent_id: input.parentId ?? 0,
    content: { component: input.contentType, ...input.content },
  };
  // Only touch is_startpage when explicitly requested — at the space root
  // Storyblok rejects setting it, and the default Home already is the startpage.
  if (input.isStartpage !== undefined) story.is_startpage = input.isStartpage;
  if (existing) {
    await mapi("PUT", `/stories/${existing.id}`, {
      story,
      publish: input.publish ? 1 : undefined,
    });
    console.log(`  ~ story ${fullSlug}`);
    return existing.id;
  }
  const created = await mapi<{ story: { id: number } }>("POST", "/stories", {
    story,
    publish: input.publish ? 1 : undefined,
  });
  console.log(`  + story ${fullSlug}`);
  return created.story.id;
}

export async function ensureFolder(
  name: string,
  slug: string,
  parentId = 0
): Promise<number> {
  const existing = await findStory(slug);
  if (existing) return existing.id;
  const created = await mapi<{ story: { id: number } }>("POST", "/stories", {
    story: { name, slug, parent_id: parentId, is_folder: true },
  });
  console.log(`  + folder ${slug}/`);
  return created.story.id;
}
