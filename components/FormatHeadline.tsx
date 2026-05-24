import type { ReactNode } from "react";

/**
 * Renders a headline string with markdown-style asterisk markers as italic
 * stand-out words: "A wedding *remembered.*\nNever *compared.*"
 *
 * The italic parts are styled with the .word-italic utility (gold italic
 * with OpenType swashes). Linebreaks (\n) are honoured.
 *
 * Use sparingly — only the one or two words in a headline that should
 * "ring" out. Per impeccable: emphasis is power, overuse kills it.
 */
export function FormatHeadline({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, lineIdx) => {
        const parts: ReactNode[] = [];
        let last = 0;
        const rx = /\*([^*]+)\*/g;
        let m: RegExpExecArray | null;
        let key = 0;
        while ((m = rx.exec(line)) !== null) {
          if (m.index > last) {
            parts.push(<span key={key++}>{line.slice(last, m.index)}</span>);
          }
          parts.push(
            <span key={key++} className="word-italic">
              {m[1]}
            </span>
          );
          last = m.index + m[0].length;
        }
        if (last < line.length) {
          parts.push(<span key={key++}>{line.slice(last)}</span>);
        }
        return (
          <span key={lineIdx} style={{ display: "block" }}>
            {parts.length > 0 ? parts : line}
          </span>
        );
      })}
    </>
  );
}
