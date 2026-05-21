import { notFound } from "next/navigation";
import { LANGS, type Lang } from "@/lib/i18n";
import { CelebrationsTimeline } from "@/components/CelebrationsTimeline";

export default async function CelebrationsPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) notFound();
  return (
    <div className="pt-24">
      <CelebrationsTimeline lang={lang} />
    </div>
  );
}
