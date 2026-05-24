import type { Lang } from "./i18n";

/**
 * The five wedding packages for ALBISHT's men's hall service.
 * Source: ALBISHT Mens Packages 2026 brochure (provided by client).
 *
 * This file lives separate from copy.ts because of its volume — editing a
 * single bullet here doesn't require scrolling past 400 lines of unrelated copy.
 *
 * To change a package: edit name / price / any bullet in any section. The
 * /packages page reads the array order, so reordering here reorders on the site.
 */

export type PackageSection = {
  /** Section key — maps to PACKAGES_META.sectionLabels */
  key: "hall" | "lobby" | "hospitality" | "photography" | "exterior";
  /** Plain bullet lines — no markdown */
  bullets: string[];
};

export type Package = {
  id: string;
  tier: "silver" | "gold" | "platinum" | "vip" | "top-vip";
  name: string;
  priceQAR: number;
  highlight: string;
  photo: string;
  sections: PackageSection[];
};

export const PACKAGES: Record<Lang, Package[]> = {
  ar: [
    {
      id: "silver",
      tier: "silver",
      name: "الباقة الفِضِّية",
      priceQAR: 39000,
      highlight: "البداية الكاملة — كل ما تحتاجه قاعةُ الرجال، بلا زيادة ولا نُقصان.",
      photo: "/photos/hall/ballroom-blue-floor.jpg",
      sections: [
        {
          key: "hall",
          bullets: [
            "جلسات خشبية مع طاولات خشبية صغيرة لصف المعرس فقط.",
            "خلفية خشبية للمعرس مقاس (6×26 م) مع شعار العائلة.",
            "عدد (2) باقة ورد طبيعي يمين ويسار المعرس + باقات ورد طبيعي لكامل صف المعرس.",
            "عدد (4) طاولات كوكتيل خشبية تحتوي على فازات ورد طبيعي، مياه أكوابانا، فاين، مكسرات، لقيمات، تمر.",
            "عدد (2) طاولة خشبية مستطيلة للضيافة مع ورد صناعي.",
            "سجاد تشريفية داخل القاعة مقاس (5×25 م).",
            "سجاد مقاس (8×5 م) داخل القاعة أمام المعرس.",
            "عدد (4) سجاد داخل القاعة مقاس (3×4 م) لطاولات الكوكتيل.",
            "عدد (8) حواجز ذهبية كريستال.",
          ],
        },
        {
          key: "lobby",
          bullets: [
            "ترتيب عدد 20 طاولة رخام.",
            "عدد (6) طاولات VIP عند المعرس تحتوي على: فازة ورد، مكسرات مشكلة، مياه الكالاين + مياه غازية، صحن لقيمات، باقة ورد صغيرة، فاين.",
          ],
        },
        {
          key: "hospitality",
          bullets: [
            "عدد (4) صواني شوكلت.",
            "عدد (4) صواني موالح.",
            "عدد (100) كوب حلوى عماني.",
            "عدد (14) مقهويين بزي موحد.",
            "صندوق العدة.",
            "مشرف الحفل + عدد (5) عمال سيرفس.",
            "عدد (4) مداخن.",
            "عدد (5) أنواع مشروبات حارة: شاي، كرك، قهوة، زعتر، كابتشينو.",
            "عدد (4) أنواع عصائر فريش.",
            "مياه الكالاين + مياه غازية عدد مفتوح.",
          ],
        },
        {
          key: "photography",
          bullets: [
            "عدد (1) كاميرا فوتوغرافي.",
            "عدد (1) كاميرا فيديو.",
            "عدد (1) كاميرا كرين.",
            "لينك للبث المباشر (لايف إستيرمنج).",
            "فلاش ميموري للصور وفيديو للعرس.",
          ],
        },
        {
          key: "exterior",
          bullets: [
            "موكيت أوف وايت تشريفة لمدخل القاعة.",
            "عدد (1) باقة ورد كبيرة لطاولة اللوبي.",
            "عدد (4) فازات رخام للورد عند المدخل.",
            "لافتة مقاس (2×2.5 م) خارج القاعة.",
            "صحن موالح، ستاند فواكة مشكلة، تمر، فاين، مياة الكالاين.",
          ],
        },
      ],
    },
    {
      id: "gold",
      tier: "gold",
      name: "الباقة الذَّهَبية",
      priceQAR: 50000,
      highlight: "خطوة فوق الفضية — ستاج تشريفة، حواجز مضيئة، تصوير متحرك.",
      photo: "/photos/hall/blue-chairs-gold.jpg",
      sections: [
        {
          key: "hall",
          bullets: [
            "جلسات خشبية + طاولات خشبية صغيرة لصف العرس فقط.",
            "خلفية خشبية للعرس مقاس (6×26 م) مع شعار العائلة.",
            "عدد (2) باقة ورد يمين ويسار العرس + باقات ورد لكامل صف العرس.",
            "عدد (4) طاولات كوكتيل خشبية مجهزة بـ (5) فازات ورد طبيعي، مياه أكوابانا، فاين، مكسرات، لقيمات، بيتي فور، تمر.",
            "عدد (2) طاولة خشبية مستطيلة للضيافة مع ورد طبيعي.",
            "ستاج تشريفة مقاس (4×35 م) مع موكيت أوف وايت.",
            "ستاج مقاس (4×26 م) عند المعرس مع موكيت أوف وايت.",
            "عدد (6) سجاد داخل القاعة مقاس (3×4 م).",
            "عدد (10) حواجز خشبية مضيئة.",
          ],
        },
        {
          key: "lobby",
          bullets: [
            "ترتيب عدد 20 طاولة رخام (طاولات القاعة).",
            "عدد (6) طاولات VIP تحتوي على: فازة ورد، مكسرات مشكلة، مياه الكالاين + مياه غازية، صحن لقيمات، باقة ورد صغيرة، فاين.",
          ],
        },
        {
          key: "hospitality",
          bullets: [
            "عدد (5) صواني شوكلت.",
            "عدد (5) صواني موالح.",
            "عدد (150) كوب حلوى عماني.",
            "عدد (16) مقهويين مع زي موحد.",
            "مشرف الحفل + عدد (6) عمال سيرفس.",
            "صندوق العدة.",
            "عدد (4) مداخن.",
            "عدد (5) أنواع مشروبات حارة: شاي، كرك، قهوة، زعتر، كابتشينو.",
            "عدد (4) أنواع عصائر فريش.",
            "مياه الكالاين زجاج + مياه غازية عدد مفتوح.",
          ],
        },
        {
          key: "photography",
          bullets: [
            "عدد (1) كاميرا فوتوغرافي.",
            "عدد (1) كاميرا متحركة.",
            "عدد (1) كاميرا فيديو.",
            "عدد (1) كاميرا كرين.",
            "لينك للبث المباشر (لايف إستيرمنج).",
            "فلاش ميموري للصور وفيديو للعرس.",
          ],
        },
        {
          key: "exterior",
          bullets: [
            "موكيت أوف وايت تشريفة لمدخل القاعة.",
            "عدد (1) باقة ورد كبيرة لطاولة اللوبي.",
            "عدد (4) فازات رخام للورد عند المدخل.",
            "لافتة مقاس (1.5×2 م) خارج القاعة.",
            "صحن معجنات، ستاند فواكة مشكلة، تمر، فاين، لقيمات أو تمر، مياه الكالاين.",
          ],
        },
      ],
    },
    {
      id: "platinum",
      tier: "platinum",
      name: "الباقة البِلاتينيوم",
      priceQAR: 55000,
      highlight: "ضيافة موسعة، عصائر فريش بخمس نكهات، ألبوم ديجيتال للعروس.",
      photo: "/photos/hall/mashrabiya-chandelier.jpg",
      sections: [
        {
          key: "hall",
          bullets: [
            "جلسات خشبية لصف المعرس + طاولات خشبية لصف المعرس فقط.",
            "خلفية خشبية للمعرس مقاس (6×26 م) مع شعار العائلة.",
            "عدد (2) باقة ورد طبيعي يمين ويسار المعرس + باقات ورد طبيعي لكامل صف العرس.",
            "عدد (4) طاولات كوكتيل خشبية مجهزة بـ فازات ورد، مياه أكوابانا، فاين، مكسرات، لقيمات، بيتي فور، تمر.",
            "عدد (2) طاولة خشبية مستطيلة للضيافة مع ورد طبيعي.",
            "ستاج تشريقة داخل القاعة مقاس (4×35 م) عند المعرس مع موكيت أوف وايت.",
            "ستاج مقاس (4×26 م) داخل القاعة أمام المعرس مع موكيت أوف وايت.",
            "عدد (2) سجاد داخل القاعة مقاس (4×3 م).",
            "عدد (8) حواجز خشبية مضيئة.",
          ],
        },
        {
          key: "lobby",
          bullets: [
            "ترتيب عدد (20) طاولة رخام (طاولات القاعة).",
            "عدد (6) طاولات VIP تحتوي على: فازة ورد، مكسرات مشكلة، مياه أكوابانا + مياه غازية، صحن لقيمات، باقة ورد صغيرة، فاين، لقيمات أو تمر.",
            "عدد (2) كنب صدف زوجي.",
            "عدد (8) كرسي صدف فردي.",
            "طاولات خشبية صغيرة وكبيرة.",
            "ضيافة للطاولات الخشبية.",
          ],
        },
        {
          key: "hospitality",
          bullets: [
            "عدد (6) صواني شوكلت.",
            "عدد (6) صواني موالح.",
            "عدد (150) كوب حلوى عماني.",
            "عدد (18) مقهويين مع زي موحد.",
            "صندوق العدة.",
            "عدد (4) مداخن.",
            "مشرف الحفل + عدد (6) عمال سيرفس.",
            "عدد (5) أنواع مشروبات حارة: شاي، كرك، قهوة، كابتشينو، حليب زعفران، زعتر.",
            "عدد (5) أنواع عصائر فريش.",
            "مياه أكوابانا زجاج + مياه غازية عدد مفتوح.",
          ],
        },
        {
          key: "photography",
          bullets: [
            "عدد (1) كاميرا فوتوغرافي.",
            "عدد (1) كاميرا متحركة للاستقبال.",
            "عدد (1) كاميرا فيديو.",
            "عدد (1) كاميرا كرين.",
            "عدد (1) ألبوم ديجتال (100 صورة).",
            "لينك للبث المباشر (لايف إستيرمنج).",
            "برومو للمعرس.",
            "فلاش ميموري للصور وفيديو العرس.",
          ],
        },
        {
          key: "exterior",
          bullets: [
            "موكيت أوف وايت تشريفة لمدخل القاعة.",
            "عدد (1) باقة ورد كبيرة لطاولة اللوبي.",
            "عدد (4) فازات رخام للورد عند المدخل.",
            "لافتة مقاس (2.5×2 م) خارج القاعة.",
            "صحن موالح، ستاند فواكة مشكلة، تمر، فاين.",
          ],
        },
      ],
    },
    {
      id: "vip",
      tier: "vip",
      name: "باقة الـ VIP",
      priceQAR: 65000,
      highlight: "الكوكتيل الكامل، ضيافة فاخرة، فاكهة مشكلة عند كل VIP.",
      photo: "/photos/hall/velvet-blue-arch.jpg",
      sections: [
        {
          key: "hall",
          bullets: [
            "جلسات خشبية لكامل قاعة الاستقبال + طاولات خشبية صغيرة وكبيرة.",
            "خلفية خشبية مقاس (6×26 م) مع شعار العائلة.",
            "عدد (2) باقة ورد طبيعي يمين ويسار المعرس + باقات ورد طبيعي لكامل صف المعرس.",
            "عدد (4) طاولات كوكتيل خشبية مجهزة بـ فازات ورد طبيعي، مياه أكوابانا، فاين، مكسرات مشكلة، لقيمات، بيتي فور، تشوكلت + صحن فواكه مشكلة.",
            "عدد (2) طاولة خشبية مستطيلة للضيافة مع ورد طبيعي.",
            "ستاج تشريفة مقاس (4×35 م) مع موكيت أوف وايت.",
            "ستاج عند المعرس مقاس (4×26 م) مع موكيت أوف وايت.",
            "عدد (6) سجاد دائري مقاس (3×4 م) لطاولات الكوكتيل.",
            "عدد (1) كورنر خشبي مقاس (4×4 م) داخل القاعة.",
          ],
        },
        {
          key: "lobby",
          bullets: [
            "ترتيب عدد (20) طاولة صغيرة بين الجلسات.",
            "ترتيب عدد (12) طاولة مستطيلة أمام الجلسات الجانبية.",
            "عدد (6) طاولات VIP تحتوي على: فازة ورد كبيرة، مكسرات مشكلة، مياه أكوابانا + مياه غازية، ستاند فواكه مشكلة (VIP)، صحن تشوكلت، صحن بيتي فور، صحن تمر، صحن معجنات/لقيمات، فاين.",
          ],
        },
        {
          key: "hospitality",
          bullets: [
            "عدد (6) صواني شوكلت.",
            "عدد (6) صواني موالح.",
            "عدد (200) كوب حلوى عماني.",
            "عدد (20) مقهوي مع زي موحد.",
            "مشرف بالحفل + مشرف للمقهويين.",
            "عدد (7) عمال سيرفيس.",
            "عدد (4) مداخن ذهبية أو فضية.",
            "عدد (7) أنواع مشروبات ساخنة.",
            "عدد (5) أنواع عصائر فريش.",
            "مياه أكوابنا + مياه غازية (العدد مفتوح).",
          ],
        },
        {
          key: "photography",
          bullets: [
            "عدد (1) كاميرا فوتوغرافي.",
            "عدد (1) كاميرا متحركة.",
            "عدد (1) كاميرا فيديو.",
            "عدد (1) كاميرا كرين.",
            "لينك للبث المباشر (لايف إستيرمنج).",
            "فلاش ميموري للصور وفيديو للعرس.",
          ],
        },
        {
          key: "exterior",
          bullets: [
            "موكيت أوف وايت تشريفة لمدخل القاعة.",
            "باقة ورد كبيرة لطاولة اللوبي.",
            "فازات رخام للورد عند المدخل.",
            "لافتة خارج القاعة.",
            "باقة ورد صغيرة، مكسرات مشكلة، فاين.",
          ],
        },
      ],
    },
    {
      id: "top-vip",
      tier: "top-vip",
      name: "باقة الـ TOP VIP",
      priceQAR: 70000,
      highlight: "أقصى ما نُقدّمه — كاملُ صالة الاستقبال، ضيافة على أعلى مستوى، تَوثيق سينمائي.",
      photo: "/photos/majlis/sheikh-portrait.jpg",
      sections: [
        {
          key: "hall",
          bullets: [
            "جلسات خشبية لكامل قاعة الاستقبال — طاولات خشبية صغيرة وكبيرة.",
            "خلفية خشبية مقاس (6×26 م) مع شعار العائلة.",
            "عدد (2) باقة ورد طبيعي يمين ويسار المعرس + باقات ورد طبيعي لكامل صف المعرس.",
            "عدد (4) طاولات كوكتيل خشبية مجهزة بـ فازات ورد طبيعي، مياه أكوابانا، فاين، مكسرات، لقيمات، بيتي فور، تمر، فواكه مشكلة.",
            "عدد (2) طاولة خشبية مستطيلة للضيافة مع ورد طبيعي. الضيافة على المطلوبات.",
            "ستاج تشريفة مقاس (4×35 م) عند المعرس مع موكيت أوف وايت.",
            "ستاج مقاس (4×26 م) داخل القاعة أمام المعرس.",
            "عدد (1) كورنر خشبي داخل القاعة.",
          ],
        },
        {
          key: "lobby",
          bullets: [
            "ترتيب طاولات استقبال على كامل اللوبي.",
            "عدد (6) طاولات VIP عند المعرس تحتوي على: فازة ورد، مكسرات مشكلة (VIP)، مياه أكوابانا، ستاند فواكه مشكلة، تمر، فاين.",
            "ترتيب عدد (12) طاولة مستطيلة أمام الجلسات الجانبية: مزهرية ورد طبيعي، فاين، مياه أكوابانا.",
            "ترتيب عدد (20) طاولة صغيرة بين الجلسات: لقيمات، مكسرات مشكلة، مياه أكوابانا.",
          ],
        },
        {
          key: "hospitality",
          bullets: [
            "عدد (8) صواني كريستال شوكلت.",
            "عدد (8) صواني موالح.",
            "عدد (250) كوب حلوى عماني.",
            "عدد (22) مقهوي مع زي موحد.",
            "عدد (2) مشرفي صالة + مشرف للمقهويين.",
            "عدد (8) عمال سيرفيس.",
            "عدد (4) مداخن ذهبية.",
            "عدد (7) أنواع مشروبات ساخنة: شاي، كرك، قهوة، كابتشينو، حليب زعفران، زعتر.",
            "عدد (5) أنواع عصائر فريش.",
            "مياه أكوابانا + مياه غازية (العدد مفتوح).",
          ],
        },
        {
          key: "photography",
          bullets: [
            "عدد (1) كاميرا فوتوغرافي.",
            "عدد (1) كاميرا فيديو للحفل.",
            "عدد (1) كاميرا متحركة.",
            "عدد (1) كاميرا كرين.",
            "عدد (1) كاميرا فيديو للاستقبال.",
            "عدد (1) ألبوم ديجيتال (100 صورة).",
            "لينك للبث المباشر (لايف إستيرمنج).",
            "برومو للعرس.",
            "فلاش ميموري للصور وفيديو العرس.",
          ],
        },
        {
          key: "exterior",
          bullets: [
            "موكيت أوف وايت تشريفة لمدخل القاعة.",
            "عدد (1) باقة ورد كبيرة لطاولة اللوبي.",
            "عدد (4) فازات رخام للورد عند المدخل.",
            "لافتة مقاس (2.5×3 م) خارج القاعة.",
          ],
        },
      ],
    },
  ],
  en: [
    {
      id: "silver",
      tier: "silver",
      name: "The Silver Package",
      priceQAR: 39000,
      highlight: "A complete start — everything the men's hall needs, no add-ons required.",
      photo: "/photos/hall/ballroom-blue-floor.jpg",
      sections: [
        {
          key: "hall",
          bullets: [
            "Wooden seating with small wooden tables for the groom's row only.",
            "Wooden backdrop for the groom 6 × 26 m, with the family seal.",
            "Two natural flower bouquets at left and right of the groom + bouquets along the entire groom's row.",
            "Four wooden cocktail tables: natural flower vases, Aquabana water, fine, mixed nuts, luqaimat, dates.",
            "Two rectangular wooden hospitality tables with artificial flowers.",
            "Honour carpet inside the hall, 5 × 25 m.",
            "Carpet 8 × 5 m inside the hall in front of the groom.",
            "Four carpets inside the hall, 3 × 4 m, for the cocktail tables.",
            "Eight golden crystal barriers.",
          ],
        },
        {
          key: "lobby",
          bullets: [
            "Arrangement of 20 marble tables.",
            "Six VIP tables at the groom's section, each with: flower vase, mixed nuts, Kalayn water + sparkling water, luqaimat dish, small flower bouquet, fine.",
          ],
        },
        {
          key: "hospitality",
          bullets: [
            "Four chocolate trays.",
            "Four savouries trays.",
            "100 cups of Omani sweets.",
            "14 maqhouyeen (coffee servers) in matching uniform.",
            "Equipment kit.",
            "Event supervisor + 5 service staff.",
            "Four shisha pipes.",
            "Five hot beverages: tea, karak, coffee, za'atar, cappuccino.",
            "Four fresh juices.",
            "Kalayn water + sparkling water, open quantity.",
          ],
        },
        {
          key: "photography",
          bullets: [
            "One photography camera.",
            "One video camera.",
            "One crane camera.",
            "Live-streaming link.",
            "Flash memory delivery of photos and video.",
          ],
        },
        {
          key: "exterior",
          bullets: [
            "Off-white honour carpet at the hall entrance.",
            "One large flower bouquet for the lobby table.",
            "Four marble flower vases at the entrance.",
            "Signage 2 × 2.5 m outside the hall.",
            "Savouries dish, mixed fruit stand, dates, fine, Kalayn water.",
          ],
        },
      ],
    },
    {
      id: "gold",
      tier: "gold",
      name: "The Gold Package",
      priceQAR: 50000,
      highlight: "A step above Silver — honour stage, illuminated barriers, motion-camera coverage.",
      photo: "/photos/hall/blue-chairs-gold.jpg",
      sections: [
        {
          key: "hall",
          bullets: [
            "Wooden seating + small wooden tables for the groom's row only.",
            "Wooden backdrop for the groom 6 × 26 m, with the family seal.",
            "Two flower bouquets at left and right of the groom + bouquets across the entire groom's row.",
            "Four wooden cocktail tables, each set with five natural flower vases, Aquabana water, fine, mixed nuts, luqaimat, petit four, dates.",
            "Two rectangular wooden hospitality tables with natural flowers.",
            "Honour stage 4 × 35 m, with off-white carpet.",
            "Stage 4 × 26 m at the groom's section, with off-white carpet.",
            "Six carpets inside the hall, 3 × 4 m.",
            "Ten illuminated wooden barriers.",
          ],
        },
        {
          key: "lobby",
          bullets: [
            "Arrangement of 20 marble hall tables.",
            "Six VIP tables, each with: flower vase, mixed nuts, Kalayn water + sparkling water, luqaimat dish, small bouquet, fine.",
          ],
        },
        {
          key: "hospitality",
          bullets: [
            "Five chocolate trays.",
            "Five savouries trays.",
            "150 cups of Omani sweets.",
            "16 maqhouyeen in matching uniform.",
            "Event supervisor + 6 service staff.",
            "Equipment kit.",
            "Four shisha pipes.",
            "Five hot beverages: tea, karak, coffee, za'atar, cappuccino.",
            "Four fresh juices.",
            "Glass Kalayn water + sparkling water, open quantity.",
          ],
        },
        {
          key: "photography",
          bullets: [
            "One photography camera.",
            "One motion camera.",
            "One video camera.",
            "One crane camera.",
            "Live-streaming link.",
            "Flash memory delivery of photos and video.",
          ],
        },
        {
          key: "exterior",
          bullets: [
            "Off-white honour carpet at the hall entrance.",
            "One large flower bouquet for the lobby table.",
            "Four marble flower vases at the entrance.",
            "Signage 1.5 × 2 m outside the hall.",
            "Pastry dish, mixed fruit stand, dates, fine, luqaimat or dates, Kalayn water.",
          ],
        },
      ],
    },
    {
      id: "platinum",
      tier: "platinum",
      name: "The Platinum Package",
      priceQAR: 55000,
      highlight: "Expanded hospitality, five fresh-juice flavours, a digital album for the groom.",
      photo: "/photos/hall/mashrabiya-chandelier.jpg",
      sections: [
        {
          key: "hall",
          bullets: [
            "Wooden seating for the groom's row + wooden tables for the groom's row only.",
            "Wooden backdrop for the groom 6 × 26 m, with the family seal.",
            "Two natural flower bouquets at left and right of the groom + bouquets across the entire row.",
            "Four wooden cocktail tables: flower vases, Aquabana water, fine, mixed nuts, luqaimat, petit four, dates.",
            "Two rectangular wooden hospitality tables with natural flowers.",
            "Honour stage 4 × 35 m at the groom's section, with off-white carpet.",
            "Stage 4 × 26 m inside the hall in front of the groom, off-white carpet.",
            "Two carpets inside the hall, 4 × 3 m.",
            "Eight illuminated wooden barriers.",
          ],
        },
        {
          key: "lobby",
          bullets: [
            "Arrangement of 20 marble hall tables.",
            "Six VIP tables, each with: flower vase, mixed nuts, Aquabana water + sparkling water, luqaimat dish, small bouquet, fine, luqaimat or dates.",
            "Two double mother-of-pearl sofas.",
            "Eight single mother-of-pearl chairs.",
            "Small and large wooden tables.",
            "Hospitality for the wooden tables.",
          ],
        },
        {
          key: "hospitality",
          bullets: [
            "Six chocolate trays.",
            "Six savouries trays.",
            "150 cups of Omani sweets.",
            "18 maqhouyeen in matching uniform.",
            "Equipment kit.",
            "Four shisha pipes.",
            "Event supervisor + 6 service staff.",
            "Five hot beverages: tea, karak, coffee, cappuccino, saffron milk, za'atar.",
            "Five fresh juices.",
            "Glass Aquabana water + sparkling water, open quantity.",
          ],
        },
        {
          key: "photography",
          bullets: [
            "One photography camera.",
            "One motion camera for the arrival.",
            "One video camera.",
            "One crane camera.",
            "One digital album (100 photos).",
            "Live-streaming link.",
            "Wedding promo film.",
            "Flash memory delivery of photos and video.",
          ],
        },
        {
          key: "exterior",
          bullets: [
            "Off-white honour carpet at the hall entrance.",
            "One large flower bouquet for the lobby table.",
            "Four marble flower vases at the entrance.",
            "Signage 2.5 × 2 m outside the hall.",
            "Savouries dish, mixed fruit stand, dates, fine.",
          ],
        },
      ],
    },
    {
      id: "vip",
      tier: "vip",
      name: "The VIP Package",
      priceQAR: 65000,
      highlight: "Full cocktail spread, premium hospitality, mixed-fruit station at every VIP table.",
      photo: "/photos/hall/velvet-blue-arch.jpg",
      sections: [
        {
          key: "hall",
          bullets: [
            "Wooden seating for the entire reception hall + small and large wooden tables.",
            "Wooden backdrop 6 × 26 m, with the family seal.",
            "Two natural flower bouquets at left and right of the groom + bouquets across the entire row.",
            "Four wooden cocktail tables: natural flower vases, Aquabana water, fine, mixed nuts, luqaimat, petit four, chocolate + a mixed-fruit dish.",
            "Two rectangular wooden hospitality tables with natural flowers.",
            "Honour stage 4 × 35 m, with off-white carpet.",
            "Stage at the groom's section 4 × 26 m, with off-white carpet.",
            "Six round carpets 3 × 4 m for the cocktail tables.",
            "One wooden corner 4 × 4 m inside the hall.",
          ],
        },
        {
          key: "lobby",
          bullets: [
            "Arrangement of 20 small tables between seating areas.",
            "Arrangement of 12 rectangular tables in front of side seating.",
            "Six VIP tables, each with: large flower vase, mixed nuts, Aquabana water + sparkling water, VIP mixed-fruit stand, chocolate dish, petit-four dish, dates dish, pastry/luqaimat dish, fine.",
          ],
        },
        {
          key: "hospitality",
          bullets: [
            "Six chocolate trays.",
            "Six savouries trays.",
            "200 cups of Omani sweets.",
            "20 maqhouyeen in matching uniform.",
            "Event supervisor + maqhouyeen supervisor.",
            "Seven service staff.",
            "Four shisha pipes — gold or silver.",
            "Seven hot beverages.",
            "Five fresh juices.",
            "Aquabana water + sparkling water, open quantity.",
          ],
        },
        {
          key: "photography",
          bullets: [
            "One photography camera.",
            "One motion camera.",
            "One video camera.",
            "One crane camera.",
            "Live-streaming link.",
            "Flash memory delivery of photos and video.",
          ],
        },
        {
          key: "exterior",
          bullets: [
            "Off-white honour carpet at the hall entrance.",
            "Large flower bouquet for the lobby table.",
            "Marble flower vases at the entrance.",
            "Signage outside the hall.",
            "Small bouquet, mixed nuts, fine.",
          ],
        },
      ],
    },
    {
      id: "top-vip",
      tier: "top-vip",
      name: "The TOP VIP Package",
      priceQAR: 70000,
      highlight: "The pinnacle — full reception hall, peak hospitality, cinematic documentation.",
      photo: "/photos/majlis/sheikh-portrait.jpg",
      sections: [
        {
          key: "hall",
          bullets: [
            "Wooden seating for the entire reception hall — small and large wooden tables.",
            "Wooden backdrop 6 × 26 m, with the family seal.",
            "Two natural flower bouquets at left and right of the groom + bouquets across the entire row.",
            "Four wooden cocktail tables: natural flower vases, Aquabana water, fine, mixed nuts, luqaimat, petit four, dates, mixed fruit.",
            "Two rectangular wooden hospitality tables with natural flowers — hospitality on request.",
            "Honour stage 4 × 35 m at the groom's section, with off-white carpet.",
            "Stage 4 × 26 m inside the hall in front of the groom.",
            "One wooden corner inside the hall.",
          ],
        },
        {
          key: "lobby",
          bullets: [
            "Reception-table arrangement across the entire lobby.",
            "Six VIP tables at the groom's section, each with: flower vase, mixed nuts (VIP), Aquabana water, mixed-fruit stand, dates, fine.",
            "Twelve rectangular tables in front of side seating: natural flower vase, fine, Aquabana water.",
            "Twenty small tables between seating areas: luqaimat, mixed nuts, Aquabana water.",
          ],
        },
        {
          key: "hospitality",
          bullets: [
            "Eight crystal chocolate trays.",
            "Eight savouries trays.",
            "250 cups of Omani sweets.",
            "22 maqhouyeen in matching uniform.",
            "Two hall supervisors + maqhouyeen supervisor.",
            "Eight service staff.",
            "Four golden shisha pipes.",
            "Seven hot beverages: tea, karak, coffee, cappuccino, saffron milk, za'atar.",
            "Five fresh juices.",
            "Aquabana water + sparkling water, open quantity.",
          ],
        },
        {
          key: "photography",
          bullets: [
            "One photography camera.",
            "One video camera for the event.",
            "One motion camera.",
            "One crane camera.",
            "One video camera for the arrival.",
            "One digital album (100 photos).",
            "Live-streaming link.",
            "Wedding promo film.",
            "Flash memory delivery of photos and video.",
          ],
        },
        {
          key: "exterior",
          bullets: [
            "Off-white honour carpet at the hall entrance.",
            "One large flower bouquet for the lobby table.",
            "Four marble flower vases at the entrance.",
            "Signage 2.5 × 3 m outside the hall.",
          ],
        },
      ],
    },
  ],
};
