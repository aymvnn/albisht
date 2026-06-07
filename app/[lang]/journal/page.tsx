import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LANGS, type Lang } from "@/lib/i18n";
import { USE_STORYBLOK } from "@/lib/storyblok/api";
import { getStoryList } from "@/lib/storyblok/fetch";
import { mapJournalList } from "@/lib/content/from-storyblok";
import type { SbJournalEntry } from "@/lib/storyblok/types";
import { ContactCallout } from "@/components/ContactCallout";
import { PageHero } from "@/components/PageHero";

export const revalidate = 900;

export default async function JournalPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!LANGS.includes(rawLang as Lang)) notFound();
  const lang = rawLang as Lang;

  const stories = USE_STORYBLOK
    ? await getStoryList<SbJournalEntry>({ starts_with: "journal/", sort_by: "created_at:asc" }, lang)
    : [];
  const j = mapJournalList(stories.length ? stories.map((s) => s.content) : null, lang);
  const entries = j.entries;

  return (
    <>
      <PageHero lang={lang} eyebrow={j.meta.eyebrow} title={j.meta.title} intro={j.meta.intro} />

      <section className="relative surface-pearl py-14 md:py-20 border-t border-[color:var(--color-ink-warm)]/15">
        <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12">
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {entries.map((e) => (
              <li key={e.slug} className="group">
                <Link href="#" className="block">
                  <div className="relative aspect-[4/5] overflow-hidden mb-6">
                    <Image
                      src={e.photo}
                      alt=""
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
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCallout lang={lang} variant="inline" />
    </>
  );
}
