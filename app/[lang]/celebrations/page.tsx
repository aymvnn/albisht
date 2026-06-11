import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGS, type Lang } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { USE_SANITY } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/live";
import { homeQuery, celebrationsQuery } from "@/lib/sanity/queries";
import { mapHome, mapCelebrationItems } from "@/lib/content/from-sanity";
import { CelebrationsTimeline } from "@/components/CelebrationsTimeline";
import { ContactCallout } from "@/components/ContactCallout";
import { PageHero } from "@/components/PageHero";
import { ViewingRoom } from "@/components/ViewingRoom";

export const revalidate = 900;

/** Curated frames for the viewing room — halls, craft, evening light.
 *  Deliberately captionless: the photographs are shown the way the brand
 *  shows celebrations — without names. */
const VIEWING_ROOM_PHOTOS = [
  { src: "/photos/hall/court-empty-chandelier.jpg" },
  { src: "/photos/craft/gilded-table-flowers.jpg" },
  { src: "/photos/hall/mashrabiya-arch.jpg" },
  { src: "/photos/craft/sweets-silver-platter.jpg" },
  { src: "/photos/majlis/evening-olive-outdoor.jpg" },
  { src: "/photos/hall/throne-blue-gold-roses.jpg" },
  { src: "/photos/craft/server-red-sweets.jpg" },
  { src: "/photos/hall/twin-arch-blue-velvet.jpg" },
  { src: "/photos/majlis/night-majlis-outdoor.jpg" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (LANGS.includes(rawLang as Lang) ? rawLang : "ar") as Lang;
  return pageMetadata(lang, "/celebrations");
}

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
  const homeDoc = USE_SANITY ? (await sanityFetch({ query: homeQuery })).data : null;
  const header = mapHome(homeDoc, lang).celebrations;

  const celDocs = USE_SANITY ? (await sanityFetch({ query: celebrationsQuery })).data : null;
  const items = mapCelebrationItems(celDocs, lang);

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

      {/* === The viewing room — full-bleed photography in a lightbox === */}
      <ViewingRoom lang={lang} items={VIEWING_ROOM_PHOTOS} />

      {/* This page previously ended without an invitation — the only page
          that did. The inline callout closes the circle. */}
      <ContactCallout lang={lang} variant="inline" />
    </>
  );
}
