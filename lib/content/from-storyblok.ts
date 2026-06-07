/**
 * Adapter: map a fetched Storyblok story (language-flattened) back into the
 * exact shapes the existing components already consume. Every mapper takes the
 * Storyblok content (or null) + lang and overlays it on the static lib data,
 * so a missing story or cleared field always falls back — never crashes.
 *
 * This is the dag-6 wiring layer. Pages call these when USE_STORYBLOK is on.
 */
import type { Lang } from "@/lib/i18n";
import {
  HERO,
  PROMISE,
  ACTS,
  CELEBRATIONS,
  INVITATION,
  ATELIER,
  CONSULT,
  PACKAGES_META,
  FOOTER,
  NAV,
} from "@/lib/copy";
import {
  PACKAGES,
  WOMENS_HOSPITALITY,
  WOMENS_BEVERAGES,
  WOMENS_BEVERAGE_CATEGORIES,
  WOMENS_META,
  type Package,
} from "@/lib/packages";
import { HERITAGE, SERVICES_PROTOCOL, JOURNAL } from "@/lib/inline-content";
import { PHONES, EMAIL, SOCIALS, LOCATION, CALLOUT } from "@/lib/contact";
import type {
  SbHomePage,
  SbAtelierPage,
  SbHeritagePage,
  SbServicesPage,
  SbConsultPage,
  SbContactPage,
  SbPackagesPage,
  SbGlobals,
  SbAsset,
  SbCelebrationCase,
  SbJournalEntry,
} from "@/lib/storyblok/types";

const text = (v: string | undefined | null, fb: string) => (v && v.trim() ? v : fb);
const img = (a: SbAsset | undefined | null, fb: string) => (a && a.filename ? a.filename : fb);
const lines = (v: string | undefined | null, fb: string[]) =>
  v && v.trim() ? v.split("\n").map((l) => l.trim()).filter(Boolean) : fb;
const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";

/* ---------------- home ------------------------------------------------ */
export function mapHome(sb: SbHomePage | null, lang: Lang) {
  const h = HERO[lang], p = PROMISE[lang], a = ACTS[lang], c = CELEBRATIONS[lang], inv = INVITATION[lang];
  return {
    hero: {
      eyebrow: text(sb?.hero_eyebrow, h.eyebrow),
      headline: text(sb?.hero_headline, h.headline),
      subline: text(sb?.hero_subline, h.subline),
      cta: text(sb?.hero_cta_label, h.cta),
      ctaHref: text(sb?.hero_cta_href, "/consult"),
      image: img(sb?.hero_image, "/photos/hall/hero-pearl-court.jpg"),
    },
    promise: { title: text(sb?.promise_title, p.title), lines: lines(sb?.promise_lines, p.lines) },
    acts: {
      label: text(sb?.acts_label, a.label),
      heading: text(sb?.acts_heading, a.heading),
      items:
        sb?.acts && sb.acts.length
          ? sb.acts.map((it, i) => ({
              kicker: text(it.kicker, a.items[i]?.kicker ?? ""),
              title: text(it.title, a.items[i]?.title ?? ""),
              line: text(it.line, a.items[i]?.line ?? ""),
              photo: img(it.photo, a.items[i]?.photo ?? ""),
            }))
          : a.items,
    },
    celebrations: {
      label: text(sb?.celebrations_label, c.label),
      title: text(sb?.celebrations_title, c.title),
      intro: text(sb?.celebrations_intro, c.intro),
    },
    invitation: {
      title: text(sb?.invitation_title, inv.title),
      line1: text(sb?.invitation_line1, inv.line1),
      line2: text(sb?.invitation_line2, inv.line2),
      cta: text(sb?.invitation_cta_label, inv.cta),
      ctaHref: text(sb?.invitation_cta_href, "/consult"),
    },
  };
}
export type HomeContent = ReturnType<typeof mapHome>;

