import type { Lang } from "@/lib/i18n";

/**
 * Editorial pull-quote — a massive italic phrase set apart from the body
 * with a hanging zari-gold hairline rule. EB Garamond italic + brand-gold.
 *
 * Used between chapters in long-reads (Heritage, Journal) to punctuate the
 * narrative with a quotable moment. One pull-quote per ~3 chapters maximum
 * — overuse kills the impact.
 *
 * The Arabic variant uses Markazi Text italic (where supported) and a
 * tighter line-height since Arabic glyphs ride higher.
 */
export function PullQuote({
  text,
  attribution,
  lang,
}: {
  text: string;
  attribution?: string;
  lang: Lang;
}) {
  const isAr = lang === "ar";
  return (
    <figure className="my-32 md:my-44 mx-auto max-w-[var(--container-text)] px-6 md:px-12">
      <span
        aria-hidden="true"
        className="block w-24 h-px mb-12 bg-gradient-to-r from-transparent via-[color:var(--color-zari)] to-transparent"
      />
      <blockquote
        className={`pull-quote text-[color:var(--color-zari)]`}
        style={{
          fontSize: "clamp(2rem, 1.5rem + 2.6vw, 3.75rem)",
          fontFamily: isAr ? "var(--font-arabic)" : "var(--font-display)",
          lineHeight: isAr ? "1.5" : "1.05",
        }}
      >
        {isAr ? (
          // In Arabic, italic isn't applied (no italic in classical Naskh) — instead
          // rely on the gold colour + display weight + opening Diwani-style quote mark
          <span>
            <span className="opacity-40 text-[0.7em] align-top" style={{ marginInlineEnd: "0.1em" }}>«</span>
            {text}
            <span className="opacity-40 text-[0.7em] align-top" style={{ marginInlineStart: "0.1em" }}>»</span>
          </span>
        ) : (
          <span>
            <span className="opacity-40" style={{ marginInlineEnd: "0.05em" }}>“</span>
            <em>{text}</em>
            <span className="opacity-40" style={{ marginInlineStart: "0.05em" }}>”</span>
          </span>
        )}
      </blockquote>
      {attribution && (
        <figcaption className="type-roman text-[0.7rem] text-[color:var(--color-ink-warm)] mt-8">
          — {attribution}
        </figcaption>
      )}
    </figure>
  );
}
