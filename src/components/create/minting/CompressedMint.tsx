import React, { Dispatch, SetStateAction } from "react";
import { getMuxAssetId, getPlaybackId as getAudioUrl } from "utils/mux";
import { createNFT } from "../../../utils/nftUtils";
import { useRouter } from "next/router";
import { LoadingComponent } from "../../LoadingComponent";
import { motion } from "framer-motion";
import useMetadataStore from "utils/useMetadataStore";
import Image from "next/image";
import breakpointNFT from "../../../assets/nft-bp.jpg";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

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

const mintButtonAnimation = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: "0%", opacity: 1 },
};

const getRandomCoordinates = (coordinates: string) => {
  const randomOffset = 0.01 + Math.random() * 0.04;
  let newCoordinates = Number(coordinates) + randomOffset;
  return newCoordinates.toString();
};

export const CompressedMint: React.FC<CompressedNFTProps> = ({
  timeStamp,
  theVibe,
  longitude,
  latitude,
  isMinting,
  setIsMinting,
}) => {
  const { publicKey, connected } = useWallet();
  const { metadata, resetMetadata } = useMetadataStore();
  const router = useRouter();

  const handleMintNFT = async () => {
    setIsMinting(true);

    if (!metadata.uploadID) {
      throw new Error("Upload missing.");
    }

    const recordingUrl = await getRecordingUrl(metadata.uploadID);

    const attributes = setAttributes(
      metadata.timeStamp,
      metadata.theVibe,
      getRandomCoordinates(metadata.longitude),
      getRandomCoordinates(metadata.latitude)
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
        resetMetadata();
      }
    } else {
      throw new Error("No connection to wallet.");
    }
  };

  const onDiscard = () => {
    router.push("/create/record?discard=true");
  };

  return (
    <div className="flex justify-center align-center items-center mt-4">
      {!isMinting ? (
        <div className="flex flex-col justify-center align-center items-center h-full">
          <Image
            src={breakpointNFT}
            alt="Breakpoint NFT"
            width={220}
            height={220}
          />
          {connected ? (
            <motion.button
              className={"primary-btn text-3xl mt-5"}
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
          ) : (
            <div className="m-6">
              <WalletMultiButton />
            </div>
          )}
        </div>
      ) : (
        <div className="m-6">
          <LoadingComponent />
        </div>
      )}
    </div>
  );
};
