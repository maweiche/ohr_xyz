import React from "react";
import Image from "next/image";

export const Twitter = () => {
  return (
    <div className="md:py-4 md:px-4">
      <a
        href="https://twitter.com/ohr_xyz"
        target="_blank"
        rel="noopener noreferrer"
      >
        {" "}
        <Image
          src="/twitter-icon.png"
          alt="Twitter"
          width={22}
          height={22}
        />{" "}
        {/*  icon by <a target="_blank" href="https://icons8.com">Icons8</a> */}
      </a>
    </div>
  );
};
