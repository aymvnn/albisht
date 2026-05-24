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
      className="relative py-24 md:py-36 surface-bisht overflow-hidden"
    >
      <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12 mb-16 md:mb-24">
        {/* Off-centre header — eyebrow on one side, big phrase on the other,
            sliced apart by negative space. */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-4">
            <div className="flex items-center gap-4">
              <span className="block w-12 h-px bg-[color:var(--color-zari)]" />
              <span className="type-roman text-[0.78rem] text-[color:var(--color-zari)]">
                {data.label}
              </span>
            </div>
          </div>
          <p
            className={`${
              lang === "ar" ? "type-arabic-display" : "type-display"
            } text-[color:var(--color-pearl)] md:col-span-8`}
            style={{
              fontSize: "clamp(2.4rem, 1.8rem + 3.2vw, 5rem)",
              lineHeight: lang === "ar" ? "1.4" : "1",
            }}
          >
            {lang === "ar"
              ? "ثَلاثُ لَحظاتٍ تَصنَع المَساء."
              : "Three moments shape the evening."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-px gap-y-12 md:gap-y-0">
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
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={item.photo}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 35%, oklch(0.135 0.005 60 / 0.85) 100%)",
                }}
              />
              {/* zari corner mark */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[color:var(--color-zari)]">
                <span className="type-roman text-[0.66rem] tracking-[0.4em] opacity-80">
                  {localizedNumeral(i + 1, lang).padStart(2, "0")}
                </span>
                <span className="type-roman text-[0.6rem] tracking-[0.5em] opacity-50">
                  {item.kicker}
                </span>
              </div>
            </div>

            <div className="relative px-6 py-10 md:py-12 md:px-8 -mt-px">
              <h3
                className={`${
                  lang === "ar"
                    ? "type-arabic-headline text-3xl md:text-4xl"
                    : "type-display text-3xl md:text-4xl"
                } text-[color:var(--color-pearl)] mb-4`}
              >
                {item.title}
              </h3>
              <p
                className={`${
                  lang === "ar" ? "type-arabic" : "type-serif"
                } text-[color:var(--color-mist)] text-base leading-relaxed max-w-sm`}
              >
                {item.line}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
