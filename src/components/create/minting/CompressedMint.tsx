import React, { Dispatch, SetStateAction } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAudioContext } from "context/AudioBlobContext";
import { getMuxAssetId, getPlaybackId as getAudioUrl } from "utils/mux";
import { createNFT } from "../../../utils/nftUtils";
import { useRouter } from "next/router";
import { LoadingComponent } from "../../LoadingComponent";
import { motion } from "framer-motion";

const getRecordingUrl = async (uploadId: string) => {
  try {
    const assetId = await getMuxAssetId(uploadId);
    return await getAudioUrl(assetId);
  } catch (err) {
    console.error("Error in getRecording NFT: ", err);
  }
};

const setAttributes = (
  timeStamp: string,
  theVibe: string,
  longitude: string,
  latitude: string
) => {
  return [
    {
      Event: "Solana HyperDrive",
      Location: "Berlin Build Station",
      Date: timeStamp,
      Motivation: "LFG",
      Vibe: theVibe,
      Long: longitude,
      Lat: latitude,
    },
  ];
};

interface CompressedNFTProps {
  timeStamp: string;
  theVibe: string;
  longitude: string;
  latitude: string;
  isMinting: boolean;
  setIsMinting: Dispatch<SetStateAction<boolean>>;
}

export const CompressedMint: React.FC<CompressedNFTProps> = ({
  timeStamp,
  theVibe,
  longitude,
  latitude,
  isMinting,
  setIsMinting,
}) => {
  const { publicKey } = useWallet();
  const { uploadId } = useAudioContext();
  const router = useRouter();

  let newLong = Number(longitude) + 0.04;
  let newLat = Number(latitude) - 0.02;

  const handleMintNFT = async () => {
    setIsMinting(true);

    if (!uploadId) {
      throw new Error("Upload missing.");
    }

    const recordingUrl = await getRecordingUrl(uploadId);
    const attributes = setAttributes(
      timeStamp,
      theVibe,
      newLong.toString(),
      newLat.toString()
    )[0];
    const receiverAddress = publicKey?.toBase58();

    if (receiverAddress) {
      const success = await createNFT(
        receiverAddress,
        attributes,
        recordingUrl
      );
      if (success) {
        router.push("/map");
      }
    } else {
      throw new Error("No connection to wallet.");
    }
  };

  const onDiscard = () => {
    router.push("/create/record?discard=true");
  };

  const mintButtonAnimation = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: "0%", opacity: 1 },
  };

  return (
    <div className="flex justify-center align-center items-center mt-4">
      {!isMinting ? (
        <div className="flex justify-center align-center items-center h-full">
          {/* <button
            className={
              "text-xl p-2 text-[#d6dfd1] border-2 rounded-lg border-[#b754c0] mx-2 "
            }
            disabled={isMinting}
            onClick={onDiscard}
          >
            back
          </button> */}
          <motion.button
            className={
              "text-6xl rounded-lg p-2 border-2 border-[#b754c0] bg-[#8c2a87] text-[#f6faf6]"
            }
            onClick={handleMintNFT}
            variants={mintButtonAnimation}
            initial="initial"
            animate="animate"
            transition={{
              duration: 1,
            }}
          >
            {isMinting ? <i>mint</i> : "mint"}
          </motion.button>
        </div>
      ) : (
        <div className="m-6">
          <LoadingComponent />
        </div>
      )}
    </div>
  );
};
