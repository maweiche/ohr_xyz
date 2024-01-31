import React from "react";
import Image from "next/legacy/image";
import TipCreatorBtn from "./TipCreatorBtn";
import TipCreatorModal from "./TipCreatorModal";

interface PostProps {
  title: string;
  date: string;
  audioUrl: string;
  owner: string;
}

export const Post: React.FC<PostProps> = ({ title, date, audioUrl, owner }) => {
  const [displayTipModal, setDisplayTipModal] = React.useState(false);
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
          <button
            onClick={() => setDisplayTipModal(!displayTipModal)}
            className="border m-1 px-2 rounded"
          >
            TIP
          </button>
        </div>
      </div>
      {displayTipModal && (
        <div className="fixed inset-0 overflow-y-auto z-10 justify-center items-center">
          <div
            onClick={() => setDisplayTipModal(!displayTipModal)}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            style={{ zIndex: 90 }}
            aria-hidden="true"
          ></div>
          {/* <TipCreatorBtn owner={owner} /> */}
          <TipCreatorModal showModal={true} owner={owner} />
        </div>
      )}
    </div>
  );
};
