import React from "react";
import Map, { Marker } from "react-map-gl";
import Image from "next/image";
import marker from "../../assets/marker2.png";

interface MapViewProps {
  latitude: number;
  longitude: number;
  markers?: JSX.Element[];
}

export const MapView: React.FC<MapViewProps> = ({
  longitude,
  latitude,
  markers,
}) => {
  return (
    <div className="h-full flex justify-center items-center m-4 rounded-md">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        mapStyle={`mapbox://styles/noamie22/ck2zynqqn018x1cnohcw5cnna`}
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom: 4,
        }}
      >
        {!markers ? (
          <Marker longitude={longitude} latitude={latitude} color="red">
            <Image src={marker} alt="øhr logo" width={50} height={50} />
          </Marker>
        ) : (
          markers
        )}
      </Map>
    </div>
  );
};
