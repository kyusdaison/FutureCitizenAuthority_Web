import { useState, useEffect } from 'react';

const generateHash = () => {
  return Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
};

export const LiveTelemetryFooter = () => {
  const [telemetry, setTelemetry] = useState({
    auditEvent: '00000000',
    reviewStep: 1,
    packetItems: 0,
    pilotWindow: '90d'
  });

  useEffect(() => {
    const updateTelemetry = () => {
      setTelemetry({
        auditEvent: generateHash(),
        reviewStep: Math.floor(Math.random() * 4 + 1),
        packetItems: Math.floor(Math.random() * 3 + 5),
        pilotWindow: '60-90d'
      });
    };

    updateTelemetry(); // initial update
    const interval = setInterval(updateTelemetry, 2800); // Calm live-status cadence
    
    return () => clearInterval(interval);
  }, []);

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
          <span className="hidden md:inline-block">AUDIT_EVENT: 0x{telemetry.auditEvent}...</span>
          <span className="opacity-50 hidden md:inline-block">/</span>
          <span className="hidden lg:inline-block">CONTROL_STEP: 0{telemetry.reviewStep}</span>
        </div>
        
        {/* Right Stats */}
        <div className="flex items-center gap-4 sm:gap-6">
           <span className="hidden md:inline-block">EVIDENCE_FILES: {telemetry.packetItems}</span>
           <span className="opacity-50 hidden md:inline-block">/</span>
           <span>PILOT_WINDOW: {telemetry.pilotWindow}</span>
        </div>
        
      </div>
    </div>
  );
};
