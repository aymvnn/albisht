"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";

/**
 * The Bisht Reveal — the signature opening cinematic.
 *
 * Per direct brand-owner instruction (2026-05-25):
 *   "De openingsanimatie moet zonder witte logo en zonder de oranje tekst
 *    eronder, enkel de animatie."
 * → The animation is the entire moment. No overlay logo. No overlay phrase.
 *   The brand identity book (Identity_al bisht_2.pdf) shows the calligraphic
 *   mark used as a stand-alone seal — not as an overlay on transitional states.
 *
 * Phases:
 *  - "closed":    Two dark panels with thick zari (gold-brocade) edging meet
 *                 in the centre. A faint gold light pulses at the seam,
 *                 hinting at what lies beyond.
 *  - "opening":   The panels part outward; a bright golden bloom flashes at
 *                 the moment of opening.
 *  - "revealed":  Pearl-light pours through; the bloom fades.
 *  - "done":      The overlay is removed and scroll is released.
 *
 * Triggers (in "closed" phase, whichever first):
 *  - scroll (wheel/touch)
 *  - click anywhere on the overlay
 *  - Enter / Space keypress (Esc skips)
 *
 * Cookie flag `albisht_reveal_seen` is set on first complete play so returning
 * visitors within the same session do not see the intro repeat.
 *
 * Reduced motion: when `prefers-reduced-motion: reduce` is set, the intro is
 * skipped entirely on mount.
 */

type Phase = "closed" | "opening" | "revealed" | "fading" | "done";

