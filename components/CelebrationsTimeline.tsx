"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { CELEBRATIONS } from "@/lib/copy";
import { type Lang, localizedNumeral } from "@/lib/i18n";

export function CelebrationsTimeline({ lang }: { lang: Lang }) {
  const data = CELEBRATIONS[lang];
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
    <section ref={ref} className="relative py-32 md:py-44 surface-pearl">
      <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          <div className="md:col-span-5">
            <div className="seal-divider type-roman text-[0.7rem] text-[color:var(--color-ink-warm)] mb-8">
              <span>{data.label}</span>
            </div>
            <h2
              className={`${
                lang === "ar" ? "type-arabic-display" : "type-display"
              } text-[color:var(--color-ink)]`}
              style={{ fontSize: "var(--text-h2)" }}
            >
              {data.title}
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 flex items-end">
            <p
              className={`${
                lang === "ar" ? "type-arabic" : "type-serif"
              } text-[color:var(--color-ink-warm)] text-lg leading-relaxed max-w-md`}
            >
              {data.intro}
            </p>
          </div>
        </div>

        <ul className="space-y-32 md:space-y-44">
          {data.items.map((it, i) => (
            <li
              key={i}
              data-row
              className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 opacity-0 translate-y-10 transition-all duration-[1400ms] [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0"
              style={{
                transitionTimingFunction: "var(--ease-ceremonial)",
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <div
                className={`md:col-span-7 ${
                  i % 2 === 1 ? "md:order-2 md:col-start-6" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={it.photo}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-105"
                  />
                </div>
              </div>
              <div
                className={`md:col-span-4 flex flex-col justify-center ${
                  i % 2 === 1 ? "md:order-1 md:col-start-2" : "md:col-start-9"
                }`}
              >
                <div className="space-y-1 mb-6 type-roman text-[0.7rem] text-[color:var(--color-zari-deep)]">
                  <p>{lang === "ar" ? localizedNumeral(0, lang).slice(0, 0) : ""}{it.when}</p>
                  <p className="text-[color:var(--color-ink-warm)] tracking-[0.3em]">
                    {it.where}
                  </p>
                  <p className="text-[color:var(--color-ink-warm)]/70 tracking-[0.2em]">
                    {it.guests}
                  </p>
                </div>
                <p
                  className={`${
                    lang === "ar" ? "type-arabic" : "type-serif"
                  } text-[color:var(--color-ink-soft)] text-base md:text-lg leading-relaxed max-w-md italic`}
                >
                  {it.note}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-32 text-center">
          <Link
            href={`/${lang}/celebrations`}
            className="inline-flex items-center gap-3 type-roman text-[0.7rem] text-[color:var(--color-ink-warm)] hover:text-[color:var(--color-zari-deep)] transition-colors"
          >
            <span className="w-10 h-px bg-current" />
            <span>
              {lang === "ar" ? "اقرأ المزيد من المناسبات" : "View the full archive"}
            </span>
            <span className="flip-rtl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
