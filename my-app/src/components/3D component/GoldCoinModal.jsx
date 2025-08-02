import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function GoldCoinModel(props) {
  const group = useRef();
  const { scene } = useGLTF("/gold_coin.glb");

  return (
    <primitive
      object={scene}
      ref={group}
      scale={2.3}             // adjust as needed
      position={[0, -0.1, 0]} // lower slightly
      rotation={[0,0, 2]}
      {...props}
    />
  );
}
