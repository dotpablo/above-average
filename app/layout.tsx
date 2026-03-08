import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SITE } from "@/lib/constants";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const lora = Lora({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: { default: SITE.title, template: `%s — ${SITE.name}` },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
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
    <html lang="es" className={`${inter.variable} ${lora.variable}`}>
      <body className="mx-auto max-w-2xl px-6 font-sans">
        <Nav />
        <main className="min-h-[70vh] py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
