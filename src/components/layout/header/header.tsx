import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./header.module.css";
import AboutDialog from "@components/landing/AboutDialog";
import useDialogStore from "utils/useDialogStore";
import { NavBarTop } from "./NavBarTop";

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

  const { isAboutBtnDisabled } = useDialogStore();

  return (
    <header
      className={`w-full ${showTitle === "About" && "sticky top-0"}`}
      style={{ height: "5dvh" }}
    >
      {(showTitle === "Record" ||
        showTitle === "Explore" ||
        showTitle === "About" ||
        showTitle === "Blog" ||
        showTitle === "Contact") &&
        !isAboutBtnDisabled && (
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
