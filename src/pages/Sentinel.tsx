import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CipherHeading } from '../components/CipherHeading';
import { mockDataService, type SystemNode } from '../services/mockDataService';
import { useSecurity } from '../contexts/SecurityContext';

export default function Sentinel() {
  const [logs, setLogs] = useState<string[]>([]);
  const { threatLevel, isBreached, neutralizeThreat, triggerSimulatedBreach } = useSecurity();
  const [systems, setSystems] = useState<SystemNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Simulated Firewall Logs
  useEffect(() => {
    const logMessages = [
      "FW-AUTH: Validating sig-hash 0x8a92...",
      "THREAT: Brute-force packet dropped at Node Alpha-7.",
      "SYS: Routine memory sweep initiated.",
      "INTRUSION: Blocked unauthorized RPC call from IP 192.168.x.x.",
      "NET: Pinging FC-Relay... Latency 12ms.",
      "FW-AUTH: Key rotation completed.",
      "SYS: Consensus mechanism synchronized.",
      "THREAT: Mitigating DDoS vector on Endpoint Beta.",
      "NET: Syncing local mempool with global peers.",
      "SYS: Garbage collection complete.",
    ];

    const generateLog = () => {
      const msg = logMessages[Math.floor(Math.random() * logMessages.length)];
      const timestamp = new Date().toISOString().split('T')[1].slice(0, 11);
      const isThreat = msg.startsWith("THREAT") || msg.startsWith("INTRUSION");
      
      setLogs(prev => {
        const newLogs = [...prev, `[${timestamp}] ${msg}`];
        if (newLogs.length > 50) return newLogs.slice(-50);
        return newLogs;
      });

      if (isThreat && Math.random() > 0.8 && !isBreached) {
        // Occasionally trigger a full breach from a local threat
        triggerSimulatedBreach();
      }
    };

    // Initial sequence
    const initialLogs: string[] = [];
    for(let i=0; i<15; i++) {
        const msg = logMessages[Math.floor(Math.random() * logMessages.length)];
        const timestamp = new Date(Date.now() - Math.random() * 100000).toISOString().split('T')[1].slice(0, 11);
        initialLogs.push(`[${timestamp}] ${msg}`);
    }
    setTimeout(() => {
        setLogs(prev => [...prev, ...initialLogs]);
    }, 0);

    const interval = setInterval(generateLog, 800 + Math.random() * 1000);
    return () => clearInterval(interval);
  }, [isBreached, triggerSimulatedBreach]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    let mounted = true;
    mockDataService.getSystemNodes().then(data => {
      if (mounted) {
        setSystems(data);
        setIsLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto min-h-screen flex flex-col relative overflow-hidden pb-20">
      
      {/* Background Aesthetic */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className={`absolute top-0 right-10 w-[600px] h-[600px] rounded-full blur-[150px] transition-colors duration-1000 ${isBreached ? 'bg-red-600/30' : 'bg-cyan-600/10'}`} />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-slate-600/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full mb-12 relative z-10 flex justify-between items-end"
      >
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-12 h-1 bg-gradient-to-r from-transparent ${isBreached ? 'via-red-500' : 'via-cyan-500'} to-transparent transition-colors duration-500`} />
            <h2 className={`${isBreached ? 'text-red-500' : 'text-cyan-500'} font-mono font-bold text-sm tracking-widest uppercase transition-colors duration-500`}>Security Operations Center</h2>
          </div>
          <CipherHeading 
            text="FC SENTINEL" 
            className="text-5xl md:text-7xl font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 tracking-tight"
          />
        </div>
        
        {isBreached && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={neutralizeThreat}
            className="bg-red-500/10 hover:bg-red-500/20 border border-red-500 text-red-100 px-6 py-3 font-mono text-sm font-bold tracking-widest uppercase shadow-none transition-all"
          >
            Deploy Countermeasures
          </motion.button>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full z-10 flex-1">
        
        {/* Left Col: Terminal Log */}
        <motion.div 
          className="lg:col-span-8 flex flex-col"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className={`flex-1 min-h-[500px] bg-black/80 backdrop-blur-xl border ${isBreached ? 'border-red-500/50' : 'border-white/10'}  flex flex-col relative overflow-hidden transition-all duration-300`}>
            
            {/* Terminal Header */}
            <div className={`flex justify-between items-center p-4 border-b ${isBreached ? 'border-red-500/30 bg-red-500/10' : 'border-white/5 bg-black/50'} transition-colors duration-300`}>
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500/80 animate-[pulse_2s_infinite]" />
                    <div className="w-3 h-3 bg-yellow-500/80" />
                    <div className="w-3 h-3 bg-cyan-500/80" />
                </div>
                <div className="font-mono text-xs tracking-widest text-zinc-400">root@fc-sentinel-core:~</div>
            </div>

            {/* Warning Overlay */}
            <AnimatePresence>
              {isBreached && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center bg-red-950/20"
                >
                    <div className="border border-red-500 bg-red-500/10 backdrop-blur-sm px-8 py-4 flex flex-col items-center space-y-2 animate-pulse">
                        <svg className="w-12 h-12 text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div className="text-red-500 font-bold tracking-[0.2em] text-2xl text-center">NETWORK BREACH</div>
                        <div className="text-red-400 font-mono text-xs text-center">Unauthorized root access detected. Immediate countermeasures required.</div>
                    </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Log Output */}
            <div 
              ref={logContainerRef}
              className="flex-1 p-6 overflow-y-auto font-mono text-sm space-y-2 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_24px]"
            >
              {logs.map((log, i) => {
                const isThreat = log.includes("THREAT") || log.includes("INTRUSION");
                return (
                  <div key={i} className={isThreat ? 'text-red-400 font-bold' : 'text-cyan-400'}>
                    <span className="opacity-50 text-slate-500">{log.substring(0, 14)}</span>
                    <span className="ml-2">{log.substring(14)}</span>
                  </div>
                );
              })}
              <div className="text-cyan-400 opacity-50 font-bold animate-[pulse_1s_infinite]">▌</div>
            </div>

          </div>
        </motion.div>

        {/* Right Col: System Status */}
        <motion.div 
          className="lg:col-span-4 flex flex-col space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Global Status Overview */}
          <div className={`agency-panel p-6 border transition-colors duration-500 relative overflow-hidden group  ${isBreached ? 'border-red-500/50 bg-red-500/5' : 'border-white/10'}`}>
            <div className={`absolute inset-0 bg-gradient-to-br transition-colors ${isBreached ? 'from-red-500/0 to-red-500/10' : 'from-cyan-500/0 to-cyan-500/5 group-hover:to-cyan-500/10'}`} />
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-mono font-bold text-sm text-zinc-400 tracking-widest uppercase mb-1">Network Status</h3>
                <div className={`text-3xl font-mono font-bold tracking-tight flex items-center ${isBreached ? 'text-red-500' : 'text-cyan-500'}`}>
                    <div className={`w-3 h-3  mr-3 animate-[pulse_2s_infinite] ${isBreached ? 'bg-red-500' : 'bg-cyan-500'}`} />
                    {isBreached ? 'CRITICAL' : 'NOMINAL'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-zinc-500 font-mono font-bold uppercase tracking-widest mb-1">Threat Level</div>
                <div className={`text-2xl font-mono font-bold ${isBreached ? 'text-red-500' : 'text-cyan-500'}`}>
                  {threatLevel.toFixed(1)}%
                </div>
              </div>
            </div>
            
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500 font-bold">Uptime</span>
                <span className="text-white font-bold">99.999%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-bold">Active Validators</span>
                <span className="text-white font-bold">1,402</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-bold">Threats Stopped (24H)</span>
                <span className="text-cyan-500 font-bold">14,930</span>
              </div>
            </div>
          </div>

          {/* Subsystems Matrix */}
          <div className="agency-panel border-white/10 p-6 flex flex-col flex-1 relative min-h-[250px]">
             {isLoading && (
               <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                  <div className="w-8 h-8 border-t-2 border-cyan-500 animate-spin"></div>
               </div>
             )}
             <h3 className="font-mono font-bold text-sm text-white mb-4 border-b border-white/10 pb-2">SUBSYSTEMS</h3>
             <div className="space-y-3">
               {systems.map((sys, idx) => {
                 const isElevated = sys.status !== 'OPERATIONAL' && sys.status !== 'SECURE';
                 return (
                   <div key={idx} className="flex items-center justify-between group">
                     <span className="font-mono font-bold text-xs text-slate-400 group-hover:text-cyan-400 uppercase transition-colors">{sys.name}</span>
                     <div className="flex items-center space-x-4">
                       <span className="font-mono font-bold text-[10px] text-slate-600 w-8 text-right">{sys.ping}</span>
                       <span className={`font-mono font-bold text-[10px] px-2 py-0.5  ${isElevated ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20'}`}>
                         {sys.status}
                       </span>
                     </div>
                   </div>
                 );
               })}
             </div>
          </div>

        </motion.div>
        
      </div>
    </div>
  );
}
