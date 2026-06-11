"use client";

/**
 * PackageInclusions — the collapsible inclusion grid for one package tier
 * on /packages.
 *
 * Five full protocols on one page is a long read; most visitors compare
 * tiers by their first few lines, not by every bullet. Each section
 * therefore opens with its first `collapsedCount` bullets and a single
 * ceremonial toggle reveals the rest. The expanded markup is identical to
 * the original server-rendered grid, so swapping this component in changes
 * nothing visually for a tier that is fully open.
 *
 * All motion is CSS-driven (the cc-rise keyframes and a transform
 * transition on the plus glyph), which the global stylesheet already
 * collapses under prefers-reduced-motion — no JS media-query check needed.
 */

import { useState } from "react";
import { type Lang, localizedDigits, localizedNumeral } from "@/lib/i18n";
import { PACKAGES_EXTRAS } from "@/lib/copy";

export function PackageInclusions({
  lang,
  sections,
  labels,
  collapsedCount = 4,
}: {
  lang: Lang;
  sections: { key: string; bullets: string[] }[];
  labels: Record<string, string>;
  collapsedCount?: number;
}) {
  const isAr = lang === "ar";
  const extras = PACKAGES_EXTRAS[lang];
  const [expanded, setExpanded] = useState(false);

  // Bullets hidden across all sections while collapsed. When nothing would
  // be hidden (every section fits within collapsedCount), the toggle is
  // pointless — render the plain grid exactly as the server version did.
  const hiddenTotal = sections.reduce(
    (sum, section) => sum + Math.max(0, section.bullets.length - collapsedCount),
    0
  );
  const hasToggle = hiddenTotal > 0;

  // Collapsed label carries the hidden count so the toggle promises
  // something concrete, with Hindi-Arabic digits on the Arabic page.
  const toggleLabel = expanded
    ? extras.collapse
    : `${extras.fullProtocol} (${localizedNumeral(hiddenTotal, lang)})`;

  return (
    <div>
      {/* === Inclusions grid: five sections, two-column responsive === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {sections.map((section) => {
          const bullets = expanded
            ? section.bullets
            : section.bullets.slice(0, collapsedCount);

          return (
            <div key={section.key}>
              <div
                className="flex items-center gap-3 mb-4 pb-3 border-b"
                style={{ borderColor: "var(--color-ink-warm)", opacity: 0.95 }}
              >
                <span
                  className="type-roman"
                  style={{
                    color: "var(--color-zari)",
                    fontSize: "1rem",
                  }}
                >
                  {labels[section.key]}
                </span>
              </div>
              <ul className="space-y-3">
                {bullets.map((b, j) => {
                  // Bullets beyond the collapsed window only exist after the
                  // toggle opens; they rise in with a small stagger so the
                  // reveal reads as one unhurried gesture, not a jump cut.
                  const isRevealed = expanded && j >= collapsedCount;
                  return (
                    <li
                      key={j}
                      className={`${isAr ? "type-arabic" : "type-serif"} leading-relaxed flex gap-3 items-start${
                        isRevealed ? " cc-rise" : ""
                      }`}
                      style={{
                        color: "var(--color-ink)",
                        fontSize: "1.15rem",
                        ...(isRevealed
                          ? { animationDelay: `${(j - collapsedCount) * 40}ms` }
                          : undefined),
                      }}
                    >
                      <span
                        className="block mt-2 w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: "var(--color-zari)" }}
                      />
                      <span>{localizedDigits(b, lang)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* === Toggle row: hairline — button — hairline, centred === */}
      {hasToggle && (
        <div className="mt-10 flex items-center justify-center gap-4">
          <span
            aria-hidden="true"
            className="block w-10 h-px"
            style={{ background: "var(--color-zari)", opacity: 0.6 }}
          />
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((open) => !open)}
            className="press-dim inline-flex items-center gap-3 py-2"
            style={{ color: "var(--color-zari-deep)" }}
          >
            <span
              className={isAr ? "type-arabic" : "type-roman"}
              style={{ fontSize: isAr ? "0.98rem" : "0.85rem" }}
            >
              {toggleLabel}
            </span>
            {/* Plus glyph: rotates into a multiply sign when open — the same
                quiet gesture the FAQ marker makes. currentColor keeps it on
                the button's deep gold. */}
            <svg
              aria-hidden="true"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              className="shrink-0"
              style={{
                transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
                transition: "transform 420ms var(--ease-ceremonial)",
              }}
            >
              <line x1="6" y1="1" x2="6" y2="11" stroke="currentColor" strokeWidth="1.4" />
              <line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
          <span
            aria-hidden="true"
            className="block w-10 h-px"
            style={{ background: "var(--color-zari)", opacity: 0.6 }}
          />
        </div>
      )}
    </div>
  );
}
