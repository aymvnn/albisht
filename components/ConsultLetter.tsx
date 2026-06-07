"use client";

import { useEffect, useRef, useState } from "react";
import { CONSULT } from "@/lib/copy";
import type { Lang } from "@/lib/i18n";
import { WaxSealButton } from "./WaxSealButton";

/**
 * The Letter — a single screen-wide piece of pearl paper.
 * Greeting is type-written letter by letter on mount.
 * Form fields are typographic, underlined, no boxes.
 * Submit is the WaxSealButton.
 */
export function ConsultLetter({
  lang,
  content,
}: {
  lang: Lang;
  content?: {
    eyebrow: string;
    headline: string;
    sub: string;
    body: string;
    fields: { name: string; date: string; datePlaceholder: string; guests: string; contact: string; notes: string; notesHint: string };
    submit: string;
    submitted: { line1: string; line2: string };
  };
}) {
  const c =
    content ?? {
      ...CONSULT[lang],
      fields: {
        ...CONSULT[lang].fields,
        datePlaceholder: lang === "ar" ? "شهر/سنة" : "Month / Year",
      },
    };
  const [typed, setTyped] = useState("");
  const fullGreeting = c.headline;
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(fullGreeting.slice(0, i));
      if (i >= fullGreeting.length) clearInterval(interval);
    }, 95);
    return () => clearInterval(interval);
  }, [fullGreeting]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sent || pending) return;
    setPending(true);
    setTimeout(() => {
      setSent(true);
      setPending(false);
    }, 900);
  };

  if (sent) {
    return (
      <section className="relative min-h-[80svh] surface-pearl flex flex-col items-center justify-center px-6 py-32 text-center">
        <div className="reveal-up" style={{ animationDelay: "0.1s" }}>
          <p
            className={`${
              lang === "ar" ? "type-arabic-display" : "type-display"
            } text-[color:var(--color-zari-deep)] mb-6`}
            style={{ fontSize: "var(--text-h2)" }}
          >
            {c.submitted.line1}
          </p>
        </div>
        <div className="reveal-up" style={{ animationDelay: "0.4s" }}>
          <p
            className={`${
              lang === "ar" ? "type-arabic" : "type-serif"
            } text-[color:var(--color-ink-warm)] italic text-xl max-w-md`}
          >
            {c.submitted.line2}
          </p>
        </div>
        <div className="mt-16 h-px w-32 zari-line" />
      </section>
    );
  }

  return (
    <section className="relative min-h-screen surface-marble pt-32 pb-24">
      <div className="mx-auto max-w-[var(--container-text)] px-6 md:px-12">
        {/* Letter paper */}
        <div className="relative surface-pearl border border-[color:var(--color-mist)]/40 px-8 md:px-20 py-16 md:py-24 shadow-[0_60px_120px_-40px_oklch(0.135_0.005_60_/_0.25)]">
          {/* Decorative seal in corner */}
          <div className="absolute top-6 right-6 type-roman text-[0.82rem] text-[color:var(--color-zari-deep)] tracking-[0.3em] opacity-75">
            البِشت · ALBISHT
          </div>

          <p className="type-roman text-[0.95rem] text-[color:var(--color-zari-deep)] mb-10">
            {c.eyebrow}
          </p>

          {/* Type-written greeting */}
          <h1
            className={`${
              lang === "ar" ? "type-arabic-display" : "type-display"
            } text-[color:var(--color-ink)] min-h-[1.1em]`}
            style={{
              fontSize: "var(--text-h2)",
            }}
          >
            {typed}
            <span
              className="inline-block w-px h-[0.85em] align-[-0.05em] mr-1 bg-[color:var(--color-zari)]"
              style={{ animation: "blink 1.1s steps(2) infinite" }}
            />
          </h1>

          <p
            className={`${
              lang === "ar" ? "type-arabic" : "type-serif"
            } text-[color:var(--color-ink-warm)] text-lg md:text-xl italic mt-8 mb-6 leading-relaxed`}
          >
            {c.sub}
          </p>

          <p
            className={`${
              lang === "ar" ? "type-arabic" : "type-serif"
            } text-[color:var(--color-ink-soft)] text-lg leading-relaxed mb-16 max-w-lg`}
          >
            {c.body}
          </p>

          {/* Form — typographic fields */}
          <form ref={formRef} onSubmit={onSubmit} className="space-y-10">
            <Field label={c.fields.name} type="text" name="name" required />
            <Field label={c.fields.date} type="text" name="date" placeholder={c.fields.datePlaceholder} />
            <Field label={c.fields.guests} type="text" name="guests" />
            <Field label={c.fields.contact} type="text" name="contact" required />
            <FieldTextArea
              label={c.fields.notes}
              hint={c.fields.notesHint}
              name="notes"
            />

            {/* Wax seal submit */}
            <div className="pt-16 pb-8">
              <WaxSealButton label={c.submit} pending={pending} />
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  name,
  required,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  name: string;
  required?: boolean;
}) {
  return (
    <label className="block group">
      <span className="type-roman text-[0.92rem] text-[color:var(--color-ink-warm)] tracking-[0.2em] block mb-3">
        {label}
        {required && <span className="text-[color:var(--color-zari-deep)] ms-1">·</span>}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full bg-transparent border-b border-[color:var(--color-ink-warm)]/30 focus:border-[color:var(--color-zari-deep)] focus:outline-none py-3 text-xl type-serif text-[color:var(--color-ink)] transition-colors duration-500"
        style={{ transitionTimingFunction: "var(--ease-ceremonial)" }}
      />
    </label>
  );
}

function FieldTextArea({
  label,
  hint,
  name,
}: {
  label: string;
  hint?: string;
  name: string;
}) {
  return (
    <label className="block group">
      <span className="type-roman text-[0.92rem] text-[color:var(--color-ink-warm)] tracking-[0.2em] block mb-3">
        {label}{" "}
        {hint && (
          <span className="text-[color:var(--color-ink-warm)]/60 tracking-normal italic ms-1">
            {hint}
          </span>
        )}
      </span>
      <textarea
        name={name}
        rows={4}
        className="w-full bg-transparent border-b border-[color:var(--color-ink-warm)]/30 focus:border-[color:var(--color-zari-deep)] focus:outline-none py-3 text-lg type-serif text-[color:var(--color-ink)] transition-colors duration-500 resize-none"
        style={{ transitionTimingFunction: "var(--ease-ceremonial)" }}
      />
    </label>
  );
}
