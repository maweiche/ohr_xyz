import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { getAssetWithProof, burn } from '@metaplex-foundation/mpl-bubblegum'
import { mplToolbox } from "@metaplex-foundation/mpl-toolbox";
import { Connection, PublicKey } from "@solana/web3.js";
import { useEffect } from "react";

interface DeleteProps {
  assetId: PublicKey;
  currentLeafOwner: string;
}

export const Delete : React.FC<DeleteProps> = ({ assetId, currentLeafOwner }) => {
    const mainRpcEndpoint = process.env.NEXT_PUBLIC_HELIUS_MAINNET;
    const devnetRpcEndpoint = process.env.NEXT_PUBLIC_HELIUS_DEVNET;
    const connection = new Connection(devnetRpcEndpoint!, "confirmed");
    // Use the RPC endpoint of your choice.
    const umi = createUmi(connection).use(mplToolbox());
  

    async function burnPost() {
        // @ts-ignore
        const assetWithProof = await getAssetWithProof(umi, assetId);
        await burn(umi, {
            ...assetWithProof,
            // @ts-ignore
            leafOwner: currentLeafOwner,
        }).sendAndConfirm(umi);
    }

    useEffect(() => {
        if (currentLeafOwner) {
            burnPost();
        }
    }, []);

    return (
        <button>Delete</button>
    );
};
