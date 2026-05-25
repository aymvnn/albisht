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
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (reducedMotion || isTouch) return;
    setEnabled(true);

    const positionAt = (x: number, y: number) => {
      if (!ref.current) return;
      // translate3d for hardware acceleration, then translate(-50%, -50%)
      // to centre the box on the cursor in a single composed transform.
      ref.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const onMove = (e: PointerEvent) => positionAt(e.clientX, e.clientY);

    // Initial — drop the glow off-screen until the first pointermove so it
    // doesn't flash at the centre of the viewport.
    positionAt(-1000, -1000);

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[55] rounded-full"
      style={{
        width: 420,
        height: 420,
        background:
          "radial-gradient(circle, oklch(0.98 0.04 86 / 0.55) 0%, oklch(0.95 0.05 82 / 0.3) 30%, transparent 60%)",
        mixBlendMode: "soft-light",
        willChange: "transform",
      }}
    />
  );
}
