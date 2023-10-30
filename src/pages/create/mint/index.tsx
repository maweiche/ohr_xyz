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
import PopupMessage from "@components/PopupMessage";
import ErrorMessage from "@components/ErrorMessage";

const Minting = () => {
  const router = useRouter();

  const [hasError, setHasError] = useState<string | undefined>(undefined);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const { metadata, resetMetadata } = useMetadataStore();
  const { theVibe, timeStamp, longitude, latitude, uploadID } = router.query;

  const parsedUploadID = getFirstArrayElementOrValue(uploadID);
  const parsedLat = Number(getFirstArrayElementOrValue(latitude));
  const parsedLong = Number(getFirstArrayElementOrValue(longitude));
  const [isOnBreakpoint, setIsOnBreakpoint] = useState<boolean>(
    isUserOnBreakpoint(parsedLong, parsedLat)
  );
  const [isMintSuccessful, setIsMintSuccessful] = useState<boolean>(false);

  const handleSuccessfulMint = () => {
    if (latitude && longitude) {
      router.push({
        pathname: "/map",
        query: { longitude, latitude },
      });
    } else {
      router.push("/map");
    }
    resetMetadata();
  };

  const handleBack = () => {
    if (longitude && latitude) {
      const queryParams = {
        theVibe: theVibe,
        uploadID: uploadID,
        longitude: longitude.toString(),
        latitude: latitude.toString(),
        timeStamp: timeStamp,
      };

      router.push({
        pathname: "/",
        query: queryParams,
      });
    } else {
      const queryParams = {
        theVibe: theVibe,
        uploadID: uploadID,
        timeStamp: timeStamp,
      };

      router.push({
        pathname: "/",
        query: queryParams,
      });
    }
  };

  console.log("metadata: ", metadata);
  return (
    <LayoutComponent
      showWallet="header"
      justifyStyling="center"
      showTitle="Mint"
    >
      {isMintSuccessful &&
        (isMintSuccessful ? (
          <PopupMessage
            showModal={true}
            handleContinue={handleSuccessfulMint}
            buttonText="LFG"
            description="Congrats you minted your👂 øhr. Check out your wallet or map to listen to it."
            title="Yayy!"
            handleClose={handleSuccessfulMint}
          />
        ) : (
          !isMintSuccessful && (
            <ErrorMessage
              showModal={true}
              handleContinue={handleSuccessfulMint}
              buttonText="Try again"
              secondaryButtonText="Back 2 start"
              secondaryHandleClick={handleBack}
              description="Something went wrong."
              title="Oh no!"
              handleClose={handleSuccessfulMint}
            />
          )
        ))}

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
              setIsMintSuccessful={setIsMintSuccessful}
              setHasError={setHasError}
            />
          )}
        </div>
      </div>
    </LayoutComponent>
  );
};

export default Minting;
