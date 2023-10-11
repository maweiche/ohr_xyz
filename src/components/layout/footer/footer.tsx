import React from "react";
import { Twitter } from "./components/twitter";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import styles from "./footer.module.css";

interface FooterProps {
  showWallet: "footer" | "header" | "none";
  showLogo?: boolean;
}
export const Footer: React.FC<FooterProps> = ({ showWallet, showLogo }) => {
  return (
    <footer className="flex justify-center mt-4 items-end md:justify-end self-center">
      {showWallet === "footer" && (
        <WalletMultiButton className={styles["connect-btn"]} />
      )}
      {showLogo && (
        <p className={`${styles["ohr-logo-title"]} text-3xl`}>øhr</p>
      )}
    </footer>
  );
};