import type { Lang } from "@/lib/i18n";
import { USE_STORYBLOK } from "@/lib/storyblok/api";
import { getStoryContent } from "@/lib/storyblok/fetch";
import { mapGlobals, type GlobalsContent } from "./from-storyblok";
import type { SbGlobals } from "@/lib/storyblok/types";

/**
 * Server-only helper: fetch the site-wide globals story (nav, phones, footer,
 * social links, contact call-out copy) and map it to the app shape, falling
 * back to the static lib data when Storyblok is off or the story is missing.
 *
 * Safe to call from any Server Component (SiteFooter, ContactCallout, pages).
 */
export async function getGlobals(lang: Lang): Promise<GlobalsContent> {
  const sb = USE_STORYBLOK ? await getStoryContent<SbGlobals>("globals", lang) : null;
  return mapGlobals(sb, lang);
}
