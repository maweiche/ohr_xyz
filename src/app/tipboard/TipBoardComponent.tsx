"use client";
import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import {
  Program,
  AnchorProvider,
  Idl,
  setProvider,
} from "@project-serum/anchor";
import BN from "bn.js";
import * as anchor from "@project-serum/anchor";
import { IDL, Tipboard } from "@components/tipboard/idl/tipboard";

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
    "9KsKHzYzjX5xnQ3FsbN8AmjBmmW2zHcTVvUW9zWqWDZG"
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

  // tipboard Functions
  // initializetipboard
  async function initializeTipboard() {
    setLoading(true);

    const tx = await program.methods
      .initializeTipboard()
      .accounts({
        tipboard: tipboardPda!,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .transaction();

    const txHash = await sendTransaction(tx, connection);

    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();
    console.log("blockhash", blockhash);
    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature: txHash,
    });

    console.log("tx", tx);

    setLoading(false);
  }
  // addTip
  async function addTip() {
    setLoading(true);
    const tipAmount = new BN(100);
    const timestamp = new BN(Date.now());
    const tx = await program.methods
      .addTip(tipAmount, timestamp, publicKey!.toString())
      .accounts({
        tipboard: tipboardPda!,
      })
      .transaction();

    const txHash = await sendTransaction(tx, connection);

    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature: txHash,
    });

    console.log("tx", tx);

    setLoading(false);
  }

  // resettipboard
  async function resettipboard() {
    setLoading(true);

    const tx = await program.methods
      .resetTipboard()
      .accounts({
        tipboard: tipboardPda!,
      })
      .transaction();

    const txHash = await sendTransaction(tx, connection);

    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature: txHash,
    });

    console.log("tx", tx);

    setLoading(false);
  }

  useEffect(() => {
    getTipboardData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center rounded-md p-4 w-full ">
      <h2 className="text-2xl">Tip Board</h2>
      {loading && <p>Loading...</p>}
      {/* {displayInit && (
        <button onClick={initializeTipboard}>Initialize Tipboard</button>
      )} */}
      {!loading && (
        <div className=" rounded-md mt-10">
          <table className="table-auto shadow-lg bg-white border-collapse">
            <thead>
              <tr>
                <th className="text-purple-500 bg-blue-100 border text-center px-2 py-4">
                  Tipper
                </th>
                <th className="text-purple-500 bg-blue-100 border text-center px-2 py-4">
                  ☉
                </th>
                <th className="text-purple-500 bg-blue-100 border text-center px-2 py-4">
                  Time
                </th>
                <th className="text-purple-500 bg-blue-100 border text-center px-2 py-4">
                  øhr
                </th>
              </tr>
            </thead>
            <tbody>
              {tipboardData &&
                tipboardData.map((tip, index) => {
                  return (
                    <tr
                      className="hover:bg-gray-50 focus:bg-gray-300 active:bg-red-200"
                      key={index}
                    >
                      <td className="text-purple-500 border px-2 py-4">
                        {tip.tipper.toString().slice(0, 4)}...
                        {tip.tipper.toString().slice(-4)}
                      </td>
                      <td className="text-purple-500 border px-2 py-4">
                        {parseInt(tip.amount.toString()) / LAMPORTS_PER_SOL}
                      </td>
                      <td className="text-purple-500 border px-2 py-4">
                        {new Date(
                          parseInt(tip.timestamp.toString())
                        ).toLocaleString()}
                      </td>
                      <td className="text-purple-500 border px-2 py-4">
                        <a
                          href={`https://xray.helius.xyz/token/${tip.nftMint}?network=mainnet`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {tip.nftMint.slice(0, 4)}...{tip.nftMint.slice(-4)}
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {authority?.toString() == publicKey?.toString() && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "1rem",
              }}
            >
              <button
                onClick={resettipboard}
                className="secondary-btn"
                disabled={
                  authority?.toString() != publicKey?.toString() ? true : false
                }
              >
                Reset Tipboard
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
