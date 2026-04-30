import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/constants";
import { FadeIn } from "@/components/motion/fade-in";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "Newsletter — Above Average",
  description:
    "Un newsletter semanal para el profesional tech que no quiere quedar obsoleto. SAP, IA de frontera y rendimiento humano. Sin motivación barata.",
  alternates: { canonical: `${SITE.url}/newsletter` },
};

export default function NewsletterPage() {
  // Posts marcados como newsletter (tienen frontmatter source: linkedin = publicados)
  const posts = getAllPosts().filter((p) => !p.archived);

  return (
    <div className="space-y-16 max-w-2xl">
      {/* Header */}
      <header className="space-y-4">
        <FadeIn duration={0.5}>
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">
            Above Average
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-serif text-4xl text-white leading-tight">
            El newsletter.
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-lg text-neutral-400 leading-relaxed tracking-[-0.01em]">
            Sale los martes. Para el profesional tech que no quiere quedar obsoleto.
            SAP, IA de frontera y rendimiento humano. Sin motivación barata. Sin vibe coding.
            Solo lo que funciona en producción.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="pt-2 max-w-md space-y-2">
            <p className="text-sm font-medium text-neutral-300">Suscribite gratis:</p>
            <NewsletterForm />
          </div>
        </FadeIn>
      </header>

      {/* Archive */}
      <FadeIn>
        <section className="space-y-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-2xl text-white">Archivo</h2>
            <span className="text-sm text-neutral-600">{posts.length} ediciones</span>
          </div>
          <div className="flex flex-col divide-y divide-neutral-800/50">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group py-4 flex items-start justify-between gap-4 hover:text-white transition-colors"
              >
                <div className="space-y-1 flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-200 group-hover:text-white transition-colors leading-snug">
                    {post.title}
                  </p>
                  {post.description && (
                    <p className="text-xs text-neutral-600 line-clamp-1 tracking-[-0.01em]">
                      {post.description}
                    </p>
                  )}
                </div>
                <div className="shrink-0 text-right">
                  <time className="text-xs text-neutral-600 whitespace-nowrap">
                    {post.date
                      ? new Date(post.date).toLocaleDateString("es-UY", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : ""}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
