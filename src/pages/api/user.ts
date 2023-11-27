import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { name, email, telegram } = request.body;
  const timestamp = Date.now();
  const userId = crypto.randomUUID();
  const userData = { name, email, telegram, timestamp };

  try {
    await kv.hmset(userId, userData);
    return response.status(200).send("Email sent and contact saved");
  } catch (err) {
    return response.status(500).send("Internal error");
  }
}
