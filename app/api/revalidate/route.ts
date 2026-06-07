import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * On-demand revalidation.
 *
 * Baseline freshness is time-based ISR (each page sets `revalidate = 900`, i.e.
 * 15 min). This endpoint is the INSTANT path: after publishing in Storyblok the
 * brand owner clicks the "Republish ALBISHT" bookmarklet (see
 * storyblok/bookmarklet.md), which opens this URL and refreshes every page
 * within seconds — no full redeploy.
 *
 * It also doubles as a Storyblok publish-webhook target if the space is ever
 * upgraded to a plan that includes webhooks.
 *
 * Auth: a shared secret in the query string (STORYBLOK_REVALIDATE_SECRET).
 */

function handle(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret");
  if (!process.env.STORYBLOK_REVALIDATE_SECRET || secret !== process.env.STORYBLOK_REVALIDATE_SECRET) {
    return NextResponse.json({ revalidated: false, message: "Invalid secret" }, { status: 401 });
  }
  // Revalidate the whole [lang] tree (both ar and en) in one call.
  revalidatePath("/[lang]", "layout");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}

export async function GET(request: Request) {
  return handle(request);
}

export async function POST(request: Request) {
  return handle(request);
}
