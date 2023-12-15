import React, { Dispatch, SetStateAction, useState } from "react";
import {
  getMuxAssetId,
  getPlaybackId as getAudioUrl,
  waitFor,
} from "../../../utils/mux";
import { useRouter } from "next/router";
import LoadingComponent from "../../LoadingComponent";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const getRecordingUrl = async (uploadId: string) => {
  try {
    const assetId = await getMuxAssetId(uploadId);
    return await getAudioUrl(assetId);
  } catch (err) {
    console.error("Error in getRecording NFT: ", err);
  }
};

const setTheAttributes = (
  timeStamp: string,
  theVibe: string,
  longitude?: number,
  latitude?: number
) => {
  let attributes;

  if (latitude && longitude) {
    attributes = {
      Date: timeStamp,
      Motivation: "LFG",
      Vibe: theVibe,
      Long: longitude,
      Lat: latitude,
    };
  } else {
    attributes = {
      Date: timeStamp,
      Motivation: "LFG",
      Vibe: theVibe,
    };
  }
  return attributes;
};

interface MintNFTProps {
  timeStamp: string;
  theVibe: string;
  longitude?: number;
  latitude?: number;
  isMinting: boolean;
  setIsMinting: Dispatch<SetStateAction<boolean>>;
  uploadID: string;
  setHasErrored: Dispatch<SetStateAction<string | undefined>>;
  disabled: boolean;
}

const mintButtonAnimation = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: "0%", opacity: 1 },
};

export const MintNFT: React.FC<MintNFTProps> = ({
  timeStamp,
  theVibe,
  longitude,
  latitude,
  isMinting,
  setIsMinting,
  uploadID,
  setHasErrored,
  disabled,
}) => {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const [showLoadingMessage, setShowLoadingMessage] = useState<boolean>(false);

  const handleMintNFT = async () => {
    setIsMinting(true);

    const receiverAddress = publicKey?.toBase58();

    if (receiverAddress) {
      const recordingUrl = await getRecordingUrl(uploadID);
      const attributes = setTheAttributes(
        timeStamp,
        theVibe,
        longitude,
        latitude
      );

      try {
        const response = await fetch("/api/nft", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ receiverAddress, attributes, recordingUrl }),
        });

        let queryParams;
        if (longitude && latitude) {
          queryParams = {
            longitude: longitude.toString(),
            latitude: latitude.toString(),
          };
        }
        // NO IDEA WHY THIS IS HERE?
        router.push({
          pathname: `/create/mint`,
          query: queryParams,
        });

        if (response.ok) {
          const data = await response.json();
          const id = data.nftId;
          console.log("response", data);
          const fresh = true;
          router.push({
            pathname: "/map",
            query: { id, longitude, latitude, fresh },
          });
        }
      } catch (error) {
        console.error("Error: ", error);
        setHasErrored("Something didn't work out with the mint. ");
      }
    } else {
      setHasErrored("Your wallet was not connected.");
    }
  };

  return (
    <div className="flex justify-center align-center items-center h-full">
      {!isMinting ? (
        <div className="flex flex-col align-center items-center h-full rounded-xl">
          {connected ? (
            <>
              <motion.button
                className={"primary-btn text-3xl mt-5"}
                onClick={handleMintNFT}
                variants={mintButtonAnimation}
                initial="initial"
                animate="animate"
                transition={{
                  duration: 1,
                }}
                disabled={disabled}
              >
                {isMinting ? <i>mint</i> : "mint"}
              </motion.button>
            </>
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
