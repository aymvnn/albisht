import Link from "next/link";
import { INVITATION } from "@/lib/copy";
import type { Lang } from "@/lib/i18n";
import { Logo } from "./Logo";

export function InvitationSection({ lang }: { lang: Lang }) {
  const inv = INVITATION[lang];

  return (
    <section className="relative py-32 md:py-48 surface-bisht overflow-hidden">
      {/* radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at center, oklch(0.745 0.105 78 / 0.12) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[var(--container-text)] px-6 md:px-12 text-center">
        <div className="flex justify-center mb-14">
          <Logo height={110} variant="light" />
        </div>
        <p className="type-roman text-[0.72rem] text-[color:var(--color-zari)] mb-8">
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
          href={`/${lang}/consult`}
          className="group inline-flex items-center gap-4 px-10 py-5 border border-[color:var(--color-zari)]/40 hover:border-[color:var(--color-zari)] hover:bg-[color:var(--color-zari)]/5 transition-all duration-700"
          style={{ transitionTimingFunction: "var(--ease-ceremonial)" }}
        >
          <span className="type-roman text-[0.74rem] text-[color:var(--color-zari)]">
            {inv.cta}
          </span>
          <span className="text-[color:var(--color-zari)] flip-rtl group-hover:translate-x-1 transition-transform duration-500">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
