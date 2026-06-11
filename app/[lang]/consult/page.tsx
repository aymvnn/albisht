import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGS, type Lang } from "@/lib/i18n";
import { PACKAGES } from "@/lib/packages";
import { pageMetadata } from "@/lib/seo";
import { USE_SANITY } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/live";
import { consultQuery } from "@/lib/sanity/queries";
import { mapConsult } from "@/lib/content/from-sanity";
import { ConsultLetter } from "@/components/ConsultLetter";

export const revalidate = 900;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (LANGS.includes(rawLang as Lang) ? rawLang : "ar") as Lang;
  return pageMetadata(lang, "/consult");
}

export default async function ConsultPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { lang: rawLang } = await params;
  if (!LANGS.includes(rawLang as Lang)) notFound();
  const lang = rawLang as Lang;
  const doc = USE_SANITY ? (await sanityFetch({ query: consultQuery })).data : null;

  // Prefills from tier CTAs (?package=gold), the date concierge (?date=…)
  // and the women's section (?line=womens). All optional, all sanitised.
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) =>
    (Array.isArray(v) ? v[0] : v)?.slice(0, 120) || undefined;
  const packageId = one(sp.package);
  const pkg = packageId ? PACKAGES[lang].find((p) => p.id === packageId) : undefined;
  const rawLine = one(sp.line);
  const line = rawLine === "womens" ? "womens" : rawLine === "mens" ? "mens" : undefined;

  return (
    <ConsultLetter
      lang={lang}
      content={mapConsult(doc, lang)}
      prefill={{
        date: one(sp.date),
        packageId: pkg?.id,
        packageName: pkg?.name,
        line,
      }}
    />
  );
}
