import { notFound } from "next/navigation";

/**
 * Catch-all under /[lang]: any path that no page claimed routes here and
 * is handed to the segment's not-found.tsx — so an unknown /ar/... URL gets
 * the localized ceremonial 404 with the site chrome, instead of falling
 * through to the bare root 404.
 */
export default function CatchAll(): never {
  notFound();
}
