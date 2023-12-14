"use client";

import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { FC, ReactNode, useCallback, useMemo } from "react";

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  //   const network = WalletAdapterNetwork.Mainnet;
  const network = WalletAdapterNetwork.Devnet;

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [network]
  );

  const onError = useCallback((error: WalletError) => {
    console.error(error);
  }, []);
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect={true}>
        <WalletModalProvider>
          <div>{children}</div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContextProvider;
