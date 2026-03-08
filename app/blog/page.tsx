import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/posts";

const POSTS_PER_PAGE = 10;

export const metadata: Metadata = {
  title: "Blog",
  description: "Todos los articulos de Above Average.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const currentPosts = posts.slice(0, POSTS_PER_PAGE);

  return (
    <div className="space-y-10">
      <h1 className="font-serif text-3xl font-bold tracking-tight">Blog</h1>
      {currentPosts.length === 0 ? (
        <p className="text-neutral-500">Proximamente...</p>
      ) : (
        <div className="space-y-10">
          {currentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-2 pt-4">
          <span className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white">
            1
          </span>
          {Array.from({ length: totalPages - 1 }, (_, i) => i + 2).map(
            (page) => (
              <Link
                key={page}
                href={`/blog/page/${page}`}
                className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm transition-colors hover:bg-neutral-100"
              >
                {page}
              </Link>
            )
          )}
        </nav>
      )}
    </div>
  );
}
