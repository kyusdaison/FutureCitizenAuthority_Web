import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import type { GlobeMethods } from 'react-globe.gl';

export const HolographicGlobe = () => {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [arcsData] = useState<Array<{startLat: number, startLng: number, endLat: number, endLng: number, color: string}>>(() => {
    const N = 40;
    return [...Array(N).keys()].map(() => ({
      startLat: (Math.random() - 0.5) * 180,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 180,
      endLng: (Math.random() - 0.5) * 360,
      color: ['#06b6d4', '#38bdf8', '#0ea5e9'][Math.floor(Math.random() * 3)]
    }));
  });

  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom = false;
    
    // Position camera for a good hero angle
    globeRef.current.pointOfView({ altitude: 2.5 }, 0);
  }, []);

  const [pointsData] = useState<Array<{lat: number, lng: number, size: number, color: string}>>(() => {
    const N = 300;
    return [...Array(N).keys()].map(() => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      size: Math.random() / 3,
      color: '#06b6d4'
    }));
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-60 pointer-events-none mix-blend-screen scale-[1.2] md:scale-100">
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor="#06b6d4"
        atmosphereAltitude={0.15}
        pointsData={pointsData}
        pointColor="color"
        pointAltitude={0.01}
        pointRadius="size"
        pointsMerge={true}
        arcsData={arcsData}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={3000}
        width={typeof window !== 'undefined' ? window.innerWidth : 800}
        height={typeof window !== 'undefined' ? window.innerHeight : 800}
      />
    </div>
  );
};
