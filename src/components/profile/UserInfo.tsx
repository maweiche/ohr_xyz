import Image from "next/image";
import React from "react";
import default_img from "/Users/noam/Documents/ohr_xyz/src/assets/💅-5.png";

export const UserInfo = () => {
  return (
    <div className="flex flex-col w-full justify-start border-2 h-1/4 font-mono ">
      <div className="flex">
        <div className="avatar">
          <div className="w-24 rounded-full flex justify-center align-center">
            <Image
              src={default_img}
              alt="Profile Picture"
              width={150}
              height={150}
            />
          </div>
        </div>
        <div className="flex flex-col w-full font-mono">
          <div className="flex">
            <button className="border-2 font-mono">{0} posts</button>
            <button className="border-2 font-mono">{122} following</button>
            <button className="border-2 font-mono">{122} followers</button>
          </div>
          <h2 className="font-mono">name</h2>
          <p className="text-xs font-mono">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste,
            corrupti?
          </p>
        </div>
      </div>
      <button className="border-2">edit profile</button>
    </div>
  );
};
