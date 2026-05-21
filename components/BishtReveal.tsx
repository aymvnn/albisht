"use client";

import { useEffect, useRef, useState } from "react";
import { REVEAL_PHRASE } from "@/lib/copy";
import type { Lang } from "@/lib/i18n";
import { Logo } from "./Logo";

/**
 * The Bisht Reveal — the signature opening cinematic.
 *
 * Scene 0 (0–0.6s): black hold, seal breathes.
 * Scene 1 (0.6–2.4s): the cloak (a stylized SVG/shape composition) drapes into frame.
 * Scene 2 (2.4–3.8s): the cloak opens — left & right panels part outward, golden zari border
 *                     drawing itself along the parting line as it goes.
 * Scene 3 (3.8–5.0s): light pours through the parting, the phrase fades in, then the entire
 *                     overlay fades to reveal the hero.
 *
 * Once played per session (sessionStorage flag).
 */

const SESSION_KEY = "albisht.reveal.seen";

export function BishtReveal({ lang }: { lang: Lang }) {
  const [phase, setPhase] = useState<"black" | "drape" | "open" | "light" | "done" | "skip">(
    "black"
  );
  const [skipped, setSkipped] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const forceReplay = new URLSearchParams(window.location.search).has("intro");
    const alreadySeen = !forceReplay && sessionStorage.getItem(SESSION_KEY);

    if (reducedMotion || alreadySeen) {
      setPhase("done");
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");
    // Lock scroll during intro
    document.body.style.overflow = "hidden";

    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setPhase("drape"), 600));
    timers.push(setTimeout(() => setPhase("open"), 2400));
    timers.push(setTimeout(() => setPhase("light"), 3800));
    timers.push(
      setTimeout(() => {
        setPhase("done");
        document.body.style.overflow = "";
      }, 5400)
    );

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  const onSkip = () => {
    setSkipped(true);
    setPhase("done");
    document.body.style.overflow = "";
  };

  if (phase === "done") return null;

  const phrase = REVEAL_PHRASE[lang];
  const opening = phase === "open" || phase === "light";
  const lightOn = phase === "light";

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden"
      role="presentation"
      aria-hidden="true"
    >
      {/* Behind everything: the pearl world, faintly visible */}
      <div className="absolute inset-0 surface-marble" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.98 0.03 86 / 0.5) 0%, transparent 70%)",
          opacity: lightOn ? 1 : 0,
          transition: "opacity 1.4s var(--ease-veil)",
        }}
      />

      {/* Left bisht panel */}
      <div
        className="absolute top-0 bottom-0 left-0 w-1/2 surface-bisht"
        style={{
          transform: opening
            ? "translateX(-100%) skewY(-2deg)"
            : phase === "drape"
            ? "translateX(0) skewY(0deg)"
            : "translateX(-3%) skewY(-1deg)",
          transition: "transform 1.6s var(--ease-veil)",
          boxShadow: "inset -1px 0 0 oklch(0.7 0.12 80 / 0.4)",
        }}
      >
        {/* Inner zari embroidery edge */}
        <div
          className="absolute top-[12%] bottom-[12%] right-0 w-[3px]"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, var(--color-zari) 8%, var(--color-zari-bright) 50%, var(--color-zari) 92%, transparent 100%)",
            opacity: phase === "black" ? 0 : 1,
            transition: "opacity 0.8s ease-out 0.6s",
          }}
        />
        {/* Zari weave pattern accent */}
        <div
          className="absolute top-[14%] bottom-[14%] right-[8px] w-[1px] opacity-50"
          style={{
            background:
              "repeating-linear-gradient(180deg, var(--color-zari) 0 8px, transparent 8px 14px)",
          }}
        />
      </div>

      {/* Right bisht panel */}
      <div
        className="absolute top-0 bottom-0 right-0 w-1/2 surface-bisht"
        style={{
          transform: opening
            ? "translateX(100%) skewY(2deg)"
            : phase === "drape"
            ? "translateX(0) skewY(0deg)"
            : "translateX(3%) skewY(1deg)",
          transition: "transform 1.6s var(--ease-veil)",
          boxShadow: "inset 1px 0 0 oklch(0.7 0.12 80 / 0.4)",
        }}
      >
        <div
          className="absolute top-[12%] bottom-[12%] left-0 w-[3px]"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, var(--color-zari) 8%, var(--color-zari-bright) 50%, var(--color-zari) 92%, transparent 100%)",
            opacity: phase === "black" ? 0 : 1,
            transition: "opacity 0.8s ease-out 0.6s",
          }}
        />
        <div
          className="absolute top-[14%] bottom-[14%] left-[8px] w-[1px] opacity-50"
          style={{
            background:
              "repeating-linear-gradient(180deg, var(--color-zari) 0 8px, transparent 8px 14px)",
          }}
        />
      </div>

      {/* Center logo + phrase (during dark/drape/open phases) */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-8"
        style={{
          opacity: lightOn ? 0 : 1,
          transition: "opacity 1.2s var(--ease-veil)",
        }}
      >
        <div
          style={{
            transform: phase === "black" ? "scale(0.94)" : "scale(1)",
            opacity: phase === "black" ? 0.25 : 1,
            transition: "all 1.4s var(--ease-ceremonial)",
          }}
        >
          <Logo height={140} variant="light" />
        </div>
        <p
          className={`mt-12 ${
            lang === "ar" ? "type-arabic" : "type-serif"
          } text-[color:var(--color-zari)] text-lg md:text-xl italic tracking-wide max-w-md`}
          style={{
            opacity: phase === "drape" || phase === "open" ? 0.95 : 0,
            transform:
              phase === "drape" || phase === "open" ? "translateY(0)" : "translateY(10px)",
            transition: "all 1.4s var(--ease-ceremonial) 0.4s",
          }}
        >
          {phrase}
        </p>
      </div>

      {/* Final light reveal — logo in dark/original to sit on the pearl light */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-8"
        style={{
          opacity: lightOn ? 1 : 0,
          transition: "opacity 1.4s var(--ease-veil) 0.2s",
        }}
      >
        <Logo height={110} variant="dark" />
      </div>

      {/* Skip button */}
      {!skipped && phase !== "black" && (
        <button
          type="button"
          onClick={onSkip}
          className="absolute top-6 right-6 type-roman text-[0.66rem] text-[color:var(--color-mist)] hover:text-[color:var(--color-zari)] transition-colors px-3 py-2 z-[101]"
        >
          {lang === "ar" ? "تخطّي" : "Skip"}
        </button>
      )}
    </div>
  );
}
