/**
 * Build every Storyblok story from the canonical lib/ data and push it.
 * AR values go in the default fields; EN values go in <field>__i18n__en
 * (field-level translation). Re-runnable — every story is upserted by slug.
 *
 * Assets resolve through asset-map.json when present; otherwise the original
 * "/photos/..." path is stored and served by the Next app from /public.
 */
import fs from "node:fs";
import path from "node:path";
import { blok, ensureFolder, tr, upsertStory } from "./mapi";

import { NAV, HERO, REVEAL_PHRASE, PROMISE, ACTS, CELEBRATIONS, INVITATION, FOOTER, ATELIER, CONSULT, PACKAGES_META } from "../../lib/copy";
import { PACKAGES, WOMENS_HOSPITALITY, WOMENS_BEVERAGES, WOMENS_BEVERAGE_CATEGORIES, WOMENS_META } from "../../lib/packages";
import { EMAIL, SOCIALS, LOCATION, CALLOUT } from "../../lib/contact";
import { HERITAGE, SERVICES_PROTOCOL, JOURNAL } from "../../lib/inline-content";

/* ---- assets ---------------------------------------------------------- */

type AssetRecord = { id: number | null; url: string; alt: string };
const MAP_PATH = path.resolve(process.cwd(), "storyblok", "migrate", "asset-map.json");
let assetMap: Record<string, AssetRecord> = {};
try {
  assetMap = JSON.parse(fs.readFileSync(MAP_PATH, "utf8"));
} catch {
  console.warn("  (no asset-map.json — falling back to /public photo paths)");
}

function asset(p: string) {
  const rec = assetMap[p];
  const filename = (rec?.url ?? p).replace(
    "https://s3.amazonaws.com/a.storyblok.com/",
    "https://a.storyblok.com/"
  );
  return {
    id: rec?.id ?? null,
    filename,
    alt: rec?.alt ?? "",
    name: "",
    title: "",
    focus: null,
  };
}
const emptyAsset = () => ({ id: null, filename: "", alt: "", name: "", title: "", focus: null });
const emptyRichtext = () => ({ type: "doc", content: [] });

function seo(arTitle: string, enTitle: string, arDesc: string, enDesc: string) {
  return [
    blok("seo", {
      ...tr("title", arTitle, enTitle),
      ...tr("description", arDesc, enDesc),
      og_image: emptyAsset(),
    }),
  ];
}

/* ---- principle / atelier photos (were inline in the page) ------------ */
const PRINCIPLE_PHOTOS = [
  "/photos/craft/server-shemagh-cups.jpg",
  "/photos/hall/olive-tree-light.jpg",
  "/photos/craft/sweets-silver-platter.jpg",
];

/* ===================================================================== */

