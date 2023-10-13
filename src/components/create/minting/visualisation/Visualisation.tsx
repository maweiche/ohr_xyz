import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "./Scene";

export const Visualisation = () => {
  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true }}
      camera={{ position: [-1.5, 0.5, 3] }}
    >
      <OrbitControls />
      <Scene />
    </Canvas>
  );
};
