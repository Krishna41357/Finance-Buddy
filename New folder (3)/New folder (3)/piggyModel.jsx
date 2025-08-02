import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { lerp } from "three/src/math/MathUtils"; // or use MathUtils.lerp if you prefer
    

export default function PiggyModel(props) {
    const group = useRef();
    const { nodes, materials } = useGLTF("/models/untitled.glb");
    const { size } = useThree();
    const mouse = useRef({ x: 0, y: 0 });
  
    // ✅ Cloned material reference
    const piggyMaterial = useRef();
  
    // ✅ Clone and lighten material (ONCE)
    useEffect(() => {
      const original = materials["Pig_White Marble Texture"];
      if (original) {
        piggyMaterial.current = original.clone();
        piggyMaterial.current.color.set("#ffd4ed"); // light pink
        piggyMaterial.current.emissive.set("#ff82cb"); // soft glow
        piggyMaterial.current.emissiveIntensity = 0.05;
      }
    }, [materials]);
  
    // ✅ Track mouse movement
    useEffect(() => {
      const handleMouseMove = (e) => {
        const x = (e.clientX / size.width) * 2 - 1;
        const y = -(e.clientY / size.height) * 2 + 1;
        mouse.current = { x, y };
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [size]);
  
    // ✅ Animate rotation with mouse + lerp
    let targetX = 0;
    let targetY = 0;
  
    useFrame(() => {
      if (group.current) {
        targetX = lerp(targetX, mouse.current.x * 0.3, 0.1);
        targetY = lerp(targetY, mouse.current.y * 0.2, 0.1);
        group.current.rotation.y = targetX;
        group.current.rotation.x = targetY;
      }
    });
  
    return (
      <group ref={group} {...props} dispose={null} scale={1.5}>
        {/* 🐷 Pig Head & Body with lightened cloned material */}
        <mesh
          geometry={nodes.Cube002.geometry}
          material={piggyMaterial.current}
        />
        <mesh
          geometry={nodes.Cube002_1.geometry}
          material={piggyMaterial.current}
        />
  
        {/* 💰 Optional Coin */}
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
  