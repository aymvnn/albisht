import Link from "next/link";
import Image from "next/image";
import { type Lang, localizedDigits } from "@/lib/i18n";
import { getGlobals } from "@/lib/content/globals";
import { SilkRibbon } from "./SilkRibbon";
import { WhatsAppLink } from "./WhatsAppLink";

/**
 * ContactCallout — the ceremonial closing block.
 *
 * COMPOSITION (back-to-front):
 *   • Ink-bisht surface
 *   • Calligraphic ALBISHT mark watermark (4% opacity) behind the title
 *   • Warm radial glow centered on the title
 *   • Gold gradient hairline + silk-ribbon flourish at the top edge
 *
 * TWO DOORS (equal weight):
 *   1. The letter → /consult — gold-bordered CTA with a sweep-fill hover
 *   2. By phone — both numbers stacked, each with a gold underline that
 *      draws on hover and a small gold dot that fades in
 *
 * ANIMATIONS:
 *   • Each block uses the global `.cc-rise` CSS animation (defined in
 *     globals.css). Per-element `animation-delay` inline styles stagger
 *     the entrance.
 *   • All hover micro-animations are pure CSS (defined in globals.css under
 *     .cc-letter-cta / .cc-phone-line / .cc-phone-dot / .cc-door)
 */
export async function ContactCallout({
  lang,
  variant = "dark",
}: {
  lang: Lang;
  variant?: "dark" | "light" | "inline";
}) {
  const g = await getGlobals(lang);
  const c = g.callout;
  const isAr = lang === "ar";
  const isDark = variant === "dark";
  const isInline = variant === "inline";

  const text = isDark ? "var(--color-pearl)" : "var(--color-ink)";
  // Brighter muted on dark surfaces — pure --color-mist (oklch 0.74) reads
  // too quietly against the ink-bisht ground when the copy is small or
  // italic. A warm cream at 82% opacity holds presence without shouting.
  const muted = isDark
    ? "rgba(245, 240, 230, 0.82)"
    : "var(--color-ink-warm)";
  const surface =
    variant === "dark"
      ? "surface-bisht"
      : variant === "light"
      ? "surface-pearl"
      : "";

  return (
    <section
      className={`contact-callout relative overflow-hidden ${
        isInline ? "py-14 md:py-20" : "pt-20 pb-20 md:pt-28 md:pb-24"
      } ${surface}`}
    >
      {/* ---------- DECORATIVE LAYERS ---------- */}
      {isDark && (
        <>
          {/* Gold gradient hairline at the very top edge */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px z-10"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #D28E29 28%, #F6B62B 50%, #D28E29 72%, transparent 100%)",
              opacity: 0.9,
            }}
          />

          {/* Silk-ribbon flourish tucked under the hairline */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-20 md:h-24 overflow-hidden pointer-events-none"
            style={{ opacity: 0.35 }}
          >
            <SilkRibbon
              variant="horizontal"
              intensity="subtle"
              className="absolute -top-6 inset-x-0 w-full h-32 md:h-40"
            />
          </div>

          {/* Calligraphic mark watermark behind the title — anchors the
              block in the brand identity without adding noise. */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-36 md:top-44 flex justify-center pointer-events-none"
            style={{ opacity: 0.045 }}
          >
            <Image
              src="/logo-light.png"
              alt=""
              width={1200}
              height={660}
              priority={false}
              className="max-w-[760px] w-[80vw] h-auto"
            />
          </div>

          {/* Warm radial glow for depth */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 45% at 50% 28%, rgba(226,159,41,0.10) 0%, transparent 70%)",
            }}
          />
        </>
      )}

      {/* ---------- CONTENT ---------- */}
      <div className="relative z-20 mx-auto max-w-[var(--container-wide)] px-6 md:px-12">
        {/* Eyebrow with hairlines */}
        <div
          className="cc-rise flex justify-center mb-7 md:mb-10"
          style={{ animationDelay: "0ms" }}
        >
          <div className="flex items-center gap-4">
            <span
              aria-hidden
              className="block h-px bg-[color:var(--color-zari)]"
              style={{ width: "clamp(28px, 4vw, 64px)" }}
            />
            <span className="type-roman text-[0.85rem] text-[color:var(--color-zari)]">
              {c.eyebrow}
            </span>
            <span
              aria-hidden
              className="block h-px bg-[color:var(--color-zari)]"
              style={{ width: "clamp(28px, 4vw, 64px)" }}
            />
          </div>
        </div>

        {/* Centred Thuluth title */}
        <h2
          className={`cc-rise ${
            isAr ? "type-arabic-display" : "type-display"
          } text-center mx-auto`}
          style={{
            fontSize: isAr
              ? "clamp(2.6rem, 1.9rem + 3.2vw, 5.25rem)"
              : "clamp(2.5rem, 1.9rem + 3vw, 5rem)",
            lineHeight: isAr ? "1.4" : "1.02",
            letterSpacing: isAr ? "0" : "-0.015em",
            color: text,
            maxWidth: "20ch",
            animationDelay: "120ms",
          }}
        >
          {c.title}
        </h2>

        {/* Intro */}
        <p
          className={`cc-rise ${
            isAr ? "type-arabic" : "type-serif"
          } mx-auto text-center italic leading-relaxed mt-6 md:mt-8`}
          style={{
            color: muted,
            maxWidth: "46ch",
            fontSize: "clamp(1.05rem, 0.95rem + 0.4vw, 1.2rem)",
            lineHeight: isAr ? "1.85" : "1.55",
            animationDelay: "240ms",
          }}
        >
          {c.intro}
        </p>

        {/* Mid ornament: dot · gold rule · dot */}
        <div
          className="cc-rise flex justify-center mt-10 md:mt-14 mb-8 md:mb-12"
          style={{ animationDelay: "380ms" }}
        >
          <Ornament />
        </div>

        {/* ---------- TWO DOORS ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 relative">
          {/* Vertical gold hairline between the doors (desktop) */}
          <div
            aria-hidden
            className="hidden md:block absolute top-2 bottom-2 start-1/2 -translate-x-1/2 w-px pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, var(--color-zari) 22%, var(--color-zari) 78%, transparent 100%)",
              opacity: 0.5,
            }}
          />
          {/* Stitch centred on the divider */}
          <div
            aria-hidden
            className="hidden md:block absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <span
              className="block w-1 h-1 rounded-full"
              style={{ background: "var(--color-zari)" }}
            />
          </div>

          {/* DOOR 1 — THE LETTER */}
          <Door
            kind="letter"
            href={`/${lang}/consult`}
            title={c.letter}
            description={c.letterDesc}
            actionLabel={c.letterAction}
            text={text}
            muted={muted}
            isAr={isAr}
            animationDelay="500ms"
          />

          {/* DOOR 2 — BY PHONE */}
          <Door
            kind="phone"
            title={c.callTitle}
            description={c.callDesc}
            text={text}
            muted={muted}
            isAr={isAr}
            animationDelay="600ms"
            phones={[
              {
                key: "mens",
                role: isAr ? "صالة الرجال" : "Men's atelier",
                note: g.phones.mens.note,
                display: g.phones.mens.display,
                tel: g.phones.mens.tel,
                primary: true,
              },
              {
                key: "womens",
                role: isAr ? "صالة السيدات" : "Women's atelier",
                note: g.phones.womens.note,
                display: g.phones.womens.display,
                tel: g.phones.womens.tel,
                primary: false,
              },
            ]}
          />
        </div>

        {/* Bottom ornament */}
        <div
          className="cc-rise flex justify-center mt-12 md:mt-16"
          style={{ animationDelay: "780ms" }}
        >
          <Ornament />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function Ornament() {
  return (
    <div
      aria-hidden
      className="flex items-center gap-3"
      style={{ color: "var(--color-zari)", opacity: 0.85 }}
    >
      <span
        className="block w-1.5 h-1.5 rounded-full"
        style={{ background: "currentColor" }}
      />
      <span
        className="block h-px"
        style={{
          width: "clamp(56px, 9vw, 120px)",
          background:
            "linear-gradient(90deg, transparent 0%, currentColor 30%, currentColor 70%, transparent 100%)",
        }}
      />
      <span
        className="block w-1.5 h-1.5 rounded-full"
        style={{ background: "currentColor" }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */

type DoorPhone = {
  key: string;
  role: string;
  note: string;
  display: string;
  tel: string;
  primary: boolean;
};

function Door(props: {
  kind: "letter" | "phone";
  title: string;
  description: string;
  text: string;
  muted: string;
  isAr: boolean;
  animationDelay: string;
  /* letter only */
  href?: string;
  actionLabel?: string;
  /* phone only */
  phones?: DoorPhone[];
}) {
  const { kind, title, description, text, muted, isAr, animationDelay } = props;
  const lang: Lang = isAr ? "ar" : "en";

  return (
    <div
      className="cc-door cc-rise text-center px-2 md:px-10 py-4 md:py-6"
      style={{ animationDelay }}
    >
      <h3
        className={isAr ? "type-arabic-display" : "type-display"}
        style={{
          fontSize: isAr
            ? "clamp(2rem, 1.5rem + 2vw, 3.5rem)"
            : "clamp(2rem, 1.5rem + 2vw, 3.5rem)",
          color: text,
          lineHeight: isAr ? "1.45" : "1.05",
          letterSpacing: isAr ? "0" : "-0.01em",
          marginBottom: "0.6em",
        }}
      >
        {title}
      </h3>
      <p
        className={`${isAr ? "type-arabic" : "type-serif"} italic mx-auto`}
        style={{
          color: muted,
          fontSize: "clamp(1rem, 0.92rem + 0.3vw, 1.1rem)",
          lineHeight: isAr ? "1.85" : "1.6",
          maxWidth: "32ch",
        }}
      >
        {description}
      </p>

      {kind === "letter" && props.href && props.actionLabel && (
        <Link
          href={props.href}
          className="btn-brand inline-flex items-center gap-4 mt-8 md:mt-10 border"
        >
          <span>{props.actionLabel}</span>
          <span className="btn-brand-arrow flip-rtl">→</span>
        </Link>
      )}

      {kind === "phone" && props.phones && (
        <ul className="mt-8 md:mt-10 flex flex-col items-center gap-y-6 md:gap-y-7">
          {props.phones.map((p, i) => (
            <li
              key={p.key}
              className="flex flex-col items-center gap-1.5"
              style={{
                paddingTop: i > 0 ? "1.2rem" : 0,
                borderTop:
                  i > 0
                    ? "1px solid rgba(210, 142, 41, 0.22)"
                    : "none",
                width: "min(100%, 28rem)",
              }}
            >
              <span
                className={`${isAr ? "type-arabic" : "type-roman"}`}
                style={{
                  fontSize: isAr ? "1rem" : "0.85rem",
                  letterSpacing: isAr ? "0" : "0.22em",
                  color: muted,
                  textTransform: isAr ? "none" : "uppercase",
                }}
              >
                {p.role}
              </span>
              <a
                href={`tel:${p.tel}`}
                className="cc-phone-line"
                dir="ltr"
                style={{
                  fontFamily: isAr ? "var(--font-arabic)" : "var(--font-roman)",
                  fontSize: p.primary
                    ? "clamp(1.6rem, 1.1rem + 1.6vw, 2.35rem)"
                    : "clamp(1.3rem, 1rem + 0.9vw, 1.7rem)",
                  color: "var(--color-zari)",
                  letterSpacing: "0.05em",
                  fontVariantNumeric: "lining-nums tabular-nums",
                  fontWeight: p.primary ? 500 : 400,
                  unicodeBidi: "isolate",
                }}
              >
                <span>{localizedDigits(p.display, lang)}</span>
                <span aria-hidden className="cc-phone-dot" />
              </a>
              <WhatsAppLink
                lang={lang}
                line={p.key === "womens" ? "womens" : "mens"}
                variant="text"
                className="text-[color:var(--color-zari)]/80"
              />
              {p.note && (
                <span
                  className={`${isAr ? "type-arabic" : "type-serif"} italic`}
                  style={{
                    color: muted,
                    fontSize: isAr ? "1.05rem" : "0.95rem",
                    marginTop: "0.3rem",
                    lineHeight: isAr ? "1.7" : "1.5",
                  }}
                >
                  {p.note}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
