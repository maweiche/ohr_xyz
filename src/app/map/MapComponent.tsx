"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { LayoutComponent } from "../../components/layout/LayoutComponent";
import { MapView } from "../../components/map/MapView";
import NFTModal, { AudioNFT } from "../../components/map/NFTModal";
import { Marker } from "react-map-gl";
import Image from "next/legacy/image";
import LoadingComponent from "@components/LoadingComponent";
import Head from "next/head";
const MapScreen: React.FC = () => {
  const [audioNFTs, setAudioNFTs] = useState<AudioNFT[] | undefined>(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [audioNFT, setAudioNFT] = useState<AudioNFT | undefined>(undefined);
  const [sharedNFTisShown, setSharedNFTisShown] = useState<boolean>(false);
  const [position, setPosition] = useState<{
    longitude: number;
    latitude: number;
  }>({ longitude: 13.35037231777517, latitude: 52.52709769976026 });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shouldZoom, setShouldZoom] = useState<boolean>(false);

  const getUrlData = (url: URL) => {
    const longitude = url.searchParams.get("longitude");
    const latitude = url.searchParams.get("latitude");
    const audioNFTid = url.searchParams.get("id");
    const fresh = url.searchParams.get("fresh");
    return { longitude, latitude, audioNFTid, fresh };
  };

  const showSharedNFT = useCallback(
    async (audioNFTid: string, audioNFTs: AudioNFT[]) => {
      if (audioNFTid && audioNFTs) {
        const sharedAudioNFT = audioNFTs?.find(
          (audioNFT) => audioNFT.id == Number(audioNFTid)
        );
        setAudioNFT(sharedAudioNFT);
      }
    },
    []
  );

  const checkIfAudioNFTisShared = useCallback(
    (audioNFTs: AudioNFT[]) => {
      const { longitude, latitude, audioNFTid, fresh } = getUrlData(
        new URL(window.location.href)
      );

      setShouldZoom(Boolean(fresh));

      if (latitude && longitude) {
        setPosition({
          longitude: Number(longitude),
          latitude: Number(latitude),
        });
        setShouldZoom(true);
      }
      if (audioNFTid) {
        showSharedNFT(audioNFTid, audioNFTs);
      }
    },
    [showSharedNFT]
  );

  useEffect(() => {
    if (audioNFT?.status === "pending") {
      setIsLoading(true);
    }
    if (audioNFT?.status === "confirmed") {
      setIsLoading(false);
      setShowModal(true);
    }
  }, [audioNFT?.status]);

  useEffect(() => {
    const fetchNFTs = async () => {
      fetch("/api/nfts?initialPageNumber=1")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setAudioNFTs(data);
          checkIfAudioNFTisShared(data);
        })
        .catch((error) => console.log(error));
    };

    if (!audioNFTs || audioNFT?.status === "pending") {
      fetchNFTs();
    }
  }, [checkIfAudioNFTisShared, audioNFTs, audioNFT?.status]);

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
                <Image
                  src={"/ear_small.png"}
                  alt="øhr logo"
                  width={40}
                  height={40}
                />
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
        <meta name="twitter:site" content="@ohr_xyz" />
        <meta
          name="twitter:title"
          content={audioNFT ? audioNFT.attributes.Vibe : "øhr"}
        />
        <meta name="twitter:description" content="listen, mint, share" />
        <meta
          property="og:url"
          content={
            audioNFT
              ? `https://ohr-app.xyz/map?id=${audioNFT.id}&latitude=${audioNFT.attributes.Lat}&longitude=${audioNFT.attributes.Long}`
              : "https://ohr-app.xyz/"
          }
        />
        <meta
          name="twitter:image"
          content="https://raw.githubusercontent.com/noamrubin22/ohr_xyz/main/src/assets/link-preview-img.png"
        />
        <meta property="og:description" content="listen, mint, share" />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/noamrubin22/ohr_xyz/main/src/assets/link-preview-img.png"
        />
      </Head>
      <LayoutComponent showTitle="Explore" showFooter={true} showNavBar={true}>
        <h2 className="text-center text-sm">
          {" "}
          {isLoading
            ? "one moment, we are fetching your øhr! "
            : "to listen, click on the ears"}{" "}
        </h2>
        {audioNFT && (
          <NFTModal
            showModal={showModal}
            setShowModal={setShowModal}
            audioNFT={audioNFT}
            setSharedNFTisShown={setSharedNFTisShown}
          />
        )}

        {audioNFTs && isLoading ? (
          <>
            <div className="flex justify-center">
              <span className="loading loading-dots loading-md "></span>
            </div>
            <MapView {...position} />
          </>
        ) : audioNFTs && !isLoading ? (
          <MapView {...position} markers={markers} shouldZoom={shouldZoom} />
        ) : (
          <div className="flex h-full justify-center align-center">
            <LoadingComponent />
          </div>
        )}
      </LayoutComponent>
    </>
  );
};

export default MapScreen;
