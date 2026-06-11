"use client";

/**
 * JournalGrid — the journal index card grid, now opening a reading-room view.
 *
 * The previous grid linked every card to "#", a dead end. Until the journal
 * has dedicated article pages, each card instead opens the shared Lightbox
 * with the entry's photograph, title and kicker — letting a visitor dwell on
 * the piece without being sent nowhere. The card design is unchanged: the
 * interactive element simply became a button instead of a link, so keyboard
 * and screen-reader users get honest semantics (a button that opens a
 * dialog, not a link that pretends to navigate).
 *
 * All motion here is CSS transitions, which the global stylesheet already
 * collapses under prefers-reduced-motion; the Lightbox handles its own.
 */

import { useMemo, useState } from "react";
import Image from "next/image";
import type { Lang } from "@/lib/i18n";
import { Lightbox, type LightboxItem } from "@/components/Lightbox";

type JournalEntry = {
  slug: string;
  kicker: string;
  title: string;
  excerpt: string;
  photo: string;
};

export function JournalGrid({
  lang,
  entries,
}: {
  lang: Lang;
  entries: JournalEntry[];
}) {
  // null means the reading room is closed; a number is the open entry's index.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // The Lightbox receives the full set so prev/next moves between entries.
  // Title and kicker ride along as the overlay's caption and meta line.
  const items = useMemo<LightboxItem[]>(
    () => entries.map((e) => ({ src: e.photo, title: e.title, meta: e.kicker })),
    [entries]
  );

  return (
    <>
      <ul className="grid md:grid-cols-3 gap-12">
        {entries.map((e, i) => (
          <li key={e.slug}>
            {/* text-start keeps the card's natural alignment in both LTR and RTL. */}
            <button
              type="button"
              data-view
              aria-label={e.title}
              className="block w-full text-start group press-dim"
              onClick={() => setOpenIndex(i)}
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-6">
                <Image
                  src={e.photo}
                  alt={e.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                />
              </div>
              <p className="type-roman text-[0.92rem] text-[color:var(--color-zari-deep)] mb-3">
                {e.kicker}
              </p>
              <h2
                className={`${
                  lang === "ar" ? "type-arabic-headline" : "type-display"
                } text-[color:var(--color-ink)] text-2xl md:text-3xl mb-3 group-hover:text-[color:var(--color-zari-deep)] transition-colors`}
              >
                {e.title}
              </h2>
              <p
                className={`${
                  lang === "ar" ? "type-arabic" : "type-serif"
                } text-[color:var(--color-ink-warm)] text-lg leading-relaxed`}
              >
                {e.excerpt}
              </p>
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <Lightbox
          items={items}
          index={openIndex}
          lang={lang}
          onClose={() => setOpenIndex(null)}
          onIndex={setOpenIndex}
        />
      )}
    </>
  );
}
