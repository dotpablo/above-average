import type { Metadata } from "next";
import { BlogFilter } from "@/components/blog-filter";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Todos los articulos de Above Average.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-8">
      <h1 className="font-serif text-3xl text-white">Blog</h1>
      <BlogFilter posts={posts} />
    </div>
  );
}
