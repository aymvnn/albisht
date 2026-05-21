import { notFound } from "next/navigation";
import Image from "next/image";
import { LANGS, type Lang } from "@/lib/i18n";

export default async function HeritagePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!LANGS.includes(rawLang as Lang)) notFound();
  const lang = rawLang as Lang;

  return (
    <>
      <section className="relative pt-40 pb-20 surface-marble">
        <div className="mx-auto max-w-[var(--container-text)] px-6 md:px-12">
          <p className="type-roman text-[0.72rem] text-[color:var(--color-zari-deep)] mb-8">
            {lang === "ar" ? "التراث" : "Heritage"}
          </p>
          <h1
            className={`${
              lang === "ar" ? "type-arabic-display" : "type-display"
            } text-[color:var(--color-ink-bisht)] mb-12`}
            style={{ fontSize: "var(--text-h1)" }}
          >
            {lang === "ar" ? "عن البِشت." : "On the bisht."}
          </h1>
          <p
            className={`${
              lang === "ar" ? "type-arabic" : "type-serif"
            } text-[color:var(--color-ink-warm)] text-xl leading-relaxed italic`}
          >
            {lang === "ar"
              ? "ثوبٌ من وَبَر الجَمل، يُلبَس مرّةً واحدةً في العمر. هذه قصته، وقصةُ ما نَفعَله نحن من أجله."
              : "A cloak of camel hair, worn only once in a lifetime. This is its story — and the story of what we do for it."}
          </p>
        </div>
      </section>

      <section className="relative h-[60svh] min-h-[400px] my-12 overflow-hidden">
        <Image
          src="/photos/majlis/calligraphy-wood-wall.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </section>

      <article className="relative surface-pearl py-20 md:py-32 prose-ceremonial">
        <div className="mx-auto max-w-[var(--container-text)] px-6 md:px-12">
          <Chapter
            n="01"
            title={lang === "ar" ? "ما هو البِشت" : "What the bisht is"}
            body={
              lang === "ar"
                ? "البِشت ثوبٌ خارجي، يُنسَج من وَبَر الجَمل، ويُطَرَّز بخَيط الذَّهب الذي يُعرَف بالزَّري. يُلبَس فوق الثوب الأبيض، ويُعتَبَر كُسوةَ المُلوك. الرجلُ الذي يَلبَسه في يومٍ مُعَيَّن، إنّما يُعلِنُ أن ذلك اليوم لا يُشبِه يومًا آخر."
                : "The bisht is the outer cloak — spun from camel hair, hemmed with golden zari thread. It is worn over the white thobe and is considered the dress of kings. A man who puts it on a particular day is declaring that this day is unlike any other."
            }
          />
          <Chapter
            n="02"
            title={lang === "ar" ? "لماذا هو طَقسيّ" : "Why it is ceremonial"}
            body={
              lang === "ar"
                ? "في قطر، لا يَملِك أكثرُ الرجال إلا بِشتًا واحدًا، يُلبَس يوم العُرس، ويُحفَظ بعد ذلك مُطَوًّى في خزانة العائلة. ليس البِشت ثَوبًا، بل شَهادةٌ على لحظةٍ لا تَتَكرَّر."
                : "In Qatar, most men own only a single bisht — worn on the wedding day, then folded into the family wardrobe. The bisht is not a garment. It is the testimony of a moment that does not return."
            }
          />
          <Chapter
            n="03"
            title={lang === "ar" ? "بِشتُ الزَّفاف في قطر" : "The wedding bisht of Qatar"}
            body={
              lang === "ar"
                ? "بِشتُ الزَّفاف القَطَري أَخفُّ من نَظيرِه السعودي، وأَدَقُّ زَريًا من البَحريني. يَنسِجُه عادةً عَدَدٌ مَحدودٌ من العائلات في سوق واقف، وكلُّ خَطٍّ من ذَهَبِه يُغرَزُ بِاليَد، صفًّا فصفًّا، على مَدى أُسبوعَين."
                : "The Qatari wedding bisht is lighter than its Saudi counterpart and more finely embroidered than the Bahraini. It is woven by a small number of families in Souq Waqif. Every line of its gold is set by hand, row by row, over two weeks."
            }
          />
          <Chapter
            n="04"
            title={lang === "ar" ? "ما يَقَع علينا" : "What falls to us"}
            body={
              lang === "ar"
                ? "ALBISHT يَختار البِشت، ويُسَلِّمه إلى العَريس قبل ليلَتَيْن. يُجَهِّز قاعةَ الرجال على نحوٍ يَجعل البِشت يَلمَع تحت الإضاءة المُعايَرة. هذا كلُّ شيء — ولكنّه كلُّ شيء."
                : "ALBISHT selects the bisht, and delivers it to the groom two nights before. We dress the men's hall in a way that lets the gold catch the calibrated light. That is everything we do — and it is everything."
            }
          />
        </div>
      </article>
    </>
  );
}

function Chapter({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <section className="mb-24 grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-2">
        <p className="type-roman text-[0.7rem] text-[color:var(--color-zari-deep)] sticky top-32">
          {n}
        </p>
      </div>
      <div className="md:col-span-10">
        <h2 className="type-display text-3xl md:text-4xl text-[color:var(--color-ink-bisht)] mb-6">
          {title}
        </h2>
        <p className="text-[color:var(--color-ink-soft)] text-lg leading-relaxed">{body}</p>
      </div>
    </section>
  );
}
