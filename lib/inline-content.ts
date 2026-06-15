import type { Lang } from "./i18n";

/**
 * Content that previously lived hard-coded inside page/component JSX, extracted
 * here so there is a SINGLE source of truth that both the rendered site and the
 * Storyblok migration read from. AR is canonical; EN mirrors meaning.
 *
 *   HERITAGE          — /heritage long-read (hero + chapters + photo breaks)
 *   SERVICES_PROTOCOL — /services 8-phase protocol (hero + phases + intermezzo)
 *   JOURNAL           — /journal hero + the three essay cards
 *
 * (Acts heading lives in copy.ts:ACTS.heading; celebrations live in
 *  copy.ts:CELEBRATIONS; contact call-out copy lives in contact.ts:CALLOUT.)
 */

/* ============================== HERITAGE ============================== */

export type HeritageChapter = {
  number: string;
  title: string;
  body: string;
  /** Optional pull-quote rendered after this chapter. */
  pullquote?: string;
};

export type HeritageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  introImage: string;
  intermezzoImage: string;
  chapters: HeritageChapter[];
};

export const HERITAGE: Record<Lang, HeritageContent> = {
  ar: {
    eyebrow: "التراث",
    title: "عن البِشت.",
    intro:
      "ثوبٌ من وَبَر الجَمل، يُلبَس مرّةً واحدةً في العمر. هذه قصته، وقصةُ ما نَفعَله نحن من أجله.",
    introImage: "/photos/majlis/calligraphy-wood-wall.jpg",
    intermezzoImage: "/photos/craft/red-carpet-dark.jpg",
    chapters: [
      {
        number: "01",
        title: "ما هو البِشت",
        body:
          "البِشت ثوبٌ خارجي، يُنسَج من وَبَر الجَمل، ويُطَرَّز بخَيط الذَّهب الذي يُعرَف بالزَّري. يُلبَس فوق الثوب الأبيض، ويُعتَبَر كُسوةَ المُلوك. الرجلُ الذي يَلبَسه في يومٍ مُعَيَّن، إنّما يُعلِنُ أن ذلك اليوم لا يُشبِه يومًا آخر.",
      },
      {
        number: "02",
        title: "لماذا هو طَقسيّ",
        body:
          "في قطر، لا يَملِك أكثرُ الرجال إلا بِشتًا واحدًا، يُلبَس يوم العُرس، ويُحفَظ بعد ذلك مُطَوًّى في خزانة العائلة. ليس البِشت ثَوبًا، بل شَهادةٌ على لحظةٍ لا تَتَكرَّر.",
        pullquote: "ليس البِشت ثَوبًا، بل شَهادةٌ على لحظةٍ لا تَتَكرَّر.",
      },
      {
        number: "03",
        title: "بِشتُ الزَّفاف في قطر",
        body:
          "بِشتُ الزَّفاف القَطَري أَخفُّ من نَظيرِه السعودي، وأَدَقُّ زَريًا من البَحريني. يَنسِجُه عادةً عَدَدٌ مَحدودٌ من العائلات في سوق واقف، وكلُّ خَطٍّ من ذَهَبِه يُغرَزُ بِاليَد، صفًّا فصفًّا، على مَدى أُسبوعَين.",
      },
      {
        number: "04",
        title: "ما يَقَع علينا",
        body:
          "ALBISHT يَختار البِشت، ويُسَلِّمه إلى العَريس قبل ليلَتَيْن. يُجَهِّز قاعةَ الرجال على نحوٍ يَجعل البِشت يَلمَع تحت الإضاءة المُعايَرة. هذا كلُّ شيء — ولكنّه كلُّ شيء.",
      },
    ],
  },
  en: {
    eyebrow: "Heritage",
    title: "On the bisht.",
    intro:
      "A cloak of camel hair, worn only once in a lifetime. This is its story — and the story of what we do for it.",
    introImage: "/photos/majlis/calligraphy-wood-wall.jpg",
    intermezzoImage: "/photos/craft/red-carpet-dark.jpg",
    chapters: [
      {
        number: "01",
        title: "What the bisht is",
        body:
          "The bisht is the outer cloak — spun from camel hair, hemmed with golden zari thread. It is worn over the white thobe and is considered the dress of kings. A man who puts it on a particular day is declaring that this day is unlike any other.",
      },
      {
        number: "02",
        title: "Why it is ceremonial",
        body:
          "In Qatar, most men own only a single bisht — worn on the wedding day, then folded into the family wardrobe. The bisht is not a garment. It is the testimony of a moment that does not return.",
        pullquote:
          "The bisht is not a garment. It is the testimony of a moment that does not return.",
      },
      {
        number: "03",
        title: "The wedding bisht of Qatar",
        body:
          "The Qatari wedding bisht is lighter than its Saudi counterpart and more finely embroidered than the Bahraini. It is woven by a small number of families in Souq Waqif. Every line of its gold is set by hand, row by row, over two weeks.",
      },
      {
        number: "04",
        title: "What falls to us",
        body:
          "ALBISHT selects the bisht, and delivers it to the groom two nights before. We dress the men's hall in a way that lets the gold catch the calibrated light. That is everything we do — and it is everything.",
      },
    ],
  },
};

