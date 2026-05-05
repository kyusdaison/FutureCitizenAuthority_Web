export const LiveTelemetryFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-8 bg-[#020306]/90 backdrop-blur-md border-t border-white/5 z-[990] flex items-center px-4 md:px-8 overflow-hidden pointer-events-none">
      <div className="flex w-full items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-widest text-cyan-500/70">
        
        {/* Left Status */}
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-cyan-500 animate-[pulse_2s_infinite]"></span>
            REVIEW_PACKET
          </span>
          <span className="opacity-50 hidden md:inline-block">/</span>
          <span className="hidden md:inline-block">EVIDENCE_STATUS: READY</span>
          <span className="opacity-50 hidden md:inline-block">/</span>
          <span className="hidden lg:inline-block">CONTROL_LAYER: ACTIVE</span>
        </div>
        
        {/* Right Stats */}
        <div className="flex items-center gap-4 sm:gap-6">
           <span className="hidden md:inline-block">EVIDENCE_FILES: 6</span>
           <span className="opacity-50 hidden md:inline-block">/</span>
           <span>PILOT_WINDOW: 60-90D</span>
        </div>
        
      </div>
    </div>
  );
};
