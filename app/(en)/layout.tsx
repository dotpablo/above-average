import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { SITE } from "@/lib/constants";
import { SITE_I18N } from "@/lib/i18n";
import "../globals.css";

const t = SITE_I18N.en;

export const metadata: Metadata = {
  title: { default: t.title, template: `%s — ${SITE.name}` },
  description: t.description,
  metadataBase: new URL(SITE.url),
  alternates: {
    languages: {
      es: "/",
      en: "/en",
      "x-default": "/en",
    },
    types: { "application/rss+xml": `${SITE.url}/feed-en.xml` },
  },
  openGraph: {
    title: t.title,
    description: t.description,
    url: `${SITE.url}/en`,
    siteName: SITE.name,
    locale: "en_US",
    alternateLocale: "es_ES",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: t.title, description: t.description },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
