import React, { useEffect, useState } from "react";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { MapView } from "@components/map/MapView";
import { getNFTs } from "utils/nftUtils";
import NFTModal, { AudioNFT } from "@components/map/NFTModal";
import maplibregl from "maplibre-gl";
import { useRouter } from "next/router";

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

  const onMapLoad = (mapInstance: maplibregl.Map) => {
    audioNFTs?.forEach((el) => {
      console.log("AudioNFTS", audioNFTs);
      if (mapInstance !== null) {
        const marker = new maplibregl.Marker()
          .setLngLat([Number(el.attributes.Long), Number(el.attributes.Lat)])
          .addTo(mapInstance);

        marker.getElement().addEventListener("click", () => {
          if (el && setAudioNFT) {
            console.log("clcked");
            setAudioNFT(el);
            setShowModal(true);
            console.log(el);
          }
        });
      }
    });
  };

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
          <MapView audioNFTs={audioNFTs} {...position} onLoad={onMapLoad} />
        )}
      </div>
    </LayoutComponent>
  );
};

export default MapScreen;
