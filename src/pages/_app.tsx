import "@styles/globals.css";
import React, { useMemo, useState } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

const ClientWalletProvider = dynamic(
  () => import("../context/ClientWalletProvider"),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta', if changing -> also chnge it in ClientWalletProvider
  // const network = WalletAdapterNetwork.Mainnet;
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <ClientWalletProvider>
        <Component {...pageProps} />
      </ClientWalletProvider>
    </ConnectionProvider>
  );
}
