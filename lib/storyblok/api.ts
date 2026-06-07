import { apiPlugin, getStoryblokApi, storyblokInit } from "@storyblok/react/rsc";

/**
 * Storyblok client bootstrap (RSC).
 *
 * We use Storyblok HEADLESS: stories are fetched as plain data and fed into
 * the existing hand-built React components. We deliberately do NOT register a
 * blok→component map, because the site's motion/design components (BishtReveal,
 * ActsParallax, WaxSealButton, …) must stay code-owned and are not modelled as
 * Storyblok bloks.
 *
 * Everything here is inert unless USE_STORYBLOK is true AND a delivery token is
 * present, so the static build is untouched when the flag is off.
 */

export const USE_STORYBLOK = process.env.NEXT_PUBLIC_USE_STORYBLOK === "true";

const TOKEN = process.env.NEXT_PUBLIC_STORYBLOK_TOKEN;
const REGION = (process.env.NEXT_PUBLIC_STORYBLOK_REGION ||
  "eu") as "eu" | "us" | "ap" | "ca" | "cn";

let didInit = false;

/** Idempotently initialise the Storyblok API. Throws only if called with the
 *  flag on but no token configured (a misconfiguration we want to surface). */
export function ensureStoryblok(): void {
  if (didInit) return;
  if (!TOKEN) {
    throw new Error(
      "[storyblok] NEXT_PUBLIC_STORYBLOK_TOKEN is missing but USE_STORYBLOK is enabled."
    );
  }
  storyblokInit({
    accessToken: TOKEN,
    use: [apiPlugin],
    apiOptions: { region: REGION },
  });
  didInit = true;
}

export { getStoryblokApi };
