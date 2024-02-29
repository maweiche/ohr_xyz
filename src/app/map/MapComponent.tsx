"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { LayoutComponent } from "../../components/layout/LayoutComponent";
import { MapView } from "../../components/map/MapView";
import NFTModal, { AudioNFT } from "../../components/map/NFTModal";
import { Marker } from "react-map-gl";
import axios from "axios";
import Image from "next/legacy/image";
import LoadingComponent from "@components/LoadingComponent";
import { getValidPosts, sortPosts } from "utils/postsUtils";

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

  const fetchJsonData = async (jsonUri: string) => {
    try {
      const response = await axios.get(jsonUri);
      if (response.status === 200) {
        const data = response.data;
        if (data.animationUrl === undefined) {
          return {
            animationUrl: undefined,
            attributes: data.attributes,
          };
        } else {
          return {
            animationUrl: data.animationUrl,
            attributes: data.attributes,
          };
        }
      } else {
        console.error("Failed to fetch data:", response.status);
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const fetchNFTs = async () => {
    const response = await fetch("/api/nfts?initialPageNumber=1");
    try {
      const validPosts = await getValidPosts(response);
      if (validPosts) {
        const posts = sortPosts(validPosts);
        setAudioNFTs(posts);
        checkIfAudioNFTisShared(validPosts);
      }
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
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
    if (!audioNFTs || audioNFT?.status === "pending") {
      fetchNFTs();
    }
    console.log("AudioNFTs: ", audioNFTs);
  }, [checkIfAudioNFTisShared, audioNFTs, audioNFT?.status]);

  const markers: JSX.Element[] = useMemo(
    () =>
      audioNFTs
        ? audioNFTs
            .filter(
              (audioNFT) =>
                audioNFT.attributesObj &&
                audioNFT.attributesObj.Lat !== undefined &&
                audioNFT.attributesObj.Long !== undefined
            )
            .map((audioNFT, index) => (
              <Marker
                key={index}
                longitude={Number(audioNFT.attributesObj.Long)}
                latitude={Number(audioNFT.attributesObj.Lat)}
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
              <span className="loading loading-dots loading-md"></span>
            </div>
            <MapView {...position} />
          </>
        ) : audioNFTs && !isLoading ? (
          <MapView {...position} markers={markers} shouldZoom={shouldZoom} />
        ) : (
          <div
            className="flex justify-center align-center absolute left-0 top-0 w-full "
            style={{ height: "100dvh" }}
          >
            <LoadingComponent />
          </div>
        )}
      </LayoutComponent>
    </>
  );
};

export default MapScreen;
