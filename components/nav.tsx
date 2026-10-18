"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DICT, type Locale } from "@/lib/i18n";

/**
 * Equivalente de cada sección en el otro idioma. Los artículos los resuelve la
 * propia página, que es la que tiene el mapa de traducciones; acá van las
 * secciones fijas. Sin equivalencia, el selector cae a la home del otro idioma.
 */
const PARES: [string, string][] = [
  ["/", "/en"],
  ["/blog", "/en/blog"],
  ["/about", "/en/about"],
  ["/videos", "/en/videos"],
  ["/charlas", "/en/talks"],
  ["/recursos", "/en/resources"],
  ["/trabajar-juntos", "/en/contact"],
];

function otroIdioma(pathname: string, locale: Locale): string {
  for (const [es, en] of PARES) {
    if (locale === "es" && pathname === es) return en;
    if (locale === "en" && pathname === en) return es;
  }
  return locale === "es" ? "/en" : "/";
}

export function Nav({ locale = "es" as Locale }: { locale?: Locale }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = DICT[locale];
  const alterno = otroIdioma(pathname, locale);

  const links =
    locale === "es"
      ? [
          { href: "/blog", label: t.nav.blog },
          { href: "/videos", label: t.nav.videos },
          { href: "/recursos", label: t.nav.resources },
          { href: "/charlas", label: t.nav.talks },
          { href: "/about", label: t.nav.about },
        ]
      : [
          { href: "/en/blog", label: t.nav.blog },
          { href: "/en/videos", label: t.nav.videos },
          { href: "/en/resources", label: t.nav.resources },
          { href: "/en/talks", label: t.nav.talks },
          { href: "/en/about", label: t.nav.about },
        ];

  return (
    <nav className="flex items-center justify-between border-b border-neutral-800 py-5">
      <Link
        href={locale === "es" ? "/" : "/en"}
        className="font-serif text-lg text-white transition-colors hover:text-accent"
      >
        Pablo Marichal
      </Link>

      {/* Desktop nav */}
      <ul className="hidden md:flex items-center gap-1 text-sm">
        {links.map((link) => {
          const active =
            pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <li key={link.href} className="relative">
              <Link
                href={link.href}
                className={`relative rounded-md px-2.5 py-1.5 transition-colors ${
                  active ? "text-white" : "text-neutral-500 hover:text-white"
                }`}
              >
                {link.label}
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-x-1 -bottom-[13px] h-[2px] bg-accent"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          );
        })}
        <li className="ml-1.5 border-l border-neutral-800 pl-2.5">
          <Link
            href={alterno}
            hrefLang={locale === "es" ? "en" : "es"}
            className="rounded-md px-1.5 py-1.5 text-neutral-500 transition-colors hover:text-accent"
          >
            {t.switcher.other}
          </Link>
        </li>
      </ul>

      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        className="flex md:hidden flex-col gap-1.5 p-2"
        aria-label="Menu"
      >
        <motion.span
          className="block h-[1.5px] w-5 bg-neutral-400"
          animate={mobileOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block h-[1.5px] w-5 bg-neutral-400"
          animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.15 }}
        />
        <motion.span
          className="block h-[1.5px] w-5 bg-neutral-400"
          animate={mobileOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 top-[69px] z-50 bg-neutral-950/98 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-2 p-6">
              {links.map(
                (link, i) => {
                  const active =
                    pathname === link.href ||
                    pathname.startsWith(link.href + "/");
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block rounded-lg px-4 py-3 text-lg font-serif transition-colors ${
                          active
                            ? "text-accent bg-neutral-900"
                            : "text-neutral-400 hover:text-white hover:bg-neutral-900/50"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                }
              )}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: links.length * 0.05, duration: 0.3 }}
                className="mt-2 border-t border-neutral-800 pt-4"
              >
                <Link
                  href={alterno}
                  hrefLang={locale === "es" ? "en" : "es"}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-3 font-serif text-lg text-neutral-400 transition-colors hover:bg-neutral-900/50 hover:text-white"
                >
                  {t.switcher.other}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
