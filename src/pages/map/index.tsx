import React, { useEffect, useMemo, useState } from "react";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { MapView } from "@components/map/MapView";
import NFTModal, { AudioNFT } from "@components/map/NFTModal";
import { Marker } from "react-map-gl";
import Image from "next/image";
import marker from "../../assets/ear_small.png";
import { LoadingComponent } from "@components/LoadingComponent";
import Head from "next/head";

const MapScreen: React.FC = () => {
  const [audioNFTs, setAudioNFTs] = useState<AudioNFT[] | undefined>(undefined);
  const [showModal, setShowModal] = useState<boolean>(true);
  const [audioNFT, setAudioNFT] = useState<AudioNFT | undefined>(undefined);
  const [sharedNFTisShown, setSharedNFTisShown] = useState<boolean>(false);
  const [position, setPosition] = useState<{
    longitude: number;
    latitude: number;
  }>({ longitude: 13.35037231777517, latitude: 52.52709769976026 });

  useEffect(() => {
    const fetchNFTs = async () => {
      // check if cachedData is available in local storage
      const cachedData = localStorage.getItem("audioNFTs");

      if (cachedData) {
        setAudioNFTs(JSON.parse(cachedData));
      }

      await fetch("/api/nfts?initialPageNumber=1")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setAudioNFTs(data);

          localStorage.setItem("audioNFTs", JSON.stringify(data));
        })
        .catch((error) => console.log(error));
    };

    //  if position is in url, move the map accordingly
    const url = new URL(window.location.href);
    const longitude = url.searchParams.get("longitude");
    const latitude = url.searchParams.get("latitude");

    if (latitude && longitude) {
      setPosition({
        longitude: Number(longitude),
        latitude: Number(latitude),
      });
    }

    const checkIfAudioNFTisShared = () => {
      const audioNFTid = url.searchParams.get("id");

      if (audioNFTid && !sharedNFTisShown) {
        const sharedAudioNFT = audioNFTs?.find(
          (audioNFT) => audioNFT.id == Number(audioNFTid)
        );
        setAudioNFT(sharedAudioNFT);
        setShowModal(true);
      }
    };

    checkIfAudioNFTisShared();
    const intervalId = setInterval(fetchNFTs, 2000);

    return () => {
      localStorage.removeItem("audioNFTs");
      clearInterval(intervalId);
    };
  }, [audioNFTs, sharedNFTisShown]);

  const markers: JSX.Element[] = useMemo(
    () =>
      audioNFTs
        ? audioNFTs
            .filter(
              (audioNFT) =>
                audioNFT.attributes &&
                audioNFT.attributes.Long !== undefined &&
                audioNFT.attributes.Lat !== undefined
            )
            .map((audioNFT, index) => (
              <Marker
                key={index}
                longitude={Number(audioNFT.attributes.Long)}
                latitude={Number(audioNFT.attributes.Lat)}
                color="red"
                onClick={() => {
                  setAudioNFT(audioNFT);
                  setShowModal(true);
                }}
              >
                <Image src={marker} alt="øhr logo" width={40} height={40} />
              </Marker>
            ))
        : [],
    [audioNFTs]
  );

  return (
    <>
      <Head>
        <title>øhr</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="øhr: moments empowered by sound" />
        <meta property="og:url" content="" />
        <meta
          property="og:description"
          content="a social dApp created to empower"
        />
        <meta
          property="og:image"
          content="https://github.com/noamrubin22/ohr_xyz/blob/d2e77d623a0723cf7809ef2fa3e20a9ec6d8f11b/src/assets/link-preview-img.png"
        />
      </Head>
      <LayoutComponent showTitle="Explore" showFooter={true} showNavBar={true}>
        <div className="h-full">
          <h2 className="text-center text-sm"> to listen, click on the ears</h2>
          {audioNFT && (
            <NFTModal
              showModal={showModal}
              setShowModal={setShowModal}
              audioNFT={audioNFT}
              setSharedNFTisShown={setSharedNFTisShown}
            />
          )}
          {audioNFTs ? (
            <MapView {...position} markers={markers} />
          ) : (
            <div className="flex h-full justify-center align-center">
              <LoadingComponent />
            </div>
          )}
        </div>
      </LayoutComponent>
    </>
  );
};

export default MapScreen;
