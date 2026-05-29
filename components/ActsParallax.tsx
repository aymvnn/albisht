"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ACTS } from "@/lib/copy";
import { type Lang, localizedNumeral } from "@/lib/i18n";

/**
 * "The evening in three acts" — horizontal parallax tryptiek.
 * Three full-height panels that scroll past with subtle parallax inside each photo.
 */
export function ActsParallax({ lang }: { lang: Lang }) {
  const data = ACTS[lang];
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-card]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 surface-pearl overflow-hidden border-t border-[color:var(--color-ink-warm)]/15"
    >
      {/* Centred header — same eyebrow + hairlines rhythm as PageHero and
          PromiseSection, so the section opens in sync with the rest of
          the site. */}
      <div className="mx-auto max-w-[var(--container-text)] px-6 md:px-12 mb-14 md:mb-20">
        <div className="flex justify-center mb-7">
          <div className="flex items-center gap-4">
            <span
              aria-hidden
              className="block h-px bg-[color:var(--color-zari)]"
              style={{ width: "clamp(28px, 4vw, 64px)" }}
            />
            <span className="type-roman text-[0.85rem] text-[color:var(--color-zari)]">
              {data.label}
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
            fontSize: lang === "ar"
              ? "clamp(2.2rem, 1.6rem + 2.8vw, 4.25rem)"
              : "clamp(2.25rem, 1.7rem + 2.8vw, 4.5rem)",
            lineHeight: lang === "ar" ? "1.45" : "1.05",
            letterSpacing: lang === "ar" ? "0" : "-0.015em",
          }}
        >
          {lang === "ar"
            ? "ثَلاثُ لَحظاتٍ تَصنَع المَساء."
            : "Three moments shape the evening."}
        </h2>
      </div>

      <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {data.items.map((item, i) => (
            <article
              key={i}
              data-card
              className="group relative flex flex-col opacity-0 translate-y-8 transition-all duration-1000 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0"
              style={{
                transitionTimingFunction: "var(--ease-ceremonial)",
                transitionDelay: `${i * 0.18}s`,
              }}
            >
              {/* Photo card — clean image with only a thin top-band scrim
                  (12% opacity) so the gold corner mark stays legible.
                  The bottom of the photo is no longer crushed under an
                  85%-opacity dark gradient; the photograph reads. */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={item.photo}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-24 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0) 100%)",
                  }}
                />
                {/* zari corner mark — sits on the top scrim, readable */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[color:var(--color-zari-bright)]">
                  <span className="type-roman text-[0.86rem] tracking-[0.35em]">
                    {localizedNumeral(i + 1, lang).padStart(2, lang === "ar" ? "٠" : "0")}
                  </span>
                  <span className="type-roman text-[0.82rem] tracking-[0.4em]">
                    {item.kicker}
                  </span>
                </div>
              </div>

              {/* Caption block under each photo, on light surface, ink text */}
              <div className="relative py-8 md:py-10">
                <h3
                  className={`${
                    lang === "ar"
                      ? "type-arabic-headline text-2xl md:text-3xl"
                      : "type-display text-2xl md:text-3xl"
                  } text-[color:var(--color-ink)] mb-3`}
                >
                  {item.title}
                </h3>
                <p
                  className={`${
                    lang === "ar" ? "type-arabic" : "type-serif"
                  } text-[color:var(--color-ink-warm)] text-lg leading-relaxed max-w-sm`}
                >
                  {item.line}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
