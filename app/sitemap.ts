import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
  }));

  return [
    { url: SITE.url, lastModified: new Date() },
    { url: `${SITE.url}/blog`, lastModified: new Date() },
    { url: `${SITE.url}/about`, lastModified: new Date() },
    { url: `${SITE.url}/recursos`, lastModified: new Date() },
    { url: `${SITE.url}/recursos/above-average-os`, lastModified: new Date() },
    { url: `${SITE.url}/trabajar-juntos`, lastModified: new Date() },
    ...posts,
  ];
}
