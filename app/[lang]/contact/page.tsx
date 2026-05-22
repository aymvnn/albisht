import Image from "next/image";
import { notFound } from "next/navigation";
import { LANGS, type Lang, localizedNumeral } from "@/lib/i18n";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!LANGS.includes(rawLang as Lang)) notFound();
  const lang = rawLang as Lang;

  return (
    <section className="relative pt-32 pb-32 surface-marble">
      <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5 space-y-12 md:pt-16">
          <div>
            <p className="type-roman text-[0.72rem] text-[color:var(--color-zari-deep)] mb-8">
              {lang === "ar" ? "التواصل" : "Contact"}
            </p>
            <h1
              className={`${
                lang === "ar" ? "type-arabic-display" : "type-display"
              } text-[color:var(--color-ink)] mb-8`}
              style={{ fontSize: "var(--text-h2)" }}
            >
              {lang === "ar" ? "الباب." : "The door."}
            </h1>
            <p
              className={`${
                lang === "ar" ? "type-arabic" : "type-serif"
              } text-[color:var(--color-ink-warm)] italic text-lg leading-relaxed`}
            >
              {lang === "ar"
                ? "اِخْتَر الباب. اَدخُل. لا حاجة لتَحديد المَوعد."
                : "Choose the door. Step in. No appointment is needed."}
            </p>
          </div>

          <div className="space-y-6 type-serif text-[color:var(--color-ink-soft)]">
            <Block
              label={lang === "ar" ? "العنوان" : "Address"}
              value={
                lang === "ar"
                  ? "شارع الكورنيش\nالدوحة، قطر"
                  : "Corniche Street\nDoha, Qatar"
              }
            />
            <Block
              label={lang === "ar" ? "الهاتف" : "Telephone"}
              value={
                lang === "ar"
                  ? `+${localizedNumeral(9744444, lang)} ${localizedNumeral(1234, lang)}`
                  : "+974 4444 1234"
              }
              mono
            />
            <Block label={lang === "ar" ? "البريد" : "Email"} value="hello@albisht.qa" mono />
            <Block
              label={lang === "ar" ? "ساعات الاستقبال" : "Reception hours"}
              value={
                lang === "ar"
                  ? "الأحد ـ الخميس\n١٠ صباحًا ـ ٧ مساءً"
                  : "Sunday – Thursday\n10:00 — 19:00"
              }
            />
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/photos/majlis/calligraphy-wood-wall.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Block({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="type-roman text-[0.66rem] text-[color:var(--color-zari-deep)] mb-2">
        {label}
      </p>
      <p
        className={`${mono ? "tracking-[0.18em]" : ""} text-lg whitespace-pre-line`}
      >
        {value}
      </p>
    </div>
  );
}
