import React from "react";
import styles from "../layout.module.css";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";

interface HomeBtnProps {
  handleClick: () => void;
}

export const HomeBtn: React.FC<HomeBtnProps> = ({ handleClick }) => {
  const router = useRouter();

  return (
    <>
      <button onClick={handleClick} className={`${styles["app-title"]}`}>
        <Image
          src={"/three_d_logo.png"}
          alt="'øhr' written in 3D"
          width={64}
          height={48}
        />
      </button>
    </>
  );
};
