import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";

export const dynamic = "force-dynamic";
const MUX_API_BASE_URL = "https://api.mux.com/video/v1/assets/";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const assetId = searchParams.get("assetId");

    if (assetId) {
      const response = await fetch(
        MUX_API_BASE_URL + assetId + "/playback-ids",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(
              `${process.env.NEXT_PUBLIC_MUX_TOKEN_ID}:${process.env.NEXT_PUBLIC_MUX_TOKEN_SECRET}`
            ).toString("base64")}`,
          },
          body: JSON.stringify({
            policy: "public",
          }),
        }
      );

      const data = await response.json();
      // const audioUrl = `https://stream.mux.com/${data?.data.id}/audio.m4a`;

      // return NextResponse.json(audioUrl);
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: "Invalid uploadId" });
    }
  } catch (e) {
    return NextResponse.json({ error: "Error Video Upload" });
  }
}
