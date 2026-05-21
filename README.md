# ALBISHT

> *Qatari Wedding Atelier — Doha · Men's Hall Specialism*

The ceremonial atelier for the men's hall of the Qatari wedding. Three hundred ceremonies a year. No two alike.

This repository hosts the website — a bilingual (Arabic-primary, English-mirror) site built around the bisht: the ceremonial cloak worn by the groom and the heart of the brand.

## Stack

- **Next.js 15** (App Router) · TypeScript
- **Tailwind CSS v4** with custom OKLCH design tokens
- **Framer Motion** + **GSAP** for choreographed motion
- **sharp** for image optimisation (104 MB → 10 MB)
- Self-hosted typography: Italiana · Cinzel · Cardo · Amiri · Markazi Text

## Local development

```bash
npm install
npm run dev
```

The site serves at <http://localhost:3300>. Default route redirects to `/ar` (Arabic, RTL). Append `?intro=play` to any URL to re-trigger the Bisht Reveal cinematic.

## Project structure

```
app/
  [lang]/            ar/en route segments with shared layout
    atelier/         The studio's principles + network
    celebrations/    Anonymised portfolio timeline
    consult/         The Letter — typewriter greeting + wax-seal submit
    contact/         Doha address
    heritage/        Long-read essay on the bisht
    journal/         Cultural notes
    services/        The 8-phase ceremonial protocol
    page.tsx         Home (hero + promise + three acts + celebrations + invitation)
  globals.css        Design system: OKLCH tokens, type scale, motion primitives
  layout.tsx         Root HTML, font preconnect, metadata

components/
  BishtReveal.tsx          5.4s cinematic intro (cloak parting → pearl light)
  ActsParallax.tsx         "The evening in three acts" tryptiek
  CelebrationsTimeline.tsx Anonymous case timeline
  ConsultLetter.tsx        The Letter page with typewriter greeting
  WaxSealButton.tsx        Submit-as-wax-seal with logo imprint
  Logo.tsx                 Brand mark, dark/light variants
  ZariProgress.tsx         Gold zari-thread scroll progress
  ChandelierCursor.tsx     Warm-glow cursor (desktop only)
  ...

lib/
  copy.ts            All bilingual copy (AR canonical, EN mirror)
  i18n.ts            Language config + Hindi-Arabic numeral helpers

public/
  logo.png, logo-dark.png, logo-light.png  Brand marks
  photos/            Optimised hall / majlis / craft imagery

scripts/
  optimize-photos.mjs   Bulk JPEG resize + mozjpeg encode
  process-logo.mjs      Generate light-variant of logo via pixel classification
```

## Brand promise

> *"De mannenzaal die de Diwan waardig is. De bisht eer aandoen."*
> The men's hall worthy of the Diwan. Honouring the bisht.

## License

Private — © ALBISHT 2026.
