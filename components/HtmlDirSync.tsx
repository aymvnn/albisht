"use client";

import { useEffect } from "react";

export function HtmlDirSync({ lang, dir }: { lang: string; dir: "rtl" | "ltr" }) {
  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = dir;
  }, [lang, dir]);
  return null;
}
