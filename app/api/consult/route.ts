import { NextResponse } from "next/server";

/**
 * Consult letter delivery.
 *
 * The consult form posts a small JSON body here; we compose a plain-text
 * "letter" and hand it to Resend. Plain text is deliberate — the letter is
 * read by a person at the atelier, not rendered, and text-only mail is the
 * least likely to be mangled or spam-filtered.
 *
 * Node runtime: we rely on module-level state for the rate limiter and on
 * plain fetch for delivery, neither of which needs the edge runtime.
 */
export const runtime = "nodejs";

/* ----------------------------------------------------------------------- */
/* Rate limiting                                                            */
/* ----------------------------------------------------------------------- */

// A light in-memory limiter: per-IP timestamps inside a sliding window.
// Serverless instances reset this map on every cold start, so the limit is
// best-effort by design — it only needs to blunt accidental double-submits
// and naive scripted abuse, not survive a determined attacker. Acceptable.
const RATE_WINDOW_MS = 10 * 60 * 1000; // ten minutes
const RATE_MAX_HITS = 5;
const rateHits = new Map<string, number[]>();

/**
 * Records a hit for the given key and reports whether it stays within the
 * allowance. Stale timestamps (and emptied keys) are pruned on every call so
 * the map cannot grow without bound on a long-lived instance.
 */
function withinRateLimit(key: string): boolean {
  const now = new Date().getTime();
  const cutoff = now - RATE_WINDOW_MS;

  for (const [k, stamps] of rateHits) {
    const fresh = stamps.filter((t) => t > cutoff);
    if (fresh.length === 0) {
      rateHits.delete(k);
    } else if (fresh.length !== stamps.length) {
      rateHits.set(k, fresh);
    }
  }

  const recent = rateHits.get(key) ?? [];
  if (recent.length >= RATE_MAX_HITS) return false;

  recent.push(now);
  rateHits.set(key, recent);
  return true;
}

/* ----------------------------------------------------------------------- */
/* Input validation                                                         */
/* ----------------------------------------------------------------------- */

// Sentinel distinguishing "field absent or empty" (fine for optional fields)
// from "field present but malformed" (rejected outright).
const INVALID = Symbol("invalid");

/**
 * Normalises one body field: absent/empty becomes undefined, a well-formed
 * string is trimmed, anything else (wrong type, over the length cap) is
 * flagged invalid. Caps are generous for humans and tight enough that the
 * letter stays a letter, not a payload.
 */
function cleanField(value: unknown, max: number): string | undefined | typeof INVALID {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== "string") return INVALID;
  const trimmed = value.trim();
  if (trimmed.length === 0) return undefined;
  if (trimmed.length > max) return INVALID;
  return trimmed;
}

/* ----------------------------------------------------------------------- */
/* Handler                                                                  */
/* ----------------------------------------------------------------------- */

export async function POST(req: Request) {
  try {
    // Malformed JSON is a client error, not a server fault.
    let raw: unknown;
    try {
      raw = await req.json();
    } catch {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }
    if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }
    const body = raw as Record<string, unknown>;

    // Honeypot: the visible form never fills `website`, so any value means a
    // bot. We answer success and do nothing — silence teaches the bot less
    // than an error would.
    if (typeof body.website === "string" && body.website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    // Rate limit per IP. Behind a proxy the first x-forwarded-for entry is
    // the original client; locally there is no header, so everything shares
    // one bucket — fine for development.
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    if (!withinRateLimit(ip)) {
      return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
    }

    // Validate and normalise. name + contact are the only required fields:
    // without them the atelier cannot answer the letter.
    const name = cleanField(body.name, 200);
    const contact = cleanField(body.contact, 200);
    const date = cleanField(body.date, 300);
    const guests = cleanField(body.guests, 300);
    const notes = cleanField(body.notes, 3000);
    const lineField = cleanField(body.line, 300);
    const pkg = cleanField(body.package, 300);
    const langField = cleanField(body.lang, 300);

    // Checked one by one (rather than via an array) so TypeScript narrows
    // each constant to plain string | undefined past this point.
    if (
      name === INVALID ||
      contact === INVALID ||
      date === INVALID ||
      guests === INVALID ||
      notes === INVALID ||
      lineField === INVALID ||
      pkg === INVALID ||
      langField === INVALID ||
      !name ||
      !contact
    ) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    // line / lang come from fixed controls on the form; anything else is a
    // tampered request and treated as invalid rather than guessed at.
    if (lineField !== undefined && lineField !== "mens" && lineField !== "womens") {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }
    if (langField !== undefined && langField !== "ar" && langField !== "en") {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }
    const line = lineField as "mens" | "womens" | undefined;
    const lang = langField as "ar" | "en" | undefined;

    // Compose the letter. The subject leads with the line so letters sort
    // naturally in the inbox; the body lists only the fields the guest
    // actually provided.
    const lineLabel = line === "womens" ? "Women's hospitality" : "Men's hall";
    const subject = `Consult — ${lineLabel}${pkg ? " — " + pkg : ""} — ${name}`;

    const rows: Array<[string, string | undefined]> = [
      ["Name", name],
      ["Line", line ? lineLabel : undefined],
      ["Package", pkg],
      ["Date", date],
      ["Guests", guests],
      ["Contact", contact],
      ["Notes", notes],
      ["Language", lang ? (lang === "ar" ? "Arabic" : "English") : undefined],
      ["Received", new Date().toISOString()],
    ];
    const text = rows
      .filter((row): row is [string, string] => Boolean(row[1]))
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n");

    // Without an API key the route still accepts letters and logs them
    // server-side, so the form keeps working before email is configured.
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.log("[consult letter]", subject, text);
      return NextResponse.json({ ok: true, delivered: false });
    }

    // If the guest left an email address as their contact, wire it up as
    // reply-to so the atelier can answer with a single click.
    const looksLikeEmail = /.+@.+\..+/.test(contact);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONSULT_FROM_EMAIL || "ALBISHT <onboarding@resend.dev>",
        to: [process.env.CONSULT_TO_EMAIL || "hello@albisht.qa"],
        subject,
        text,
        ...(looksLikeEmail ? { reply_to: contact } : {}),
      }),
    });

    if (!res.ok) {
      // Log the provider's explanation for the operator; the client only
      // needs to know delivery failed so it can offer the WhatsApp fallback.
      console.error("[consult] delivery failed:", await res.text());
      return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[consult] unexpected error:", err);
    return NextResponse.json({ ok: false, error: "unknown" }, { status: 500 });
  }
}
