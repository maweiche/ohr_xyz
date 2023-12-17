import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { GENERAL_DESCR, GENERAL_NFT_IMG } from "../../../utils/constants";

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    const { receiverAddress, attributes, recordingUrl } = res.body;
    console.log(receiverAddress, attributes, recordingUrl);
    const underdogApiKey = process.env.NEXT_PUBLIC_UNDERDOG_API_KEY;

    // don't know why but it's not catching this one :(
    // const underdogApiKey = process.env.UNDERDOG_API_KEY;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${underdogApiKey}`,
      },
      body: JSON.stringify({
        attributes,
        name: "øhr",
        symbol: "ØHR",
        description: GENERAL_DESCR,
        image: GENERAL_NFT_IMG,
        animationUrl: recordingUrl,
        externalUrl: "https://ohr-app.xyz",
        receiverAddress,
        delegated: false,
      }),
    };
    // const response = await fetch(
    //   "https://mainnet.underdogprotocol.com/v2/projects/1/nfts",
    //   options
    // );
    const response = await fetch(
      "https://devnet.underdogprotocol.com/v2/projects/6/nfts",
      options
    );
    https: if (response.ok) {
      const data = await response.json();
      // res.status(200).json(data);
      NextResponse.json(data);
    } else {
      console.error("Failed to create NFT");
      // res.status(500).json({ error: "Failed to create NFT" });
      NextResponse.json({ error: "Failed to create NFT" });
    }
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: "Internal server error" });
    NextResponse.json({ error: "Internal server error" });
  }
}
