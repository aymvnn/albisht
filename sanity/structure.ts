import type { StructureResolver } from "sanity/structure";

/**
 * Clean desk for a non-technical editor:
 *   Pages        → the 7 single pages (Home, Atelier, …) as one-click entries
 *   Journal      → collection (add/remove entries)
 *   Celebrations → collection
 *   Site settings→ globals (phones, footer, social, call-out)
 */
const PAGE_TITLES: Record<string, string> = {
  homePage: "Home",
  atelierPage: "Atelier",
  packagesPage: "Packages",
  heritagePage: "Heritage",
  servicesPage: "Services",
  consultPage: "Consult",
  contactPage: "Contact",
};

export const structure: StructureResolver = (S) =>
  S.list()
    .title("ALBISHT")
    .items([
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items(
              Object.entries(PAGE_TITLES).map(([id, title]) =>
                S.listItem()
                  .id(id)
                  .title(title)
                  .child(S.document().schemaType(id).documentId(id))
              )
            )
        ),
      S.divider(),
      S.documentTypeListItem("journalEntry").title("Journal"),
      S.documentTypeListItem("celebrationCase").title("Celebrations"),
      S.divider(),
      S.listItem()
        .id("globals")
        .title("Site settings")
        .child(S.document().schemaType("globals").documentId("globals")),
    ]);
