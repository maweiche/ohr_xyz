import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { AudioNFT } from "./NFTModal";

interface MapViewProps {
  audioNFTs?: AudioNFT[];
  latitude: number;
  longitude: number;
  onLoad?: (mapInstance: maplibregl.Map) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  audioNFTs,
  longitude,
  latitude,
  onLoad,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  console.log(audioNFTs);

  useEffect(() => {
    if (mapContainerRef.current) {
      mapRef.current = new maplibregl.Map({
        container: mapContainerRef.current,
        style: "https://demotiles.maplibre.org/style.json",
        center: [longitude, latitude], // default to Amsterdam
        zoom: 6,
        pitch: 45,
      });

      // only add the marker for the locate screen
      if (onLoad) {
        onLoad(mapRef.current);
      } else {
        new maplibregl.Marker()
          .setLngLat([longitude, latitude])
          // .setOffset([-5, -2])
          .addTo(mapRef.current);
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [audioNFTs, longitude, latitude, onLoad]);

  return (
    <div className="h-full flex justify-center items-center m-4 rounded-md">
      <div className="h-full w-full" ref={mapContainerRef}></div>
    </div>
  );
};
