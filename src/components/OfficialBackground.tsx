import { memo } from 'react';

export const OfficialBackground = memo(() => {
  return (
    <div className="fixed inset-0 min-h-screen bg-[#020617] pointer-events-none -z-50 overflow-hidden">
      {/* Absolute Structural Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #475569 1px, transparent 1px),
            linear-gradient(to bottom, #475569 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
        }}
      ></div>

      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #475569 1px, transparent 1px),
            linear-gradient(to bottom, #475569 1px, transparent 1px)
          `,
          backgroundSize: '1rem 1rem',
        }}
      ></div>

      {/* Extreme Vignette for Focus */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_800px_at_50%_0%,transparent_0%,#020617_100%)]"></div>

      {/* FC Lion Monolithic Watermark */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] z-[2] mix-blend-screen pointer-events-none grayscale">
        <img src="/fcc-lion-god-tier.webp" alt="FC Crest" className="w-full h-full object-contain" />
      </div>

      {/* Bottom Structural Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent z-[3]"></div>
    </div>
  );
});

OfficialBackground.displayName = 'OfficialBackground';
