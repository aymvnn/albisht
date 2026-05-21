"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { HERO } from "@/lib/copy";
import type { Lang } from "@/lib/i18n";

export function HomeHero({ lang }: { lang: Lang }) {
  const h = HERO[lang];
  const ref = useRef<HTMLDivElement>(null);

  // Slow parallax on the hero image
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!ref.current) return;
        const y = window.scrollY * 0.18;
        ref.current.style.transform = `translate3d(0, ${y}px, 0) scale(1.08)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative w-full h-[100svh] min-h-[680px] overflow-hidden">
      <div ref={ref} className="absolute inset-0 will-change-transform">
        <Image
          src="/photos/hall/hero-pearl-court.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Warm pearl overlay — vertical: light top, dark bottom for headline scrim */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.951 0.012 82 / 0.04) 0%, oklch(0.951 0.012 82 / 0.0) 28%, oklch(0.135 0.005 60 / 0.22) 58%, oklch(0.135 0.005 60 / 0.72) 100%)",
        }}
      />
      {/* Soft side vignette + subtle scrim under right (RTL) / left (LTR) where headline lives */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 110% 80% at center, transparent 50%, oklch(0.135 0.005 60 / 0.3) 100%)",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-32">
        <div className="mx-auto max-w-[var(--container-wide)] w-full px-6 md:px-12">
          <p
            className="type-roman text-[0.7rem] md:text-[0.75rem] text-[color:var(--color-zari-bright)] mb-6 reveal-up"
            style={{ animationDelay: "0.2s" }}
          >
            {h.eyebrow}
          </p>
          <h1
            className={`${
              lang === "ar" ? "type-arabic-display" : "type-display"
            } text-[color:var(--color-pearl)] reveal-up`}
            style={{
              fontSize: lang === "ar" ? "clamp(3rem, 2rem + 5vw, 6rem)" : "var(--text-h1)",
              animationDelay: "0.5s",
              maxWidth: "20ch",
              lineHeight: lang === "ar" ? "1.3" : "0.95",
              whiteSpace: "pre-line",
            }}
          >
            {h.headline}
          </h1>
          <div
            className="mt-10 flex flex-wrap items-center gap-6 reveal-up"
            style={{ animationDelay: "0.9s" }}
          >
            <p
              className={`${
                lang === "ar" ? "type-arabic" : "type-serif"
              } text-[color:var(--color-pearl)]/85 italic text-lg max-w-md`}
            >
              {h.subline}
            </p>
            <Link
              href={`/${lang}/consult`}
              className="group inline-flex items-center gap-3 type-roman text-[0.72rem] text-[color:var(--color-zari)] hover:text-[color:var(--color-zari-bright)] transition-colors"
            >
              <span className="inline-block w-10 h-px bg-current group-hover:w-16 transition-all duration-500 ease-out" />
              <span>{h.cta}</span>
              <span className="flip-rtl group-hover:translate-x-1 transition-transform duration-500">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 reveal-up" style={{ animationDelay: "1.6s" }}>
        <span className="type-roman text-[0.62rem] tracking-[0.4em] text-[color:var(--color-pearl)]/60">
          {lang === "ar" ? "تابِع" : "Continue"}
        </span>
        <span className="w-px h-12 bg-gradient-to-b from-[color:var(--color-pearl)]/0 via-[color:var(--color-zari)]/60 to-[color:var(--color-pearl)]/0" />
      </div>
    </section>
  );
}
