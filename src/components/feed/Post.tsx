import React, { useState } from "react";
import Image from "next/legacy/image";
import TipCreatorModal from "./TipCreatorModal";
import { SoundWave } from "./SoundWave";
import { useRouter } from "next/navigation";
import { AudioNFT } from "@components/map/NFTModal";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import SharePostModal from "./SharePostModal";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";
import { getAssetWithProof, burn } from "@metaplex-foundation/mpl-bubblegum";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";

interface PostProps {
  title: string;
  date: string;
  audioUrl: string;
  owner: string;
  post?: AudioNFT;
  assetId?: string;
  profile?: boolean;
  lat?: string;
  long?: string;
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
  profile,
  lat,
  long,
}) => {
  const [showTipModal, setShowTipModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);

  const router = useRouter();
  const { publicKey } = useWallet();
  const wallet = useWallet();

  const creator =
    owner.substring(0, 3) + "..." + owner.substring(owner.length - 3);

  const handleLocationClick = () => {
    if (post) {
      router.push(
        `/map?id=${post.assetId}&latitude=${post.attributesObj.Lat}&longitude=${post.attributesObj.Long}`
      );
    }
  };

  async function burnPost() {
    const mainRpcEndpoint = process.env.NEXT_PUBLIC_HELIUS_MAINNET;
    const devnetRpcEndpoint = process.env.NEXT_PUBLIC_HELIUS_DEVNET;
    const connection = new Connection(devnetRpcEndpoint!, "confirmed");
    const umi = createUmi(new Connection(devnetRpcEndpoint!)).use(dasApi());
    //   const umi = createUmi(devnetRpcEndpoint!).use(dasApi());
    umi.use(walletAdapterIdentity(wallet));
    // @ts-ignore
    const assetWithProof = await getAssetWithProof(umi, assetId);
    await burn(umi, {
      ...assetWithProof,
      leafOwner: assetWithProof.leafOwner,
    }).sendAndConfirm(umi);
  }

  return (
    <div className="w-full">
      <div className="border-b w-full">
        <div className="flex m-5">
          <div className="flex items-center align-center w-full">
            {post && (
              <Link
                href={
                  !!post?.attributesObj?.Long && !!post?.attributesObj?.Lat
                    ? `/tipboard?owner=${owner}&id=${post.id}&lat=${
                        post.attributesObj.Lat
                      }&long=${post.attributesObj.Long}${
                        post.attributesObj?.Vibe
                          ? `&vibe=${post.attributesObj.Vibe}`
                          : ""
                      }`
                    : `/tipboard?owner=${owner}&id=${post.id}${
                        post.attributesObj?.Vibe
                          ? `&vibe=${post.attributesObj.Vibe}`
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
          {post?.attributesObj.Lat && post?.attributesObj.Long && (
            <button onClick={handleLocationClick}>
              <Image
                src={"/location.png"}
                alt="Location"
                width={19}
                height={25}
              />
            </button>
          )}
        </div>
        <div className="">
          <p className="text-md mx-5">{title}</p>
          <div className="flex justify-center w-screen items-center mt-2">
            <SoundWave audioUrl={audioUrl} />
          </div>
          <div className="flex justify-end mx-5 my-2 gap-5 items-center align-center mt-2">
            <button
              onClick={() => {
                console.log("post", post), setShowTipModal(true);
              }}
              className="m-0 p-0 flex justify-center align-center items-center"
            >
              <Image src={"/tip.png"} alt="Tip" width={20} height={18} />
            </button>
            <button
              onClick={() => {
<<<<<<< Updated upstream
                setShowShareModal(true);
=======
                console.log("showTipModal", post), setShowShareModal(true);
>>>>>>> Stashed changes
              }}
              className="m-0 p-0 flex justify-center align-center items-center"
            >
              {" "}
              <Image src={"/share.png"} alt="Share" width={20} height={20} />
            </button>
            {profile && (
              <>
                <button
                  // onClick={() => editPost()}
                  className="m-0 p-0 flex justify-center align-center items-center"
                >
                  {" "}
                  <Image src={"/edit.png"} alt="Edit" width={16} height={17} />
                </button>
                {publicKey!.toString() === owner && (
                  <button
                    onClick={() => burnPost()}
                    className="m-0 p-0 flex justify-center align-center items-center"
                  >
                    {" "}
                    <Image
                      src={"/delete.png"}
                      alt="Delete"
                      width={16}
                      height={18}
                    />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {showTipModal && (
        <div className="fixed inset-0 overflow-y-auto z-10 justify-center items-center">
          <TipCreatorModal
            showModal={showTipModal}
            owner={owner}
            mintAddress={assetId!}
            setShowModal={setShowTipModal}
            long={long}
            lat={lat}
            id={post?.id}
            vibe={title}
          />
        </div>
      )}

      {showShareModal && assetId && (
        <div className="fixed inset-0 overflow-y-auto z-10 justify-center items-center">
          <SharePostModal
            showModal={showShareModal}
            setShowModal={setShowShareModal}
            longitude={long}
            latitude={lat}
            id={assetId!}
          />
        </div>
      )}
    </div>
  );
};
