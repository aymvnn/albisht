import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

// Open Graph card for every page under /[lang] — Next.js cascades a segment's
// metadata image down to all child routes, so this single file covers the site.
//
// The card is deliberately text-free: the calligraphic mark IS the brand name,
// legible in both reading directions, and satori needs no font data when no
// string children are rendered. That keeps this route dependency-free and
// immune to font-loading failures at the edge of the build.

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "ALBISHT — البِشت";

// The same gradient the site uses for hairlines: zari gold swelling to bright
// gold at the center and dissolving into the black field on both ends.
const hairline =
  "linear-gradient(90deg, transparent, #D28E29 30%, #F6B62B 50%, #D28E29 70%, transparent)";

export default async function Image() {
  // Read the mark at request time. The SVG carries its own gold gradient, so
  // embedding it as a data URI preserves the exact brand artwork without any
  // re-rendering on our side. Source is 445.066 × 244.666, hence 460 × 253.
  let markSrc: string | null = null;
  try {
    const svg = await readFile(
      join(process.cwd(), "public", "logo", "albisht-mark-gradient.svg"),
      "utf8"
    );
    markSrc = "data:image/svg+xml;base64," + Buffer.from(svg).toString("base64");
  } catch {
    // If the asset is unreachable we still serve the card — black field,
    // hairlines and ornament alone. A degraded card beats a 500 on every share.
    markSrc = null;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundColor: "#000000",
        }}
      >
        {/* Subtle radial warmth behind the mark — a candle-glow, not a spotlight. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            background:
              "radial-gradient(ellipse at center, rgba(226,159,41,0.10), transparent 65%)",
          }}
        />

        {/* Top hairline — frames the field the way the site's zari lines do. */}
        <div
          style={{
            position: "absolute",
            top: 72,
            left: "19%",
            width: "62%",
            height: 2,
            display: "flex",
            background: hairline,
          }}
        />

        {/* The calligraphic mark, centered — it carries the whole card. */}
        {markSrc ? (
          <img src={markSrc} width={460} height={253} alt="" />
        ) : null}

        {/* Ornament row between the mark and the bottom hairline:
            dot — line — dot, the seal-divider motif at card scale. */}
        <div
          style={{
            position: "absolute",
            bottom: 124,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: 9999,
              display: "flex",
              backgroundColor: "#D28E29",
            }}
          />
          <div
            style={{
              width: 180,
              height: 1,
              display: "flex",
              background: hairline,
            }}
          />
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: 9999,
              display: "flex",
              backgroundColor: "#D28E29",
            }}
          />
        </div>

        {/* Bottom hairline, mirroring the top — the frame closes. */}
        <div
          style={{
            position: "absolute",
            bottom: 72,
            left: "19%",
            width: "62%",
            height: 2,
            display: "flex",
            background: hairline,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
