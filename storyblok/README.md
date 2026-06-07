# ALBISHT × Storyblok — runbook

Headless CMS for the ALBISHT site. **Arabic is canonical**, English is a
field-level translation. The motion/design components stay code-owned; Storyblok
only supplies *content*.

This folder is self-contained:

```
storyblok/
  components.json        the full content model (25 components)
  bookmarklet.md         "Republish ALBISHT" instant-publish bookmarklet
  migrate/
    mapi.ts              Management-API client + helpers (i18n, upsert)
    push-components.ts   pushes components.json into the space
    assets.ts            uploads public/photos → Asset Library, writes asset-map.json
    content.ts           builds every story from lib/ data (AR + EN)
    run.ts               orchestrator (npm run sb:migrate)
    asset-map.json       generated — old path → Storyblok asset (gitignored-ish)
```

---

## Status

**Done (this branch `storyblok-integration`):**
- Content model authored (`components.json`).
- Runtime SDK layer (`lib/storyblok/*`) — headless fetch + editor bridge, flag-gated.
- Inline page content extracted to `lib/inline-content.ts`; pages now read one source.
- Full migration pipeline (languages → schema → assets → all stories, AR+EN).
- On-demand revalidation route + instant-publish bookmarklet.
- Build is green with `NEXT_PUBLIC_USE_STORYBLOK=false` (site unchanged).

**Done & verified (this branch `storyblok-integration`):**
- Space created (EU, id 292974725614347), EN language added.
- Schema (25 components) + all stories migrated (AR + EN) + 37 assets in the Asset Library.
- Every page AND the globals (header/footer/contact call-out) wired to read Storyblok,
  with static fallback. `next build` and a running server confirm pages render Storyblok
  content (a.storyblok.com assets, AR/EN copy) in both languages.

**Remaining (you):**
1. In Storyblok → Settings → Visual Editor, set the preview URL (Step 4) so the brand
   owner gets click-to-edit + live preview.
2. Deploy to Vercel with the env vars set and `NEXT_PUBLIC_USE_STORYBLOK=true` (Step 6).

---

## Step 1 — Create the account & space (manual, ~5 min)

> This is the one step that can't be scripted (email verification + captcha).

1. Go to <https://app.storyblok.com/#/signup> and sign up with
   **albishtwebsite@gmail.com**. Verify the email.
2. Create a new **Space** → name `ALBISHT` → **region: EU**.
3. Settings → **General**: copy the numeric **Space ID**.
4. Settings → **Access Tokens**: copy the **Preview** token (delivery, public).
5. Account avatar → **Account settings → Personal access tokens**: create one and
   copy it (this is the **Management** token used by the migration).

## Step 2 — Configure env

```bash
cp .env.local.example .env.local
```
Fill in:
- `STORYBLOK_SPACE_ID` = the numeric id
- `STORYBLOK_OAUTH_TOKEN` = the Personal access token
- `NEXT_PUBLIC_STORYBLOK_TOKEN` = the Preview token
- `STORYBLOK_REVALIDATE_SECRET` = any long random string
- regions stay `eu`

## Step 3 — Run the migration (scripted, ~3–5 min)

```bash
npm run sb:migrate          # languages → components → assets → content
```
Or step by step:
```bash
npm run sb:lang             # add English as a translation language
npm run sb:components       # push the 25-component schema
npm run sb:assets           # upload public/photos → Asset Library
npm run sb:content          # create/update every story (AR + EN)
```
All steps are **idempotent** — safe to re-run. After this the space contains:
`globals`, `home`, `atelier`, `heritage`, `services`, `consult`, `contact`,
`packages`, a `journal/` folder (3 entries) and a `celebrations/` folder (3 entries),
every field filled in Arabic and English.

> If `sb:assets` fails (asset API hiccups), the content still migrates using the
> original `/photos/...` paths, which the app serves from `/public`. You can
> re-run `npm run sb:assets` later and then `npm run sb:content` to switch the
> asset fields over.

## Step 4 — Visual Editor

1. Space → **Settings → Visual Editor → Location**: set the preview URL to your
   running site, e.g. `https://albisht-cms.vercel.app/ar/` (preview deploy) or
   `http://localhost:3300/ar/` for local.
