import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";
import {
  Program,
  AnchorProvider,
  Idl,
  setProvider,
} from "@project-serum/anchor";
import { IDL, Tipboard } from "../idl/tipboard";
import BN from "bn.js";

type Tips = {
  tipper: PublicKey;
  amount: BN;
  timestamp: BN;
  nftMint: string;
};

export default function TipboardDisplay() {
  const { publicKey, sendTransaction } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const [authority, setAuthority] = useState<PublicKey | null>(null);
  // tipboard Info
  const [tipboardPda, settipboardPda] = useState<PublicKey | null>(null);
  const [displayInit, setDisplayInit] = useState<boolean>(false);
  const [tipboardData, setTipboardData] = useState<Tips[] | null>(null);

  const connection = new Connection(clusterApiUrl("devnet"), {
    commitment: "confirmed",
  });

  // Create an Anchor provider
  const provider = new AnchorProvider(connection, useWallet() as any, {});

  // Set the provider as the default provider
  setProvider(provider);

  const programId = new PublicKey(
    "7vZPMfghSw2rQWhvCs1XW6CDLunP36jB253bQVWWMUmu"
  );
  const program = new Program(
    IDL as Idl,
    programId
  ) as unknown as Program<Tipboard>;

  // Get the data from the program
  async function getTipboardData() {
    setLoading(true);
    let data = PublicKey.findProgramAddressSync(
      [Buffer.from("tipboard")],
      program.programId
    );
    console.log("data", data);
    settipboardPda(data[0]);

    const tipboard_account_info = await connection.getAccountInfo(data[0]);

    if (tipboard_account_info != null) {
      const tip_data_decoded = program.coder.accounts.decode(
        "Tipboard",
        tipboard_account_info?.data
      );

      console.log("game_data_decoded", tip_data_decoded);

      setTipboardData(tip_data_decoded.tips);
      setAuthority(tip_data_decoded.authority);
    } else {
      setDisplayInit(true);
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col justify-center items-center border-2 border-gray-200 rounded-md p-4">
      <h2 className="text-2xl">Tip Board</h2>
      {loading && <p>Loading...</p>}
      {/* {displayInit && (
        <button onClick={initializeTipboard}>Initialize Tipboard</button>
      )} */}
      {!loading && (
        <div>
            <table className="table-auto shadow-lg bg-white border-collapse">
                <thead>
                    <tr>
                        <th className="text-purple-500 bg-blue-100 border text-left px-8 py-4">Tipper</th>
                        <th className="text-purple-500 bg-blue-100 border text-left px-8 py-4">Amount</th>
                        <th className="text-purple-500 bg-blue-100 border text-left px-8 py-4">Timestamp</th>
                        <th className="text-purple-500 bg-blue-100 border text-left px-8 py-4">NFT</th>
                    </tr>
                </thead>
                <tbody>
                    {tipboardData &&
                    tipboardData.map((tip, index) => {
                        return (
                        <tr className="hover:bg-gray-50 focus:bg-gray-300 active:bg-red-200" key={index}>
                            <td className="text-purple-500 border px-8 py-4">{tip.tipper.toString().slice(0, 4)}...{tip.tipper.toString().slice(-4)}</td>
                            <td className="text-purple-500 border px-8 py-4">{parseInt(tip.amount.toString()) / LAMPORTS_PER_SOL}</td>
                            <td className="text-purple-500 border px-8 py-4">{new Date(parseInt(tip.timestamp.toString())).toLocaleString()}</td>
                            <td className="text-purple-500 border px-8 py-4">
                              <a href={`https://xray.helius.xyz/token/${tip.nftMint}?network=mainnet`} target="_blank" rel="noreferrer">
                                {tip.nftMint.slice(0,4)}...{tip.nftMint.slice(-4)}
                              </a>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
      )}
    </div>
  );
}
