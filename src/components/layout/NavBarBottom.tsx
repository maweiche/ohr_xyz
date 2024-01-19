import { usePathname, useRouter } from "next/navigation";
import styles from "./layout.module.css";
import React from "react";
import Image from "next/legacy/image";

export const NavBarBottom = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className={`${styles["navbar"]}`}>
      <button
        className={
          pathname === "/" ||
          pathname === "/create/locate" ||
          pathname === "/create/listen" ||
          pathname === "/create/describe" ||
          pathname === "/create/mint" ||
          pathname === "/create/success"
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
          pathname === "/map" ? styles["active"] : styles["navbar-btn"]
        }
        onClick={() => router.push("/map")}
      >
        <div className="m-2">
          <Image
            src={"/NFT_icon-01.png"}
            alt="NFT location"
            width={32}
            height={32}
          />
        </div>
      </button>
    </div>
  );
};
