"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DATE_CONCIERGE } from "@/lib/copy";
import type { Lang } from "@/lib/i18n";
import { localizedNumeral } from "@/lib/i18n";

/**
 * Date Concierge — a small, ceremonial date-first entry point inside the dark
 * InvitationSection on the homepage. The visitor names their month and year,
 * and is carried straight to the consult letter with the date already written.
 *
 * The selects are typographic underline fields, not boxes — the same quiet
 * form language as the consult letter itself. Because `appearance-none`
 * removes the native dropdown arrow, each select carries its own small gold
 * chevron instead.
 *
 * `years` is computed by the server parent. We deliberately do NOT construct
 * a Date here at render time: the server and client could disagree around a
 * year boundary and cause a hydration mismatch.
 */

/* The replacement chevron for the unstyled selects. Decorative only. */
function Chevron() {
  return (
    <svg
      aria-hidden="true"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className="pointer-events-none absolute end-1 bottom-3 text-[color:var(--color-zari)]"
    >
      <path
        d="M2.5 4.25 6 7.75l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DateConcierge({ lang, years }: { lang: Lang; years: number[] }) {
  const router = useRouter();
  const copy = DATE_CONCIERGE[lang];

  // November by default — the heart of the wedding season in Qatar.
  const [monthIndex, setMonthIndex] = useState(10);
  const [year, setYear] = useState(years[0]);

  // The selects sit on a dark surface, so the field text is pearl and the
  // open dropdown list (rendered by the OS, outside our theme) is forced to
  // readable black-on-white via inline styles on each <option>.
  const selectClass =
    "bg-transparent border-0 border-b border-[color:var(--color-mist)]/40 focus:border-[color:var(--color-zari)] focus:outline-none appearance-none cursor-pointer pb-1.5 pe-7 transition-colors";
  const selectStyle: React.CSSProperties = {
    color: "var(--color-pearl)",
    fontFamily: lang === "ar" ? "var(--font-arabic)" : "var(--font-serif)",
    fontSize: "1.05rem",
  };

  const begin = () => {
    // The consult letter receives the date as a human phrase, already in the
    // visitor's language and numeral system — not a machine format.
    const label = `${copy.months[monthIndex]} ${localizedNumeral(year, lang)}`;
    router.push(`/${lang}/consult?date=${encodeURIComponent(label)}`);
  };

  return (
    <div className="flex flex-wrap items-end justify-center gap-x-6 gap-y-4">
      {/* pb matches the selects' baseline so label and fields read as one line */}
      <span
        className={`${
          lang === "ar" ? "type-arabic text-[0.95rem]" : "type-roman text-[0.8rem]"
        } text-[color:var(--color-zari)] pb-1.5`}
      >
        {copy.label}
      </span>

      <span className="relative inline-flex">
        <select
          aria-label={copy.month}
          value={monthIndex}
          onChange={(e) => setMonthIndex(Number(e.target.value))}
          className={selectClass}
          style={selectStyle}
        >
          {copy.months.map((month, index) => (
            <option key={month} value={index} style={{ color: "#000", background: "#fff" }}>
              {month}
            </option>
          ))}
        </select>
        <Chevron />
      </span>

      <span className="relative inline-flex">
        <select
          aria-label={copy.year}
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className={selectClass}
          style={selectStyle}
        >
          {years.map((y) => (
            <option key={y} value={y} style={{ color: "#000", background: "#fff" }}>
              {localizedNumeral(y, lang)}
            </option>
          ))}
        </select>
        <Chevron />
      </span>

      <button
        type="button"
        onClick={begin}
        className="btn-brand btn-brand--sm inline-flex items-center gap-3 border"
      >
        <span>{copy.action}</span>
        <span className="btn-brand-arrow flip-rtl">→</span>
      </button>
    </div>
  );
}
