import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALBISHT — البِشت · Qatari Men's Hall Atelier",
  description:
    "ALBISHT is the Qatari ceremonial atelier for the men's hall of the wedding. Three hundred ceremonies a year. None of them repeated.",
  metadataBase: new URL("http://localhost:3300"),
  openGraph: {
    title: "ALBISHT — البِشت",
    description: "Qatari Men's Hall Atelier · Doha",
    type: "website",
    locale: "ar_QA",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Italiana&family=Cardo:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@400;500;600&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Markazi+Text:wght@400;500;600&family=Aref+Ruqaa:wght@400;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
