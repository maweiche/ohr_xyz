import React from "react";
import Image from "next/legacy/image";

export const Instagram = () => {
  return (
    <a
      href="https://www.instagram.com/ohr_xyz"
      target="_blank"
      rel="noopener noreferrer"
      className="flex align-center items-center place-self-center"
    >
      {" "}
      <Image
        src="/ig-icon.png"
        alt="Instagram"
        width={40}
        height={40}
        objectFit="cover"
      />{" "}
    </a>
  );
};
