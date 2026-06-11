"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Lightbox, type LightboxItem } from "@/components/Lightbox";
import { VIEWING_ROOM } from "@/lib/copy";
import { type Lang, localizedNumeral } from "@/lib/i18n";

/**
 * "The viewing room" — a curated gallery grid that opens the shared Lightbox.
 * The grid keeps a quiet editorial rhythm: most cells are portrait 4:5, every
 * fifth leans taller (3:4) and every third in a row settles square, so the
 * wall reads as a composed hang rather than a uniform contact sheet.
 */
export function ViewingRoom({
  lang,
  items,
  eyebrow,
  title,
}: {
  lang: Lang;
  items: LightboxItem[];
  eyebrow?: string;
  title?: string;
}) {
  const copy = VIEWING_ROOM[lang];
  const eyebrowText = eyebrow ?? copy.eyebrow;
  const titleText = title ?? copy.title;

  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const cells = el.querySelectorAll<HTMLElement>("[data-view]");

    // Reduced motion: reveal everything at once. The global CSS already
    // collapses the transition, but skipping the observer avoids any wait
    // on intersection before the cells become visible.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cells.forEach((c) => c.classList.add("is-visible"));
      return;
    }

    // Same entrance pattern as ActsParallax: observe once, reveal, let go.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cells.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  // Without photographs there is nothing to view — keep the page quiet.
  if (items.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative surface-pearl py-16 md:py-24 border-t border-[color:var(--color-ink-warm)]/15"
    >
      {/* Centred header — same eyebrow + hairlines rhythm as ActsParallax
          and PromiseSection, so this section opens in step with the site. */}
      <div className="mx-auto max-w-[var(--container-text)] px-6 md:px-12 mb-12 md:mb-16">
        <div className="flex justify-center mb-7">
          <div className="flex items-center gap-4">
            <span
              aria-hidden
              className="block h-px bg-[color:var(--color-zari)]"
              style={{ width: "clamp(28px, 4vw, 64px)" }}
            />
            <span className="type-roman text-[0.85rem] text-[color:var(--color-zari)]">
              {eyebrowText}
            </span>
            <span
              aria-hidden
              className="block h-px bg-[color:var(--color-zari)]"
              style={{ width: "clamp(28px, 4vw, 64px)" }}
            />
          </div>
        </div>
        <h2
          className={`${
            lang === "ar" ? "type-arabic-display" : "type-display"
          } text-center text-[color:var(--color-ink)]`}
          style={{
            fontSize: "clamp(2rem, 1.5rem + 2.4vw, 3.5rem)",
            lineHeight: lang === "ar" ? "1.45" : "1.05",
            letterSpacing: lang === "ar" ? "0" : "-0.015em",
          }}
        >
          {titleText}
        </h2>
      </div>

      <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {items.map((item, i) => {
            // Aspect rhythm: a quiet editorial variation across the wall.
            const aspect =
              i % 5 === 0
                ? "aspect-[3/4]"
                : i % 3 === 2
                  ? "aspect-square"
                  : "aspect-[4/5]";

            return (
              <button
                key={item.src}
                type="button"
                data-view
                onClick={() => setOpenIndex(i)}
                aria-label={
                  item.title ?? `${copy.view} ${localizedNumeral(i + 1, lang)}`
                }
                className={`group relative overflow-hidden press-dim block w-full ${aspect} opacity-0 translate-y-6 transition-all duration-1000 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0`}
                style={{
                  transitionTimingFunction: "var(--ease-ceremonial)",
                  // Stagger per column so each row arrives as a gentle wave.
                  transitionDelay: `${(i % 3) * 120}ms`,
                }}
              >
                <Image
                  src={item.src}
                  alt={item.title ?? ""}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                  style={{ transitionTimingFunction: "var(--ease-ceremonial)" }}
                />
                {/* Subtle bottom scrim — keeps the lower edge composed
                    without crushing the photograph. */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 70%, rgba(0,0,0,0.25) 100%)",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox
          items={items}
          index={openIndex}
          lang={lang}
          onClose={() => setOpenIndex(null)}
          onIndex={setOpenIndex}
        />
      )}
    </section>
  );
}
