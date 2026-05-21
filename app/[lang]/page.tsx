import { notFound } from "next/navigation";
import { LANGS, type Lang } from "@/lib/i18n";
import { BishtReveal } from "@/components/BishtReveal";
import { HomeHero } from "@/components/HomeHero";
import { PromiseSection } from "@/components/PromiseSection";
import { ActsParallax } from "@/components/ActsParallax";
import { CelebrationsTimeline } from "@/components/CelebrationsTimeline";
import { InvitationSection } from "@/components/InvitationSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) notFound();

  return (
    <>
      <BishtReveal lang={lang} />
      <HomeHero lang={lang} />
      <PromiseSection lang={lang} />
      <ActsParallax lang={lang} />
      <CelebrationsTimeline lang={lang} />
      <InvitationSection lang={lang} />
    </>
  );
}
