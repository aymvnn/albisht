"use client";

import { useEffect, useState } from "react";

/**
 * The gold zari embroidery line at the top of the viewport.
 * Embroiders itself as the user scrolls — with micro stitches every 5% of progress.
 */
export function ZariProgress() {
  const [progress, setProgress] = useState(0);
  const [rtl, setRtl] = useState(false); // assume LTR on SSR/first client render

  useEffect(() => {
    // After mount, read the real direction
    setRtl(document.documentElement.dir === "rtl");
  }, []);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop || document.body.scrollTop;
      const total = h.scrollHeight - h.clientHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      setProgress(p);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const stitches = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] pointer-events-none h-[3px]">
      <div
        className="relative h-full transition-transform duration-200 ease-out"
        style={{
          transform: `scaleX(${progress})`,
          transformOrigin: rtl ? "right" : "left",
        }}
      >
        <div className="absolute inset-0 zari-line-thick opacity-90" />
        {stitches.map((s) => (
          <span
            key={s}
            className="absolute top-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-[color:var(--color-zari-bright)]"
            style={{ left: `${s}%` }}
          />
        ))}
      </div>
    </div>
  );
}
