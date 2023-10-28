import React, { useState } from "react";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { useRouter } from "next/router";
import { MapView } from "@components/map/MapView";
import useMetadataStore from "utils/useMetadataStore";
import SuccessMessage from "@components/PopupMessage";
import PopupMessage from "@components/PopupMessage";

enum ModalType {
  None,
  Success,
  SkipLocation,
  Error,
}

const Locate: React.FC = () => {
  const router = useRouter();

  const [modalType, setModalType] = useState<ModalType>(ModalType.None);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const {
    setLongitude,
    setLatitude,
    metadata: { latitude, longitude, theVibe, timeStamp, uploadID },
  } = useMetadataStore((state) => state);

  const addLocation = () => {
    setModalType(ModalType.None);
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
      setModalType(ModalType.Error);
    }
  };

  const handleCurrentPosition = (position: GeolocationPosition) => {
    showPosition(position);
    setModalType(ModalType.Success);
    setErrorMessage(undefined); // Reset error message
  };

  const skipAddLocation = () => {
    setModalType(ModalType.SkipLocation);
  };

  const showPosition = (position: GeolocationPosition) => {
    const coords = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    };
    setLatitude(coords.latitude);
    setLongitude(coords.longitude);
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
    setModalType(ModalType.Error);
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
      const queryParams = {
        theVibe: theVibe,
        uploadID: uploadID,
        timeStamp: timeStamp,
      };

      router.push({
        pathname: `/create/mint`,
        query: queryParams,
      });
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
      <p className="text-2xl text-center">Add your location</p>
      <div className="h-1/2">
        <MapView longitude={longitude} latitude={latitude} />
      </div>

      {modalType === ModalType.Success && (
        <PopupMessage
          showModal={true}
          handleContinue={handleContinue}
          buttonText="Continue"
          description="Your location was successfully added"
          title="Success"
          handleClose={() => setModalType(ModalType.None)}
        />
      )}

      {modalType === ModalType.SkipLocation && (
        <PopupMessage
          showModal={true}
          handleContinue={handleContinue}
          buttonText="Don't add location"
          secondaryButtonText="Cancel"
          secondaryHandleClick={() => setModalType(ModalType.None)}
          description="It would mean your øhr will only be available in your wallet and no one will see it on the map."
          title="Sure you don't want to add your location?"
          handleClose={() => setModalType(ModalType.None)}
        />
      )}

      {modalType === ModalType.Error && errorMessage && (
        <PopupMessage
          showModal={true}
          handleContinue={handleBack}
          buttonText="Go back"
          description={errorMessage}
          title="Error"
          handleClose={() => setModalType(ModalType.None)}
        />
      )}

      <div className="flex flex-col text-center mt-8">
        <div className="flex justify-center gap-8 ">
          <button className="primary-btn" onClick={skipAddLocation}>
            skip
          </button>
          <button className="primary-btn" onClick={addLocation}>
            add
          </button>
        </div>
      </div>
    </LayoutComponent>
  );
};

export default Locate;
