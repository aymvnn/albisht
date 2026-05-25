import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LANGS, type Lang } from "@/lib/i18n";
import { ContactCallout } from "@/components/ContactCallout";

const ENTRIES = {
  ar: [
    {
      kicker: "حِرفة",
      title: "حسن المَنّاعي والزَّري المَفقود",
      excerpt:
        "في الزاوية الخلفية من سوق واقف، آخر خَطّاطين يَعرِفُون كيف يُلَفّون خَيط الذَّهب على وَبَر الجَمل. زُرناه ليُعَلِّمَنا.",
      photo: "/photos/craft/sweets-silver-platter.jpg",
    },
    {
      kicker: "موسيقى",
      title: "لِماذا لا DJ",
      excerpt:
        "العود والقانون. وإذا اقتَضى الحال، صَوتٌ بَدوي. كلُّ ما عدا ذلك، ضَجيج.",
      photo: "/photos/majlis/night-majlis-outdoor.jpg",
    },
    {
      kicker: "بروتوكول",
      title: "أَربعَةُ أيّامٍ من الزَّواج القَطَري، مَشروحَة",
      excerpt:
        "الخِطبة، الجاهة، العَقد، الزَّفاف. كلُّ ليلةٍ لها وَجهٌ، ولها لِباس، ولها صَمت.",
      photo: "/photos/hall/velvet-blue-arch.jpg",
    },
  ],
  en: [
    {
      kicker: "Craft",
      title: "Hassan al-Mannai and the disappearing zari",
      excerpt:
        "In the back corner of Souq Waqif, the last calligraphers who still know how to wind gold thread around camel hair. We went to learn.",
      photo: "/photos/craft/sweets-silver-platter.jpg",
    },
    {
      kicker: "Music",
      title: "Why no DJ",
      excerpt: "Oud and qanun. If the occasion asks, a Bedouin voice. Everything else is noise.",
      photo: "/photos/majlis/night-majlis-outdoor.jpg",
    },
    {
      kicker: "Protocol",
      title: "The four days of a Qatari wedding, explained",
      excerpt:
        "Khitba, jaha, agd, zafaf. Each night has its face, its dress, and its silence.",
      photo: "/photos/hall/velvet-blue-arch.jpg",
    },
  ],
};

export default async function JournalPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!LANGS.includes(rawLang as Lang)) notFound();
  const lang = rawLang as Lang;
  const entries = ENTRIES[lang];

  return (
    <>
      <section className="relative pt-40 pb-20 surface-marble">
        <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12">
          <p className="type-roman text-[0.95rem] text-[color:var(--color-zari-deep)] mb-8">
            {lang === "ar" ? "اليوميّات" : "Journal"}
          </p>
          <h1
            className={`${
              lang === "ar" ? "type-arabic-display" : "type-display"
            } text-[color:var(--color-ink)] max-w-3xl`}
            style={{ fontSize: "var(--text-h1)" }}
          >
            {lang === "ar"
              ? "ما نَكتُبه بين حَفلٍ وحَفل."
              : "What we write between weddings."}
          </h1>
        </div>
      </section>

      <section className="relative surface-pearl py-20 md:py-32">
        <div className="mx-auto max-w-[var(--container-wide)] px-6 md:px-12">
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {entries.map((e, i) => (
              <li key={i} className="group">
                <Link href="#" className="block">
                  <div className="relative aspect-[4/5] overflow-hidden mb-6">
                    <Image
                      src={e.photo}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                    />
                  </div>
                  <p className="type-roman text-[0.92rem] text-[color:var(--color-zari-deep)] mb-3">
                    {e.kicker}
                  </p>
                  <h2
                    className={`${
                      lang === "ar" ? "type-arabic-headline" : "type-display"
                    } text-[color:var(--color-ink)] text-2xl md:text-3xl mb-3 group-hover:text-[color:var(--color-zari-deep)] transition-colors`}
                  >
                    {e.title}
                  </h2>
                  <p
                    className={`${
                      lang === "ar" ? "type-arabic" : "type-serif"
                    } text-[color:var(--color-ink-warm)] text-lg leading-relaxed`}
                  >
                    {e.excerpt}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCallout lang={lang} variant="inline" />
    </>
  );
}
