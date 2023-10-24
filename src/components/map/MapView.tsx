import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import Image from "next/image";
import markerImg from "../../assets/marker2.png";
import { LoadingComponent } from "@components/LoadingComponent";

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
  const [currentCoordinates, setCurrentCoordinates] = useState<
    Coordinates | undefined
  >(undefined);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const centerCoordinates: [number, number] = currentCoordinates
        ? [currentCoordinates.longitude, currentCoordinates.latitude]
        : [-58.381507, -34.603344];

      mapRef.current = new maplibregl.Map({
        container: mapContainerRef.current,
        style: "https://demotiles.maplibre.org/style.json",
        center: centerCoordinates, // default to Buenos Aires
        zoom: 14,
        pitch: 45,
      });

      if (currentCoordinates) {
        new maplibregl.Marker()
          .setLngLat([
            currentCoordinates.longitude,
            currentCoordinates.latitude,
          ])
          .setOffset([-25, -25])
          .addTo(mapRef.current);
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [currentCoordinates]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        };
        setCurrentCoordinates(coords);

        if (setLat && setLong) {
          if (shouldAddLocation) {
            setLat(coords.latitude.toString());
            setLong(coords.longitude.toString());
          } else {
            setLat("");
            setLong("");
          }
        }
      });
    }
  }, [setLong, setLat, shouldAddLocation]);

  return (
    <div className="h-5/6 flex justify-center m-4 rounded-md">
      {currentCoordinates ? (
        <div className="h-full w-full" ref={mapContainerRef}></div>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <LoadingComponent />
        </div>
      )}
    </div>
  );
};

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import Map, { GeolocateControl, Marker } from "react-map-gl";
// import { LoadingComponent } from "../LoadingComponent";
// import marker from "../../assets/marker2.png";
// import Image from "next/image";
// import maplibregl from "maplibre-gl";
// export interface Coordinates {
//   longitude: number;
//   latitude: number;
// }

// interface MapViewProps {
//   markers?: JSX.Element[];
//   setLong?: (longitude: string) => void;
//   setLat?: (latitude: string) => void;
//   shouldAddLocation?: boolean;
// }

// export const MapView: React.FC<MapViewProps> = ({
//   setLong,
//   setLat,
//   markers,
//   shouldAddLocation,
// }) => {
//   const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
//   const [currentCoordinates, setCurrentCoordinates] = useState<
//     Coordinates | undefined
//   >(undefined);
//   const mapContainerRef = useRef(null);

//   // useEffect(() => {
//   //   if (mapContainerRef.current) {
//   //     map = new maplibregl.Map({
//   //       container: mapContainerRef.current,
//   //       style: "https://demotiles.maplibre.org/style.json", // stylesheet location
//   //       // center: [-87.61694, 41.86625], //Chicago
//   //       center: [-58.381507, -34.603344], // Buenos aires
//   //       // center: [-99.15747, 19.3738], // Mexico City
//   //       // center: [-74.5, 40], // Layer 1
//   //       zoom: 14, // starting zoom
//   //       pitch: 45,
//   //       hash: true,
//   //     });
//   //   }
//   //   // Clean up on unmount
//   //   return () => map.remove();
//   // }, []);

//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         setCurrentCoordinates({
//           longitude: position.coords.longitude,
//           latitude: position.coords.latitude,
//         });

//         if (setLat && setLong) {
//           if (shouldAddLocation === true) {
//             setLat(position.coords.latitude.toString());
//             setLong(position.coords.longitude.toString());
//           } else if (shouldAddLocation === false) {
//             setLat("");
//             setLong("");
//           }
//         }
//       });
//     }
//   }, [setLong, setLat, shouldAddLocation]);

//   const map = new maplibregl.Map({
//     container: mapContainerRef.current,
//     style:
//       "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
//     center: [12.550343, 55.665957],
//     zoom: 8,
//   });

//   return (
//     <div className="h-5/6 flex justify-center m-4  rounded-md">
//       {currentCoordinates ? (
//         <div className="h-full w-full" ref={mapContainerRef}>
//           {/* <Map
//             mapboxAccessToken={accessToken}
//             mapStyle={`mapbox://styles/mapbox/dark-v11`}
//             initialViewState={{
//               longitude: currentCoordinates?.longitude,
//               latitude: currentCoordinates?.latitude,
//               zoom: 10,
//             }}
//           >
//             <GeolocateControl
//               positionOptions={{ enableHighAccuracy: true }}
//               fitBoundsOptions={{ maxZoom: 12 }}
//               trackUserLocation={true}
//               showAccuracyCircle={true}
//               showUserLocation={true}
//             />
//             {!markers && currentCoordinates ? (
//               <Marker
//                 longitude={currentCoordinates.longitude}
//                 latitude={currentCoordinates.latitude}
//                 color="red"
//               >
//                 <Image src={marker} alt="øhr marker" width={50} height={50} />
//               </Marker>
//             ) : (
//               markers
//             )}
//           </Map> */}
//         </div>
//       ) : (
//         <div className="h-full w-full flex justify-center items-center">
//           <LoadingComponent />
//         </div>
//       )}
//     </div>
//   );
// };