export async function pushContent() {
  /* ---- globals ------------------------------------------------------ */
  console.log("Globals…");
  await upsertStory({
    name: "Globals",
    slug: "globals",
    contentType: "globals",
    publish: true,
    content: {
      phone_mens: [
        blok("phone", {
          tel: "+97433777074",
          display: "+974 3377 7074",
          ...tr("label", "صالة الرجال", "Men's Hall"),
          ...tr("note", "كامل خدمات الصالة + الباقات", "Full hall services + packages"),
          weight: "primary",
        }),
      ],
      phone_womens: [
        blok("phone", {
          tel: "+97450008019",
          display: "+974 5000 8019",
          ...tr("label", "للسيدات", "For women"),
          ...tr("note", "خدمات مختارة", "Selected services"),
          weight: "secondary",
        }),
      ],
      email: EMAIL,
      ...tr("location", LOCATION.ar, LOCATION.en),
      ...tr("reception_hours", "الأحد ـ الخميس\n١٠ صباحًا ـ ٧ مساءً", "Sunday – Thursday\n10:00 — 19:00"),
      socials: SOCIALS.map((s) =>
        blok("social_link", { platform: s.name, handle: s.handle, url: s.url })
      ),
      nav: NAV.ar.map((item, i) =>
        blok("nav_item", { href: item.href, ...tr("label", NAV.ar[i].label, NAV.en[i].label) })
      ),
      ...tr("footer_tagline", "صالة الرجال التي تليق بالديوان.", "The men's hall worthy of the Diwan."),
      ...tr("footer_address", FOOTER.ar.address, FOOTER.en.address),
      ...tr("footer_rights", FOOTER.ar.rights, FOOTER.en.rights),
      ...tr("callout_eyebrow", CALLOUT.ar.eyebrow, CALLOUT.en.eyebrow),
      ...tr("callout_title", CALLOUT.ar.title, CALLOUT.en.title),
      ...tr("callout_intro", CALLOUT.ar.intro, CALLOUT.en.intro),
      ...tr("callout_letter_label", CALLOUT.ar.letter, CALLOUT.en.letter),
      ...tr("callout_letter_desc", CALLOUT.ar.letterDesc, CALLOUT.en.letterDesc),
      ...tr("callout_letter_action", CALLOUT.ar.letterAction, CALLOUT.en.letterAction),
      ...tr("callout_call_title", CALLOUT.ar.callTitle, CALLOUT.en.callTitle),
      ...tr("callout_call_desc", CALLOUT.ar.callDesc, CALLOUT.en.callDesc),
    },
  });

  /* ---- home --------------------------------------------------------- */
  console.log("Home…");
  await upsertStory({
    name: "Home",
    slug: "home",
    contentType: "home_page",
    publish: true,
    content: {
      seo: seo("البِشت — صالة الرجال", "ALBISHT — Men's Hall Atelier", HERO.ar.subline, HERO.en.subline),
      ...tr("hero_eyebrow", HERO.ar.eyebrow, HERO.en.eyebrow),
      ...tr("hero_headline", HERO.ar.headline, HERO.en.headline),
      ...tr("hero_subline", HERO.ar.subline, HERO.en.subline),
      ...tr("hero_cta_label", HERO.ar.cta, HERO.en.cta),
      hero_cta_href: "/consult",
      hero_image: asset("/photos/hall/hero-pearl-court.jpg"),
      ...tr("reveal_phrase", REVEAL_PHRASE.ar, REVEAL_PHRASE.en),
      ...tr("promise_title", PROMISE.ar.title, PROMISE.en.title),
      ...tr("promise_lines", PROMISE.ar.lines.join("\n"), PROMISE.en.lines.join("\n")),
      ...tr("acts_label", ACTS.ar.label, ACTS.en.label),
      ...tr("acts_heading", ACTS.ar.heading, ACTS.en.heading),
      acts: ACTS.ar.items.map((it, i) =>
        blok("act", {
          ...tr("kicker", ACTS.ar.items[i].kicker, ACTS.en.items[i].kicker),
          ...tr("title", ACTS.ar.items[i].title, ACTS.en.items[i].title),
          ...tr("line", ACTS.ar.items[i].line, ACTS.en.items[i].line),
          photo: asset(it.photo),
        })
      ),
      ...tr("celebrations_label", CELEBRATIONS.ar.label, CELEBRATIONS.en.label),
      ...tr("celebrations_title", CELEBRATIONS.ar.title, CELEBRATIONS.en.title),
      ...tr("celebrations_intro", CELEBRATIONS.ar.intro, CELEBRATIONS.en.intro),
      ...tr("invitation_title", INVITATION.ar.title, INVITATION.en.title),
      ...tr("invitation_line1", INVITATION.ar.line1, INVITATION.en.line1),
      ...tr("invitation_line2", INVITATION.ar.line2, INVITATION.en.line2),
      ...tr("invitation_cta_label", INVITATION.ar.cta, INVITATION.en.cta),
      invitation_cta_href: "/consult",
    },
  });

  /* ---- atelier ------------------------------------------------------ */
  console.log("Atelier…");
  await upsertStory({
    name: "Atelier",
    slug: "atelier",
    contentType: "atelier_page",
    publish: true,
    content: {
      seo: seo(ATELIER.ar.eyebrow, ATELIER.en.eyebrow, ATELIER.ar.intro, ATELIER.en.intro),
      hero: [
        blok("page_hero", {
          ...tr("eyebrow", ATELIER.ar.eyebrow, ATELIER.en.eyebrow),
          ...tr("headline", ATELIER.ar.headline, ATELIER.en.headline),
          ...tr("intro", ATELIER.ar.intro, ATELIER.en.intro),
        }),
      ],
      ...tr("principles_label", "ثلاثة مبادئ", "Three principles"),
      principles: ATELIER.ar.principles.map((p, i) =>
        blok("principle", {
          word_ar: p.ar,
          word_en: p.en,
          ...tr("body", ATELIER.ar.principles[i].body, ATELIER.en.principles[i].body),
          photo: asset(PRINCIPLE_PHOTOS[i]),
        })
      ),
      ...tr("network_label", ATELIER.ar.network.label, ATELIER.en.network.label),
      ...tr("network_title", ATELIER.ar.network.title, ATELIER.en.network.title),
      ...tr("network_body", ATELIER.ar.network.body, ATELIER.en.network.body),
      network_photo: asset("/photos/majlis/sheikh-portrait.jpg"),
      ...tr("terms_label", ATELIER.ar.terms.label, ATELIER.en.terms.label),
      ...tr("terms_title", ATELIER.ar.terms.title, ATELIER.en.terms.title),
      ...tr("terms_lines", ATELIER.ar.terms.lines.join("\n"), ATELIER.en.terms.lines.join("\n")),
    },
  });

  /* ---- heritage ----------------------------------------------------- */
  console.log("Heritage…");
  await upsertStory({
    name: "Heritage",
    slug: "heritage",
    contentType: "heritage_page",
    publish: true,
    content: {
      seo: seo(HERITAGE.ar.title, HERITAGE.en.title, HERITAGE.ar.intro, HERITAGE.en.intro),
      hero: [
        blok("page_hero", {
          ...tr("eyebrow", HERITAGE.ar.eyebrow, HERITAGE.en.eyebrow),
          ...tr("headline", HERITAGE.ar.title, HERITAGE.en.title),
          ...tr("intro", HERITAGE.ar.intro, HERITAGE.en.intro),
        }),
      ],
      intro_image: asset(HERITAGE.ar.introImage),
      chapters: HERITAGE.ar.chapters.map((ch, i) =>
        blok("chapter", {
          number: ch.number,
          ...tr("title", HERITAGE.ar.chapters[i].title, HERITAGE.en.chapters[i].title),
          ...tr("body", HERITAGE.ar.chapters[i].body, HERITAGE.en.chapters[i].body),
          ...tr("pullquote", HERITAGE.ar.chapters[i].pullquote ?? "", HERITAGE.en.chapters[i].pullquote ?? ""),
        })
      ),
      intermezzo_image: asset(HERITAGE.ar.intermezzoImage),
    },
  });

  /* ---- services ----------------------------------------------------- */
  console.log("Services…");
  await upsertStory({
    name: "Services",
    slug: "services",
    contentType: "services_page",
    publish: true,
    content: {
      seo: seo(SERVICES_PROTOCOL.ar.title, SERVICES_PROTOCOL.en.title, SERVICES_PROTOCOL.ar.intro, SERVICES_PROTOCOL.en.intro),
      hero: [
        blok("page_hero", {
          ...tr("eyebrow", SERVICES_PROTOCOL.ar.eyebrow, SERVICES_PROTOCOL.en.eyebrow),
          ...tr("headline", SERVICES_PROTOCOL.ar.title, SERVICES_PROTOCOL.en.title),
          ...tr("intro", SERVICES_PROTOCOL.ar.intro, SERVICES_PROTOCOL.en.intro),
        }),
      ],
      phases: SERVICES_PROTOCOL.ar.phases.map((ph, i) =>
        blok("phase", {
          name_ar: ph.ar,
          name_en: ph.en,
          ...tr("body", SERVICES_PROTOCOL.ar.phases[i].body, SERVICES_PROTOCOL.en.phases[i].body),
          photo: asset(ph.photo),
        })
      ),
      intermezzo_image: asset(SERVICES_PROTOCOL.ar.intermezzoImage),
    },
  });

  /* ---- consult ------------------------------------------------------ */
  console.log("Consult…");
  await upsertStory({
    name: "Consult",
    slug: "consult",
    contentType: "consult_page",
    publish: true,
    content: {
      seo: seo(CONSULT.ar.headline, CONSULT.en.headline, CONSULT.ar.sub, CONSULT.en.sub),
      ...tr("eyebrow", CONSULT.ar.eyebrow, CONSULT.en.eyebrow),
      ...tr("headline", CONSULT.ar.headline, CONSULT.en.headline),
      ...tr("sub", CONSULT.ar.sub, CONSULT.en.sub),
      ...tr("body", CONSULT.ar.body, CONSULT.en.body),
      ...tr("field_name_label", CONSULT.ar.fields.name, CONSULT.en.fields.name),
      ...tr("field_date_label", CONSULT.ar.fields.date, CONSULT.en.fields.date),
      ...tr("field_date_placeholder", "شهر/سنة", "Month / Year"),
      ...tr("field_guests_label", CONSULT.ar.fields.guests, CONSULT.en.fields.guests),
      ...tr("field_contact_label", CONSULT.ar.fields.contact, CONSULT.en.fields.contact),
      ...tr("field_notes_label", CONSULT.ar.fields.notes, CONSULT.en.fields.notes),
      ...tr("field_notes_hint", CONSULT.ar.fields.notesHint, CONSULT.en.fields.notesHint),
      ...tr("submit_label", CONSULT.ar.submit, CONSULT.en.submit),
      ...tr("submitted_line1", CONSULT.ar.submitted.line1, CONSULT.en.submitted.line1),
      ...tr("submitted_line2", CONSULT.ar.submitted.line2, CONSULT.en.submitted.line2),
    },
  });

  /* ---- contact ------------------------------------------------------ */
  console.log("Contact…");
  await upsertStory({
    name: "Contact",
    slug: "contact",
    contentType: "contact_page",
    publish: true,
    content: {
      seo: seo("التواصل", "Contact", "الدوحة، قطر", "Doha, Qatar"),
      hero: [
        blok("page_hero", {
          ...tr("eyebrow", "التواصل", "Contact"),
          ...tr("headline", "البَاب.", "The door."),
          ...tr(
            "intro",
            "صالة الرجال هي مَرسَمُنا الكامل — الباقات، التَجهيز، الضيافة، التَوثيق. للسيدات، نَعرِض خدماتٍ مُختارة.",
            "The men's hall is our full atelier — packages, production, hospitality, documentation. For women, we offer selected services."
          ),
        }),
      ],
      primary_image: asset("/photos/majlis/calligraphy-wood-wall.jpg"),
      ...tr("letter_label", "الرسالة", "The letter"),
      ...tr("letter_headline", "اُكتُب الرسالة الكاملة.", "Write the full letter."),
      ...tr(
        "letter_body",
        "للاستفسارات المفصّلة — التاريخ، عدد الضيوف، الباقة المُختارة — اُكتُب لنا الرسالة الكاملة وسَنرُد خلال ثلاثة أيام.",
        "For detailed enquiries — date, number of guests, chosen package — write the full letter and we will reply within three days."
      ),
      ...tr("letter_cta_label", "اكتب الرسالة", "Write the letter"),
    },
  });

  /* ---- packages ----------------------------------------------------- */
  console.log("Packages…");
  const SECTION_KEYS = ["hall", "lobby", "hospitality", "photography", "exterior"] as const;
  await upsertStory({
    name: "Packages",
    slug: "packages",
    contentType: "packages_page",
    publish: true,
    content: {
      seo: seo(PACKAGES_META.ar.title, PACKAGES_META.en.title, PACKAGES_META.ar.intro, PACKAGES_META.en.intro),
      hero: [
        blok("page_hero", {
          ...tr("eyebrow", PACKAGES_META.ar.eyebrow, PACKAGES_META.en.eyebrow),
          ...tr("headline", PACKAGES_META.ar.title, PACKAGES_META.en.title),
          ...tr("intro", PACKAGES_META.ar.intro, PACKAGES_META.en.intro),
        }),
      ],
      ...tr("mens_eyebrow", PACKAGES_META.ar.eyebrow, PACKAGES_META.en.eyebrow),
      ...tr("mens_title", PACKAGES_META.ar.title, PACKAGES_META.en.title),
      ...tr("mens_intro", PACKAGES_META.ar.intro, PACKAGES_META.en.intro),
      ...tr("mens_cta", PACKAGES_META.ar.cta, PACKAGES_META.en.cta),
      ...tr("price_label", PACKAGES_META.ar.priceLabel, PACKAGES_META.en.priceLabel),
      section_labels: SECTION_KEYS.map((k) =>
        blok("section_label", {
          key: k,
          ...tr("label", PACKAGES_META.ar.sectionLabels[k], PACKAGES_META.en.sectionLabels[k]),
        })
      ),
      mens_tiers: PACKAGES.ar.map((pk, i) =>
        blok("package_tier", {
          uid: pk.id,
          tier_slug: pk.tier,
          ...tr("name", PACKAGES.ar[i].name, PACKAGES.en[i].name),
          price_qar: String(pk.priceQAR),
          ...tr("highlight", PACKAGES.ar[i].highlight, PACKAGES.en[i].highlight),
          photo: asset(pk.photo),
          sections: pk.sections.map((sec, si) =>
            blok("package_section", {
              key: sec.key,
              custom_label: "",
              ...tr(
                "bullets",
                PACKAGES.ar[i].sections[si].bullets.join("\n"),
                PACKAGES.en[i].sections[si].bullets.join("\n")
              ),
            })
          ),
        })
      ),
      ...tr("womens_eyebrow", WOMENS_META.ar.eyebrow, WOMENS_META.en.eyebrow),
      ...tr("womens_title", WOMENS_META.ar.title, WOMENS_META.en.title),
      ...tr("womens_intro", WOMENS_META.ar.intro, WOMENS_META.en.intro),
      ...tr("womens_hospitality_title", WOMENS_META.ar.hospitalityTitle, WOMENS_META.en.hospitalityTitle),
      ...tr("womens_beverages_title", WOMENS_META.ar.beveragesTitle, WOMENS_META.en.beveragesTitle),
      ...tr("womens_per_person", WOMENS_META.ar.perPerson, WOMENS_META.en.perPerson),
      ...tr("womens_per_tray", WOMENS_META.ar.perTray, WOMENS_META.en.perTray),
      ...tr("womens_enquire_label", WOMENS_META.ar.enquireLabel, WOMENS_META.en.enquireLabel),
      ...tr("womens_phone_label", WOMENS_META.ar.phoneLabel, WOMENS_META.en.phoneLabel),
      ...tr("womens_menu_title", WOMENS_META.ar.menuTitle, WOMENS_META.en.menuTitle),
      womens_hospitality: WOMENS_HOSPITALITY.map((t) =>
        blok("capacity_tier", {
          capacity: String(t.capacity),
          ...(t.note ? tr("note", t.note.ar, t.note.en) : { note: "" }),
        })
      ),
      womens_beverages: WOMENS_BEVERAGES.map((t) =>
        blok("capacity_tier", {
          capacity: String(t.capacity),
          ...(t.note ? tr("note", t.note.ar, t.note.en) : { note: "" }),
        })
      ),
      womens_menu: WOMENS_BEVERAGE_CATEGORIES.map((cat) =>
        blok("beverage_category", {
          ...tr("name", cat.name.ar, cat.name.en),
          items: cat.items.map((it) => blok("beverage_item", { ...tr("name", it.ar, it.en) })),
        })
      ),
    },
  });

  /* ---- journal (folder + entries) ----------------------------------- */
  console.log("Journal…");
  const journalFolder = await ensureFolder("Journal", "journal");
  for (let i = 0; i < JOURNAL.ar.entries.length; i++) {
    const e = JOURNAL.ar.entries[i];
    await upsertStory({
      name: JOURNAL.en.entries[i].title,
      slug: e.slug,
      fullSlug: `journal/${e.slug}`,
      parentId: journalFolder,
      contentType: "journal_entry",
      publish: true,
      content: {
        seo: seo(JOURNAL.ar.entries[i].title, JOURNAL.en.entries[i].title, JOURNAL.ar.entries[i].excerpt, JOURNAL.en.entries[i].excerpt),
        ...tr("kicker", JOURNAL.ar.entries[i].kicker, JOURNAL.en.entries[i].kicker),
        ...tr("title", JOURNAL.ar.entries[i].title, JOURNAL.en.entries[i].title),
        ...tr("excerpt", JOURNAL.ar.entries[i].excerpt, JOURNAL.en.entries[i].excerpt),
        cover_photo: asset(e.photo),
        body: emptyRichtext(),
        featured: i === 0,
      },
    });
  }

  /* ---- celebrations (folder + entries) ------------------------------ */
  console.log("Celebrations…");
  const celebFolder = await ensureFolder("Celebrations", "celebrations");
  for (let i = 0; i < CELEBRATIONS.ar.items.length; i++) {
    const it = CELEBRATIONS.ar.items[i];
    const slug = `celebration-${i + 1}`;
    await upsertStory({
      name: `Celebration ${i + 1}`,
      slug,
      fullSlug: `celebrations/${slug}`,
      parentId: celebFolder,
      contentType: "celebration_case",
      publish: true,
      content: {
        ...tr("title", CELEBRATIONS.ar.items[i].title, CELEBRATIONS.en.items[i].title),
        ...tr("when", CELEBRATIONS.ar.items[i].when, CELEBRATIONS.en.items[i].when),
        ...tr("where", CELEBRATIONS.ar.items[i].where, CELEBRATIONS.en.items[i].where),
        ...tr("guests", CELEBRATIONS.ar.items[i].guests, CELEBRATIONS.en.items[i].guests),
        ...tr("note", CELEBRATIONS.ar.items[i].note, CELEBRATIONS.en.items[i].note),
        photo: asset(it.photo),
      },
    });
  }

  console.log("All content pushed.");
}
