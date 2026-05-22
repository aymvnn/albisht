/**
 * The ALBISHT signature decorative motif: a flowing black-silk + gold-zari ribbon.
 *
 * Used throughout the official brand identity book on:
 *  - Back of business cards
 *  - Footer of letterhead / invoice / envelope
 *  - Folder covers
 *  - Coffee cups / mugs / paper bags
 *
 * Two black silk "bands" curve diagonally; between them a denser bundle of gold
 * zari threads sweeps in parallel. The whole motif suggests the bisht in motion —
 * the cloak as it parts, the embroidery catching the light.
 *
 * Rendered as a pure SVG so it stays crisp at any size and remains a tiny payload.
 */
export function SilkRibbon({
  className = "",
  variant = "horizontal",
  intensity = "normal",
}: {
  className?: string;
  /** "horizontal" sweeps left-to-right (footer band). "diagonal" curves bottom-left → top-right. */
  variant?: "horizontal" | "diagonal";
  /** "subtle" reduces opacity for use behind text; "normal" full presence. */
  intensity?: "subtle" | "normal";
}) {
  const opacity = intensity === "subtle" ? 0.55 : 1;

  // Two layouts share the same fill recipe; only the path geometry differs.
  if (variant === "diagonal") {
    return (
      <svg
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid meet"
        className={className}
        aria-hidden="true"
        style={{ opacity }}
      >
        <Defs />
        {/* Upper black silk band */}
        <path
          d="M -40 320 C 120 200, 280 160, 460 90 C 520 70, 580 50, 640 30 L 640 -40 L -40 -40 Z"
          fill="url(#silk-black-grad)"
        />
        <path
          d="M -40 320 C 120 200, 280 160, 460 90 C 520 70, 580 50, 640 30"
          stroke="url(#silk-highlight)"
          strokeWidth="2"
          fill="none"
          opacity="0.55"
        />
        {/* Gold zari band */}
        <path
          d="M -40 380 C 140 250, 320 210, 500 130 C 560 105, 600 95, 640 90 L 640 60 C 600 65, 560 80, 500 100 C 320 175, 140 215, -40 340 Z"
          fill="url(#zari-band-grad)"
        />
        {/* Zari weave detail — diagonal strokes within the band */}
        <g opacity="0.5" mask="url(#zari-mask-diag)">
          <DiagonalHatch />
        </g>
        {/* Lower black silk band (catches the gold) */}
        <path
          d="M -40 440 C 160 320, 340 270, 520 180 C 580 155, 620 145, 640 140 L 640 440 Z"
          fill="url(#silk-black-grad)"
          opacity="0.85"
        />
        <ZariMaskDef variant="diagonal" />
      </svg>
    );
  }

  // horizontal (default) — for footer / divider bands
  return (
    <svg
      viewBox="0 0 1200 200"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      style={{ opacity }}
    >
      <Defs />
      {/* Upper black silk wave */}
      <path
        d="M -20 70 C 200 30, 400 110, 600 70 C 800 30, 1000 110, 1220 70 L 1220 -20 L -20 -20 Z"
        fill="url(#silk-black-grad)"
      />
      <path
        d="M -20 70 C 200 30, 400 110, 600 70 C 800 30, 1000 110, 1220 70"
        stroke="url(#silk-highlight)"
        strokeWidth="1.6"
        fill="none"
        opacity="0.55"
      />
      {/* Gold zari band — the centre of the swoosh */}
      <path
        d="M -20 120 C 200 80, 400 160, 600 120 C 800 80, 1000 160, 1220 120 L 1220 90 C 1000 130, 800 50, 600 90 C 400 130, 200 50, -20 90 Z"
        fill="url(#zari-band-grad)"
      />
      <g opacity="0.5" mask="url(#zari-mask-horiz)">
        <DiagonalHatch />
      </g>
      {/* Lower black silk wave (anchors the bottom edge) */}
      <path
        d="M -20 180 C 200 150, 400 220, 600 180 C 800 140, 1000 220, 1220 180 L 1220 220 L -20 220 Z"
        fill="url(#silk-black-grad)"
        opacity="0.9"
      />
      <ZariMaskDef variant="horizontal" />
    </svg>
  );
}

/* === Shared gradient + texture definitions ================================ */

function Defs() {
  return (
    <defs>
      <linearGradient id="silk-black-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1A1A1A" />
        <stop offset="50%" stopColor="#000000" />
        <stop offset="100%" stopColor="#1A1A1A" />
      </linearGradient>
      <linearGradient id="silk-highlight" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.35)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
      {/* Brand-gold gradient: #D28E29 → #F6B62B → #E29F29 → #B07418 */}
      <linearGradient id="zari-band-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#B07418" />
        <stop offset="20%" stopColor="#D28E29" />
        <stop offset="50%" stopColor="#F6B62B" />
        <stop offset="80%" stopColor="#E29F29" />
        <stop offset="100%" stopColor="#B07418" />
      </linearGradient>
    </defs>
  );
}

function DiagonalHatch() {
  // Render a thick diagonal stripe pattern across the whole canvas; the mask
  // clips it to just the zari band shape so the weave shows only inside the gold.
  return (
    <g>
      <pattern id="zari-stripes" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
        <rect width="2" height="6" fill="rgba(0,0,0,0.5)" />
        <rect x="3" width="1" height="6" fill="rgba(255,235,180,0.4)" />
      </pattern>
      <rect x="-100" y="-100" width="1400" height="600" fill="url(#zari-stripes)" />
    </g>
  );
}

function ZariMaskDef({ variant }: { variant: "horizontal" | "diagonal" }) {
  return (
    <defs>
      {variant === "horizontal" ? (
        <mask id="zari-mask-horiz">
          <rect width="1200" height="200" fill="black" />
          <path
            d="M -20 120 C 200 80, 400 160, 600 120 C 800 80, 1000 160, 1220 120 L 1220 90 C 1000 130, 800 50, 600 90 C 400 130, 200 50, -20 90 Z"
            fill="white"
          />
        </mask>
      ) : (
        <mask id="zari-mask-diag">
          <rect width="600" height="400" fill="black" />
          <path
            d="M -40 380 C 140 250, 320 210, 500 130 C 560 105, 600 95, 640 90 L 640 60 C 600 65, 560 80, 500 100 C 320 175, 140 215, -40 340 Z"
            fill="white"
          />
        </mask>
      )}
    </defs>
  );
}
