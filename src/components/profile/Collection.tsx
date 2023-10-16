import React from "react";
import ohrNFT from "../../assets/ohr.png";
import ohrGIF from "../../assets/ohr.png";
import Image from "next/image";

export const Collection = () => {
  return (
    <div className="mt-2 w-full">
      <div className="flex w-full">
        <button className="border-2 w-full">created</button>
        <button className="border-2 w-full">collected</button>
      </div>
      <div className="w-full flex border-2">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="border-2 w-36">
              <Image
                src={index % 2 === 0 ? ohrNFT : ohrGIF}
                alt="ohr nft"
                width={300}
                height={300}
              />
            </div>
          ))}
      </div>
      <div className="w-full flex border-2">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="border-2 w-36">
              <Image
                src={index % 2 === 0 ? ohrNFT : ohrGIF}
                alt="ohr nft"
                width={300}
                height={300}
              />
            </div>
          ))}
      </div>
      <div className="w-full flex border-2">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="border-2 w-36">
              <Image
                src={index % 2 === 0 ? ohrNFT : ohrGIF}
                alt="ohr nft"
                width={300}
                height={300}
              />
            </div>
          ))}
      </div>
      <div className="w-full flex border-2">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="border-2 w-36">
              <Image
                src={index % 2 === 0 ? ohrNFT : ohrGIF}
                alt="ohr nft"
                width={300}
                height={300}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
