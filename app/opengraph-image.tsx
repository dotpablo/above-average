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
          padding: "64px",
          fontFamily: "serif",
        }}
      >
        <p
          style={{
            fontSize: "72px",
            color: "#ffffff",
            fontWeight: 400,
            lineHeight: 1.15,
            margin: 0,
            textAlign: "center",
          }}
        >
          Above Average
        </p>
        <p
          style={{
            fontSize: "24px",
            color: "#525252",
            margin: "24px 0 0 0",
            textAlign: "center",
            fontFamily: "sans-serif",
            maxWidth: "700px",
            lineHeight: 1.5,
          }}
        >
          {SITE.description}
        </p>
        <p
          style={{
            fontSize: "16px",
            color: "#404040",
            margin: "40px 0 0 0",
            fontFamily: "sans-serif",
          }}
        >
          pablomarichal.com
        </p>
      </div>
    ),
    { ...size }
  );
}
