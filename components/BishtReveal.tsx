"use client";

import { useEffect, useRef, useState } from "react";
import { REVEAL_PHRASE } from "@/lib/copy";
import type { Lang } from "@/lib/i18n";
import { Logo } from "./Logo";

/**
 * The Bisht Reveal — the signature opening cinematic.
 *
 * Phases:
 *  - "closed":    The full bisht is rendered closed (two dark panels with thick golden
 *                 zari bands meeting in the centre). Logo + phrase appear over the
 *                 closed cloak. A subtle prompt invites the visitor to scroll/click/tap.
 *  - "opening":   The two panels part outward, gold bands trailing on the inner edges.
 *  - "revealed":  Light pours through; the brand mark settles in dark over the pearl.
 *  - "done":      The overlay is removed and scroll is released.
 *
 * Triggers (in "closed" phase, whichever first):
 *  - scroll (wheel/touch)
 *  - click anywhere on the overlay
 *  - Enter / Space keypress (Esc skips)
 *
 * Plays every time the home page mounts. Only skipped when the user has
 * `prefers-reduced-motion: reduce` set.
 */

type Phase = "closed" | "opening" | "revealed" | "done";

export function BishtReveal({ lang }: { lang: Lang }) {
  const [phase, setPhase] = useState<Phase>("done");
  const startedRef = useRef(false);

  // Decide whether to play or skip the reveal — only on first mount, client side.
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
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
      // sequence to "revealed" then "done"
      setTimeout(() => setPhase("revealed"), 1600);
      setTimeout(() => {
        setPhase("done");
        document.body.style.overflow = "";
      }, 3200);
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

  const phrase = REVEAL_PHRASE[lang];
  const opening = phase === "opening" || phase === "revealed";
  const lightOn = phase === "revealed";

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden cursor-pointer select-none"
      role="presentation"
      aria-hidden="true"
    >
      {/* === BEHIND THE CLOAK: the pearl-light world === */}
      <div className="absolute inset-0 surface-marble" />
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

      {/* === CENTRE: logo + phrase + prompt during closed state === */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-8"
        style={{
          opacity: lightOn ? 0 : 1,
          transition: "opacity 0.9s var(--ease-veil)",
        }}
      >
        <div
          className="relative transition-all"
          style={{
            transform: opening
              ? "scale(1.08) translateY(-30px)"
              : "scale(1)",
            opacity: opening ? 0 : 1,
            transitionDuration: "1.4s",
            transitionTimingFunction: "var(--ease-ceremonial)",
          }}
        >
          {/* Soft dark radial glow behind logo + phrase — so the white logo
              and gold phrase read against the busy gold brocade band. */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: "min(720px, 92vw)",
              height: "min(520px, 78vh)",
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.18) 65%, transparent 100%)",
              filter: "blur(8px)",
              zIndex: 0,
            }}
          />
          <div className="relative" style={{ zIndex: 1 }}>
            <Logo height={150} variant="light" />
            <p
              className={`mt-12 ${
                lang === "ar" ? "type-arabic" : "type-serif"
              } text-[color:var(--color-zari)] text-xl md:text-2xl italic tracking-wide max-w-md mx-auto`}
              style={{
                opacity: 1,
                textShadow:
                  "0 0 22px rgba(0,0,0,0.85), 0 0 12px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.9)",
              }}
            >
              {phrase}
            </p>
          </div>
        </div>

        {/* Prompt: subtle, only in closed state */}
        <div
          className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-3"
          style={{
            opacity: phase === "closed" ? 1 : 0,
            transition: "opacity 0.8s ease-out",
            transitionDelay: phase === "closed" ? "0.8s" : "0s",
          }}
        >
          <span className="block w-px h-10 bg-gradient-to-b from-[color:var(--color-zari)]/0 via-[color:var(--color-zari)]/70 to-[color:var(--color-zari)]/0" />
          <span
            className={`${
              lang === "ar" ? "type-arabic" : "type-roman"
            } text-[0.72rem] text-[color:var(--color-zari)]/90 tracking-[0.32em]`}
            style={{ letterSpacing: lang === "ar" ? 0 : "0.32em" }}
          >
            {lang === "ar" ? "اِفتَح ـ بمَسحٍ أو لَمسة" : "Scroll or tap to enter"}
          </span>
        </div>
      </div>

      {/* === FINAL LIGHT REVEAL: dark logo on pearl === */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-8"
        style={{
          opacity: lightOn ? 1 : 0,
          transition: "opacity 1.2s var(--ease-veil) 0.3s",
        }}
      >
        <Logo height={120} variant="dark" />
      </div>

      {/* Skip button — top right corner, fades in after a moment */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setPhase("done");
          document.body.style.overflow = "";
        }}
        className="absolute top-6 right-6 z-[101] type-roman force-latin text-[0.66rem] text-[color:var(--color-pearl)]/55 hover:text-[color:var(--color-zari)] transition-colors px-3 py-2"
        style={{
          opacity: phase === "closed" ? 1 : 0,
          transition: "opacity 0.8s ease-out 1.5s",
          pointerEvents: phase === "closed" ? "auto" : "none",
        }}
      >
        Skip
      </button>
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

      {/* === Layer 3: THE ZARI BAND ─ thick brocade edging === */}
      {/* Anchored to the inner edge (right side of left panel; left side of right panel) */}
      <div
        className="absolute top-[6%] bottom-[6%]"
        style={{
          [isLeft ? "right" : "left"]: 0,
          width: "min(34px, 5vw)",
          minWidth: "20px",
          // Brocade gradient: dark gold ↔ bright gold ↔ dark gold across the width
          background: `
            linear-gradient(${isLeft ? "270deg" : "90deg"},
              oklch(0.42 0.06 60) 0%,
              oklch(0.6 0.09 72) 16%,
              oklch(0.78 0.115 80) 40%,
              oklch(0.82 0.115 84) 55%,
              oklch(0.6 0.09 72) 80%,
              oklch(0.4 0.05 60) 100%
            )
          `,
          boxShadow: isLeft
            ? "inset -1px 0 0 oklch(0.88 0.1 84 / 0.7), inset 1px 0 0 oklch(0.45 0.05 60 / 0.6), -2px 0 8px -2px oklch(0.74 0.105 78 / 0.45)"
            : "inset 1px 0 0 oklch(0.88 0.1 84 / 0.7), inset -1px 0 0 oklch(0.45 0.05 60 / 0.6), 2px 0 8px -2px oklch(0.74 0.105 78 / 0.45)",
        }}
      >
        {/* Brocade weave pattern — diagonal hatching layered on the gradient */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg,
                oklch(0.36 0.05 60 / 0.55) 0 1.5px,
                transparent 1.5px 3.5px
              ),
              repeating-linear-gradient(-45deg,
                oklch(0.88 0.1 84 / 0.35) 0 1px,
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
              oklch(0.92 0.11 86 / 0.4) 6px 7px,
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
            "linear-gradient(180deg, transparent 0%, oklch(0.7 0.1 78 / 0.6) 12%, oklch(0.8 0.11 82 / 0.85) 50%, oklch(0.7 0.1 78 / 0.6) 88%, transparent 100%)",
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
