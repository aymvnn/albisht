/**
 * The ALBISHT signature decorative motif: a flowing gold-zari ribbon.
 *
 * Used throughout the official brand identity book on:
 *  - Back of business cards
 *  - Footer of letterhead / invoice / envelope
 *  - Folder covers
 *  - Coffee cups / mugs / paper bags
 *
 * Rendered as a single gold band that sweeps across the canvas. On dark
 * surfaces the band reads as a pure gold flow — no background "box" of
 * silk-black behind it (those black silk layers had been baked in to the
 * earlier brand-print mockups, but on a digital dark surface they showed
 * up as faint grey shapes that made the ribbon look "pasted on"). The
 * band is rendered with transparent surroundings so it flows as part of
 * the surface it sits on.
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
  const opacity = intensity === "subtle" ? 0.7 : 1;

  // Warm gold halo echoing the opening BishtReveal's luminous zari ("nfs dakhlat
  // al-mawqi'") — gentle behind text, fuller as the footer signature band.
  const glow =
    intensity === "subtle"
      ? "drop-shadow(0 0 3px rgba(246, 182, 43, 0.30))"
      : "drop-shadow(0 0 4px rgba(246, 182, 43, 0.55)) drop-shadow(0 0 13px rgba(226, 159, 41, 0.30))";

  // Diagonal variant — gold zari band on transparent ground
  if (variant === "diagonal") {
    return (
      <svg
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid meet"
        className={className}
        aria-hidden="true"
        style={{ opacity, filter: glow }}
      >
        <Defs />
        {/* Gold zari band — single flowing element, transparent surroundings */}
        <path
          d="M -40 380 C 140 250, 320 210, 500 130 C 560 105, 600 95, 640 90 L 640 60 C 600 65, 560 80, 500 100 C 320 175, 140 215, -40 340 Z"
          fill="url(#zari-band-grad)"
        />
        {/* Zari weave detail — diagonal strokes within the band */}
        <g opacity="0.5" mask="url(#zari-mask-diag)">
          <DiagonalHatch />
        </g>
        {/* Hairline highlight along the top edge of the band — catches light */}
        <path
          d="M -40 380 C 140 250, 320 210, 500 130 C 560 105, 600 95, 640 90"
          stroke="url(#silk-highlight)"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
        {/* Shadowed inner edge — raised woven thickness. */}
        <path
          d="M 640 60 C 600 65, 560 80, 500 100 C 320 175, 140 215, -40 340"
          stroke="#5E461B"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />
        <ZariMaskDef variant="diagonal" />
      </svg>
    );
  }

  // Horizontal (default) — gold zari band, transparent surroundings
  return (
    <svg
      viewBox="0 0 1200 200"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      style={{ opacity, filter: glow }}
    >
      <Defs />
      {/* Gold zari band — the flowing swoosh, on transparent ground */}
      <path
        d="M -20 120 C 200 80, 400 160, 600 120 C 800 80, 1000 160, 1220 120 L 1220 90 C 1000 130, 800 50, 600 90 C 400 130, 200 50, -20 90 Z"
        fill="url(#zari-band-grad)"
      />
      {/* Zari weave detail — diagonal strokes within the band */}
      <g opacity="0.5" mask="url(#zari-mask-horiz)">
        <DiagonalHatch />
      </g>
      {/* Hairline highlight along the band's top — micro light catch */}
      <path
        d="M -20 90 C 200 50, 400 130, 600 90 C 800 50, 1000 130, 1220 90"
        stroke="url(#silk-highlight)"
        strokeWidth="1"
        fill="none"
        opacity="0.55"
      />
      {/* Shadowed lower lip — gives the band a raised, woven thickness. */}
      <path
        d="M -20 120 C 200 80, 400 160, 600 120 C 800 80, 1000 160, 1220 120"
        stroke="#5E461B"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
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
      {/* Brand-gold brocade gradient — deep zari edges with a luminous centre
          catch, matching the bisht-reveal panels' #8E6B2E↔#F6B62B range. */}
      <linearGradient id="zari-band-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#7A5A22" />
        <stop offset="14%" stopColor="#C98A2C" />
        <stop offset="34%" stopColor="#F6B62B" />
        <stop offset="50%" stopColor="#FBE3A6" />
        <stop offset="66%" stopColor="#F6B62B" />
        <stop offset="86%" stopColor="#C98A2C" />
        <stop offset="100%" stopColor="#7A5A22" />
      </linearGradient>
    </defs>
  );
}

function DiagonalHatch() {
  // Render a thick diagonal stripe pattern across the whole canvas; the mask
  // clips it to just the zari band shape so the weave shows only inside the gold.
  return (
    <g>
      {/* Primary zari threads — dark warp with a fine gold weft. */}
      <pattern id="zari-stripes" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(45)">
        <rect width="1.5" height="5" fill="rgba(70,45,12,0.55)" />
        <rect x="2.5" width="1" height="5" fill="rgba(255,238,190,0.45)" />
      </pattern>
      {/* Crossing gold thread — turns the single hatch into a woven brocade. */}
      <pattern id="zari-stripes-cross" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(-45)">
        <rect x="2" width="1" height="5" fill="rgba(255,228,150,0.30)" />
      </pattern>
      <rect x="-100" y="-100" width="1400" height="600" fill="url(#zari-stripes)" />
      <rect x="-100" y="-100" width="1400" height="600" fill="url(#zari-stripes-cross)" />
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
