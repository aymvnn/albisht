import { notFound } from "next/navigation";
import { LANGS, type Lang } from "@/lib/i18n";
import { USE_STORYBLOK } from "@/lib/storyblok/api";
import { getStoryContent } from "@/lib/storyblok/fetch";
import { mapConsult } from "@/lib/content/from-storyblok";
import type { SbConsultPage } from "@/lib/storyblok/types";
import { ConsultLetter } from "@/components/ConsultLetter";

export const revalidate = 900;

export default async function ConsultPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!LANGS.includes(rawLang as Lang)) notFound();
  const lang = rawLang as Lang;
  const sb = USE_STORYBLOK ? await getStoryContent<SbConsultPage>("consult", lang) : null;
  return <ConsultLetter lang={lang} content={mapConsult(sb, lang)} />;
}
