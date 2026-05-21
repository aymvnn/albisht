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

export const langName = (lang: Lang) => (lang === "ar" ? "العربية" : "English");
export const switchLang = (lang: Lang): Lang => (lang === "ar" ? "en" : "ar");
