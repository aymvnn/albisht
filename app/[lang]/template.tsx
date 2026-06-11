import type { ReactNode } from "react";

/**
 * Route template — remounts on every navigation within /[lang], which is
 * exactly what lets the .page-veil entrance play between pages. The veil is
 * a pure-CSS opacity fade (see globals.css) so it costs nothing, respects
 * prefers-reduced-motion, and cannot disturb fixed-position children.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-veil">{children}</div>;
}
