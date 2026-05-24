import Image from "next/image";
import { notFound } from "next/navigation";
import { LANGS, type Lang } from "@/lib/i18n";
import { ATELIER } from "@/lib/copy";
import { FormatHeadline } from "@/components/FormatHeadline";
import { ContactCallout } from "@/components/ContactCallout";

export default async function AtelierPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!LANGS.includes(rawLang as Lang)) notFound();
  const lang = rawLang as Lang;
  const c = ATELIER[lang];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 md:pt-52 md:pb-32 surface-marble">
        <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <p className="type-roman text-[0.72rem] text-[color:var(--color-zari-deep)] mb-8">
              {c.eyebrow}
            </p>
            <h1
              className={`${
                lang === "ar" ? "type-arabic-display" : "type-display"
              } text-[color:var(--color-ink)]`}
              style={{ fontSize: "var(--text-h1)" }}
            >
              <FormatHeadline text={c.headline} />
            </h1>
          </div>
          <div className="md:col-span-4 md:col-start-9 flex items-end">
            <p
              className={`${
                lang === "ar" ? "type-arabic" : "type-serif"
              } text-[color:var(--color-ink-warm)] text-lg leading-relaxed`}
            >
              {c.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="relative py-32 md:py-44 surface-pearl">
        <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12">
          <div className="seal-divider type-roman text-[0.7rem] mb-20 max-w-md mx-auto">
            <span>{lang === "ar" ? "ثلاثة مبادئ" : "Three principles"}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
            {c.principles.map((p, i) => (
              <div key={i} className="space-y-6">
                <p
                  className={`${
                    lang === "ar" ? "type-arabic-display text-5xl" : "type-display text-5xl"
                  } text-[color:var(--color-zari-deep)]`}
                >
                  {p.ar}
                </p>
                <p className="type-roman text-[0.7rem] text-[color:var(--color-ink-warm)]">
                  — {p.en}
                </p>
                <p
                  className={`${
                    lang === "ar" ? "type-arabic" : "type-serif"
                  } text-[color:var(--color-ink-soft)] text-base leading-relaxed`}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Network */}
      <section className="relative surface-bisht overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[600px]">
            <Image
              src="/photos/majlis/sheikh-portrait.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(90deg, transparent 60%, oklch(0.135 0.005 60 / 0.4) 100%)",
              }}
            />
          </div>
          <div className="flex items-center px-6 md:px-16 py-20 md:py-32">
            <div className="max-w-md">
              <p className="type-roman text-[0.7rem] text-[color:var(--color-zari)] mb-8">
                {c.network.label}
              </p>
              <h2
                className={`${
                  lang === "ar" ? "type-arabic-display" : "type-display"
                } text-[color:var(--color-pearl)] mb-8`}
                style={{ fontSize: "var(--text-h2)" }}
              >
                {c.network.title}
              </h2>
              <p
                className={`${
                  lang === "ar" ? "type-arabic" : "type-serif"
                } text-[color:var(--color-mist)] text-lg leading-relaxed italic`}
              >
                {c.network.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="relative py-32 md:py-44 surface-pearl">
        <div className="mx-auto max-w-[var(--container-text)] px-6 md:px-12">
          <p className="type-roman text-[0.7rem] text-[color:var(--color-zari-deep)] mb-6">
            {c.terms.label}
          </p>
          <h2
            className={`${
              lang === "ar" ? "type-arabic-display" : "type-display"
            } text-[color:var(--color-ink)] mb-16`}
            style={{ fontSize: "var(--text-h2)" }}
          >
            {c.terms.title}
          </h2>
          <ul className="space-y-6">
            {c.terms.lines.map((line, i) => (
              <li
                key={i}
                className="flex gap-6 items-baseline pb-6 border-b border-[color:var(--color-mist)]/40 last:border-b-0"
              >
                <span className="type-roman text-[0.7rem] text-[color:var(--color-zari-deep)] flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className={`${
                    lang === "ar" ? "type-arabic" : "type-serif"
                  } text-[color:var(--color-ink-soft)] text-lg md:text-xl leading-relaxed`}
                >
                  {line}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCallout lang={lang} variant="dark" />
    </>
  );
}
