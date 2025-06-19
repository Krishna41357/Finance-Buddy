import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Ribbon = () => {
  const meshRef = useRef();
  const speed = 0.01 + Math.random() * 0.02;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.1;
      meshRef.current.rotation.y += speed * 0.15;
    }
  });

  const curve = new THREE.CatmullRomCurve3(
    Array.from({ length: 10 }, (_, i) =>
      new THREE.Vector3(
        i * 0.5 - 2.5,
        Math.sin(i) * 1,
        Math.cos(i) * 1
      )
    )
  );

  const geometry = new THREE.TubeGeometry(curve, 64, 0.1, 8, false);
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(`hsl(${Math.random() * 360}, 100%, 70%)`),
    transparent: true,
    opacity: 0.6,
    wireframe: true,
  });

  return <mesh geometry={geometry} material={material} ref={meshRef} />;
};

const RibbonsBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight />
        {Array.from({ length: 5 }).map((_, i) => (
          <Ribbon key={i} />
        ))}
      </Canvas>
    </div>
  );
};

export default RibbonsBackground;
