import { MintNFT } from "@components/create/minting/MintNFT";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  getCurrentDateFormatted,
  getFirstArrayElementOrValue,
} from "utils/formatUtils";
import useMetadataStore from "utils/useMetadataStore";
import Image from "next/image";
import { GENERAL_NFT_IMG } from "utils/constants";
import PopupMessage from "@components/PopupMessage";
import ErrorMessage from "@components/ErrorMessage";

const Minting = () => {
  const router = useRouter();

  const [hasError, setHasError] = useState<string | undefined>(undefined);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const {
    metadata: { longitude, latitude, timeStamp, theVibe, uploadID },
    resetMetadata,
  } = useMetadataStore();
  const [isMintSuccessful, setIsMintSuccessful] = useState<boolean>(false);

  const [hasErrored, setHasErrored] = useState<boolean>(false);

  // useEffect(() => {}, [longitude, latitude]);

  const handleSuccessfulMint = () => {
    if (longitude && latitude) {
      router.push({
        pathname: "/map",
        query: { longitude, latitude },
      });
    } else {
      router.push("/map");
    }
    resetMetadata();
  };

  const handleReroute = (route: string) => {
    if (longitude && latitude) {
      const queryParams = {
        theVibe: theVibe,
        uploadID: uploadID,
        longitude: longitude.toString(),
        latitude: latitude.toString(),
        timeStamp: timeStamp,
      };

      router.push({
        pathname: route,
        query: queryParams,
      });
    } else {
      const queryParams = {
        theVibe: theVibe,
        uploadID: uploadID,
        timeStamp: timeStamp,
      };

      router.push({
        pathname: route,
        query: queryParams,
      });
    }
  };

  return (
    <LayoutComponent
      showWallet="header"
      justifyStyling="center"
      showTitle="Mint"
    >
      <h1>{timeStamp}</h1>
      <h1>{theVibe}</h1>
      <h1>{uploadID}</h1>
      <h1>{latitude}</h1>
      <h1>{longitude}</h1>
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
              handleContinue={() => handleReroute("/create/mint")}
              buttonText="Try again"
              secondaryButtonText="Back 2 start"
              secondaryHandleClick={() => handleReroute("/")}
              description="Something went wrong."
              title="Oh no!"
              handleClose={handleSuccessfulMint}
            />
          )
        ))}

      {hasErrored && (
        <ErrorMessage
          showModal={true}
          handleContinue={() => handleReroute("/")}
          buttonText="Back 2 start"
          description="Something went wrong."
          title="Oh no!"
          handleClose={() => handleReroute("/")}
        />
      )}

      <div className="w-full h-full flex justify-center align-center items-center">
        {hasErrored && <h1>error</h1>}
        <div className="flex flex-col justify-center items-center w-84 p-3 rounded-xl">
          <h2 className="text-2xl m-2 font-bold text-center">{theVibe}</h2>
          <Image
            src={GENERAL_NFT_IMG}
            alt={"øhr NFT"}
            width={220}
            height={220}
            className="rounded-xl"
          />
          <h2 className="mt-2 text-xl">{timeStamp}</h2>
          <MintNFT
            timeStamp={timeStamp ?? getCurrentDateFormatted()}
            theVibe={theVibe ?? "Bullish"}
            longitude={longitude}
            latitude={latitude}
            uploadID={uploadID}
            setIsMinting={setIsMinting}
            isMinting={isMinting}
            setIsMintSuccessful={setIsMintSuccessful}
            setHasError={setHasError}
          />
        </div>
      </div>
    </LayoutComponent>
  );
};

export default Minting;
