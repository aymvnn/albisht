import Link from "next/link";
import { Logo } from "@/components/Logo";
import { NOT_FOUND } from "@/lib/copy";

/**
 * Root-level 404 — reached only when the URL never matched a locale
 * segment (e.g. "/foo"), so there is no language to inherit. It renders
 * inside the bare root layout: fonts and global CSS are present, but no
 * site header or footer — the page must stand on its own.
 *
 * Because the visitor's language is unknown, both are offered, Arabic
 * first as the canonical voice of the house, on a full bisht surface.
 */
export default function RootNotFound() {
  return (
    <div className="surface-bisht min-h-svh flex flex-col items-center justify-center text-center px-6 gap-10">
      <Logo height={88} variant="light" priority />

      {/* Arabic first — the canonical language */}
      <div dir="rtl" lang="ar" className="flex flex-col items-center gap-4">
        <h1
          className="type-arabic-prose-display"
          style={{ fontSize: "1.9rem", color: "var(--color-pearl)" }}
        >
          {NOT_FOUND.ar.title}
        </h1>
        <Link
          href="/ar"
          className="nav-link"
          style={{ color: "var(--color-zari)" }}
        >
          {NOT_FOUND.ar.cta}
        </Link>
      </div>

      {/* A thin gold thread separates the two voices */}
      <span className="zari-line block w-24" aria-hidden="true" />

      <div dir="ltr" lang="en" className="flex flex-col items-center gap-4">
        <p
          className="type-display"
          style={{ fontSize: "1.6rem", color: "var(--color-pearl)" }}
        >
          {NOT_FOUND.en.title}
        </p>
        <Link
          href="/en"
          className="nav-link"
          style={{ color: "var(--color-zari)" }}
        >
          {NOT_FOUND.en.cta}
        </Link>
      </div>
    </div>
  );
}
