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
      <body className="font-sans">
        {/* Nav y footer van al ancho de la home (960); el contenido conserva
            el ancho de lectura. Antes el nav era más angosto que la home. */}
        <div className="mx-auto max-w-[1000px] px-5">
          <Nav locale={locale} />
        </div>
        <main className="mx-auto min-h-[70vh] max-w-2xl px-5 py-10 sm:py-14">{children}</main>
        <div className="mx-auto max-w-[1000px] px-5">
          <Footer locale={locale} />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
