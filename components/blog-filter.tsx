"use client";

import { useState } from "react";
import { PostCard } from "@/components/post-card";
import type { Post } from "@/lib/posts";

const CATEGORIES = [
  "Enterprise & AI Survival",
  "The Builder Mindset",
  "Biological Clean Core",
  "The Full Stack Human",
] as const;

const POSTS_PER_PAGE = 10;

export function BlogFilter({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<string>("Todos");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = posts
    .filter((p) => active === "Todos" || p.category === active)
    .filter((p) => {
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    });

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const visible = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  function select(cat: string) {
    setActive(cat);
    setPage(1);
  }

  function search(value: string) {
    setQuery(value);
    setPage(1);
  }

  return (
    <div className="space-y-6">
      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => select("Todos")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            active === "Todos"
              ? "bg-white text-neutral-900"
              : "bg-neutral-800/60 text-neutral-400 hover:bg-neutral-700 hover:text-white"
          }`}
        >
          Todos
        </button>
        {CATEGORIES.map((cat) => (
          <button
            type="button"
            key={cat}
            onClick={() => select(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              active === cat
                ? "bg-white text-neutral-900"
                : "bg-neutral-800/60 text-neutral-400 hover:bg-neutral-700 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search */}
      <label htmlFor="blog-search" className="sr-only">Buscar posts</label>
      <input
        id="blog-search"
        type="search"
        placeholder="Buscar posts..."
        value={query}
        onChange={(e) => search(e.target.value)}
        className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-neutral-600 focus:outline-none"
      />

      {/* Counter */}
      <p className="text-xs text-neutral-600">
        {filtered.length === posts.length
          ? `${posts.length} posts`
          : `${filtered.length} de ${posts.length} posts`}
      </p>

      {/* Post list */}
      {visible.length === 0 ? (
        <p className="text-neutral-500 text-sm">Sin resultados.</p>
      ) : (
        <div className="flex flex-col gap-12">
          {visible.map((post) => (
            <div
              key={post.slug}
              className="border-b border-neutral-800/50 pb-12 last:border-0 last:pb-0"
            >
              <PostCard post={post} showCategory={active === "Todos"} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-1.5 pt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              type="button"
              key={p}
              onClick={() => setPage(p)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                p === page
                  ? "bg-white text-neutral-900"
                  : "text-neutral-600 hover:bg-neutral-800 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
