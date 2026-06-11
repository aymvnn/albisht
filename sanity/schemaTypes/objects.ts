import { defineType, defineField, defineArrayMember } from "sanity";

/* Reusable nested objects. Translatable text uses localeString/localeText
   (AR + EN side by side). Fields suffixed Ar/En are bilingual-simultaneous
   (both shown on every language) and are plain strings on purpose. */

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
    defineField({ name: "ogImage", title: "Share image", type: "image", options: { hotspot: true } }),
  ],
});

export const pageHero = defineType({
  name: "pageHero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "localeString" }),
    defineField({
      name: "headline",
      type: "localeString",
      description: "Wrap one word per line in *asterisks* to render it gold-italic.",
    }),
    defineField({ name: "intro", type: "localeText" }),
  ],
});

export const act = defineType({
  name: "act",
  title: "Act",
  type: "object",
  fields: [
    defineField({ name: "kicker", type: "localeString", description: "e.g. الفصل الأول / Act i" }),
    defineField({ name: "title", type: "localeString" }),
    defineField({ name: "line", type: "localeText" }),
    defineField({ name: "photo", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "title.en", media: "photo" } },
});

export const principle = defineType({
  name: "principle",
  title: "Principle",
  type: "object",
  fields: [
    defineField({ name: "wordAr", title: "Arabic word (shown large, both languages)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "wordEn", title: "English word (roman label, both languages)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "localeText" }),
    defineField({ name: "photo", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "wordEn", media: "photo" } },
});

export const phase = defineType({
  name: "phase",
  title: "Phase",
  type: "object",
  fields: [
    defineField({ name: "nameAr", title: "Arabic name (shown large, both languages)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "nameEn", title: "English name (roman label, both languages)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "localeText" }),
    defineField({ name: "photo", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "nameEn", media: "photo" } },
});

export const chapter = defineType({
  name: "chapter",
  title: "Chapter",
  type: "object",
  fields: [
    defineField({ name: "number", type: "string", description: "e.g. 01 (display only)" }),
    defineField({ name: "title", type: "localeString" }),
    defineField({ name: "body", type: "localeText" }),
    defineField({ name: "pullquote", type: "localeText", description: "Optional pull-quote rendered after this chapter." }),
  ],
  preview: { select: { title: "title.en", subtitle: "number" } },
});

const SECTION_KEYS = [
  { title: "Inside the hall", value: "hall" },
  { title: "Lobby seating", value: "lobby" },
  { title: "Hospitality", value: "hospitality" },
  { title: "Photography", value: "photography" },
  { title: "Outside the hall", value: "exterior" },
];

export const sectionLabel = defineType({
  name: "sectionLabel",
  title: "Section label",
  type: "object",
  fields: [
    defineField({ name: "key", type: "string", options: { list: SECTION_KEYS }, validation: (r) => r.required() }),
    defineField({ name: "label", type: "localeString", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "label.en", subtitle: "key" } },
});

export const packageSection = defineType({
  name: "packageSection",
  title: "Package section",
  type: "object",
  fields: [
    defineField({
      name: "key",
      type: "string",
      options: { list: SECTION_KEYS },
      description: "Canonical section. Leave empty + fill Custom label to add a new section.",
    }),
    defineField({ name: "customLabel", title: "Custom label", type: "localeString", description: "Only for a non-canonical section." }),
    defineField({ name: "bullets", type: "localeText", description: "One inclusion per line.", validation: (r) => r.required() }),
  ],
  preview: { select: { key: "key", custom: "customLabel.en" }, prepare: ({ key, custom }) => ({ title: custom || key || "Section" }) },
});

export const packageTier = defineType({
  name: "packageTier",
  title: "Package tier",
  type: "object",
  fields: [
    defineField({ name: "uid", title: "Slug (stable, for deep-links)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tierSlug", title: "Tier family (styling)", type: "string", description: "silver / gold / platinum / vip / top-vip (free text)." }),
    defineField({ name: "name", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "priceQar", title: "Price (QAR)", type: "number", validation: (r) => r.required().integer().positive() }),
    defineField({ name: "highlight", type: "localeText" }),
    defineField({ name: "photo", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "sections", type: "array", of: [defineArrayMember({ type: "packageSection" })], validation: (r) => r.min(1) }),
  ],
  preview: { select: { title: "name.en", subtitle: "priceQar", media: "photo" } },
});

export const capacityTier = defineType({
  name: "capacityTier",
  title: "Capacity",
  type: "object",
  fields: [
    defineField({ name: "capacity", type: "number", validation: (r) => r.required().integer().positive() }),
    defineField({ name: "note", type: "localeString" }),
  ],
  preview: { select: { title: "capacity" }, prepare: ({ title }) => ({ title: `${title} guests` }) },
});

export const beverageItem = defineType({
  name: "beverageItem",
  title: "Beverage",
  type: "object",
  fields: [defineField({ name: "name", type: "localeString", validation: (r) => r.required() })],
  preview: { select: { title: "name.en" } },
});

export const beverageCategory = defineType({
  name: "beverageCategory",
  title: "Beverage category",
  type: "object",
  fields: [
    defineField({ name: "name", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "items", type: "array", of: [defineArrayMember({ type: "beverageItem" })] }),
  ],
  preview: { select: { title: "name.en" } },
});

export const phone = defineType({
  name: "phone",
  title: "Phone",
  type: "object",
  fields: [
    defineField({ name: "tel", title: "tel: link (e.g. +97433777074)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "display", title: "Display (e.g. +974 3377 7074)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label", type: "localeString" }),
    defineField({ name: "note", type: "localeString" }),
    defineField({
      name: "weight",
      type: "string",
      options: { list: [{ title: "Primary", value: "primary" }, { title: "Secondary", value: "secondary" }] },
      initialValue: "primary",
    }),
  ],
  preview: { select: { title: "display", subtitle: "label.en" } },
});

export const navItem = defineType({
  name: "navItem",
  title: "Nav item",
  type: "object",
  fields: [
    defineField({ name: "label", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "href", type: "string", description: "Path without language prefix, e.g. /atelier", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "label.en", subtitle: "href" } },
});

export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      type: "string",
      options: { list: [{ title: "Instagram", value: "instagram" }, { title: "Facebook", value: "facebook" }, { title: "TikTok", value: "tiktok" }] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "handle", type: "string" }),
    defineField({ name: "url", type: "url", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "platform", subtitle: "handle" } },
});

export const objectTypes = [
  seo, pageHero, act, principle, phase, chapter, sectionLabel, packageSection,
  packageTier, capacityTier, beverageItem, beverageCategory, phone, navItem, socialLink,
];
