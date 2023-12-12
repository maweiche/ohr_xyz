import { useRouter } from "next/router";
import styles from "./layout.module.css";
import React from "react";
import nftMap from "../../assets/NFT_icon-01.png";
import Image from "next/legacy/image";

export const NavBarBottom = () => {
  const router = useRouter();

  return (
    <div className={`${styles["navbar"]}`}>
      <button
        className={
          router.pathname === "/" ||
          router.pathname === "/create/locate" ||
          router.pathname === "/create/listen" ||
          router.pathname === "/create/describe" ||
          router.pathname === "/create/mint" ||
          router.pathname === "/create/success"
            ? styles["active"]
            : styles["navbar-btn"]
        }
        onClick={() => router.push("/")}
      >
        <div className={styles["ear-icon"]}>
          <p className="text-3xl m-2">👂</p>
        </div>
        {/* <Image src={earIcon} alt="Ear" width={20} height={28} /> */}
      </button>
      <button
        className={
          router.pathname === "/map" ? styles["active"] : styles["navbar-btn"]
        }
        onClick={() => router.push("/map")}
      >
        <div className="m-2">
          <Image src={nftMap} alt="NFT location" width={32} height={32} />
        </div>
      </button>
    </div>
  );
};
