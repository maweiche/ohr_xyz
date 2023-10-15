import { Metaplex } from "@metaplex-foundation/js";
import { NextRouter } from "next/router";

export async function uploadMetadata(
  nftName: string,
  image: string,
  description: string,
  animation_url: string,
  external_url: string,
  attributes: { trait_type: string; value: string }[],
  // properties: {
  //   files: {
  //     uri: string;
  //     type: string;
  //   }[];
  //   category: string;
  // },
  metaplexInstance: Metaplex
) {
  const { uri } = await metaplexInstance.nfts().uploadMetadata({
    name: nftName,
    image: image,
    description: description,
    animation_url: animation_url,
    external_url: external_url,
    attributes: attributes,
    // properties: properties,
  });
  return uri;
}

export async function mintNFT(
  metadataUri: string,
  name: string,
  sellerFee: number,
  symbol: string,
  metaplexInstance: Metaplex,
  router: NextRouter
) {
  const { nft } = await metaplexInstance.nfts().create(
    {
      uri: metadataUri,
      name: name,
      sellerFeeBasisPoints: sellerFee,
      symbol: symbol,
      isMutable: false,
    },
    { commitment: "finalized" }
  );

  const solscanLink = `https://solscan.io/token/${nft.address}`;
  console.log(`   Minted NFT: ${solscanLink}`);

  router.push({
    pathname: "/create/success",
    query: { solscanLink },
  });
}
