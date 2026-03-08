import Link from "next/link";
import { TranslateButton } from "./translate-button";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Nav() {
  return (
    <nav className="flex items-center justify-between py-8">
      <Link href="/" className="font-serif text-xl font-bold tracking-tight">
        Above Average
      </Link>
      <ul className="flex items-center gap-6 text-sm text-neutral-600">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="transition-colors hover:text-neutral-900"
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