/* ---------------- atelier --------------------------------------------- */
export function mapAtelier(sb: SbAtelierPage | null, lang: Lang) {
  const at = ATELIER[lang];
  const hero = sb?.hero?.[0];
  const photos = ["/photos/craft/server-shemagh-cups.jpg", "/photos/hall/olive-tree-light.jpg", "/photos/craft/sweets-silver-platter.jpg"];
  return {
    hero: {
      eyebrow: text(hero?.eyebrow, at.eyebrow),
      headline: text(hero?.headline, at.headline),
      intro: text(hero?.intro, at.intro),
    },
    principlesLabel: text(sb?.principles_label, lang === "ar" ? "ثلاثة مبادئ" : "Three principles"),
    principles:
      sb?.principles && sb.principles.length
        ? sb.principles.map((pr, i) => ({
            ar: text(pr.word_ar, at.principles[i]?.ar ?? ""),
            en: text(pr.word_en, at.principles[i]?.en ?? ""),
            body: text(pr.body, at.principles[i]?.body ?? ""),
            photo: img(pr.photo, photos[i] ?? photos[0]),
          }))
        : at.principles.map((pr, i) => ({ ...pr, photo: photos[i] ?? photos[0] })),
    network: {
      label: text(sb?.network_label, at.network.label),
      title: text(sb?.network_title, at.network.title),
      body: text(sb?.network_body, at.network.body),
      photo: img(sb?.network_photo, "/photos/majlis/sheikh-portrait.jpg"),
    },
    terms: {
      label: text(sb?.terms_label, at.terms.label),
      title: text(sb?.terms_title, at.terms.title),
      lines: lines(sb?.terms_lines, at.terms.lines),
    },
  };
}
export type AtelierContent = ReturnType<typeof mapAtelier>;

/* ---------------- heritage -------------------------------------------- */
export function mapHeritage(sb: SbHeritagePage | null, lang: Lang) {
  const hr = HERITAGE[lang];
  const hero = sb?.hero?.[0];
  return {
    eyebrow: text(hero?.eyebrow, hr.eyebrow),
    title: text(hero?.headline, hr.title),
    intro: text(hero?.intro, hr.intro),
    introImage: img(sb?.intro_image, hr.introImage),
    intermezzoImage: img(sb?.intermezzo_image, hr.intermezzoImage),
    chapters:
      sb?.chapters && sb.chapters.length
        ? sb.chapters.map((ch, i) => ({
            number: text(ch.number, hr.chapters[i]?.number ?? String(i + 1).padStart(2, "0")),
            title: text(ch.title, hr.chapters[i]?.title ?? ""),
            body: text(ch.body, hr.chapters[i]?.body ?? ""),
            pullquote: ch.pullquote && ch.pullquote.trim() ? ch.pullquote : undefined,
          }))
        : hr.chapters,
  };
}
export type HeritageContent = ReturnType<typeof mapHeritage>;

/* ---------------- services -------------------------------------------- */
export function mapServices(sb: SbServicesPage | null, lang: Lang) {
  const sv = SERVICES_PROTOCOL[lang];
  const hero = sb?.hero?.[0];
  return {
    eyebrow: text(hero?.eyebrow, sv.eyebrow),
    title: text(hero?.headline, sv.title),
    intro: text(hero?.intro, sv.intro),
    intermezzoImage: img(sb?.intermezzo_image, sv.intermezzoImage),
    phases:
      sb?.phases && sb.phases.length
        ? sb.phases.map((ph, i) => ({
            ar: text(ph.name_ar, sv.phases[i]?.ar ?? ""),
            en: text(ph.name_en, sv.phases[i]?.en ?? ""),
            body: text(ph.body, sv.phases[i]?.body ?? ""),
            photo: img(ph.photo, sv.phases[i]?.photo ?? ""),
          }))
        : sv.phases,
  };
}
export type ServicesContent = ReturnType<typeof mapServices>;

/* ---------------- consult --------------------------------------------- */
export function mapConsult(sb: SbConsultPage | null, lang: Lang) {
  const co = CONSULT[lang];
  return {
    eyebrow: text(sb?.eyebrow, co.eyebrow),
    headline: text(sb?.headline, co.headline),
    sub: text(sb?.sub, co.sub),
    body: text(sb?.body, co.body),
    fields: {
      name: text(sb?.field_name_label, co.fields.name),
      date: text(sb?.field_date_label, co.fields.date),
      datePlaceholder: text(sb?.field_date_placeholder, lang === "ar" ? "شهر/سنة" : "Month / Year"),
      guests: text(sb?.field_guests_label, co.fields.guests),
      contact: text(sb?.field_contact_label, co.fields.contact),
      notes: text(sb?.field_notes_label, co.fields.notes),
      notesHint: text(sb?.field_notes_hint, co.fields.notesHint),
    },
    submit: text(sb?.submit_label, co.submit),
    submitted: {
      line1: text(sb?.submitted_line1, co.submitted.line1),
      line2: text(sb?.submitted_line2, co.submitted.line2),
    },
  };
}
export type ConsultContent = ReturnType<typeof mapConsult>;

