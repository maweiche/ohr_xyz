import React from "react";
import Image from "next/legacy/image";

export const Tiktok = () => {
  return (
    <a
      href="https://www.tiktok.com/@ohr_xyz"
      target="_blank"
      rel="noopener noreferrer"
      className="flex align-center items-center place-self-center ml-1"
    >
      {" "}
      <Image
        src="/tt-icon.png"
        alt="Tiktok"
        width={38}
        height={38}
        objectFit="cover"
      />{" "}
    </a>
  );
};
