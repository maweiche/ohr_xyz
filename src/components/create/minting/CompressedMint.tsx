import React, { Dispatch, SetStateAction } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAudioContext } from "context/AudioBlobContext";
import { getMuxAssetId, getPlaybackId as getAudioUrl } from "utils/mux";
import { createNFT } from "../../../utils/nftUtils";
import { useRouter } from "next/router";
import { Loading as LoadingComponent } from "@components/Loading";
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

  const handleMintNFT = async () => {
    setIsMinting(true);

    if (!uploadId) {
      throw new Error("Upload missing.");
    }

    const recordingUrl = await getRecordingUrl(uploadId);
    const attributes = setAttributes(
      timeStamp,
      theVibe,
      longitude,
      latitude
    )[0];
    const receiverAddress = publicKey?.toBase58();

    if (receiverAddress) {
      const success = await createNFT(
        receiverAddress,
        attributes,
        recordingUrl
      );
      if (success) {
        router.push("/create/success");
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
    <div className="flex justify-center align-center items-center">
      {!isMinting ? (
        <div className="flex justify-center ">
          <button
            className={
              "text-xl p-2 text-[#d6dfd1] border-2 rounded-lg border-[#b754c0] mx-2 "
            }
            disabled={isMinting}
            onClick={onDiscard}
          >
            back
          </button>
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
