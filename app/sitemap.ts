import type { MetadataRoute } from "next";
import { getAllPosts, translatedSlug } from "@/lib/posts";
import { SITE } from "@/lib/constants";

/**
 * Un solo sitemap con las dos versiones. Cada entrada declara sus alternativas
 * en `alternates.languages`, que es lo que Google usa para emparejarlas.
 * `/trabajar-juntos` y `/en/contact` quedan fuera a propósito: van con noindex.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();

  const pares: [string, string, number][] = [
    ["/", "/en", 1.0],
    ["/blog", "/en/blog", 0.9],
    ["/about", "/en/about", 0.7],
    ["/videos", "/en/videos", 0.7],
    ["/charlas", "/en/talks", 0.6],
    ["/recursos", "/en/resources", 0.6],
  ];

  const secciones = pares.flatMap(([es, en, priority]) => {
    const languages = {
      es: `${SITE.url}${es}`,
      en: `${SITE.url}${en}`,
      "x-default": `${SITE.url}${en}`,
    };
    return [
      {
        url: `${SITE.url}${es}`,
        lastModified: ahora,
        changeFrequency: "weekly" as const,
        priority,
        alternates: { languages },
      },
      {
        url: `${SITE.url}${en}`,
        lastModified: ahora,
        changeFrequency: "weekly" as const,
        priority,
        alternates: { languages },
      },
    ];
  });

  const sueltas = ["/recursos/above-average-os", "/recursos/obsidian-claude"].map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: ahora,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const postsEs = getAllPosts().map((post) => {
    const en = translatedSlug(post.slug, "es");
    const url = `${SITE.url}/blog/${post.slug}`;
    return {
      url,
      lastModified: post.date ? new Date(post.date) : ahora,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      ...(en && {
        alternates: {
          languages: {
            es: url,
            en: `${SITE.url}/en/blog/${en}`,
            "x-default": `${SITE.url}/en/blog/${en}`,
          },
        },
      }),
    };
  });

  const postsEn = getAllPosts({ locale: "en" }).map((post) => {
    const es = translatedSlug(post.slug, "en");
    const url = `${SITE.url}/en/blog/${post.slug}`;
    return {
      url,
      lastModified: post.date ? new Date(post.date) : ahora,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      ...(es && {
        alternates: {
          languages: {
            es: `${SITE.url}/blog/${es}`,
            en: url,
            "x-default": url,
          },
        },
      }),
    };
  });

  return [...secciones, ...sueltas, ...postsEs, ...postsEn];
}
