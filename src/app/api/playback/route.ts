import Mux from "@mux/mux-node";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { Video } = new Mux();

  const searchParams = request.nextUrl.searchParams;
  const assetId = searchParams.get("assetId");

  if (typeof assetId === "string") {
    try {
      const data = await Video.Assets.createPlaybackId(assetId, {
        policy: "public",
      });
      const audioUrl = `https://stream.mux.com/${data.id}/audio.m4a`;

      Response.json(audioUrl);
    } catch (e) {
      Response.json({ error: "Error creating upload", e });
    }
  } else {
    Response.json({ error: "Invalid uploadId" });
  }
}
