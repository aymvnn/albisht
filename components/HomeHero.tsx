"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { HERO } from "@/lib/copy";
import type { Lang } from "@/lib/i18n";
import { FormatHeadline } from "./FormatHeadline";

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

      {/* Vertical scrim — light at the top, deeply dark across the entire
          bottom 30% of the hero. The bottom is reliably opaque-black-ish
          regardless of what the photograph shows underneath, so the
          gradient never visibly "stops" on a light patch of the photo
          (olive tree, marquetry doors, floor highlights all get fully
          suppressed). The fade is continuous from 25% to 100%, no flat
          plateaus where a seam can appear. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0.18) 42%, rgba(0,0,0,0.45) 58%, rgba(0,0,0,0.72) 72%, rgba(0,0,0,0.88) 85%, rgba(0,0,0,0.96) 100%)",
        }}
      />
      {/* Cinematic side vignette — wraps the corners gently */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 125% 95% at center, transparent 58%, rgba(0,0,0,0.40) 100%)",
        }}
      />
      {/* Content-zone soft halo — adds a gentle extra darken under the
          headline area without creating a visible "spotlight" edge.
          Widened to 130% × 75% with a fade out at 95% so the falloff is
          imperceptibly gradual; no hard seam between this patch and the
          surrounding linear scrim. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 130% 75% at 50% 95%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0) 95%)",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-32">
        <div className="mx-auto max-w-[var(--container-wide)] w-full px-6 md:px-12">
          <p
            className="type-roman text-[0.95rem] md:text-[1rem] text-[color:var(--color-zari-bright)] mb-6 reveal-up"
            style={{
              animationDelay: "0.2s",
              textShadow: "0 1px 8px rgba(0,0,0,0.55), 0 0 24px rgba(0,0,0,0.35)",
            }}
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
              // Layered text-shadow: a fine tight shadow + a softer wide
              // shadow. The first sharpens each letter against the photo;
              // the second adds a halo of darkness so even light areas
              // behind the text don't bleed through. The combination is
              // imperceptible at full luminance but rescues legibility
              // wherever the photo behind the text is light.
              textShadow:
                "0 1px 2px rgba(0,0,0,0.55), 0 2px 14px rgba(0,0,0,0.65), 0 0 40px rgba(0,0,0,0.45)",
            }}
          >
            <FormatHeadline text={h.headline} />
          </h1>
          <div
            className="mt-10 flex flex-wrap items-center gap-6 reveal-up"
            style={{ animationDelay: "0.9s" }}
          >
            <p
              className={`${
                lang === "ar" ? "type-arabic" : "type-serif"
              } text-[color:var(--color-pearl)]/90 italic text-xl md:text-2xl max-w-md`}
              style={{
                textShadow:
                  "0 1px 3px rgba(0,0,0,0.55), 0 0 18px rgba(0,0,0,0.45)",
              }}
            >
              {h.subline}
            </p>
            <Link
              href={`/${lang}/consult`}
              className="btn-brand inline-flex items-center gap-4 border"
            >
              <span>{h.cta}</span>
              <span className="btn-brand-arrow flip-rtl">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 reveal-up" style={{ animationDelay: "1.6s" }}>
        <span className="type-roman text-[0.85rem] tracking-[0.35em] text-[color:var(--color-pearl)]/75">
          {lang === "ar" ? "تابِع" : "Continue"}
        </span>
        <span className="w-px h-12 bg-gradient-to-b from-[color:var(--color-pearl)]/0 via-[color:var(--color-zari)]/60 to-[color:var(--color-pearl)]/0" />
      </div>
    </section>
  );
}
