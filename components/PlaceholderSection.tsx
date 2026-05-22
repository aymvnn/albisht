import type { Lang } from "@/lib/i18n";

export function PlaceholderSection({
  lang,
  eyebrow,
  title,
  body,
}: {
  lang: Lang;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="relative min-h-[80svh] surface-marble flex items-center pt-32 pb-32">
      <div className="mx-auto max-w-[var(--container-text)] px-6 md:px-12">
        <p className="type-roman text-[0.72rem] text-[color:var(--color-zari-deep)] mb-8">
          {eyebrow}
        </p>
        <h1
          className={`${
            lang === "ar" ? "type-arabic-display" : "type-display"
          } text-[color:var(--color-ink)] mb-10`}
          style={{ fontSize: "var(--text-h1)" }}
        >
          {title}
        </h1>
        <p
          className={`${
            lang === "ar" ? "type-arabic" : "type-serif"
          } text-[color:var(--color-ink-warm)] text-xl leading-relaxed italic max-w-lg`}
        >
          {body}
        </p>
        <div className="mt-16 zari-line w-32" />
      </div>
    </section>
  );
}
