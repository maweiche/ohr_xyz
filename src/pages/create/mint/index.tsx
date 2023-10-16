import { ErrorComponent } from "@components/ErrorComponent";
import { CompressedMint } from "@components/create/minting/CompressedMint";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { useRouter } from "next/router";
import { useState } from "react";
import { getFirstArrayElementOrValue } from "utils/formatUtils";

const Minting = () => {
  const router = useRouter();
  let parsedVibe;
  const { timeStamp, theVibe, coordinates } = router.query;

  const parsedTimeStamp = getFirstArrayElementOrValue(timeStamp);

  if (theVibe === "") {
    parsedVibe = "Bullish";
  } else {
    parsedVibe = getFirstArrayElementOrValue(theVibe);
  }

  const parsedCoordinates = JSON.parse(coordinates as string);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isMinting, setIsMinting] = useState<boolean>(false);

  return (
    <LayoutComponent
      showWallet="header"
      justifyStyling="between"
      showTitle="mint"
    >
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
      </div>
    </LayoutComponent>
  );
};

export default Minting;
