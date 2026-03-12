import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/posts";

const POSTS_PER_PAGE = 10;

interface Props {
  params: Promise<{ page: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Blog — Página ${page}`,
    description: "Todos los artículos de Above Average.",
  };
}

export default async function BlogPagePaginated({ params }: Props) {
  const { page } = await params;
  const pageNum = parseInt(page, 10);
  const posts = getAllPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  if (isNaN(pageNum) || pageNum < 2 || pageNum > totalPages) notFound();

  const start = (pageNum - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(start, start + POSTS_PER_PAGE);

  return (
    <div className="space-y-8">
      <h1 className="font-serif text-3xl text-white">Blog</h1>
      <div className="divide-y divide-neutral-800/50">
        {currentPosts.map((post) => (
          <div key={post.slug} className="py-4 first:pt-0 last:pb-0">
            <PostCard post={post} />
          </div>
        ))}
      </div>
      <nav className="flex items-center justify-center gap-1.5 pt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
          const href = p === 1 ? "/blog" : `/blog/page/${p}`;
          const isCurrent = p === pageNum;
          return isCurrent ? (
            <span
              key={p}
              className="rounded-md bg-white px-3 py-1.5 text-xs font-medium text-neutral-900"
            >
              {p}
            </span>
          ) : (
            <Link
              key={p}
              href={href}
              className="rounded-md px-3 py-1.5 text-xs text-neutral-600 transition-colors hover:bg-neutral-800 hover:text-white"
            >
              {p}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
