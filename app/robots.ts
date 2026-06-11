import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Crawlers are welcome everywhere except the machine-facing API routes and
// the Sanity Studio, which carry no public content worth indexing.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
