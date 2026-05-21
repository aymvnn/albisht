import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "..", "public", "logo.png");
const OUT_DARK = join(__dirname, "..", "public", "logo-dark.png");   // original recoloured for light surfaces
const OUT_LIGHT = join(__dirname, "..", "public", "logo-light.png"); // pearl + gold for dark surfaces

const TARGET_WIDTH = 1600;

// Pearl color (target for "black" recolour on dark surfaces)
const PEARL = { r: 245, g: 240, b: 230 };
// Brighten gold slightly on dark surfaces
const GOLD_DARK_BG = { r: 217, g: 175, b: 92 };  // a touch brighter than zari

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
  const yellowness = (r + g) / 2 - b; // high when gold

  if (isTransparent) {
    lightBuf[i] = 0;
    lightBuf[i + 1] = 0;
    lightBuf[i + 2] = 0;
    if (channels === 4) lightBuf[i + 3] = 0;
    continue;
  }

  // GOLD: yellowness > ~40 and r > 130
  if (yellowness > 35 && r > 130) {
    // Blend toward GOLD_DARK_BG (brighten a touch)
    lightBuf[i] = Math.min(255, Math.round(r * 0.65 + GOLD_DARK_BG.r * 0.35));
    lightBuf[i + 1] = Math.min(255, Math.round(g * 0.65 + GOLD_DARK_BG.g * 0.35));
    lightBuf[i + 2] = Math.min(255, Math.round(b * 0.65 + GOLD_DARK_BG.b * 0.35));
    if (channels === 4) lightBuf[i + 3] = a;
  } else {
    // BLACK-ish → replace with pearl with strong opacity to keep the calligraphy crisp.
    // Below lum 140 = full pearl (the strokes), 140-220 = ramp, >220 transparent.
    let blackness;
    if (lum < 140) blackness = 1;
    else if (lum > 220) blackness = 0;
    else blackness = 1 - (lum - 140) / 80;
    const out_a = Math.round(a * blackness);
    if (out_a < 4) {
      lightBuf[i] = 0;
      lightBuf[i + 1] = 0;
      lightBuf[i + 2] = 0;
      if (channels === 4) lightBuf[i + 3] = 0;
    } else {
      lightBuf[i] = PEARL.r;
      lightBuf[i + 1] = PEARL.g;
      lightBuf[i + 2] = PEARL.b;
      if (channels === 4) lightBuf[i + 3] = out_a;
    }
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
