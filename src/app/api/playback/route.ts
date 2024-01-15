import Mux from "@mux/mux-node";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { Video } = new Mux();

  const searchParams = request.nextUrl.searchParams;
  const assetId = searchParams.get("assetId");
  console.log("Asset id: ", assetId);

  if (typeof assetId === "string") {
    try {
      const data = await Video.Assets.createPlaybackId(assetId, {
        policy: "public",
      });
      const audioUrl = `https://stream.mux.com/${data.id}/audio.m4a`;

      return NextResponse.json(audioUrl);
    } catch (e) {
      return NextResponse.json({ error: "Error creating upload", e });
    }
  } else {
    return NextResponse.json({ error: "Invalid uploadId" });
  }
}
