"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/recursos", label: "Recursos" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();

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

      <ul className="flex items-center gap-1 text-sm">
        {links.map((link) => {
          const active =
            pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-md px-3 py-1.5 transition-colors ${
                  active
                    ? "text-white"
                    : "text-neutral-500 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            href="/trabajar-juntos"
            className={`ml-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
              pathname === "/trabajar-juntos"
                ? "border-white text-white"
                : "border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white"
            }`}
          >
            Trabajar juntos
          </Link>
        </li>
      </ul>
    </nav>
  );
}
