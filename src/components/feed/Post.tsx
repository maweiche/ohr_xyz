import React, { useState } from "react";
import Image from "next/legacy/image";
import TipCreatorModal from "./TipCreatorModal";
import { SoundWave } from "./SoundWave";
import { useRouter } from "next/navigation";
import { AudioNFT } from "@components/map/NFTModal";

interface PostProps {
  title: string;
  date: string;
  audioUrl: string;
  owner: string;
  post?: AudioNFT;
}

export const Post: React.FC<PostProps> = ({
  title,
  date,
  audioUrl,
  owner,
  post,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const router = useRouter();

  const handleLocationClick = () => {
    if (post) {
      router.push(
        `/map?&latitude=${post.attributes.Lat}&longitude=${post.attributes.Long}`
      );
    }
  };

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
        </div>
        <div className="flex justify-between items-center mt-2">
          <SoundWave audioUrl={audioUrl} />
        </div>
        <div className="flex justify-between mx-2">
          <button className="m-2" onClick={handleLocationClick}>
            <Image
              src={"/location.png"}
              alt="Location"
              width={20}
              height={27}
            />
          </button>
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
