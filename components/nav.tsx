"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/recursos", label: "Recursos" },
  { href: "/media", label: "Media" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between border-b border-neutral-800 py-5">
      <Link href="/" className="flex items-center gap-2.5">
        <Image
          src="/images/logo.png"
          alt="Above Average"
          width={28}
          height={28}
          className="h-7 w-7 invert"
        />
        <span className="font-serif text-lg text-white hidden sm:inline">
          Above Average
        </span>
      </Link>

      {/* Desktop nav */}
      <ul className="hidden sm:flex items-center gap-1 text-sm">
        {links.map((link) => {
          const active =
            pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <li key={link.href} className="relative">
              <Link
                href={link.href}
                className={`relative rounded-md px-3 py-1.5 transition-colors ${
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
        <li>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/trabajar-juntos"
              className={`ml-2 inline-block rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                pathname === "/trabajar-juntos"
                  ? "border-accent text-accent"
                  : "border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white"
              }`}
            >
              Trabajar juntos
            </Link>
          </motion.div>
        </li>
      </ul>

      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        className="flex sm:hidden flex-col gap-1.5 p-2"
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
            className="fixed inset-0 top-[69px] z-50 bg-neutral-950/98 backdrop-blur-md sm:hidden"
          >
            <div className="flex flex-col gap-2 p-6">
              {[...links, { href: "/trabajar-juntos", label: "Trabajar juntos" }].map(
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