/* ============================== SERVICES ============================== */

export type ServicePhase = {
  /** Arabic name — shown large on every language (not a translation). */
  ar: string;
  /** English name — shown as roman label on every language (not a translation). */
  en: string;
  body: string;
  photo: string;
};

export type ServicesContent = {
  eyebrow: string;
  title: string;
  intro: string;
  intermezzoImage: string;
  phases: ServicePhase[];
};

export const SERVICES_PROTOCOL: Record<Lang, ServicesContent> = {
  ar: {
    eyebrow: "الخدمات",
    title: "البروتوكول.",
    intro:
      "ثَمانية فُصول، يُسَلَّم كلٌّ منها بيَدِنا، ولا يَخرُج من تَحت أَيدينا حتى يَكتَمِل.",
    intermezzoImage: "/photos/craft/chocolate-tray-red-velvet.jpg",
    phases: [
      { ar: "التشاور", en: "Consultation", body: "الجلسة الأولى. في البيت أو في فندق الديوان.", photo: "/photos/majlis/outdoor-marquetry.jpg" },
      { ar: "التصميم", en: "Composition", body: "اللون، الخَطّاط، البِشت، الأَزهار.", photo: "/photos/hall/outdoor-marquetry-roses.jpg" },
      { ar: "التراث", en: "Heritage craft", body: "خَتم العائلة، الدعوة المَخطوطة، الفضة المَنقوشة.", photo: "/photos/hall/mashrabiya-tall-arch.jpg" },
      { ar: "الكَرَم", en: "Hospitality", body: "القهوة، التَّمر، العود، عَطر الضيف.", photo: "/photos/craft/tray-chocolates-olive.jpg" },
      { ar: "القاعة", en: "The men's hall", body: "المَكان، خَلفية المَعرس، المَشربيّات، الكروم.", photo: "/photos/hall/mashrabiya-chandelier.jpg" },
      { ar: "الموسيقى", en: "Music", body: "العَرضة القَطَرية الأصيلة.", photo: "/photos/craft/red-carpet-dark.jpg" },
      { ar: "اليوم", en: "The day", body: "الجَدوَل، البروتوكول، الاستقبال على مستوى الديوان.", photo: "/photos/craft/server-shemagh-cups.jpg" },
      { ar: "الذاكرة", en: "Memory", body: "الألبوم، هَدايا الشُكر، الرسالة الختامية.", photo: "/photos/majlis/sheikh-portrait.jpg" },
    ],
  },
  en: {
    eyebrow: "Services",
    title: "The protocol.",
    intro:
      "Eight chapters, each delivered by our hand. Nothing leaves us before it is complete.",
    intermezzoImage: "/photos/craft/chocolate-tray-red-velvet.jpg",
    phases: [
      { ar: "التشاور", en: "Consultation", body: "The first conversation. At home, or at the palace hotel.", photo: "/photos/majlis/outdoor-marquetry.jpg" },
      { ar: "التصميم", en: "Composition", body: "Colour, the calligrapher, the bisht, the flowers.", photo: "/photos/hall/outdoor-marquetry-roses.jpg" },
      { ar: "التراث", en: "Heritage craft", body: "Family seal, hand-written invitation, engraved silver.", photo: "/photos/hall/mashrabiya-tall-arch.jpg" },
      { ar: "الكَرَم", en: "Hospitality", body: "Coffee, dates, oud, perfume for the guest.", photo: "/photos/craft/tray-chocolates-olive.jpg" },
      { ar: "القاعة", en: "The men's hall", body: "The venue, the groom's backdrop, mashrabiya screens, the chandeliers.", photo: "/photos/hall/mashrabiya-chandelier.jpg" },
      { ar: "الموسيقى", en: "Music", body: "The authentic Qatari Ardha.", photo: "/photos/craft/red-carpet-dark.jpg" },
      { ar: "اليوم", en: "The day", body: "The timeline, the protocol, Diwan-level reception.", photo: "/photos/craft/server-shemagh-cups.jpg" },
      { ar: "الذاكرة", en: "Memory", body: "The album, gifts of thanks, the closing letter.", photo: "/photos/majlis/sheikh-portrait.jpg" },
    ],
  },
};

