import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LANGS, type Lang, localizedNumeral } from "@/lib/i18n";
import { PACKAGES_META } from "@/lib/copy";
import { PACKAGES } from "@/lib/packages";
import type { Package } from "@/lib/packages";
import { ContactCallout } from "@/components/ContactCallout";

export default async function PackagesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!LANGS.includes(rawLang as Lang)) notFound();
  const lang = rawLang as Lang;
  const meta = PACKAGES_META[lang];
  const packages = PACKAGES[lang];
  const isAr = lang === "ar";

  return (
    <>
      {/* === Hero — asymmetric header === */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-28 surface-marble">
        <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-16">
          <div className="md:col-span-3">
            <div className="flex items-center gap-3">
              <span className="block w-10 h-px bg-[color:var(--color-zari)]" />
              <span className="type-roman text-[0.95rem] text-[color:var(--color-zari-deep)]">
                {meta.eyebrow}
              </span>
            </div>
          </div>
          <h1
            className={`${
              isAr ? "type-arabic-display" : "type-display"
            } text-[color:var(--color-ink)] md:col-span-9`}
            style={{
              fontSize: "clamp(3rem, 2.4rem + 4vw, 6.5rem)",
              lineHeight: isAr ? "1.4" : "1",
            }}
          >
            {meta.title}
          </h1>
          <div className="md:col-span-7 md:col-start-6">
            <p
              className={`${
                isAr ? "type-arabic" : "type-serif"
              } text-[color:var(--color-ink-warm)] text-lg md:text-xl leading-relaxed italic max-w-2xl`}
            >
              {meta.intro}
            </p>
          </div>
        </div>
      </section>

      {/* === Each package as its own full-width chapter === */}
      {packages.map((pkg, i) => (
        <PackageBlock key={pkg.id} pkg={pkg} index={i} lang={lang} meta={meta} />
      ))}

      {/* === Closing CTA — the full ContactCallout with both phones + letter === */}
      <ContactCallout lang={lang} variant="dark" />
    </>
  );
}

/* ============================================================
   PackageBlock — one full-width chapter per package
   - Alternates dark/light surface to give visual rhythm
   - Number on one side, name + price + photo on the other
   - Inclusions grouped in five sections with hairline-rule dividers
   ============================================================ */

function PackageBlock({
  pkg,
  index,
  lang,
  meta,
}: {
  pkg: Package;
  index: number;
  lang: Lang;
  meta: typeof PACKAGES_META.ar | typeof PACKAGES_META.en;
}) {
  const isAr = lang === "ar";
  const dark = index % 2 === 1;
  const surfaceClass = dark ? "surface-bisht" : "surface-pearl";
  const textColor = dark ? "var(--color-pearl)" : "var(--color-ink)";
  const mutedColor = dark ? "var(--color-mist)" : "var(--color-ink-warm)";
  const dividerColor = dark ? "var(--color-mist)" : "var(--color-ink-warm)";
  const numberStr = String(index + 1).padStart(2, "0");
  const localizedNumber = isAr ? localizedNumeral(index + 1, lang).padStart(2, "٠") : numberStr;
  const formattedPrice = pkg.priceQAR.toLocaleString(isAr ? "ar-EG" : "en-US");

  return (
    <section className={`relative py-32 md:py-44 ${surfaceClass} overflow-hidden`}>
      <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12">
        {/* === Header: number + name + price + highlight === */}
        <header className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-y-8 md:gap-x-12 mb-16 md:mb-24">
          <div className="md:col-span-2">
            <p
              className="type-display"
              style={{
                fontSize: "clamp(3.5rem, 2rem + 5vw, 6rem)",
                fontVariantNumeric: "lining-nums",
                color: "var(--color-zari)",
                lineHeight: 1,
                opacity: 0.85,
              }}
            >
              {localizedNumber}
            </p>
          </div>
          <div className="md:col-span-7">
            <h2
              className={isAr ? "type-arabic-display" : "type-display"}
              style={{
                fontSize: "clamp(2.6rem, 1.8rem + 3.6vw, 5rem)",
                lineHeight: isAr ? "1.4" : "1",
                color: textColor,
              }}
            >
              {pkg.name}
            </h2>
            <p
              className={`${isAr ? "type-arabic" : "type-serif"} mt-6 italic max-w-2xl`}
              style={{
                color: mutedColor,
                fontSize: "1.125rem",
              }}
            >
              {pkg.highlight}
            </p>
          </div>
          <div className="md:col-span-3 md:text-end flex md:block items-baseline gap-4">
            <p
              className="type-display"
              style={{
                fontSize: "clamp(2rem, 1.5rem + 1.6vw, 2.75rem)",
                fontVariantNumeric: "lining-nums tabular-nums",
                color: "var(--color-zari)",
                lineHeight: 1,
              }}
            >
              {formattedPrice}
            </p>
            <p
              className="type-roman mt-2"
              style={{
                color: mutedColor,
                fontSize: "0.95rem",
              }}
            >
              {meta.priceLabel}
            </p>
          </div>
        </header>

        {/* === Hero photo === */}
        <div className="relative aspect-[21/9] overflow-hidden mb-16 md:mb-24">
          <Image
            src={pkg.photo}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 90vw"
            className="object-cover"
          />
          {dark && (
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.4) 100%)",
              }}
            />
          )}
        </div>

        {/* === Inclusions grid: five sections, two-column responsive === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
          {pkg.sections.map((section) => (
            <div key={section.key}>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: `${dividerColor}` , opacity: 0.95 }}>
                <span
                  className="type-roman"
                  style={{
                    color: "var(--color-zari)",
                    fontSize: "1rem",
                  }}
                >
                  {meta.sectionLabels[section.key]}
                </span>
              </div>
              <ul className="space-y-3">
                {section.bullets.map((b, j) => (
                  <li
                    key={j}
                    className={`${isAr ? "type-arabic" : "type-serif"} leading-relaxed flex gap-3 items-start`}
                    style={{ color: textColor, fontSize: "1.15rem" }}
                  >
                    <span
                      className="block mt-2 w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: "var(--color-zari)" }}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* === Per-package CTA === */}
        <div className="mt-20 flex justify-center md:justify-end">
          <Link
            href={`/${lang}/consult?package=${pkg.id}`}
            className="group inline-flex items-center gap-4 px-8 py-4 border transition-all duration-500"
            style={{
              borderColor: "var(--color-zari)",
              color: "var(--color-zari)",
              transitionTimingFunction: "var(--ease-ceremonial)",
            }}
          >
            <span className="type-roman" style={{ fontSize: "1rem" }}>
              {meta.cta}
            </span>
            <span className="flip-rtl group-hover:translate-x-1 transition-transform duration-500">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
