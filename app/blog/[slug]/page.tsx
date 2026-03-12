import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { getAllPosts, getPostBySlug, getAdjacentPosts } from "@/lib/posts";
import { NewsletterForm } from "@/components/newsletter-form";
import { SITE } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE.url}/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [SITE.author],
      siteName: SITE.name,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: SITE.author,
      url: SITE.url,
    },
    publisher: {
      "@type": "Person",
      name: SITE.author,
      url: SITE.url,
    },
    url: `${SITE.url}/blog/${slug}`,
    mainEntityOfPage: `${SITE.url}/blog/${slug}`,
  };

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
    <article>
      <header className="mb-12">
        {/* Meta line */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-widest text-neutral-600">
          {post.category && (
            <>
              <span>{post.category}</span>
              <span>&middot;</span>
            </>
          )}
          {post.date && (
            <>
              <time>{format(parseISO(post.date), "d 'de' MMMM, yyyy", { locale: es })}</time>
              <span>&middot;</span>
            </>
          )}
          {post.readTime && (
            <span className="capitalize">{post.readTime.replace("min read", "min de lectura").replace("read", "lectura")}</span>
          )}
        </div>

        {/* Title */}
        <h1 className="mt-4 font-serif text-3xl leading-tight text-white sm:text-4xl sm:leading-tight">
          {post.title}
        </h1>

        {/* Description / lead */}
        {post.description && (
          <p className="mt-5 text-lg leading-relaxed text-neutral-400 border-l-2 border-neutral-700 pl-4">
            {post.description}
          </p>
        )}
      </header>

      {/* Body */}
      <div className="prose prose-invert max-w-none
        prose-headings:font-serif prose-headings:text-white prose-headings:tracking-tight
        prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-2xl
        prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl
        prose-p:text-neutral-300 prose-p:leading-[1.85] prose-p:text-base
        prose-a:text-white prose-a:underline prose-a:underline-offset-4 prose-a:decoration-neutral-600 hover:prose-a:decoration-white
        prose-strong:text-neutral-100
        prose-blockquote:border-l-2 prose-blockquote:border-neutral-700 prose-blockquote:pl-5 prose-blockquote:text-neutral-400 prose-blockquote:not-italic
        prose-li:text-neutral-300 prose-li:leading-relaxed
        prose-hr:border-neutral-800 prose-hr:my-10
        prose-code:text-neutral-300 prose-code:bg-neutral-800/60 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800
      ">
        <MDXRemote source={post.content} />
      </div>

      {/* Newsletter CTA */}
      <div className="mt-16 rounded-xl border border-neutral-800 bg-neutral-900/50 p-8">
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-600 mb-3">Newsletter</p>
        <h2 className="font-serif text-xl text-white leading-snug">
          Para el profesional tech que no quiere quedar deprecated.
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Cada semana: SAP, IA de frontera y rendimiento humano. Sin motivación barata.
        </p>
        <div className="mt-5 max-w-sm">
          <NewsletterForm />
        </div>
      </div>

      {/* Prev / Next navigation */}
      {(prev || next) && (
        <nav className="mt-10 grid grid-cols-2 gap-4 border-t border-neutral-800/50 pt-10">
          <div>
            {prev && (
              <Link href={`/blog/${prev.slug}`} className="group flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-widest text-neutral-600 group-hover:text-neutral-400 transition-colors">
                  &larr; Anterior
                </span>
                <span className="font-serif text-base text-neutral-400 group-hover:text-white transition-colors line-clamp-2">
                  {prev.title}
                </span>
              </Link>
            )}
          </div>
          <div className="text-right">
            {next && (
              <Link href={`/blog/${next.slug}`} className="group flex flex-col gap-1 items-end">
                <span className="text-xs font-medium uppercase tracking-widest text-neutral-600 group-hover:text-neutral-400 transition-colors">
                  Siguiente &rarr;
                </span>
                <span className="font-serif text-base text-neutral-400 group-hover:text-white transition-colors line-clamp-2">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      )}
    </article>
    </>
  );
}
