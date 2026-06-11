import type { Lang } from "@/lib/i18n";
import { urlFor } from "@/lib/sanity/client";
import {
  HERO, PROMISE, ACTS, CELEBRATIONS, INVITATION, ATELIER, CONSULT, PACKAGES_META, FOOTER, NAV,
} from "@/lib/copy";
import {
  PACKAGES, WOMENS_HOSPITALITY, WOMENS_BEVERAGES, WOMENS_BEVERAGE_CATEGORIES, WOMENS_META, type Package,
} from "@/lib/packages";
import { HERITAGE, SERVICES_PROTOCOL, JOURNAL } from "@/lib/inline-content";
import { PHONES, EMAIL, SOCIALS, LOCATION, CALLOUT } from "@/lib/contact";

/**
 * Map Sanity documents (loosely typed) to the exact shapes the existing
 * components already consume, overlaying on the static lib data so a missing
 * doc/field always falls back — never crashes. Mirrors the old from-storyblok.
 */
type Loc = { ar?: string; en?: string } | undefined | null;
type Doc = Record<string, any> | null | undefined;

const t = (v: Loc, lang: Lang, fb: string) => {
  const s = v?.[lang];
  return s && s.trim() ? s : fb;
};
const lines = (v: Loc, lang: Lang, fb: string[]) => {
  const s = v?.[lang];
  return s && s.trim() ? s.split("\n").map((x) => x.trim()).filter(Boolean) : fb;
};
const img = (src: unknown, fb: string) => urlFor(src as never) || fb;
const arr = (v: unknown): any[] => (Array.isArray(v) ? v : []);
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";

/* ---------------- home ------------------------------------------------ */
export function mapHome(doc: Doc, lang: Lang) {
  const h = HERO[lang], p = PROMISE[lang], a = ACTS[lang], c = CELEBRATIONS[lang], inv = INVITATION[lang];
  return {
    hero: {
      eyebrow: t(doc?.heroEyebrow, lang, h.eyebrow),
      headline: t(doc?.heroHeadline, lang, h.headline),
      subline: t(doc?.heroSubline, lang, h.subline),
      cta: t(doc?.heroCtaLabel, lang, h.cta),
      ctaHref: doc?.heroCtaHref || "/consult",
      image: img(doc?.heroImage, "/photos/hall/hero-pearl-court.jpg"),
    },
    promise: { title: t(doc?.promiseTitle, lang, p.title), lines: lines(doc?.promiseLines, lang, p.lines) },
    acts: {
      label: t(doc?.actsLabel, lang, a.label),
      heading: t(doc?.actsHeading, lang, a.heading),
      items: arr(doc?.acts).length
        ? arr(doc?.acts).map((it: any, i: number) => ({
            kicker: t(it.kicker, lang, a.items[i]?.kicker ?? ""),
            title: t(it.title, lang, a.items[i]?.title ?? ""),
            line: t(it.line, lang, a.items[i]?.line ?? ""),
            photo: img(it.photo, a.items[i]?.photo ?? ""),
          }))
        : a.items,
    },
    celebrations: {
      label: t(doc?.celebrationsLabel, lang, c.label),
      title: t(doc?.celebrationsTitle, lang, c.title),
      intro: t(doc?.celebrationsIntro, lang, c.intro),
    },
    invitation: {
      title: t(doc?.invitationTitle, lang, inv.title),
      line1: t(doc?.invitationLine1, lang, inv.line1),
      line2: t(doc?.invitationLine2, lang, inv.line2),
      cta: t(doc?.invitationCtaLabel, lang, inv.cta),
      ctaHref: doc?.invitationCtaHref || "/consult",
    },
  };
}
export type HomeContent = ReturnType<typeof mapHome>;

/* ---------------- atelier --------------------------------------------- */
export function mapAtelier(doc: Doc, lang: Lang) {
  const at = ATELIER[lang];
  const photos = ["/photos/craft/server-shemagh-cups.jpg", "/photos/hall/olive-tree-light.jpg", "/photos/craft/sweets-silver-platter.jpg"];
  const hero = doc?.hero;
  return {
    hero: {
      eyebrow: t(hero?.eyebrow, lang, at.eyebrow),
      headline: t(hero?.headline, lang, at.headline),
      intro: t(hero?.intro, lang, at.intro),
    },
    principlesLabel: t(doc?.principlesLabel, lang, lang === "ar" ? "ثلاثة مبادئ" : "Three principles"),
    principles: arr(doc?.principles).length
      ? arr(doc?.principles).map((pr: any, i: number) => ({
          ar: pr.wordAr || at.principles[i]?.ar || "",
          en: pr.wordEn || at.principles[i]?.en || "",
          body: t(pr.body, lang, at.principles[i]?.body ?? ""),
          photo: img(pr.photo, photos[i] ?? photos[0]),
        }))
      : at.principles.map((pr, i) => ({ ...pr, photo: photos[i] ?? photos[0] })),
    network: {
      label: t(doc?.networkLabel, lang, at.network.label),
      title: t(doc?.networkTitle, lang, at.network.title),
      body: t(doc?.networkBody, lang, at.network.body),
      photo: img(doc?.networkPhoto, "/photos/majlis/sheikh-portrait.jpg"),
    },
    terms: {
      label: t(doc?.termsLabel, lang, at.terms.label),
      title: t(doc?.termsTitle, lang, at.terms.title),
      lines: lines(doc?.termsLines, lang, at.terms.lines),
    },
  };
}
export type AtelierContent = ReturnType<typeof mapAtelier>;

