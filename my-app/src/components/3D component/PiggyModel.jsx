import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export default function PiggyModel(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/untitled.glb"); // Make sure this is in public/

  const piggyMaterial = useRef();

  useEffect(() => {
    const original = materials["Pig_White Marble Texture"];
    if (original) {
      piggyMaterial.current = original.clone();
      piggyMaterial.current.color.set("#ffd4ed"); // Light pink
      piggyMaterial.current.emissive.set("#ff82cb"); // Soft glow
      piggyMaterial.current.emissiveIntensity = 0.08;
    }
  }, [materials]);

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      scale={4}
      rotation={[0, 6, 0]} // Slightly left-facing
      position={[0.05 , -0.3 , 0]}
    >
      <mesh geometry={nodes.Cube002.geometry} material={piggyMaterial.current} />
      <mesh geometry={nodes.Cube002_1.geometry} material={piggyMaterial.current} />
      {nodes.Zylinder031 && (
        <mesh
          geometry={nodes.Zylinder031.geometry}
          material={materials["Gold_Doubloon"]}
          position={[0, 1.2, 0]}
        />
      )}
    </group>
  );
}

