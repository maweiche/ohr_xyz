import { useRouter } from "next/router";
import styles from "./layout.module.css";
import React from "react";

export const NavBar = () => {
  const router = useRouter();

  return (
    <div className={`${styles["navbar"]}`}>
      <button
        className={
          router.pathname === "/" ||
          router.pathname === "/create/locate" ||
          router.pathname === "/create/describe" ||
          router.pathname === "/create/mint" ||
          router.pathname === "/create/success"
            ? styles["active"]
            : styles["navbar-btn"]
        }
        onClick={() => router.push("/")}
      >
        <p className="m-2 text-3xl">👂</p>
      </button>
      <button
        className={
          router.pathname === "/map" ? styles["active"] : styles["navbar-btn"]
        }
        onClick={() => router.push("/map")}
      >
        <p className="m-2 text-3xl">🗺</p>
      </button>
    </div>
  );
};