/* ---------------- heritage -------------------------------------------- */
export function mapHeritage(doc: Doc, lang: Lang) {
  const hr = HERITAGE[lang];
  const hero = doc?.hero;
  return {
    eyebrow: t(hero?.eyebrow, lang, hr.eyebrow),
    title: t(hero?.headline, lang, hr.title),
    intro: t(hero?.intro, lang, hr.intro),
    introImage: img(doc?.introImage, hr.introImage),
    intermezzoImage: img(doc?.intermezzoImage, hr.intermezzoImage),
    chapters: arr(doc?.chapters).length
      ? arr(doc?.chapters).map((ch: any, i: number) => ({
          number: ch.number || hr.chapters[i]?.number || String(i + 1).padStart(2, "0"),
          title: t(ch.title, lang, hr.chapters[i]?.title ?? ""),
          body: t(ch.body, lang, hr.chapters[i]?.body ?? ""),
          pullquote: ch.pullquote?.[lang]?.trim() ? ch.pullquote[lang] : undefined,
        }))
      : hr.chapters,
  };
}
export type HeritageContent = ReturnType<typeof mapHeritage>;

/* ---------------- services -------------------------------------------- */
export function mapServices(doc: Doc, lang: Lang) {
  const sv = SERVICES_PROTOCOL[lang];
  const hero = doc?.hero;
  return {
    eyebrow: t(hero?.eyebrow, lang, sv.eyebrow),
    title: t(hero?.headline, lang, sv.title),
    intro: t(hero?.intro, lang, sv.intro),
    intermezzoImage: img(doc?.intermezzoImage, sv.intermezzoImage),
    phases: arr(doc?.phases).length
      ? arr(doc?.phases).map((ph: any, i: number) => ({
          ar: ph.nameAr || sv.phases[i]?.ar || "",
          en: ph.nameEn || sv.phases[i]?.en || "",
          body: t(ph.body, lang, sv.phases[i]?.body ?? ""),
          photo: img(ph.photo, sv.phases[i]?.photo ?? ""),
        }))
      : sv.phases,
  };
}
export type ServicesContent = ReturnType<typeof mapServices>;

/* ---------------- consult --------------------------------------------- */
export function mapConsult(doc: Doc, lang: Lang) {
  const co = CONSULT[lang];
  return {
    eyebrow: t(doc?.eyebrow, lang, co.eyebrow),
    headline: t(doc?.headline, lang, co.headline),
    sub: t(doc?.sub, lang, co.sub),
    body: t(doc?.body, lang, co.body),
    fields: {
      name: t(doc?.fieldNameLabel, lang, co.fields.name),
      date: t(doc?.fieldDateLabel, lang, co.fields.date),
      datePlaceholder: t(doc?.fieldDatePlaceholder, lang, lang === "ar" ? "شهر/سنة" : "Month / Year"),
      guests: t(doc?.fieldGuestsLabel, lang, co.fields.guests),
      contact: t(doc?.fieldContactLabel, lang, co.fields.contact),
      notes: t(doc?.fieldNotesLabel, lang, co.fields.notes),
      notesHint: t(doc?.fieldNotesHint, lang, co.fields.notesHint),
    },
    submit: t(doc?.submitLabel, lang, co.submit),
    submitted: {
      line1: t(doc?.submittedLine1, lang, co.submitted.line1),
      line2: t(doc?.submittedLine2, lang, co.submitted.line2),
    },
  };
}
export type ConsultContent = ReturnType<typeof mapConsult>;

