import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import GoldCoinModel from "./GoldCoinModal";

export default function GoldCoinScene() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [3, 2, 5], fov: 10 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[8, 10, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <GoldCoinModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
