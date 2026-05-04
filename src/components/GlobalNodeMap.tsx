import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Globe from 'react-globe.gl';
import { useSoundEffects } from '../hooks/useSoundEffects';

const HUBS = [
  { lat: 35.6895, lng: 139.6917, name: 'Liquidity Rail', route: 'swap', color: '#0ea5e9' },
  { lat: 40.7128, lng: -74.0060, name: 'Node Operators', route: 'staking', color: '#eab308' },
  { lat: 51.5074, lng: -0.1278, name: 'Cross-Chain Bridge', route: 'bridge', color: '#8b5cf6' },
  { lat: 1.3521, lng: 103.8198, name: 'Secure Messaging', route: 'whisper', color: '#ec4899' },
  { lat: 50.1109, lng: 8.6821, name: 'Security Operations', route: 'sentinel', color: '#22c55e' },
  { lat: 37.7749, lng: -122.4194, name: 'Developer Hub', route: 'developer', color: '#f97316' },
];

const INITIAL_NODES = Array.from({ length: 150 }).map(() => ({
  lat: (Math.random() - 0.5) * 160,
  lng: (Math.random() - 0.5) * 360,
  size: Math.random() / 3 + 0.1,
}));

interface ArcData { startLat: number; startLng: number; endLat: number; endLng: number; color: string }
interface RingData { lat: number; lng: number; maxR: number; propagationSpeed: number; repeatPeriod: number; color: string }
interface HexBinData { sumWeight: number }
type HubEntry = typeof HUBS[number]

export const GlobalNodeMap = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeEl = useRef<any>(null);
  const [arcsData, setArcsData] = useState<ArcData[]>([]);
  const [ringsData, setRingsData] = useState<RingData[]>([]);
  const { playSuccess } = useSoundEffects();

  // Reference stable nodes directly
  const nodes = INITIAL_NODES;

  useEffect(() => {
    // Globe configuration
    const globe = globeEl.current;
    if (globe) {
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.15; // Slow down for an institutional infrastructure view
      globe.controls().enableZoom = false;
      
      // Cinematic Entrance: Start massive (close-up) and slowly pull back
      globe.pointOfView({ altitude: 0.05 }); // Start close for a deliberate reveal
      setTimeout(() => {
        // Animate out to full altitude over 8 seconds for a majestic reveal
        globe.pointOfView({ altitude: 2.2 }, 8000); 
      }, 200);
      
      // Simulate live network transactions flashing
      const interval = setInterval(() => {
        const startNode = nodes[Math.floor(Math.random() * nodes.length)];
        const endNode = nodes[Math.floor(Math.random() * nodes.length)];
        
        const newArc = {
          startLat: startNode.lat,
          startLng: startNode.lng,
          endLat: endNode.lat,
          endLng: endNode.lng,
          color: ['#eab308', '#0ea5e9', '#38bdf8', '#ffffff'][Math.floor(Math.random() * 4)]
        };
        
        const newRing = {
          lat: endNode.lat,
          lng: endNode.lng,
          color: newArc.color,
          maxR: Math.random() * 5 + 3,
          propagationSpeed: 1.2,
          repeatPeriod: 2500
        };
        
        setArcsData(prev => [...prev.slice(-20), newArc]);
        setRingsData(prev => [...prev.slice(-8), newRing]);
      }, 3500);
      
      return () => clearInterval(interval);
    }
  }, [nodes]);

  return (
    <div className="w-full h-full flex items-center justify-center cursor-move overflow-hidden">
      <Globe
        ref={globeEl}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        arcsData={arcsData}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={4000} // Slower, elegant light paths
        arcsTransitionDuration={0}
        
        ringsData={ringsData}
        ringColor={() => (t: number) => `rgba(14,165,233,${1-t})`}
        ringMaxRadius={5}
        ringPropagationSpeed={1.2} // Slower ripples
        ringRepeatPeriod={2500}
        
        hexBinPointsData={nodes}
        hexBinPointWeight="size"
        hexAltitude={(d: HexBinData) => d.sumWeight * 0.1}
        hexBinResolution={4}
        hexMargin={0.2}
        hexTopColor={() => '#0ea5e9'}
        hexSideColor={() => '#082f49'}
        hexBinMerge={true}

        htmlElementsData={HUBS}
        htmlElement={(d: object) => {
          const typedD = d as HubEntry;
          const el = document.createElement('div');
          el.innerHTML = `
            <div class="cursor-pointer group flex flex-col items-center hover:scale-110 transition-transform duration-300" style="pointer-events: auto;">
              <div class="relative flex justify-center items-center">
                  <div class="absolute inset-0 rounded-full blur-md opacity-60 animate-pulse" style="background-color: ${typedD.color}; box-shadow: 0 0 15px ${typedD.color};"></div>
                  <div class="w-4 h-4 rounded-full border border-white/50 relative z-10 animate-ping" style="background-color: ${typedD.color}; box-shadow: inset 0 0 5px rgba(255,255,255,0.8);"></div>
                  <div class="w-2 h-2 rounded-full bg-white absolute z-20"></div>
              </div>
              <div class="mt-2 flex flex-col items-center font-display tracking-widest uppercase">
                  <div class="text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 px-3 py-1.5  border backdrop-blur-md shadow-2xl whitespace-nowrap" style="border-color: ${typedD.color}; box-shadow: 0 0 10px ${typedD.color};">
                      <span class="mr-2 opacity-50">#${typedD.route.substring(0,3)}/</span>${typedD.name}
                  </div>
              </div>
            </div>
          `;
          el.onclick = () => {
             playSuccess();
             navigate(`/${typedD.route}`);
          };
          return el;
        }}
      />
    </div>
  );
};
