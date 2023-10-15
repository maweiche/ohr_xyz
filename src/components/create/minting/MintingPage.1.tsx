import Layout from "../../layout/Layout";
import { useRouter } from "next/router";
import MintNFT from "@components/create/minting/MintNFT";
import { useEffect, useState } from "react";
import { Error } from "../../Error";
import { getFirstArrayElementOrValue } from "utils/formatUtils";
import { useAudioContext } from "context/AudioBlobContext";

export const MintingPage: React.FC = () => {
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
  const [assetId, setAssetId] = useState<string | undefined>(undefined);

  useEffect(() => {
    createMuxAsset(audioBlob);
  }, [audioBlob]);

  const createMuxAsset = async (audioBlob: Blob | undefined) => {
    if (!audioBlob) return;

    // upload asset and get uploadUrl
    const response = await fetch(`/api/upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const initialData = await response.json();
    const uploadUrl = initialData.url;

    // upload audioBlob to asset endpoint (uploadUrl)
    try {
      let res = await fetch(uploadUrl, {
        method: "PUT",
        body: audioBlob,
        headers: { "content-type": audioBlob.type },
      });

      const responseData = await res.json();
      console.log("RES", res);
      // only when res.status === "asset_created" set AssetId
      const interval = setInterval(async () => {
        console.log("Current status:", initialData.status);

        if (res.ok) {
          try {
            if (responseData.status === "asset_created") {
              // If the status is 'asset_created', set the video asset
              setAssetId(responseData.asset_id);
              clearInterval(interval); // Stop polling
            }
          } catch (error) {
            if (error instanceof SyntaxError) {
              console.error("Error parsing JSON:", error);
              // Handle the JSON parsing error, e.g., by waiting for more data
            } else {
              throw error; // Re-throw other JSON parsing errors
            }
          }
        } else {
          console.error("Error fetching status:", response.status);
          clearInterval(interval); // Stop polling on error
        }
      }, 2000);
    } catch (error) {
      console.error("Error uploading to Mux:", error);
    }
  };

  const getPlaybackId = async (assetId: string) => {
    const response = await fetch(`/api/playback?assetId=${assetId}`);
    const data = await response.json();
    console.log("response video asset", data);
    return data;
  };

  // useEffect(() => {
  //   if (videoAsset?.assetId) {
  //     // getVideoAsset(videoAsset.id);
  //     console.log("videoAsset", videoAsset);
  //     console.log("videoasset updated");
  //     const playbackId = getPlaybackId(videoAsset.assetId);
  //     console.log("PLAYBACKID: ", playbackId);
  //   }
  // }, [videoAsset, videoAsset.assetId]);
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
