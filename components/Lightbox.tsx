"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { createPortal } from "react-dom";
import { VIEWING_ROOM } from "@/lib/copy";
import { isRTL, localizedNumeral, type Lang } from "@/lib/i18n";

/**
 * The viewing room — the site's fullscreen lightbox overlay.
 *
 * Design intent: the gallery is treated like a private atelier viewing,
 * not a web carousel. The chrome is therefore minimal — a counter, a
 * close disc, two quiet outline arrows — set against near-black so the
 * photograph itself carries the moment. Entrance/exit motion lives in
 * the `.lb-fade` / `.lb-zoom` classes in globals.css, which already
 * collapse under prefers-reduced-motion; nothing here animates via JS.
 *
 * Direction-awareness: the overlay portals into <body>, which inherits
 * `dir` from <html>, so logical classes (start-/end-) and `.flip-rtl`
 * handle the mirrored Arabic layout without any duplicated markup.
 * Keyboard arrows and swipe gestures are remapped in RTL so that the
 * gesture pointing toward "next" visually always advances.
 */

export type LightboxItem = { src: string; title?: string; meta?: string };

export function Lightbox({
  items,
  index,
  lang,
  onClose,
  onIndex,
}: {
  items: LightboxItem[];
  index: number;
  lang: Lang;
  onClose: () => void;
  onIndex: (i: number) => void;
}): ReactElement | null {
  // Portal target needs the document — wait until mounted on the client
  // (same guard as SiteHeader's mobile drawer).
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const closeRef = useRef<HTMLButtonElement>(null);
  // The element that held focus before the overlay opened — restored on
  // close so keyboard users land back on the thumbnail they activated.
  const restoreRef = useRef<HTMLElement | null>(null);
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  const rtl = isRTL(lang);
  const t = VIEWING_ROOM[lang];
  const count = items.length;

  // Capture the opener BEFORE the close button steals focus. This effect
  // runs on first mount — the portal has not rendered yet at that point,
  // so document.activeElement is still the triggering element.
  useEffect(() => {
    restoreRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    return () => { restoreRef.current?.focus(); };
  }, []);

  // Move focus into the dialog once the portal exists.
  useEffect(() => {
    if (mounted) closeRef.current?.focus();
  }, [mounted]);

  // Lock body scroll while the viewing room is open; restore whatever
  // overflow value was there before (BishtReveal uses the same pattern).
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, []);

  // Keyboard: Escape closes; arrows navigate. In RTL the physical arrow
  // keys are swapped so the key pointing toward "next" always advances.
  useEffect(() => {
    const goNext = () => onIndex((index + 1 + count) % count);
    const goPrev = () => onIndex((index - 1 + count) % count);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (count < 2) return;
      if (e.key === "ArrowRight") (rtl ? goPrev : goNext)();
      if (e.key === "ArrowLeft") (rtl ? goNext : goPrev)();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count, rtl, onClose, onIndex]);

  if (!mounted || count === 0) return null;

  const item = items[index];
  if (!item) return null;

  const goNext = () => onIndex((index + 1 + count) % count);
  const goPrev = () => onIndex((index - 1 + count) % count);

  const onTouchStart = (e: ReactTouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (touch) touchRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (e: ReactTouchEvent<HTMLDivElement>) => {
    const start = touchRef.current;
    touchRef.current = null;
    const touch = e.changedTouches[0];
    if (!start || !touch || count < 2) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    // Ignore taps and vertical-dominant gestures — only a deliberate
    // horizontal swipe (≥ 48px) turns the page.
    if (Math.abs(dx) < 48 || Math.abs(dy) > Math.abs(dx)) return;
    // Swiping the image toward the previous page's position advances;
    // mirrored in RTL so the gesture stays physically consistent.
    const forward = rtl ? dx > 0 : dx < 0;
    if (forward) goNext();
    else goPrev();
  };

  // Quiet round outline arrows — same family as the drawer close disc,
  // but without the gold sweep, so they defer to the photograph.
  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center " +
    "rounded-full border transition-colors duration-[420ms] ease-[var(--ease-ceremonial)] " +
    "hover:bg-[rgba(210,142,41,0.12)]";
  const arrowStyle = {
    borderColor: "rgba(210, 142, 41, 0.55)",
    color: "var(--color-zari)",
  } as const;

  return createPortal(
    <div
      className="lb-fade fixed inset-0 z-[110]"
      role="dialog"
      aria-modal="true"
      aria-label={t.eyebrow}
      style={{ background: "rgba(0, 0, 0, 0.95)" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Image stage — centred, padded clear of the chrome above and below.
            key={index} re-runs the .lb-zoom entrance on every navigation, so
            each photograph arrives with the same quiet settle. */}
      <div className="absolute inset-x-4 top-24 bottom-28 md:inset-x-20">
        <div key={index} className="lb-zoom relative h-full w-full">
          <Image
            fill
            className="object-contain"
            sizes="100vw"
            src={item.src}
            alt={item.title ?? ""}
          />
        </div>
      </div>

      {/* ── Top chrome: counter at the inline start, close disc at the end ── */}
      <div className="absolute inset-x-0 top-0">
        <div className="mx-auto flex max-w-[var(--container-wide)] items-center justify-between px-6 pt-6 md:px-12">
          <span
            className="type-roman text-[0.85rem]"
            style={{ color: "var(--color-mist)" }}
          >
            {localizedNumeral(index + 1, lang)} {t.of} {localizedNumeral(count, lang)}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="drawer-close"
          >
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
              <path
                d="M5 5l10 10M5 15L15 5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Prev / next — only when there is somewhere to go. Logical
            start/end classes flip sides in RTL; .flip-rtl mirrors the
            glyphs so each arrow keeps pointing the way it travels. */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label={t.prev}
            className={`${arrowClass} start-4`}
            style={arrowStyle}
          >
            <span className="flip-rtl text-xl leading-none" aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label={t.next}
            className={`${arrowClass} end-4`}
            style={arrowStyle}
          >
            <span className="flip-rtl text-xl leading-none" aria-hidden="true">→</span>
          </button>
        </>
      )}

      {/* ── Caption — start-aligned, only when the item carries words ── */}
      {(item.title || item.meta) && (
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[var(--container-wide)] px-6 pb-6 text-start md:px-12">
            {item.title && (
              <p
                className={lang === "ar" ? "type-arabic-headline" : "type-display"}
                style={{ color: "var(--color-pearl)", fontSize: "1.25rem" }}
              >
                {item.title}
              </p>
            )}
            {item.meta && (
              <p
                className="type-roman mt-1"
                style={{ color: "var(--color-mist)", fontSize: "0.8rem" }}
              >
                {item.meta}
              </p>
            )}
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}
