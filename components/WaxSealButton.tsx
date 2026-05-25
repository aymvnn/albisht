"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * The submission "button" — a wax seal that presses into the letter.
 *
 * Brand-spec design (per page 43–44 of the identity book):
 *  - Sealing-wax red disc (#6E1F1F → #4A1313)
 *  - Subtle ring impressed into the wax (no decorative ticks)
 *  - The actual ALBISHT calligraphy printed in pure white over the wax
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

      {/* Wax disc */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full transition-all duration-700"
        style={{
          transform: pressed ? "scale(0.9)" : "scale(1)",
          filter: pressed
            ? "drop-shadow(0 12px 24px rgba(74, 19, 19, 0.55))"
            : "drop-shadow(0 6px 14px rgba(0, 0, 0, 0.22))",
          transitionTimingFunction: "var(--ease-ceremonial)",
        }}
      >
        <defs>
          <radialGradient id="wax-disc" cx="42%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#8C2A2A" />
            <stop offset="55%" stopColor="#6E1F1F" />
            <stop offset="100%" stopColor="#4A1313" />
          </radialGradient>
        </defs>

        {/* Slightly irregular disc — wax that pooled and set */}
        <path
          d="M100 14
             C 138 14 168 36 178 72
             C 188 108 178 134 154 158
             C 134 178 116 188 96 184
             C 64 178 36 158 22 124
             C 12 96 18 64 42 38
             C 60 22 80 14 100 14 Z"
          fill="url(#wax-disc)"
        />

        {/* Inner embossed ring — subtle, two concentric circles */}
        <circle cx="100" cy="100" r="72" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="66" fill="none" stroke="rgba(0,0,0,0.30)" strokeWidth="0.5" />
      </svg>

      {/* Logo printed in pure white over the wax (white-on-dark variant per brand spec) */}
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
            style={{ opacity: 0.95 }}
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
