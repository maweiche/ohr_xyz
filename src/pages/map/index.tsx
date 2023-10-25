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

  useEffect(() => {
    getNFTs(setAudioNFTs);
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
          />
        )}
      </div>
    </LayoutComponent>
  );
};

export default MapScreen;
