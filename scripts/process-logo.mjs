import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "..", "public", "logo.png");
const OUT_DARK = join(__dirname, "..", "public", "logo-dark.png");   // original recoloured for light surfaces
const OUT_LIGHT = join(__dirname, "..", "public", "logo-light.png"); // pearl + gold for dark surfaces

const TARGET_WIDTH = 1600;

// Brand spec: on dark backgrounds (and over photos with scrim) the logo is
// rendered in PURE WHITE — no gold accents. Both the calligraphy (black in
// the source) and the tassels/ribbon (gold in the source) become white.
const WHITE = { r: 255, g: 255, b: 255 };

// Read raw pixels
const img = sharp(SRC).resize({ width: TARGET_WIDTH });
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
console.log(`Source: ${width}x${height} ${channels}ch`);

// Buffer for the "light" recolour
const lightBuf = Buffer.alloc(data.length);

for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const a = channels === 4 ? data[i + 3] : 255;

  // Classify pixel:
  // - "black-ish" (calligraphy): low luminance, low yellow content → make pearl
  // - "gold-ish" (tassels, ribbon): higher red, moderate green, low blue → keep/brighten
  // - transparent: keep

  const isTransparent = a < 8;
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  const yellowness = (r + g) / 2 - b;

  if (isTransparent) {
    lightBuf[i] = 0;
    lightBuf[i + 1] = 0;
    lightBuf[i + 2] = 0;
    if (channels === 4) lightBuf[i + 3] = 0;
    continue;
  }

  // Both black calligraphy AND gold decorations → pure WHITE.
  // The original alpha is preserved for the stroke shape; gold pixels also become
  // fully opaque white because they're part of the same brand mark.
  const isGold = yellowness > 35 && r > 130;
  const isInk = lum < 200;

  if (isGold) {
    // Gold pixel — full white, preserve original alpha.
    lightBuf[i] = WHITE.r;
    lightBuf[i + 1] = WHITE.g;
    lightBuf[i + 2] = WHITE.b;
    if (channels === 4) lightBuf[i + 3] = a;
  } else if (isInk) {
    // Black/grey calligraphy stroke — full white with darkness as alpha mask.
    let inkness;
    if (lum < 140) inkness = 1;
    else if (lum > 220) inkness = 0;
    else inkness = 1 - (lum - 140) / 80;
    const out_a = Math.round(a * inkness);
    if (out_a < 4) {
      lightBuf[i] = 0;
      lightBuf[i + 1] = 0;
      lightBuf[i + 2] = 0;
      if (channels === 4) lightBuf[i + 3] = 0;
    } else {
      lightBuf[i] = WHITE.r;
      lightBuf[i + 1] = WHITE.g;
      lightBuf[i + 2] = WHITE.b;
      if (channels === 4) lightBuf[i + 3] = out_a;
    }
  } else {
    // Effectively background — transparent.
    lightBuf[i] = 0;
    lightBuf[i + 1] = 0;
    lightBuf[i + 2] = 0;
    if (channels === 4) lightBuf[i + 3] = 0;
  }
}

// Write the "dark" (original) optimised version for light surfaces
await sharp(SRC)
  .resize({ width: TARGET_WIDTH })
  .png({ compressionLevel: 9, palette: false })
  .toFile(OUT_DARK);

// Write the recoloured "light" version for dark surfaces
await sharp(lightBuf, { raw: { width, height, channels } })
  .png({ compressionLevel: 9 })
  .toFile(OUT_LIGHT);

console.log(`Wrote ${OUT_DARK}`);
console.log(`Wrote ${OUT_LIGHT}`);
