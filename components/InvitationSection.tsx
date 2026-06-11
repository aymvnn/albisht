import Link from "next/link";
import { INVITATION } from "@/lib/copy";
import type { Lang } from "@/lib/i18n";
import { DateConcierge } from "./DateConcierge";
import { Logo } from "./Logo";

export function InvitationSection({
  lang,
  content,
}: {
  lang: Lang;
  content?: { title: string; line1: string; line2: string; cta: string; ctaHref: string };
}) {
  const inv = content ?? INVITATION[lang];
  const ctaHref = content?.ctaHref ?? "/consult";
  // Server-computed so the client concierge never constructs a Date itself
  // (avoids hydration drift). Weddings book ~7 months out, so three years
  // of choice is generous.
  const thisYear = new Date().getFullYear();
  const years = [thisYear, thisYear + 1, thisYear + 2];

  return (
    <section className="relative py-32 md:py-48 surface-bisht overflow-hidden">
      {/* radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at center, rgba(210, 142, 41, 0.12) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[var(--container-text)] px-6 md:px-12 text-center">
        <div className="flex justify-center mb-14">
          <Logo height={110} variant="light" />
        </div>
        <p className="type-roman text-[0.95rem] text-[color:var(--color-zari)] mb-8">
          {inv.title}
        </p>
        <h2
          className={`${
            lang === "ar" ? "type-arabic-display" : "type-display"
          } text-[color:var(--color-pearl)] mb-4`}
          style={{ fontSize: "var(--text-h2)" }}
        >
          {inv.line1}
        </h2>
        <p
          className={`${
            lang === "ar" ? "type-arabic" : "type-serif"
          } text-[color:var(--color-mist)] text-xl md:text-2xl italic mb-16`}
        >
          {inv.line2}
        </p>
        <Link
          href={`/${lang}${ctaHref}`}
          className="btn-brand inline-flex items-center gap-4 border"
        >
          <span>{inv.cta}</span>
          <span className="btn-brand-arrow flip-rtl">→</span>
        </Link>

        {/* The date concierge — begin with the month, arrive at the letter
            with the date already written. */}
        <div className="mt-14 pt-10 border-t border-[color:var(--color-mist)]/15">
          <DateConcierge lang={lang} years={years} />
        </div>
      </div>
    </section>
  );
}
