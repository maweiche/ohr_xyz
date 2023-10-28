import React, { useEffect, useMemo, useState } from "react";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { MapView } from "@components/map/MapView";
import { getNFTs } from "utils/nftUtils";
import NFTModal, { AudioNFT } from "@components/map/NFTModal";
import { Marker } from "react-map-gl";
import Image from "next/image";
import marker from "../../assets/ear_small.png";
import { LoadingComponent } from "@components/LoadingComponent";

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
    const longitude = url.searchParams.get("longitude");
    const latitude = url.searchParams.get("latitude");

    console.log("LATI", latitude);
    console.log("LONG", longitude);

    if (latitude && longitude) {
      setPosition({
        longitude: Number(longitude),
        latitude: Number(latitude),
      });
    }
  }, []);

  const markers: JSX.Element[] = useMemo(
    () =>
      audioNFTs
        ? audioNFTs
            .filter(
              (audioNFT) => audioNFT.attributes.Long && audioNFT.attributes.Lat
            )
            .map((audioNFT) => (
              <Marker
                key={audioNFT.id}
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
        {audioNFTs ? (
          <MapView {...position} markers={markers} />
        ) : (
          <div className="flex h-full justify-center align-center">
            <LoadingComponent />
          </div>
        )}
      </div>
    </LayoutComponent>
  );
};

export default MapScreen;
