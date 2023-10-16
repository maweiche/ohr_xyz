import React, { useEffect, useMemo, useState } from "react";

import Layout from "@components/layout/Layout";
import { AudioNFT, MapView } from "@components/map/MapView";
import { Marker } from "react-map-gl";
import { getNFTs } from "utils/nftUtils";
import NFTModal from "@components/map/NFTModal";
import Image from "next/image";
import marker from "../../assets/marker2.png";

const MapScreen: React.FC = () => {
  const [audioNFTs, setAudioNFTs] = useState<AudioNFT[] | undefined>(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [audioNFT, setAudioNFT] = useState<AudioNFT | undefined>(undefined);
  useEffect(() => {
    getNFTs(setAudioNFTs);
  }, []);

  useEffect(() => {
    console.log("audioNFTs", audioNFTs);
  }, [audioNFTs]);

  const markers: JSX.Element[] = useMemo(
    () =>
      audioNFTs
        ? audioNFTs.map((audioNFT) => (
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
              <Image src={marker} alt="øhr logo" width={50} height={50} />
            </Marker>
          ))
        : [],
    [audioNFTs]
  );

  return (
    <Layout showWallet="none" justifyStyling="start">
      {audioNFT && (
        <NFTModal
          showModal={showModal}
          setShowModal={setShowModal}
          audioNFT={audioNFT}
        />
      )}
      <MapView markers={markers} />
    </Layout>
  );
};

export default MapScreen;
