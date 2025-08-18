/* eslint-disable @next/next/no-img-element */

import { getMDXData } from "@cozy/blog";
import { ImageResponse } from "next/og";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  // Fetch post metadata
  const post = await getMDXData(slug);
  if (!post?.metadata) {
    return new Response("Not found", { status: 404 });
  }

  const { origin } = new URL(request.url);
  const imageUrl = `${origin}/icon1.png`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#080f17",
          color: "#f3f6fc",
          padding: "64px",
          fontFamily: "Nunito Sans, sans-serif",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", fontSize: 64, fontWeight: "bold" }}>
          <img
            src={imageUrl}
            alt=""
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "150px",
              height: "150px",
              objectFit: "contain",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1 style={{ fontSize: 64, fontWeight: "bold", color: "#e6eef8" }}>
            {post.metadata.title}
          </h1>
          <p style={{ fontSize: 32, color: "#6199cf" }}>
            {post.metadata.summary || "No summary available."}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
