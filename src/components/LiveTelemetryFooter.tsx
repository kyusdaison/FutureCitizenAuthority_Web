import { useState, useEffect } from 'react';

const generateHash = () => {
  return Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
};

export const LiveTelemetryFooter = () => {
  const [telemetry, setTelemetry] = useState({
    auditEvent: '00000000',
    latency: 0,
    serviceQueue: 0,
    finalityScore: '0.00'
  });

  useEffect(() => {
    const updateTelemetry = () => {
      setTelemetry({
        auditEvent: generateHash(),
        latency: Math.floor(Math.random() * 20 + 5), // 5ms - 25ms
        serviceQueue: Math.floor(Math.random() * 50000 + 10000),
        finalityScore: (Math.random() * 0.2 + 0.3).toFixed(2)
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
            REVIEW_ONLINE
          </span>
          <span className="opacity-50 hidden md:inline-block">/</span>
          <span className="hidden md:inline-block">AUDIT_EVENT: 0x{telemetry.auditEvent}...</span>
          <span className="opacity-50 hidden md:inline-block">/</span>
          <span className="hidden lg:inline-block">LATENCY: {telemetry.latency}ms</span>
        </div>
        
        {/* Right Stats */}
        <div className="flex items-center gap-4 sm:gap-6">
           <span className="hidden md:inline-block">SERVICE_QUEUE: {telemetry.serviceQueue.toLocaleString()}</span>
           <span className="opacity-50 hidden md:inline-block">/</span>
           <span>FINALITY_TARGET: {telemetry.finalityScore}s</span>
        </div>
        
      </div>
    </div>
  );
};
