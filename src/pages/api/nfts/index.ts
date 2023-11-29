import { AudioNFT } from "@components/map/NFTModal";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (!req.query.initialPageNumber) {
      return;
    }

    let pageNumber: number = Number(req.query.initialPageNumber);

    const limit = 100;
    // const apiUrl = `https://mainnet.underdogprotocol.com/v2/projects/1/nfts`;
    const apiUrl = `https://devnet.underdogprotocol.com/v2/projects/6/nfts`;

    const options: RequestInit = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${process.env.NEXT_PUBLIC_UNDERDOG_API_KEY}`,
      },
    };

    // Create a set to store existing IDs
    const existingIds = new Set<number>();

    try {
      while (true) {
        const response = await fetch(
          `${apiUrl}?page=${pageNumber}&limit=${limit}`,
          options
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch NFTs: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.results.length > 0) {
          // Filter out items with existing IDs before adding to the state
          const filteredResults = data.results.filter(
            (result: AudioNFT) => !existingIds.has(result.id)
          );

          // Add the new IDs to the set
          filteredResults.forEach((result: AudioNFT) =>
            existingIds.add(result.id)
          );

          pageNumber++;
        } else {
          // No more data to fetch, exit the loop
          break;
        }
        res.status(200).json(data.results);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
