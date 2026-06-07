import { draftMode } from "next/headers";
import type { Lang } from "@/lib/i18n";
import { ensureStoryblok, getStoryblokApi } from "./api";

/**
 * Thin fetch helpers over the Storyblok Content Delivery API.
 *
 * Language model: Arabic is the space's DEFAULT dimension, so `lang === "ar"`
 * is fetched with no `language` param. English is a field-level translation
 * dimension, fetched with `language: "en"`. Empty EN fields fall back to AR
 * automatically (Storyblok's `fallback_lang` behaviour, configured on the space).
 *
 * ISR: pages set `export const revalidate = 900` (15 min). Inside the Visual
 * Editor the request runs in Draft Mode, which fetches `version: "draft"` with
 * a cache-busting `cv`, so editors see unpublished changes immediately.
 */

async function isDraft(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    // draftMode() throws outside a request scope (e.g. at build time) — treat
    // as published.
    return false;
  }
}

function languageParam(lang: Lang): string | undefined {
  return lang === "ar" ? undefined : lang;
}

/** Fetch a single story's content by full slug (e.g. "globals", "pages/home"). */
export async function getStoryContent<T = Record<string, unknown>>(
  slug: string,
  lang: Lang
): Promise<T | null> {
  ensureStoryblok();
  const draft = await isDraft();
  try {
    const { data } = await getStoryblokApi().get(`cdn/stories/${slug}`, {
      version: draft ? "draft" : "published",
      language: languageParam(lang),
      cv: draft ? Date.now() : undefined,
    });
    return (data?.story?.content ?? null) as T | null;
  } catch (err) {
    console.error(`[storyblok] getStoryContent("${slug}") failed`, err);
    return null;
  }
}

export type StoryListItem<T> = {
  slug: string;
  fullSlug: string;
  name: string;
  uuid: string;
  content: T;
  publishedAt: string | null;
};

/** Fetch a list of stories under a folder (e.g. "journal", "celebrations"). */
export async function getStoryList<T = Record<string, unknown>>(
  params: {
    starts_with: string;
    per_page?: number;
    sort_by?: string;
    is_startpage?: boolean;
  },
  lang: Lang
): Promise<StoryListItem<T>[]> {
  ensureStoryblok();
  const draft = await isDraft();
  try {
    const { data } = await getStoryblokApi().get("cdn/stories", {
      version: draft ? "draft" : "published",
      language: languageParam(lang),
      cv: draft ? Date.now() : undefined,
      is_startpage: false,
      ...params,
    });
    return (data?.stories ?? []).map(
      (s: {
        slug: string;
        full_slug: string;
        name: string;
        uuid: string;
        content: T;
        published_at: string | null;
      }) => ({
        slug: s.slug,
        fullSlug: s.full_slug,
        name: s.name,
        uuid: s.uuid,
        content: s.content,
        publishedAt: s.published_at,
      })
    );
  } catch (err) {
    console.error(`[storyblok] getStoryList("${params.starts_with}") failed`, err);
    return [];
  }
}
