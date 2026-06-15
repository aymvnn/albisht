import "./load-env";
import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { createClient } from "@sanity/client";

import { NAV, HERO, REVEAL_PHRASE, PROMISE, ACTS, CELEBRATIONS, INVITATION, FOOTER, ATELIER, CONSULT, PACKAGES_META } from "../../lib/copy";
import { PACKAGES, WOMENS_HOSPITALITY, WOMENS_BEVERAGES, WOMENS_BEVERAGE_CATEGORIES, WOMENS_META } from "../../lib/packages";
import { EMAIL, SOCIALS, LOCATION, CALLOUT } from "../../lib/contact";
import { HERITAGE, SERVICES_PROTOCOL, JOURNAL } from "../../lib/inline-content";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;
if (!projectId || !token) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN. See sanity/README.md.");
}

const client = createClient({ projectId, dataset, apiVersion: "2025-02-19", token, useCdn: false });

/* ---- assets (upload once, cache by path) ----------------------------- */
const PUBLIC = path.resolve(process.cwd(), "public");
const MAP_PATH = path.resolve(process.cwd(), "sanity", "import", "asset-map.json");
let assetMap: Record<string, string> = {};
try { assetMap = JSON.parse(fs.readFileSync(MAP_PATH, "utf8")); } catch { /* fresh */ }

