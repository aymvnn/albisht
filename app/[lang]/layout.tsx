import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { LANGS, isRTL, type Lang } from "@/lib/i18n";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ZariProgress } from "@/components/ZariProgress";
import { ChandelierCursor } from "@/components/ChandelierCursor";
import { HtmlDirSync } from "@/components/HtmlDirSync";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

type Params = { lang: Lang };

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<Params>;
}) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) notFound();
  const rtl = isRTL(lang);

  return (
    <div lang={lang} dir={rtl ? "rtl" : "ltr"} className="relative">
      <HtmlDirSync lang={lang} dir={rtl ? "rtl" : "ltr"} />
      <ZariProgress />
      <ChandelierCursor />
      <SiteHeader lang={lang} />
      <main className="relative z-10">{children}</main>
      <SiteFooter lang={lang} />
    </div>
  );
}
