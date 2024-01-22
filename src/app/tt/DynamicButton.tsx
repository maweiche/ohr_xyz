"use client";

import dynamic from "next/dynamic";
import React from "react";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false, loading: () => <div>Loading...</div> }
);

const DynamicButton = () => {
  return <WalletMultiButtonDynamic />;
};

export default DynamicButton;