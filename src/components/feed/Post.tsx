import React from "react";
import Image from "next/legacy/image";

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
          <p className="text-xl m-1 mx-2">{title}</p>
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
        <p className="text-xs">{owner}</p>
        <div className="flex justify-end mx-2">
          <button>
            <Image src={"/tip.png"} alt="Tip" width={33} height={33} />
            <p className="text-xs">Tip</p>
          </button>
        </div>
      </div>
    </div>
  );
};