/* ---------------- contact --------------------------------------------- */
export function mapContact(doc: Doc, lang: Lang) {
  const hero = doc?.hero;
  const isAr = lang === "ar";
  return {
    eyebrow: t(hero?.eyebrow, lang, isAr ? "التواصل" : "Contact"),
    title: t(hero?.headline, lang, isAr ? "البَاب." : "The door."),
    intro: t(
      hero?.intro,
      lang,
      isAr
        ? "صالة الرجال هي مَرسَمُنا الكامل — الباقات، التَجهيز، الضيافة، التَوثيق. للسيدات، نَعرِض خدماتٍ مُختارة."
        : "The men's hall is our full atelier — packages, production, hospitality, documentation. For women, we offer selected services."
    ),
    primaryImage: img(doc?.primaryImage, "/photos/majlis/calligraphy-wood-wall.jpg"),
    letter: {
      label: t(doc?.letterLabel, lang, isAr ? "الرسالة" : "The letter"),
      headline: t(doc?.letterHeadline, lang, isAr ? "اُكتُب الرسالة الكاملة." : "Write the full letter."),
      body: t(
        doc?.letterBody,
        lang,
        isAr
          ? "للاستفسارات المفصّلة — التاريخ، عدد الضيوف، الباقة المُختارة — اُكتُب لنا الرسالة الكاملة وسَنرُد خلال ثلاثة أيام."
          : "For detailed enquiries — date, number of guests, chosen package — write the full letter and we will reply within three days."
      ),
      cta: t(doc?.letterCtaLabel, lang, isAr ? "اكتب الرسالة" : "Write the letter"),
    },
  };
}
export type ContactContent = ReturnType<typeof mapContact>;

/* ---------------- packages -------------------------------------------- */
export function mapPackages(doc: Doc, lang: Lang) {
  const baseMeta = PACKAGES_META[lang];
  const wmBase = WOMENS_META[lang];

  const sectionLabels: Record<string, string> = { ...baseMeta.sectionLabels };
  for (const sl of doc?.sectionLabels ?? []) {
    if (sl.key) sectionLabels[sl.key] = t(sl.label, lang, sectionLabels[sl.key] ?? sl.key);
  }

  const tiers: Package[] = arr(doc?.mensTiers).length
    ? arr(doc?.mensTiers).map((tier: any, i: number) => {
        const fb = PACKAGES[lang][i];
        return {
          id: tier.uid || fb?.id || `tier-${i}`,
          tier: (tier.tierSlug || fb?.tier || "silver") as Package["tier"],
          name: t(tier.name, lang, fb?.name ?? ""),
          priceQAR: Number(tier.priceQar) || fb?.priceQAR || 0,
          highlight: t(tier.highlight, lang, fb?.highlight ?? ""),
          photo: img(tier.photo, fb?.photo ?? ""),
          sections: arr(tier.sections).map((s: any, si: number) => {
            let key = s.key || "";
            if (!key && s.customLabel) {
              key = slugify(s.customLabel.en || s.customLabel.ar || "section");
              sectionLabels[key] = t(s.customLabel, lang, key);
            } else if (key && s.customLabel) {
              sectionLabels[key] = t(s.customLabel, lang, sectionLabels[key] ?? key);
            }
            return {
              key: (key || fb?.sections[si]?.key || "hall") as Package["sections"][number]["key"],
              bullets: lines(s.bullets, lang, fb?.sections[si]?.bullets ?? []),
            };
          }),
        };
      })
    : PACKAGES[lang];

  const meta = {
    eyebrow: t(doc?.mensEyebrow, lang, baseMeta.eyebrow),
    title: t(doc?.mensTitle, lang, baseMeta.title),
    intro: t(doc?.mensIntro, lang, baseMeta.intro),
    cta: t(doc?.mensCta, lang, baseMeta.cta),
    priceLabel: t(doc?.priceLabel, lang, baseMeta.priceLabel),
    sectionLabels,
  };

  const womens = {
    meta: {
      eyebrow: t(doc?.womensEyebrow, lang, wmBase.eyebrow),
      title: t(doc?.womensTitle, lang, wmBase.title),
      intro: t(doc?.womensIntro, lang, wmBase.intro),
      hospitalityTitle: t(doc?.womensHospitalityTitle, lang, wmBase.hospitalityTitle),
      beveragesTitle: t(doc?.womensBeveragesTitle, lang, wmBase.beveragesTitle),
      perPerson: t(doc?.womensPerPerson, lang, wmBase.perPerson),
      perTray: t(doc?.womensPerTray, lang, wmBase.perTray),
      enquireLabel: t(doc?.womensEnquireLabel, lang, wmBase.enquireLabel),
      phoneLabel: t(doc?.womensPhoneLabel, lang, wmBase.phoneLabel),
      menuTitle: t(doc?.womensMenuTitle, lang, wmBase.menuTitle),
    },
    hospitality: arr(doc?.womensHospitality).length
      ? arr(doc?.womensHospitality).map((c: any) => ({ capacity: Number(c.capacity) || 0 }))
      : WOMENS_HOSPITALITY.map((c) => ({ capacity: c.capacity })),
    beverages: arr(doc?.womensBeverages).length
      ? arr(doc?.womensBeverages).map((c: any) => ({ capacity: Number(c.capacity) || 0 }))
      : WOMENS_BEVERAGES.map((c) => ({ capacity: c.capacity })),
    menu: arr(doc?.womensMenu).length
      ? arr(doc?.womensMenu).map((cat: any) => ({ name: t(cat.name, lang, ""), items: arr(cat.items).map((i: any) => t(i.name, lang, "")) }))
      : WOMENS_BEVERAGE_CATEGORIES.map((cat) => ({ name: cat.name[lang], items: cat.items.map((i) => i[lang]) })),
  };

  return { meta, tiers, womens };
}
export type PackagesContent = ReturnType<typeof mapPackages>;

