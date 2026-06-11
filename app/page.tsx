import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DEFAULT_LANG, LANGS, type Lang } from "@/lib/i18n";

export default async function RootPage() {
  // AR is canonical. EN is the mirror. A returning visitor who switched
  // language lands directly in their chosen register (cookie set by the
  // header's language switch).
  const saved = (await cookies()).get("albisht-lang")?.value;
  const lang: Lang = LANGS.includes(saved as Lang) ? (saved as Lang) : DEFAULT_LANG;
  redirect(`/${lang}`);
}
