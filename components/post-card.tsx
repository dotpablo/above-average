"use client";

import Link from "next/link";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { motion } from "motion/react";
import type { Post } from "@/lib/posts";

export function PostCard({ post, showCategory = false }: { post: Post; showCategory?: boolean }) {
  return (
    <motion.article
      className="group"
      whileHover="hover"
      initial="idle"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {showCategory && post.category && (
          <p className="mb-1.5 text-xs font-medium uppercase tracking-widest text-neutral-600">
            {post.category}
          </p>
        )}
        <div className="flex items-baseline justify-between gap-4">
          <motion.h3
            className="font-serif text-xl text-white"
            variants={{
              idle: { x: 0 },
              hover: { x: 4 },
            }}
            transition={{ duration: 0.2 }}
          >
            <span className="relative">
              {post.title}
              <span className="absolute left-0 -bottom-0.5 h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </span>
          </motion.h3>
          <time className="shrink-0 text-sm text-neutral-600 tabular-nums">
            {post.date
              ? format(parseISO(post.date), "MMM yyyy", { locale: es })
              : ""}
            <span className="mx-2">&middot;</span>
            <span className="capitalize">{post.readTime.replace('min read', 'min de lectura').replace('read', 'lectura')}</span>
          </time>
        </div>
        {post.description && (
          <p className="mt-1.5 text-base leading-relaxed text-neutral-500 line-clamp-2 tracking-[-0.01em]">
            {post.description}
          </p>
        )}
      </Link>
    </motion.article>
  );
}
