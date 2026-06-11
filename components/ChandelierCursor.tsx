"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The chandelier cursor — a warm glow that sits exactly under the pointer
 * on desktop, casting a soft halo over photos and text.
 * Disabled on touch devices and when the user prefers reduced motion.
 *
 * Implementation note: the centering offset (-50% of its own size) is part of
 * the same transform string we set on every pointermove. This guarantees the
 * div's CENTER lands on the cursor — not its top-left corner. A previous
 * version relied on Tailwind's -translate-x-1/2 class, which was silently
 * overridden by the JS-applied style.transform and caused a perceived offset.
 */
export function ChandelierCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (reducedMotion || isTouch) return;
    setEnabled(true);

    const positionAt = (x: number, y: number) => {
      // translate3d for hardware acceleration, then translate(-50%, -50%)
      // to centre the box on the cursor in a single composed transform.
      const t = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (ref.current) ref.current.style.transform = t;
      if (labelRef.current) labelRef.current.style.transform = t;
    };

    const onMove = (e: PointerEvent) => positionAt(e.clientX, e.clientY);

    // "View" label over gallery items — any element carrying data-view.
    // The label text follows the document language at the moment of hover.
    const setLabelVisible = (visible: boolean) => {
      const el = labelRef.current;
      if (!el) return;
      if (visible) {
        el.textContent = document.documentElement.lang === "ar" ? "عرض" : "View";
      }
      el.style.opacity = visible ? "1" : "0";
      el.style.scale = visible ? "1" : "0.6";
    };
    const onOver = (e: PointerEvent) => {
      const inView = !!(e.target as Element | null)?.closest?.("[data-view]");
      setLabelVisible(inView);
    };

    // Initial — drop the glow off-screen until the first pointermove so it
    // doesn't flash at the centre of the viewport.
    positionAt(-1000, -1000);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ref}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[55] rounded-full print-hide"
        style={{
          width: 420,
          height: 420,
          background:
            "radial-gradient(circle, oklch(0.98 0.04 86 / 0.55) 0%, oklch(0.95 0.05 82 / 0.3) 30%, transparent 60%)",
          mixBlendMode: "soft-light",
          willChange: "transform",
        }}
      />
      {/* The viewing-room cue — a small gold-rimmed disc with the word
          "View"/"عرض", visible only while hovering a [data-view] element.
          Sits above the lightbox trigger but below the lightbox itself. */}
      <div
        ref={labelRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[105] rounded-full flex items-center justify-center print-hide"
        style={{
          width: 76,
          height: 76,
          opacity: 0,
          scale: "0.6",
          background: "rgba(0,0,0,0.55)",
          border: "1px solid rgba(210,142,41,0.85)",
          color: "var(--color-zari-bright)",
          fontFamily: "var(--font-roman)",
          fontSize: "0.8rem",
          letterSpacing: "0.18em",
          willChange: "transform",
          transition:
            "opacity 320ms var(--ease-ceremonial), scale 320ms var(--ease-ceremonial)",
        }}
      />
    </>
  );
}
