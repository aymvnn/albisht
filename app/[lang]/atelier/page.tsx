import Image from "next/image";
import { notFound } from "next/navigation";
import { LANGS, type Lang, localizedNumeral } from "@/lib/i18n";
import { ATELIER } from "@/lib/copy";
import { FormatHeadline } from "@/components/FormatHeadline";
import { ContactCallout } from "@/components/ContactCallout";
import { PageHero } from "@/components/PageHero";

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
      <PageHero
        lang={lang}
        eyebrow={c.eyebrow}
        title={<FormatHeadline text={c.headline} />}
        intro={c.intro}
      />

      {/* Principles — three cards with photo backdrop per principle */}
      <section className="relative py-16 md:py-24 surface-pearl border-t border-[color:var(--color-ink-warm)]/15">
        <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12">
          <div className="seal-divider type-roman text-[0.95rem] mb-14 max-w-md mx-auto">
            <span>{lang === "ar" ? "ثلاثة مبادئ" : "Three principles"}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
            {c.principles.map((p, i) => {
              const photos = [
                "/photos/craft/server-shemagh-cups.jpg",
                "/photos/hall/olive-tree-light.jpg",
                "/photos/craft/sweets-silver-platter.jpg",
              ];
              return (
                <article key={i} className="group flex flex-col gap-8">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={photos[i]}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[2500ms] ease-out group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.65) 100%)",
                      }}
                    />
                    <p
                      className={`absolute inset-x-6 bottom-6 ${
                        lang === "ar" ? "type-arabic-display" : "type-display"
                      } text-[color:var(--color-zari)]`}
                      style={{
                        fontSize: "clamp(2.5rem, 1.8rem + 2vw, 3.5rem)",
                        lineHeight: lang === "ar" ? "1.4" : "1",
                        textShadow: "0 2px 16px rgba(0,0,0,0.7)",
                      }}
                    >
                      {p.ar}
                    </p>
                  </div>
                  <div className="space-y-4 px-1">
                    <p className="type-roman text-[1rem] text-[color:var(--color-zari-deep)]">
                      {p.en}
                    </p>
                    <p
                      className={`${
                        lang === "ar" ? "type-arabic" : "type-serif"
                      } text-[color:var(--color-ink-soft)] text-lg leading-relaxed`}
                    >
                      {p.body}
                    </p>
                  </div>
                </article>
              );
            })}
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
          <div className="flex items-center px-6 md:px-16 py-16 md:py-24">
            <div className="max-w-md">
              <p className="type-roman text-[0.95rem] text-[color:var(--color-zari)] mb-8">
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
      <section className="relative py-20 md:py-28 surface-pearl">
        <div className="mx-auto max-w-[var(--container-text)] px-6 md:px-12">
          <p className="type-roman text-[0.95rem] text-[color:var(--color-zari-deep)] mb-6">
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
                <span className="type-roman text-[0.95rem] text-[color:var(--color-zari-deep)] flex-shrink-0">
                  {lang === "ar"
                    ? localizedNumeral(i + 1, lang).padStart(2, "٠")
                    : String(i + 1).padStart(2, "0")}
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
