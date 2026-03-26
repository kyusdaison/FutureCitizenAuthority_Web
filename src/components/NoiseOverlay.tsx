import React from 'react';

export const NoiseOverlay: React.FC = () => {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-50 mix-blend-soft-light opacity-[0.25]">
        <svg className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.75" 
              numOctaves="4" 
              stitchTiles="stitch" 
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
      {/* Cinematic CRT Scanline */}
      <div className="fixed inset-0 pointer-events-none z-[45] overflow-hidden">
        <div className="w-full h-screen scanline mix-blend-screen"></div>
      </div>
    </>
  );
};
