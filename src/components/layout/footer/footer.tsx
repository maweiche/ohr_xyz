import React from "react";
import { Twitter } from "./icons/twitter";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import styles from "./footer.module.css";
import { NavBar } from "../NavBar";

interface FooterProps {
  showWallet: "footer" | "header" | "none";
  showLogo?: boolean;
}
export const Footer: React.FC<FooterProps> = ({ showWallet, showLogo }) => {
  return (
    <footer className="flex justify-center mt-4 items-end md:justify-end self-center h-10">
      {showWallet === "footer" && (
        <WalletMultiButton className={styles["connect-btn"]} />
      )}
      {showLogo && (
        <p className={`${styles["ohr-logo-title"]} text-3xl`}>øhr</p>
      )}
      <NavBar />
    </footer>
  );
};
