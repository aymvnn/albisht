import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LANGS, type Lang, localizedNumeral, localizedDigits, localizedThousands } from "@/lib/i18n";
import { PACKAGES_META } from "@/lib/copy";
import {
  PACKAGES,
  WOMENS_HOSPITALITY,
  WOMENS_BEVERAGES,
  WOMENS_BEVERAGE_CATEGORIES,
  WOMENS_META,
} from "@/lib/packages";
import type { Package } from "@/lib/packages";
import { ContactCallout } from "@/components/ContactCallout";
import { PageHero } from "@/components/PageHero";
import { PHONES } from "@/lib/contact";

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

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={meta.eyebrow}
        title={meta.title}
        intro={meta.intro}
      />

      {/* === Comparison overview — five tier cards at a glance.
          Sits between the hero and the detail chapters so a visitor can
          scan all five tiers, prices, and headlines without scrolling
          through every full chapter first. Clicking a card jumps to the
          anchored detail section below. */}
      <PackagesOverview packages={packages} lang={lang} meta={meta} />

      {/* === Each men's package as its own full-width chapter === */}
      {packages.map((pkg, i) => (
        <PackageBlock key={pkg.id} pkg={pkg} index={i} lang={lang} meta={meta} />
      ))}

      {/* === Women's atelier section — distinct product line === */}
      <WomensSection lang={lang} />

      {/* === Closing CTA — the full ContactCallout with both phones + letter === */}
      <ContactCallout lang={lang} variant="dark" />
    </>
  );
}

/* ============================================================
   PackagesOverview — a glanceable comparison grid of all five tiers.
   - One card per tier: photo, name, price, tagline, "read more" arrow
   - Cards are anchor-links that jump to the detail section below
   - Light surface throughout; gold accents on price and arrows
   ============================================================ */

