import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function MoneyBagModel(props) {
  const group = useRef();
  const { scene } = useGLTF("/money_bag_-__anil.glb");

  return (
    <primitive
      object={scene}
      ref={group}
      scale={0.004}             // adjust as needed
      position={[0, -0.3, 0]} // lower slightly
      rotation={[0.2, 10, 0]}
      {...props}
    />
  );
}
