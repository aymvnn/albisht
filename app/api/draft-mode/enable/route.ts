import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/lib/sanity/client";

/**
 * Enables Next.js Draft Mode for the Presentation (Visual Editor) tool, so the
 * brand owner sees unpublished edits live. The Studio calls this URL; the
 * viewer token authorises reading drafts.
 */
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: process.env.SANITY_VIEWER_TOKEN }),
});
