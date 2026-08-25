import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Monograma PM. El dorado de marca (#D4A853) de fondo para que el marcador
// se lea igual en pestañas claras y oscuras; el texto en el negro del sitio.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#D4A853",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
        }}
      >
        <span
          style={{
            fontSize: 38,
            color: "#0a0a0a",
            fontWeight: 600,
            letterSpacing: "-0.05em",
            lineHeight: 1,
          }}
        >
          PM
        </span>
      </div>
    ),
    { ...size }
  );
}
