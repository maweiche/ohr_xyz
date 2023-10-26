import { ErrorComponent } from "@components/ErrorComponent";
import { MintNFT } from "@components/create/minting/MintNFT";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  getCurrentDateFormatted,
  getFirstArrayElementOrValue,
} from "utils/formatUtils";
import useMetadataStore from "utils/useMetadataStore";

const Minting = () => {
  const router = useRouter();

  const [hasError, setHasError] = useState<boolean>(false);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const { metadata } = useMetadataStore();
  console.log("metadata: ", metadata);
  const { theVibe, timeStamp, longitude, latitude, uploadID } = router.query;

  console.log("theVibe: ", theVibe);
  console.log("timeStamp: ", timeStamp);
  console.log("longitude: ", longitude);
  console.log("latitude: ", latitude);
  console.log("uploadID: ", uploadID);

  const parsedUploadID = getFirstArrayElementOrValue(uploadID);
  return (
    <LayoutComponent
      showWallet="header"
      justifyStyling="center"
      showTitle="Mint"
    >
      <div>
        {hasError && (
          <div className="h-4/6 w-full flex flex-col justify-center mt-10 ">
            <div className="p-4 flex justify-center align-center">
              <ErrorComponent
                message={"Test message"}
                buttonText={"Try again"}
              />
            </div>
          </div>
        )}
        {parsedUploadID && (
          <MintNFT
            timeStamp={
              getFirstArrayElementOrValue(timeStamp) ??
              getCurrentDateFormatted()
            }
            theVibe={getFirstArrayElementOrValue(theVibe) ?? "Bullish"}
            longitude={Number(getFirstArrayElementOrValue(longitude))}
            latitude={Number(getFirstArrayElementOrValue(latitude))}
            uploadID={parsedUploadID}
            setIsMinting={setIsMinting}
            isMinting={isMinting}
          />
        )}
      </div>
    </LayoutComponent>
  );
};

export default Minting;
