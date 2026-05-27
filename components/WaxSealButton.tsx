"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * The submission "button" — a ceremonial seal that presses into the letter.
 *
 * Brand-conform design (per official Zajel brand identity book):
 *  - Gold disc using the official brand gradient (#F6B62B → #D28E29 → #8E6B2E)
 *  - Subtle inner ring — embossed-into-metal feel
 *  - The ALBISHT calligraphic mark in WHITE on the gold — this matches
 *    the brand-book applications on pages 35, 40, 45 where the mark is
 *    consistently white on gold (mug, bag, visor mockups). Black on gold
 *    reads muddy because the gold is a mid-warm tone; white gives the
 *    contrast and crispness the brand book uses.
 *  - Press animation on click → scale 0.9 + deeper shadow
 */
export function WaxSealButton({
  label,
  pending = false,
  onClick,
  disabled = false,
}: {
  label: string;
  pending?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    if (disabled || pending) return;
    setPressed(true);
    onClick?.();
  };

  return (
    <button
      type="submit"
      onClick={handleClick}
      disabled={disabled || pending}
      className="group relative w-[180px] h-[180px] mx-auto disabled:cursor-not-allowed"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>

      {/* Gold disc */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full transition-all duration-700"
        style={{
          transform: pressed ? "scale(0.9)" : "scale(1)",
          filter: pressed
            ? "drop-shadow(0 14px 26px rgba(142, 107, 46, 0.45))"
            : "drop-shadow(0 6px 14px rgba(0, 0, 0, 0.18))",
          transitionTimingFunction: "var(--ease-ceremonial)",
        }}
      >
        <defs>
          {/* Brand gold gradient — bright highlight upper-left, deep gold lower-right */}
          <radialGradient id="seal-gold" cx="38%" cy="32%" r="72%">
            <stop offset="0%" stopColor="#F6B62B" />
            <stop offset="45%" stopColor="#E29F29" />
            <stop offset="75%" stopColor="#D28E29" />
            <stop offset="100%" stopColor="#8E6B2E" />
          </radialGradient>
        </defs>

        {/* Slightly irregular disc — a struck seal */}
        <path
          d="M100 14
             C 138 14 168 36 178 72
             C 188 108 178 134 154 158
             C 134 178 116 188 96 184
             C 64 178 36 158 22 124
             C 12 96 18 64 42 38
             C 60 22 80 14 100 14 Z"
          fill="url(#seal-gold)"
        />

        {/* Inner embossed ring — subtle, two concentric circles */}
        <circle cx="100" cy="100" r="72" fill="none" stroke="rgba(255,236,180,0.45)" strokeWidth="0.7" />
        <circle cx="100" cy="100" r="66" fill="none" stroke="rgba(80,55,15,0.35)" strokeWidth="0.5" />
      </svg>

      {/* Calligraphic mark printed in WHITE on the gold — matches the
          brand-book applications (mug, bag, visor pages 35, 40, 45). */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-700"
        style={{
          transform: pressed ? "scale(0.86)" : "scale(1)",
          transitionTimingFunction: "var(--ease-ceremonial)",
        }}
      >
        <div className="w-[68%] h-[68%] relative flex items-center justify-center">
          <Image
            src="/logo-light.png"
            alt=""
            width={260}
            height={143}
            className="object-contain"
            style={{
              opacity: 0.96,
              filter: "drop-shadow(0 1px 1px rgba(80, 55, 15, 0.35))",
            }}
          />
        </div>
      </div>

      {/* Label below the seal */}
      <span
        className="absolute inset-x-0 -bottom-14 type-roman text-[1rem] text-[color:var(--color-zari-deep)] tracking-[0.25em] transition-opacity duration-500"
        style={{ opacity: pressed ? 0 : 1 }}
      >
        {pending ? "..." : label}
      </span>
    </button>
  );
}
