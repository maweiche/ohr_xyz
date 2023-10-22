import React, { useEffect, useMemo, useState } from "react";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import { LoadingComponent } from "../LoadingComponent";
import marker from "../../assets/marker2.png";
import Image from "next/image";

export interface Coordinates {
  longitude: number;
  latitude: number;
}

interface MapViewProps {
  markers?: JSX.Element[];
  setLong?: (longitude: string) => void;
  setLat?: (latitude: string) => void;
  shouldAddLocation?: boolean;
}

export const MapView: React.FC<MapViewProps> = ({
  setLong,
  setLat,
  markers,
  shouldAddLocation,
}) => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const [currentCoordinates, setCurrentCoordinates] = useState<
    Coordinates | undefined
  >(undefined);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentCoordinates({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });

        if (setLat && setLong) {
          if (shouldAddLocation === true) {
            setLat(position.coords.latitude.toString());
            setLong(position.coords.longitude.toString());
          } else if (shouldAddLocation === false) {
            setLat("");
            setLong("");
          }
        }
      });
    }
  }, [setLong, setLat, shouldAddLocation]);

  return (
    <div className="h-full w-full">
      {currentCoordinates ? (
        <div className="h-full w-full">
          <Map
            mapboxAccessToken={accessToken}
            mapStyle={`mapbox://styles/mapbox/light-v11`}
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
            {!markers && currentCoordinates ? (
              <Marker
                longitude={currentCoordinates.longitude}
                latitude={currentCoordinates.latitude}
                color="red"
              >
                <Image src={marker} alt="øhr marker" width={50} height={50} />
              </Marker>
            ) : (
              markers
            )}
          </Map>
        </div>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <LoadingComponent />
        </div>
      )}
    </div>
  );
};
