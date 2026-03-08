import Link from "next/link";
import Image from "next/image";
import { TranslateButton } from "./translate-button";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/recursos", label: "Recursos" },
  { href: "/about", label: "About" },
];

export function Nav() {
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
      <ul className="flex items-center gap-5 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-neutral-500 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <TranslateButton />
        </li>
      </ul>
    </nav>
  );
}
