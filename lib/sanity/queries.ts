import { defineQuery } from "next-sanity";

/**
 * GROQ queries. Singletons are fetched by type ([0]); images come back as
 * objects and are resolved to URLs in the adapter via urlFor(). localeString
 * fields come back as { ar, en } and are picked by language in the adapter.
 */
export const homeQuery = defineQuery(`*[_type == "homePage"][0]`);
export const atelierQuery = defineQuery(`*[_type == "atelierPage"][0]`);
export const heritageQuery = defineQuery(`*[_type == "heritagePage"][0]`);
export const servicesQuery = defineQuery(`*[_type == "servicesPage"][0]`);
export const consultQuery = defineQuery(`*[_type == "consultPage"][0]`);
export const contactQuery = defineQuery(`*[_type == "contactPage"][0]`);
export const packagesQuery = defineQuery(`*[_type == "packagesPage"][0]`);
export const globalsQuery = defineQuery(`*[_type == "globals"][0]`);

/** Collections, oldest-first so the imported order (1,2,3) is preserved. */
export const journalQuery = defineQuery(
  `*[_type == "journalEntry"] | order(coalesce(publishedAt, _createdAt) asc)`
);
export const celebrationsQuery = defineQuery(
  `*[_type == "celebrationCase"] | order(coalesce(publishedAt, _createdAt) asc)`
);
/** Newest three for the home strip. */
export const celebrationsHomeQuery = defineQuery(
  `*[_type == "celebrationCase"] | order(coalesce(publishedAt, _createdAt) asc)[0...3]`
);
