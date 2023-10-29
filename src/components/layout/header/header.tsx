import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./header.module.css";
import AboutDialog from "@components/landing/AboutDialog";

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

  return (
    <header className="w-full md:py-4 ">
      {showTitle === "Record" && (
        <button onClick={handleClick}>
          <p className="text-3xl fixed top-5 left-5">❓</p>
        </button>
      )}
      <div className="fixed top-10 left-1/2">
        {showTitle && <h3 className="small-title">{showTitle}</h3>}
      </div>
    </header>
  );
};
