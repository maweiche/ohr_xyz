import { NextRequest, NextResponse } from "next/server";
import { AudioNFT } from "../../../components/map/NFTModal";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const initialPageNumber = searchParams.get("initialPageNumber");
  if (!initialPageNumber) {
    return;
  }

  const limit = 100;
  const devnetRPC = process.env.NEXT_PUBLIC_HELIUS_DEVNET;
  const mainnetRPC = process.env.NEXT_PUBLIC_HELIUS_MAINNET;

  const existingIds = new Set<number>();
  const results: AudioNFT[] = [];

  try {
    const response = await fetch(mainnetRPC!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "getAssetsByGroup",
        params: {
          groupKey: "collection",
          groupValue: "7zLBMxtrJoKmBdCbn35J8YYjRcDQbAt3HprcBs6Poykv",
          page: 1, // Starts at 1
          limit: limit,
        },
      }),
    });
    const { result } = await response.json();

    result.items.forEach((nft: AudioNFT) => {
      if (!existingIds.has(nft.id) && nft.burnt === false) {
        existingIds.add(nft.id);
        results.push(nft);
      }
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
