import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-8 text-sm text-neutral-500">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} {SITE.author}</p>
        <div className="flex gap-4">
          <a
            href={SITE.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-neutral-900"
          >
            LinkedIn
          </a>
          <a
            href={SITE.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-neutral-900"
          >
            X / Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
