import Link from "next/link";
import { CALLOUT, PHONES } from "@/lib/contact";
import type { Lang } from "@/lib/i18n";

/**
 * The ContactCallout block — placed at the end of long pages where the
 * visitor has just read enough to want to act.
 *
 * Visual hierarchy reflects the brand reality:
 *   PRIMARY (equal weight, side-by-side):
 *     1. Write the full letter   → /consult
 *     2. Call the men's hall     → tel: link  (where the full atelier service lives)
 *   SECONDARY (smaller, below the primary row, with a "selected services" note):
 *     3. Call for women — selected services
 *
 * Variants:
 *   "dark"   — sits on the bisht-black surface (use on light-bg pages)
 *   "light"  — sits on the pearl surface (use on dark-bg pages)
 *   "inline" — minimal hairline strip inside a longer flow (no surface change)
 */
export function ContactCallout({
  lang,
  variant = "dark",
}: {
  lang: Lang;
  variant?: "dark" | "light" | "inline";
}) {
  const c = CALLOUT[lang];
  const isAr = lang === "ar";
  const isDark = variant === "dark";
  const isInline = variant === "inline";

  const text = isDark ? "var(--color-pearl)" : "var(--color-ink)";
  const muted = isDark ? "var(--color-mist)" : "var(--color-ink-warm)";
  const surface =
    variant === "dark" ? "surface-bisht" : variant === "light" ? "surface-pearl" : "";

  return (
    <section
      className={`relative ${isInline ? "py-20 md:py-28" : "py-32 md:py-44"} ${surface}`}
    >
      <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12">
        {/* Asymmetric header — eyebrow / headline */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-y-12 mb-16 md:mb-20">
          <div className="md:col-span-3">
            <div className="flex items-center gap-3">
              <span
                className="block w-10 h-px"
                style={{ background: "var(--color-zari)" }}
              />
              <span
                className="type-roman"
                style={{ color: "var(--color-zari)", fontSize: "0.95rem" }}
              >
                {c.eyebrow}
              </span>
            </div>
          </div>
          <h2
            className={`${isAr ? "type-arabic-display" : "type-display"} md:col-span-9`}
            style={{
              fontSize: "clamp(2.4rem, 1.8rem + 2.8vw, 4.5rem)",
              lineHeight: isAr ? "1.4" : "1",
              color: text,
            }}
          >
            {c.title}
          </h2>
          <div className="md:col-span-7 md:col-start-6">
            <p
              className={`${isAr ? "type-arabic" : "type-serif"} italic`}
              style={{
                fontSize: "1.1rem",
                color: muted,
                lineHeight: 1.7,
                maxWidth: "44rem",
              }}
            >
              {c.intro}
            </p>
          </div>
        </div>

        {/* PRIMARY row — two equal CTAs: letter + men's hall phone */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 border-y"
          style={{ borderColor: muted }}
        >
          {/* 1. Letter CTA */}
          <Link
            href={`/${lang}/consult`}
            className="group relative flex flex-col gap-3 py-12 md:py-16 px-6 md:px-10 transition-colors md:border-e"
            style={{ borderColor: muted, color: text }}
          >
            <span
              className="type-roman"
              style={{ color: "var(--color-zari)", fontSize: "0.95rem" }}
            >
              01
            </span>
            <span
              className={isAr ? "type-arabic-display" : "type-display"}
              style={{
                fontSize: "clamp(1.8rem, 1.4rem + 1.6vw, 2.4rem)",
                color: text,
                lineHeight: isAr ? "1.45" : "1.05",
              }}
            >
              {c.letter}
            </span>
            <span
              className={`mt-3 inline-flex items-center gap-2 ${
                isAr ? "type-arabic" : "type-serif"
              }`}
              style={{ color: "var(--color-zari)", fontSize: "0.98rem" }}
            >
              <span className="block w-8 h-px bg-current group-hover:w-12 transition-all duration-500" />
              <span className="flip-rtl">→</span>
            </span>
          </Link>

          {/* 2. Men's hall — primary phone */}
          <PrimaryPhoneCta
            number={PHONES.mens}
            lang={lang}
            text={text}
            muted={muted}
            isAr={isAr}
            callPrefix={c.callPrefix}
          />
        </div>

        {/* SECONDARY row — women's selected services, smaller, with note */}
        <div className="pt-8 md:pt-10">
          <SecondaryPhoneRow
            number={PHONES.womens}
            lang={lang}
            muted={muted}
            text={text}
            note={c.secondaryNote}
            isAr={isAr}
          />
        </div>
      </div>
    </section>
  );
}

function PrimaryPhoneCta({
  number,
  lang,
  text,
  muted,
  isAr,
  callPrefix,
}: {
  number: typeof PHONES.mens;
  lang: Lang;
  text: string;
  muted: string;
  isAr: boolean;
  callPrefix: string;
}) {
  return (
    <a
      href={`tel:${number.tel}`}
      className="group relative flex flex-col gap-3 py-12 md:py-16 px-6 md:px-10 transition-colors border-t md:border-t-0"
      style={{ borderColor: muted, color: text }}
    >
      <span
        className="type-roman"
        style={{ color: "var(--color-zari)", fontSize: "0.95rem" }}
      >
        02
      </span>
      <span
        className={isAr ? "type-arabic-display" : "type-display"}
        style={{
          fontSize: "clamp(1.8rem, 1.4rem + 1.6vw, 2.4rem)",
          color: text,
          lineHeight: isAr ? "1.45" : "1.05",
        }}
      >
        {`${callPrefix} ${number.label[lang]}`}
      </span>
      {number.note?.[lang] && (
        <span
          className={isAr ? "type-arabic" : "type-serif"}
          style={{ color: muted, fontSize: "0.95rem", fontStyle: "italic" }}
        >
          {number.note[lang]}
        </span>
      )}
      <span
        className="force-latin mt-1"
        style={{
          color: "var(--color-zari)",
          fontSize: "1.1rem",
          letterSpacing: "0.04em",
          fontVariantNumeric: "lining-nums tabular-nums",
        }}
      >
        {number.display}
      </span>
    </a>
  );
}

function SecondaryPhoneRow({
  number,
  lang,
  text,
  muted,
  note,
  isAr,
}: {
  number: typeof PHONES.womens;
  lang: Lang;
  text: string;
  muted: string;
  note: string;
  isAr: boolean;
}) {
  return (
    <a
      href={`tel:${number.tel}`}
      className="group flex flex-col md:flex-row md:items-baseline gap-y-3 md:gap-x-6 py-6 md:py-8 transition-colors"
      style={{ color: text }}
    >
      <span
        className={isAr ? "type-arabic" : "type-serif"}
        style={{ color: muted, fontSize: "0.95rem", fontStyle: "italic" }}
      >
        {note}
      </span>
      <span
        className="force-latin group-hover:text-[color:var(--color-zari)] transition-colors"
        style={{
          color: text,
          fontSize: "1.15rem",
          letterSpacing: "0.04em",
          fontVariantNumeric: "lining-nums tabular-nums",
        }}
      >
        {number.display}
      </span>
      {number.note?.[lang] && (
        <span
          className={isAr ? "type-arabic" : "type-serif"}
          style={{ color: muted, fontSize: "0.85rem", fontStyle: "italic" }}
        >
          ({number.note[lang]})
        </span>
      )}
    </a>
  );
}
