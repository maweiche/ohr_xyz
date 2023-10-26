import React, { useEffect, useState } from "react";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { useRouter } from "next/router";
import { Coordinates, MapView } from "@components/map/MapView";
import useMetadataStore from "utils/useMetadataStore";
import SuccessMessage from "@components/SuccessMessage";

const Locate: React.FC = () => {
  const router = useRouter();

  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const [passError, setPassError] = useState<string | undefined>(undefined);
  const {
    setLongitude,
    setLatitude,
    metadata: { latitude, longitude, theVibe, timeStamp, uploadID },
  } = useMetadataStore((state) => state);

  const addLocation = (addLocation: boolean) => {
    if (addLocation) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          handleCurrentPosition,
          showError,
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        setPassError("Geolocation is not supported by this browser.");
      }
    }
  };

  const showPosition = (position: GeolocationPosition) => {
    const coords = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    };
    setLatitude(coords.latitude);
    setLongitude(coords.longitude);
  };

  const handleCurrentPosition = (position: GeolocationPosition) => {
    showPosition(position);
    setShowSuccessModal(true);
  };

  const showError = (error: GeolocationPositionError) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setPassError("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setPassError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setPassError("The request to get user location timed out.");
        break;
      default:
        setPassError("An unknown error occurred.");
        break;
    }
  };

  const handleContinue = () => {
    if (longitude && latitude) {
      const queryParams = {
        theVibe: theVibe,
        uploadID: uploadID,
        longitude: longitude.toString(),
        latitude: latitude.toString(),
        timeStamp: timeStamp,
      };

      console.log("queryParams", queryParams);

      router.push({
        pathname: `/create/mint`,
        query: queryParams,
      });
    } else {
      console.error("Location not set yet");
    }
  };

  return (
    <LayoutComponent
      showWallet="none"
      justifyStyling="center"
      showTitle="Locate"
    >
      <div className="h-1/2">
        <MapView
          setShowSuccessModal={setShowSuccessModal}
          longitude={longitude ?? 4.9041}
          latitude={latitude ?? 52.3676}
        />
      </div>

      <SuccessMessage
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
        onClick={handleContinue}
      />
      <div className="flex flex-col text-center mt-8">
        <p className="text-xl my-2">add location?</p>

        <div className="flex justify-center gap-8 ">
          <button className="primary-btn" onClick={() => addLocation(false)}>
            no
          </button>
          <button className="primary-btn" onClick={() => addLocation(true)}>
            yes
          </button>
        </div>
      </div>
      <p>{passError} </p>
    </LayoutComponent>
  );
};

export default Locate;
