"use client";
import { MintNFT } from "../../../components/create/minting/MintNFT";
import { LayoutComponent } from "../../../components/layout/LayoutComponent";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentDateFormatted } from "../../../utils/formatUtils";
import useMetadataStore from "../../../utils/useMetadataStore";
import Image from "next/legacy/image";
import { GENERAL_NFT_IMG } from "../../../utils/constants";
import ErrorMessage from "../../../components/ErrorMessage";
import React from "react";

const MintComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [disableMintBtn, setDisableMintBtn] = useState<boolean>(true);

  const [long, setLong] = useState<number | undefined>(undefined);
  const [lat, setLat] = useState<number | undefined>(undefined);

  const timeStamp = searchParams.get("timeStamp");
  const theVibe = searchParams.get("theVibe");
  const uploadID = searchParams.get("uploadID");
  const longitude = searchParams.get("longitude");
  const latitude = searchParams.get("latitude");

  const [hasErrored, setHasErrored] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (latitude && longitude) {
      setLong(Number(longitude));
      setLat(Number(latitude));
    }
    setDisableMintBtn(false);
  }, [searchParams, longitude, latitude]);

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

    router.push(location + "?" + queryParams);
  };

  return (
    <LayoutComponent
      justifyStyling="center"
      showTitle="Mint"
      showFooter={false}
    >
      <div
        className="w-full h-full flex justify-center align-center items-center py-16"
        style={{ height: "100dvh" }}
      >
        {uploadID && (
          <div className="flex flex-col justify-center items-center w-84 p-3 rounded-xl">
            <h2 className="text-2xl m-2 font-bold text-center">{theVibe}</h2>
            <Image
              src={"/øhr_general.png"}
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
              setHasErrored={setHasErrored}
              disabled={disableMintBtn}
            />
          </div>
        )}
      </div>
      {hasErrored && (
        <ErrorMessage
          showModal={true}
          handleContinue={() => handleReroute("/")}
          buttonText="Back 2 start"
          description={hasErrored}
          title="Oh no!"
          handleClose={() => handleReroute("/")}
        />
      )}
    </LayoutComponent>
  );
};

export default MintComponent;
