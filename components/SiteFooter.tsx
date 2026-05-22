import Link from "next/link";
import { FOOTER, NAV } from "@/lib/copy";
import { type Lang, localizedNumeral } from "@/lib/i18n";
import { Logo } from "./Logo";
import { SilkRibbon } from "./SilkRibbon";

export function SiteFooter({ lang }: { lang: Lang }) {
  const f = FOOTER[lang];
  const year = localizedNumeral(2026, lang);

  return (
    <footer className="surface-bisht relative z-10 mt-32">
      {/* Brand signature silk-and-zari ribbon spanning the top of the footer */}
      <div className="relative h-24 md:h-32 overflow-hidden -mb-px">
        <SilkRibbon variant="horizontal" className="absolute inset-x-0 -bottom-4 w-full h-auto" />
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

          <div className="md:col-span-3 space-y-3 text-[color:var(--color-mist)] text-sm">
            <p className={lang === "ar" ? "type-arabic" : "type-serif"}>{f.address}</p>
            <p className="type-serif">
              <a href="mailto:hello@albisht.qa" className="hover:text-[color:var(--color-zari)]">
                hello@albisht.qa
              </a>
            </p>
            <p className="type-roman text-[0.68rem] tracking-[0.3em]">
              +{lang === "ar" ? "٩٧٤ ٤٤٤٤ ١٢٣٤" : "974 4444 1234"}
            </p>
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
