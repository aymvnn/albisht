"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/copy";
import { type Lang, switchLang, localizedNumeral, localizedDigits } from "@/lib/i18n";
import { Logo } from "./Logo";
import { SilkRibbon } from "./SilkRibbon";
import { PHONES } from "@/lib/contact";

export function SiteHeader({
  lang,
  navItems,
  phones,
}: {
  lang: Lang;
  navItems?: { href: string; label: string }[];
  phones?: { mens: { display: string; tel: string }; womens: { display: string; tel: string } };
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const nav = navItems ?? NAV[lang];
  const ph = phones ?? {
    mens: { display: PHONES.mens.display, tel: PHONES.mens.tel },
    womens: { display: PHONES.womens.display, tel: PHONES.womens.tel },
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Portal target needs the document — wait until mounted on the client
  useEffect(() => { setMounted(true); }, []);

  // Logo variant rule:
  //   - Home (above the fold) sits on the dark cinematic hero → light mark.
  //   - Everywhere else (subpages with the pearl PageHero, or any page once
  //     the user scrolls past the hero into pearl chrome) → dark mark.
  // The logo is ALWAYS rendered and ALWAYS linked to /{lang} so it can
  // never go missing or stop working — the previous BishtReveal-phase
  // coupling occasionally left logoHidden=true when the visitor navigated
  // mid-animation, which is the inconsistency we're fixing.
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const logoVariant: "dark" | "light" = isHome && !scrolled ? "light" : "dark";

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

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
          <Logo
            height={44}
            variant={logoVariant}
            priority
            className="transition-opacity duration-500 group-hover:opacity-80"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-7 type-nav text-[color:var(--color-ink-soft)]">
          {nav.slice(0, 6).map((item) => {
            const active = pathname.endsWith(item.href);
            return (
              <Link
                key={item.href}
                href={`/${lang}${item.href}`}
                className="nav-link"
                data-active={active ? "true" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            href={otherHref}
            className="nav-link force-latin text-[color:var(--color-ink-warm)]"
            aria-label={`Switch language to ${otherLang}`}
          >
            {lang === "ar" ? "EN" : "ع"}
          </Link>
          <Link
            href={`/${lang}/consult`}
            className="btn-brand btn-brand--sm hidden md:inline-block border"
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

      {/* === MOBILE DRAWER ===
          Full-screen ink-bisht surface with the brand's silk-ribbon
          flourishes at top and bottom, the calligraphic mark as a quiet
          watermark behind, a warm radial glow centred mid-page, and a
          contact strip below the navigation. Each nav item is numbered
          (00/01/02…) and animates in with stagger. The close button is
          a gold-bordered disc that fills on hover and rotates 90°.

          The drawer is portalled to document.body so it lives at the root
          stacking context. That matters because the header itself creates
          its own stacking context (via `backdrop-blur-md` after scroll), and
          a drawer rendered inside that context was being trapped underneath
          other fixed elements on mobile — clicking "menu" after scrolling
          produced no visible drawer. */}
      {open && mounted && createPortal(
        <div
          className="lg:hidden fixed inset-0 z-[60] surface-bisht overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={lang === "ar" ? "القائمة" : "Menu"}
        >
          {/* ── Decorative layers ── */}
          {/* Top gold gradient hairline */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px z-20"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #D28E29 28%, #F6B62B 50%, #D28E29 72%, transparent 100%)",
              opacity: 0.9,
            }}
          />
          {/* Silk-ribbon flourish under the top hairline */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-20 overflow-hidden pointer-events-none"
            style={{ opacity: 0.4 }}
          >
            <SilkRibbon
              variant="horizontal"
              intensity="subtle"
              className="absolute -top-6 inset-x-0 w-full h-32"
            />
          </div>
          {/* Calligraphic-mark watermark removed per user — the logo
              already sits in the drawer header, a second instance behind
              the nav was a duplicate. */}
          {/* Warm radial glow */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 90% 60% at 50% 35%, rgba(226,159,41,0.08) 0%, transparent 70%)",
            }}
          />
          {/* Bottom silk-ribbon + hairline removed per user — single gold
              ribbon at the top is the brand seal; mirroring it at the
              bottom read as visual noise on mobile. */}

          {/* ── Header bar: logo + close ── */}
          <div className="relative z-30 flex items-center justify-between px-6 pt-7 pb-4">
            <Link
              href={`/${lang}`}
              onClick={() => setOpen(false)}
              aria-label="ALBISHT — Home"
              className="cc-rise"
              style={{ animationDelay: "0ms" }}
            >
              <Logo height={44} variant="light" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={lang === "ar" ? "إغلاق" : "Close"}
              className="drawer-close cc-rise"
              style={{ animationDelay: "60ms" }}
            >
              <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
                <path
                  d="M5 5l10 10M5 15L15 5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* ── Eyebrow + nav ── */}
          <div className="relative z-30 mt-8 md:mt-12 px-8 md:px-12">
            <div
              className="cc-rise flex items-center gap-3 mb-7"
              style={{ animationDelay: "160ms" }}
            >
              <span
                aria-hidden
                className="block h-px"
                style={{ width: "28px", background: "var(--color-zari)" }}
              />
              <span
                className="type-roman"
                style={{
                  fontSize: "0.78rem",
                  letterSpacing: lang === "ar" ? "0" : "0.32em",
                  color: "var(--color-zari)",
                }}
              >
                {lang === "ar" ? "القائمة" : "The atelier"}
              </span>
            </div>

            <nav>
              <ul className="space-y-1">
                {nav.map((item, i) => {
                  const active = pathname.endsWith(item.href);
                  const num =
                    lang === "ar"
                      ? localizedNumeral(i + 1, lang).padStart(2, "٠")
                      : String(i + 1).padStart(2, "0");
                  return (
                    <li
                      key={item.href}
                      className="cc-rise"
                      style={{ animationDelay: `${220 + i * 70}ms` }}
                    >
                      <Link
                        href={`/${lang}${item.href}`}
                        onClick={() => setOpen(false)}
                        className={`drawer-link ${
                          lang === "ar" ? "type-arabic-headline" : "type-serif"
                        }`}
                        data-active={active ? "true" : undefined}
                      >
                        <span className="drawer-num">{num}</span>
                        <span className="drawer-label">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* ── Mid gold ornament — dot · rule · dot ── */}
          <div
            className="cc-rise relative z-30 flex justify-center mt-10 md:mt-14 mb-6"
            style={{ animationDelay: `${220 + nav.length * 70 + 80}ms` }}
            aria-hidden
          >
            <div
              className="flex items-center gap-3"
              style={{ color: "var(--color-zari)", opacity: 0.85 }}
            >
              <span
                className="block w-1.5 h-1.5 rounded-full"
                style={{ background: "currentColor" }}
              />
              <span
                className="block h-px"
                style={{
                  width: "clamp(56px, 18vw, 120px)",
                  background:
                    "linear-gradient(90deg, transparent 0%, currentColor 30%, currentColor 70%, transparent 100%)",
                }}
              />
              <span
                className="block w-1.5 h-1.5 rounded-full"
                style={{ background: "currentColor" }}
              />
            </div>
          </div>

          {/* ── Contact strip + lang switch ── */}
          <div
            className="cc-rise relative z-30 px-8 md:px-12 pb-12 pt-2 space-y-5"
            style={{ animationDelay: `${220 + nav.length * 70 + 160}ms` }}
          >
            <PhoneRow
              label={lang === "ar" ? "صالة الرجال" : "Men's atelier"}
              display={ph.mens.display}
              tel={ph.mens.tel}
              lang={lang}
              primary
            />
            <PhoneRow
              label={lang === "ar" ? "صالة السيدات" : "Women's atelier"}
              display={ph.womens.display}
              tel={ph.womens.tel}
              lang={lang}
            />

            <div className="pt-4 flex items-center justify-between gap-4">
              <Link
                href={otherHref}
                onClick={() => setOpen(false)}
                className="nav-link force-latin"
                style={{ color: "var(--color-mist)" }}
              >
                {lang === "ar" ? "English" : "العربية"}
              </Link>
              <Link
                href={`/${lang}/consult`}
                onClick={() => setOpen(false)}
                className="btn-brand btn-brand--sm inline-flex items-center gap-3 border"
              >
                <span>{lang === "ar" ? "الاستشارة" : "Consult"}</span>
                <span className="btn-brand-arrow flip-rtl">→</span>
              </Link>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}

function PhoneRow({
  label,
  display,
  tel,
  lang,
  primary = false,
}: {
  label: string;
  display: string;
  tel: string;
  lang: Lang;
  primary?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span
        className={lang === "ar" ? "type-arabic" : "type-roman"}
        style={{
          color: "rgba(245, 240, 230, 0.7)",
          fontSize: lang === "ar" ? "0.95rem" : "0.78rem",
          letterSpacing: lang === "ar" ? "0" : "0.22em",
          textTransform: lang === "ar" ? "none" : "uppercase",
        }}
      >
        {label}
      </span>
      <a
        href={`tel:${tel}`}
        className="cc-phone-line"
        dir="ltr"
        style={{
          fontFamily: lang === "ar" ? "var(--font-arabic)" : "var(--font-roman)",
          fontSize: primary ? "1.25rem" : "1.05rem",
          color: "var(--color-zari)",
          letterSpacing: "0.05em",
          fontVariantNumeric: "lining-nums tabular-nums",
          fontWeight: primary ? 500 : 400,
          unicodeBidi: "isolate",
        }}
      >
        <span>{localizedDigits(display, lang)}</span>
        <span aria-hidden className="cc-phone-dot" />
      </a>
    </div>
  );
}