2. Space → **Settings → Languages**: set the **fallback** for empty fields to the
   default (Arabic), so an untranslated EN field shows the AR text rather than blank.
3. Open any story — the right pane renders the site; section wrappers become
   clickable once Step 5 is wired.

## Step 5 — Wire the frontend (✓ DONE — kept for reference)

This is already implemented on the branch: `lib/content/from-storyblok.ts` maps each
story to the existing component shapes, `lib/content/globals.ts` serves header/footer/
call-out data, and every page fetches its story behind `USE_STORYBLOK` with static
fallback. The pattern used for a **server component** page:

```tsx
import { USE_STORYBLOK } from "@/lib/storyblok/api";
import { getStoryContent } from "@/lib/storyblok/fetch";
import type { SbAtelierPage } from "@/lib/storyblok/types";

export const revalidate = 900; // 15-min ISR

export default async function AtelierPage({ params }) {
  const { lang } = await params;
  if (USE_STORYBLOK) {
    const sb = await getStoryContent<SbAtelierPage>("atelier", lang);
    // map sb.* → the same props the JSX already uses, then render
  }
  // else: existing static render (unchanged)
}
```

### Defensive rendering — mandatory rule

Every Storyblok read MUST degrade gracefully. A moved/renamed/deleted story, a
cleared field, or an unexpected list length may **never** crash or blank a page.
When wiring each page:

- If `getStoryContent(slug)` returns `null`, fall back to the static `lib/*`
  content for that page — the site keeps working even if a story is broken.
- Read through fallbacks, never trust presence:
  `const headline = sb?.hero?.[0]?.headline || STATIC.headline;`
- Resolve images via `asset?.filename || "/photos/.../fallback.jpg"` so a cleared
  asset never yields a broken image.
- Guard every list: `(sb?.acts ?? []).map(...)`. The schema min/max keeps counts
  sane, but code must not assume it.
- Keep headlines flowing through `<FormatHeadline>` so `*word*` markup is always
  parsed, even on freshly edited text.

> Rule of thumb: **Storyblok supplies content, never control flow.** If data is
> absent or odd, render the static fallback — don't throw.

Per-page checklist (each maps story → existing JSX, keeping all markup/motion):
- [ ] `home` (note: `HomeHero`, `SiteHeader` are client components — fetch in the
      server parent and pass content down as props; celebrations strip + the
      `/celebrations` page read the `celebrations/` folder via `getStoryList`)
- [ ] `atelier`  - [ ] `heritage`  - [ ] `services`  - [ ] `packages`
- [ ] `consult` (client `ConsultLetter` — pass content as props)
- [ ] `contact`  - [ ] `journal` (list via `getStoryList("journal")`)
- [ ] `globals` → `SiteHeader` / `SiteFooter` / `ContactCallout` (nav, phones, callout)
- [ ] Render `<StoryblokBridgeLoader />` once in `app/[lang]/layout.tsx`
- [ ] Enable Draft Mode in the editor iframe (a `/api/draft?secret=…` route)
- [ ] Add `{...storyblokEditable(blok)}` on section wrappers for click-to-edit

Keep `USE_STORYBLOK=false` until a page is wired AND verified, then flip per-page
or globally.

## Step 6 — Go live

1. Set the same env vars in Vercel (Project → Settings → Environment Variables),
   with `NEXT_PUBLIC_USE_STORYBLOK=true`.
2. Deploy. Set up the **Republish bookmarklet** (`storyblok/bookmarklet.md`).

---

## Daily editing (brand owner)

1. Open the story, edit Arabic (right) and English (left) side by side.
2. **Save & publish.**
3. Click **Republish ALBISHT** (instant) — or wait 15 min (automatic).

## Brand guardrails baked in

- Merk-pages are fixed forms — no free section drag-and-drop.
- **List lengths locked in the schema** so the editor can't delete a section away
  or pad the page: acts & principles fixed at 3; hero & SEO exactly 1; phones
  exactly 1; nav 1–10; packages ≥1 (extensible); each tier ≥1 section.
- Headlines: wrap one word per line in `*asterisks*` to make it gold-italic.
- Package tiers/sections are extendable (a 6th tier or a "Music" section is allowed).
- Colours, fonts, layout, the bisht-reveal cinematic and all motion stay in code.
