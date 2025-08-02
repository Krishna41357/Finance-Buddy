import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PiggyModel from "./piggyModel";

export default function PiggyScene() {
  return (
    <div className="canvas-container" style={{ width: '100vw', height: '100vh'}}>
      <Canvas camera={{ position: [3, 2, 5], fov: 6 }}>
        <ambientLight intensity={.7}/>
        <directionalLight position={[8, 10, 5]} intensity={1.2} />
        
        {/* ✅ Hook-safe zone: inside Canvas */}
        <Suspense fallback={null}>
          <PiggyModel />
        </Suspense>

        <OrbitControls
    enableZoom={false}
    autoRotate={false}
    maxPolarAngle={Math.PI / 2.5}
    minPolarAngle={Math.PI / 3}
  />
      </Canvas>
    </div>
  );
}
