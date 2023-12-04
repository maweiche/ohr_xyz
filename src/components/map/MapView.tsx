import React, { useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import Image from "next/image";
import marker from "../../assets/ear_small.png";
import { useRouter } from "next/router";

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
            <Image src={marker} alt="øhr logo" width={40} height={40} />
          </Marker>
        ) : (
          markers
        )}
      </Map>
    </div>
  );
};
