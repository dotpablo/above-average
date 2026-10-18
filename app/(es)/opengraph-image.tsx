import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        <p
          style={{
            fontSize: "88px",
            color: "#ffffff",
            fontWeight: 400,
            lineHeight: 1.1,
            margin: 0,
            textAlign: "center",
          }}
        >
          Pablo Marichal
        </p>
        <p
          style={{
            fontSize: "26px",
            color: "#a3a3a3",
            margin: "28px 0 0 0",
            textAlign: "center",
            fontFamily: "sans-serif",
            maxWidth: "820px",
            lineHeight: 1.5,
          }}
        >
          {SITE.description}
        </p>
        <p
          style={{
            fontSize: "16px",
            color: "#525252",
            margin: "44px 0 0 0",
            fontFamily: "sans-serif",
            letterSpacing: "0.08em",
          }}
        >
          pablomarichal.com
        </p>
      </div>
    ),
    { ...size }
  );
}
