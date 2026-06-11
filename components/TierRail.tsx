"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";

/**
 * TierRail — in-page navigation for the five package tiers on /packages.
 *
 * One component, two renderings:
 *  - Mobile/tablet: a sticky pill strip just below the fixed header, always
 *    visible, horizontally scrollable. The active pill is kept centred.
 *  - Desktop (xl+): a quiet fixed dot rail at the inline end of the viewport
 *    (logical positioning, so it flips to the left on RTL pages). It fades in
 *    only once the reader has scrolled past the hero, so the opening of the
 *    page stays uncluttered.
 *
 * Both renderings share a single IntersectionObserver that watches the
 * `#tier-*` sections the page already renders; globals.css gives those ids
 * scroll-margin-top, so plain anchor jumps land below the fixed header.
 */

type TierLink = {
  id: string;
  name: string;
  price: string;
};

export function TierRail({
  lang,
  tiers,
  label,
}: {
  lang: Lang;
  tiers: TierLink[];
  label: string;
}) {
  const isAr = lang === "ar";

  // Id of the tier currently in the reading band; "" until the observer fires.
  const [active, setActive] = useState("");
  // Desktop rail visibility — hidden until the reader scrolls past the hero.
  const [railRevealed, setRailRevealed] = useState(false);
  // The horizontally scrollable pill row (NOT the sticky wrapper) — this is
  // the scroll context we are allowed to move when centring the active pill.
  const stripRef = useRef<HTMLDivElement>(null);

  /* === Active-tier tracking ===============================================
     A single observer over all tier sections. The rootMargin narrows the
     viewport to a band roughly 35%–45% from the top, so the "active" tier is
     the one the reader is actually looking at, not merely the one whose edge
     has entered the screen. We take the last intersecting entry so that when
     two sections share the band during a fast scroll, the later (lower) one
     wins — matching the reading direction. */
  useEffect(() => {
    const targets = tiers
      .map((t) => document.getElementById(`tier-${t.id}`))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        const last = intersecting[intersecting.length - 1];
        if (last) setActive(last.target.id.slice("tier-".length));
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [tiers]);

  /* === Desktop rail reveal =================================================
     rAF-throttled scroll listener: the rail only earns its place once the
     reader is past the hero (~600px). Before that it stays invisible and
     untouchable. The fade itself is a CSS transition, which the global
     reduced-motion rules already collapse to an instant change. */
  useEffect(() => {
    let raf = 0;
    const update = () => setRailRevealed(window.scrollY > 600);
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* === Centre the active pill in the mobile strip ==========================
     Guarded so it can only ever move the strip, never the page:
     - skip entirely when the strip does not overflow (nothing to centre, and
       on xl+ the strip is display:none so scrollWidth is 0);
     - skip when the strip is off-screen vertically, because scrollIntoView
       with block: "nearest" would otherwise scroll the document to reach it;
     - block: "nearest" leaves vertical position untouched when the pill is
       already visible, so only the horizontal (inline) axis moves — and the
       nearest inline scroll context is the strip itself. */
  useEffect(() => {
    if (!active) return;
    const strip = stripRef.current;
    if (!strip) return;
    if (strip.scrollWidth <= strip.clientWidth) return;

    const pill = strip.querySelector<HTMLAnchorElement>(
      `[data-tier="${CSS.escape(active)}"]`
    );
    if (!pill) return;

    const rect = strip.getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    pill.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: reduced ? "auto" : "smooth",
    });
  }, [active]);

  return (
    <>
      {/* ============================================================
          A) Mobile/tablet pill strip — sticky below the fixed header,
          always visible, horizontally scrollable.
          ============================================================ */}
      <nav
        aria-label={label}
        className="xl:hidden sticky top-[72px] md:top-[84px] z-30 print-hide bg-[color:var(--color-pearl)]/95 backdrop-blur-sm border-y border-[color:var(--color-ink-warm)]/15"
      >
        <div
          ref={stripRef}
          className="overflow-x-auto scrollbar-hidden flex gap-1 px-4 py-2.5"
        >
          {tiers.map((t) => {
            const isActive = active === t.id;
            return (
              <a
                key={t.id}
                href={`#tier-${t.id}`}
                data-tier={t.id}
                aria-current={isActive ? "location" : undefined}
                className="press-dim flex items-baseline gap-2 px-4 py-2 whitespace-nowrap"
                style={{
                  color: isActive
                    ? "var(--color-zari)"
                    : "var(--color-ink-warm)",
                  // A constant-width bottom border keeps the pill height
                  // stable; only the colour changes when active.
                  borderBottom: isActive
                    ? "1.5px solid var(--color-zari)"
                    : "1.5px solid transparent",
                  transition:
                    "color 380ms var(--ease-ceremonial), border-color 380ms var(--ease-ceremonial)",
                }}
              >
                <span
                  className={isAr ? "type-arabic" : "type-roman"}
                  style={{ fontSize: isAr ? "0.95rem" : "0.82rem" }}
                >
                  {t.name}
                </span>
                {/* Price is a formatted numeral string — isolate it LTR so
                    it reads correctly inside RTL flow. It stays muted even
                    on the active pill; the name carries the gold. */}
                <span
                  dir="ltr"
                  style={{
                    unicodeBidi: "isolate",
                    fontSize: "0.7rem",
                    color: "var(--color-ink-warm)",
                    opacity: 0.8,
                    fontVariantNumeric: "lining-nums tabular-nums",
                  }}
                >
                  {t.price}
                </span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* ============================================================
          B) Desktop dot rail — fixed at the vertical centre of the
          inline-end edge. insetInlineEnd is logical, so the rail sits
          on the right for LTR and the left for RTL without any
          direction-aware code here (dir lives on an ancestor).
          ============================================================ */}
      <nav
        aria-label={label}
        className={`hidden xl:flex fixed top-1/2 -translate-y-1/2 z-30 print-hide flex-col items-end gap-4 ${
          railRevealed ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          insetInlineEnd: "1.25rem",
          transition: "opacity 500ms var(--ease-ceremonial)",
        }}
      >
        <span
          className={isAr ? "type-arabic" : "type-roman"}
          style={{
            fontSize: isAr ? "0.85rem" : "0.7rem",
            color: "var(--color-ink-warm)",
          }}
        >
          {label}
        </span>

        {tiers.map((t) => {
          const isActive = active === t.id;
          return (
            <a
              key={t.id}
              href={`#tier-${t.id}`}
              aria-current={isActive ? "location" : undefined}
              className="group flex items-center gap-3 justify-end py-1"
            >
              {/* Tier name — whispered: visible on hover/focus or when
                  the tier is the one being read. */}
              <span
                className={`${isAr ? "type-arabic" : "type-roman"} ${
                  isActive ? "opacity-100" : "opacity-0"
                } group-hover:opacity-100 group-focus-visible:opacity-100`}
                style={{
                  fontSize: isAr ? "0.92rem" : "0.78rem",
                  color: isActive
                    ? "var(--color-zari)"
                    : "var(--color-ink-warm)",
                  transition:
                    "opacity 380ms var(--ease-ceremonial), color 380ms var(--ease-ceremonial)",
                }}
              >
                {t.name}
              </span>
              {/* The dot itself — hollow gold ring at rest, filled with the
                  brand gradient and gently enlarged when active. */}
              <span
                aria-hidden="true"
                className={`block w-2 h-2 rounded-full border border-[color:var(--color-zari)] ${
                  isActive ? "scale-125" : ""
                }`}
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, #E29F29 0%, #F6B62B 100%)"
                    : "transparent",
                  transition:
                    "transform 380ms var(--ease-ceremonial), background 380ms var(--ease-ceremonial)",
                }}
              />
            </a>
          );
        })}
      </nav>
    </>
  );
}
