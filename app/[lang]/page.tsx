import { notFound } from "next/navigation";
import { LANGS, type Lang } from "@/lib/i18n";
import { USE_STORYBLOK } from "@/lib/storyblok/api";
import { getStoryContent, getStoryList } from "@/lib/storyblok/fetch";
import { mapHome, mapCelebrationItems } from "@/lib/content/from-storyblok";
import type { SbHomePage, SbCelebrationCase } from "@/lib/storyblok/types";
import { BishtReveal } from "@/components/BishtReveal";
import { HomeHero } from "@/components/HomeHero";
import { PromiseSection } from "@/components/PromiseSection";
import { ActsParallax } from "@/components/ActsParallax";
import { CelebrationsTimeline } from "@/components/CelebrationsTimeline";
import { InvitationSection } from "@/components/InvitationSection";

export const revalidate = 900;

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!LANGS.includes(rawLang as Lang)) notFound();
  const lang = rawLang as Lang;

  const sb = USE_STORYBLOK ? await getStoryContent<SbHomePage>("home", lang) : null;
  const c = mapHome(sb, lang);

  const celStories = USE_STORYBLOK
    ? await getStoryList<SbCelebrationCase>(
        { starts_with: "celebrations/", sort_by: "created_at:asc", per_page: 3 },
        lang
      )
    : [];
  const celItems = mapCelebrationItems(
    celStories.length ? celStories.map((s) => s.content) : null,
    lang
  );

  return (
    <>
      <BishtReveal lang={lang} />
      <HomeHero lang={lang} content={c.hero} />
      <PromiseSection lang={lang} content={c.promise} />
      <ActsParallax lang={lang} content={c.acts} />
      <CelebrationsTimeline
        lang={lang}
        content={{ ...c.celebrations, items: celItems }}
      />
      <InvitationSection lang={lang} content={c.invitation} />
    </>
  );
}
