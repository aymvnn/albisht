import Image from "next/image";

/**
 * The ALBISHT logo — the actual Diwani calligraphy mark "البِشت" with the
 * gold tassel-cord (the bisht's signature ornament) and gold ribbon underline.
 *
 * Two variants:
 *   - "dark"  → original (black calligraphy + gold) — for light/pearl surfaces
 *   - "light" → pearl calligraphy + gold — for dark/bisht surfaces
 *
 * The logo is a horizontal mark with an aspect ratio of ~1.82:1.
 * `height` is the controlling dimension; width is derived.
 */
export function Logo({
  height = 56,
  variant = "dark",
  className = "",
  priority = false,
}: {
  height?: number;
  variant?: "dark" | "light";
  className?: string;
  priority?: boolean;
}) {
  const src = variant === "light" ? "/logo-light.png" : "/logo-dark.png";
  // Original is 1600x878, ratio 1.82:1
  const width = Math.round(height * 1.82);
  return (
    <Image
      src={src}
      alt="ALBISHT — البِشت"
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={{ width: "auto", height: `${height}px` }}
    />
  );
}
