import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ProgrammerDesk() {
  const ref = useRef();

  // Enable soft shadows globally
  // You should call this once in your Canvas settings, not in the component
  // Example: <Canvas shadows gl={{ alpha: true }} onCreated={({ gl }) => gl.shadowMap.type = THREE.PCFSoftShadowMap}>

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.25;
  });

  return (
    <group ref={ref} position={[0, -0.5, 0]}>
      {/* Lights */}
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 5, 2]} intensity={0.8} castShadow />

      {/* Desk */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[3, 0.15, 1.5]} />
        <meshStandardMaterial color='#8B5E3C' roughness={0.6} />
      </mesh>

      {/* Table legs */}
      {[
        [-1.4, -0.5, 0.65],
        [1.4, -0.5, 0.65],
        [-1.4, -0.5, -0.65],
        [1.4, -0.5, -0.65],
      ].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
          <meshStandardMaterial color='#444' />
        </mesh>
      ))}

      {/* Laptop */}
      <group position={[0, 0.15, 0]}>
        {/* Base */}
        <mesh castShadow>
          <boxGeometry args={[0.9, 0.05, 0.6]} />
          <meshStandardMaterial color='#222' />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0.35, -0.28]} castShadow>
          <boxGeometry args={[0.9, 0.6, 0.05]} />
          <meshStandardMaterial
            color='#111'
            emissive='#00ffff'
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>

      {/* Coffee Mug */}
      <mesh position={[-1, 0.25, 0.4]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.25, 32]} />
        <meshStandardMaterial color='#ffcc66' />
      </mesh>

      {/* Desk Lamp */}
      <group position={[1, 0.15, -0.4]}>
        {/* Base */}
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.05, 16]} />
          <meshStandardMaterial color='#555' />
        </mesh>
        {/* Arm */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
          <meshStandardMaterial color='#666' />
        </mesh>
        {/* Lamp Head */}
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color='#ffaa00'
            emissive='#ffaa00'
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>
    </group>
  );
}
