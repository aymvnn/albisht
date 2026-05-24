import { PROMISE } from "@/lib/copy";
import type { Lang } from "@/lib/i18n";

export function PromiseSection({ lang }: { lang: Lang }) {
  const p = PROMISE[lang];
  const isAr = lang === "ar";

  // Three lines cascade — each subsequent line sets further across the page,
  // like a sluier neergedaald. Inset progressively from the "start" edge.
  const insets = ["0%", "10%", "22%"];

  return (
    <section className="relative py-28 md:py-40 surface-pearl">
      <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12">
        {/* Off-centre eyebrow label — sits in the right (LTR) or left (RTL)
            third, leaving a long negative space across from it. */}
        <div
          className={`flex ${isAr ? "justify-start" : "justify-end"} mb-20 md:mb-32`}
        >
          <div className="flex items-center gap-4 max-w-md">
            <span className="block w-16 h-px bg-[color:var(--color-zari)]" />
            <span className="type-roman text-[0.78rem] text-[color:var(--color-zari)]">
              {p.title}
            </span>
          </div>
        </div>

        <div className="space-y-3 md:space-y-5">
          {p.lines.map((line, i) => (
            <p
              key={i}
              className={`${
                isAr ? "type-arabic-display" : "type-display"
              } text-[color:var(--color-ink)] reveal-up`}
              style={{
                fontSize: "clamp(2rem, 1.5rem + 3vw, 4.5rem)",
                marginInlineStart: insets[i] ?? "0%",
                animationDelay: `${i * 0.18}s`,
                lineHeight: isAr ? "1.45" : "1.05",
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
