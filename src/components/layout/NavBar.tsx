import { useRouter } from "next/router";
import React from "react";

export const NavBar = () => {
  const router = useRouter();

  return (
    <div className="btm-nav bg-slate-900">
      <button
        className={router.pathname === "/create" ? "active" : ""}
        onClick={() => router.push("/create")}
      >
        <p className="m-2 text-3xl">👂</p>
      </button>
      <button
        className={router.pathname === "/map" ? "active" : ""}
        onClick={() => router.push("/map")}
      >
        <p className="m-2 text-3xl">🗺</p>
      </button>
    </div>
  );
};
