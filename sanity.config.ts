import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool, defineLocations } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { SINGLETONS } from "./sanity/schemaTypes/documents";

/* The hosted Studio bundle only inlines SANITY_STUDIO_*-prefixed env vars —
   NEXT_PUBLIC_* is Next.js-only and compiles to undefined in `sanity deploy`.
   The project id is public (it appears in every API URL), so the literal
   fallback is safe and keeps one config working in both runtimes. */
const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  "y1819joy";
const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";
const previewOrigin =
  process.env.SANITY_STUDIO_PREVIEW_ORIGIN ||
  process.env.NEXT_PUBLIC_SANITY_PREVIEW_ORIGIN ||
  "http://localhost:3300";

const singletonSet = new Set<string>(SINGLETONS as readonly string[]);

/** Both-language locations for the Presentation (visual editing) tool. */
const both = (path: string, label: string) => ({
  locations: [
    { title: `${label} (AR)`, href: `/ar${path}` },
    { title: `${label} (EN)`, href: `/en${path}` },
  ],
});

export default defineConfig({
  name: "albisht",
  title: "ALBISHT",
  projectId,
  dataset,
  basePath: "/studio",

  schema: {
    types: schemaTypes,
    // Singletons can't be created/duplicated from the global "+" menu.
    templates: (prev) => prev.filter((t) => !singletonSet.has(t.schemaType)),
  },

  document: {
    // Strip create/duplicate/delete for singletons so there's always exactly one.
    actions: (prev, { schemaType }) =>
      singletonSet.has(schemaType)
        ? prev.filter(
            (a) => a.action && !["duplicate", "delete", "unpublish"].includes(a.action)
          )
        : prev,
  },

  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin: previewOrigin,
        previewMode: { enable: "/api/draft-mode/enable" },
      },
      resolve: {
        locations: {
          homePage: defineLocations({ select: {}, resolve: () => both("", "Home") }),
          atelierPage: defineLocations({ select: {}, resolve: () => both("/atelier", "Atelier") }),
          heritagePage: defineLocations({ select: {}, resolve: () => both("/heritage", "Heritage") }),
          servicesPage: defineLocations({ select: {}, resolve: () => both("/services", "Services") }),
          consultPage: defineLocations({ select: {}, resolve: () => both("/consult", "Consult") }),
          contactPage: defineLocations({ select: {}, resolve: () => both("/contact", "Contact") }),
          packagesPage: defineLocations({ select: {}, resolve: () => both("/packages", "Packages") }),
          journalEntry: defineLocations({ select: {}, resolve: () => both("/journal", "Journal") }),
          celebrationCase: defineLocations({ select: {}, resolve: () => both("/celebrations", "Celebrations") }),
          globals: defineLocations({ select: {}, resolve: () => both("", "Site (home)") }),
        },
      },
    }),
    visionTool(),
  ],
});
