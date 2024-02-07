import React from "react";
import Map, { Marker } from "react-map-gl";
import Image from "next/legacy/image";

interface MapViewProps {
  latitude?: number;
  longitude?: number;
  markers?: JSX.Element[];
  shouldZoom?: boolean;
}

export const MapView: React.FC<MapViewProps> = ({
  longitude,
  latitude,
  markers,
  shouldZoom,
}) => {
  console.log("Markers:", markers);
  return (
    <div
      className="flex justify-center items-center w-full rounded-md"
      style={{ height: "calc(100dvh - 8rem)" }}
    >
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        mapStyle={`mapbox://styles/noamie22/ck2zynqqn018x1cnohcw5cnna`}
        initialViewState={{
          longitude: Number(longitude),
          latitude: Number(latitude),
          zoom: shouldZoom ? 20 : 15,
        }}
      >
        {!markers && longitude && latitude ? (
          <Marker longitude={longitude} latitude={latitude}>
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