/* ---------------- collections ----------------------------------------- */
export function mapJournalList(docs: Doc[] | null, lang: Lang) {
  const j = JOURNAL[lang];
  if (!docs || !docs.length) return { meta: { eyebrow: j.eyebrow, title: j.title, intro: j.intro }, entries: j.entries };
  return {
    meta: { eyebrow: j.eyebrow, title: j.title, intro: j.intro },
    entries: docs.map((e: any, i: number) => ({
      slug: e?.slug?.current || j.entries[i]?.slug || `entry-${i}`,
      kicker: t(e?.kicker, lang, j.entries[i]?.kicker ?? ""),
      title: t(e?.title, lang, j.entries[i]?.title ?? ""),
      excerpt: t(e?.excerpt, lang, j.entries[i]?.excerpt ?? ""),
      photo: img(e?.coverPhoto, j.entries[i]?.photo ?? ""),
    })),
  };
}

export function mapCelebrationItems(docs: Doc[] | null, lang: Lang) {
  const c = CELEBRATIONS[lang];
  if (!docs || !docs.length) return c.items;
  return docs.map((it: any, i: number) => ({
    title: t(it?.title, lang, c.items[i]?.title ?? ""),
    when: t(it?.when, lang, c.items[i]?.when ?? ""),
    where: t(it?.where, lang, c.items[i]?.where ?? ""),
    guests: t(it?.guests, lang, c.items[i]?.guests ?? ""),
    note: t(it?.note, lang, c.items[i]?.note ?? ""),
    photo: img(it?.photo, c.items[i]?.photo ?? ""),
  }));
}

/* ---------------- globals --------------------------------------------- */
export function mapGlobals(doc: Doc, lang: Lang) {
  const f = FOOTER[lang];
  const cal = CALLOUT[lang];
  const phoneOf = (p: any, fb: typeof PHONES.mens) => ({
    tel: p?.tel || fb.tel,
    display: p?.display || fb.display,
    label: t(p?.label, lang, fb.label[lang]),
    note: t(p?.note, lang, fb.note?.[lang] ?? ""),
  });
  return {
    nav: arr(doc?.nav).length
      ? arr(doc?.nav).map((n: any, i: number) => ({ href: n.href || NAV[lang][i]?.href || "/", label: t(n.label, lang, NAV[lang][i]?.label ?? "") }))
      : NAV[lang].map((n) => ({ href: n.href, label: n.label })),
    phones: { mens: phoneOf(doc?.phoneMens, PHONES.mens), womens: phoneOf(doc?.phoneWomens, PHONES.womens) },
    email: doc?.email || EMAIL,
    location: t(doc?.location, lang, LOCATION[lang]),
    receptionHours: t(doc?.receptionHours, lang, lang === "ar" ? "الأحد ـ الخميس\n١٠ صباحًا ـ ٧ مساءً" : "Sunday – Thursday\n10:00 — 19:00"),
    socials: arr(doc?.socials).length
      ? arr(doc?.socials).map((s: any, i: number) => ({ name: s.platform as "instagram" | "facebook" | "tiktok", handle: s.handle || SOCIALS[i]?.handle || "", url: s.url || SOCIALS[i]?.url || "#" }))
      : SOCIALS,
    footer: {
      tagline: t(doc?.footerTagline, lang, lang === "ar" ? "صالة الرجال التي تليق بالديوان." : "The men's hall worthy of the Diwan."),
      address: t(doc?.footerAddress, lang, f.address),
      rights: t(doc?.footerRights, lang, f.rights),
    },
    callout: {
      eyebrow: t(doc?.calloutEyebrow, lang, cal.eyebrow),
      title: t(doc?.calloutTitle, lang, cal.title),
      intro: t(doc?.calloutIntro, lang, cal.intro),
      letter: t(doc?.calloutLetterLabel, lang, cal.letter),
      letterDesc: t(doc?.calloutLetterDesc, lang, cal.letterDesc),
      letterAction: t(doc?.calloutLetterAction, lang, cal.letterAction),
      callTitle: t(doc?.calloutCallTitle, lang, cal.callTitle),
      callDesc: t(doc?.calloutCallDesc, lang, cal.callDesc),
    },
  };
}
export type GlobalsContent = ReturnType<typeof mapGlobals>;
