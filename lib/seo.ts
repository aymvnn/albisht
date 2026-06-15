import type { Metadata } from "next";
import type { Lang } from "./i18n";
import { PHONES, EMAIL, SOCIALS } from "./contact";
import { FAQ } from "./copy";

/**
 * Central SEO layer.
 * - SITE_URL drives canonicals, hreflang alternates, sitemap and OG cards.
 * - PAGE_META holds the per-route, per-language titles + descriptions.
 * - pageMetadata() assembles a complete Next Metadata object for a route.
 * - JSON-LD builders return plain objects; render with
 *     <script type="application/ld+json"
 *             dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3300";

export const SITE_NAME = "ALBISHT — البِشت";

type PageMeta = Record<Lang, { title: string; description: string }>;

export const PAGE_META: Record<string, PageMeta> = {
  "": {
    ar: {
      title: "البِشت — مرسم الأعراس القطرية | الدوحة",
      description:
        "المرسم القطري المتخصص بصالة الرجال في حفل الزواج. ثلاث مئة مناسبة في العام، لا تتكرر اثنتان. الدوحة، قطر.",
    },
    en: {
      title: "ALBISHT — Qatari Men's Hall Atelier | Doha",
      description:
        "The Qatari ceremonial atelier for the men's hall of the wedding. Three hundred ceremonies a year — no two alike. Doha, Qatar.",
    },
  },
  "/atelier": {
    ar: {
      title: "المرسم — البِشت",
      description:
        "تخصص واحد يؤدى على مستوى الديوان: صالة الرجال في حفل الزواج القطري. الكرم، السكون، الإحكام.",
    },
    en: {
      title: "The Atelier — ALBISHT",
      description:
        "One craft performed at Diwan level: the men's hall of the Qatari wedding. Hospitality, stillness, precision.",
    },
  },
  "/packages": {
    ar: {
      title: "الباقات — البِشت",
      description:
        "خمس باقات كاملة لصالة الرجال، من الفضية إلى TOP VIP، وضيافة نسائية بحسب عدد الضيوف. كل باقة كاملة بذاتها.",
    },
    en: {
      title: "Packages — ALBISHT",
      description:
        "Five complete men's hall packages, Silver to Top VIP, and women's hospitality by guest count. Each whole in itself.",
    },
  },
  "/celebrations": {
    ar: {
      title: "المناسبات — البِشت",
      description:
        "مناسبات مختارة، بلا أسماء. نحفظ الأسرار كما نحفظ التراث.",
    },
    en: {
      title: "Celebrations — ALBISHT",
      description:
        "Selected celebrations, shown without names. We hold secrets as we hold heritage.",
    },
  },
  "/services": {
    ar: {
      title: "الخدمات — البِشت",
      description:
        "خدمات المرسم لصالة الرجال: التجهيز، الضيافة، التصوير، والتشريفات الخارجية.",
    },
    en: {
      title: "Services — ALBISHT",
      description:
        "The atelier's men's hall services: staging, hospitality, photography and exterior protocol.",
    },
  },
  "/heritage": {
    ar: {
      title: "التراث — البِشت",
      description:
        "البِشت يُلبَس مرة واحدة في العمر — يوم الزواج. من وبر الجمل إلى خيط الذهب.",
    },
    en: {
      title: "Heritage — ALBISHT",
      description:
        "The bisht is worn once in a lifetime — on the wedding day. From camel hair to gold thread.",
    },
  },
  "/journal": {
    ar: {
      title: "اليوميات — البِشت",
      description: "يوميات المرسم — ملاحظات من وراء الباب.",
    },
    en: {
      title: "Journal — ALBISHT",
      description: "The atelier journal — notes from behind the door.",
    },
  },
  "/consult": {
    ar: {
      title: "الاستشارة — البِشت",
      description:
        "اكتب الرسالة. نرد خلال ثلاثة أيام، ولا يخرج اسمكم منها.",
    },
    en: {
      title: "Consultation — ALBISHT",
      description:
        "Write the letter. We reply within three days; your name does not leave it.",
    },
  },
  "/contact": {
    ar: {
      title: "التواصل — البِشت",
      description:
        "صالة الرجال: +974 3377 7074 · للسيدات: +974 5000 8019 · الدوحة، قطر.",
    },
    en: {
      title: "Contact — ALBISHT",
      description:
        "Men's hall: +974 3377 7074 · Women's line: +974 5000 8019 · Doha, Qatar.",
    },
  },
};

/** hreflang alternates + canonical for a route. */
export const pageAlternates = (path: string) => ({
  canonical: undefined as string | undefined, // set per-lang in pageMetadata
  languages: {
    ar: `${SITE_URL}/ar${path}`,
    en: `${SITE_URL}/en${path}`,
    "x-default": `${SITE_URL}/ar${path}`,
  },
});

/** Complete Metadata object for a [lang] route. */
export function pageMetadata(lang: Lang, path: string): Metadata {
  const meta = PAGE_META[path]?.[lang] ?? PAGE_META[""][lang];
  const url = `${SITE_URL}/${lang}${path}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      languages: pageAlternates(path).languages,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: lang === "ar" ? "ar_QA" : "en_QA",
      alternateLocale: lang === "ar" ? "en_QA" : "ar_QA",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

/* === JSON-LD builders ====================================================== */

export function localBusinessJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#atelier`,
    name: lang === "ar" ? "البِشت" : "ALBISHT",
    alternateName: lang === "ar" ? "ALBISHT" : "البِشت",
    description: PAGE_META[""][lang].description,
    url: `${SITE_URL}/${lang}`,
    email: EMAIL,
    telephone: PHONES.mens.tel,
    image: `${SITE_URL}/logo-dark.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Doha",
      addressRegion: "Khalifa City",
      addressCountry: "QA",
    },
    areaServed: ["Qatar"],
    sameAs: SOCIALS.map((s) => s.url),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: PHONES.mens.tel,
        contactType: "customer service",
        name: PHONES.mens.label[lang],
        availableLanguage: ["ar", "en"],
      },
      {
        "@type": "ContactPoint",
        telephone: PHONES.womens.tel,
        contactType: "customer service",
        name: PHONES.womens.label[lang],
        availableLanguage: ["ar", "en"],
      },
    ],
  };
}

export function faqJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ[lang].items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
