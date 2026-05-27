import Image from "next/image";
import { notFound } from "next/navigation";
import { LANGS, type Lang } from "@/lib/i18n";
import { ContactCallout } from "@/components/ContactCallout";
import { PageHero } from "@/components/PageHero";

const PHASES = {
  ar: [
    { ar: "التشاور", en: "Consultation", body: "الجلسة الأولى. في البيت أو في فندق الديوان.", photo: "/photos/majlis/outdoor-marquetry.jpg" },
    { ar: "التصميم", en: "Composition", body: "اللون، الخَطّاط، البِشت، الأَزهار.", photo: "/photos/hall/outdoor-marquetry-roses.jpg" },
    { ar: "التراث", en: "Heritage craft", body: "خَتم العائلة، الدعوة المَخطوطة، الفضة المَنقوشة.", photo: "/photos/hall/mashrabiya-tall-arch.jpg" },
    { ar: "الكَرَم", en: "Hospitality", body: "القهوة، التَّمر، بَخور العود، عَطر الضيف.", photo: "/photos/craft/tray-chocolates-olive.jpg" },
    { ar: "القاعة", en: "The men's hall", body: "المَكان، الكَوشة، المَشربيّات، الكروم.", photo: "/photos/hall/mashrabiya-chandelier.jpg" },
    { ar: "الموسيقى", en: "Music", body: "العود والقانون. لا غَير.", photo: "/photos/craft/red-carpet-dark.jpg" },
    { ar: "اليوم", en: "The day", body: "الجَدوَل، البروتوكول، الاستقبال على مستوى الديوان.", photo: "/photos/craft/server-shemagh-cups.jpg" },
    { ar: "الذاكرة", en: "Memory", body: "الألبوم، هَدايا الشُكر، الرسالة الختامية.", photo: "/photos/majlis/sheikh-portrait.jpg" },
  ],
  en: [
    { ar: "التشاور", en: "Consultation", body: "The first conversation. At home, or at the palace hotel.", photo: "/photos/majlis/outdoor-marquetry.jpg" },
    { ar: "التصميم", en: "Composition", body: "Colour, the calligrapher, the bisht, the flowers.", photo: "/photos/hall/outdoor-marquetry-roses.jpg" },
    { ar: "التراث", en: "Heritage craft", body: "Family seal, hand-written invitation, engraved silver.", photo: "/photos/hall/mashrabiya-tall-arch.jpg" },
    { ar: "الكَرَم", en: "Hospitality", body: "Coffee, dates, oud-bakhoor, perfume for the guest.", photo: "/photos/craft/tray-chocolates-olive.jpg" },
    { ar: "القاعة", en: "The men's hall", body: "The venue, the kosha, mashrabiya screens, the chandeliers.", photo: "/photos/hall/mashrabiya-chandelier.jpg" },
    { ar: "الموسيقى", en: "Music", body: "Oud and qanun. Nothing else.", photo: "/photos/craft/red-carpet-dark.jpg" },
    { ar: "اليوم", en: "The day", body: "The timeline, the protocol, Diwan-level reception.", photo: "/photos/craft/server-shemagh-cups.jpg" },
    { ar: "الذاكرة", en: "Memory", body: "The album, gifts of thanks, the closing letter.", photo: "/photos/majlis/sheikh-portrait.jpg" },
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
  const isAr = lang === "ar";

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={isAr ? "الخدمات" : "Services"}
        title={isAr ? "البروتوكول." : "The protocol."}
        intro={
          isAr
            ? "ثَمانية فُصول، يُسَلَّم كلٌّ منها بيَدِنا، ولا يَخرُج من تَحت أَيدينا حتى يَكتَمِل."
            : "Eight chapters, each delivered by our hand. Nothing leaves us before it is complete."
        }
      />

      {/* === Phases — alternating photo/text rows === */}
      <section className="relative surface-pearl border-t border-[color:var(--color-ink-warm)]/15">
        <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12 py-16 md:py-24 space-y-20 md:space-y-28">
          {phases.slice(0, 4).map((p, i) => (
            <PhaseRow key={i} phase={p} index={i} lang={lang} reversed={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* === Mid-page intermezzo — fullbleed photo === */}
      <section className="relative">
        <div className="relative aspect-[21/9] md:aspect-[21/7] w-full overflow-hidden">
          <Image
            src="/photos/craft/chocolate-tray-red-velvet.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.30) 100%)",
            }}
          />
        </div>
      </section>

      {/* === Phases 5–8 === */}
      <section className="relative surface-pearl">
        <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12 py-16 md:py-24 space-y-20 md:space-y-28">
          {phases.slice(4).map((p, i) => (
            <PhaseRow
              key={i + 4}
              phase={p}
              index={i + 4}
              lang={lang}
              reversed={(i + 4) % 2 === 1}
            />
          ))}
        </div>
      </section>

      <ContactCallout lang={lang} variant="dark" />
    </>
  );
}

function PhaseRow({
  phase,
  index,
  lang,
  reversed,
}: {
  phase: { ar: string; en: string; body: string; photo: string };
  index: number;
  lang: Lang;
  reversed: boolean;
}) {
  const isAr = lang === "ar";
  return (
    <article className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-16 items-center">
      <div className={`md:col-span-6 ${reversed ? "md:order-2" : ""}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={phase.photo}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
      <div
        className={`md:col-span-5 ${
          reversed ? "md:order-1 md:col-start-2" : "md:col-start-8"
        } flex flex-col gap-5`}
      >
        <p
          className="type-display"
          style={{
            fontSize: "clamp(2.5rem, 1.8rem + 2.6vw, 4.5rem)",
            color: "var(--color-zari)",
            lineHeight: 1,
            fontVariantNumeric: "lining-nums",
            opacity: 0.7,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3
          className={isAr ? "type-arabic-display" : "type-display"}
          style={{
            fontSize: "clamp(2.4rem, 1.8rem + 2.4vw, 4rem)",
            color: "var(--color-ink)",
            lineHeight: isAr ? "1.4" : "1.05",
          }}
        >
          {phase.ar}
        </h3>
        <p className="type-roman text-[1rem] text-[color:var(--color-ink-warm)]">
          {phase.en}
        </p>
        <p
          className={`${isAr ? "type-arabic" : "type-serif"} text-[color:var(--color-ink-soft)] text-lg md:text-xl leading-relaxed italic max-w-md`}
        >
          {phase.body}
        </p>
      </div>
    </article>
  );
}
