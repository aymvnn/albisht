import Link from "next/link";
import { FOOTER, NAV } from "@/lib/copy";
import { type Lang, localizedNumeral } from "@/lib/i18n";
import { Logo } from "./Logo";
import { SilkRibbon } from "./SilkRibbon";
import { PHONES, EMAIL } from "@/lib/contact";

export function SiteFooter({ lang }: { lang: Lang }) {
  const f = FOOTER[lang];
  const year = localizedNumeral(2026, lang);

  return (
    <footer className="surface-bisht relative z-10">
      {/* Brand signature silk-and-zari ribbon spanning the top of the footer.
          Anchored to the very top edge so the previous dark section bleeds
          straight into the ribbon — no white gap between dark sections. */}
      <div className="relative h-20 md:h-28 overflow-hidden -mt-1 -mb-px">
        <SilkRibbon variant="horizontal" className="absolute inset-x-0 inset-y-0 w-full h-full" />
      </div>

      <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5 space-y-8">
            <Logo height={120} variant="light" />
            <p className="type-serif text-[color:var(--color-mist)] max-w-sm">
              {lang === "ar"
                ? "صالة الرجال التي تليق بالديوان."
                : "The men's hall worthy of the Diwan."}
            </p>
          </div>

          <nav className="md:col-span-4 grid grid-cols-2 gap-x-6 gap-y-3 type-roman-light text-[0.7rem] text-[color:var(--color-mist)]">
            {NAV[lang].map((item) => (
              <Link
                key={item.href}
                href={`/${lang}${item.href}`}
                className="hover:text-[color:var(--color-zari)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="md:col-span-3 space-y-5 text-[color:var(--color-mist)] text-sm">
            <p className={lang === "ar" ? "type-arabic" : "type-serif"}>{f.address}</p>
            <p className="type-serif">
              <a href={`mailto:${EMAIL}`} className="hover:text-[color:var(--color-zari)]">
                {EMAIL}
              </a>
            </p>

            {/* Primary: men's hall — the full atelier */}
            <div className="pt-3">
              <PhoneLine number={PHONES.mens} lang={lang} />
            </div>
            {/* Secondary: women — selected services, smaller + muted */}
            <SecondaryPhoneLine number={PHONES.womens} lang={lang} />
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[color:var(--color-mist)]/15 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="type-roman-light text-[0.66rem] text-[color:var(--color-mist)]/60">
            © {year} ALBISHT · {f.rights}
          </p>
          <p className="type-roman text-[0.66rem] text-[color:var(--color-zari)]/80">
            Doha · {lang === "ar" ? "قطر" : "Qatar"}
          </p>
        </div>
      </div>
    </footer>
  );
}

function PhoneLine({
  number,
  lang,
}: {
  number: typeof PHONES.mens;
  lang: Lang;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span
        className={lang === "ar" ? "type-arabic" : "type-serif"}
        style={{
          color: "var(--color-zari)",
          fontSize: "0.82rem",
          letterSpacing: lang === "ar" ? 0 : "0.05em",
        }}
      >
        {number.label[lang]}
      </span>
      <a
        href={`tel:${number.tel}`}
        className="hover:text-[color:var(--color-zari)] transition-colors"
        style={{
          fontFamily: "var(--font-roman)",
          fontSize: "1rem",
          letterSpacing: "0.04em",
          fontVariantNumeric: "lining-nums tabular-nums",
        }}
      >
        {number.display}
      </a>
    </div>
  );
}

function SecondaryPhoneLine({
  number,
  lang,
}: {
  number: typeof PHONES.womens;
  lang: Lang;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 pt-2 text-[color:var(--color-mist)]/70">
      <span
        className={lang === "ar" ? "type-arabic" : "type-serif"}
        style={{ fontSize: "0.75rem", fontStyle: "italic" }}
      >
        {lang === "ar" ? "للسيدات (خدمات مختارة)" : "For women (selected services)"}
      </span>
      <a
        href={`tel:${number.tel}`}
        className="hover:text-[color:var(--color-zari)] transition-colors"
        style={{
          fontFamily: "var(--font-roman)",
          fontSize: "0.82rem",
          letterSpacing: "0.04em",
          fontVariantNumeric: "lining-nums tabular-nums",
        }}
      >
        {number.display}
      </a>
    </div>
  );
}
