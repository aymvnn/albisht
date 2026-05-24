import Link from "next/link";
import { CALLOUT, PHONES } from "@/lib/contact";
import type { Lang } from "@/lib/i18n";

/**
 * The ContactCallout block — placed at the end of long pages where the
 * visitor has just read enough to want to act. Offers three actions:
 *   1. Write the full letter   → /consult
 *   2. Call the men's hall     → tel: link
 *   3. Call the women's hall   → tel: link
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

  // Color tokens per variant — dark surface = pearl text, light surface = ink
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
                style={{ color: "var(--color-zari)", fontSize: "0.82rem" }}
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

        {/* Three CTAs — equal-weight grid, hairline-rule separator between each */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 border-y"
          style={{ borderColor: `${muted}`, opacity: 1 }}
        >
          {/* 1. Letter CTA */}
          <Link
            href={`/${lang}/consult`}
            className="group relative flex flex-col gap-3 py-12 md:py-16 px-6 md:px-10 transition-colors md:border-e"
            style={{ borderColor: muted, color: text }}
          >
            <span
              className="type-roman"
              style={{ color: "var(--color-zari)", fontSize: "0.76rem" }}
            >
              {isAr ? "01" : "01"}
            </span>
            <span
              className={isAr ? "type-arabic-display" : "type-display"}
              style={{
                fontSize: "clamp(1.6rem, 1.2rem + 1.4vw, 2.2rem)",
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
              style={{ color: "var(--color-zari)", fontSize: "0.95rem" }}
            >
              <span className="block w-8 h-px bg-current group-hover:w-12 transition-all duration-500" />
              <span className="flip-rtl">→</span>
            </span>
          </Link>

          {/* 2. Men's hall phone */}
          <PhoneCta
            number={PHONES.mens}
            lang={lang}
            text={text}
            muted={muted}
            isAr={isAr}
            order="02"
            callPrefix={c.callPrefix}
            withRightBorder
          />

          {/* 3. Women's hall phone */}
          <PhoneCta
            number={PHONES.womens}
            lang={lang}
            text={text}
            muted={muted}
            isAr={isAr}
            order="03"
            callPrefix={c.callPrefix}
          />
        </div>
      </div>
    </section>
  );
}

function PhoneCta({
  number,
  lang,
  text,
  muted,
  isAr,
  order,
  callPrefix,
  withRightBorder = false,
}: {
  number: { tel: string; display: string; label: Record<Lang, string> };
  lang: Lang;
  text: string;
  muted: string;
  isAr: boolean;
  order: string;
  callPrefix: string;
  withRightBorder?: boolean;
}) {
  return (
    <a
      href={`tel:${number.tel}`}
      className={`group relative flex flex-col gap-3 py-12 md:py-16 px-6 md:px-10 transition-colors ${
        withRightBorder ? "md:border-e" : ""
      } border-t md:border-t-0`}
      style={{ borderColor: muted, color: text }}
    >
      <span
        className="type-roman"
        style={{ color: "var(--color-zari)", fontSize: "0.76rem" }}
      >
        {order}
      </span>
      <span
        className={isAr ? "type-arabic-display" : "type-display"}
        style={{
          fontSize: "clamp(1.6rem, 1.2rem + 1.4vw, 2.2rem)",
          color: text,
          lineHeight: isAr ? "1.45" : "1.05",
        }}
      >
        {`${callPrefix} ${number.label[lang]}`}
      </span>
      <span
        className="force-latin"
        style={{
          color: "var(--color-zari)",
          fontSize: "1.05rem",
          letterSpacing: "0.04em",
          fontVariantNumeric: "lining-nums tabular-nums",
          marginTop: "0.4rem",
        }}
      >
        {number.display}
      </span>
    </a>
  );
}
