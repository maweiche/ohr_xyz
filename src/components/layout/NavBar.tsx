import { useRouter } from "next/router";
import React from "react";

export const NavBar = () => {
  const router = useRouter();
  const handleClick = (location: string) => {
    router.push(location);
  };
  return (
    <div className="btm-nav">
      <button
        className={router.pathname === "/" ? "active" : ""}
        onClick={() => router.push("/")}
      ></button>
      <button
        className={router.pathname === "/create" ? "active" : ""}
        onClick={() => router.push("/create")}
      ></button>
      <button
        className={router.pathname === "/profile" ? "active" : ""}
        onClick={() => router.push("/profile")}
      ></button>
    </div>
  );
};
