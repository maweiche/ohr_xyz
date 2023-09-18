import React from "react";
import styles from "./header.module.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/router";
import { useWallet } from "@solana/wallet-adapter-react";

interface HeaderProps {
  showWallet: "footer" | "header" | "none";
}

export const Header: React.FC<HeaderProps> = ({ showWallet }) => {
  const router = useRouter();
  const wallet = useWallet();

  return (
    <header className="w-full md:py-4 ">
      <div className="flex justify-center">
        <div>
          {showWallet === "header" && (
            <WalletMultiButton className={styles["connect-button"]} />
          )}
        </div>
      </div>
    </header>
  );
};
