import { defineLive } from "next-sanity/live";
import { client } from "./client";

/**
 * Live content API: `sanityFetch` is draft-aware (serves drafts inside the
 * Presentation/Visual Editor) and `<SanityLive />` (rendered in the layout)
 * pushes live updates so edits appear without a reload.
 *
 * The viewer token is read-only; it is only used for draft previews.
 */
const token = process.env.SANITY_VIEWER_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
