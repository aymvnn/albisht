import { notFound } from "next/navigation";
import { LANGS, type Lang } from "@/lib/i18n";
import { USE_SANITY } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/live";
import { homeQuery, celebrationsHomeQuery } from "@/lib/sanity/queries";
import { mapHome, mapCelebrationItems } from "@/lib/content/from-sanity";
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

  const doc = USE_SANITY ? (await sanityFetch({ query: homeQuery })).data : null;
  const c = mapHome(doc, lang);

  const celDocs = USE_SANITY ? (await sanityFetch({ query: celebrationsHomeQuery })).data : null;
  const celItems = mapCelebrationItems(celDocs, lang);

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
