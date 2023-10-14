import React, { useEffect, useState } from "react";

import Layout from "@components/layout/Layout";
import { Coordinates, MapView } from "@components/map/MapView";

const MapScreen: React.FC = () => {
  return (
    <Layout showWallet="none" justifyStyling="start">
      <MapView />
    </Layout>
  );
};

export default MapScreen;
