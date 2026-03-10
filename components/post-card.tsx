import Link from "next/link";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import type { Post } from "@/lib/posts";

export function PostCard({ post, showCategory = false }: { post: Post; showCategory?: boolean }) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        {showCategory && post.category && (
          <p className="mb-1.5 text-xs font-medium uppercase tracking-widest text-neutral-600">
            {post.category}
          </p>
        )}
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-xl text-white group-hover:underline underline-offset-4 decoration-neutral-600">
            {post.title}
          </h3>
          <time className="shrink-0 text-sm text-neutral-600 tabular-nums">
            {post.date
              ? format(parseISO(post.date), "MMM yyyy", { locale: es })
              : ""}
            <span className="mx-2">&middot;</span>
            <span className="capitalize">{post.readTime.replace('min read', 'min de lectura').replace('read', 'lectura')}</span>
          </time>
        </div>
        {post.description && (
          <p className="mt-1.5 text-base leading-relaxed text-neutral-500 line-clamp-2">
            {post.description}
          </p>
        )}
      </Link>
    </article>
  );
}