/* ============================== JOURNAL =============================== */

export type JournalEntry = {
  /** Stable slug for the Storyblok story + future deep-links. */
  slug: string;
  kicker: string;
  title: string;
  excerpt: string;
  photo: string;
};

export type JournalContent = {
  eyebrow: string;
  title: string;
  intro: string;
  entries: JournalEntry[];
};

export const JOURNAL: Record<Lang, JournalContent> = {
  ar: {
    eyebrow: "اليوميّات",
    title: "ما نَكتُبه بين حَفلٍ وحَفل.",
    intro:
      "ثلاثُ مقالاتٍ مُختارة عن الحِرفة، الصَّمت، والبروتوكول القَطَري — ما نَكتُبه بين مُناسبةٍ ومُناسبة.",
    entries: [
      {
        slug: "hassan-al-mannai-zari",
        kicker: "حِرفة",
        title: "حسن المَنّاعي والزَّري المَفقود",
        excerpt:
          "في الزاوية الخلفية من سوق واقف، آخر خَطّاطين يَعرِفُون كيف يُلَفّون خَيط الذَّهب على وَبَر الجَمل. زُرناه ليُعَلِّمَنا.",
        photo: "/photos/craft/sweets-silver-platter.jpg",
      },
      {
        slug: "why-no-dj",
        kicker: "موسيقى",
        title: "لِماذا لا DJ",
        excerpt:
          "عَرضة أهل قطر.",
        photo: "/photos/craft/chocolate-server-portrait.jpg",
      },
      {
        slug: "four-days-qatari-wedding",
        kicker: "بروتوكول",
        title: "مَرحلة الزَّواج التقليدي القَطَري",
        excerpt:
          "الخِطبة، الجاهة، العَقد، الزَّفاف. كلُّ ليلةٍ لها وَجهٌ، ولها لِباس، ولها صَمت.",
        photo: "/photos/craft/gilded-table-flowers.jpg",
      },
    ],
  },
  en: {
    eyebrow: "Journal",
    title: "What we write between weddings.",
    intro:
      "Three selected essays on craft, silence, and Qatari protocol — what we write between one celebration and the next.",
    entries: [
      {
        slug: "hassan-al-mannai-zari",
        kicker: "Craft",
        title: "Hassan al-Mannai and the disappearing zari",
        excerpt:
          "In the back corner of Souq Waqif, the last calligraphers who still know how to wind gold thread around camel hair. We went to learn.",
        photo: "/photos/craft/sweets-silver-platter.jpg",
      },
      {
        slug: "why-no-dj",
        kicker: "Music",
        title: "Why no DJ",
        excerpt:
          "The Ardha of the people of Qatar.",
        photo: "/photos/craft/chocolate-server-portrait.jpg",
      },
      {
        slug: "four-days-qatari-wedding",
        kicker: "Protocol",
        title: "The traditional Qatari marriage, stage by stage",
        excerpt:
          "Khitba, jaha, agd, zafaf. Each night has its face, its dress, and its silence.",
        photo: "/photos/craft/gilded-table-flowers.jpg",
      },
    ],
  },
};
