"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { type Lang } from "@/lib/i18n";
import { PHONES, waHref } from "@/lib/contact";
import { STICKY_BAR } from "@/lib/copy";

/**
 * StickyActionBar — a quiet, mobile-only conversion bar fixed to the bottom
 * of the viewport. Three equal actions: call, WhatsApp, consult.
 *
 * Behaviour notes:
 * - Suppressed on the home page (the hero carries its own invitation), and on
 *   /consult and /brochure (the visitor is already inside a conversion flow —
 *   nudging them elsewhere would undercut it).
 * - Hidden until the visitor has scrolled past the first viewport-and-a-half
 *   (scrollY > 480). Someone still reading the opening of a page does not
 *   need a sales bar; someone deep in the content might.
 * - The bar stays mounted at all times and slides in/out with a transform
 *   transition. Reduced motion is respected by the global CSS, which
 *   collapses all transitions for prefers-reduced-motion users — the bar
 *   then simply appears/disappears.
 * - `inert` while hidden keeps the offscreen links out of the tab order and
 *   the accessibility tree, so keyboard users never focus an invisible bar.
 */
export function StickyActionBar({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);

  // rAF-throttled scroll listener (same pattern as SiteHeader): the passive
  // listener only schedules a frame, and the state read/write happens once
  // per frame at most — scroll handlers fire far more often than we paint.
  useEffect(() => {
    let ticking = false;
    const update = () => {
      setShown(window.scrollY > 480);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    // Run once on mount so a restored scroll position (back navigation,
    // anchor deep-link) shows the bar without waiting for a scroll event.
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const suppressed =
    isHome || pathname.includes("/consult") || pathname.includes("/brochure");
  if (suppressed) return null;

  const labels = STICKY_BAR[lang];
  const labelClass = lang === "ar" ? "type-arabic" : "type-roman";
  const labelSize = lang === "ar" ? "0.88rem" : "0.72rem";

  return (
    <div
      className={`print-hide lg:hidden fixed inset-x-0 bottom-0 z-40 safe-bottom bg-[color:var(--color-pearl)] ${
        shown ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
      style={{ transition: "transform 560ms var(--ease-ceremonial)" }}
      inert={!shown}
    >
      {/* Gold gradient hairline — the brand seal along the top edge */}
      <div
        aria-hidden
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #D28E29 30%, #F6B62B 50%, #D28E29 70%, transparent)",
        }}
      />

      <div className="flex items-stretch">
        {/* Call — direct line to the men's hall, where the full atelier lives */}
        <a
          href={`tel:${PHONES.mens.tel}`}
          aria-label={lang === "ar" ? "اتصال بصالة الرجال" : "Call the men's hall"}
          className="press-dim flex-1 min-h-[56px] inline-flex flex-col items-center justify-center gap-1 text-[color:var(--color-ink-soft)]"
        >
          <PhoneGlyph />
          <span className={labelClass} style={{ fontSize: labelSize }}>
            {labels.call}
          </span>
        </a>

        {/* WhatsApp — Qatar's primary enquiry channel, so it reads as the
            primary action of the three (deep zari, centre position) */}
        <a
          href={waHref("mens", lang)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={lang === "ar" ? "مراسلة عبر واتساب" : "Message on WhatsApp"}
          className="press-dim flex-1 min-h-[56px] inline-flex flex-col items-center justify-center gap-1 border-x border-[color:var(--color-ink-warm)]/15 text-[color:var(--color-zari-deep)]"
        >
          <WhatsAppGlyph />
          <span className={labelClass} style={{ fontSize: labelSize }}>
            {labels.whatsapp}
          </span>
        </a>

        {/* Consult — the full letter, for those ready to write */}
        <Link
          href={`/${lang}/consult`}
          aria-label={lang === "ar" ? "طلب الاستشارة" : "Request a consultation"}
          className="press-dim flex-1 min-h-[56px] inline-flex flex-col items-center justify-center gap-1 text-[color:var(--color-ink-soft)]"
        >
          <LetterGlyph />
          <span className={labelClass} style={{ fontSize: labelSize }}>
            {labels.consult}
          </span>
        </Link>
      </div>
    </div>
  );
}

/* === Glyphs ================================================================
 * Hand-drawn minimal outlines, 20px, stroke 1.4, currentColor — they inherit
 * the action's text colour so icon and label always agree. All are decorative
 * (the accessible name lives on the link's aria-label).
 */

const glyphProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/** Telephone handset — single closed outline. */
function PhoneGlyph() {
  return (
    <svg {...glyphProps}>
      <path d="M4.2 3.2h2.1c.42 0 .79.27.9.66l.74 2.5a.95.95 0 0 1-.36 1.04l-1.3.95a10.9 10.9 0 0 0 5.35 5.35l.95-1.3a.95.95 0 0 1 1.04-.36l2.5.74c.39.11.66.48.66.9v2.1a.98.98 0 0 1-1.02.98C8.72 16.32 3.68 11.28 3.22 4.22a.98.98 0 0 1 .98-1.02Z" />
    </svg>
  );
}

/** WhatsApp — speech bubble with tail, small handset swoosh inside. */
function WhatsAppGlyph() {
  return (
    <svg {...glyphProps}>
      {/* Bubble: most of a circle, pulled into a tail at the lower left */}
      <path d="M5.3 14.7A6.6 6.6 0 1 1 10 16.6c-1.2 0-2.35-.32-3.34-.88L3.4 16.6l1.9-1.9Z" />
      {/* Handset hint: an open swoosh through the bubble's centre */}
      <path d="M7.5 6.9l1 1.9-.8.9c.45 1 1.25 1.8 2.25 2.25l.9-.8 1.9 1" />
    </svg>
  );
}

/** Letter — envelope outline with flap. */
function LetterGlyph() {
  return (
    <svg {...glyphProps}>
      <path d="M3.2 5h13.6v10H3.2Z" />
      <path d="M3.5 5.5 10 10.3l6.5-4.8" />
    </svg>
  );
}
