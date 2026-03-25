import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

const ParticleSphere = () => {
  const ref = useRef<THREE.Points>(null);

  // Generate a sphere array using math
  const sphereCount = 3000;
  const [positions] = useState(() => {
    const coords = new Float32Array(sphereCount * 3);
    for (let i = 0; i < sphereCount; i++) {
        // Random spherical coordinates
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        
        // Radius between 2.5 and 3.5 for a thick shell effect
        const r = 2.5 + Math.random(); 
        coords[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        coords[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        coords[i * 3 + 2] = r * Math.cos(phi);
    }
    return coords;
  });

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#06b6d4" // Cyan
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

export const NetworkMatrix = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-screen overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <fog attach="fog" args={['#000', 4, 8]} />
        <ambientLight intensity={0.5} />
        <ParticleSphere />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_80%)]" />
    </div>
  );
};
