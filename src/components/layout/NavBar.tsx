import { useRouter } from "next/router";
import React from "react";
import createIcon from "../../assets/create-icon.png";
import mapIcon from "../../assets/map-icon.png";
import Image from "next/image";

export const NavBar = () => {
  const router = useRouter();
  const handleClick = (location: string) => {
    router.push(location);
  };
  return (
    <div className="btm-nav">
      <button
        className={router.pathname === "/create" ? "active" : ""}
        onClick={() => router.push("/create")}
      >
        <Image src={createIcon} alt="Create Icon" width={30} height={30} />
      </button>
      <button
        className={router.pathname === "/map" ? "active" : ""}
        onClick={() => router.push("/map")}
      >
        <Image src={mapIcon} alt="Map Icon" width={30} height={30} />
      </button>
    </div>
  );
};
