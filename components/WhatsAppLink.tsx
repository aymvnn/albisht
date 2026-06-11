import type { Lang } from "@/lib/i18n";
import { PHONES, waHref } from "@/lib/contact";
import { WHATSAPP_LABEL } from "@/lib/copy";

/**
 * WhatsAppLink — the WhatsApp anchor that sits beside phone numbers
 * site-wide, on both dark and light surfaces.
 *
 * Server-safe by design: no hooks, no events. All hover behaviour is pure
 * CSS (Tailwind hover variants + the ceremonial easing), which also means
 * the global `prefers-reduced-motion` rule collapses the transition for
 * users who ask for stillness — no JS check required.
 *
 * TWO VARIANTS:
 *   • "text" — quiet inline link. Inherits the parent's colour (gold beside
 *     gold numbers, mist in muted rows) and brightens to zari-bright on
 *     hover. Used inside phone rows and dense contact lists.
 *   • "chip" — a thin gold-bordered rectangle shaped like `.btn-brand--sm`
 *     but deliberately NOT using `.btn-brand`: the sweep fill would be too
 *     theatrical next to a phone number. Border and text simply brighten.
 *
 * The number itself is never rendered here — the line's bilingual label
 * lives in the aria-label so screen readers know which atelier line the
 * conversation opens with.
 */

/**
 * Minimal single-stroke WhatsApp glyph: a speech bubble with its tail at
 * the lower left, and a quarter-arc handset inside. Drawn on a 24-unit
 * grid and rendered at 18px so the 1.4 stroke reads as a refined hairline.
 * Outline only — no filled blobs — so it sits at the same visual weight
 * as the site's other hairline ornaments.
 */
function WhatsAppGlyph() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      {/* Bubble: a circle centred on the grid whose lower-left arc opens
          into the tail corner, then closes back onto the circle. */}
      <path d="M4 20.5l1.3-3.4a8.4 8.4 0 1 1 3.2 2.6L4 20.5Z" />
      {/* Handset: a short vertical stem flowing through a quarter arc into
          a horizontal stem — the simplest geometry that still reads as a
          receiver at 18px. */}
      <path d="M9.1 8.7v1.1a5.1 5.1 0 0 0 5.1 5.1h1.1" />
    </svg>
  );
}

export function WhatsAppLink({
  lang,
  line = "mens",
  message,
  label,
  variant = "text",
  className = "",
}: {
  lang: Lang;
  /** Which atelier line the conversation opens with. */
  line?: "mens" | "womens";
  /** Optional prefilled message; falls back to the brand-voice opener. */
  message?: string;
  /** Optional visible label; falls back to the localized "WhatsApp". */
  label?: string;
  variant?: "text" | "chip";
  className?: string;
}) {
  const isAr = lang === "ar";
  const visibleLabel = label ?? WHATSAPP_LABEL[lang];

  // The line's bilingual label travels in the aria-label so assistive tech
  // can tell the two WhatsApp numbers apart when both appear on a page.
  const ariaLabel = `WhatsApp — ${PHONES[line].label[lang]}`;

  // Latin gets the small-caps roman voice; Arabic gets the body face at a
  // slightly larger size, matching how eyebrows scale across languages.
  const typeClass = isAr ? "type-arabic" : "type-roman";
  const fontSize = isAr ? "0.95rem" : "0.82rem";

  const variantClasses =
    variant === "chip"
      ? // Bordered chip: zari at rest, border + text brighten together on
        // hover. min-h guarantees the 44px hit target regardless of how the
        // label's line-height resolves across the two scripts.
        "min-h-[44px] gap-2.5 border border-[rgba(210,142,41,0.55)] px-4 py-2.5 text-[color:var(--color-zari)] hover:border-[rgba(246,182,43,0.85)] hover:text-[color:var(--color-zari-bright)]"
      : // Text link: colour inherits from the parent row (gold or mist);
        // py-2 pads the hit area without disturbing the row's rhythm.
        "gap-2 py-2 hover:text-[color:var(--color-zari-bright)]";

  return (
    <a
      href={waHref(line, lang, message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`inline-flex items-center transition-colors duration-500 ${variantClasses} ${typeClass} ${className}`}
      style={{
        fontSize,
        // Ceremonial easing keeps the brighten unhurried, in step with the
        // rest of the site's hover language.
        transitionTimingFunction: "var(--ease-ceremonial)",
      }}
    >
      <WhatsAppGlyph />
      <span>{visibleLabel}</span>
    </a>
  );
}
