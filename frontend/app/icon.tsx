import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#0a0a0a",
          color: "#ffffff",
          display: "flex",
          fontSize: 16,
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#ef4444",
            borderRadius: 8,
            padding: "4px 6px",
          }}
        >
          B4
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
