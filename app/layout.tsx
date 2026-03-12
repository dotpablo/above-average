import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SITE } from "@/lib/constants";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: { default: SITE.title, template: `%s — ${SITE.name}` },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  alternates: {
    types: {
      "application/rss+xml": `${SITE.url}/feed.xml`,
    },
  },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Clear any leftover Google Translate cookie */}
        <script dangerouslySetInnerHTML={{ __html: `document.cookie='googtrans=;expires=Thu,01 Jan 1970 00:00:00 UTC;path=/';document.cookie='googtrans=;expires=Thu,01 Jan 1970 00:00:00 UTC;path=/;domain=.'+location.hostname;` }} />
      </head>
      <body className="mx-auto max-w-2xl px-5 font-sans">
        <Nav />
        <main className="min-h-[70vh] py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
