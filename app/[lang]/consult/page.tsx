import { notFound } from "next/navigation";
import { LANGS, type Lang } from "@/lib/i18n";
import { ConsultLetter } from "@/components/ConsultLetter";

export default async function ConsultPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) notFound();
  return <ConsultLetter lang={lang} />;
}
