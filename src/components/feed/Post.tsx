import React from "react";
import Image from "next/legacy/image";
import TipCreatorBtn from "./TipCreatorBtn";

interface PostProps {
  title: string;
  date: string;
  audioUrl: string;
  owner: string;
}

export const Post: React.FC<PostProps> = ({ title, date, audioUrl, owner }) => {
  return (
    <div className="w-full my-2 px-5">
      <div className="border p-2 m-1 rounded">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl m-1 mx-2">{title}</p>
            <p className="text-xs m-1 mx-2">
              {owner.substring(0, 3)}..{owner.substring(owner.length - 3)}
            </p>
          </div>
          <div className="flex gap-2 items-center m-1">
            <p className="text-xs">{date}</p>
            <p>L</p>
          </div>
        </div>

        <div className="flex justify-between items-center m-1">
          <audio controls>
            <source src={audioUrl} type="audio/mp4" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div className="flex justify-center self-center mt-3"></div>
        <div className="flex justify-start mx-2">
          <Image src={"/tip.png"} alt="Tip" width={33} height={33} />
          <TipCreatorBtn owner={owner} />
        </div>
      </div>
    </div>
  );
};
