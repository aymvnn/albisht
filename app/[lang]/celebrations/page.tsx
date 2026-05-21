import { notFound } from "next/navigation";
import { LANGS, type Lang } from "@/lib/i18n";
import { CelebrationsTimeline } from "@/components/CelebrationsTimeline";

export default async function CelebrationsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!LANGS.includes(rawLang as Lang)) notFound();
  const lang = rawLang as Lang;
  return (
    <div className="pt-24">
      <CelebrationsTimeline lang={lang} />
    </div>
  );
}
