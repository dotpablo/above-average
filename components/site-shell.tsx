import { Inter, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import type { Locale } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

/**
 * Cascarón común a los dos árboles de ruta. Cada idioma tiene su propio root
 * layout —es la forma de que `<html lang>` salga correcto en el HTML servido,
 * y no corregido por JS después— pero el resto del cascarón es el mismo.
 */
export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <html
      lang={locale}
      className={`${inter.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Limpia una cookie vieja de Google Translate que rompía el render. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.cookie='googtrans=;expires=Thu,01 Jan 1970 00:00:00 UTC;path=/';document.cookie='googtrans=;expires=Thu,01 Jan 1970 00:00:00 UTC;path=/;domain=.'+location.hostname;`,
          }}
        />
      </head>
      <body className="mx-auto max-w-2xl px-5 font-sans">
        <Nav locale={locale} />
        <main className="min-h-[70vh] py-10">{children}</main>
        <Footer locale={locale} />
        <Analytics />
      </body>
    </html>
  );
}
