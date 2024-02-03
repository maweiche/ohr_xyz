import React, { useState } from "react";
import Image from "next/legacy/image";
import TipCreatorModal from "./TipCreatorModal";
import { SoundWave } from "./SoundWave";
import { useRouter } from "next/navigation";
import { AudioNFT } from "@components/map/NFTModal";
import { Delete } from "./Delete";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import SharePostModal from "./SharePostModal";

interface PostProps {
  title: string;
  date: string;
  audioUrl: string;
  owner: string;
  post?: AudioNFT;
  assetId?: string;
}
function formatDateAgoOrShortDate(dateString: string): string {
  const currentDate: Date = new Date();
  const inputDate: Date = new Date(dateString);
  const timeDifferenceInMilliseconds: number =
    currentDate.getTime() - inputDate.getTime();

  const minutes: number = Math.floor(timeDifferenceInMilliseconds / 60000);
  const hours: number = Math.floor(minutes / 60);

  if (timeDifferenceInMilliseconds < 86400000) {
    // Less than 24 hours
    if (minutes < 60) {
      return `${minutes}m`;
    } else {
      return `${hours}h`;
    }
  } else {
    // 24 hours or more
    const day: number = inputDate.getDate();
    const month: number = inputDate.getMonth() + 1;
    const year: number = inputDate.getFullYear();

    return `${day}/${month}/${year < 10 ? "0" : ""}${year}`;
  }
}

export const Post: React.FC<PostProps> = ({
  title,
  date,
  audioUrl,
  owner,
  post,
  assetId,
}) => {
  const [showTipModal, setShowTipModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);

  const router = useRouter();
  const { publicKey } = useWallet();

  const handleLocationClick = () => {
    if (post) {
      router.push(
        `/map?&latitude=${post.attributes.Lat}&longitude=${post.attributes.Long}`
      );
    }
  };
  const creator =
    owner.substring(0, 3) + "..." + owner.substring(owner.length - 3);

  return (
    <div className="w-full">
      <div className="border-b w-full">
        <div className="flex m-5">
          <div className="flex items-center align-center w-full">
            {post && (
              <Link
                href={
                  !!post?.attributes?.Long && !!post?.attributes?.Lat
                    ? `/tipboard?owner=${owner}&id=${post.id}&lat=${
                        post.attributes.Lat
                      }&long=${post.attributes.Long}${
                        post.attributes?.Vibe
                          ? `&vibe=${post.attributes.Vibe}`
                          : ""
                      }`
                    : `/tipboard?owner=${owner}&id=${post.id}${
                        post.attributes?.Vibe
                          ? `&vibe=${post.attributes.Vibe}`
                          : ""
                      }`
                }
                className="flex align-center items-center"
              >
                <div className="avatar">
                  <div className="w-8 rounded">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <p className="text-xs m-1 mx-2">{creator}</p>
              </Link>
            )}
            <p className="text-xs">● {formatDateAgoOrShortDate(date)}</p>
          </div>
          <button onClick={handleLocationClick}>
            <Image
              src={"/location.png"}
              alt="Location"
              width={19}
              height={25}
            />
          </button>
        </div>
        <div className="">
          <p className="text-md mx-5">{title}</p>
          {/* <div className="flex gap-2 items-center justify-evenly"></div> */}
          <div className="flex justify-center w-screen items-center mt-2">
            <SoundWave audioUrl={audioUrl} />
          </div>
          <div className="flex justify-end mx-5 my-2 gap-5 items-center align-center mt-2">
            <button
              onClick={() => setShowTipModal(true)}
              className="m-0 p-0 flex justify-center align-center items-center"
            >
              {" "}
              <Image src={"/tip.png"} alt="Tip" width={20} height={18} />
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="m-0 p-0 flex justify-center align-center items-center"
            >
              {" "}
              <Image src={"/share.png"} alt="Share" width={20} height={20} />
            </button>
          </div>
        </div>
      </div>
      {showTipModal && (
        <div className="fixed inset-0 overflow-y-auto z-10 justify-center items-center">
          <TipCreatorModal
            showModal={showTipModal}
            owner={owner}
            mintAddress={post!.mintAddress}
            setShowModal={setShowTipModal}
            long={post?.attributes.Long}
            lat={post?.attributes.Lat}
            id={post?.id}
            vibe={post?.attributes.Vibe}
          />
        </div>
      )}

      {showShareModal && post?.id && (
        <div className="fixed inset-0 overflow-y-auto z-10 justify-center items-center">
          <SharePostModal
            showModal={showShareModal}
            setShowModal={setShowShareModal}
            longitude={post?.attributes.Long}
            latitude={post?.attributes.Lat}
            id={post?.id}
          />
        </div>
      )}

      {publicKey!.toString() === owner && (
        <div className="flex justify-end mx-5 my-2 gap-5 items-center align-center">
          <Delete assetId={assetId!} currentLeafOwner={owner!} />
        </div>
      )}
    </div>
  );
};
