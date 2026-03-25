import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

interface IdentityAvatarProps {
  address: string | null;
  level: number;
}

const AvatarShape = ({ address, level }: IdentityAvatarProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Use user's address to generate deterministic traits for the avatar
  const traits = useMemo(() => {
    let seed = 0;
    if (address) {
      for (let i = 0; i < address.length; i++) {
        seed += address.charCodeAt(i);
      }
    }
    
    return {
      distort: 0.2 + (seed % 100) / 200, // 0.2 to 0.7
      speed: 1 + (seed % 50) / 25,       // 1.0 to 3.0
      colorA: new THREE.Color().setHSL((seed % 360) / 360, 0.8, 0.5),
      colorB: new THREE.Color().setHSL(((seed + 180) % 360) / 360, 0.9, 0.6),
      roughness: (seed % 10) / 10,
    };
  }, [address]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2 * (level * 0.5);
      meshRef.current.rotation.y += delta * 0.3 * (level * 0.5);
    }
  });

  // Base complexity on user's level
  const detail = Math.min(64, 16 + level * 8);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, level > 2 ? detail : 8]} />
        <MeshDistortMaterial
          color={level >= 3 ? "#c59a45" : traits.colorA} // Premium Gold for level 3+
          emissive={level >= 3 ? "#504122" : traits.colorB}
          emissiveIntensity={0.5}
          distort={traits.distort}
          speed={traits.speed}
          roughness={traits.roughness}
          metalness={0.8}
          wireframe={level === 1} // Level 1 gets wireframe, higher levels get solid geometry
        />
      </mesh>
    </Float>
  );
};

export const IdentityAvatar = ({ address, level }: IdentityAvatarProps) => {
  if (!address) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white/5 border border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 scanline-overlay opacity-30"></div>
        <div className="text-white/20 font-mono text-xs tracking-widest uppercase">Identity Undefined</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative cursor-pointer group overflow-hidden bg-black/40 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
       <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/10 to-transparent pointer-events-none"></div>
       <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
         <ambientLight intensity={0.4} />
         <directionalLight position={[10, 10, 5]} intensity={1} />
         <pointLight position={[-10, -10, -5]} intensity={0.5} color="#06b6d4" />
         <AvatarShape address={address} level={level} />
       </Canvas>
       
       <div className="absolute bottom-0 left-0 w-full p-2 bg-black/60 backdrop-blur-md border-t border-white/10 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
         <span className="text-[10px] text-white/50 font-mono">Neural Signature</span>
         <span className="text-[10px] text-cyan-400 font-mono">Verified</span>
       </div>
    </div>
  );
};
