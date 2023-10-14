import { NextApiRequest, NextApiResponse } from "next";
import Mux from "@mux/mux-node";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const { Video } = new Mux();
  // if (!process.env.MUX_SECRET_KEY || !process.env.MUX_ACCESS_TOKEN)
  switch (method) {
    case "POST":
      try {
        const upload = await Video.Uploads.create({
          new_asset_settings: {
            playback_policy: "public",
            master_access: "temporary",
          },
          cors_origin: "*",
        });
        console.log(upload);
        return res.json({
          id: upload.id,
          url: upload.url,
        });
      } catch (e) {
        res.json({ error: "Error creating upload" });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// https://docs.mux.com/guides/video/upload-files-directly#2-use-that-url-to-upload-in-your-client
