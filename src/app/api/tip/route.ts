import { NextRequest, NextResponse } from "next/server";
import {
  Connection,
  Transaction,
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

export async function POST(
  request: NextRequest,
) {
  const req = await request.json();
  console.log("incoming req", req);
  const mainRpcEndpoint = process.env.NEXT_PUBLIC_HELIUS_MAINNET;
  const devnetRpcEndpoint = process.env.NEXT_PUBLIC_HELIUS_DEVNET;
  const connection = new Connection(mainRpcEndpoint!, "confirmed");

  const { publicKey, amount, owner } = req;
  const tipperPubkey = new PublicKey(publicKey);
  const ownerPubkey = new PublicKey(owner);
  const amountLamports = amount * LAMPORTS_PER_SOL;

  try {
    const { blockhash } = await connection.getLatestBlockhash("finalized");
    console.log("blockhash", blockhash);
    const transaction = new Transaction({
      recentBlockhash: blockhash,
      feePayer: new PublicKey(publicKey),
    });

    // Create instruction to transfer tokens
    const txInstruction = SystemProgram.transfer({
      fromPubkey: tipperPubkey,
      toPubkey: ownerPubkey,
      lamports: amountLamports,
    });

    transaction.add(txInstruction);

    // Serialize the transaction and convert to base64 to return it
    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
    });

    const base64 = serializedTransaction.toString("base64");

    https: if (base64) {
      return NextResponse.json({ transaction: base64 });
    } else {
      console.error("Failed to create NFT");
      return NextResponse.json({ error: "Failed to create NFT" });
    }
  } catch (err) {
    console.error(err);

    return NextResponse.json({ error: "Internal server error" });
  }
}
