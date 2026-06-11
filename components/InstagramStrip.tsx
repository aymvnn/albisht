import Image from "next/image";
import { INSTAGRAM } from "@/lib/contact";
import type { Lang } from "@/lib/i18n";

/**
 * InstagramStrip — a quiet, curated row of six photographs that opens the
 * atelier's Instagram. Server component: the strip is purely declarative;
 * the only motion is a CSS hover (slow ceremonial zoom + a faint veil),
 * which the global reduced-motion rules already collapse.
 *
 * Every cell links to the same profile — the strip is an invitation to
 * follow, not an embedded feed, so no API calls and no client JS.
 */
export function InstagramStrip({
  lang,
  photos,
}: {
  lang: Lang;
  photos: string[];
}) {
  return (
    <section
      aria-label={
        lang === "ar"
          ? `إنستغرام — ${INSTAGRAM.handle}`
          : `Instagram — ${INSTAGRAM.handle}`
      }
      className="relative surface-pearl py-16 md:py-20 border-t border-[color:var(--color-ink-warm)]/15"
    >
      <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12">
        {/* Header row — the handle framed by two gold hairlines, in the same
            centred-eyebrow rhythm used across the site. The handle keeps its
            Latin face inside RTL pages via .force-latin. */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="block w-12 h-px bg-[color:var(--color-zari)]" aria-hidden="true" />
          <a
            href={INSTAGRAM.url}
            target="_blank"
            rel="noopener noreferrer"
            className="force-latin type-roman"
            style={{
              fontSize: "0.95rem",
              color: "var(--color-zari)",
              letterSpacing: "0.22em",
            }}
          >
            {INSTAGRAM.handle}
          </a>
          <span className="block w-12 h-px bg-[color:var(--color-zari)]" aria-hidden="true" />
        </div>

        {/* The strip — six square cells, three per row on mobile so the grid
            stays balanced, one row of six on desktop. Each cell is a single
            link to the profile; alt stays empty because the aria-label on
            the anchor already names the destination. */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {photos.map((src) => (
            <a
              key={src}
              href={INSTAGRAM.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden press-dim"
              aria-label={`Instagram — ${INSTAGRAM.handle}`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 768px) 33vw, 16vw"
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                style={{ transitionTimingFunction: "var(--ease-ceremonial)" }}
              />
              {/* Hover veil — a slow darkening that reads as a held breath
                  rather than a highlight. Decorative only. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition duration-700"
                style={{ transitionTimingFunction: "var(--ease-ceremonial)" }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
