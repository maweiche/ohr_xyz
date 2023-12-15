import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { extend, Object3DNode, useFrame } from "@react-three/fiber";
import Nabla from "../../../../assets/Nabla_Regular.json";
import { useRef } from "react";
import React from "react";

// extending Three.js with custom geometry
class CustomTextGeometry extends TextGeometry {}
extend({ CustomTextGeometry });

declare module "@react-three/fiber" {
  interface ThreeElements {
    customTextGeometry: Object3DNode<
      CustomTextGeometry,
      typeof CustomTextGeometry
    >;
  }
}

const FONT = new FontLoader().parse(Nabla);
const ORIGINAL_POSITION = 1;
const AMPLITUDE = 0.4;

const ThreeDLogo: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  // update position of logo
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x =
        ORIGINAL_POSITION + Math.cos(state.clock.elapsedTime) * AMPLITUDE;
    }
  });

  return (
    <mesh ref={meshRef} position={[1, -1, -10]}>
      <customTextGeometry args={["øhr", { font: FONT, size: 1, height: 1 }]} />
      <meshNormalMaterial />
    </mesh>
  );
};

export default ThreeDLogo;
