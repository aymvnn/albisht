"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/copy";
import { type Lang, switchLang } from "@/lib/i18n";
import { Logo } from "./Logo";

export function SiteHeader({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const nav = NAV[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const otherLang = switchLang(lang);
  const sansLang = pathname.replace(/^\/(ar|en)/, "") || "/";
  const otherHref = `/${otherLang}${sansLang === "/" ? "" : sansLang}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "backdrop-blur-md bg-[color:var(--color-pearl)]/85 border-b border-[color:var(--color-mist)]/40"
          : ""
      }`}
      style={{ transitionTimingFunction: "var(--ease-ceremonial)" }}
    >
      <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12 py-5 flex items-center justify-between gap-6">
        <Link
          href={`/${lang}`}
          className="flex items-center gap-4 group"
          aria-label="ALBISHT — Home"
        >
          <Logo height={44} variant="dark" priority className="transition-opacity duration-500 group-hover:opacity-80" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 type-roman-light text-[0.92rem] text-[color:var(--color-ink-soft)]">
          {nav.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={`/${lang}${item.href}`}
              className="relative py-2 hover:text-[color:var(--color-zari-deep)] transition-colors"
            >
              {item.label}
              {pathname.endsWith(item.href) && (
                <span className="absolute inset-x-0 -bottom-0.5 h-px bg-[color:var(--color-zari)]" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={otherHref}
            className="type-roman force-latin text-[0.92rem] text-[color:var(--color-ink-warm)] hover:text-[color:var(--color-zari-deep)] transition-colors"
            aria-label={`Switch language to ${otherLang}`}
          >
            {lang === "ar" ? "EN" : "ع"}
          </Link>
          <Link
            href={`/${lang}/consult`}
            className="hidden md:inline-block px-5 py-2.5 border border-[color:var(--color-ink-soft)]/40 hover:border-[color:var(--color-zari)] hover:text-[color:var(--color-zari-deep)] transition-all duration-500 type-roman text-[0.92rem]"
            style={{ transitionTimingFunction: "var(--ease-ceremonial)" }}
          >
            {lang === "ar" ? "الاستشارة" : "Consult"}
          </Link>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen(true)}
            className="lg:hidden p-2"
          >
            <span className="block w-5 h-px bg-[color:var(--color-ink-soft)]" />
            <span className="block w-5 h-px bg-[color:var(--color-ink-soft)] mt-1.5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 surface-bisht flex flex-col">
          <div className="flex justify-between items-center px-6 py-5">
            <Logo height={36} variant="light" />
            <button onClick={() => setOpen(false)} aria-label="Close" className="text-[color:var(--color-pearl)] p-2">
              <svg viewBox="0 0 20 20" width="20" height="20"><path d="M4 4l12 12M4 16L16 4" stroke="currentColor" strokeWidth="1"/></svg>
            </button>
          </div>
          <nav className="flex-1 flex flex-col items-center justify-center gap-8 type-display text-[color:var(--color-pearl)]">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={`/${lang}${item.href}`}
                onClick={() => setOpen(false)}
                className="text-4xl hover:text-[color:var(--color-zari)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
