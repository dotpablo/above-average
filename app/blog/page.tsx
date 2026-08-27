import type { Metadata } from "next";
import { BlogFilter } from "@/components/blog-filter";
import { getAllPosts } from "@/lib/posts";
import { NEWSLETTER } from "@/lib/constants";
import { NewsletterForm } from "@/components/newsletter-form";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: NEWSLETTER.name,
  description: NEWSLETTER.tagline,
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="font-serif text-3xl text-white">{NEWSLETTER.name}</h1>
          <span className="shrink-0 text-sm text-neutral-600">
            {posts.length} ediciones
          </span>
        </div>
        <p className="max-w-xl text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
          {NEWSLETTER.tagline}
        </p>
        <div className="max-w-md pt-1">
          <NewsletterForm />
        </div>
      </header>

      <FadeIn>
        <BlogFilter posts={posts} />
      </FadeIn>
    </div>
  );
}