async function image(relPath: string) {
  if (!assetMap[relPath]) {
    const abs = path.join(PUBLIC, relPath.replace(/^\//, ""));
    const buf = fs.readFileSync(abs);
    const asset = await client.assets.upload("image", buf, { filename: path.basename(abs) });
    assetMap[relPath] = asset._id;
    fs.writeFileSync(MAP_PATH, JSON.stringify(assetMap, null, 2));
    console.log(`  ↑ ${relPath}`);
  }
  return { _type: "image", asset: { _type: "reference", _ref: assetMap[relPath] } };
}

/* ---- builders -------------------------------------------------------- */
const ls = (ar: string, en: string) => ({ _type: "localeString", ar, en });
const lt = (ar: string, en: string) => ({ _type: "localeText", ar, en });
const member = (type: string, fields: Record<string, unknown>) => ({ _type: type, _key: randomUUID(), ...fields });

async function run() {
  console.log(`Importing into ${projectId}/${dataset}…`);
  const docs: Record<string, unknown>[] = [];

  /* globals */
  docs.push({
    _id: "globals",
    _type: "globals",
    phoneMens: { _type: "phone", tel: "+97433777074", display: "+974 3377 7074", label: ls("صالة الرجال", "Men's Hall"), note: ls("كامل خدمات الصالة + الباقات", "Full hall services + packages"), weight: "primary" },
    phoneWomens: { _type: "phone", tel: "+97450008019", display: "+974 5000 8019", label: ls("للسيدات", "For women"), note: ls("خدمات مختارة", "Selected services"), weight: "secondary" },
    email: EMAIL,
    location: ls(LOCATION.ar, LOCATION.en),
    receptionHours: lt("الأحد ـ الخميس\n١٠ صباحًا ـ ٧ مساءً", "Sunday – Thursday\n10:00 — 19:00"),
    socials: SOCIALS.map((s) => member("socialLink", { platform: s.name, handle: s.handle, url: s.url })),
    nav: NAV.ar.map((item, i) => member("navItem", { href: item.href, label: ls(NAV.ar[i].label, NAV.en[i].label) })),
    footerTagline: ls("صالة الرجال التي تليق بالديوان.", "The men's hall worthy of the Diwan."),
    footerAddress: ls(FOOTER.ar.address, FOOTER.en.address),
    footerRights: ls(FOOTER.ar.rights, FOOTER.en.rights),
    calloutEyebrow: ls(CALLOUT.ar.eyebrow, CALLOUT.en.eyebrow),
    calloutTitle: ls(CALLOUT.ar.title, CALLOUT.en.title),
    calloutIntro: lt(CALLOUT.ar.intro, CALLOUT.en.intro),
    calloutLetterLabel: ls(CALLOUT.ar.letter, CALLOUT.en.letter),
    calloutLetterDesc: lt(CALLOUT.ar.letterDesc, CALLOUT.en.letterDesc),
    calloutLetterAction: ls(CALLOUT.ar.letterAction, CALLOUT.en.letterAction),
    calloutCallTitle: ls(CALLOUT.ar.callTitle, CALLOUT.en.callTitle),
    calloutCallDesc: lt(CALLOUT.ar.callDesc, CALLOUT.en.callDesc),
  });

  /* home */
  docs.push({
    _id: "homePage",
    _type: "homePage",
    heroEyebrow: ls(HERO.ar.eyebrow, HERO.en.eyebrow),
    heroHeadline: ls(HERO.ar.headline, HERO.en.headline),
    heroSubline: ls(HERO.ar.subline, HERO.en.subline),
    heroCtaLabel: ls(HERO.ar.cta, HERO.en.cta),
    heroCtaHref: "/consult",
    heroImage: await image("/photos/hall/hero-pearl-court.jpg"),
    revealPhrase: ls(REVEAL_PHRASE.ar, REVEAL_PHRASE.en),
    promiseTitle: ls(PROMISE.ar.title, PROMISE.en.title),
    promiseLines: lt(PROMISE.ar.lines.join("\n"), PROMISE.en.lines.join("\n")),
    actsLabel: ls(ACTS.ar.label, ACTS.en.label),
    actsHeading: ls(ACTS.ar.heading, ACTS.en.heading),
    acts: await Promise.all(
      ACTS.ar.items.map(async (it, i) =>
        member("act", { kicker: ls(ACTS.ar.items[i].kicker, ACTS.en.items[i].kicker), title: ls(ACTS.ar.items[i].title, ACTS.en.items[i].title), line: lt(ACTS.ar.items[i].line, ACTS.en.items[i].line), photo: await image(it.photo) })
      )
    ),
    celebrationsLabel: ls(CELEBRATIONS.ar.label, CELEBRATIONS.en.label),
    celebrationsTitle: ls(CELEBRATIONS.ar.title, CELEBRATIONS.en.title),
    celebrationsIntro: lt(CELEBRATIONS.ar.intro, CELEBRATIONS.en.intro),
    invitationTitle: ls(INVITATION.ar.title, INVITATION.en.title),
    invitationLine1: ls(INVITATION.ar.line1, INVITATION.en.line1),
    invitationLine2: ls(INVITATION.ar.line2, INVITATION.en.line2),
    invitationCtaLabel: ls(INVITATION.ar.cta, INVITATION.en.cta),
    invitationCtaHref: "/consult",
    seo: { _type: "seo", title: ls("البِشت — صالة الرجال", "ALBISHT — Men's Hall Atelier"), description: lt(HERO.ar.subline, HERO.en.subline) },
  });

  /* atelier */
  const principlePhotos = ["/photos/craft/server-shemagh-cups.jpg", "/photos/hall/olive-tree-light.jpg", "/photos/craft/sweets-silver-platter.jpg"];
  docs.push({
    _id: "atelierPage",
    _type: "atelierPage",
    hero: { _type: "pageHero", eyebrow: ls(ATELIER.ar.eyebrow, ATELIER.en.eyebrow), headline: ls(ATELIER.ar.headline, ATELIER.en.headline), intro: lt(ATELIER.ar.intro, ATELIER.en.intro) },
    principlesLabel: ls("ثلاثة مبادئ", "Three principles"),
    principles: await Promise.all(
      ATELIER.ar.principles.map(async (p, i) =>
        member("principle", { wordAr: p.ar, wordEn: p.en, body: lt(ATELIER.ar.principles[i].body, ATELIER.en.principles[i].body), photo: await image(principlePhotos[i]) })
      )
    ),
    networkLabel: ls(ATELIER.ar.network.label, ATELIER.en.network.label),
    networkTitle: ls(ATELIER.ar.network.title, ATELIER.en.network.title),
    networkBody: lt(ATELIER.ar.network.body, ATELIER.en.network.body),
    networkPhoto: await image("/photos/majlis/night-majlis-outdoor.jpg"),
    termsLabel: ls(ATELIER.ar.terms.label, ATELIER.en.terms.label),
    termsTitle: ls(ATELIER.ar.terms.title, ATELIER.en.terms.title),
    termsLines: lt(ATELIER.ar.terms.lines.join("\n"), ATELIER.en.terms.lines.join("\n")),
  });

  /* heritage */
  docs.push({
    _id: "heritagePage",
    _type: "heritagePage",
    hero: { _type: "pageHero", eyebrow: ls(HERITAGE.ar.eyebrow, HERITAGE.en.eyebrow), headline: ls(HERITAGE.ar.title, HERITAGE.en.title), intro: lt(HERITAGE.ar.intro, HERITAGE.en.intro) },
    introImage: await image(HERITAGE.ar.introImage),
    chapters: await Promise.all(
      HERITAGE.ar.chapters.map(async (ch, i) =>
        member("chapter", { number: ch.number, title: ls(HERITAGE.ar.chapters[i].title, HERITAGE.en.chapters[i].title), body: lt(HERITAGE.ar.chapters[i].body, HERITAGE.en.chapters[i].body), pullquote: lt(HERITAGE.ar.chapters[i].pullquote ?? "", HERITAGE.en.chapters[i].pullquote ?? "") })
      )
    ),
    intermezzoImage: await image(HERITAGE.ar.intermezzoImage),
  });

  /* services */
  docs.push({
    _id: "servicesPage",
    _type: "servicesPage",
    hero: { _type: "pageHero", eyebrow: ls(SERVICES_PROTOCOL.ar.eyebrow, SERVICES_PROTOCOL.en.eyebrow), headline: ls(SERVICES_PROTOCOL.ar.title, SERVICES_PROTOCOL.en.title), intro: lt(SERVICES_PROTOCOL.ar.intro, SERVICES_PROTOCOL.en.intro) },
    phases: await Promise.all(
      SERVICES_PROTOCOL.ar.phases.map(async (ph, i) =>
        member("phase", { nameAr: ph.ar, nameEn: ph.en, body: lt(SERVICES_PROTOCOL.ar.phases[i].body, SERVICES_PROTOCOL.en.phases[i].body), photo: await image(ph.photo) })
      )
    ),
    intermezzoImage: await image(SERVICES_PROTOCOL.ar.intermezzoImage),
  });

  /* consult */
  docs.push({
    _id: "consultPage",
    _type: "consultPage",
    eyebrow: ls(CONSULT.ar.eyebrow, CONSULT.en.eyebrow),
    headline: ls(CONSULT.ar.headline, CONSULT.en.headline),
    sub: lt(CONSULT.ar.sub, CONSULT.en.sub),
    body: lt(CONSULT.ar.body, CONSULT.en.body),
    fieldNameLabel: ls(CONSULT.ar.fields.name, CONSULT.en.fields.name),
    fieldDateLabel: ls(CONSULT.ar.fields.date, CONSULT.en.fields.date),
    fieldDatePlaceholder: ls("شهر/سنة", "Month / Year"),
    fieldGuestsLabel: ls(CONSULT.ar.fields.guests, CONSULT.en.fields.guests),
    fieldContactLabel: ls(CONSULT.ar.fields.contact, CONSULT.en.fields.contact),
    fieldNotesLabel: ls(CONSULT.ar.fields.notes, CONSULT.en.fields.notes),
    fieldNotesHint: ls(CONSULT.ar.fields.notesHint, CONSULT.en.fields.notesHint),
    submitLabel: ls(CONSULT.ar.submit, CONSULT.en.submit),
    submittedLine1: ls(CONSULT.ar.submitted.line1, CONSULT.en.submitted.line1),
    submittedLine2: ls(CONSULT.ar.submitted.line2, CONSULT.en.submitted.line2),
  });

  /* contact */
  docs.push({
    _id: "contactPage",
    _type: "contactPage",
    hero: { _type: "pageHero", eyebrow: ls("التواصل", "Contact"), headline: ls("البَاب.", "The door."), intro: lt("صالة الرجال هي مَرسَمُنا الكامل — الباقات، التَجهيز، الضيافة، التَوثيق. للسيدات، نَعرِض خدماتٍ مُختارة.", "The men's hall is our full atelier — packages, production, hospitality, documentation. For women, we offer selected services.") },
    primaryImage: await image("/photos/majlis/calligraphy-wood-wall.jpg"),
    letterLabel: ls("الرسالة", "The letter"),
    letterHeadline: ls("اُكتُب الرسالة الكاملة.", "Write the full letter."),
    letterBody: lt("للاستفسارات المفصّلة — التاريخ، عدد الضيوف، الباقة المُختارة — اُكتُب لنا الرسالة الكاملة وسَنرُد خلال ثلاثة أيام.", "For detailed enquiries — date, number of guests, chosen package — write the full letter and we will reply within three days."),
    letterCtaLabel: ls("اكتب الرسالة", "Write the letter"),
  });

  /* packages */
  const SECTION_KEYS = ["hall", "lobby", "hospitality", "photography", "exterior"] as const;
  docs.push({
    _id: "packagesPage",
    _type: "packagesPage",
    hero: { _type: "pageHero", eyebrow: ls(PACKAGES_META.ar.eyebrow, PACKAGES_META.en.eyebrow), headline: ls(PACKAGES_META.ar.title, PACKAGES_META.en.title), intro: lt(PACKAGES_META.ar.intro, PACKAGES_META.en.intro) },
    mensEyebrow: ls(PACKAGES_META.ar.eyebrow, PACKAGES_META.en.eyebrow),
    mensTitle: ls(PACKAGES_META.ar.title, PACKAGES_META.en.title),
    mensIntro: lt(PACKAGES_META.ar.intro, PACKAGES_META.en.intro),
    mensCta: ls(PACKAGES_META.ar.cta, PACKAGES_META.en.cta),
    priceLabel: ls(PACKAGES_META.ar.priceLabel, PACKAGES_META.en.priceLabel),
    sectionLabels: SECTION_KEYS.map((k) => member("sectionLabel", { key: k, label: ls(PACKAGES_META.ar.sectionLabels[k], PACKAGES_META.en.sectionLabels[k]) })),
    mensTiers: await Promise.all(
      PACKAGES.ar.map(async (pk, i) =>
        member("packageTier", {
          uid: pk.id,
          tierSlug: pk.tier,
          name: ls(PACKAGES.ar[i].name, PACKAGES.en[i].name),
          priceQar: pk.priceQAR,
          highlight: lt(PACKAGES.ar[i].highlight, PACKAGES.en[i].highlight),
          photo: await image(pk.photo),
          sections: pk.sections.map((sec, si) => member("packageSection", { key: sec.key, bullets: lt(PACKAGES.ar[i].sections[si].bullets.join("\n"), PACKAGES.en[i].sections[si].bullets.join("\n")) })),
        })
      )
    ),
    womensEyebrow: ls(WOMENS_META.ar.eyebrow, WOMENS_META.en.eyebrow),
    womensTitle: ls(WOMENS_META.ar.title, WOMENS_META.en.title),
    womensIntro: lt(WOMENS_META.ar.intro, WOMENS_META.en.intro),
    womensHospitalityTitle: ls(WOMENS_META.ar.hospitalityTitle, WOMENS_META.en.hospitalityTitle),
    womensBeveragesTitle: ls(WOMENS_META.ar.beveragesTitle, WOMENS_META.en.beveragesTitle),
    womensPerPerson: ls(WOMENS_META.ar.perPerson, WOMENS_META.en.perPerson),
    womensPerTray: ls(WOMENS_META.ar.perTray, WOMENS_META.en.perTray),
    womensEnquireLabel: ls(WOMENS_META.ar.enquireLabel, WOMENS_META.en.enquireLabel),
    womensPhoneLabel: ls(WOMENS_META.ar.phoneLabel, WOMENS_META.en.phoneLabel),
    womensMenuTitle: ls(WOMENS_META.ar.menuTitle, WOMENS_META.en.menuTitle),
    womensHospitality: WOMENS_HOSPITALITY.map((t) => member("capacityTier", { capacity: t.capacity })),
    womensBeverages: WOMENS_BEVERAGES.map((t) => member("capacityTier", { capacity: t.capacity })),
    womensMenu: WOMENS_BEVERAGE_CATEGORIES.map((cat) => member("beverageCategory", { name: ls(cat.name.ar, cat.name.en), items: cat.items.map((it) => member("beverageItem", { name: ls(it.ar, it.en) })) })),
  });

  /* journal entries */
  for (let i = 0; i < JOURNAL.ar.entries.length; i++) {
    const e = JOURNAL.ar.entries[i];
    docs.push({
      _id: `journalEntry-${e.slug}`,
      _type: "journalEntry",
      title: ls(JOURNAL.ar.entries[i].title, JOURNAL.en.entries[i].title),
      slug: { _type: "slug", current: e.slug },
      kicker: ls(JOURNAL.ar.entries[i].kicker, JOURNAL.en.entries[i].kicker),
      excerpt: lt(JOURNAL.ar.entries[i].excerpt, JOURNAL.en.entries[i].excerpt),
      coverPhoto: await image(e.photo),
      featured: i === 0,
    });
  }

  /* celebrations */
  for (let i = 0; i < CELEBRATIONS.ar.items.length; i++) {
    const it = CELEBRATIONS.ar.items[i];
    docs.push({
      _id: `celebrationCase-${i + 1}`,
      _type: "celebrationCase",
      title: ls(CELEBRATIONS.ar.items[i].title, CELEBRATIONS.en.items[i].title),
      slug: { _type: "slug", current: `celebration-${i + 1}` },
      when: ls(CELEBRATIONS.ar.items[i].when, CELEBRATIONS.en.items[i].when),
      where: ls(CELEBRATIONS.ar.items[i].where, CELEBRATIONS.en.items[i].where),
      guests: ls(CELEBRATIONS.ar.items[i].guests, CELEBRATIONS.en.items[i].guests),
      note: lt(CELEBRATIONS.ar.items[i].note, CELEBRATIONS.en.items[i].note),
      photo: await image(it.photo),
    });
  }

  // Write everything in one transaction (idempotent: createOrReplace by _id).
  const tx = client.transaction();
  for (const doc of docs) tx.createOrReplace(doc as never);
  await tx.commit();
  console.log(`✓ Imported ${docs.length} documents.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
