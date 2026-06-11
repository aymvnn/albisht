"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NOT_FOUND } from "@/lib/copy";

/**
 * The ceremonial 404 for localized routes — rendered inside the [lang]
 * layout, so the site header and footer frame it like any other page.
 *
 * Next.js gives not-found pages no params, so the locale is read from the
 * URL itself. Anything that is not explicitly "/en/..." falls back to
 * Arabic, the canonical language of the house.
 */
export default function NotFound() {
  const pathname = usePathname();
  const lang = pathname?.split("/")[1] === "en" ? "en" : "ar";
  const isAr = lang === "ar";
  const c = NOT_FOUND[lang];

  return (
    <section className="min-h-[70svh] surface-pearl flex flex-col items-center justify-center text-center px-6 pt-28 pb-20">
      {/* Eyebrow — the 404 itself, held between two gold hairlines like a seal */}
      <div className="flex items-center gap-4">
        <span
          className="block w-12 h-px bg-[color:var(--color-zari)]"
          aria-hidden="true"
        />
        <span className="type-roman text-[0.85rem] text-[color:var(--color-zari)]">
          {c.eyebrow}
        </span>
        <span
          className="block w-12 h-px bg-[color:var(--color-zari)]"
          aria-hidden="true"
        />
      </div>

      {/* The title carries the weight; everything else stays quiet */}
      <h1
        className={`${isAr ? "type-arabic-display" : "type-display"} mt-8`}
        style={{
          fontSize: "clamp(2.4rem, 1.8rem + 3vw, 4.5rem)",
          color: "var(--color-ink)",
          maxWidth: "18ch",
        }}
      >
        {c.title}
      </h1>

      <p
        className={`${isAr ? "type-arabic" : "type-serif"} italic mt-6`}
        style={{ color: "var(--color-ink-warm)" }}
      >
        {c.line}
      </p>

      {/* One door out — back to the beginning of the protocol */}
      <Link
        href={`/${lang}`}
        className="btn-brand inline-flex items-center gap-4 border mt-12"
      >
        <span>{c.cta}</span>
        <span className="btn-brand-arrow flip-rtl">→</span>
      </Link>
    </section>
  );
}
