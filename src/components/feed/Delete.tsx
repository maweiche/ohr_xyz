import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";
import { getAssetWithProof, burn } from "@metaplex-foundation/mpl-bubblegum";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

interface DeleteProps {
  assetId: string;
  currentLeafOwner: string;
}

export const Delete: React.FC<DeleteProps> = ({
  assetId,
  currentLeafOwner,
}) => {
  const wallet = useWallet();
  const mainRpcEndpoint = process.env.NEXT_PUBLIC_HELIUS_MAINNET;
  const devnetRpcEndpoint = process.env.NEXT_PUBLIC_HELIUS_DEVNET;
  const connection = new Connection(devnetRpcEndpoint!, "confirmed");
  const umi = createUmi(new Connection(devnetRpcEndpoint!)).use(dasApi());
  //   const umi = createUmi(devnetRpcEndpoint!).use(dasApi());
  umi.use(walletAdapterIdentity(wallet));


  async function burnPost() {
    // @ts-ignore
    const assetWithProof = await getAssetWithProof(umi, assetId);
    await burn(umi, {
      ...assetWithProof,
      leafOwner: assetWithProof.leafOwner,
    }).sendAndConfirm(umi);
  }

  return (
    <button
      onClick={() => {
        burnPost();
      }}
    >
      Delete
    </button>
  );
};