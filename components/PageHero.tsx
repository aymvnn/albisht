import type { Lang } from "@/lib/i18n";

/**
 * Shared page hero — used on every inner page so the site has one
 * consistent opening rhythm. Pattern is intentionally the same as
 * PromiseSection's centred eyebrow + hairlines, so the visitor
 * recognises the brand voice as soon as a new route loads.
 *
 *   [gold hairline]  EYEBROW LABEL  [gold hairline]
 *
 *               TITLE (Thuluth on AR, Display on Latin)
 *
 *           Optional one-paragraph intro, centred.
 *
 * Light surface only (surface-pearl). Reserve dark surfaces for
 * the SiteFooter and the BishtReveal — the alternating dark/light
 * per page or per section "strobed" the eye and made the layout
 * feel rommelig.
 */

export function PageHero({
  lang,
  eyebrow,
  title,
  intro,
  size = "default",
}: {
  lang: Lang;
  eyebrow: string;
  /** The h1 content. Single line ideally; long titles wrap via maxWidth. */
  title: React.ReactNode;
  /** Optional one-paragraph intro under the title. */
  intro?: React.ReactNode;
  /** "default" = standard hero. "compact" = thinner for shorter pages. */
  size?: "default" | "compact";
}) {
  const isAr = lang === "ar";
  const padY =
    size === "compact"
      ? "pt-24 pb-12 md:pt-28 md:pb-16"
      : "pt-28 pb-14 md:pt-32 md:pb-20";

  return (
    <section className={`relative surface-pearl ${padY}`}>
      <div className="mx-auto max-w-[var(--container-text)] px-6 md:px-12">
        {/* Centred eyebrow with hairlines on both sides */}
        <div className="flex justify-center mb-7 md:mb-10">
          <div className="flex items-center gap-4">
            <span
              aria-hidden
              className="block h-px bg-[color:var(--color-zari)]"
              style={{ width: "clamp(28px, 4vw, 64px)" }}
            />
            <span className="type-roman text-[0.85rem] text-[color:var(--color-zari)]">
              {eyebrow}
            </span>
            <span
              aria-hidden
              className="block h-px bg-[color:var(--color-zari)]"
              style={{ width: "clamp(28px, 4vw, 64px)" }}
            />
          </div>
        </div>

        {/* Title — centred, Thuluth on AR */}
        <h1
          className={`${
            isAr ? "type-arabic-display" : "type-display"
          } text-center text-[color:var(--color-ink)]`}
          style={{
            fontSize: isAr
              ? "clamp(2.5rem, 1.8rem + 3.2vw, 5.5rem)"
              : "clamp(2.75rem, 2rem + 4vw, 6rem)",
            lineHeight: isAr ? "1.45" : "1.02",
            letterSpacing: isAr ? "0" : "-0.015em",
          }}
        >
          {title}
        </h1>

        {/* Intro — centred, quiet weight, breathing room */}
        {intro && (
          <p
            className={`${
              isAr ? "type-arabic" : "type-serif"
            } mx-auto text-center text-[color:var(--color-ink-warm)] italic leading-relaxed mt-6 md:mt-10`}
            style={{
              maxWidth: "44ch",
              fontSize: isAr
                ? "clamp(1.05rem, 0.95rem + 0.4vw, 1.25rem)"
                : "clamp(1.05rem, 0.95rem + 0.4vw, 1.25rem)",
              lineHeight: isAr ? "1.85" : "1.55",
            }}
          >
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
