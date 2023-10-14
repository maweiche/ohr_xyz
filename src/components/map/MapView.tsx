import React, { useEffect, useState } from "react";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import { Loading } from "@components/Loading";
import marker from "../../assets/marker2.png";
import Image from "next/image";

export interface Coordinates {
  longitude: number;
  latitude: number;
}

interface MapViewProps {
  setCoordinates?: React.Dispatch<
    React.SetStateAction<Coordinates | undefined>
  >;
}

export const MapView: React.FC<MapViewProps> = ({ setCoordinates }) => {
  const [currentCoordinates, setCurrentCoordinates] = useState<
    Coordinates | undefined
  >(undefined);
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

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
              <Marker
                longitude={currentCoordinates.longitude}
                latitude={currentCoordinates.latitude}
                color="red"
              >
                <Image src={marker} alt="øhr logo" width={50} height={50} />
              </Marker>
            </Map>
          </div>
        </>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <Loading />
        </div>
      )}
    </div>
  );
};
