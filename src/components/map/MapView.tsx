import React, { useEffect, useState } from "react";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import { Loading } from "@components/loading";
import marker from "../../assets/marker.png";
import Image from "next/image";

interface Coordinates {
  longitude: number;
  latitude: number;
}

export const MapView = () => {
  const [currentCoordinates, setCurrentCoordinates] =
    useState<Coordinates | null>(null);
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("position", position);
        setCurrentCoordinates({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
        console.log("current location", position.coords);
      });
    }
  }, []);

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
        <Loading />
      )}
    </div>
  );
};
