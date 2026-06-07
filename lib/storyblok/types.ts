/**
 * Types for Storyblok stories as returned by the Content Delivery API when
 * fetched WITH a `language` param (field-level translations are already
 * flattened to the requested language — so every translatable field is a plain
 * string here, not a per-language map).
 *
 * These mirror storyblok/components.json. Keep the two in sync.
 */

export type SbAsset = {
  id: number | null;
  filename: string | null;
  alt: string | null;
  name?: string | null;
  title?: string | null;
  focus?: string | null;
};

export type SbBlok = {
  _uid: string;
  component: string;
};

/* ---- nested bloks ---------------------------------------------------- */

export type SbPhone = SbBlok & {
  tel: string;
  display: string;
  label: string;
  note: string;
  weight: "primary" | "secondary";
};

export type SbSocial = SbBlok & {
  platform: "instagram" | "facebook" | "tiktok";
  handle: string;
  url: string;
};

export type SbNavItem = SbBlok & { label: string; href: string };

export type SbSeo = SbBlok & {
  title: string;
  description: string;
  og_image: SbAsset;
};

export type SbPageHero = SbBlok & {
  eyebrow: string;
  headline: string;
  intro: string;
};

export type SbAct = SbBlok & {
  kicker: string;
  title: string;
  line: string;
  photo: SbAsset;
};

export type SbPrinciple = SbBlok & {
  word_ar: string;
  word_en: string;
  body: string;
  photo: SbAsset;
};

export type SbPhase = SbBlok & {
  name_ar: string;
  name_en: string;
  body: string;
  photo: SbAsset;
};

export type SbChapter = SbBlok & {
  number: string;
  title: string;
  body: string;
  pullquote: string;
};

export type SbPackageSection = SbBlok & {
  key: "hall" | "lobby" | "hospitality" | "photography" | "exterior" | "";
  custom_label: string;
  bullets: string; // one per line
};

export type SbPackageTier = SbBlok & {
  uid: string;
  tier_slug: string;
  name: string;
  price_qar: string; // Storyblok number fields are stored as strings — coerce with Number()
  highlight: string;
  photo: SbAsset;
  sections: SbPackageSection[];
};

export type SbSectionLabel = SbBlok & { key: string; label: string };

export type SbCapacityTier = SbBlok & { capacity: string; note: string }; // number stored as string

export type SbBeverageItem = SbBlok & { name: string };
export type SbBeverageCategory = SbBlok & {
  name: string;
  items: SbBeverageItem[];
};

/* ---- content types --------------------------------------------------- */

export type SbGlobals = {
  phone_mens: SbPhone[];
  phone_womens: SbPhone[];
  email: string;
  location: string;
  reception_hours: string;
  socials: SbSocial[];
  nav: SbNavItem[];
  footer_tagline: string;
  footer_address: string;
  footer_rights: string;
  callout_eyebrow: string;
  callout_title: string;
  callout_intro: string;
  callout_letter_label: string;
  callout_letter_desc: string;
  callout_letter_action: string;
  callout_call_title: string;
  callout_call_desc: string;
};

export type SbHomePage = {
  seo: SbSeo[];
  hero_eyebrow: string;
  hero_headline: string;
  hero_subline: string;
  hero_cta_label: string;
  hero_cta_href: string;
  hero_image: SbAsset;
  reveal_phrase: string;
  promise_title: string;
  promise_lines: string;
  acts_label: string;
  acts_heading: string;
  acts: SbAct[];
  celebrations_label: string;
  celebrations_title: string;
  celebrations_intro: string;
  invitation_title: string;
  invitation_line1: string;
  invitation_line2: string;
  invitation_cta_label: string;
  invitation_cta_href: string;
};

export type SbAtelierPage = {
  seo: SbSeo[];
  hero: SbPageHero[];
  principles_label: string;
  principles: SbPrinciple[];
  network_label: string;
  network_title: string;
  network_body: string;
  network_photo: SbAsset;
  terms_label: string;
  terms_title: string;
  terms_lines: string;
};

export type SbHeritagePage = {
  seo: SbSeo[];
  hero: SbPageHero[];
  intro_image: SbAsset;
  chapters: SbChapter[];
  intermezzo_image: SbAsset;
};

export type SbServicesPage = {
  seo: SbSeo[];
  hero: SbPageHero[];
  phases: SbPhase[];
  intermezzo_image: SbAsset;
};

export type SbConsultPage = {
  seo: SbSeo[];
  eyebrow: string;
  headline: string;
  sub: string;
  body: string;
  field_name_label: string;
  field_date_label: string;
  field_date_placeholder: string;
  field_guests_label: string;
  field_contact_label: string;
  field_notes_label: string;
  field_notes_hint: string;
  submit_label: string;
  submitted_line1: string;
  submitted_line2: string;
};

export type SbContactPage = {
  seo: SbSeo[];
  hero: SbPageHero[];
  primary_image: SbAsset;
  letter_label: string;
  letter_headline: string;
  letter_body: string;
  letter_cta_label: string;
};

export type SbPackagesPage = {
  seo: SbSeo[];
  hero: SbPageHero[];
  mens_eyebrow: string;
  mens_title: string;
  mens_intro: string;
  mens_cta: string;
  price_label: string;
  section_labels: SbSectionLabel[];
  mens_tiers: SbPackageTier[];
  womens_eyebrow: string;
  womens_title: string;
  womens_intro: string;
  womens_hospitality_title: string;
  womens_beverages_title: string;
  womens_per_person: string;
  womens_per_tray: string;
  womens_enquire_label: string;
  womens_phone_label: string;
  womens_menu_title: string;
  womens_hospitality: SbCapacityTier[];
  womens_beverages: SbCapacityTier[];
  womens_menu: SbBeverageCategory[];
};

export type SbJournalEntry = {
  seo: SbSeo[];
  kicker: string;
  title: string;
  excerpt: string;
  cover_photo: SbAsset;
  body: unknown; // richtext doc
  published_at: string;
  featured: boolean;
};

export type SbCelebrationCase = {
  title: string;
  when: string;
  where: string;
  guests: string;
  note: string;
  photo: SbAsset;
  published_at: string;
};
