import { ImageResponse } from "next/og";
import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function OgImage({ params }: Props) {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slug);

  const title = post?.title ?? SITE.title;
  const description = post?.description ?? SITE.description;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "#525252", fontSize: "18px", fontFamily: "sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
            Above Average
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1, justifyContent: "center" }}>
          <p
            style={{
              fontSize: title.length > 60 ? "48px" : "60px",
              color: "#ffffff",
              fontWeight: 400,
              lineHeight: 1.15,
              margin: 0,
              maxWidth: "900px",
            }}
          >
            {title}
          </p>
          {description && (
            <p
              style={{
                fontSize: "22px",
                color: "#737373",
                margin: 0,
                maxWidth: "780px",
                lineHeight: 1.5,
                fontFamily: "sans-serif",
              }}
            >
              {description.length > 120 ? description.slice(0, 120) + "…" : description}
            </p>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ color: "#404040", fontSize: "16px", fontFamily: "sans-serif" }}>
            {SITE.author}
          </span>
          <span style={{ color: "#262626", fontSize: "16px", fontFamily: "sans-serif" }}>·</span>
          <span style={{ color: "#404040", fontSize: "16px", fontFamily: "sans-serif" }}>
            pablomarichal.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
