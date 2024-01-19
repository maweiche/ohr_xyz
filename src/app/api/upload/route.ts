import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";

export const dynamic = "force-dynamic";
const MUX_API_BASE_URL = "https://api.mux.com/video/v1/uploads/";

export async function POST(request: NextRequest) {
  try {
    const response = await fetch(MUX_API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_MUX_TOKEN_ID}:${process.env.NEXT_PUBLIC_MUX_TOKEN_SECRET}`
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        new_asset_settings: {
          playback_policy: "public",
          normalize_audio: true,
          mp4_support: "standard",
        },
        cors_origin: "*",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Error making request to Mux API" });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const uploadId = searchParams.get("uploadId");

    if (uploadId) {
      const response = await fetch(MUX_API_BASE_URL + uploadId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${process.env.NEXT_PUBLIC_MUX_TOKEN_ID}:${process.env.NEXT_PUBLIC_MUX_TOKEN_SECRET}`
          ).toString("base64")}`,
        },
      });

      const data = await response.json();

      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: "Invalid uploadId" });
    }
  } catch (e) {
    return NextResponse.json({ error: "Error Video Upload" });
  }
}
