import React, { useEffect, useMemo, useState } from "react";

import { LayoutComponent } from "@components/layout/LayoutComponent";
import { MapView } from "@components/map/MapView";
import { Marker } from "react-map-gl";
import { getNFTs } from "utils/nftUtils";
import NFTModal, { AudioNFT } from "@components/map/NFTModal";
import Image from "next/image";
import marker from "../../assets/marker2.png";

const MapScreen: React.FC = () => {
  const [audioNFTs, setAudioNFTs] = useState<AudioNFT[] | undefined>(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [audioNFT, setAudioNFT] = useState<AudioNFT | undefined>(undefined);
  const [position, setPosition] = useState<{
    longitude: number;
    latitude: number;
  }>({ longitude: 4.9041, latitude: 52.3676 });

  useEffect(() => {
    getNFTs(setAudioNFTs);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    const latitude = url.searchParams.get("latitude");
    const longitude = url.searchParams.get("longitude");

    if (latitude && longitude) {
      setPosition({
        longitude: Number(longitude),
        latitude: Number(longitude),
      });
    }
  }, []);

  return (
    <LayoutComponent
      showWallet="none"
      justifyStyling="center"
      showTitle="Explore"
    >
      <div className="h-5/6">
        {audioNFT && (
          <NFTModal
            showModal={showModal}
            setShowModal={setShowModal}
            audioNFT={audioNFT}
          />
        )}
        {audioNFTs && (
          <MapView
            audioNFTs={audioNFTs}
            setAudioNFT={setAudioNFT}
            setShowModal={setShowModal}
            {...position}
          />
        )}
      </div>
    </LayoutComponent>
  );
};

export default MapScreen;