function PackagesOverview({
  packages,
  lang,
  meta,
}: {
  packages: Package[];
  lang: Lang;
  meta: typeof PACKAGES_META.ar | typeof PACKAGES_META.en;
}) {
  const isAr = lang === "ar";
  const eyebrow = isAr ? "نظرة عامة" : "At a glance";
  const detailsLabel = isAr ? "التفاصيل" : "Details";

  return (
    <section className="relative py-14 md:py-20 surface-pearl border-y border-[color:var(--color-ink-warm)]/15">
      <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12">
        {/* Centred eyebrow with hairlines on both sides */}
        <div className="flex justify-center mb-10 md:mb-14">
          <div className="flex items-center gap-4">
            <span className="block w-12 h-px bg-[color:var(--color-zari)]" />
            <span className="type-roman text-[0.85rem] text-[color:var(--color-zari)]">
              {eyebrow}
            </span>
            <span className="block w-12 h-px bg-[color:var(--color-zari)]" />
          </div>
        </div>

        {/* 5-up card grid, responsive: 1 / 2 / 3 / 5 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 md:gap-6">
          {packages.map((pkg) => (
            <OverviewCard key={pkg.id} pkg={pkg} lang={lang} detailsLabel={detailsLabel} meta={meta} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OverviewCard({
  pkg,
  lang,
  detailsLabel,
  meta,
}: {
  pkg: Package;
  lang: Lang;
  detailsLabel: string;
  meta: typeof PACKAGES_META.ar | typeof PACKAGES_META.en;
}) {
  const isAr = lang === "ar";
  const formattedPrice = localizedThousands(pkg.priceQAR, lang);

  return (
    <Link
      href={`#tier-${pkg.id}`}
      className="group relative flex flex-col bg-white border border-[color:var(--color-ink-warm)]/15 hover:border-[color:var(--color-zari)] transition-all duration-500 overflow-hidden"
      style={{ transitionTimingFunction: "var(--ease-ceremonial)" }}
    >
      {/* Square photo */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={pkg.photo}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ transitionTimingFunction: "var(--ease-ceremonial)" }}
        />
        {/* Subtle dark-edge gradient at bottom for caption readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.08) 100%)",
          }}
        />
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-4 px-5 py-6 md:px-6 md:py-7 flex-1">
        <h3
          className={isAr ? "type-arabic-headline" : "type-display"}
          style={{
            fontSize: "clamp(1.3rem, 1rem + 0.5vw, 1.65rem)",
            lineHeight: isAr ? "1.5" : "1.1",
            color: "var(--color-ink)",
          }}
        >
          {pkg.name}
        </h3>

        <div className="flex items-baseline gap-2 mt-auto">
          <span
            className="type-display"
            style={{
              fontSize: "clamp(1.4rem, 1.1rem + 0.6vw, 1.75rem)",
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
              fontSize: "0.7rem",
              color: "var(--color-ink-warm)",
              letterSpacing: "0.05em",
            }}
          >
            {meta.priceLabel}
          </span>
        </div>

        <div
          className="flex items-center justify-between gap-3 pt-4 border-t"
          style={{ borderColor: "color-mix(in oklab, var(--color-ink-warm) 20%, transparent)", borderTopWidth: 1 }}
        >
          <span
            className="type-roman"
            style={{
              fontSize: "0.78rem",
              letterSpacing: isAr ? "0" : "0.1em",
              color: "var(--color-ink-warm)",
            }}
          >
            {detailsLabel}
          </span>
          <span
            className="flip-rtl transition-transform duration-500 group-hover:translate-x-1"
            style={{
              color: "var(--color-zari)",
              transitionTimingFunction: "var(--ease-ceremonial)",
            }}
          >
            ↓
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ============================================================
   PackageBlock — one chapter per package.
   All tiers render on a single light surface tone. Visual rhythm is carried
   by gold hairline dividers between tiers, not by alternating ink/pearl
   surfaces (the alternation was visually heavy and made the page strobe).
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
  // Single light tone for every tier. Subtle ivory variant on every other
  // tier (kept to ~2% colour shift) just enough to suggest rhythm without
  // strobing the eye.
  const surfaceClass = index % 2 === 1 ? "surface-marble" : "surface-pearl";
  const textColor = "var(--color-ink)";
  const mutedColor = "var(--color-ink-warm)";
  const dividerColor = "var(--color-ink-warm)";
  const numberStr = String(index + 1).padStart(2, "0");
  const localizedNumber = isAr ? localizedNumeral(index + 1, lang).padStart(2, "٠") : numberStr;
  const formattedPrice = localizedThousands(pkg.priceQAR, lang);

  return (
    <section
      id={`tier-${pkg.id}`}
      className={`relative py-20 md:py-28 ${surfaceClass} overflow-hidden`}
    >
      {/* Gold hairline divider at the top of every tier (except the first,
          where the page header already provides separation). */}
      {index > 0 && (
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px"
          style={{
            width: "min(64ch, 80%)",
            background:
              "linear-gradient(90deg, transparent 0%, var(--color-zari) 50%, transparent 100%)",
            opacity: 0.55,
          }}
        />
      )}

      <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12">
        {/* === Header: number + name + price + highlight === */}
        <header className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-y-6 md:gap-x-12 mb-12 md:mb-16">
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
        <div className="relative aspect-[21/9] overflow-hidden mb-10 md:mb-16">
          <Image
            src={pkg.photo}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 90vw"
            className="object-cover"
          />
        </div>

        {/* === Inclusions grid: five sections, two-column responsive === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {pkg.sections.map((section) => (
            <div key={section.key}>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b" style={{ borderColor: `${dividerColor}` , opacity: 0.95 }}>
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
                    <span>{localizedDigits(b, lang)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* === Per-package CTA === */}
        <div className="mt-12 md:mt-14 flex justify-center md:justify-end">
          <Link
            href={`/${lang}/consult?package=${pkg.id}`}
            className="btn-brand inline-flex items-center gap-4 border"
          >
            <span>{meta.cta}</span>
            <span className="btn-brand-arrow flip-rtl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   WomensSection — the women's atelier on /packages
   Distinct visual register from the men's tiers: lighter, more
   menu-like (capacities + drinks), single CTA to the women's phone.
   ============================================================ */

function WomensSection({ lang }: { lang: Lang }) {
  const isAr = lang === "ar";
  const meta = WOMENS_META[lang];
  const phone = PHONES.womens;

  return (
    <section className="relative py-20 md:py-28 surface-pearl overflow-hidden border-t border-[color:var(--color-ink-warm)]/15">
      {/* Soft gold ribbon divider at the top */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--color-zari) 50%, transparent 100%)",
          opacity: 0.7,
        }}
      />

      <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12">
        {/* === Header === */}
        <header className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-12 mb-14 md:mb-18">
          <div className="md:col-span-3">
            <div className="flex items-center gap-3">
              <span className="block w-10 h-px bg-[color:var(--color-zari)]" />
              <span className="type-roman text-[0.95rem] text-[color:var(--color-zari-deep)]">
                {meta.eyebrow}
              </span>
            </div>
          </div>
          <h2
            className={`${isAr ? "type-arabic-display" : "type-display"} md:col-span-9`}
            style={{
              fontSize: "clamp(2.6rem, 1.8rem + 3.6vw, 5rem)",
              lineHeight: isAr ? "1.4" : "1",
              color: "var(--color-ink)",
            }}
          >
            {meta.title}
          </h2>
          <div className="md:col-span-7 md:col-start-6">
            <p
              className={`${
                isAr ? "type-arabic" : "type-serif"
              } text-[color:var(--color-ink-warm)] text-lg md:text-xl leading-relaxed italic max-w-2xl`}
            >
              {meta.intro}
            </p>
          </div>
        </header>

        {/* === Two-column layout: hospitality capacities + beverage capacities === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 mb-16 md:mb-20">
          {/* Hospitality capacities */}
          <CapacityList
            title={meta.hospitalityTitle}
            tiers={WOMENS_HOSPITALITY}
            unit={meta.perPerson}
            lang={lang}
          />
          {/* Beverage tray capacities */}
          <CapacityList
            title={meta.beveragesTitle}
            tiers={WOMENS_BEVERAGES}
            unit={meta.perPerson}
            lang={lang}
          />
        </div>

        {/* === Beverage menu === */}
        <div className="mb-16 md:mb-20">
          <h3
            className={`${isAr ? "type-arabic-headline" : "type-display"} mb-8`}
            style={{
              fontSize: "clamp(1.8rem, 1.2rem + 2vw, 2.75rem)",
              color: "var(--color-ink)",
            }}
          >
            {meta.menuTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12">
            {WOMENS_BEVERAGE_CATEGORIES.map((cat) => (
              <div key={cat.name.en}>
                <h4
                  className={`${
                    isAr ? "type-arabic-headline" : "type-roman"
                  } pb-3 mb-5 border-b`}
                  style={{
                    borderColor: "var(--color-ink-warm)",
                    color: "var(--color-zari)",
                    fontSize: "1rem",
                  }}
                >
                  {cat.name[lang]}
                </h4>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li
                      key={item.en}
                      className={`${isAr ? "type-arabic" : "type-serif"}`}
                      style={{
                        color: "var(--color-ink)",
                        fontSize: "1.05rem",
                      }}
                    >
                      {localizedDigits(item[lang], lang)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* === CTA: direct phone to the women's atelier === */}
        <div className="flex flex-col items-center text-center gap-4 pt-10 border-t border-[color:var(--color-ink-warm)]/20">
          <p
            className={`${isAr ? "type-arabic" : "type-roman"} text-[color:var(--color-ink-warm)]`}
            style={{ fontSize: "0.95rem" }}
          >
            {meta.phoneLabel}
          </p>
          <a
            href={`tel:${phone.tel}`}
            className="type-display inline-flex items-center hover:text-[color:var(--color-zari-deep)] transition-colors"
            dir="ltr"
            style={{
              fontSize: "clamp(1.8rem, 1.2rem + 2vw, 2.75rem)",
              color: "var(--color-zari)",
              fontVariantNumeric: "lining-nums tabular-nums",
              letterSpacing: "0.04em",
              unicodeBidi: "isolate",
            }}
          >
            {localizedDigits(phone.display, lang)}
          </a>
          <Link
            href={`/${lang}/consult?line=womens`}
            className="btn-brand inline-flex items-center gap-4 mt-4 border"
          >
            <span>{meta.enquireLabel}</span>
            <span className="btn-brand-arrow flip-rtl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function CapacityList({
  title,
  tiers,
  unit,
  lang,
}: {
  title: string;
  tiers: { capacity: number }[];
  unit: string;
  lang: Lang;
}) {
  const isAr = lang === "ar";
  return (
    <div>
      <h3
        className={`${isAr ? "type-arabic-headline" : "type-display"} pb-4 mb-8 border-b`}
        style={{
          borderColor: "var(--color-ink-warm)",
          color: "var(--color-ink)",
          fontSize: "clamp(1.4rem, 1rem + 1.2vw, 2rem)",
        }}
      >
        {title}
      </h3>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-5">
        {tiers.map((tier) => (
          <li
            key={tier.capacity}
            className="flex items-baseline gap-3"
            style={{ color: "var(--color-ink)" }}
          >
            <span
              className="type-display"
              style={{
                fontSize: "clamp(1.5rem, 1.1rem + 1.2vw, 2.25rem)",
                color: "var(--color-zari)",
                fontVariantNumeric: "lining-nums tabular-nums",
                lineHeight: 1,
              }}
            >
              {isAr ? localizedNumeral(tier.capacity, lang) : tier.capacity}
            </span>
            <span
              className={`${isAr ? "type-arabic" : "type-roman"}`}
              style={{
                fontSize: "0.95rem",
                color: "var(--color-ink-warm)",
                letterSpacing: isAr ? 0 : "0.05em",
              }}
            >
              {unit}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
