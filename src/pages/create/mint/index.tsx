import { MintNFT } from "@components/create/minting/MintNFT";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  getCurrentDateFormatted,
  getFirstArrayElementOrValue,
} from "utils/formatUtils";
import useMetadataStore from "utils/useMetadataStore";
import Image from "next/image";
import { isUserOnBreakpoint } from "utils/nftUtils";
import { BREAKPOINT_NFT_IMG, GENERAL_NFT_IMG } from "utils/constants";

const Minting = () => {
  const router = useRouter();

  const [hasError, setHasError] = useState<boolean>(false);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const { metadata } = useMetadataStore();
  const { theVibe, timeStamp, longitude, latitude, uploadID } = router.query;

  const parsedUploadID = getFirstArrayElementOrValue(uploadID);
  const parsedLat = Number(getFirstArrayElementOrValue(latitude));
  const parsedLong = Number(getFirstArrayElementOrValue(longitude));
  const [isOnBreakpoint, setIsOnBreakpoint] = useState<boolean>(
    isUserOnBreakpoint(parsedLat, parsedLong)
  );

  console.log("metadata: ", metadata);
  return (
    <LayoutComponent
      showWallet="header"
      justifyStyling="center"
      showTitle="Mint"
    >
      <div className="w-full h-full flex justify-center align-center items-center">
        <div className="flex flex-col justify-center items-center w-84 p-3 rounded-xl">
          <h2 className="text-2xl m-2 font-bold text-center">{theVibe}</h2>
          <Image
            src={isOnBreakpoint ? BREAKPOINT_NFT_IMG : GENERAL_NFT_IMG}
            alt={isOnBreakpoint ? "Breakpoint NFT" : "øhr NFT"}
            width={220}
            height={220}
            className="rounded-xl"
          />
          <h2 className="mt-2 text-xl">{timeStamp}</h2>
          {parsedUploadID && (
            <MintNFT
              timeStamp={
                getFirstArrayElementOrValue(timeStamp) ??
                getCurrentDateFormatted()
              }
              theVibe={getFirstArrayElementOrValue(theVibe) ?? "Bullish"}
              longitude={parsedLong}
              latitude={parsedLat}
              uploadID={parsedUploadID}
              setIsMinting={setIsMinting}
              isMinting={isMinting}
              isOnBreakpoint={isOnBreakpoint}
            />
          )}
        </div>
      </div>
    </LayoutComponent>
  );
};

export default Minting;
