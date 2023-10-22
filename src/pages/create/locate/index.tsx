import React, { useState } from "react";
import { LayoutComponent } from "@components/layout/LayoutComponent";
import { useRouter } from "next/router";
import { MapView } from "@components/map/MapView";
import useMetadataStore from "utils/useMetadataStore";

const Locate: React.FC = () => {
  const router = useRouter();
  const { setLongitude, setLatitude } = useMetadataStore();

  const [shouldAddLocation, setShouldAddLocation] = useState<
    boolean | undefined
  >(undefined);

  const addLocation = (addLocation: boolean) => {
    setShouldAddLocation(addLocation);

    router.push({
      pathname: "/create/mint/",
    });
  };

  return (
    <LayoutComponent
      showWallet="none"
      justifyStyling="center"
      showTitle="locate & mint"
    >
      <div className="h-2/3">
        <MapView
          setLong={setLongitude}
          setLat={setLatitude}
          shouldAddLocation={shouldAddLocation}
        />
      </div>
      <div className="flex flex-col text-center">
        <p className="text-xl my-2">add location?</p>

        <div className="flex justify-center gap-8 ">
          <button
            className="border-2 p-2 w-20"
            onClick={() => addLocation(false)}
          >
            NO
          </button>
          <button
            className="border-2 p-2 w-20"
            onClick={() => addLocation(true)}
          >
            YES
          </button>
        </div>
      </div>
    </LayoutComponent>
  );
};

export default Locate;
