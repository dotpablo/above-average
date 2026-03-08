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

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [SITE.author],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <header className="mb-10">
        <time className="text-sm text-neutral-500">
          {post.date
            ? format(parseISO(post.date), "d 'de' MMMM, yyyy", { locale: es })
            : ""}
        </time>
        <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-4 text-lg text-neutral-600">{post.description}</p>
        )}
      </header>
      <div className="prose prose-neutral max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-a:underline-offset-4">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