const REVEAL_COOKIE = "albisht_reveal_seen";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function BishtReveal({ lang: _lang }: { lang: Lang }) {
  const [phase, setPhase] = useState<Phase>("done");
  const startedRef = useRef(false);
  // The opening sequence arms three timeouts; if the visitor navigates away
  // mid-reveal the component unmounts before they fire. Track them so the
  // unmount cleanup can cancel the stragglers.
  const timersRef = useRef<number[]>([]);
  useEffect(() => {
    const timers = timersRef.current;
    return () => { timers.forEach((t) => window.clearTimeout(t)); };
  }, []);

  // Broadcast the active phase so the rest of the chrome (notably SiteHeader)
  // can react — e.g. swap the dark logo for the light variant while the
  // bisht panels are closed, hide it while the panels are mid-reveal, and
  // restore it once the overlay has fully faded.
  useEffect(() => {
    document.documentElement.dataset.bishtPhase = phase;
    window.dispatchEvent(new CustomEvent("bisht-phase", { detail: phase }));
  }, [phase]);

  // Decide whether to play or skip the reveal — only on first mount, client side.
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setPhase("done");
      return;
    }

    // Skip if returning visitor in the same session
    if (document.cookie.includes(`${REVEAL_COOKIE}=1`)) {
      setPhase("done");
      return;
    }

    document.body.style.overflow = "hidden";
    setPhase("closed");

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Listen for the trigger that opens the bisht
  useEffect(() => {
    if (phase !== "closed") return;
    let opened = false;
    const open = () => {
      if (opened) return;
      opened = true;
      setPhase("opening");
      // sequence: opening → revealed → fading → done
      timersRef.current.push(
        window.setTimeout(() => setPhase("revealed"), 1600),
        window.setTimeout(() => setPhase("fading"), 3200),
        window.setTimeout(() => {
          setPhase("done");
          document.body.style.overflow = "";
          // Set session cookie so the reveal plays at most once per session
          document.cookie = `${REVEAL_COOKIE}=1; path=/; max-age=3600; SameSite=Lax`;
        }, 4700)
      );
    };

    const onScroll = (e: WheelEvent | TouchEvent) => { e.preventDefault?.(); open(); };
    const onClick = () => open();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        if (e.key === "Escape") {
          // Allow Escape to skip the intro entirely
          opened = true;
          setPhase("done");
          document.body.style.overflow = "";
          document.cookie = `${REVEAL_COOKIE}=1; path=/; max-age=3600; SameSite=Lax`;
          return;
        }
        open();
      }
    };

    window.addEventListener("wheel", onScroll, { passive: false });
    window.addEventListener("touchmove", onScroll as EventListener, { passive: false });
    window.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchmove", onScroll as EventListener);
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [phase]);

  if (phase === "done") return null;

  const opening = phase === "opening" || phase === "revealed";
  const lightOn = phase === "revealed";

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden cursor-pointer select-none"
      role="presentation"
      aria-hidden="true"
      style={{
        opacity: phase === "fading" ? 0 : 1,
        transition: "opacity 1.5s var(--ease-veil)",
      }}
    >
      {/* === BEHIND THE CLOAK: the pearl-light world that pours through === */}
      <div className="absolute inset-0 surface-marble" />

      {/* Photographic overlay — zwarte zijde + gouden zari, lichte opacity,
          rijmt met de bisht-zari-band die de panelen flankeert. Zichtbaar
          zodra de panelen open splijten; faded uit met de hele overlay. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/photos/reveal/reveal-silk-overlay.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.45,
        }}
      />

      {/* The "light pouring through" — radial bloom that intensifies at reveal */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.98 0.03 86 / 0.55) 0%, transparent 70%)",
          opacity: lightOn ? 1 : 0,
          transition: "opacity 1.4s var(--ease-veil)",
        }}
      />

      {/* === LEFT BISHT PANEL === */}
      <BishtPanel side="left" opening={opening} />
      {/* === RIGHT BISHT PANEL === */}
      <BishtPanel side="right" opening={opening} />

      {/* === GOLD BLOOM AT THE SEAM ===
          During "closed" state, a soft gold light pulses at the centre seam —
          the brand's signature gold (#D28E29 → #F6B62B gradient) hinting at
          what lies beyond. At the moment of opening, it bursts bright.
          During "revealed" it fades into the pearl-light. */}
      <div
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: phase === "closed" ? "min(420px, 56vw)" : "min(720px, 90vw)",
          background:
            phase === "closed"
              ? "radial-gradient(ellipse at center, rgba(246, 182, 43, 0.30) 0%, rgba(226, 159, 41, 0.18) 30%, transparent 70%)"
              : phase === "opening"
              ? "radial-gradient(ellipse at center, rgba(255, 240, 200, 0.85) 0%, rgba(246, 182, 43, 0.45) 40%, transparent 75%)"
              : "radial-gradient(ellipse at center, rgba(255, 247, 224, 0.40) 0%, transparent 60%)",
          filter: phase === "opening" ? "blur(6px)" : "blur(20px)",
          opacity:
            phase === "closed"
              ? 1
              : phase === "opening"
              ? 1
              : 0.5,
          transition:
            "width 0.9s var(--ease-veil), filter 0.6s ease-out, opacity 1.2s var(--ease-veil), background 0.6s ease-out",
          animation: phase === "closed" ? "seam-breathe 3s ease-in-out infinite" : "none",
        }}
      />

      {/* === SEAM HAIRLINE — a single razor-thin bright zari line where the
          two panels meet, that "wakes" when the panels start to open. */}
      <div
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "1.5px",
          background:
            "linear-gradient(180deg, transparent 0%, #F6B62B 15%, #F6B62B 85%, transparent 100%)",
          opacity:
            phase === "closed" ? 0.55 : phase === "opening" ? 0.95 : 0,
          filter: phase === "opening" ? "drop-shadow(0 0 6px #F6B62B)" : "none",
          transition: "opacity 0.6s ease-out, filter 0.4s ease-out",
        }}
      />

      {/* === Visual-only "tap to enter" indicator: a slow pulsing
          gold vertical line near the bottom. No text — per brand
          direction the moment is the animation, not a label. === */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          opacity: phase === "closed" ? 1 : 0,
          transition: "opacity 0.8s ease-out",
          transitionDelay: phase === "closed" ? "0.8s" : "0s",
        }}
      >
        <span
          className="block"
          style={{
            width: "1px",
            height: "44px",
            background:
              "linear-gradient(180deg, transparent 0%, #F6B62B 50%, transparent 100%)",
            animation: "seam-pulse 2.2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Skip button — top right corner, fades in after a moment.
          Tiny "×" symbol; no English text overlay. */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setPhase("done");
          document.body.style.overflow = "";
          document.cookie = `${REVEAL_COOKIE}=1; path=/; max-age=3600; SameSite=Lax`;
        }}
        aria-label="Skip intro"
        className="absolute top-6 right-6 z-[101] w-9 h-9 flex items-center justify-center text-[color:var(--color-pearl)]/55 hover:text-[color:var(--color-zari-bright)] transition-colors"
        style={{
          opacity: phase === "closed" ? 1 : 0,
          transition: "opacity 0.8s ease-out 1.5s",
          pointerEvents: phase === "closed" ? "auto" : "none",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2 2L12 12M2 12L12 2" stroke="currentColor" strokeWidth="1" />
        </svg>
      </button>

      <style jsx>{`
        @keyframes seam-breathe {
          0%, 100% { transform: translateX(-50%) scaleY(1); opacity: 0.85; }
          50% { transform: translateX(-50%) scaleY(1.05); opacity: 1; }
        }
        @keyframes seam-pulse {
          0%, 100% { opacity: 0.4; transform: scaleY(0.9); }
          50% { opacity: 1; transform: scaleY(1.1); }
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   BishtPanel — one half of the bisht.
   side="left"  → anchored to the left edge, gold band on its RIGHT
   side="right" → anchored to the right edge, gold band on its LEFT
   ============================================================ */

function BishtPanel({ side, opening }: { side: "left" | "right"; opening: boolean }) {
  const isLeft = side === "left";

  return (
    <div
      className="absolute top-0 bottom-0"
      style={{
        // Each panel covers 50% of the width; they meet in the middle when closed.
        [isLeft ? "left" : "right"]: 0,
        width: "50%",
        transform: opening
          ? `translateX(${isLeft ? "-102%" : "102%"}) skewY(${isLeft ? "-1.5deg" : "1.5deg"})`
          : "translateX(0) skewY(0)",
        transition: "transform 1.6s var(--ease-veil)",
      }}
    >
      {/* === Layer 1: camelhair body (heathered dark fabric) === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at " +
            (isLeft ? "30%" : "70%") +
            " 40%, oklch(0.18 0.008 60) 0%, oklch(0.12 0.005 60) 60%, oklch(0.09 0.004 60) 100%)",
        }}
      />
      {/* fabric weave texture */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='0.95 0.6' numOctaves='2' seed='4'/><feColorMatrix values='0 0 0 0 0.06  0 0 0 0 0.05  0 0 0 0 0.03  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23f)'/></svg>\")",
          mixBlendMode: "overlay",
        }}
      />
      {/* Subtle diagonal weave hint */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, oklch(0.45 0.012 60) 0 1px, transparent 1px 4px)",
        }}
      />

      {/* === Layer 2: subtle inner side-shadow (deeper toward centre seam) === */}
      <div
        className="absolute inset-y-0"
        style={{
          [isLeft ? "right" : "left"]: 0,
          width: "30%",
          background: isLeft
            ? "linear-gradient(90deg, transparent 0%, oklch(0 0 0 / 0.5) 100%)"
            : "linear-gradient(270deg, transparent 0%, oklch(0 0 0 / 0.5) 100%)",
        }}
      />

      {/* === Layer 3: THE ZARI BAND ─ thick brocade edging, brand-conform gold === */}
      {/* Anchored to the inner edge (right side of left panel; left side of right panel) */}
      <div
        className="absolute top-[6%] bottom-[6%]"
        style={{
          [isLeft ? "right" : "left"]: 0,
          width: "min(34px, 5vw)",
          minWidth: "20px",
          // Brocade gradient using the official brand gradient stops:
          // dark gold #E29F29 ↔ bright gold #F6B62B ↔ dark gold
          background: `
            linear-gradient(${isLeft ? "270deg" : "90deg"},
              #8E6B2E 0%,
              #D28E29 18%,
              #E29F29 40%,
              #F6B62B 55%,
              #E29F29 75%,
              #8E6B2E 100%
            )
          `,
          boxShadow: isLeft
            ? "inset -1px 0 0 rgba(246, 182, 43, 0.7), inset 1px 0 0 rgba(120, 80, 30, 0.6), -2px 0 8px -2px rgba(226, 159, 41, 0.45)"
            : "inset 1px 0 0 rgba(246, 182, 43, 0.7), inset -1px 0 0 rgba(120, 80, 30, 0.6), 2px 0 8px -2px rgba(226, 159, 41, 0.45)",
        }}
      >
        {/* Brocade weave pattern — diagonal hatching layered on the gradient */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg,
                rgba(80, 50, 15, 0.55) 0 1.5px,
                transparent 1.5px 3.5px
              ),
              repeating-linear-gradient(-45deg,
                rgba(255, 220, 130, 0.35) 0 1px,
                transparent 1px 3.5px
              )
            `,
            mixBlendMode: "overlay",
          }}
        />
        {/* Fine micro-stitches: tiny gold beads at regular intervals */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(180deg,
              transparent 0 6px,
              rgba(255, 240, 180, 0.4) 6px 7px,
              transparent 7px 12px
            )`,
            mixBlendMode: "screen",
            opacity: 0.6,
          }}
        />
      </div>

      {/* === Layer 4: hairline gold piping just outside the band (sharp accent) === */}
      <div
        className="absolute top-[6%] bottom-[6%]"
        style={{
          [isLeft ? "right" : "left"]: "min(34px, 5vw)",
          width: "1px",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(210, 142, 41, 0.6) 12%, rgba(246, 182, 43, 0.85) 50%, rgba(210, 142, 41, 0.6) 88%, transparent 100%)",
          transform: isLeft ? "translateX(2px)" : "translateX(-2px)",
        }}
      />

      {/* === Layer 5: bottom hem detail — a faint inside-lining hint at the bottom === */}
      <div
        className="absolute bottom-0 inset-x-0 h-[3%]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, oklch(0.16 0.008 60 / 0.6) 50%, oklch(0.2 0.01 60 / 0.8) 100%)",
        }}
      />

      {/* === Layer 6: top neckline — a soft rounded shadow suggesting the collar curve === */}
      <div
        className="absolute top-0 inset-x-0 h-[7%]"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.06 0.003 60 / 0.85) 0%, oklch(0.1 0.005 60 / 0.4) 60%, transparent 100%)",
        }}
      />
    </div>
  );
}
