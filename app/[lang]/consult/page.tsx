import { notFound } from "next/navigation";
import { LANGS, type Lang } from "@/lib/i18n";
import { ConsultLetter } from "@/components/ConsultLetter";

export default async function ConsultPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!LANGS.includes(rawLang as Lang)) notFound();
  const lang = rawLang as Lang;
  return <ConsultLetter lang={lang} />;
}
