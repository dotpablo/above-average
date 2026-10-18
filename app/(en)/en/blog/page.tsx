import type { Metadata } from "next";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/constants";
import { SITE_I18N } from "@/lib/i18n";
import { NewsletterForm } from "@/components/newsletter-form";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "In Production",
  description: SITE_I18N.en.tagline,
  alternates: {
    canonical: `${SITE.url}/en/blog`,
    languages: {
      es: `${SITE.url}/blog`,
      en: `${SITE.url}/en/blog`,
      "x-default": `${SITE.url}/en/blog`,
    },
  },
};

export default function BlogEnPage() {
  const posts = getAllPosts({ locale: "en" });

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="font-serif text-3xl text-white">In Production</h1>
          <span className="shrink-0 text-sm text-neutral-600">
            {posts.length} editions
          </span>
        </div>
        <p className="max-w-xl text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
          {SITE_I18N.en.tagline}
        </p>
        <div className="max-w-md pt-1">
          <NewsletterForm locale="en" />
        </div>
      </header>

      <FadeIn>
        <div className="flex flex-col divide-y divide-neutral-800/50">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/en/blog/${post.slug}`}
              className="group flex flex-col gap-1.5 py-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="font-serif text-xl text-white">
                  <span className="hover-underline">{post.title}</span>
                </h2>
                <time className="shrink-0 text-sm text-neutral-600 tabular-nums">
                  {post.date
                    ? format(parseISO(post.date), "MMM yyyy", { locale: enUS })
                    : ""}
                  <span className="mx-2">&middot;</span>
                  <span>{post.readTime}</span>
                </time>
              </div>
              {post.description && (
                <p className="text-base leading-relaxed text-neutral-500 line-clamp-2 tracking-[-0.01em]">
                  {post.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      </FadeIn>

      <FadeIn>
        <p className="border-t border-neutral-800 pt-6 text-sm text-neutral-500">
          Earlier editions are written in Spanish and live in{" "}
          <Link href="/blog" hrefLang="es" className="text-accent underline underline-offset-4">
            the Spanish archive
          </Link>
          .
        </p>
      </FadeIn>
    </div>
  );
}
