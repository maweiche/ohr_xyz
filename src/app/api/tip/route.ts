import { NextRequest, NextResponse } from "next/server";
import {
  Connection,
  Transaction,
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  Program,
  AnchorProvider,
  Idl,
  setProvider,
} from "@project-serum/anchor";
import { IDL, Tipboard } from "../../../components/tipboard/idl/tipboard";
import BN from "bn.js";

export async function POST(request: NextRequest) {
  const req = await request.json();
  console.log("incoming req", req);
  const mainRpcEndpoint = process.env.NEXT_PUBLIC_HELIUS_MAINNET;
  const devnetRpcEndpoint = process.env.NEXT_PUBLIC_HELIUS_DEVNET;
  const connection = new Connection(devnetRpcEndpoint!, "confirmed");

  const { publicKey, amount, owner } = req;
  const tipperPubkey = new PublicKey(publicKey);
  const ownerPubkey = new PublicKey(owner);
  const amountLamports = amount * LAMPORTS_PER_SOL;

  const programId = new PublicKey(
    "9KsKHzYzjX5xnQ3FsbN8AmjBmmW2zHcTVvUW9zWqWDZG"
  );
  const program = new Program(
    IDL as Idl,
    programId
  ) as unknown as Program<Tipboard>;

  let data = PublicKey.findProgramAddressSync(
    [Buffer.from("tipboard")],
    program.programId
  );
  console.log("data", data);
  const tipboardPda = data[0];

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

    const tipAmount = new BN(amountLamports);
    const timestamp = new BN(Date.now());
    const programTxInstructions = await program.methods
      .addTip(tipAmount, timestamp, publicKey!.toString())
      .accounts({
        tipboard: tipboardPda!,
      })
      .transaction();

    transaction.add(txInstruction, programTxInstructions);

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
