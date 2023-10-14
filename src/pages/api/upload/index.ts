import { NextApiRequest, NextApiResponse } from "next";
// import Mux from '@mux/mux-node'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (!process.env.MUX_SECRET_KEY || !process.env.MUX_ACCESS_TOKEN) {
      return res.status(500).json("No env keys.");
    }

    try {
      return res.status(200).json(true);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  } else {
    return res.status(400).json(req.method);
  }
}

// https://docs.mux.com/guides/video/upload-files-directly#2-use-that-url-to-upload-in-your-client
