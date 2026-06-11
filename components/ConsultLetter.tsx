"use client";

import { useEffect, useRef, useState } from "react";
import { CONSULT, CONSULT_EXTRAS } from "@/lib/copy";
import { PHONES, waHref, WA_DEFAULT_MESSAGE } from "@/lib/contact";
import { localizedDigits, type Lang } from "@/lib/i18n";
import { WaxSealButton } from "./WaxSealButton";
import { WhatsAppLink } from "./WhatsAppLink";

/**
 * The Letter — a single screen-wide piece of pearl paper.
 * Greeting is type-written letter by letter on mount (fast, skippable).
 * Form fields are typographic, underlined, no boxes.
 * Submit is the WaxSealButton; the letter is delivered through
 * POST /api/consult. On failure the seal releases and the direct
 * lines (phone + WhatsApp) are offered instead — the visitor is
 * never left at a dead end.
 */
export function ConsultLetter({
  lang,
  content,
  prefill,
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
  /** Prefills threaded in from the page's searchParams (?date=, ?package=, ?line=). */
  prefill?: { date?: string; packageId?: string; packageName?: string; line?: "mens" | "womens" };
}) {
  const c =
    content ?? {
      ...CONSULT[lang],
      fields: {
        ...CONSULT[lang].fields,
        datePlaceholder: lang === "ar" ? "شهر/سنة" : "Month / Year",
      },
    };
  const x = CONSULT_EXTRAS[lang];
  const [typed, setTyped] = useState("");
  const fullGreeting = c.headline;
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [line, setLine] = useState<"mens" | "womens">(prefill?.line ?? "mens");
  const formRef = useRef<HTMLFormElement>(null);
  // Remembered for the post-send WhatsApp continuation.
  const lastLetter = useRef<{ name: string; date: string } | null>(null);

  // Type the greeting quickly (40ms/char); finish instantly on click or
  // when the visitor prefers reduced motion. The previous 95ms cadence
  // made people wait seconds before the form felt "open".
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(fullGreeting);
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(fullGreeting.slice(0, i));
      if (i >= fullGreeting.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [fullGreeting]);
  const skipTyping = () => setTyped(fullGreeting);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sent || pending) return;
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      date: String(data.get("date") ?? "").trim(),
      guests: String(data.get("guests") ?? "").trim(),
      contact: String(data.get("contact") ?? "").trim(),
      notes: String(data.get("notes") ?? "").trim(),
      website: String(data.get("website") ?? ""), // honeypot — humans leave it empty
      line,
      package: prefill?.packageName ?? prefill?.packageId ?? "",
      lang,
    };
    lastLetter.current = { name: payload.name, date: payload.date };
    setFailed(false);
    setPending(true);
    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (res.ok && body?.ok) {
        setSent(true);
      } else {
        setFailed(true);
      }
    } catch {
      setFailed(true);
    } finally {
      setPending(false);
    }
  };

  /** WhatsApp continuation message — the letter's essence, re-spoken. */
  const waContinueMessage = () => {
    const base = WA_DEFAULT_MESSAGE[line][lang];
    const date = lastLetter.current?.date;
    if (!date) return base;
    return lang === "ar"
      ? `${base} التاريخ المُقترَح: ${date}.`
      : `${base} Intended date: ${date}.`;
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
        <div className="reveal-up mt-12" style={{ animationDelay: "0.7s" }}>
          <WhatsAppLink
            lang={lang}
            line={line}
            variant="chip"
            label={x.whatsappContinue}
            message={waContinueMessage()}
          />
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

          {/* Type-written greeting — click to finish instantly */}
          <h1
            onClick={skipTyping}
            className={`${
              lang === "ar" ? "type-arabic-display" : "type-display"
            } text-[color:var(--color-ink)] min-h-[1.1em] cursor-default`}
            style={{
              fontSize: "var(--text-h2)",
            }}
          >
            {typed}
            <span
              aria-hidden
              className="inline-block w-px h-[0.85em] align-[-0.05em] mr-1 bg-[color:var(--color-zari)]"
              style={{ animation: "blink 1.1s steps(2) infinite" }}
            />
            <span className="sr-only">{fullGreeting}</span>
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
            } text-[color:var(--color-ink-soft)] text-lg leading-relaxed mb-12 max-w-lg`}
          >
            {c.body}
          </p>

          {/* Chosen package — shown when the visitor arrived from a tier CTA */}
          {prefill?.packageName && (
            <div className="mb-10 flex items-baseline gap-3">
              <span className="type-roman text-[0.92rem] text-[color:var(--color-ink-warm)] tracking-[0.2em]">
                {x.packageLabel}
              </span>
              <span
                className={lang === "ar" ? "type-arabic-headline" : "type-serif"}
                style={{ color: "var(--color-zari-deep)", fontSize: "1.15rem" }}
              >
                {prefill.packageName}
              </span>
            </div>
          )}

          {/* Form — typographic fields */}
          <form ref={formRef} onSubmit={onSubmit} className="space-y-10">
            {/* The line: men's hall (full ceremony) or women's hospitality.
                Two quiet radio pills — different ateliers, different phones. */}
            <fieldset>
              <legend className="type-roman text-[0.92rem] text-[color:var(--color-ink-warm)] tracking-[0.2em] mb-4">
                {x.lineLabel}
              </legend>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {(
                  [
                    { id: "mens" as const, label: x.lineMens },
                    { id: "womens" as const, label: x.lineWomens },
                  ]
                ).map((opt) => {
                  const active = line === opt.id;
                  return (
                    <label
                      key={opt.id}
                      className="inline-flex items-center gap-3 cursor-pointer press-dim py-1.5"
                    >
                      <input
                        type="radio"
                        name="line"
                        value={opt.id}
                        checked={active}
                        onChange={() => setLine(opt.id)}
                        className="sr-only"
                      />
                      <span
                        aria-hidden
                        className="inline-block w-2.5 h-2.5 rounded-full border transition-all duration-500"
                        style={{
                          borderColor: "var(--color-zari)",
                          background: active
                            ? "linear-gradient(135deg, #E29F29 0%, #F6B62B 100%)"
                            : "transparent",
                          transform: active ? "scale(1.15)" : "scale(1)",
                          transitionTimingFunction: "var(--ease-ceremonial)",
                        }}
                      />
                      <span
                        className={lang === "ar" ? "type-arabic-headline" : "type-serif"}
                        style={{
                          fontSize: "1.1rem",
                          color: active ? "var(--color-ink)" : "var(--color-ink-warm)",
                          borderBottom: active
                            ? "1px solid var(--color-zari)"
                            : "1px solid transparent",
                          transition: "color 400ms var(--ease-ceremonial), border-color 400ms var(--ease-ceremonial)",
                          paddingBottom: "2px",
                        }}
                      >
                        {opt.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <Field label={c.fields.name} type="text" name="name" required autoComplete="name" />
            <Field
              label={c.fields.date}
              type="text"
              name="date"
              placeholder={c.fields.datePlaceholder}
              defaultValue={prefill?.date}
            />
            <Field label={c.fields.guests} type="text" name="guests" inputMode="numeric" />
            <Field label={c.fields.contact} type="text" name="contact" required autoComplete="tel email" />
            <FieldTextArea
              label={c.fields.notes}
              hint={c.fields.notesHint}
              name="notes"
            />

            {/* Honeypot — invisible to humans, irresistible to bots */}
            <div aria-hidden="true" className="absolute w-px h-px overflow-hidden -m-px" style={{ clip: "rect(0 0 0 0)" }}>
              <label>
                website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            {/* Wax seal submit */}
            <div className="pt-12 pb-2">
              <WaxSealButton label={pending ? x.sending : c.submit} pending={pending} />
            </div>
            <p className="text-center type-roman text-[0.82rem] text-[color:var(--color-ink-warm)]/80 pb-6">
              {x.promise}
            </p>
          </form>

          {/* Failure — the letter could not be sealed; open the direct doors */}
          {failed && (
            <div
              className="cc-rise mt-2 pt-8 border-t border-[color:var(--color-ink-warm)]/20 text-center"
              role="alert"
            >
              <p
                className={`${lang === "ar" ? "type-arabic-headline" : "type-serif"} mb-2`}
                style={{ color: "var(--color-ink)", fontSize: "1.2rem" }}
              >
                {x.error.line1}
              </p>
              <p
                className={`${lang === "ar" ? "type-arabic" : "type-serif"} italic mb-6`}
                style={{ color: "var(--color-ink-warm)", fontSize: "1.02rem" }}
              >
                {x.error.line2}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                <a
                  href={`tel:${PHONES[line].tel}`}
                  className="cc-phone-line"
                  dir="ltr"
                  style={{
                    fontFamily: lang === "ar" ? "var(--font-arabic)" : "var(--font-roman)",
                    fontSize: "1.15rem",
                    color: "var(--color-zari-deep)",
                    fontVariantNumeric: "lining-nums tabular-nums",
                    unicodeBidi: "isolate",
                  }}
                >
                  <span>{localizedDigits(PHONES[line].display, lang)}</span>
                  <span aria-hidden className="cc-phone-dot" />
                </a>
                <a
                  href={waHref(line, lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${lang === "ar" ? "type-arabic" : "type-roman"} press-dim py-2`}
                  style={{ color: "var(--color-zari-deep)", fontSize: lang === "ar" ? "1.05rem" : "0.9rem" }}
                >
                  {lang === "ar" ? "واتساب" : "WhatsApp"}
                </a>
              </div>
            </div>
          )}
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
  defaultValue,
  autoComplete,
  inputMode,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "text" | "tel" | "email";
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
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        inputMode={inputMode}
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
