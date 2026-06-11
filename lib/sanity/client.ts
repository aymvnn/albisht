import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

/**
 * Sanity client. Inert unless USE_SANITY is true AND a real project id is set,
 * so the static build is untouched when the flag is off (mirrors the previous
 * Storyblok flag behaviour).
 */
export const USE_SANITY = process.env.NEXT_PUBLIC_USE_SANITY === "true";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // published reads from the CDN; draft reads bypass it via the token
});

const builder = imageUrlBuilder(client);

/** Resolve a Sanity image (object or asset ref) to a URL string, or "". */
export function urlFor(source: Image | undefined | null): string {
  if (!source) return "";
  try {
    return builder.image(source).auto("format").url();
  } catch {
    return "";
  }
}
