import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Every public route on the site, expressed relative to the language segment.
// The empty string is the localized home page (/ar, /en).
const ROUTES = [
  "",
  "/atelier",
  "/packages",
  "/celebrations",
  "/services",
  "/heritage",
  "/journal",
  "/consult",
  "/contact",
] as const;

// Both locales are first-class citizens: Arabic is canonical, English is the
// full mirror. Each entry therefore carries hreflang alternates so search
// engines pair the two versions instead of treating them as duplicates.
const LANGS = ["ar", "en"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  // A single timestamp for the whole generation pass keeps the file
  // internally consistent — the sitemap is rebuilt on deploy anyway.
  const lastModified = new Date();

  return ROUTES.flatMap((route) =>
    LANGS.map((lang) => ({
      url: `${SITE_URL}/${lang}${route}`,
      lastModified,
      // The home page is the living entry point; inner pages change with
      // the atelier's seasonal rhythm, so monthly is honest.
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      // Packages and consult are the commercial heart of the site and
      // deserve crawl priority just below the home page itself.
      priority:
        route === ""
          ? 1
          : route === "/packages" || route === "/consult"
            ? 0.9
            : 0.7,
      alternates: {
        languages: {
          ar: `${SITE_URL}/ar${route}`,
          en: `${SITE_URL}/en${route}`,
        },
      },
    })),
  );
}
