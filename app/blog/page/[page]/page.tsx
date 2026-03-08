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
    title: `Blog — Pagina ${page}`,
    description: "Todos los articulos de Above Average.",
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
    <div className="space-y-10">
      <h1 className="font-serif text-3xl font-bold tracking-tight">Blog</h1>
      <div className="space-y-10">
        {currentPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <nav className="flex items-center justify-center gap-2 pt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
          const href = p === 1 ? "/blog" : `/blog/page/${p}`;
          const isCurrent = p === pageNum;
          return isCurrent ? (
            <span
              key={p}
              className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white"
            >
              {p}
            </span>
          ) : (
            <Link
              key={p}
              href={href}
              className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm transition-colors hover:bg-neutral-100"
            >
              {p}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