/* ---------------- contact --------------------------------------------- */
export function mapContact(sb: SbContactPage | null, lang: Lang) {
  const hero = sb?.hero?.[0];
  const isAr = lang === "ar";
  return {
    eyebrow: text(hero?.eyebrow, isAr ? "التواصل" : "Contact"),
    title: text(hero?.headline, isAr ? "البَاب." : "The door."),
    intro: text(
      hero?.intro,
      isAr
        ? "صالة الرجال هي مَرسَمُنا الكامل — الباقات، التَجهيز، الضيافة، التَوثيق. للسيدات، نَعرِض خدماتٍ مُختارة."
        : "The men's hall is our full atelier — packages, production, hospitality, documentation. For women, we offer selected services."
    ),
    primaryImage: img(sb?.primary_image, "/photos/majlis/calligraphy-wood-wall.jpg"),
    letter: {
      label: text(sb?.letter_label, isAr ? "الرسالة" : "The letter"),
      headline: text(sb?.letter_headline, isAr ? "اُكتُب الرسالة الكاملة." : "Write the full letter."),
      body: text(
        sb?.letter_body,
        isAr
          ? "للاستفسارات المفصّلة — التاريخ، عدد الضيوف، الباقة المُختارة — اُكتُب لنا الرسالة الكاملة وسَنرُد خلال ثلاثة أيام."
          : "For detailed enquiries — date, number of guests, chosen package — write the full letter and we will reply within three days."
      ),
      cta: text(sb?.letter_cta_label, isAr ? "اكتب الرسالة" : "Write the letter"),
    },
  };
}
export type ContactContent = ReturnType<typeof mapContact>;

/* ---------------- packages -------------------------------------------- */
export function mapPackages(sb: SbPackagesPage | null, lang: Lang) {
  const baseMeta = PACKAGES_META[lang];
  const wmBase = WOMENS_META[lang];

  const sectionLabels: Record<string, string> = { ...baseMeta.sectionLabels };
  for (const sl of sb?.section_labels ?? []) {
    if (sl.key) sectionLabels[sl.key] = text(sl.label, sectionLabels[sl.key] ?? sl.key);
  }

  const tiers: Package[] =
    sb?.mens_tiers && sb.mens_tiers.length
      ? sb.mens_tiers.map((t, i) => {
          const fb = PACKAGES[lang][i];
          return {
            id: text(t.uid, fb?.id ?? `tier-${i}`),
            tier: text(t.tier_slug, fb?.tier ?? "silver") as Package["tier"],
            name: text(t.name, fb?.name ?? ""),
            priceQAR: Number(t.price_qar) || fb?.priceQAR || 0,
            highlight: text(t.highlight, fb?.highlight ?? ""),
            photo: img(t.photo, fb?.photo ?? ""),
            sections: (t.sections ?? []).map((s, si) => {
              let key = s.key || "";
              if (!key && s.custom_label) {
                key = slugify(s.custom_label);
                sectionLabels[key] = s.custom_label;
              } else if (key && s.custom_label) {
                sectionLabels[key] = s.custom_label;
              }
              return {
                key: (key || fb?.sections[si]?.key || "hall") as Package["sections"][number]["key"],
                bullets: lines(s.bullets, fb?.sections[si]?.bullets ?? []),
              };
            }),
          };
        })
      : PACKAGES[lang];

  const meta = {
    eyebrow: text(sb?.mens_eyebrow, baseMeta.eyebrow),
    title: text(sb?.mens_title, baseMeta.title),
    intro: text(sb?.mens_intro, baseMeta.intro),
    cta: text(sb?.mens_cta, baseMeta.cta),
    priceLabel: text(sb?.price_label, baseMeta.priceLabel),
    sectionLabels,
  };

  const womens = {
    meta: {
      eyebrow: text(sb?.womens_eyebrow, wmBase.eyebrow),
      title: text(sb?.womens_title, wmBase.title),
      intro: text(sb?.womens_intro, wmBase.intro),
      hospitalityTitle: text(sb?.womens_hospitality_title, wmBase.hospitalityTitle),
      beveragesTitle: text(sb?.womens_beverages_title, wmBase.beveragesTitle),
      perPerson: text(sb?.womens_per_person, wmBase.perPerson),
      perTray: text(sb?.womens_per_tray, wmBase.perTray),
      enquireLabel: text(sb?.womens_enquire_label, wmBase.enquireLabel),
      phoneLabel: text(sb?.womens_phone_label, wmBase.phoneLabel),
      menuTitle: text(sb?.womens_menu_title, wmBase.menuTitle),
    },
    hospitality:
      sb?.womens_hospitality && sb.womens_hospitality.length
        ? sb.womens_hospitality.map((t) => ({ capacity: Number(t.capacity) || 0 }))
        : WOMENS_HOSPITALITY.map((t) => ({ capacity: t.capacity })),
    beverages:
      sb?.womens_beverages && sb.womens_beverages.length
        ? sb.womens_beverages.map((t) => ({ capacity: Number(t.capacity) || 0 }))
        : WOMENS_BEVERAGES.map((t) => ({ capacity: t.capacity })),
    menu:
      sb?.womens_menu && sb.womens_menu.length
        ? sb.womens_menu.map((c) => ({ name: c.name, items: (c.items ?? []).map((i) => i.name) }))
        : WOMENS_BEVERAGE_CATEGORIES.map((c) => ({ name: c.name[lang], items: c.items.map((i) => i[lang]) })),
  };

  return { meta, tiers, womens };
}
export type PackagesContent = ReturnType<typeof mapPackages>;

