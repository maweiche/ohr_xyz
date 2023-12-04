import React from "react";
import Image from "next/image";

export const Twitter = () => {
  return (
    <a
      href="https://twitter.com/ohr_xyz"
      target="_blank"
      rel="noopener noreferrer"
      className="flex align-center items-center place-self-center"
    >
      {" "}
      <Image
        src="/x-icon.png"
        alt="Twitter"
        width={40}
        height={30}
        objectFit="cover"
      />{" "}
    </a>
  );
};
