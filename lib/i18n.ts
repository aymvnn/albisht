export type Lang = "ar" | "en";

export const LANGS: Lang[] = ["ar", "en"];
export const DEFAULT_LANG: Lang = "ar";

export const isRTL = (lang: Lang) => lang === "ar";

export const localizedNumeral = (num: number, lang: Lang): string => {
  if (lang === "ar") {
    const arabic = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return num
      .toString()
      .split("")
      .map((d) => (/\d/.test(d) ? arabic[+d] : d))
      .join("");
  }
  return num.toString();
};

/**
 * Localise any string containing Latin digits to Hindi-Arabic numerals
 * when the active language is Arabic. Non-digit characters (spaces, "+",
 * etc.) are preserved. Use for phone numbers, postal codes, dates and
 * any other display string that mixes digits with separators.
 *
 * Note on direction: even in Arabic typesetting, numerals run left-to-right.
 * Wrap the result in a span with `dir="ltr"` (or `style={{ unicodeBidi:
 * "isolate" }}`) to keep "+٩٧٤ ٣٣٧٧ ٧٠٧٤" reading the correct way around
 * inside an RTL parent.
 */
export const localizedDigits = (s: string, lang: Lang): string => {
  if (lang !== "ar") return s;
  const arabic = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return s.split("").map((c) => (/\d/.test(c) ? arabic[+c] : c)).join("");
};

/**
 * Format an integer with thousands separators, in the active language's
 * numeral system. Implemented manually rather than via `toLocaleString`
 * because Vercel's serverless runtime ships a slim ICU build that returns
 * Latin digits for many Arabic locales — we cannot rely on it for AR.
 *
 *   localizedThousands(39000, "ar") → "٣٩٬٠٠٠"   (Arabic digits + U+066C)
 *   localizedThousands(39000, "en") → "39,000"
 */
export const localizedThousands = (num: number, lang: Lang): string => {
  const grouped = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (lang !== "ar") return grouped;
  return localizedDigits(grouped, lang).replace(/,/g, "٬");
};

export const langName = (lang: Lang) => (lang === "ar" ? "العربية" : "English");
export const switchLang = (lang: Lang): Lang => (lang === "ar" ? "en" : "ar");
