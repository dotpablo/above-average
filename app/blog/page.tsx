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
    <div className="space-y-8">
      <h1 className="font-serif text-3xl text-white">Blog</h1>
      {currentPosts.length === 0 ? (
        <p className="text-neutral-500">Proximamente...</p>
      ) : (
        <div className="flex flex-col gap-12">
          {currentPosts.map((post) => (
            <div key={post.slug} className="border-b border-neutral-800/50 pb-12 last:border-0 last:pb-0">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-1.5 pt-4">
          <span className="rounded-md bg-white px-3 py-1.5 text-xs font-medium text-neutral-900">
            1
          </span>
          {Array.from({ length: totalPages - 1 }, (_, i) => i + 2).map(
            (page) => (
              <Link
                key={page}
                href={`/blog/page/${page}`}
                className="rounded-md px-3 py-1.5 text-xs text-neutral-600 transition-colors hover:bg-neutral-800 hover:text-white"
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
