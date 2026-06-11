# ALBISHT × Sanity — headless CMS

Bilingual (AR canonical + EN) headless CMS. The Next site reads content from
Sanity behind `NEXT_PUBLIC_USE_SANITY`; with the flag off it serves the original
static `lib/` content unchanged. The editing UI (Sanity Studio) runs **standalone**
via the Sanity CLI — it is intentionally NOT embedded in the Next bundle (Next
15.5's pre-compiled React predates a hook the Studio needs).

## What's in the repo

- `sanity.config.ts`, `sanity.cli.ts` — Studio config (schema, desk, Presentation
  visual editing) used by the `sanity` CLI.
- `sanity/schemaTypes/*`, `sanity/structure.ts` — content model + clean desk
  (Pages · Journal · Celebrations · Site settings). Bilingual via
  `localeString`/`localeText` (AR + EN side by side). Guardrails: required fields,
  list min/max, singletons locked.
- `lib/sanity/*` — client, GROQ queries, live/draft fetch.
- `lib/content/from-sanity.ts` + `globals.ts` — map docs → existing component
  shapes, with static fallback (defensive rendering).
- `sanity/import/run.ts` — one-shot importer: uploads photos + creates every
  document (AR + EN) from the `lib/` data.

## Done & verified
- Schema, adapter, all pages + globals wired to Sanity behind the flag.
- `tsc` clean; `next build` green (static fallback; Studio excluded from bundle).

## Remaining — you (one-time setup)

### 1. Create the project
1. **sanity.io/manage** → log in (Google `albishtwebsite@gmail.com`) → **Create project** "ALBISHT", dataset **production** (public).
2. Note the **Project ID**.
3. **API → Tokens**: create a **Viewer** token (draft preview) and an **Editor** token (import).
4. **API → CORS origins**: add `http://localhost:3300` and your live origin.

### 2. Fill `.env.local` (copy from `.env.local.example`)
```
NEXT_PUBLIC_USE_SANITY=true
NEXT_PUBLIC_SANITY_PROJECT_ID=<project id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_PREVIEW_ORIGIN=http://localhost:3300
SANITY_VIEWER_TOKEN=<viewer token>
SANITY_WRITE_TOKEN=<editor token>
```

### 3. Import content + assets
```
npm run sanity:import      # uploads ~37 photos + creates all docs (AR+EN), idempotent
```

### 4. Run / deploy the Studio (the editor's workspace)
```
npm run studio:dev         # local Studio at http://localhost:3333
npm run studio:deploy      # hosted at https://albisht.sanity.studio  (recommended for the brand owner)
```
`sanity deploy` asks for a hostname once → "albisht".

### 5. Visual editing (click-to-edit live preview)
Already configured in `sanity.config.ts` (Presentation tool → previewUrl =
`NEXT_PUBLIC_SANITY_PREVIEW_ORIGIN`, draft enable at `/api/draft-mode/enable`).
In the Studio open **Presentation** → the live site renders with editable overlays.

### 6. Go live
Deploy the Next app (Vercel) with the same env vars + `NEXT_PUBLIC_USE_SANITY=true`,
and set `NEXT_PUBLIC_SANITY_PREVIEW_ORIGIN` to the live URL.

## Editor guardrails baked in
- Clean desk: 7 fixed Pages, Journal/Celebrations collections, Site settings.
- AR + EN in one place per field; headlines keep the `*word*` gold convention.
- List lengths locked (acts/principles = 3; phones/hero = 1; nav 1–10; ≥1 tier).
- Singletons can't be duplicated/deleted; images have hotspot cropping.
- Defensive rendering: a missing/odd field falls back to the static copy — never crashes.
