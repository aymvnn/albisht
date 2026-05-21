import type { Lang } from "./i18n";

/**
 * All copy lives here. AR is the canonical version; EN mirrors meaning, not literal translation.
 */

export const NAV = {
  ar: [
    { href: "/atelier", label: "المرسم" },
    { href: "/celebrations", label: "المناسبات" },
    { href: "/services", label: "الخدمات" },
    { href: "/heritage", label: "التراث" },
    { href: "/journal", label: "اليوميات" },
    { href: "/consult", label: "الاستشارة" },
    { href: "/contact", label: "التواصل" },
  ],
  en: [
    { href: "/atelier", label: "Atelier" },
    { href: "/celebrations", label: "Celebrations" },
    { href: "/services", label: "Services" },
    { href: "/heritage", label: "Heritage" },
    { href: "/journal", label: "Journal" },
    { href: "/consult", label: "Consultation" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export const HERO = {
  ar: {
    eyebrow: "البِشت ـ صالة الرجال",
    headline: "حَفلٌ يُذكر،\nلا يُقارن.",
    subline: "ست مناسبات في العام. لا تتكرر اثنتان.",
    cta: "تَكرّم بالتواصل",
  },
  en: {
    eyebrow: "ALBISHT — Men's Hall Atelier",
    headline: "A wedding remembered.\nNever compared.",
    subline: "Six ceremonies a year. No two alike.",
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
      "ست مناسبات في السنة.",
      "كل واحدة لا تُنسى.",
      "كل واحدة على حدة.",
    ],
  },
  en: {
    title: "The promise",
    lines: [
      "Six ceremonies a year.",
      "None of them repeated.",
      "None of them forgotten.",
    ],
  },
};

export const ACTS = {
  ar: {
    label: "الليلة في ثلاثة فصول",
    items: [
      {
        kicker: "الفصل الأول",
        title: "الاستقبال",
        line: "الباب يُفتح، البخور يُشعل، البِشت يَستقبل البِشت.",
        photo: "/photos/majlis/calligraphy-wood-wall.jpg",
      },
      {
        kicker: "الفصل الثاني",
        title: "العَشاء",
        line: "القهوة العربية، التمر، صحون الفضة، شجرة الزيتون.",
        photo: "/photos/hall/olive-tree-light.jpg",
      },
      {
        kicker: "الفصل الثالث",
        title: "العَرض",
        line: "الزَّري يَلمَع، الكلمة تُقال، الذاكرة تُنقَش.",
        photo: "/photos/craft/server-shemagh-cups.jpg",
      },
    ],
  },
  en: {
    label: "The evening in three acts",
    items: [
      {
        kicker: "Act i",
        title: "The arrival",
        line: "The door opens, the oud-bakhoor lights, the bisht meets the bisht.",
        photo: "/photos/majlis/calligraphy-wood-wall.jpg",
      },
      {
        kicker: "Act ii",
        title: "The banquet",
        line: "Arabic coffee, dates, silver platters, the olive tree at the center.",
        photo: "/photos/hall/olive-tree-light.jpg",
      },
      {
        kicker: "Act iii",
        title: "The ceremony",
        line: "Gold thread catches the light, the word is spoken, the memory is set.",
        photo: "/photos/craft/server-shemagh-cups.jpg",
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
        when: "نوفمبر ٢٠٢٥",
        where: "لوسيل",
        guests: "ست مئة ضيف",
        note: "بِشت الزَّري المَنسوج بيد حسن في سوق واقف. شجرة زيتون من الأندلس في وسط الصالة.",
        photo: "/photos/hall/hero-pearl-court.jpg",
      },
      {
        when: "فبراير ٢٠٢٦",
        where: "الوكرة",
        guests: "أربع مئة ضيف",
        note: "صالة بمَشربيّات مَحفورة باليد. عَشاء على ثلاثة أيام. عود وقانون فقط — لا موسيقى أُخرى.",
        photo: "/photos/majlis/night-majlis-outdoor.jpg",
      },
      {
        when: "أبريل ٢٠٢٦",
        where: "الدوحة",
        guests: "ثَمان مئة ضيف",
        note: "كُسوة العريس من خامة وَبر الجَمل. صحون الفضة بِخَتم العائلة. كلٌّ مُعدّ يدويًا.",
        photo: "/photos/hall/mashrabiya-chandelier.jpg",
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
        when: "November 2025",
        where: "Lusail",
        guests: "Six hundred guests",
        note: "Hand-woven zari bisht by Hassan of Souq Waqif. An Andalusian olive tree at the centre of the hall.",
        photo: "/photos/hall/hero-pearl-court.jpg",
      },
      {
        when: "February 2026",
        where: "Al Wakrah",
        guests: "Four hundred guests",
        note: "A hall of hand-carved mashrabiya. A three-day banquet. Oud and qanun only — no other instrument was heard.",
        photo: "/photos/majlis/night-majlis-outdoor.jpg",
      },
      {
        when: "April 2026",
        where: "Doha",
        guests: "Eight hundred guests",
        note: "The groom's bisht spun from camel hair. Silver platters bearing the family seal. All by hand.",
        photo: "/photos/hall/mashrabiya-chandelier.jpg",
      },
    ],
  },
};

export const INVITATION = {
  ar: {
    title: "دعوةٌ مُحدودة",
    line1: "نَستقبل ست عائلات في السنة.",
    line2: "للاستفسار، تَكرّم بالتواصل.",
    cta: "اكتب الرسالة",
  },
  en: {
    title: "A limited invitation",
    line1: "We accept six families a year.",
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
    headline: "ما الذي يَفعله البِشت.",
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
        "لا نُجري أكثر من ستِّ مناسبات في العام.",
        "نَعمَل في قطر، والبحرين، والإمارات.",
        "نتعامل مع وَلي الأمر، لا مع وكلائه.",
      ],
    },
  },
  en: {
    eyebrow: "The Atelier",
    headline: "What the bisht does.",
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
        "We do not undertake more than six weddings a year.",
        "We work in Qatar, Bahrain and the Emirates.",
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
