import { Stars, Center } from "@react-three/drei";
import ThreeDLogo from "./ThreeDLogo";
import React from "react";

const Scene = () => {
  return (
    <>
      {/* <Stars /> */}
      <ambientLight intensity={0.5} color="red" />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <Center>
        <ThreeDLogo />
      </Center>
    </>
  );
};

export default Scene;
