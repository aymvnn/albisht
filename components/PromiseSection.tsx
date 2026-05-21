import { PROMISE } from "@/lib/copy";
import type { Lang } from "@/lib/i18n";

export function PromiseSection({ lang }: { lang: Lang }) {
  const p = PROMISE[lang];

  return (
    <section className="relative py-32 md:py-48 surface-pearl">
      <div className="mx-auto max-w-[var(--container-text)] px-6 md:px-12">
        <div className="seal-divider type-roman text-[0.7rem] mb-20">
          <span>{p.title}</span>
        </div>
        <div className="space-y-4 md:space-y-6">
          {p.lines.map((line, i) => (
            <p
              key={i}
              className={`${
                lang === "ar"
                  ? "type-arabic-display text-3xl md:text-5xl"
                  : "type-display text-3xl md:text-5xl"
              } text-[color:var(--color-ink-bisht)] reveal-up`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
