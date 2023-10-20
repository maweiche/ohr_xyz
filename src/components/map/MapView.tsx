import React, { useEffect, useMemo, useState } from "react";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import { LoadingComponent } from "../LoadingComponent";
import marker from "../../assets/marker2.png";
import Image from "next/image";
import { NFTattributes } from "utils/nftUtils";
import NFTModal from "./NFTModal";

export interface Coordinates {
  longitude: number;
  latitude: number;
}

interface MapViewProps {
  setCoordinates?: React.Dispatch<
    React.SetStateAction<Coordinates | undefined>
  >;
  markers?: JSX.Element[];
}

export interface AudioNFT {
  animationUrl: string;
  attributes: NFTattributes;
  description: string;
  externalUrl: string;
  id: number;
  image: string;
  mintAddress: string;
  name: string;
  projectId: number;
  status: string;
  symbol: string;
}

export const MapView: React.FC<MapViewProps> = ({
  setCoordinates,
  markers,
}) => {
  const [currentCoordinates, setCurrentCoordinates] = useState<
    Coordinates | undefined
  >(undefined);
  const accessTokenENV = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const accessToken =
    "pk.eyJ1Ijoibm9hbWllMjIiLCJhIjoiY2xncDBkN2ZmMDExdDNmbXIydmIxdDRwaSJ9._n4FW8d0fFlLLeCqAchbuA";
  console.log("AccessToken: ", accessTokenENV);
  console.log("RPC: ", process.env.NEXT_PUBLIC_RPC);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentCoordinates({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
        setCoordinates &&
          setCoordinates({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
      });
    }
  }, [setCoordinates]);

  return (
    <div className="h-full w-full">
      {currentCoordinates ? (
        <>
          <div className="h-full w-full">
            <Map
              mapboxAccessToken={accessToken}
              mapStyle={`mapbox://styles/mapbox/dark-v11`}
              initialViewState={{
                longitude: currentCoordinates?.longitude,
                latitude: currentCoordinates?.latitude,
                zoom: 10,
              }}
            >
              <GeolocateControl
                positionOptions={{ enableHighAccuracy: true }}
                fitBoundsOptions={{ maxZoom: 12 }}
                trackUserLocation={true}
                showAccuracyCircle={true}
                showUserLocation={true}
              />
              {!markers ? (
                <Marker
                  longitude={currentCoordinates.longitude + 33}
                  latitude={currentCoordinates.latitude + 34}
                  color="red"
                >
                  <Image src={marker} alt="øhr logo" width={50} height={50} />
                </Marker>
              ) : (
                markers
              )}
            </Map>
          </div>
        </>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <LoadingComponent />
        </div>
      )}
    </div>
  );
};
