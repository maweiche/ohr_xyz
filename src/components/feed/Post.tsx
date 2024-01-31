import React, { useState } from "react";
import Image from "next/legacy/image";
import TipCreatorModal from "./TipCreatorModal";
import { SoundWave } from "./SoundWave";

interface PostProps {
  title: string;
  date: string;
  audioUrl: string;
  owner: string;
}

export const Post: React.FC<PostProps> = ({ title, date, audioUrl, owner }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="w-full my-2 px-5 rounded">
      <div className="border p-2 m-1 rounded-xl">
        <div className="flex justify-center items-center">
          <p className="text-xl m-1 mx-2">{title}</p>
        </div>
        <div className="flex gap-2 items-center justify-evenly">
          <p className="text-xs m-1 mx-2">
            {owner.substring(0, 3)}..{owner.substring(owner.length - 3)}
          </p>
          <p className="text-xs">{date}</p>
          <p>L</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <SoundWave audioUrl={audioUrl} />
        </div>
        <div className="flex justify-end mx-2">
          <button
            onClick={() => setShowModal(true)}
            className="border m-1 px-3 rounded text-xl"
          >
            TIP
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 overflow-y-auto z-10 justify-center items-center">
          <TipCreatorModal
            showModal={showModal}
            owner={owner}
            setShowModal={setShowModal}
          />
        </div>
      )}
    </div>
  );
};
