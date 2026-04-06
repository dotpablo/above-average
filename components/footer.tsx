"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { SITE } from "@/lib/constants";

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/recursos", label: "Recursos" },
  { href: "/about", label: "About" },
  { href: "/trabajar-juntos", label: "Trabajar juntos" },
];

const socials = [
  { label: "LinkedIn", href: SITE.social.linkedin },
  { label: "YouTube", href: SITE.social.youtube },
  { label: "Instagram", href: SITE.social.instagram },
  { label: "Threads", href: SITE.social.threads },
  { label: "X", href: SITE.social.x },
  { label: "Email", href: SITE.social.email },
];

export function Footer() {
  return (
    <motion.footer
      className="border-t border-neutral-800 py-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col items-center gap-5">
        <Image
          src="/images/logo.png"
          alt="Above Average"
          width={32}
          height={32}
          className="h-8 w-8 invert opacity-40"
        />
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
        <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-700">
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
