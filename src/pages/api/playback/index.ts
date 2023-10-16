import { NextApiRequest, NextApiResponse } from "next";
import Mux from "@mux/mux-node";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { Video } = new Mux();

  switch (method) {
    case "GET":
      const assetId = req.query.assetId;

      if (typeof assetId === "string") {
        try {
          const data = await Video.Assets.createPlaybackId(assetId, {
            policy: "public",
          });
          const audioUrl = `https://stream.mux.com/${data.id}/audio.m4a`;

          res.json(audioUrl);
        } catch (e) {
          res.json({ error: "Error creating upload", e });
        }
      } else {
        res.status(400).json({ error: "Invalid uploadId" });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
