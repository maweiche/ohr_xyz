import React from "react";
import styles from "./header.module.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/router";
import { useWallet } from "@solana/wallet-adapter-react";

interface HeaderProps {
  showTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ showTitle }) => {
  const router = useRouter();
  const wallet = useWallet();

  return (
    <header className="w-full md:py-4 ">
      <div className="fixed top-10 left-1/2">
        {showTitle && <h3 className="small-title">{showTitle}</h3>}
      </div>
    </header>
  );
};
