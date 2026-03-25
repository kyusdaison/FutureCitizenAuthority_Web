import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface HoloCoreProps {
  theme?: 'blue' | 'yellow' | 'cyan';
}

const CoreGeometry = ({ theme }: { theme: 'blue' | 'yellow' | 'cyan' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const color = theme === 'yellow' ? '#eab308' : (theme === 'cyan' ? '#06b6d4' : '#22d3ee');

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[2, 0]} />
        <meshStandardMaterial 
          color={color} 
          wireframe={true} 
          emissive={color}
          emissiveIntensity={2}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Inner Solid Core */}
      <mesh>
        <octahedronGeometry args={[1.2, 0]} />
        <MeshDistortMaterial 
          color={color} 
          distort={0.4} 
          speed={3} 
          emissive={color}
          emissiveIntensity={1}
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
};

export const HoloCore = ({ theme = 'cyan' }: HoloCoreProps) => {
  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center min-h-[300px]">
      <div className={`absolute inset-0 flex items-center justify-center opacity-30 ${theme === 'yellow' ? 'bg-gradient-to-t from-yellow-500/20' : (theme === 'cyan' ? 'bg-gradient-to-t from-cyan-500/20' : 'bg-gradient-to-t from-blue-500/20')} to-transparent pointer-events-none`}></div>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color={theme === 'yellow' ? '#eab308' : (theme === 'cyan' ? '#06b6d4' : '#22d3ee')} />
        <CoreGeometry theme={theme} />
      </Canvas>
      {/* Sci-fi Overlay Scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] mix-blend-overlay opacity-30"></div>
    </div>
  );
};
