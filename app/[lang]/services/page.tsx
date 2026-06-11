import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { LANGS, type Lang, localizedNumeral } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { USE_SANITY } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/live";
import { servicesQuery } from "@/lib/sanity/queries";
import { mapServices } from "@/lib/content/from-sanity";
import { ContactCallout } from "@/components/ContactCallout";
import { PageHero } from "@/components/PageHero";

export const revalidate = 900;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (LANGS.includes(rawLang as Lang) ? rawLang : "ar") as Lang;
  return pageMetadata(lang, "/services");
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!LANGS.includes(rawLang as Lang)) notFound();
  const lang = rawLang as Lang;
  const doc = USE_SANITY ? (await sanityFetch({ query: servicesQuery })).data : null;
  const c = mapServices(doc, lang);
  const phases = c.phases;
  const isAr = lang === "ar";

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={c.eyebrow}
        title={c.title}
        intro={c.intro}
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
            src={c.intermezzoImage}
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
          {lang === "ar"
            ? localizedNumeral(index + 1, lang).padStart(2, "٠")
            : String(index + 1).padStart(2, "0")}
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
