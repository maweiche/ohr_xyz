import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { getAssetWithProof, burn } from "@metaplex-foundation/mpl-bubblegum";
import { mplToolbox } from "@metaplex-foundation/mpl-toolbox";
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';
import { Connection, PublicKey } from "@solana/web3.js";
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

interface DeleteProps {
  assetId: string;
  currentLeafOwner: string;
}

export const Delete: React.FC<DeleteProps> = ({
  assetId,
  currentLeafOwner,
}) => {
  const { publicKey } = useWallet();
  const mainRpcEndpoint = process.env.NEXT_PUBLIC_HELIUS_MAINNET;
  const devnetRpcEndpoint = process.env.NEXT_PUBLIC_HELIUS_DEVNET;
  const connection = new Connection(devnetRpcEndpoint!, "confirmed");
  
  console.log("umi : ", umi);
  console.log("incoming data : ", assetId, currentLeafOwner);
  async function burnPost() {
    // Use the RPC endpoint of your choice.
    const umi = createUmi("https://devnet.helius-rpc.com").use(mplToolbox());
    // @ts-ignore
    const assetWithProof = await getAssetWithProof(umi, new PublicKey(assetId));
    await burn(umi, {
      ...assetWithProof,
      // @ts-ignore
      leafOwner: new PublicKey(currentLeafOwner),
    }).sendAndConfirm(umi);
  }

  return <button>Delete</button>;
};
