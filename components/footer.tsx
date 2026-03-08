import Image from "next/image";
import { SITE } from "@/lib/constants";

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
    <footer className="border-t border-neutral-800 py-10">
      <div className="flex flex-col items-center gap-5">
        <Image
          src="/images/logo.png"
          alt="Above Average"
          width={32}
          height={32}
          className="h-8 w-8 invert opacity-40"
        />
        <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-600">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              {s.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-neutral-700">
          &copy; {new Date().getFullYear()} {SITE.author}
        </p>
      </div>
    </footer>
  );
}
