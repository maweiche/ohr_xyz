import React from "react";
import Map, { Marker } from "react-map-gl";
import Image from "next/legacy/image";

interface MapViewProps {
  latitude?: number;
  longitude?: number;
  markers?: JSX.Element[];
}

export const MapView: React.FC<MapViewProps> = ({
  longitude,
  latitude,
  markers,
}) => {
  return (
    <div className="h-full flex justify-center items-center mx-4 mb-4 rounded-md ">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        mapStyle={`mapbox://styles/noamie22/ck2zynqqn018x1cnohcw5cnna`}
        initialViewState={{
          longitude: Number(longitude),
          latitude: Number(latitude),
          zoom: 10,
        }}
      >
        {!markers && longitude && latitude ? (
          <Marker longitude={longitude} latitude={latitude} color="red">
            <Image
              src={"/ear_small.png"}
              alt="øhr logo"
              width={40}
              height={40}
            />
          </Marker>
        ) : (
          markers
        )}
      </Map>
    </div>
  );
};
