import { defineType, defineField, defineArrayMember } from "sanity";

/* Page singletons + collections. Singletons are enforced by the desk
   structure (sanity/structure.ts); they use a fixed document id. */

const ls = (name: string, extra: Record<string, unknown> = {}) =>
  defineField({ name, type: "localeString", ...extra });
const lt = (name: string, extra: Record<string, unknown> = {}) =>
  defineField({ name, type: "localeText", ...extra });
const seoField = defineField({ name: "seo", type: "seo" });

export const homePage = defineType({
  name: "homePage",
  title: "Home",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "promise", title: "Promise" },
    { name: "acts", title: "Three acts" },
    { name: "celebrations", title: "Celebrations strip" },
    { name: "invitation", title: "Invitation" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    ls("heroEyebrow", { group: "hero" }),
    ls("heroHeadline", { group: "hero", description: "*word* → gold-italic.", validation: (r: any) => r.required() }),
    ls("heroSubline", { group: "hero" }),
    ls("heroCtaLabel", { group: "hero" }),
    defineField({ name: "heroCtaHref", type: "string", group: "hero", initialValue: "/consult" }),
    defineField({ name: "heroImage", type: "image", group: "hero", options: { hotspot: true }, validation: (r) => r.required() }),
    ls("revealPhrase", { group: "hero", description: "Shown during the opening cinematic." }),
    ls("promiseTitle", { group: "promise" }),
    lt("promiseLines", { group: "promise", description: "One line per row." }),
    ls("actsLabel", { group: "acts" }),
    ls("actsHeading", { group: "acts" }),
    defineField({ name: "acts", type: "array", group: "acts", of: [defineArrayMember({ type: "act" })], validation: (r) => r.min(3).max(3) }),
    ls("celebrationsLabel", { group: "celebrations" }),
    ls("celebrationsTitle", { group: "celebrations", description: "*word* allowed." }),
    lt("celebrationsIntro", { group: "celebrations", description: "Cards below come from the newest Celebration entries." }),
    ls("invitationTitle", { group: "invitation" }),
    ls("invitationLine1", { group: "invitation" }),
    ls("invitationLine2", { group: "invitation" }),
    ls("invitationCtaLabel", { group: "invitation" }),
    defineField({ name: "invitationCtaHref", type: "string", group: "invitation", initialValue: "/consult" }),
    { ...seoField, group: "seo" },
  ],
  preview: { prepare: () => ({ title: "Home" }) },
});

