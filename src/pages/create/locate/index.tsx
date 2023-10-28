import React, { useState } from "react";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { useRouter } from "next/router";
import { MapView } from "@components/map/MapView";
import useMetadataStore from "utils/useMetadataStore";
import SuccessMessage from "@components/PopupMessage";
import PopupMessage from "@components/PopupMessage";

const Locate: React.FC = () => {
  const router = useRouter();

  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  // const [showErrorModal, setShowErrorModal] = useState<boolean>("Location information is unavailable.");

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
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
        setErrorMessage("Geolocation is not supported by this browser.");
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
        setErrorMessage(
          "User denied the request for Geolocation. Try to change the location permissions or change your browser."
        );
        break;
      case error.POSITION_UNAVAILABLE:
        setErrorMessage("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setErrorMessage("The request to get user location timed out.");
        break;
      default:
        setErrorMessage("An unknown error occurred.");
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

      router.push({
        pathname: `/create/mint`,
        query: queryParams,
      });
    } else {
      console.error("Location not set yet");
    }
  };

  const handleBack = () => {
    router.push({
      pathname: `/`,
    });
  };

  return (
    <LayoutComponent
      showWallet="none"
      justifyStyling="center"
      showTitle="Locate"
    >
      <div className="h-1/2">
        <MapView
          longitude={longitude ?? 4.9041}
          latitude={latitude ?? 52.3676}
        />
      </div>

      {showSuccessModal && (
        <PopupMessage
          showModal={showSuccessModal}
          handleContinue={handleContinue}
          buttonText="Continue"
          description="Your location was successfully added"
          title="Success"
        />
      )}

      {errorMessage && (
        <PopupMessage
          showModal={Boolean(errorMessage) ?? false}
          handleContinue={handleBack}
          buttonText="Go back"
          description={errorMessage}
          title="Error"
        />
      )}

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
    </LayoutComponent>
  );
};

export default Locate;
