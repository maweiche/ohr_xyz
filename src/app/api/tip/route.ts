import { NextRequest, NextResponse } from "next/server";
import {
  Connection,
  Transaction,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";


type Data = {
  transaction: string;
};

type Error = {
  error: string;
};

export async function POST(
  request: NextRequest,
  res: NextResponse<Data | Error>,
) {
    const req = await request.json();
    console.log('incoming req', req);
    const mainRpcEndpoint = process.env.NEXT_PUBLIC_HELIUS_MAINNET;
    const devnetRpcEndpoint = process.env.NEXT_PUBLIC_HELIUS_DEVNET;
    const connection = new Connection(mainRpcEndpoint!, "confirmed");

    const { publicKey, amount, owner } = req;
    const tipper_pubkey = new PublicKey(publicKey);
    const owner_pubkey = new PublicKey(owner);
    const amount_lamports = amount * 1000000000;

    try {

        const { blockhash } = await connection.getLatestBlockhash("finalized");
        console.log('blockhash', blockhash);
        const transaction = new Transaction({
            recentBlockhash: blockhash,
            feePayer: new PublicKey(publicKey),
        });

        // Create instruction to transfer tokens
        const txInstruction = SystemProgram.transfer({
            fromPubkey: tipper_pubkey,
            toPubkey: owner_pubkey,
            lamports: amount_lamports
        });
       
        transaction.add(txInstruction);

        // Serialize the transaction and convert to base64 to return it
        const serializedTransaction = transaction.serialize({
            requireAllSignatures: false,
        });
        
        const base64 = serializedTransaction.toString("base64");
        
        https: if (base64) {
          return NextResponse.json({transaction: base64});
        } else {
          console.error("Failed to create NFT");
          return NextResponse.json({ error: "Failed to create NFT" });
        }
    } catch (err) {
        console.error(err);

        NextResponse.json({ error: "Internal server error" });
        return;
    }
}