import { NextApiRequest, NextApiResponse } from "next";
import Mux from "@mux/mux-node";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const { Video } = new Mux();
  switch (method) {
    case "POST":
      try {
        const upload = await Video.Uploads.create({
          new_asset_settings: {
            playback_policy: "public",
            normalize_audio: true,
            // master_access: "temporary",
            mp4_support: "standard",
          },
          cors_origin: "*",
        });

        return res.json({
          id: upload.id,
          url: upload.url,
          assetId: upload.asset_id,
        });
      } catch (e) {
        res.json({ error: "Error creating upload" });
      }
      break;
    case "GET":
      let uploadId = req.query.uploadId;
      if (typeof uploadId === "string") {
        try {
          const data = await Video.Uploads.get(uploadId);
          return res.json(data);
        } catch (e) {
          res.json({ error: "Error Video Upload" });
        }
      } else {
        res.status(400).json({ error: "Invalid uploadId" });
      }

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// https://docs.mux.com/guides/video/upload-files-directly#2-use-that-url-to-upload-in-your-client
