import Layout from "../layout/Layout";
import { useRouter } from "next/router";
import MintNFT from "@components/minting/MintNFT";
import { useEffect, useState } from "react";
import { Error } from "@components/Error";
import { getFirstArrayElementOrValue } from "utils/formatUtils";
import { Visualisation } from "./visualisation/visualisation";

const MintingPage: React.FC = () => {
  const router = useRouter();

  const { recordingUrl, timeStamp, theVibe } = router.query;

  const parsedRecordingUrl = getFirstArrayElementOrValue(recordingUrl);
  const parsedTimeStamp = getFirstArrayElementOrValue(timeStamp);
  const parsedVibe = getFirstArrayElementOrValue(theVibe);

  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (recordingUrl && recordingUrl.length > 1) {
      const newAudio = new Audio(parsedRecordingUrl);
      newAudio.addEventListener("loadedmetadata", () => {
        setAudio(newAudio);
      });
    }
  }, [recordingUrl]);

  return (
    <Layout showWallet="header" justifyStyling="between">
      <h3 className="small-title">Mint</h3>
      <div className="h-4/6 w-full flex flex-col justify-center mt-10 ">
        {hasError ? (
          <div className="p-4 flex justify-center align-center">
            <Error />
          </div>
        ) : (
          <Visualisation />
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
          />
        </div>
      )}
    </Layout>
  );
};

export default MintingPage;
