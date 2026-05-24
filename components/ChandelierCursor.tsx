"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The chandelier cursor — a warm glow follows the pointer on desktop,
 * casting a soft halo that highlights details of photos and text.
 * Disabled on touch devices and when user prefers reduced motion.
 */
export function ChandelierCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (reducedMotion || isTouch) return;
    setEnabled(true);

    // Center the glow exactly on the pointer — no interpolation lag.
    // pointermove fires at high frequency, so transforming directly is smooth.
    const onMove = (e: PointerEvent) => {
      if (ref.current) {
        ref.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    // Initial position — center of viewport until the first pointermove
    if (ref.current) {
      ref.current.style.transform = `translate3d(${window.innerWidth / 2}px, ${
        window.innerHeight / 2
      }px, 0)`;
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[55] -translate-x-1/2 -translate-y-1/2"
      style={{ mixBlendMode: "soft-light" }}
    >
      <div
        className="w-[420px] h-[420px] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, oklch(0.98 0.04 86 / 0.55) 0%, oklch(0.95 0.05 82 / 0.3) 30%, transparent 60%)",
        }}
      />
    </div>
  );
}
