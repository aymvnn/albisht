import type { Lang } from "./i18n";

/**
 * All copy lives here. AR is the canonical version; EN mirrors meaning, not literal translation.
 */

export const NAV = {
  ar: [
    { href: "/atelier", label: "المرسم" },
    { href: "/packages", label: "الباقات" },
    { href: "/celebrations", label: "المناسبات" },
    { href: "/services", label: "الخدمات" },
    { href: "/heritage", label: "التراث" },
    { href: "/journal", label: "اليوميات" },
    { href: "/consult", label: "الاستشارة" },
    { href: "/contact", label: "التواصل" },
  ],
  en: [
    { href: "/atelier", label: "Atelier" },
    { href: "/packages", label: "Packages" },
    { href: "/celebrations", label: "Celebrations" },
    { href: "/services", label: "Services" },
    { href: "/heritage", label: "Heritage" },
    { href: "/journal", label: "Journal" },
    { href: "/consult", label: "Consultation" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

/**
 * Headlines may contain `*word*` markers to italicise+gold-emphasise a single
 * word inside an otherwise upright line. Use sparingly — one word per line.
 * Rendered via <FormatHeadline> in headline contexts.
 */
export const HERO = {
  ar: {
    eyebrow: "البِشت ـ صالة الرجال",
    headline: "حَفلٌ *يُذكر*،\nلا *يُقارن*.",
    subline: "ثلاث مئة مناسبة في العام. لا تتكرر اثنتان.",
    cta: "تَكرّم بالتواصل",
  },
  en: {
    eyebrow: "ALBISHT — Men's Hall Atelier",
    headline: "A wedding *remembered.*\nNever *compared.*",
    subline: "Three hundred ceremonies a year. No two alike.",
    cta: "Begin the conversation",
  },
};

export const REVEAL_PHRASE = {
  ar: "الله أكبر ولله الحمد",
  en: "In the name of God, the Most Gracious",
};

export const PROMISE = {
  ar: {
    title: "العهد",
    lines: [
      "ثلاث مئة مناسبة في السنة.",
      "كل واحدة لا تُنسى.",
      "كل واحدة على حدة.",
    ],
  },
  en: {
    title: "The promise",
    lines: [
      "Three hundred ceremonies a year.",
      "None of them repeated.",
      "None of them forgotten.",
    ],
  },
};

export const ACTS = {
  ar: {
    label: "الليلة في ثلاثة فصول",
    heading: "ثَلاثُ لَحظاتٍ تَصنَع المَساء.",
    items: [
      {
        kicker: "الفصل الأول",
        title: "الاستقبال",
        line: "الباب يُفتح، العود يُشعل، البِشت يَستقبل البِشت.",
        photo: "/photos/hall/mashrabiya-arch.jpg",
      },
      {
        kicker: "الفصل الثاني",
        title: "العَشاء",
        line: "القهوة العربية، التمر، صحون الفضة، شجرة الزيتون.",
        photo: "/photos/craft/sweets-yellow-olive-tree.jpg",
      },
      {
        kicker: "الفصل الثالث",
        title: "العَرض",
        line: "الزَّري يَلمَع، الكلمة تُقال، الذاكرة تُنقَش.",
        photo: "/photos/craft/sweets-waistcoat-orange.jpg",
      },
    ],
  },
  en: {
    label: "The evening in three acts",
    heading: "Three moments shape the evening.",
    items: [
      {
        kicker: "Act i",
        title: "The arrival",
        line: "The door opens, the oud lights, the bisht meets the bisht.",
        photo: "/photos/hall/mashrabiya-arch.jpg",
      },
      {
        kicker: "Act ii",
        title: "The banquet",
        line: "Arabic coffee, dates, silver platters, the olive tree at the center.",
        photo: "/photos/craft/sweets-yellow-olive-tree.jpg",
      },
      {
        kicker: "Act iii",
        title: "The ceremony",
        line: "Gold thread catches the light, the word is spoken, the memory is set.",
        photo: "/photos/craft/sweets-waistcoat-orange.jpg",
      },
    ],
  },
};

export const CELEBRATIONS = {
  ar: {
    label: "مناسبات مختارة",
    title: "ثلاثُ ليالٍ. لا أسماء.",
    intro:
      "نَحفَظ الأسرارَ كما نَحفَظ التراث. هذه ثلاث مناسبات أُتيح لنا تَكريم أصحابها.",
    items: [
      {
        title: "ليلةٌ، *تُذكَر*.",
        when: "نوفمبر ٢٠٢٥",
        where: "لوسيل",
        guests: "ست مئة ضيف",
        note: "بِشت الزَّري المَنسوج بيد حسن في سوق واقف. شجرة زيتون من الأندلس في وسط الصالة.",
        photo: "/photos/hall/court-empty-chandelier.jpg",
      },
      {
        title: "ثلاثةُ *أيّامٍ*.",
        when: "فبراير ٢٠٢٦",
        where: "الوكرة",
        guests: "أربع مئة ضيف",
        note: "صالة بمَشربيّات مَحفورة باليد. عَشاء على ثلاثة أيام. عود وقانون فقط — لا موسيقى أُخرى.",
        photo: "/photos/majlis/evening-olive-outdoor.jpg",
      },
      {
        title: "بِشتٌ *واحد*.",
        when: "أبريل ٢٠٢٦",
        where: "الدوحة",
        guests: "ثَمان مئة ضيف",
        note: "كُسوة العريس من خامة وَبر الجَمل. صحون الفضة بِخَتم العائلة. كلٌّ مُعدّ يدويًا.",
        photo: "/photos/craft/red-pralines-gladiolus.jpg",
      },
    ],
  },
  en: {
    label: "Selected celebrations",
    title: "Three evenings. No names.",
    intro:
      "We hold secrets as we hold heritage. These are three of the celebrations we have been honoured to dress.",
    items: [
      {
        title: "An evening, *remembered*.",
        when: "November 2025",
        where: "Lusail",
        guests: "Six hundred guests",
        note: "Hand-woven zari bisht by Hassan of Souq Waqif. An Andalusian olive tree at the centre of the hall.",
        photo: "/photos/hall/court-empty-chandelier.jpg",
      },
      {
        title: "Three *days*.",
        when: "February 2026",
        where: "Al Wakrah",
        guests: "Four hundred guests",
        note: "A hall of hand-carved mashrabiya. A three-day banquet. Oud and qanun only — no other instrument was heard.",
        photo: "/photos/majlis/evening-olive-outdoor.jpg",
      },
      {
        title: "A single *bisht*.",
        when: "April 2026",
        where: "Doha",
        guests: "Eight hundred guests",
        note: "The groom's bisht spun from camel hair. Silver platters bearing the family seal. All by hand.",
        photo: "/photos/craft/red-pralines-gladiolus.jpg",
      },
    ],
  },
};

export const INVITATION = {
  ar: {
    title: "دعوةٌ مُحدودة",
    line1: "نَستقبل ثلاث مئة عائلة في السنة.",
    line2: "للاستفسار، تَكرّم بالتواصل.",
    cta: "اكتب الرسالة",
  },
  en: {
    title: "A limited invitation",
    line1: "We accept three hundred families a year.",
    line2: "To enquire — be so kind as to write to us.",
    cta: "Write the letter",
  },
};

export const FOOTER = {
  ar: {
    address: "الدوحة، قطر",
    seal: "البِشت",
    rights: "جميع الحقوق محفوظة",
  },
  en: {
    address: "Doha, Qatar",
    seal: "ALBISHT",
    rights: "All rights reserved",
  },
};

export const ATELIER = {
  ar: {
    eyebrow: "المرسم",
    headline: "ما الذي *يَفعله* البِشت.",
    intro:
      "ALBISHT ليس مُنظّمَ حفلات. ALBISHT هو المَرسَم القَطَري المُتخصِّص بصالة الرجال في حفل الزواج — لا أكثر، ولا أقل. تَخصُّصٌ واحد، يُؤدّى على مستوى الديوان.",
    principles: [
      {
        ar: "الكَرَم",
        en: "Hospitality",
        body: "الضيفُ يُستقبل قبل أن يُعلَن قدومه. لا يُغادرُ صالتنا أحدٌ دون أن يُسأل ثلاث مرات إن كان قد شَرب قهوته.",
      },
      {
        ar: "السُّكون",
        en: "Stillness",
        body: "الفَخامة الحقيقية لا تَصرُخ. كلُّ ضوءٍ مُعايَر، كلُّ صَوتٍ مُهَندَس، كلُّ ثَوبٍ مُكَوًى. لا فَوضى، ولو دَقيقة.",
      },
      {
        ar: "الإحكام",
        en: "Precision",
        body: "البِشتُ يُسَلَّم في يومٍ مُحدَّد. الصُحون تُمسَح ست مَرّات قبل أن تَخرُج. اسمُ الجَدّ يُكتب بحَرفٍ واحد دقيق.",
      },
    ],
    network: {
      label: "الشبكة",
      title: "ما يقفُ خلف الباب.",
      body:
        "خمسةَ عشرَ قاعة. أربعةُ خَطّاطين في الدوحة. ثَمانية مُفصّلين للبِشت في سوق واقف. اثنان من أُسر الفضة. قِسمٌ كاملٌ من خَطّاطي الأسماء. اسماؤهم محفوظة، أعمالهم مَعروفة.",
    },
    terms: {
      label: "الشروط",
      title: "كيف نَعمَل.",
      lines: [
        "نَقبَل المناسبة قبل سبعة أشهر على الأقل.",
        "لا نُجري أكثر من ثلاث مئة مناسبة في العام.",
        "نَعمَل في قطر.",
        "نتعامل مع وَلي الأمر، لا مع وكلائه.",
      ],
    },
  },
  en: {
    eyebrow: "The Atelier",
    headline: "What the bisht *does.*",
    intro:
      "ALBISHT is not a wedding planner. ALBISHT is the Qatari atelier specialised in the men's hall of the wedding — no more, no less. One craft, performed at Diwan level.",
    principles: [
      {
        ar: "الكَرَم",
        en: "Hospitality",
        body: "A guest is received before he announces himself. No one leaves our hall without being asked three times whether his coffee was poured.",
      },
      {
        ar: "السُّكون",
        en: "Stillness",
        body: "True luxury does not raise its voice. Every light is calibrated, every sound engineered, every robe pressed. There is no chaos — not for a single minute.",
      },
      {
        ar: "الإحكام",
        en: "Precision",
        body: "The bisht is delivered on a stated day. The silver is polished six times before it leaves. The grandfather's name is set in a single, exact letter.",
      },
    ],
    network: {
      label: "The network",
      title: "Behind the door.",
      body:
        "Fifteen halls. Four calligraphers in Doha. Eight bisht tailors in Souq Waqif. Two silversmith families. A small bureau of name-engravers. Their names are kept; their work is known.",
    },
    terms: {
      label: "The terms",
      title: "How we work.",
      lines: [
        "We accept a wedding no less than seven months in advance.",
        "We do not undertake more than three hundred weddings a year.",
        "We work in Qatar.",
        "We speak with the head of the family, not with his agents.",
      ],
    },
  },
};

export const CONSULT = {
  ar: {
    eyebrow: "الرسالة",
    headline: "أهلاً وسهلاً.",
    sub: "أنتم تُفَكِّرون بنا. اِسمَحوا لنا أن نُفكِّر بكم.",
    body:
      "اِكتُب لنا ما تَستطيع. سَنَرُد خلال ثلاثة أيام. لن يَخرُج اسمُكم من هذه الرسالة، ولن يُذكَر أمام أحد.",
    fields: {
      name: "الاسم الكريم",
      date: "التاريخ المُقترَح",
      guests: "عَدَدُ الضيوف",
      contact: "الهاتف أو البريد",
      notes: "اِحْكِ لنا ما يَعنيه هذا الحفل لك",
      notesHint: "(اختياري)",
    },
    submit: "اخْتِم",
    submitted: {
      line1: "وَصَلَت الرسالة.",
      line2: "نَرُدُّ خلال ثلاثة أيام، إنْ شاءَ الله.",
    },
  },
  en: {
    eyebrow: "The letter",
    headline: "Welcome.",
    sub: "You are considering us. Allow us to consider you.",
    body:
      "Write what you can. We will reply within three days. Your name will not leave this letter, nor be spoken before anyone.",
    fields: {
      name: "Your name",
      date: "The date you have in mind",
      guests: "Number of guests",
      contact: "Phone or email",
      notes: "Tell us what this evening means to you",
      notesHint: "(optional)",
    },
    submit: "Seal",
    submitted: {
      line1: "The letter has reached us.",
      line2: "We will reply within three days, in shā' Allāh.",
    },
  },
};

/**
 * PACKAGES — five wedding-package tiers offered to clients.
 * Source: ALBISHT Mens Packages 2026 brochure (provided by client).
 * Each package is editable here in one place — edit name, price, or any
 * inclusion line and the /packages page picks up the change automatically.
 *
 * Structure per package:
 *   id          — stable slug for analytics + deep links
 *   tier        — display tier (silver / gold / platinum / vip / top-vip)
 *   name        — display name (AR is Thuluth-rendered)
 *   priceQAR    — price in Qatari Riyal (integer)
 *   sections    — grouped inclusions: hall, lobby, hospitality, photography, exterior
 *   highlight   — one short line that summarises what makes this tier special
 *   photo       — hero photo for the section
 */
/**
 * FAQ — protocol questions, answered in the atelier's voice.
 * Every answer is sourced from existing copy (atelier terms, packages intro,
 * consult body) — nothing invented. Phone digits are stored Latin and
 * localised at render time via localizedDigits().
 */
export const FAQ = {
  ar: {
    eyebrow: "الأسئلة",
    title: "أسئلةٌ تُطرَح.",
    items: [
      {
        q: "متى يجب الحجز؟",
        a: "نَقبَل المناسبة قبل سبعة أشهر على الأقل. ثلاث مئة مناسبة في العام — لكلٍّ منها وقتها الكامل.",
      },
      {
        q: "أين تعملون؟",
        a: "في قطر. المرسم في الدوحة.",
      },
      {
        q: "هل الباقة كاملة بذاتها؟",
        a: "نعم. خمس باقات، كلٌّ منها تشمل القاعة واللوبي والضيافة والتصوير والتجهيزات الخارجية. لا حاجة لإضافات.",
      },
      {
        q: "ما الفرق بين خطّ الرجال وخطّ السيدات؟",
        a: "صالة الرجال خدمة كاملة للمناسبة، على الرقم +974 3377 7074. وللسيدات ضيافة ومشروبات بحسب عدد الضيوف، على الرقم +974 5000 8019.",
      },
      {
        q: "متى يصلنا الرد؟",
        a: "خلال ثلاثة أيام من وصول الرسالة.",
      },
      {
        q: "هل تُذكَر أسماؤكم؟",
        a: "لا. الاسم لا يخرج من الرسالة، والمناسبات تُعرَض بلا أسماء.",
      },
    ],
  },
  en: {
    eyebrow: "Questions",
    title: "Questions, answered.",
    items: [
      {
        q: "When should we reserve?",
        a: "We accept a wedding no less than seven months in advance. Three hundred ceremonies a year — each is given its full time.",
      },
      {
        q: "Where do you work?",
        a: "Qatar. The atelier is in Doha.",
      },
      {
        q: "Is a package complete in itself?",
        a: "Yes. Five packages, each covering the hall, the lobby, hospitality, photography and the exterior. No add-ons are needed.",
      },
      {
        q: "What distinguishes the men's and women's lines?",
        a: "The men's hall is the full ceremony service, on +974 3377 7074. For women, hospitality and beverages by guest count, on +974 5000 8019.",
      },
      {
        q: "When will we hear back?",
        a: "Within three days of the letter arriving.",
      },
      {
        q: "Will our name be mentioned?",
        a: "No. Your name does not leave the letter, and celebrations are shown without names.",
      },
    ],
  },
} as const;

/** Sticky mobile action bar — three quiet actions. */
export const STICKY_BAR = {
  ar: { call: "اتصال", whatsapp: "واتساب", consult: "الاستشارة" },
  en: { call: "Call", whatsapp: "WhatsApp", consult: "Consult" },
} as const;

/** WhatsApp action label (used wherever a wa.me link sits beside a phone). */
export const WHATSAPP_LABEL = {
  ar: "واتساب",
  en: "WhatsApp",
} as const;

/** Brochure (print / save-as-PDF) route copy. */
export const BROCHURE = {
  ar: {
    action: "احفظ الباقة PDF",
    print: "اطبع أو احفظ PDF",
    back: "عودة إلى الباقات",
    issued: "صادرة عن مرسم البِشت — الدوحة، قطر",
  },
  en: {
    action: "Save as PDF",
    print: "Print or save as PDF",
    back: "Back to packages",
    issued: "Issued by the ALBISHT atelier — Doha, Qatar",
  },
} as const;

/** Ceremonial 404. */
export const NOT_FOUND = {
  ar: {
    eyebrow: "٤٠٤",
    title: "هذه الصفحة ليست في البروتوكول.",
    line: "ربما تغيَّر العنوان، أو لم يُكتَب بعد.",
    cta: "إلى الصفحة الرئيسة",
  },
  en: {
    eyebrow: "404",
    title: "This page is not on the protocol.",
    line: "The address may have changed, or was never written.",
    cta: "Return to the beginning",
  },
} as const;

/** The viewing room — lightbox gallery labels. */
export const VIEWING_ROOM = {
  ar: {
    eyebrow: "غرفة المشاهدة",
    title: "تفاصيل من الصالة.",
    view: "عرض",
    close: "إغلاق",
    prev: "السابق",
    next: "التالي",
    of: "من",
  },
  en: {
    eyebrow: "The viewing room",
    title: "Details from the hall.",
    view: "View",
    close: "Close",
    prev: "Previous",
    next: "Next",
    of: "of",
  },
} as const;

/** Date concierge — begin the consultation with the intended month. */
export const DATE_CONCIERGE = {
  ar: {
    label: "تاريخكم المُقترَح",
    month: "الشهر",
    year: "السنة",
    action: "ابدأ بالتاريخ",
    months: [
      "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
    ],
  },
  en: {
    label: "Your intended date",
    month: "Month",
    year: "Year",
    action: "Begin with the date",
    months: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
  },
} as const;

/** Consult letter — additions: line selector, error state, WhatsApp continue. */
export const CONSULT_EXTRAS = {
  ar: {
    lineLabel: "الخط",
    lineMens: "صالة الرجال",
    lineWomens: "ضيافة السيدات",
    packageLabel: "الباقة المُختارة",
    sending: "يُختَم…",
    error: {
      line1: "تعذَّر إرسال الرسالة.",
      line2: "تكرَّم بالمحاولة مرة أخرى، أو تواصل مباشرة:",
    },
    whatsappContinue: "أكمِل عبر واتساب",
    promise: "نَرُدُّ خلال ثلاثة أيام.",
  },
  en: {
    lineLabel: "The line",
    lineMens: "Men's hall",
    lineWomens: "Women's hospitality",
    packageLabel: "Chosen package",
    sending: "Sealing…",
    error: {
      line1: "The letter could not be sent.",
      line2: "Kindly try again, or reach us directly:",
    },
    whatsappContinue: "Continue on WhatsApp",
    promise: "We reply within three days.",
  },
} as const;

/** Skip-to-content link (a11y). */
export const SKIP_LINK = {
  ar: "تجاوَز إلى المحتوى",
  en: "Skip to content",
} as const;

/** /packages — labels for the collapsible inclusion lists + tier rail. */
export const PACKAGES_EXTRAS = {
  ar: {
    fullProtocol: "العرض الكامل",
    collapse: "اختصر",
    railLabel: "الباقات",
  },
  en: {
    fullProtocol: "The full protocol",
    collapse: "Collapse",
    railLabel: "The tiers",
  },
} as const;

export const PACKAGES_META = {
  ar: {
    eyebrow: "الباقات",
    title: "خمسُ باقاتٍ لِلصالة.",
    intro:
      "نَعرِض خمسَ باقاتٍ كاملة، تَختلف في حجم الديكور، عدد المَقهويين، نوعية التصوير، وفَخامة الضيافة. كلٌّ منها كاملة بذاتها — لا حاجة لإضافات.",
    cta: "احجز هذه الباقة",
    priceLabel: "ريال قطري",
    sectionLabels: {
      hall: "تجهيزات داخل القاعة",
      lobby: "جلسات خارج القاعة (اللوبي)",
      hospitality: "الضيافة",
      photography: "التصوير",
      exterior: "تجهيزات خارج القاعة",
    },
  },
  en: {
    eyebrow: "Packages",
    title: "Five packages for the hall.",
    intro:
      "We offer five complete packages, varying in decor scale, server count, photography depth and hospitality lavishness. Each is whole in itself — no add-ons needed.",
    cta: "Reserve this package",
    priceLabel: "QAR",
    sectionLabels: {
      hall: "Inside the hall",
      lobby: "Lobby seating",
      hospitality: "Hospitality",
      photography: "Photography",
      exterior: "Outside the hall",
    },
  },
} as const;
