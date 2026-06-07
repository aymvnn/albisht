import { notFound } from "next/navigation";
import { LANGS, type Lang } from "@/lib/i18n";
import { USE_STORYBLOK } from "@/lib/storyblok/api";
import { getStoryContent, getStoryList } from "@/lib/storyblok/fetch";
import { mapHome, mapCelebrationItems } from "@/lib/content/from-storyblok";
import type { SbHomePage, SbCelebrationCase } from "@/lib/storyblok/types";
import { CelebrationsTimeline } from "@/components/CelebrationsTimeline";
import { PageHero } from "@/components/PageHero";

export const revalidate = 900;

export default async function CelebrationsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!LANGS.includes(rawLang as Lang)) notFound();
  const lang = rawLang as Lang;
  const isAr = lang === "ar";

  // Header copy lives on the home story's celebrations strip; the cards are the
  // celebration collection.
  const sbHome = USE_STORYBLOK ? await getStoryContent<SbHomePage>("home", lang) : null;
  const header = mapHome(sbHome, lang).celebrations;

  const celStories = USE_STORYBLOK
    ? await getStoryList<SbCelebrationCase>(
        { starts_with: "celebrations/", sort_by: "created_at:asc" },
        lang
      )
    : [];
  const items = mapCelebrationItems(
    celStories.length ? celStories.map((s) => s.content) : null,
    lang
  );

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={isAr ? "المناسبات" : "Celebrations"}
        title={header.title}
        intro={header.intro}
      />
      <CelebrationsTimeline
        lang={lang}
        showHeader={false}
        content={{ label: header.label, title: header.title, intro: header.intro, items }}
      />
    </>
  );
}
