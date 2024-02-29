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
import { LayoutComponent } from "@components/layout/LayoutComponent";
import LoadingComponent from "@components/LoadingComponent";
import Link from "next/link";

type Tips = {
  tipper: PublicKey;
  amount: BN;
  timestamp: BN;
  nftMint: string;
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate = new Date(parseInt(dateString)).toLocaleString(
    "eu",
    options
  );
  return formattedDate;
};

const getUrlData = (url: URLSearchParams) => {
  const owner = url.get("owner");
  const id = url.get("id");
  const vibe = url.get("vibe");
  const longitude = url.get("long");
  const latitude = url.get("lat");
  return { owner, id, vibe, longitude, latitude };
};

export default function TipboardComponent() {
  const { publicKey, sendTransaction } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const [owner, setOwner] = useState<string | null>(null);

  // tipboard Info
  const [tipboardPda, setTipboardPda] = useState<PublicKey | null>(null);
  const [ownerTipboardPda, setOwnerTipboardPda] = useState<PublicKey | null>(
    null
  );
  const [authority, setAuthority] = useState<PublicKey | null>(null);
  const [displayInit, setDisplayInit] = useState<boolean>(false);
  const [tipboardData, setTipboardData] = useState<Tips[] | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const [id, setID] = useState<string | undefined>(undefined);
  const [vibe, setVibe] = useState<string | undefined>(undefined);
  const [longitude, setLongitude] = useState<string | undefined>(undefined);
  const [latitude, setLatitude] = useState<string | undefined>(undefined);

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
  async function getTipboardData(owner: string) {
    setLoading(true);
    let programData = PublicKey.findProgramAddressSync(
      [Buffer.from("tipboard")],
      program.programId
    );
    setTipboardPda(programData[0]);

    let ownerTipboardData = PublicKey.findProgramAddressSync(
      [Buffer.from("tipboard"), new PublicKey(owner).toBuffer()],
      program.programId
    );
    setOwnerTipboardPda(ownerTipboardData[0]);

    const tipboardAccountInfo = await connection.getAccountInfo(programData[0]);
    console.log("account info: ", tipboardAccountInfo);
    const ownerTipboardAccountInfo = await connection.getAccountInfo(
      ownerTipboardData[0]
    );
    console.log("owner account info: ", ownerTipboardAccountInfo);
    if (ownerTipboardAccountInfo != null) {
      const ownerTipDataDecoded = program.coder.accounts.decode(
        "Tipboard",
        ownerTipboardAccountInfo?.data
      );

      setTipboardData(ownerTipDataDecoded.tips);
      setAuthority(ownerTipDataDecoded.authority);
    } else {
      setDisplayInit(true);
    }

    setLoading(false);
  }

  // Initialize Tipboard
  async function initializeTipboard() {
    setLoading(true);
    try {
      const tx = await program.methods
        .initializeTipboard()
        .accounts({
          tipboardAccount: tipboardPda!,
          tipboard: ownerTipboardPda!,
          systemProgram: anchor.web3.SystemProgram.programId,
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

      // Not sure if this is the way to check if a tx was successful, but it should do it right?
      if (tx.instructions) {
        setIsInitialized(true);
      }
      getTipboardData(owner!);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    const { owner, id, vibe, longitude, latitude } = getUrlData(
      new URLSearchParams(window.location.search)
    );

    if (owner) {
      setOwner(owner);
      getTipboardData(owner);
    }

    if (id) {
      setID(id);
    }

    if (vibe) {
      setVibe(vibe);
    }

    if (longitude && latitude) {
      setLatitude(latitude);
      setLongitude(longitude);
    }
  }, []);

  return (
    <LayoutComponent showTitle="Tipboard" showFooter={true} showNavBar={true}>
      {loading ? (
        <div className="flex h-full justify-center align-center">
          <LoadingComponent />
        </div>
      ) : (
        <div className="flex h-full rounded-xl ">
          {!loading && !displayInit && (
            <table className="table-auto shadow-lg bg-white rounded-md w-full m-4">
              <thead>
                <tr>
                  <th className="text-purple-500 border  border-[#caacd4] text-center px-2 py-4">
                    Tipper
                  </th>
                  <th className="text-purple-500 border border-[#caacd4] text-center px-2 py-4">
                    ☉
                  </th>
                  <th className="text-purple-500 border border-[#caacd4] text-center px-2 py-4">
                    Time
                  </th>
                  <th className="text-purple-500 border border-[#caacd4] text-center px-2 py-4">
                    øhr
                  </th>
                </tr>
              </thead>
              <tbody>
                {tipboardData &&
                  id &&
                  tipboardData.map((tip, index) => {
                    const amount = (
                      parseInt(tip.amount.toString()) / LAMPORTS_PER_SOL
                    ).toFixed(2);
                    const date = formatDate(tip.timestamp.toString());
                    const tipper =
                      tip.tipper.toString().slice(0, 3) +
                      "..." +
                      tip.tipper.toString().slice(-3);
                    const øhr =
                      tip.nftMint.slice(0, 3) + "..." + tip.nftMint.slice(-3);
                    return (
                      <tr
                        className="hover:bg-gray-50 focus:bg-gray-300 active:bg-red-200"
                        key={index}
                      >
                        <td className="text-purple-500 border px-2 py-4 text-sm text-center">
                          {tipper}
                        </td>
                        <td className="text-purple-500 border px-2 py-4 text-sm text-center">
                          {amount}
                        </td>
                        <td className="text-purple-500 border px-2 py-4 text-sm text-center">
                          {date}
                        </td>
                        <td className="text-purple-500 border px-2 py-4 text-sm text-center">
                          {vibe && (
                            <Link
                              href={
                                longitude && latitude
                                  ? `/map?id=${id}&longitude=${longitude}&latitude=${latitude}`
                                  : `/map?id=${id}`
                              }
                            >
                              {vibe}
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
          {authority?.toString() == publicKey?.toString() && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "1rem",
              }}
            >
              {/* <button
                onClick={resettipboard}
                className="secondary-btn"
                disabled={
                  authority?.toString() != publicKey?.toString() ? true : false
                }
              >
                Reset Tipboard
              </button> */}
            </div>
          )}

          {!isInitialized && displayInit && publicKey?.toString() == owner && (
            <div className="p-5 flex flex-col justify-center text-center ">
              <p>
                Initialize your Tipboard and start receiving tips straight to
                your wallet!
              </p>

              <button
                onClick={initializeTipboard}
                className="secondary-btn m-10 mx-20"
              >
                Initialize Tipboard
              </button>
            </div>
          )}
        </div>
      )}
    </LayoutComponent>
  );
}
