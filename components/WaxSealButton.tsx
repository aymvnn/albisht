"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * The submission "button" — not a button, a wax seal that closes.
 * The actual ALBISHT logo is impressed into the wax in gold (light variant on dark wax).
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

      {/* Wax blob */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full transition-all duration-700"
        style={{
          transform: pressed ? "scale(0.9)" : "scale(1)",
          filter: pressed
            ? "drop-shadow(0 10px 22px oklch(0.22 0.05 22 / 0.5))"
            : "drop-shadow(0 6px 14px oklch(0.135 0.005 60 / 0.22))",
          transitionTimingFunction: "var(--ease-ceremonial)",
        }}
      >
        <defs>
          <radialGradient id="wax-gradient" cx="42%" cy="32%" r="68%">
            <stop offset="0%" stopColor="oklch(0.48 0.13 22)" />
            <stop offset="55%" stopColor="oklch(0.32 0.08 22)" />
            <stop offset="100%" stopColor="oklch(0.20 0.05 22)" />
          </radialGradient>
          <radialGradient id="wax-edge-glow" cx="50%" cy="50%" r="50%">
            <stop offset="80%" stopColor="oklch(0.745 0.105 78 / 0)" />
            <stop offset="100%" stopColor="oklch(0.745 0.105 78 / 0.55)" />
          </radialGradient>
          {/* Slight irregular contour */}
          <filter id="wax-rough" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="3" />
          </filter>
        </defs>

        {/* Irregular wax blob */}
        <path
          d="M100 12 C 140 12 172 36 182 76 C 192 116 180 144 156 168 C 134 188 110 192 90 184 C 60 174 30 152 18 118 C 8 88 18 56 44 32 C 62 18 80 12 100 12 Z"
          fill="url(#wax-gradient)"
          filter="url(#wax-rough)"
        />

        {/* Embossed ring */}
        <circle cx="100" cy="100" r="68" fill="none" stroke="oklch(0.745 0.105 78 / 0.42)" strokeWidth="0.7" />
        <circle cx="100" cy="100" r="62" fill="none" stroke="oklch(0.745 0.105 78 / 0.3)" strokeWidth="0.5" />

        {/* Edge gold glow */}
        <circle cx="100" cy="100" r="96" fill="url(#wax-edge-glow)" />
      </svg>

      {/* The actual logo impressed in gold over the wax */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-700"
        style={{
          transform: pressed ? "scale(0.86)" : "scale(1)",
          transitionTimingFunction: "var(--ease-ceremonial)",
        }}
      >
        <div className="w-[72%] h-[72%] relative flex items-center justify-center">
          <Image
            src="/logo-light.png"
            alt=""
            width={260}
            height={143}
            className="object-contain"
            style={{
              filter:
                "drop-shadow(0 1px 0 oklch(0.18 0.04 22 / 0.7)) drop-shadow(0 0 8px oklch(0.745 0.105 78 / 0.4))",
              opacity: 0.92,
            }}
          />
        </div>
      </div>

      <span
        className="absolute inset-x-0 -bottom-12 type-roman text-[0.72rem] text-[color:var(--color-zari-deep)] tracking-[0.3em] transition-opacity duration-500"
        style={{ opacity: pressed ? 0 : 1 }}
      >
        {pending ? "..." : label}
      </span>
    </button>
  );
}
