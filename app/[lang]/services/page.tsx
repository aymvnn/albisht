import { notFound } from "next/navigation";
import { LANGS, type Lang } from "@/lib/i18n";
import { PlaceholderSection } from "@/components/PlaceholderSection";

const PHASES = {
  ar: [
    { ar: "التشاور", en: "Consultation", body: "الجلسة الأولى. في البيت أو في فندق الديوان." },
    { ar: "التصميم", en: "Composition", body: "اللون، الخَطّاط، البِشت، الأَزهار." },
    { ar: "التراث", en: "Heritage craft", body: "خَتم العائلة، الدعوة المَخطوطة، الفضة المَنقوشة." },
    { ar: "الكَرَم", en: "Hospitality", body: "القهوة، التَّمر، بَخور العود، عَطر الضيف." },
    { ar: "القاعة", en: "The men's hall", body: "المَكان، الكَوشة، المَشربيّات، الكروم." },
    { ar: "الموسيقى", en: "Music", body: "العود والقانون. لا غَير." },
    { ar: "اليوم", en: "The day", body: "الجَدوَل، البروتوكول، الاستقبال على مستوى الديوان." },
    { ar: "الذاكرة", en: "Memory", body: "الألبوم، هَدايا الشُكر، الرسالة الختامية." },
  ],
  en: [
    { ar: "التشاور", en: "Consultation", body: "The first conversation. At home, or at the palace hotel." },
    { ar: "التصميم", en: "Composition", body: "Colour, the calligrapher, the bisht, the flowers." },
    { ar: "التراث", en: "Heritage craft", body: "Family seal, hand-written invitation, engraved silver." },
    { ar: "الكَرَم", en: "Hospitality", body: "Coffee, dates, oud-bakhoor, perfume for the guest." },
    { ar: "القاعة", en: "The men's hall", body: "The venue, the kosha, mashrabiya screens, the chandeliers." },
    { ar: "الموسيقى", en: "Music", body: "Oud and qanun. Nothing else." },
    { ar: "اليوم", en: "The day", body: "The timeline, the protocol, Diwan-level reception." },
    { ar: "الذاكرة", en: "Memory", body: "The album, gifts of thanks, the closing letter." },
  ],
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!LANGS.includes(rawLang as Lang)) notFound();
  const lang = rawLang as Lang;
  const phases = PHASES[lang];

  return (
    <>
      <PlaceholderSection
        lang={lang}
        eyebrow={lang === "ar" ? "الخدمات" : "Services"}
        title={lang === "ar" ? "البروتوكول." : "The protocol."}
        body={
          lang === "ar"
            ? "ثَمانية فُصول، يُسَلَّم كلٌّ منها بيَدِنا، ولا يَخرُج من تَحت أَيدينا حتى يَكتَمِل."
            : "Eight chapters, each delivered by our hand. Nothing leaves us before it is complete."
        }
      />

      <section className="relative surface-pearl py-32 md:py-44">
        <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12">
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
            {phases.map((p, i) => (
              <li key={i} className="group flex gap-8 items-start pb-12 border-b border-[color:var(--color-mist)]/30">
                <span className="type-roman text-[0.7rem] text-[color:var(--color-zari-deep)] flex-shrink-0 mt-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h3
                    className={`${
                      lang === "ar" ? "type-arabic-display text-4xl" : "type-display text-4xl"
                    } text-[color:var(--color-ink-bisht)] mb-2`}
                  >
                    {p.ar}
                  </h3>
                  <p className="type-roman text-[0.66rem] text-[color:var(--color-ink-warm)] mb-5">
                    {p.en}
                  </p>
                  <p className="type-serif text-[color:var(--color-ink-soft)] leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
