import { NextApiRequest, NextApiResponse } from "next";
import Mux from "@mux/mux-node";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  console.log("got in the handler");
  const { Video } = new Mux();

  const assetId = req.body;
  // if (!process.env.MUX_SECRET_KEY || !process.env.MUX_ACCESS_TOKEN)
  switch (method) {
    case "PUT":
      console.log(assetId.assetId);

      try {
        const data = await Video.Assets.updateMp4Support(assetId.assetId, {
          mp4_support: "standard",
        });

        // const data = await Video.Assets.createPlaybackId(videoAssetId, {
        //   policy: "public",
        // });
        console.log("data createPlaybackId", data);
        res.json({ playbackId: data.id });
      } catch (e) {
        res.json({ error: "Error creating upload", e });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
