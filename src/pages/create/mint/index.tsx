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

  const [isMinting, setIsMinting] = useState<boolean>(false);
  const { metadata, resetMetadata } = useMetadataStore();
  const [isMintSuccessful, setIsMintSuccessful] = useState<boolean>(false);
  const [disableMintBtn, setDisableMintBtn] = useState<boolean>(true);

  const [long, setLong] = useState<number | undefined>(undefined);
  const [lat, setLat] = useState<number | undefined>(undefined);

  const url = new URL(window.location.href);
  const timeStamp = url.searchParams.get("timeStamp");
  const theVibe = url.searchParams.get("theVibe");
  const uploadID = url.searchParams.get("uploadID");
  const longitude = url.searchParams.get("longitude");
  const latitude = url.searchParams.get("latitude");
  console.log("LONG: ", longitude);
  console.log("LAT: ", latitude);

  const [hasErrored, setHasErrored] = useState<string | undefined>(undefined);

  useEffect(() => {
    // longitude = url.searchParams.get("longitude");
    // latitude = url.searchParams.get("latitude");

    if (latitude && longitude) {
      setLong(Number(longitude));
      setLat(Number(latitude));
    }
    setDisableMintBtn(false);
    console.log("IN USE EFFECT FOR LONG AND LAT");
  }, [url.searchParams, longitude, latitude]);

  const handleSuccessfulMint = () => {
    if (long && lat) {
      router.push({
        pathname: "/map",
        query: { long, lat },
      });
    } else {
      router.push("/map");
    }
    resetMetadata();
  };
  const handleReroute = (location: string) => {
    const queryParams: {
      theVibe: string | null;
      uploadID: string | null;
      timeStamp: string | null;
      longitude?: string | null;
      latitude?: string | null;
    } = {
      theVibe: theVibe,
      uploadID: uploadID,
      timeStamp: timeStamp,
    };

    if (long && lat) {
      queryParams.longitude = long.toString();
      queryParams.latitude = lat.toString();
    }

    router.push({
      pathname: location,
      query: queryParams,
    });
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
        {uploadID ? (
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
              longitude={long}
              latitude={lat}
              uploadID={uploadID}
              setIsMinting={setIsMinting}
              isMinting={isMinting}
              setIsMintSuccessful={setIsMintSuccessful}
              setHasErrored={setHasErrored}
              disabled={disableMintBtn}
            />
          </div>
        ) : (
          <ErrorMessage
            showModal={true}
            handleContinue={() => handleReroute("/")}
            buttonText="Back 2 start"
            description="Something went wrong."
            title="Oh no!"
            handleClose={() => handleReroute("/")}
          />
        )}
      </div>
    </LayoutComponent>
  );
};

export default Minting;
