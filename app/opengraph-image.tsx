import { ImageResponse } from "next/og";
import { PORTFOLIO as P } from "@/lib/data";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${P.name} — ${P.role}`;

// Branded share card. Static-export friendly: rendered to a PNG at build time.
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#16161a",
        color: "#f5f5f5",
        padding: "72px 80px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 26,
          color: "#9b9ba3",
          letterSpacing: 2,
        }}
      >
        <div style={{ width: 14, height: 14, borderRadius: 999, background: "#7fe08a" }} />
        FULL STACK DEVELOPER · AI / ML
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 128, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>
          Nishal
        </div>
        <div style={{ fontSize: 128, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>
          Chandra Reddy
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 28,
          color: "#9b9ba3",
        }}
      >
        <div style={{ display: "flex" }}>Distributed systems · Microservices · AI</div>
        <div style={{ display: "flex" }}>United States</div>
      </div>
    </div>,
    { ...size }
  );
}
