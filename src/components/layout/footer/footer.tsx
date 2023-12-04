import React from "react";
import { NavBarBottom } from "../NavBarBottom";
import { Instagram } from "./icons/Instagram";
import { Tiktok } from "./icons/Tiktok";
import { Twitter } from "./icons/twitter";

interface FooterProps {
  showNavBar?: boolean;
}
export const Footer: React.FC<FooterProps> = ({ showNavBar }) => {
  return (
    <footer className="flex justify-center align-center items-end self-center">
      {!showNavBar ? (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex justify-center m-3 gap-4 ">
            <Twitter />
            <Instagram />
            <Tiktok />
          </div>
        </div>
      ) : (
        <NavBarBottom />
      )}
    </footer>
  );
};
