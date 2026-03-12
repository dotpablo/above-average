import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: SITE.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE.url}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE.url}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/recursos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/recursos/above-average-os`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE.url}/trabajar-juntos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...posts,
  ];
}