export const atelierPage = defineType({
  name: "atelierPage",
  title: "Atelier",
  type: "document",
  fields: [
    seoField,
    defineField({ name: "hero", type: "pageHero" }),
    ls("principlesLabel"),
    defineField({ name: "principles", type: "array", of: [defineArrayMember({ type: "principle" })], validation: (r) => r.min(3).max(3) }),
    ls("networkLabel"),
    ls("networkTitle"),
    lt("networkBody"),
    defineField({ name: "networkPhoto", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    ls("termsLabel"),
    ls("termsTitle"),
    lt("termsLines", { description: "One term per line." }),
  ],
  preview: { prepare: () => ({ title: "Atelier" }) },
});

export const heritagePage = defineType({
  name: "heritagePage",
  title: "Heritage",
  type: "document",
  fields: [
    seoField,
    defineField({ name: "hero", type: "pageHero" }),
    defineField({ name: "introImage", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "chapters", type: "array", of: [defineArrayMember({ type: "chapter" })], validation: (r) => r.min(1).max(12) }),
    defineField({ name: "intermezzoImage", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
  ],
  preview: { prepare: () => ({ title: "Heritage" }) },
});

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services",
  type: "document",
  fields: [
    seoField,
    defineField({ name: "hero", type: "pageHero" }),
    defineField({ name: "phases", type: "array", of: [defineArrayMember({ type: "phase" })], validation: (r) => r.min(4).max(12) }),
    defineField({ name: "intermezzoImage", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
  ],
  preview: { prepare: () => ({ title: "Services" }) },
});

export const consultPage = defineType({
  name: "consultPage",
  title: "Consult (The Letter)",
  type: "document",
  fields: [
    seoField,
    ls("eyebrow"),
    ls("headline"),
    lt("sub"),
    lt("body"),
    ls("fieldNameLabel"),
    ls("fieldDateLabel"),
    ls("fieldDatePlaceholder"),
    ls("fieldGuestsLabel"),
    ls("fieldContactLabel"),
    ls("fieldNotesLabel"),
    ls("fieldNotesHint"),
    ls("submitLabel"),
    ls("submittedLine1"),
    ls("submittedLine2"),
  ],
  preview: { prepare: () => ({ title: "Consult" }) },
});

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact",
  type: "document",
  fields: [
    seoField,
    defineField({ name: "hero", type: "pageHero" }),
    defineField({ name: "primaryImage", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    ls("letterLabel"),
    ls("letterHeadline"),
    lt("letterBody"),
    ls("letterCtaLabel"),
  ],
  preview: { prepare: () => ({ title: "Contact" }) },
});

export const packagesPage = defineType({
  name: "packagesPage",
  title: "Packages",
  type: "document",
  groups: [
    { name: "mens", title: "Men's packages", default: true },
    { name: "womens", title: "Women's atelier" },
    { name: "seo", title: "SEO & hero" },
  ],
  fields: [
    { ...seoField, group: "seo" },
    defineField({ name: "hero", type: "pageHero", group: "seo" }),
    ls("mensEyebrow", { group: "mens" }),
    ls("mensTitle", { group: "mens" }),
    lt("mensIntro", { group: "mens" }),
    ls("mensCta", { group: "mens" }),
    ls("priceLabel", { group: "mens" }),
    defineField({ name: "sectionLabels", type: "array", group: "mens", of: [defineArrayMember({ type: "sectionLabel" })], validation: (r) => r.min(1) }),
    defineField({ name: "mensTiers", title: "Tiers", type: "array", group: "mens", of: [defineArrayMember({ type: "packageTier" })], validation: (r) => r.min(1) }),
    ls("womensEyebrow", { group: "womens" }),
    ls("womensTitle", { group: "womens" }),
    lt("womensIntro", { group: "womens" }),
    ls("womensHospitalityTitle", { group: "womens" }),
    ls("womensBeveragesTitle", { group: "womens" }),
    ls("womensPerPerson", { group: "womens" }),
    ls("womensPerTray", { group: "womens" }),
    ls("womensEnquireLabel", { group: "womens" }),
    ls("womensPhoneLabel", { group: "womens" }),
    ls("womensMenuTitle", { group: "womens" }),
    defineField({ name: "womensHospitality", type: "array", group: "womens", of: [defineArrayMember({ type: "capacityTier" })] }),
    defineField({ name: "womensBeverages", type: "array", group: "womens", of: [defineArrayMember({ type: "capacityTier" })] }),
    defineField({ name: "womensMenu", type: "array", group: "womens", of: [defineArrayMember({ type: "beverageCategory" })] }),
  ],
  preview: { prepare: () => ({ title: "Packages" }) },
});

export const globals = defineType({
  name: "globals",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "contact", title: "Contact", default: true },
    { name: "nav", title: "Navigation & footer" },
    { name: "callout", title: "Contact call-out" },
  ],
  fields: [
    defineField({ name: "phoneMens", title: "Men's hall phone", type: "phone", group: "contact" }),
    defineField({ name: "phoneWomens", title: "Women's atelier phone", type: "phone", group: "contact" }),
    defineField({ name: "email", type: "string", group: "contact" }),
    ls("location", { group: "contact" }),
    lt("receptionHours", { group: "contact", description: "Day-range on one line, time-range on the next." }),
    defineField({ name: "socials", type: "array", group: "contact", of: [defineArrayMember({ type: "socialLink" })], validation: (r) => r.max(6) }),
    defineField({ name: "nav", type: "array", group: "nav", of: [defineArrayMember({ type: "navItem" })], validation: (r) => r.min(1).max(10) }),
    ls("footerTagline", { group: "nav" }),
    ls("footerAddress", { group: "nav" }),
    ls("footerRights", { group: "nav" }),
    ls("calloutEyebrow", { group: "callout" }),
    ls("calloutTitle", { group: "callout", description: "*word* allowed." }),
    lt("calloutIntro", { group: "callout" }),
    ls("calloutLetterLabel", { group: "callout" }),
    lt("calloutLetterDesc", { group: "callout" }),
    ls("calloutLetterAction", { group: "callout" }),
    ls("calloutCallTitle", { group: "callout" }),
    lt("calloutCallDesc", { group: "callout" }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

export const journalEntry = defineType({
  name: "journalEntry",
  title: "Journal entry",
  type: "document",
  fields: [
    ls("title", { validation: (r: any) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title.en" }, validation: (r) => r.required() }),
    ls("kicker"),
    lt("excerpt"),
    defineField({ name: "coverPhoto", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    lt("body", { description: "Optional full essay (leave empty for excerpt-only cards)." }),
    defineField({ name: "publishedAt", type: "datetime", description: "Controls ordering (newest first)." }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    seoField,
  ],
  orderings: [{ title: "Newest", name: "newest", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title.en", subtitle: "kicker.en", media: "coverPhoto" } },
});

export const celebrationCase = defineType({
  name: "celebrationCase",
  title: "Celebration",
  type: "document",
  fields: [
    ls("title", { description: "*word* allowed.", validation: (r: any) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title.en" }, validation: (r) => r.required() }),
    ls("when", { description: "e.g. نوفمبر ٢٠٢٥ / November 2025" }),
    ls("where"),
    ls("guests"),
    lt("note"),
    defineField({ name: "photo", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "publishedAt", type: "datetime", description: "Controls ordering; home shows the newest three." }),
  ],
  orderings: [{ title: "Newest", name: "newest", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title.en", subtitle: "where.en", media: "photo" } },
});

export const documentTypes = [
  homePage, atelierPage, heritagePage, servicesPage, consultPage, contactPage,
  packagesPage, globals, journalEntry, celebrationCase,
];

/** Singleton document type names — exactly one instance, fixed id = type name. */
export const SINGLETONS = [
  "homePage", "atelierPage", "heritagePage", "servicesPage",
  "consultPage", "contactPage", "packagesPage", "globals",
] as const;
