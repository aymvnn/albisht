import { defineType, defineField } from "sanity";

/**
 * Bilingual field building blocks. AR is canonical, EN mirrors. Every editable
 * text field on the site is one of these, so the editor always sees the two
 * languages side by side — the closest match to the old Storyblok experience.
 *
 * Headlines may contain *word* markers (one word per line wrapped in asterisks)
 * to render that word gold-italic via FormatHeadline — keep the convention.
 */

export const localeString = defineType({
  name: "localeString",
  title: "Text (AR / EN)",
  type: "object",
  options: { columns: 2 },
  fields: [
    defineField({ name: "ar", title: "العربية (Arabic)", type: "string" }),
    defineField({ name: "en", title: "English", type: "string" }),
  ],
});

export const localeText = defineType({
  name: "localeText",
  title: "Text block (AR / EN)",
  type: "object",
  options: { columns: 2 },
  fields: [
    defineField({ name: "ar", title: "العربية (Arabic)", type: "text", rows: 4 }),
    defineField({ name: "en", title: "English", type: "text", rows: 4 }),
  ],
});
