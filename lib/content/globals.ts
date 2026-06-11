import type { Lang } from "@/lib/i18n";
import { USE_SANITY } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/live";
import { globalsQuery } from "@/lib/sanity/queries";
import { mapGlobals, type GlobalsContent } from "./from-sanity";

/**
 * Server-only helper: fetch the globals singleton (nav, phones, footer, social,
 * call-out copy) and map it to the app shape, with static fallback when Sanity
 * is off or the document is missing. Safe to call from any Server Component.
 */
export async function getGlobals(lang: Lang): Promise<GlobalsContent> {
  const doc = USE_SANITY ? (await sanityFetch({ query: globalsQuery })).data : null;
  return mapGlobals(doc, lang);
}
