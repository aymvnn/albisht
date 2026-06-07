import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LANGS, type Lang, localizedDigits } from "@/lib/i18n";
import { USE_STORYBLOK } from "@/lib/storyblok/api";
import { getStoryContent } from "@/lib/storyblok/fetch";
import { mapContact } from "@/lib/content/from-storyblok";
import { getGlobals } from "@/lib/content/globals";
import type { SbContactPage } from "@/lib/storyblok/types";
import { PageHero } from "@/components/PageHero";

export const revalidate = 900;

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!LANGS.includes(rawLang as Lang)) notFound();
  const lang = rawLang as Lang;
  const isAr = lang === "ar";

  const sb = USE_STORYBLOK ? await getStoryContent<SbContactPage>("contact", lang) : null;
  const c = mapContact(sb, lang);
  const g = await getGlobals(lang);
  const ig = g.socials.find((s) => s.name === "instagram");

  return (
    <>
      <PageHero lang={lang} eyebrow={c.eyebrow} title={c.title} intro={c.intro} />

      {/* === PRIMARY: Men's hall === */}
      <section className="relative surface-pearl border-t border-[color:var(--color-ink-warm)]/15">
        <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-10 py-14 md:py-20 items-center">
            <div className="md:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={c.primaryImage}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-7 flex flex-col gap-6">
              <p className="type-roman text-[0.95rem] text-[color:var(--color-zari)]">
                {isAr ? "الخط الرئيسي" : "Primary line"}
              </p>
              <h2
                className={isAr ? "type-arabic-display" : "type-display"}
                style={{
                  fontSize: "clamp(2.4rem, 1.8rem + 2.4vw, 4rem)",
                  color: "var(--color-ink)",
                  lineHeight: isAr ? "1.4" : "1.02",
                }}
              >
                {g.phones.mens.label}
              </h2>
              <p
                className={`${isAr ? "type-arabic" : "type-serif"} italic`}
                style={{ fontSize: "1.1rem", color: "var(--color-ink-warm)", maxWidth: "32rem" }}
              >
                {g.phones.mens.note}
              </p>
              <a
                href={`tel:${g.phones.mens.tel}`}
                className="inline-flex items-baseline gap-4 mt-4 hover:text-[color:var(--color-zari-deep)] transition-colors"
                dir="ltr"
                style={{
                  fontFamily: isAr ? "var(--font-arabic)" : "var(--font-roman)",
                  fontSize: "clamp(1.6rem, 1.2rem + 1.4vw, 2rem)",
                  color: "var(--color-zari)",
                  letterSpacing: "0.04em",
                  fontVariantNumeric: "lining-nums tabular-nums",
                  unicodeBidi: "isolate",
                }}
              >
                <span>{localizedDigits(g.phones.mens.display, lang)}</span>
                <span className="text-[0.7em] flip-rtl">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* === SECONDARY: Women === */}
      <section className="relative surface-pearl border-t border-[color:var(--color-ink-warm)]/15">
        <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-baseline gap-y-4 md:gap-x-8">
            <div className="md:basis-1/3">
              <p className="type-roman text-[0.95rem] text-[color:var(--color-zari-deep)] mb-1">
                {isAr ? "للسيدات" : "For women"}
              </p>
              <p
                className={`${isAr ? "type-arabic" : "type-serif"} italic`}
                style={{ fontSize: "1rem", color: "var(--color-ink-warm)" }}
              >
                {isAr ? "خدمات مُختارة فقط" : "Selected services only"}
              </p>
            </div>
            <a
              href={`tel:${g.phones.womens.tel}`}
              className="hover:text-[color:var(--color-zari-deep)] transition-colors"
              dir="ltr"
              style={{
                fontFamily: isAr ? "var(--font-arabic)" : "var(--font-roman)",
                fontSize: "1.3rem",
                color: "var(--color-zari)",
                letterSpacing: "0.04em",
                fontVariantNumeric: "lining-nums tabular-nums",
                unicodeBidi: "isolate",
              }}
            >
              {localizedDigits(g.phones.womens.display, lang)}
            </a>
          </div>
        </div>
      </section>

      {/* === The letter CTA + address + email === */}
      <section className="relative py-20 md:py-28 surface-pearl">
        <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <p className="type-roman text-[0.95rem] text-[color:var(--color-zari-deep)] mb-8">
              {c.letter.label}
            </p>
            <h2
              className={`${isAr ? "type-arabic-display" : "type-display"} text-[color:var(--color-ink)] mb-8`}
              style={{ fontSize: "clamp(2.2rem, 1.6rem + 2.4vw, 3.8rem)", lineHeight: isAr ? "1.4" : "1.05" }}
            >
              {c.letter.headline}
            </h2>
            <p
              className={`${isAr ? "type-arabic" : "type-serif"} text-[color:var(--color-ink-soft)] text-lg italic leading-relaxed mb-12 max-w-xl`}
            >
              {c.letter.body}
            </p>
            <Link href={`/${lang}/consult`} className="btn-brand inline-flex items-center gap-4 border">
              <span>{c.letter.cta}</span>
              <span className="btn-brand-arrow flip-rtl">→</span>
            </Link>
          </div>

          <div className="md:col-span-4 md:col-start-9 space-y-10 md:pt-16">
            <Block label={isAr ? "العنوان" : "Address"} value={g.location} />
            <Block label={isAr ? "البريد" : "Email"} value={g.email} href={`mailto:${g.email}`} />
            {ig && <Block label={isAr ? "إنستغرام" : "Instagram"} value={ig.handle} href={ig.url} />}
            <Block
              label={isAr ? "ساعات الاستقبال" : "Reception hours"}
              value={g.receptionHours}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Block({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div>
      <p className="type-roman text-[0.95rem] text-[color:var(--color-zari-deep)] mb-2">
        {label}
      </p>
      {href ? (
        <a
          href={href}
          className="text-lg type-serif text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-zari-deep)] transition-colors whitespace-pre-line"
        >
          {value}
        </a>
      ) : (
        <p className="text-lg type-serif text-[color:var(--color-ink-soft)] whitespace-pre-line">
          {value}
        </p>
      )}
    </div>
  );
}