/* ---------------- journal & celebrations (collections) ---------------- */
export function mapJournalList(items: SbJournalEntry[] | null, lang: Lang) {
  const j = JOURNAL[lang];
  if (!items || !items.length) return { meta: { eyebrow: j.eyebrow, title: j.title, intro: j.intro }, entries: j.entries };
  return {
    meta: { eyebrow: j.eyebrow, title: j.title, intro: j.intro },
    entries: items.map((e, i) => ({
      slug: j.entries[i]?.slug ?? `entry-${i}`,
      kicker: text(e.kicker, j.entries[i]?.kicker ?? ""),
      title: text(e.title, j.entries[i]?.title ?? ""),
      excerpt: text(e.excerpt, j.entries[i]?.excerpt ?? ""),
      photo: img(e.cover_photo, j.entries[i]?.photo ?? ""),
    })),
  };
}

export function mapCelebrationItems(items: SbCelebrationCase[] | null, lang: Lang) {
  const c = CELEBRATIONS[lang];
  if (!items || !items.length) return c.items;
  return items.map((it, i) => ({
    title: text(it.title, c.items[i]?.title ?? ""),
    when: text(it.when, c.items[i]?.when ?? ""),
    where: text(it.where, c.items[i]?.where ?? ""),
    guests: text(it.guests, c.items[i]?.guests ?? ""),
    note: text(it.note, c.items[i]?.note ?? ""),
    photo: img(it.photo, c.items[i]?.photo ?? ""),
  }));
}

/* ---------------- globals --------------------------------------------- */
export function mapGlobals(sb: SbGlobals | null, lang: Lang) {
  const f = FOOTER[lang];
  const cal = CALLOUT[lang];
  return {
    nav:
      sb?.nav && sb.nav.length
        ? sb.nav.map((n, i) => ({ href: text(n.href, NAV[lang][i]?.href ?? "/"), label: text(n.label, NAV[lang][i]?.label ?? "") }))
        : NAV[lang].map((n) => ({ href: n.href, label: n.label })),
    phones: {
      mens: {
        tel: text(sb?.phone_mens?.[0]?.tel, PHONES.mens.tel),
        display: text(sb?.phone_mens?.[0]?.display, PHONES.mens.display),
        label: text(sb?.phone_mens?.[0]?.label, PHONES.mens.label[lang]),
        note: text(sb?.phone_mens?.[0]?.note, PHONES.mens.note?.[lang] ?? ""),
      },
      womens: {
        tel: text(sb?.phone_womens?.[0]?.tel, PHONES.womens.tel),
        display: text(sb?.phone_womens?.[0]?.display, PHONES.womens.display),
        label: text(sb?.phone_womens?.[0]?.label, PHONES.womens.label[lang]),
        note: text(sb?.phone_womens?.[0]?.note, PHONES.womens.note?.[lang] ?? ""),
      },
    },
    email: text(sb?.email, EMAIL),
    location: text(sb?.location, LOCATION[lang]),
    receptionHours: text(sb?.reception_hours, lang === "ar" ? "الأحد ـ الخميس\n١٠ صباحًا ـ ٧ مساءً" : "Sunday – Thursday\n10:00 — 19:00"),
    socials:
      sb?.socials && sb.socials.length
        ? sb.socials.map((s, i) => ({ name: s.platform, handle: text(s.handle, SOCIALS[i]?.handle ?? ""), url: text(s.url, SOCIALS[i]?.url ?? "#") }))
        : SOCIALS,
    footer: {
      tagline: text(sb?.footer_tagline, lang === "ar" ? "صالة الرجال التي تليق بالديوان." : "The men's hall worthy of the Diwan."),
      address: text(sb?.footer_address, f.address),
      rights: text(sb?.footer_rights, f.rights),
    },
    callout: {
      eyebrow: text(sb?.callout_eyebrow, cal.eyebrow),
      title: text(sb?.callout_title, cal.title),
      intro: text(sb?.callout_intro, cal.intro),
      letter: text(sb?.callout_letter_label, cal.letter),
      letterDesc: text(sb?.callout_letter_desc, cal.letterDesc),
      letterAction: text(sb?.callout_letter_action, cal.letterAction),
      callTitle: text(sb?.callout_call_title, cal.callTitle),
      callDesc: text(sb?.callout_call_desc, cal.callDesc),
    },
  };
}
export type GlobalsContent = ReturnType<typeof mapGlobals>;
