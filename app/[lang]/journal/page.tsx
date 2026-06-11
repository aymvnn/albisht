import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGS, type Lang } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { USE_SANITY } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/live";
import { journalQuery } from "@/lib/sanity/queries";
import { mapJournalList } from "@/lib/content/from-sanity";
import { ContactCallout } from "@/components/ContactCallout";
import { JournalGrid } from "@/components/JournalGrid";
import { PageHero } from "@/components/PageHero";

export const revalidate = 900;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (LANGS.includes(rawLang as Lang) ? rawLang : "ar") as Lang;
  return pageMetadata(lang, "/journal");
}

export default async function JournalPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!LANGS.includes(rawLang as Lang)) notFound();
  const lang = rawLang as Lang;

  const docs = USE_SANITY ? (await sanityFetch({ query: journalQuery })).data : null;
  const j = mapJournalList(docs, lang);
  const entries = j.entries;

  return (
    <>
      <PageHero lang={lang} eyebrow={j.meta.eyebrow} title={j.meta.title} intro={j.meta.intro} />

      <section className="relative surface-pearl py-14 md:py-20 border-t border-[color:var(--color-ink-warm)]/15">
        <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12">
          {/* Cards open the viewing-room lightbox — there is no detail route
              yet, and the previous href="#" links were dead ends. */}
          <JournalGrid lang={lang} entries={entries} />
        </div>
      </section>

      <ContactCallout lang={lang} variant="inline" />
    </>
  );
}
