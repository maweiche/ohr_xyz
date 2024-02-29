import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./header.module.css";
import { NavBarTop } from "./NavBarTop";
import useMenuStore from "../../../utils/useMenuStore";

interface HeaderProps {
  showTitle?: string;
  setShowAboutDialog: Dispatch<SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({
  showTitle,
  setShowAboutDialog,
}) => {
  const handleClick = () => {
    setShowAboutDialog(true);
  };
  const { isMenuDisabled } = useMenuStore();
  return (
    <header className="w-full top-0 left-0 fixed ">
      {(showTitle === "Record" ||
        showTitle === "Explore" ||
        showTitle === "About" ||
        showTitle === "Blog" ||
        showTitle === "Contact") &&
        !isMenuDisabled && (
          <NavBarTop />
          // <button onClick={handleClick} disabled={isAboutBtnDisabled}>
          //   <p className="text-3xl fixed top-5 left-5">❓</p>
          // </button>
        )}
      <div className="fixed top-7 left-1/2">
        {showTitle && <h3 className="small-title">{showTitle}</h3>}
      </div>
    </header>
  );
};
