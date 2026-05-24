import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LANGS, type Lang } from "@/lib/i18n";
import { PHONES, EMAIL, LOCATION, INSTAGRAM } from "@/lib/contact";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!LANGS.includes(rawLang as Lang)) notFound();
  const lang = rawLang as Lang;
  const isAr = lang === "ar";

  return (
    <>
      {/* === Hero — asymmetric === */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-24 surface-marble">
        <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-y-12">
          <div className="md:col-span-3">
            <div className="flex items-center gap-3">
              <span className="block w-10 h-px bg-[color:var(--color-zari)]" />
              <span className="type-roman text-[0.82rem] text-[color:var(--color-zari-deep)]">
                {isAr ? "التواصل" : "Contact"}
              </span>
            </div>
          </div>
          <h1
            className={`${
              isAr ? "type-arabic-display" : "type-display"
            } text-[color:var(--color-ink)] md:col-span-9`}
            style={{
              fontSize: "clamp(3rem, 2.4rem + 4vw, 6rem)",
              lineHeight: isAr ? "1.4" : "1",
            }}
          >
            {isAr ? "بابان." : "Two doors."}
          </h1>
          <div className="md:col-span-7 md:col-start-6">
            <p
              className={`${
                isAr ? "type-arabic" : "type-serif"
              } text-[color:var(--color-ink-warm)] text-lg md:text-xl italic leading-relaxed max-w-2xl`}
            >
              {isAr
                ? "صالة الرجال وصالة السيدات — كلٌّ بِخَطِّها المباشر. اِتصل بمن يَعرف الإجابة، أو اِكتُب الرسالة الكاملة."
                : "The men's hall and the women's hall — each on its own direct line. Call whoever knows the answer, or write the full letter."}
            </p>
          </div>
        </div>
      </section>

      {/* === Two department CTAs — equal weight, hairline rule === */}
      <section className="relative surface-pearl">
        <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12">
          <div
            className="grid grid-cols-1 md:grid-cols-2 border-y"
            style={{ borderColor: "var(--color-ink-warm)" }}
          >
            <DepartmentBlock
              department={PHONES.mens}
              lang={lang}
              withRightBorder
              photo="/photos/majlis/calligraphy-wood-wall.jpg"
            />
            <DepartmentBlock
              department={PHONES.womens}
              lang={lang}
              photo="/photos/hall/hero-pearl-court.jpg"
            />
          </div>
        </div>
      </section>

      {/* === The letter CTA + address + email === */}
      <section className="relative py-32 md:py-44 surface-marble">
        <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <p className="type-roman text-[0.78rem] text-[color:var(--color-zari-deep)] mb-8">
              {isAr ? "الرسالة" : "The letter"}
            </p>
            <h2
              className={`${isAr ? "type-arabic-display" : "type-display"} text-[color:var(--color-ink)] mb-8`}
              style={{ fontSize: "clamp(2.2rem, 1.6rem + 2.4vw, 3.8rem)", lineHeight: isAr ? "1.4" : "1.05" }}
            >
              {isAr ? "اُكتُب الرسالة الكاملة." : "Write the full letter."}
            </h2>
            <p
              className={`${isAr ? "type-arabic" : "type-serif"} text-[color:var(--color-ink-soft)] text-lg italic leading-relaxed mb-12 max-w-xl`}
            >
              {isAr
                ? "للاستفسارات المفصّلة — التاريخ، عدد الضيوف، الباقة المُختارة — اُكتُب لنا الرسالة الكاملة وسَنرُد خلال ثلاثة أيام."
                : "For detailed enquiries — date, number of guests, chosen package — write the full letter and we will reply within three days."}
            </p>
            <Link
              href={`/${lang}/consult`}
              className="group inline-flex items-center gap-4 px-7 py-4 border border-[color:var(--color-ink-warm)]/40 hover:border-[color:var(--color-zari)] hover:text-[color:var(--color-zari-deep)] transition-all duration-500"
              style={{ transitionTimingFunction: "var(--ease-ceremonial)" }}
            >
              <span className="type-roman text-[0.86rem]">
                {isAr ? "اكتب الرسالة" : "Write the letter"}
              </span>
              <span className="flip-rtl group-hover:translate-x-1 transition-transform duration-500">
                →
              </span>
            </Link>
          </div>

          <div className="md:col-span-4 md:col-start-9 space-y-10 md:pt-16">
            <Block
              label={isAr ? "العنوان" : "Address"}
              value={LOCATION[lang]}
            />
            <Block
              label={isAr ? "البريد" : "Email"}
              value={EMAIL}
              href={`mailto:${EMAIL}`}
            />
            <Block
              label={isAr ? "إنستغرام" : "Instagram"}
              value={INSTAGRAM.handle}
              href={INSTAGRAM.url}
            />
            <Block
              label={isAr ? "ساعات الاستقبال" : "Reception hours"}
              value={
                isAr
                  ? "الأحد ـ الخميس\n١٠ صباحًا ـ ٧ مساءً"
                  : "Sunday – Thursday\n10:00 — 19:00"
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}

function DepartmentBlock({
  department,
  lang,
  withRightBorder = false,
  photo,
}: {
  department: { tel: string; display: string; label: Record<Lang, string> };
  lang: Lang;
  withRightBorder?: boolean;
  photo: string;
}) {
  const isAr = lang === "ar";
  return (
    <div
      className={`group relative py-16 md:py-24 px-6 md:px-12 ${
        withRightBorder ? "md:border-e" : ""
      } border-t md:border-t-0`}
      style={{ borderColor: "var(--color-ink-warm)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        <div className="md:col-span-2 relative aspect-[4/3] overflow-hidden">
          <Image
            src={photo}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-[2500ms] ease-out group-hover:scale-105"
          />
        </div>
        <div className="md:col-span-3 flex flex-col gap-5">
          <p className="type-roman text-[0.76rem] text-[color:var(--color-zari)]">
            {isAr ? "الخط المباشر" : "Direct line"}
          </p>
          <p
            className={isAr ? "type-arabic-display" : "type-display"}
            style={{
              fontSize: "clamp(1.8rem, 1.4rem + 1.6vw, 2.6rem)",
              color: "var(--color-ink)",
              lineHeight: isAr ? "1.4" : "1.05",
            }}
          >
            {department.label[lang]}
          </p>
          <a
            href={`tel:${department.tel}`}
            className="hover:text-[color:var(--color-zari-deep)] transition-colors"
            style={{
              fontFamily: "var(--font-roman)",
              fontSize: "1.4rem",
              color: "var(--color-zari)",
              letterSpacing: "0.04em",
              fontVariantNumeric: "lining-nums tabular-nums",
              marginTop: "0.5rem",
            }}
          >
            {department.display}
          </a>
        </div>
      </div>
    </div>
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
      <p className="type-roman text-[0.72rem] text-[color:var(--color-zari-deep)] mb-2">
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
