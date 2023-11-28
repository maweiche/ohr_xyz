import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import styles from "./footer.module.css";
import { NavBarBottom } from "../NavBarBottom";
import { Instagram } from "./icons/Instagram";
import { OhrLogo } from "./icons/OhrLogo";
import { Tiktok } from "./icons/Tiktok";
import { Twitter } from "./icons/twitter";

interface FooterProps {
  showNavBar?: boolean;
}
export const Footer: React.FC<FooterProps> = ({ showNavBar }) => {
  return (
    <footer className="flex justify-center align-center items-end md:justify-end self-center h-10">
      {!showNavBar ? (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex justify-center mt-3 gap-4">
            <Twitter />
            <Instagram />
            <Tiktok />
          </div>
          <OhrLogo />
        </div>
      ) : (
        <NavBarBottom />
      )}
    </footer>
  );
};
