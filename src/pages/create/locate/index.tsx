import React, { useState } from "react";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { useRouter } from "next/router";
import useMetadataStore from "utils/useMetadataStore";
import PopupMessage from "@components/PopupMessage";
import ErrorMessage from "@components/ErrorMessage";

enum ModalType {
  None,
  Success,
  SkipLocation,
  Error,
}

const Locate: React.FC = () => {
  const router = useRouter();
  const {
    setLongitude,
    setLatitude,
    metadata: { latitude, longitude, theVibe, timeStamp, uploadID },
  } = useMetadataStore((state) => state);

  const [modalType, setModalType] = useState<ModalType>(ModalType.None);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const addLocation = async () => {
    setModalType(ModalType.None);

    try {
      const position = await getCurrentPosition();
      await setPosition(position);
      handleChangeRoute("/create/mint");
    } catch (error) {
      handleError(error as GeolocationPositionError);
    }
  };

  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        });
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  };

  const skipAddLocation = () => {
    setModalType(ModalType.SkipLocation);
  };

  const setPosition = (position: GeolocationPosition) => {
    const coords = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    };
    setLatitude(coords.latitude);
    setLongitude(coords.longitude);
  };

  const handleError = (error: GeolocationPositionError) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setErrorMessage(
          "Looks like the request for location was denied. Change your location permissions, browser, or continue without adding a location."
        );
        break;
      case error.POSITION_UNAVAILABLE:
        setErrorMessage(
          "The location information is unavailable. Change your location permissions or browser, or continue without adding a location."
        );
        break;
      case error.TIMEOUT:
        setErrorMessage("It took too long, so the request timed out!");
        break;
      default:
        setErrorMessage("An unknown error occurred.");
        break;
    }
    setModalType(ModalType.Error);
  };

  const handleChangeRoute = (route: string) => {
    const queryParams = {
      theVibe: theVibe,
      uploadID: uploadID,
      timeStamp: timeStamp,
      ...(longitude && latitude
        ? { longitude: longitude.toString(), latitude: latitude.toString() }
        : {}),
    };

    router.push({
      pathname: route,
      query: queryParams,
    });
  };

  return (
    <LayoutComponent
      showWallet="none"
      justifyStyling="center"
      showTitle="Locate"
    >
      <p className="text-2xl text-center">Add your location?</p>
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
          }}
        />
      )}

      {modalType === ModalType.Error && errorMessage && (
        <ErrorMessage
          showModal={true}
          handleContinue={() => setModalType(ModalType.None)}
          buttonText="Try again"
          secondaryButtonText="Back to start"
          secondaryHandleClick={() => handleChangeRoute("/create/listen")}
          description={errorMessage}
          title="Something went wrong"
          handleClose={() => setModalType(ModalType.None)}
        />
      )}
      <div className="flex flex-col text-center mt-8">
        <div className="flex justify-center gap-8 ">
          <button className="secondary-btn text-xl" onClick={skipAddLocation}>
            Skip
          </button>
          <button className="primary-btn text-xl" onClick={addLocation}>
            Add
          </button>
        </div>
      </div>
    </LayoutComponent>
  );
};

export default Locate;
