"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { SITE } from "@/lib/constants";
import { DICT, type Locale } from "@/lib/i18n";

const socials = [
  { label: "LinkedIn", href: SITE.social.linkedin },
  { label: "YouTube", href: SITE.social.youtube },
  { label: "Instagram personal", href: SITE.social.instagram },
  { label: "Pablo cocinando", href: SITE.social.instagramCooking },
  { label: "TikTok", href: SITE.social.tiktok },
  { label: "Threads", href: SITE.social.threads },
  { label: "X", href: SITE.social.x },
  { label: "Email", href: SITE.social.email },
];

export function Footer({ locale = "es" as Locale }: { locale?: Locale }) {
  const t = DICT[locale];
  const navLinks =
    locale === "es"
      ? [
          { href: "/blog", label: t.footer.blog },
          { href: "/videos", label: t.footer.videos },
          { href: "/recursos", label: t.footer.resources },
          { href: "/charlas", label: t.footer.talks },
          { href: "/about", label: t.footer.about },
        ]
      : [
          { href: "/en/blog", label: t.footer.blog },
          { href: "/en/videos", label: t.footer.videos },
          { href: "/en/resources", label: t.footer.resources },
          { href: "/en/talks", label: t.footer.talks },
          { href: "/en/about", label: t.footer.about },
        ];

  return (
    <motion.footer
      className="border-t border-neutral-800 py-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col items-center gap-5">
        <Link
          href={locale === "es" ? "/" : "/en"}
          className="font-serif text-lg text-neutral-500 transition-colors hover:text-accent"
        >
          Pablo Marichal
        </Link>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-600">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-400">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              {s.label}
            </motion.a>
          ))}
        </div>
        <p className="text-xs text-neutral-700">
          &copy; {new Date().getFullYear()} {SITE.author}
        </p>
      </div>
    </motion.footer>
  );
}
