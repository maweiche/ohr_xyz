import Layout from "../../layout/Layout";
import { useRouter } from "next/router";
import MintNFT from "@components/create/minting/MintNFT";
import { useEffect, useState } from "react";
import { Error } from "../../Error";
import { getFirstArrayElementOrValue } from "utils/formatUtils";
import { Visualisation } from "./visualisation/Visualisation";
import Mux from "@mux/mux-node";
import { useAudioContext } from "context/AudioBlobContext";

interface VideoAsset {
  id: string;
  url: string;
}

const MintingPage: React.FC = () => {
  const router = useRouter();

  const { recordingUrl, timeStamp, theVibe, coordinates } = router.query;

  const parsedRecordingUrl = getFirstArrayElementOrValue(recordingUrl);
  const parsedTimeStamp = getFirstArrayElementOrValue(timeStamp);
  const parsedVibe = getFirstArrayElementOrValue(theVibe);
  const parsedCoordinates = JSON.parse(coordinates as string);
  console.log(parsedCoordinates);

  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const { audioBlob } = useAudioContext();
  const [videoAsset, setVideoAsset] = useState<VideoAsset | undefined>(
    undefined
  );

  // const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // useEffect(() => {
  //   if (recordingUrl && recordingUrl.length > 1) {
  //     const newAudio = new Audio(parsedRecordingUrl);
  //     newAudio.addEventListener("loadedmetadata", () => {
  //       setAudio(newAudio);
  //     });
  //   }
  // }, [recordingUrl]);

  const uploadToMux = async (audioBlob: Blob | undefined) => {
    if (!audioBlob) return;

    const response = await fetch(`/api/upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    console.log("response", response);

    const uploadResponse = await response.json();
    console.log("uploadUrl", uploadResponse);

    const uploadUrl = uploadResponse.url;
    try {
      let res = await fetch(uploadUrl.url, {
        method: "PUT",
        body: audioBlob,
        headers: { "content-type": audioBlob.type },
      });
      console.log("Upload is complete");
      setVideoAsset(uploadResponse);
    } catch (error) {
      console.error("Error uploading to Mux:", error);
    }
  };

  const getVideoAsset = async (videoAssetId: string) => {
    const response = await fetch(`/api/playback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoAssetId }),
    });
    console.log("response video asset", response);
  };

  useEffect(() => {
    uploadToMux(audioBlob);
  }, [audioBlob]);

  useEffect(() => {
    if (videoAsset) {
      getVideoAsset(videoAsset.id);
      console.log("videoasset updated");
    }
  }, [videoAsset]);

  return (
    <Layout showWallet="header" justifyStyling="between" showTitle="mint">
      <div>
        <div className="h-4/6 w-full flex flex-col justify-center mt-10 ">
          {hasError && (
            <div className="p-4 flex justify-center align-center">
              <Error />
            </div>
          )}
        </div>

        {parsedRecordingUrl && parsedTimeStamp && (
          <div className="flex self-center">
            <MintNFT
              recordingUrl={parsedRecordingUrl}
              isMinting={isMinting}
              setIsMinting={setIsMinting}
              setHasError={setHasError}
              timeStamp={parsedTimeStamp}
              theVibe={parsedVibe ?? "Bullish"}
              long={parsedCoordinates.longitude}
              lat={parsedCoordinates.latitude}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MintingPage;
