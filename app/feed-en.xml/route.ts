import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { SITE } from "@/lib/constants";

const POSTS_EN_DIR = path.join(process.cwd(), "content/posts-en");
const POSTS_DIR = path.join(process.cwd(), "content/posts");

const NATIVE_EN_SLUGS = [
  "run-a-marathon-using-some-kind-of-project-management",
  "its-ok-to-feel-silly-when-you-are-learning-something-new",
  "project-management-with-devops",
  "first-interaction-with-ai-agents",
  "the-future-of-sap-basis-navigating-the-rise-in-the-ai-era",
  "the-ultimate-feedback-framework-for-sap-technical-teams-drive-excellence-not-dra",
  "why-your-tech-team-disagrees-and-must-do-it-and-how-to-harness-it",
  "why-a-little-paranoia-about-the-future-might-save-your-career",
  "above-average-os-v1-0-why-brute-force-is-failing-deepseek-vs-you",
  "i-sold-my-bike-to-buy-a-career-a-venezuela-story",
  "the-zombie-erp-and-the-technical-privilege-gap-chronicling-a-race-against-the-20",
  "the-death-of-the-man-hour-are-you-paid-for-your-time-or-your-token-budget",
];

function inlineMarkdown(text: string): string {
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*([^*\n]+?)\*/g, "<em>$1</em>");
  text = text.replace(/_([^_\n]+?)_/g, "<em>$1</em>");
  text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return text;
}

function mdToHtml(md: string): string {
  const lines = md.split("\n");
  const output: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) { i++; continue; }

    if (trimmed.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
        i++;
      }
      i++;
      output.push(`<pre><code>${codeLines.join("\n")}</code></pre>`);
      continue;
    }

    if (/^[-*_]{3,}$/.test(trimmed)) {
      output.push("<hr>");
      i++;
      continue;
    }

    const hMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (hMatch) {
      output.push(`<h${hMatch[1].length}>${inlineMarkdown(hMatch[2])}</h${hMatch[1].length}>`);
      i++;
      continue;
    }

    if (trimmed.startsWith(">")) {
      const bqLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        bqLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      output.push(`<blockquote><p>${inlineMarkdown(bqLines.join(" "))}</p></blockquote>`);
      continue;
    }

    if (/^[-*]\s/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i].trim())) {
        items.push(`<li>${inlineMarkdown(lines[i].trim().replace(/^[-*]\s/, ""))}</li>`);
        i++;
      }
      output.push(`<ul>\n${items.join("\n")}\n</ul>`);
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(`<li>${inlineMarkdown(lines[i].trim().replace(/^\d+\.\s/, ""))}</li>`);
        i++;
      }
      output.push(`<ol>\n${items.join("\n")}\n</ol>`);
      continue;
    }

    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().match(/^#{1,6}\s/) &&
      !lines[i].trim().startsWith("```") &&
      !lines[i].trim().startsWith(">") &&
      !/^[-*_]{3,}$/.test(lines[i].trim()) &&
      !/^[-*]\s/.test(lines[i].trim()) &&
      !/^\d+\.\s/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    if (paraLines.length) {
      output.push(`<p>${inlineMarkdown(paraLines.join(" "))}</p>`);
    }
  }

  return output.join("\n");
}

interface EnPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

function getAllEnPosts(): EnPost[] {
  const posts: EnPost[] = [];

  // Translated posts
  if (fs.existsSync(POSTS_EN_DIR)) {
    const files = fs.readdirSync(POSTS_EN_DIR).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const slug = file.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(POSTS_EN_DIR, file), "utf8");
      const { data, content } = matter(raw);
      posts.push({ slug, title: data.title ?? slug, date: data.date ?? "", description: data.description ?? "", content });
    }
  }

  // Native English posts
  for (const slug of NATIVE_EN_SLUGS) {
    const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) continue;
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    posts.push({ slug, title: data.title ?? slug, date: data.date ?? "", description: data.description ?? "", content });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function GET() {
  const posts = getAllEnPosts();

  const items = posts
    .map((post) => {
      const url = `${SITE.url}/en/${post.slug}`;
      const pubDate = post.date ? new Date(post.date).toUTCString() : "";
      const html = mdToHtml(post.content);
      // Escape for CDATA — no escaping needed inside CDATA, but we close/reopen if content has ]]>
      const safeHtml = html.replace(/]]>/g, "]]]]><![CDATA[>");
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="false">${SITE.url}/en/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <content:encoded><![CDATA[${safeHtml}]]></content:encoded>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Above Average (EN) — Pablo Marichal</title>
    <link>${SITE.url}</link>
    <description>Tech Lead, AI Champion, 19x Marathoner. The intersection of corporate robustness, AI agility, and high-performance biological systems.</description>
    <language>en</language>
    <managingEditor>pablomarichal@gmail.com (Pablo Marichal)</managingEditor>
    <atom:link href="${SITE.url}/feed-en.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
