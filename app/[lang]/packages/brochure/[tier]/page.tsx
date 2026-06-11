import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LANGS, type Lang, localizedDigits, localizedThousands } from "@/lib/i18n";
import { PACKAGES, type Package } from "@/lib/packages";
import { BROCHURE, PACKAGES_META } from "@/lib/copy";
import { PHONES, EMAIL, INSTAGRAM, LOCATION } from "@/lib/contact";
import { Logo } from "@/components/Logo";
import { PrintButton } from "@/components/PrintButton";

/**
 * Brochure — a print-clean, shareable one-sheet per men's tier.
 *
 * The visitor lands here from /packages, hits "print or save as PDF",
 * and walks away with a branded artifact they can forward to family.
 * Everything inside the sheet is static black-on-white with gold accents
 * so it prints faithfully; the global print CSS hides the site chrome
 * (.print-hide) and strips the paper grain. Data comes straight from the
 * static PACKAGES source — a brochure is a fixed document, not a live page.
 */

const inkWarmHairline = "color-mix(in oklab, var(--color-ink-warm) 25%, transparent)";

export function generateStaticParams() {
  // Five tiers × two languages. Tier ids are identical across languages,
  // so we derive them once from the canonical Arabic array.
  return LANGS.flatMap((lang) =>
    PACKAGES.ar.map((pkg) => ({ lang, tier: pkg.id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; tier: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, tier } = await params;
  // A brochure is a print artifact, not a landing page — keep it out of
  // search indexes regardless of whether the params resolve.
  if (!LANGS.includes(rawLang as Lang)) return { robots: { index: false } };
  const pkg = PACKAGES[rawLang as Lang].find((p) => p.id === tier);
  if (!pkg) return { robots: { index: false } };
  return {
    title: `${pkg.name} — ALBISHT`,
    robots: { index: false },
  };
}

export default async function BrochurePage({
  params,
}: {
  params: Promise<{ lang: string; tier: string }>;
}) {
  const { lang: rawLang, tier } = await params;
  if (!LANGS.includes(rawLang as Lang)) notFound();
  const lang = rawLang as Lang;
  const pkg = PACKAGES[lang].find((p) => p.id === tier);
  if (!pkg) notFound();

  const isAr = lang === "ar";
  const meta = PACKAGES_META[lang];
  const brochure = BROCHURE[lang];
  const formattedPrice = localizedThousands(pkg.priceQAR, lang);

  return (
    /* Marble backdrop on screen; the print: variants collapse it so the
       sheet starts at the very top of the first printed page. pt-28 only
       exists to clear the fixed header on screen. */
    <div className="surface-marble pt-28 pb-16 px-4 md:px-6 print:pt-0 print:pb-0 print:px-0 print:bg-white">
      {/* === The sheet — everything inside prints === */}
      <div className="brochure-sheet mx-auto max-w-[52rem] bg-white px-8 md:px-14 py-12 md:py-16">
        {/* a) Letterhead row: mark at the start, issuance line at the end */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Logo height={56} variant="dark" />
          <p
            className="type-roman"
            style={{ fontSize: "0.7rem", color: "var(--color-ink-warm)" }}
          >
            {brochure.issued}
          </p>
        </div>

        {/* b) Gold hairline under the letterhead */}
        <div className="zari-line w-full my-8" aria-hidden="true" />

        {/* c) Tier name + price + highlight */}
        <header>
          <h1
            className={isAr ? "type-arabic-display" : "type-display"}
            style={{
              fontSize: "clamp(2.2rem, 1.8rem + 2vw, 3.5rem)",
              lineHeight: isAr ? "1.35" : "1.05",
              color: "var(--color-ink)",
            }}
          >
            {pkg.name}
          </h1>
          <div className="flex items-baseline gap-3 mt-4">
            <span
              className="type-display"
              style={{
                fontSize: "2rem",
                fontVariantNumeric: "lining-nums tabular-nums",
                color: "var(--color-zari)",
                lineHeight: 1,
              }}
            >
              {formattedPrice}
            </span>
            <span
              className="type-roman"
              style={{
                fontSize: "0.75rem",
                color: "var(--color-ink-warm)",
                letterSpacing: isAr ? 0 : "0.05em",
              }}
            >
              {meta.priceLabel}
            </span>
          </div>
          <p
            className={`${isAr ? "type-arabic" : "type-serif"} italic mt-4`}
            style={{ fontSize: "1.05rem", color: "var(--color-ink-warm)" }}
          >
            {pkg.highlight}
          </p>
        </header>

        {/* d) Inclusions — five sections in a two-column sheet grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 mt-10">
          {pkg.sections.map((section) => (
            <BrochureSection key={section.key} section={section} lang={lang} />
          ))}
        </div>

        {/* e) Contact footer — both lines, mail, instagram, location */}
        <footer
          className="mt-12 pt-8 border-t"
          style={{
            borderColor: "color-mix(in oklab, var(--color-ink-warm) 20%, transparent)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
            <PhoneLine label={PHONES.mens.label[lang]} display={PHONES.mens.display} lang={lang} />
            <PhoneLine label={PHONES.womens.label[lang]} display={PHONES.womens.display} lang={lang} />
          </div>
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mt-6">
            <span
              className="force-latin"
              dir="ltr"
              style={{
                unicodeBidi: "isolate",
                fontSize: "0.8rem",
                color: "var(--color-ink-warm)",
              }}
            >
              {EMAIL}
            </span>
            <span
              className="force-latin"
              dir="ltr"
              style={{
                unicodeBidi: "isolate",
                fontSize: "0.8rem",
                color: "var(--color-ink-warm)",
              }}
            >
              {INSTAGRAM.handle}
            </span>
            <span
              className={isAr ? "type-arabic" : "type-serif"}
              style={{ fontSize: "0.8rem", color: "var(--color-ink-warm)" }}
            >
              {LOCATION[lang]}
            </span>
          </div>
        </footer>
      </div>

      {/* === Screen-only action row — never printed === */}
      <div className="print-hide max-w-[52rem] mx-auto mt-6 flex flex-wrap gap-4 justify-between items-center">
        <PrintButton label={brochure.print} />
        <Link href={`/${lang}/packages#tier-${pkg.id}`} className="nav-link">
          {brochure.back}
        </Link>
      </div>
    </div>
  );
}

/* ============================================================
   BrochureSection — one inclusion list on the sheet.
   Gold small-caps label over a hairline, then the bullets with the
   same small gold dot used on /packages, sized down for paper.
   ============================================================ */

function BrochureSection({
  section,
  lang,
}: {
  section: Package["sections"][number];
  lang: Lang;
}) {
  const isAr = lang === "ar";
  return (
    <section>
      <div className="pb-2 mb-3 border-b" style={{ borderColor: inkWarmHairline }}>
        <h2
          className="type-roman"
          style={{ fontSize: "0.85rem", color: "var(--color-zari)" }}
        >
          {PACKAGES_META[lang].sectionLabels[section.key]}
        </h2>
      </div>
      <ul className="space-y-2">
        {section.bullets.map((bullet, i) => (
          <li
            key={i}
            className={`${isAr ? "type-arabic" : "type-serif"} flex gap-3 items-start leading-relaxed`}
            style={{ fontSize: "0.95rem", color: "var(--color-ink-soft)" }}
          >
            <span
              aria-hidden="true"
              className="block w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: "var(--color-zari)", marginTop: "0.55em" }}
            />
            <span>{localizedDigits(bullet, lang)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ============================================================
   PhoneLine — label over number. Numerals always read left-to-right,
   even inside Arabic text, so the number is isolated with dir="ltr".
   ============================================================ */

function PhoneLine({
  label,
  display,
  lang,
}: {
  label: string;
  display: string;
  lang: Lang;
}) {
  return (
    <div>
      <p
        className="type-roman"
        style={{ fontSize: "0.72rem", color: "var(--color-ink-warm)" }}
      >
        {label}
      </p>
      <p
        className="type-display mt-1"
        dir="ltr"
        style={{
          unicodeBidi: "isolate",
          fontSize: "1.05rem",
          fontVariantNumeric: "lining-nums tabular-nums",
          letterSpacing: "0.04em",
          color: "var(--color-zari)",
        }}
      >
        {localizedDigits(display, lang)}
      </p>
    </div>
  );
}
