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
      showTitle="Locate"
    >
      <div className="h-1/2">
        <MapView
          setLong={setLongitude}
          setLat={setLatitude}
          shouldAddLocation={shouldAddLocation}
        />
      </div>
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
