import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { receiverAddress, attributes, recordingUrl } = req.body;
        const underdogApiKey = process.env.UNDERDOG_API_KEY;

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
            description: "I minted this NFT on the Solana Hyper Drive.",
            image:
              "https://shdw-drive.genesysgo.net/CihGZb6sJ94yrPDfQ2ABC7ZeUQam8ChY19p7PSSs1avA/ohr-logo.jpeg",
            animationUrl: recordingUrl,
            externalUrl: "https://ohr-community.xyz",
            receiverAddress,
            delegated: false,
          }),
        };
        const response = await fetch(
          "https://mainnet.underdogprotocol.com/v2/projects/1/nfts",
          options
        );
        if (response.ok) {
          const data = await response.json();
          res.status(200).json(data);
        } else {
          console.error("Failed to create NFT");
          res.status(500).json({ error: "Failed to create NFT" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }

      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
