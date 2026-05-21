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

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    loop();
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
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
