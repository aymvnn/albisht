import { notFound } from "next/navigation";
import Image from "next/image";
import { LANGS, type Lang } from "@/lib/i18n";
import { type HeritageChapter as HeritageChapterData } from "@/lib/inline-content";
import { USE_STORYBLOK } from "@/lib/storyblok/api";
import { getStoryContent } from "@/lib/storyblok/fetch";
import { mapHeritage } from "@/lib/content/from-storyblok";
import type { SbHeritagePage } from "@/lib/storyblok/types";
import { PullQuote } from "@/components/PullQuote";
import { ContactCallout } from "@/components/ContactCallout";
import { PageHero } from "@/components/PageHero";

export const revalidate = 900;

export default async function HeritagePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!LANGS.includes(rawLang as Lang)) notFound();
  const lang = rawLang as Lang;
  const sb = USE_STORYBLOK ? await getStoryContent<SbHeritagePage>("heritage", lang) : null;
  const c = mapHeritage(sb, lang);
  // The page keeps its two-article rhythm with a full-bleed photo break in
  // between: the first article carries the opening chapters, the second the
  // closing ones. Split at the midpoint so the layout adapts if chapters are
  // added or removed in the CMS.
  const mid = Math.ceil(c.chapters.length / 2);
  const firstHalf = c.chapters.slice(0, mid);
  const secondHalf = c.chapters.slice(mid);

  return (
    <>
      <PageHero lang={lang} eyebrow={c.eyebrow} title={c.title} intro={c.intro} />

      <section className="relative h-[60svh] min-h-[400px] my-8 md:my-12 overflow-hidden">
        <Image
          src={c.introImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </section>

      <article className="relative surface-pearl py-14 md:py-20 prose-ceremonial">
        <div className="mx-auto max-w-[var(--container-text)] px-6 md:px-12">
          {firstHalf.map((chapter) => (
            <ChapterBlock key={chapter.number} chapter={chapter} lang={lang} />
          ))}
        </div>
      </article>

      {/* Intermezzo — second fullbleed photo break */}
      <section className="relative h-[55svh] min-h-[380px] overflow-hidden">
        <Image
          src={c.intermezzoImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </section>

      <article className="relative surface-pearl py-14 md:py-20 prose-ceremonial">
        <div className="mx-auto max-w-[var(--container-text)] px-6 md:px-12">
          {secondHalf.map((chapter) => (
            <ChapterBlock key={chapter.number} chapter={chapter} lang={lang} />
          ))}
        </div>
      </article>

      <ContactCallout lang={lang} variant="dark" />
    </>
  );
}

function ChapterBlock({
  chapter,
  lang,
}: {
  chapter: HeritageChapterData;
  lang: Lang;
}) {
  return (
    <>
      <Chapter n={chapter.number} title={chapter.title} body={chapter.body} />
      {chapter.pullquote && <PullQuote lang={lang} text={chapter.pullquote} />}
    </>
  );
}

function Chapter({ n, title, body }: { n: string; title: string; body: string }) {
  const first = body.charAt(0);
  const rest = body.slice(1);
  return (
    <section className="mb-16 md:mb-20 grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-2">
        <p className="type-roman text-[1.05rem] text-[color:var(--color-zari-deep)] sticky top-32">
          {n}
        </p>
      </div>
      <div className="md:col-span-10">
        <h2 className="type-display text-3xl md:text-4xl text-[color:var(--color-ink)] mb-6">
          {title}
        </h2>
        <p className="text-[color:var(--color-ink-soft)] text-lg leading-relaxed">
          <span className="drop-cap">{first}</span>
          {rest}
        </p>
      </div>
    </section>
  );
}
