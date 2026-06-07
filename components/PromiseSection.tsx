import { PROMISE } from "@/lib/copy";
import type { Lang } from "@/lib/i18n";

export function PromiseSection({
  lang,
  content,
}: {
  lang: Lang;
  content?: { title: string; lines: string[] };
}) {
  const p = content ?? PROMISE[lang];
  const isAr = lang === "ar";

  return (
    <section className="relative py-20 md:py-28 surface-pearl">
      <div className="mx-auto max-w-[var(--container-text)] px-6 md:px-12">
        {/* Centred eyebrow label — a single gold hairline divider with the
            section name. Sets a calm, symmetrical opening. */}
        <div className="flex justify-center mb-10 md:mb-14">
          <div className="flex items-center gap-4">
            <span className="block w-14 h-px bg-[color:var(--color-zari)]" />
            <span className="type-roman text-[0.85rem] text-[color:var(--color-zari)]">
              {p.title}
            </span>
            <span className="block w-14 h-px bg-[color:var(--color-zari)]" />
          </div>
        </div>

        {/* Three lines, centred, with consistent vertical rhythm.
            No cascading horizontal inset (the cascade made the type read as
            ragged rather than ceremonial). Each line is given its own
            generous vertical space, and the staggered reveal handles the
            "one-by-one" feel that the inset was attempting to deliver. */}
        <div
          className={`flex flex-col items-center text-center ${
            isAr ? "gap-5 md:gap-7" : "gap-3 md:gap-5"
          }`}
        >
          {p.lines.map((line, i) => (
            <p
              key={i}
              className={`${
                /* Clean Naskh (Amiri 700) for the three-line stack — Thuluth
                   stays reserved for true ceremonial page titles elsewhere. */
                isAr ? "type-arabic-prose-display" : "type-display"
              } text-[color:var(--color-ink)] reveal-up`}
              style={{
                fontSize: isAr
                  ? "clamp(1.85rem, 1.3rem + 2.4vw, 3.25rem)"
                  : "clamp(2rem, 1.5rem + 3vw, 4.5rem)",
                animationDelay: `${i * 0.22}s`,
                lineHeight: isAr ? "1.85" : "1.05",
                letterSpacing: isAr ? "0" : "-0.01em",
                maxWidth: "26ch",
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
