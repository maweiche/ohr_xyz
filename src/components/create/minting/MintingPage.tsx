import Layout from "../../layout/Layout";
import { useRouter } from "next/router";
import MintNFT from "@components/create/minting/MintNFT";
import { useEffect, useState } from "react";
import { Error as ErrorComponent } from "../../Error";
import { getFirstArrayElementOrValue } from "utils/formatUtils";
import { useAudioContext } from "context/AudioBlobContext";
import { resolve } from "path";
import { createMuxUpload } from "../../../utils/mux";

const MintingPage: React.FC = () => {
  const router = useRouter();

  const { recordingUrl, timeStamp, theVibe, coordinates } = router.query;

  // const parsedRecordingUrl = getFirstArrayElementOrValue(recordingUrl);
  const parsedTimeStamp = getFirstArrayElementOrValue(timeStamp);
  const parsedVibe = getFirstArrayElementOrValue(theVibe);
  const parsedCoordinates = JSON.parse(coordinates as string);
  console.log(parsedCoordinates);

  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const { uploadId } = useAudioContext();

  return (
    <Layout showWallet="header" justifyStyling="between" showTitle="mint">
      <div>
        <div className="h-4/6 w-full flex flex-col justify-center mt-10 ">
          {hasError && (
            <div className="p-4 flex justify-center align-center">
              <ErrorComponent />
            </div>
          )}
        </div>

        {parsedTimeStamp && (
          <div className="flex self-center">
            <MintNFT
              // recordingUrl={parsedRecordingUrl}
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

// console.log("RES", res);
// only when res.status === "asset_created" set AssetId
// const interval = setInterval(async () => {
//   console.log("Current status:", initialData.status);

// if (res.ok) {
//   try {
//     if (data.status === "asset_created") {
//       // If the status is 'asset_created', set the video asset
//       setAssetId(responseData.asset_id);
//       clearInterval(interval);
//     }
//   } catch (error) {
//     if (error instanceof SyntaxError) {
//       console.error("Error parsing JSON:", error);
//       // Handle the JSON parsing error, e.g., by waiting for more data
//     } else {
//       throw error; // Re-throw other JSON parsing errors
//     }
//   }
//   } else {
//     console.error("Error fetching status:", response.status);
//     clearInterval(interval); // Stop polling on error
//   }
// }, 2000);
// })
// .catch((err) => {
//   console.log(err);
//   console.error("Error uploading to Mux:", err);
