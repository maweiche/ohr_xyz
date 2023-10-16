import React, { useEffect, useState } from "react";

import Layout from "@components/layout/Layout";
import MapScreen from "@pages/map";
import { useRouter } from "next/router";
import { Coordinates, MapView } from "@components/map/MapView";

const Locate: React.FC = () => {
  const router = useRouter();
  const { timeStamp, theVibe } = router.query;

  const [coordinates, setCoordinates] = useState<Coordinates | undefined>(
    undefined
  );

  const handleClick = () => {
    const coordinatesString = JSON.stringify(coordinates);

    router.push({
      pathname: "/create/mint/",
      query: {
        timeStamp,
        theVibe,
        coordinates: coordinatesString,
      },
    });
  };

  return (
    <Layout showWallet="none" justifyStyling="end" showTitle="locate">
      <div className="h-2/3">
        <MapView setCoordinates={setCoordinates} />
      </div>
      <div className="flex">
        <button className="btn-primary self-center m-10 p-2">cancel</button>
        <button
          className="btn-primary self-center m-10 p-2"
          onClick={handleClick}
        >
          next
        </button>
      </div>
    </Layout>
  );
};

export default Locate;
