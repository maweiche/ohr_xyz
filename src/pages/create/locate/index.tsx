import React, { useState } from "react";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { useRouter } from "next/router";
import { MapView } from "@components/map/MapView";
import useMetadataStore from "utils/useMetadataStore";
import PopupMessage from "@components/PopupMessage";
import ErrorMessage from "@components/ErrorMessage";

enum ModalType {
  None,
  Success,
  SkipLocation,
  Error,
}

interface QueryParams {
  theVibe: string;
  uploadID: string;
  longitude?: string;
  latitude?: string;
  timeStamp: string;
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
          "Looks like the request for location was denied. Change your location permissions, browser or continue without adding a location."
        );
        break;
      case error.POSITION_UNAVAILABLE:
        setErrorMessage(
          "The location information is unavailable. Change your location permissions or browser, or continue without adding a location. "
        );
        break;
      case error.TIMEOUT:
        setErrorMessage("It took you too long so the request got timed out!");
        break;
      default:
        setErrorMessage("An unknown error occurred.");
        break;
    }
    setModalType(ModalType.Error);
  };

  const handleChangeRoute = (location: string) => {
    if (longitude && latitude) {
      const queryParams = {
        theVibe: theVibe,
        uploadID: uploadID,
        longitude: longitude.toString(),
        latitude: latitude.toString(),
        timeStamp: timeStamp,
      };

      router.push({
        pathname: location,
        query: queryParams,
      });
    } else {
      const queryParams = {
        theVibe: theVibe,
        uploadID: uploadID,
        timeStamp: timeStamp,
      };

      router.push({
        pathname: location,
        query: queryParams,
      });
    }
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
          handleContinue={() => handleChangeRoute("/create/mint")}
          buttonText="Continue"
          description="Your location was successfully added"
          title="Success"
          handleClose={() => {
            setModalType(ModalType.None);
            handleChangeRoute("/create/mint");
          }}
        />
      )}

      {modalType === ModalType.SkipLocation && (
        <PopupMessage
          showModal={true}
          handleContinue={() => handleChangeRoute("/create/mint")}
          buttonText="Don't add"
          secondaryButtonText="Cancel"
          secondaryHandleClick={() => setModalType(ModalType.None)}
          description="Your øhr will only be available in your wallet. No one will see it on the map."
          title="Are you sure?"
          handleClose={() => {
            setModalType(ModalType.None);
            handleChangeRoute("/create/mint");
          }}
        />
      )}

      {modalType === ModalType.Error && errorMessage && (
        <ErrorMessage
          showModal={true}
          handleContinue={() => setModalType(ModalType.None)}
          buttonText="Try again"
          secondaryButtonText="Back 2 start"
          secondaryHandleClick={() => handleChangeRoute("/create/listen")}
          description={errorMessage}
          title="Something went wrong"
          handleClose={() => setModalType(ModalType.None)}
        />
      )}
      <div className="flex flex-col text-center mt-8">
        <div className="flex justify-center gap-8 ">
          <button className="secondary-btn" onClick={skipAddLocation}>
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
