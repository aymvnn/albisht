import type { ReactNode } from "react";
import { type Lang, localizedNumeral, localizedDigits } from "@/lib/i18n";
import { FAQ } from "@/lib/copy";
import { faqJsonLd } from "@/lib/seo";

/**
 * FaqSection — a ceremonial FAQ accordion built on native <details>/<summary>.
 *
 * Server component on purpose: the disclosure behaviour is native, the
 * open/close animation lives in globals.css (.faq-item::details-content with
 * a reduced-motion fallback), and the exclusive-accordion behaviour comes
 * from the shared name attribute — no JavaScript needed at all.
 *
 * Numbered rows echo the Terms list on the atelier page: a small roman
 * ordinal in zari, the question in the reading face, a hairline between rows.
 */

/**
 * Answers may carry a Qatari phone number. Inside RTL text a raw "+974 ..."
 * renders in the wrong visual order, so each match is isolated in its own
 * LTR span (unicode-bidi: isolate) while still showing localized digits.
 * Splitting on a capturing group keeps matches at the odd indices.
 */
const PHONE_PATTERN = /(\+974[\d ]+\d)/g;

function renderAnswer(text: string, lang: Lang): ReactNode[] {
  return text.split(PHONE_PATTERN).map((part, i) =>
    i % 2 === 1 ? (
      <span
        key={i}
        dir="ltr"
        style={{
          unicodeBidi: "isolate",
          fontVariantNumeric: "lining-nums tabular-nums",
        }}
      >
        {localizedDigits(part, lang)}
      </span>
    ) : (
      // Plain text segments still pass through localizedDigits so any other
      // numerals (day counts, guest counts) match the page's numeral system.
      localizedDigits(part, lang)
    )
  );
}

export function FaqSection({
  lang,
  surface = "pearl",
}: {
  lang: Lang;
  surface?: "pearl" | "marble";
}) {
  const c = FAQ[lang];

  return (
    <section
      className={`${
        surface === "marble" ? "surface-marble" : "surface-pearl"
      } py-20 md:py-28 border-t border-[color:var(--color-ink-warm)]/15`}
    >
      <div className="mx-auto max-w-[var(--container-text)] px-6 md:px-12">
        {/* Centered eyebrow — the established hairline / label / hairline row */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span
            aria-hidden="true"
            className="block w-12 h-px bg-[color:var(--color-zari)]"
          />
          <span className="type-roman text-[0.85rem] text-[color:var(--color-zari)]">
            {c.eyebrow}
          </span>
          <span
            aria-hidden="true"
            className="block w-12 h-px bg-[color:var(--color-zari)]"
          />
        </div>

        <h2
          className={`${
            lang === "ar" ? "type-arabic-display" : "type-display"
          } text-center mb-12 md:mb-16`}
          style={{
            fontSize: "clamp(2rem, 1.5rem + 2vw, 3.25rem)",
            color: "var(--color-ink)",
          }}
        >
          {c.title}
        </h2>

        <div>
          {c.items.map((item, i) => (
            // The shared name makes the accordion exclusive — opening one
            // question lets the previous one close, keeping the page calm.
            <details key={i} className="faq-item" name="albisht-faq">
              <summary className="faq-q">
                <span className="faq-num">
                  {lang === "ar"
                    ? localizedNumeral(i + 1, lang).padStart(2, "٠")
                    : String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={lang === "ar" ? "type-arabic-headline" : "type-serif"}
                  style={{
                    fontWeight: 500,
                    fontSize: "clamp(1.15rem, 1rem + 0.5vw, 1.4rem)",
                  }}
                >
                  {item.q}
                </span>
                {/* Plus glyph; globals.css rotates it 45° into a close mark */}
                <span className="faq-marker" aria-hidden="true">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" />
                    <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" />
                  </svg>
                </span>
              </summary>
              <div
                className={`faq-a ${
                  lang === "ar" ? "type-arabic" : "type-serif"
                } leading-relaxed`}
                style={{ fontSize: "1.05rem" }}
              >
                {renderAnswer(item.a, lang)}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* FAQPage structured data — questions and answers as plain strings */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(lang)) }}
      />
    </section>
  );
}
