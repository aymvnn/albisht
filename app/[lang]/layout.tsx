import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { LANGS, isRTL, type Lang } from "@/lib/i18n";
import { SKIP_LINK } from "@/lib/copy";
import { pageMetadata, localBusinessJsonLd } from "@/lib/seo";
import { getGlobals } from "@/lib/content/globals";
import { SanityLive } from "@/lib/sanity/live";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ZariProgress } from "@/components/ZariProgress";
import { ChandelierCursor } from "@/components/ChandelierCursor";
import { HtmlDirSync } from "@/components/HtmlDirSync";
import { StickyActionBar } from "@/components/StickyActionBar";
import { MagneticCTAs } from "@/components/MagneticCTAs";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

// Default metadata for the segment — pages override with their own
// generateMetadata; the home page intentionally relies on this one.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (LANGS.includes(rawLang as Lang) ? rawLang : "ar") as Lang;
  return pageMetadata(lang, "");
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!LANGS.includes(rawLang as Lang)) notFound();
  const lang = rawLang as Lang;
  const rtl = isRTL(lang);
  const g = await getGlobals(lang);
  const { isEnabled: isDraft } = await draftMode();

  return (
    <div lang={lang} dir={rtl ? "rtl" : "ltr"} className="relative">
      <HtmlDirSync lang={lang} dir={rtl ? "rtl" : "ltr"} />
      {/* Keyboard users jump straight past the fixed chrome. */}
      <a href="#main" className="skip-link">
        {SKIP_LINK[lang]}
      </a>
      <ZariProgress />
      <ChandelierCursor />
      <MagneticCTAs />
      <SiteHeader lang={lang} navItems={g.nav} phones={g.phones} />
      <main id="main" className="relative z-10">{children}</main>
      <SiteFooter lang={lang} />
      <StickyActionBar lang={lang} />
      {/* Organisation data for search engines — emitted once per page. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd(lang)) }}
      />
      {/* Live content updates; visual-editing overlays only inside the Studio. */}
      <SanityLive />
      {isDraft && <VisualEditing />}
    </div>
  );
}
