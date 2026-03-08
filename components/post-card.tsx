import Link from "next/link";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import type { Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <article>
      <Link href={`/blog/${post.slug}`} className="group block">
        <time className="text-sm text-neutral-500">
          {post.date ? format(parseISO(post.date), "d MMM yyyy", { locale: es }) : ""}
        </time>
        <h3 className="mt-1 font-serif text-xl font-semibold tracking-tight group-hover:underline">
          {post.title}
        </h3>
        {post.description && (
          <p className="mt-2 text-neutral-600 leading-relaxed">
            {post.description}
          </p>
        )}
      </Link>
    </article>
  );
}
