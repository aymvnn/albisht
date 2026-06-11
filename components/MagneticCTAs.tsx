"use client";

import { useEffect } from "react";

/**
 * Magnetic attraction for every .btn-brand CTA, site-wide, via event
 * delegation — no existing button needs to change. The pull is applied
 * through the CSS `translate` property (custom props --mag-x/--mag-y,
 * wired in globals.css) so it composes with the button's own hover
 * `transform` lift instead of overwriting it.
 *
 * Desktop-only by nature: requires a fine pointer and no reduced-motion
 * preference. The pull is deliberately small (max 4px) — a hint of
 * gravity, not a toy.
 */
export function MagneticCTAs() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    const MAX_PULL = 4; // px
    let active: HTMLElement | null = null;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      if (!active) return;
      const el = active;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        el.style.setProperty("--mag-x", `${(Math.max(-1, Math.min(1, dx)) * MAX_PULL).toFixed(2)}px`);
        el.style.setProperty("--mag-y", `${(Math.max(-1, Math.min(1, dy)) * MAX_PULL).toFixed(2)}px`);
      });
    };

    const release = () => {
      if (!active) return;
      cancelAnimationFrame(raf);
      active.style.setProperty("--mag-x", "0px");
      active.style.setProperty("--mag-y", "0px");
      active = null;
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest?.(".btn-brand");
      if (target instanceof HTMLElement) {
        if (active && active !== target) release();
        active = target;
      } else if (active && !active.contains(e.target as Node)) {
        release();
      }
    };

    // Release when the pointer leaves the active button for anywhere that
    // is not inside it — including leaving the window (relatedTarget null).
    const onOut = (e: PointerEvent) => {
      if (!active) return;
      const next = e.relatedTarget as Node | null;
      if (!next || !active.contains(next)) release();
    };

    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
      release();
    };
  }, []);

  return null;
}
