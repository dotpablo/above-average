import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

import type { Locale } from "./i18n";

const postsDirectory = path.join(process.cwd(), "content/posts");
const postsDirectoryEn = path.join(process.cwd(), "content/posts-en");

function dirFor(locale: Locale): string {
  return locale === "en" ? postsDirectoryEn : postsDirectory;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
  readTime: string;
  archived: boolean;
  category: string;
  /**
   * Solo en los posts en inglés: slug del original en español. Es lo que
   * permite cruzar las dos versiones con hreflang.
   */
  originalSlug?: string;
}

export function getAllPosts({
  includeArchived = false,
  locale = "es" as Locale,
} = {}): Post[] {
  const dir = dirFor(locale);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(dir, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        description: data.description ?? "",
        tags: data.tags ?? [],
        content,
        readTime: stats.text,
        archived: data.archived ?? false,
        category: data.category ?? "",
        originalSlug: data.originalSlug ?? undefined,
      };
    })
    .filter((post) => includeArchived || !post.archived);

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getAdjacentPosts(
  slug: string,
  locale: Locale = "es"
): { prev: Post | null; next: Post | null } {
  const posts = getAllPosts({ locale });
  const index = posts.findIndex((p) => p.slug === slug);
  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

export function getPostBySlug(slug: string, locale: Locale = "es"): Post | undefined {
  const filePath = path.join(dirFor(locale), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    tags: data.tags ?? [],
    content,
    readTime: stats.text,
    archived: data.archived ?? false,
    category: data.category ?? "",
    originalSlug: data.originalSlug ?? undefined,
  };
}

/**
 * Cruce entre idiomas. Solo las traducciones declaran `originalSlug`, así que
 * el mapa se arma desde el inglés y se invierte para ir en la otra dirección.
 */
let _mapa: { esToEn: Map<string, string>; enToEs: Map<string, string> } | null = null;

function mapa() {
  if (_mapa) return _mapa;
  const esToEn = new Map<string, string>();
  const enToEs = new Map<string, string>();
  for (const p of getAllPosts({ locale: "en", includeArchived: true })) {
    if (!p.originalSlug) continue;
    esToEn.set(p.originalSlug, p.slug);
    enToEs.set(p.slug, p.originalSlug);
  }
  _mapa = { esToEn, enToEs };
  return _mapa;
}

/** Slug del mismo artículo en el otro idioma, o null si no está traducido. */
export function translatedSlug(slug: string, from: Locale): string | null {
  const m = mapa();
  return (from === "es" ? m.esToEn.get(slug) : m.enToEs.get(slug)) ?? null;
}
