"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { CELEBRATIONS } from "@/lib/copy";
import { type Lang } from "@/lib/i18n";
import { FormatHeadline } from "./FormatHeadline";

export function CelebrationsTimeline({
  lang,
  showHeader = true,
  content,
}: {
  lang: Lang;
  /** When true (default), render the inline eyebrow + headline + intro at
   * the top of the timeline. Set to false when the parent page already
   * provides a PageHero so the page doesn't show two stacked titles. */
  showHeader?: boolean;
  content?: {
    label: string;
    title: string;
    intro: string;
    items: { title: string; when: string; where: string; guests: string; note: string; photo: string }[];
  };
}) {
  const data = content ?? CELEBRATIONS[lang];
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-row]");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.2 }
    );
    items.forEach((i) => obs.observe(i));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className={`relative surface-pearl ${showHeader ? "py-24 md:py-36" : "py-16 md:py-20 border-t border-[color:var(--color-ink-warm)]/15"}`}>
      <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12">
        {showHeader && (
          /* Inline header for the homepage version — centered eyebrow with
             hairlines, then centered title, then optional intro. Matches the
             site-wide PageHero rhythm so the visitor sees the same opening
             pattern whether the section is inline on home or top-of-page. */
          <div className="mb-16 md:mb-20">
            <div className="flex justify-center mb-7">
              <div className="flex items-center gap-4">
                <span aria-hidden className="block h-px bg-[color:var(--color-zari)]" style={{ width: "clamp(28px, 4vw, 64px)" }} />
                <span className="type-roman text-[0.85rem] text-[color:var(--color-zari)]">
                  {data.label}
                </span>
                <span aria-hidden className="block h-px bg-[color:var(--color-zari)]" style={{ width: "clamp(28px, 4vw, 64px)" }} />
              </div>
            </div>
            <h2
              className={`${
                lang === "ar" ? "type-arabic-display" : "type-display"
              } text-center text-[color:var(--color-ink)]`}
              style={{
                fontSize: lang === "ar"
                  ? "clamp(2.2rem, 1.6rem + 2.8vw, 4.5rem)"
                  : "clamp(2.4rem, 1.8rem + 3vw, 5rem)",
                lineHeight: lang === "ar" ? "1.45" : "1.05",
                letterSpacing: lang === "ar" ? "0" : "-0.015em",
              }}
            >
              {data.title}
            </h2>
            <p
              className={`${
                lang === "ar" ? "type-arabic" : "type-serif"
              } mx-auto text-center text-[color:var(--color-ink-warm)] italic leading-relaxed mt-8 md:mt-10`}
              style={{ maxWidth: "42ch", fontSize: "1.125rem" }}
            >
              {data.intro}
            </p>
          </div>
        )}

        <ul className="space-y-24 md:space-y-32">
          {data.items.map((it, i) => {
            const cardOnEnd = i % 2 === 0; // alternate which side the card overlaps from
            const isAr = lang === "ar";
            return (
              <li
                key={i}
                data-row
                className="relative opacity-0 translate-y-10 transition-all duration-[1400ms] [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0"
                style={{
                  transitionTimingFunction: "var(--ease-ceremonial)",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div className="relative md:grid md:grid-cols-12 md:items-center">
                  {/* Photo — fills ~70% width, sits behind the card */}
                  <div
                    className={`group/photo relative ${
                      cardOnEnd
                        ? "md:col-span-9 md:col-start-1"
                        : "md:col-span-9 md:col-start-4"
                    }`}
                  >
                    <div className="relative aspect-[16/10] md:aspect-[3/2] overflow-hidden">
                      <Image
                        src={it.photo}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 70vw"
                        className="object-cover transition-transform duration-[3000ms] ease-out group-hover/photo:scale-105"
                      />
                    </div>
                  </div>

                  {/* Overlapping card — desktop: absolutely positioned to
                      overlap the photo's edge by ~12%. Mobile: stacks
                      naturally underneath the photo (no overlap, full width
                      with negative top-margin for slight tuck). */}
                  <div
                    className={`relative md:absolute md:top-1/2 md:-translate-y-1/2 md:w-[44%] z-10
                                ${
                                  cardOnEnd
                                    ? "md:end-0 md:translate-x-[6%]"
                                    : "md:start-0 md:-translate-x-[6%]"
                                }
                                -mt-10 md:mt-0 mx-6 md:mx-0`}
                  >
                    <article
                      className="relative bg-[color:var(--color-pearl)] border border-[color:var(--color-ink-warm)]/15 p-7 sm:p-9 md:p-11"
                      style={{
                        boxShadow:
                          "0 18px 48px -16px rgba(0,0,0,0.18), 0 4px 14px -6px rgba(0,0,0,0.08)",
                      }}
                    >
                      {/* Fine gold hairline accent in the top corner — a
                          quiet seal-mark referencing the brand */}
                      <span
                        aria-hidden
                        className="absolute top-5 end-5 block h-px w-10"
                        style={{ background: "var(--color-zari)" }}
                      />

                      {/* Meta line: where · when · guests */}
                      <p
                        className="type-roman mb-5 md:mb-7 flex flex-wrap gap-x-3 gap-y-1"
                        style={{
                          color: "var(--color-zari-deep)",
                          fontSize: "0.82rem",
                          letterSpacing: isAr ? 0 : "0.18em",
                        }}
                      >
                        <span>{it.where}</span>
                        <span style={{ color: "var(--color-ink-warm)", opacity: 0.55 }}>·</span>
                        <span>{it.when}</span>
                        <span style={{ color: "var(--color-ink-warm)", opacity: 0.55 }}>·</span>
                        <span>{it.guests}</span>
                      </p>

                      {/* Bold title in Thuluth (AR) / Display (Latin) with
                          one emphasised word — the editorial accent */}
                      <h3
                        className={isAr ? "type-arabic-display" : "type-display"}
                        style={{
                          fontSize: isAr
                            ? "clamp(1.85rem, 1.3rem + 2vw, 3rem)"
                            : "clamp(1.85rem, 1.3rem + 2vw, 3rem)",
                          lineHeight: isAr ? "1.45" : "1.05",
                          letterSpacing: isAr ? "0" : "-0.01em",
                          color: "var(--color-ink)",
                          marginBottom: "0.85em",
                        }}
                      >
                        <FormatHeadline text={it.title} />
                      </h3>

                      {/* Body paragraph */}
                      <p
                        className={`${
                          isAr ? "type-arabic" : "type-serif"
                        } italic`}
                        style={{
                          color: "var(--color-ink-soft)",
                          fontSize: isAr
                            ? "clamp(1rem, 0.92rem + 0.3vw, 1.1rem)"
                            : "clamp(0.98rem, 0.9rem + 0.3vw, 1.08rem)",
                          lineHeight: isAr ? "1.85" : "1.6",
                        }}
                      >
                        {it.note}
                      </p>
                    </article>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-20 md:mt-24 text-center">
          <Link
            href={`/${lang}/celebrations`}
            className="btn-brand inline-flex items-center gap-4 border"
          >
            <span>
              {lang === "ar" ? "اقرأ المزيد من المناسبات" : "View the full archive"}
            </span>
            <span className="btn-brand-arrow flip-rtl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
