import { usePathname, useRouter } from "next/navigation";
import styles from "./layout.module.css";
import React from "react";
import Image from "next/legacy/image";

export const NavBarBottom = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className={`${styles["navbar"]} sticky bottom-0`}>
      <button
        className={
          pathname === "/feed" ? styles["active"] : styles["navbar-btn"]
        }
        onClick={() => router.push("/feed")}
      >
        <div>
          <p className="text-2xl m-2">👂</p>
        </div>
      </button>
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
        <div className="m-2">
          <Image src={"/create.png"} alt="Create" width={25} height={25} />
        </div>
      </button>
      <button
        className={
          pathname === "/profile" ? styles["active"] : styles["navbar-btn"]
        }
        onClick={() => router.push("/profile")}
      >
        <div className="m-2">
          <Image src={"/profile.png"} alt="Profile" width={25} height={25} />
        </div>
      </button>
    </div>
  );
};
