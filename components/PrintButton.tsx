"use client";

/**
 * PrintButton — opens the browser's print dialog, which doubles as the
 * "save as PDF" flow on every modern platform. A client component only
 * because window.print() needs the browser; everything else on the
 * brochure page stays on the server.
 */
export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn-brand btn-brand--sm inline-flex items-center gap-3 border"
    >
      <span>{label}</span>
    </button>
  );
}
