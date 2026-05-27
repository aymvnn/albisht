import { notFound } from "next/navigation";
import { LANGS, type Lang } from "@/lib/i18n";
import { CelebrationsTimeline } from "@/components/CelebrationsTimeline";
import { PageHero } from "@/components/PageHero";

export default async function CelebrationsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!LANGS.includes(rawLang as Lang)) notFound();
  const lang = rawLang as Lang;
  const isAr = lang === "ar";
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={isAr ? "المناسبات" : "Celebrations"}
        title={isAr ? "ثلاثُ ليالٍ. لا أسماء." : "Three evenings. No names."}
        intro={
          isAr
            ? "نَحفَظ الأسرارَ كما نَحفَظ التراث. هذه ثلاث مناسبات أُتيح لنا تَكريم أصحابها."
            : "We hold secrets as we hold heritage. These are three of the celebrations we have been honoured to dress."
        }
      />
      <CelebrationsTimeline lang={lang} showHeader={false} />
    </>
  );
}
