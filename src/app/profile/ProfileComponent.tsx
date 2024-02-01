"use client";

import { Post } from "@components/feed/Post";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import React from "react";

export const ProfileComponent = () => {
  const url = process.env.NEXT_PUBLIC_HELIUS_DEVNET ?? "";

  const { publicKey } = useWallet();

  const searchAssets = async () => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "searchAssets",
        params: {
          ownerAddress: publicKey?.toBase58(),
          grouping: [
            "collection",
            "7zLBMxtrJoKmBdCbn35J8YYjRcDQbAt3HprcBs6Poykv",
          ],
          page: 1, // Starts at 1
          limit: 1000,
        },
      }),
    });
    const { result } = await response.json();
    // console.log("øhr assets: ", result);
  };
  searchAssets();

  return (
    <LayoutComponent showTitle="Profile" showFooter={true} showNavBar={true}>
      <div></div>
    </LayoutComponent>
  );
};
