import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
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
      <header className="mb-10">
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <time>
            {post.date
              ? format(parseISO(post.date), "d 'de' MMMM, yyyy", { locale: es })
              : ""}
          </time>
          {post.readTime && (
            <>
              <span>&middot;</span>
              <span className="capitalize">{post.readTime.replace('min read', 'min de lectura').replace('read', 'lectura')}</span>
            </>
          )}
        </div>
        <h1 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-4 text-lg text-neutral-500">{post.description}</p>
        )}
      </header>
      <div className="prose prose-invert max-w-none prose-headings:font-serif prose-headings:text-white prose-p:text-neutral-400 prose-a:text-white prose-a:underline-offset-4 prose-strong:text-neutral-200 prose-blockquote:border-neutral-700 prose-blockquote:text-neutral-400 prose-li:text-neutral-400 prose-hr:border-neutral-800">
        <MDXRemote source={post.content} />
      </div>
    </article>
    </>
  );
}
