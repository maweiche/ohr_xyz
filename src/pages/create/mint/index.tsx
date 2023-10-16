import { Error as ErrorComponent } from "@components/Error";
import { CompressedMint } from "@components/create/minting/CompressedMint";
import Layout from "@components/layout/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import { getFirstArrayElementOrValue } from "utils/formatUtils";

const Minting = () => {
  const router = useRouter();

  const { timeStamp, theVibe, coordinates } = router.query;

  const parsedTimeStamp = getFirstArrayElementOrValue(timeStamp);
  console.log(theVibe);
  const parsedVibe = getFirstArrayElementOrValue(theVibe);
  const parsedCoordinates = JSON.parse(coordinates as string);
  console.log(parsedCoordinates);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isMinting, setIsMinting] = useState<boolean>(false);

  console.log("parsedVibe", parsedVibe);

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
        <CompressedMint
          timeStamp={parsedTimeStamp ?? new Date().toString()}
          theVibe={parsedVibe ?? "Bullish"}
          longitude={parsedCoordinates.longitude}
          latitude={parsedCoordinates.latitude}
          setIsMinting={setIsMinting}
          isMinting={isMinting}
        />

        {/* {parsedTimeStamp && (
          <div className="flex self-center">
            <MintNFT
              isMinting={isMinting}
              setIsMinting={setIsMinting}
              setHasError={setHasError}
              timeStamp={parsedTimeStamp}
              theVibe={parsedVibe ?? "Bullish"}
              long={parsedCoordinates.longitude}
              lat={parsedCoordinates.latitude}
            />
          </div>
        )} */}
      </div>
    </Layout>
  );
};

export default Minting;