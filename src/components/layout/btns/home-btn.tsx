import React from "react";
import styles from "../layout.module.css";
import Image from "next/image";
import OhrThreeDLogo from "../../../assets/three_d_logo.png";
import { useRouter } from "next/router";

interface HomeBtnProps {
  handleClick: () => void;
}

export const HomeBtn: React.FC<HomeBtnProps> = ({ handleClick }) => {
  const router = useRouter();

  return (
    <>
      <button onClick={handleClick} className={`${styles["app-title"]}`}>
        {/* <h1
          className={`self-start text-2xl break-all absolute italic w-5 ${styles["app-title"]}`}
        >
          øhr
        </h1>
        <h1
          className={`self-start text-2xl break-all absolute italic w-5 ${styles["app-title-top"]}`}
        >
          øhr
        </h1> */}
        <Image
          src={OhrThreeDLogo}
          alt="'øhr' written in 3D"
          width={64}
          height={48}
        />
      </button>
    </>
  );
};
