import Link from "next/link";
import { type Lang, localizedNumeral, localizedDigits } from "@/lib/i18n";
import { getGlobals } from "@/lib/content/globals";
import { Logo } from "./Logo";
import { SilkRibbon } from "./SilkRibbon";

type SocialLinkName = "instagram" | "facebook" | "tiktok";

export async function SiteFooter({ lang }: { lang: Lang }) {
  const g = await getGlobals(lang);
  const year = localizedNumeral(2026, lang);

  return (
    <footer className="surface-bisht relative z-10">
      {/* Brand signature silk-and-zari ribbon spanning the top of the footer. */}
      <div className="relative h-20 md:h-28 overflow-hidden -mt-1 -mb-px">
        <SilkRibbon variant="horizontal" className="absolute inset-x-0 inset-y-0 w-full h-full" />
      </div>

      <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5 space-y-8">
            <Logo height={120} variant="light" />
            <p className="type-serif text-[color:var(--color-mist)] max-w-sm">
              {g.footer.tagline}
            </p>
          </div>

          <nav className="md:col-span-4 grid grid-cols-2 gap-x-6 gap-y-4 type-nav text-[color:var(--color-mist)]">
            {g.nav.map((item) => (
              <Link
                key={item.href}
                href={`/${lang}${item.href}`}
                className="hover:text-[color:var(--color-zari)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="md:col-span-3 space-y-5 text-[color:var(--color-mist)] text-base">
            <p className={lang === "ar" ? "type-arabic" : "type-serif"}>{g.footer.address}</p>
            <p className="type-serif">
              <a href={`mailto:${g.email}`} className="hover:text-[color:var(--color-zari)]">
                {g.email}
              </a>
            </p>

            {/* Primary: men's hall — the full atelier */}
            <div className="pt-3">
              <PhoneLine number={g.phones.mens} lang={lang} />
            </div>
            {/* Secondary: women — selected services */}
            <SecondaryPhoneLine number={g.phones.womens} lang={lang} />

            {/* Social channels */}
            <SocialRow lang={lang} socials={g.socials} />
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[color:var(--color-mist)]/15 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="type-roman-light text-[0.86rem] text-[color:var(--color-mist)]/80">
            © {year} ALBISHT · {g.footer.rights}
          </p>
          <p className="type-roman text-[0.86rem] text-[color:var(--color-zari)]">
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
  number: { label: string; tel: string; display: string };
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
        {number.label}
      </span>
      <a
        href={`tel:${number.tel}`}
        className="hover:text-[color:var(--color-zari)] transition-colors"
        dir="ltr"
        style={{
          fontFamily: lang === "ar" ? "var(--font-arabic)" : "var(--font-roman)",
          fontSize: "1rem",
          letterSpacing: "0.04em",
          fontVariantNumeric: "lining-nums tabular-nums",
          unicodeBidi: "isolate",
          display: "inline-block",
        }}
      >
        {localizedDigits(number.display, lang)}
      </a>
    </div>
  );
}

function SecondaryPhoneLine({
  number,
  lang,
}: {
  number: { tel: string; display: string };
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
        dir="ltr"
        style={{
          fontFamily: lang === "ar" ? "var(--font-arabic)" : "var(--font-roman)",
          fontSize: "0.82rem",
          letterSpacing: "0.04em",
          fontVariantNumeric: "lining-nums tabular-nums",
          unicodeBidi: "isolate",
          display: "inline-block",
        }}
      >
        {localizedDigits(number.display, lang)}
      </a>
    </div>
  );
}

function SocialRow({
  lang,
  socials,
}: {
  lang: Lang;
  socials: { name: SocialLinkName; handle: string; url: string }[];
}) {
  const labels: Record<SocialLinkName, { ar: string; en: string }> = {
    instagram: { ar: "إنستغرام", en: "Instagram" },
    facebook: { ar: "فيسبوك", en: "Facebook" },
    tiktok: { ar: "تيك توك", en: "TikTok" },
  };
  return (
    <div className="pt-4 flex items-center gap-4">
      {socials.map((s) => (
        <a
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${labels[s.name][lang]} — ${s.handle}`}
          className="text-[color:var(--color-mist)]/75 hover:text-[color:var(--color-zari)] transition-colors"
        >
          <SocialIcon name={s.name} />
        </a>
      ))}
    </div>
  );
}

function SocialIcon({ name }: { name: SocialLinkName }) {
  const size = 20;
  if (name === "instagram") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    );
  }
  if (name === "facebook") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M13.5 21v-7.5h2.5l.4-3H13.5V8.6c0-.9.25-1.5 1.55-1.5H17V4.3c-.3 0-1.35-.1-2.55-.1-2.55 0-4.3 1.55-4.3 4.4V10.5H7.5v3H10.15V21h3.35Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  // tiktok
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 4v9.2a3 3 0 1 1-3-3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 4c.4 2.2 2 3.8 4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
