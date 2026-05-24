import type { Lang } from "./i18n";

/**
 * Central source of truth for ALBISHT contact info.
 * Editing a number here updates the footer, contact page, and every
 * ContactCallout block site-wide.
 *
 * Numbers are stored as their tel: link (international format, no spaces)
 * and as their display variant (with spaces). Qatar uses 8-digit numbers
 * behind country code +974.
 */

export type ContactNumber = {
  /** International format for tel: links, e.g. "+97433777074" */
  tel: string;
  /** Human display variant, e.g. "+974 3377 7074" */
  display: string;
  /** Latin label per language (e.g. "Men's Hall" / "صالة الرجال") */
  label: Record<Lang, string>;
  /** Short note shown under the number (e.g. "WhatsApp + voice") */
  note?: Record<Lang, string>;
};

export const PHONES: { mens: ContactNumber; womens: ContactNumber } = {
  mens: {
    tel: "+97433777074",
    display: "+974 3377 7074",
    label: {
      ar: "صالة الرجال",
      en: "Men's Hall",
    },
  },
  womens: {
    tel: "+97450008019",
    display: "+974 5000 8019",
    label: {
      ar: "صالة السيدات",
      en: "Women's Hall",
    },
  },
};

export const EMAIL = "hello@albisht.qa";
export const INSTAGRAM = { handle: "@albishtqtr", url: "https://instagram.com/albishtqtr" };
export const LOCATION = {
  ar: "الدوحة، قطر",
  en: "Doha, Qatar",
};

/* === Microcopy used by the ContactCallout block ============================ */
export const CALLOUT = {
  ar: {
    eyebrow: "للتواصل",
    title: "ثلاث طرق للوصول إلينا.",
    intro:
      "اِكتُب الرسالة الكاملة، أو اِتصل مباشرةً بصالة الرجال أو السيدات. كلُّ مكالمة تَصِل إلى مَن يَعرف الإجابة.",
    letter: "اكتب الرسالة",
    callPrefix: "اتصل بـ",
  },
  en: {
    eyebrow: "Reach us",
    title: "Three ways to reach us.",
    intro:
      "Write the full letter, or call the men's or women's hall directly. Every call reaches the person who knows the answer.",
    letter: "Write the letter",
    callPrefix: "Call",
  },
};
