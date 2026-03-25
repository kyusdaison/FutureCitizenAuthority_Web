import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../contexts/ToastContext';
import { useWallet } from '../contexts/WalletContext';

const CHAINS = [
  { id: 'eth', name: 'Ethereum', icon: 'Ξ', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { id: 'sol', name: 'Solana', icon: '◎', color: 'text-purple-400', bg: 'bg-purple-500/20' },
  { id: 'matic', name: 'Polygon', icon: '∞', color: 'text-purple-500', bg: 'bg-purple-500/20' },
  { id: 'bsc', name: 'Binance', icon: 'B', color: 'text-yellow-600', bg: 'bg-yellow-600/20' },
];

const DESTINATION = { id: 'fcc', name: 'FC Chain', icon: 'FC', color: 'text-cyan-500', bg: 'bg-cyan-500/10' };

export default function Bridge() {
  const { toast } = useToast();
  const { balances, updateBalances, gainXP } = useWallet();
  const [originChain, setOriginChain] = useState(CHAINS[0]);
  const [amount, setAmount] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferPhase, setTransferPhase] = useState<'idle' | 'init' | 'lock' | 'validate' | 'warp' | 'mint' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isDarkForestEvent, setIsDarkForestEvent] = useState(false);

  useEffect(() => {
    if (!isTransferring) return;

    const sequence = [
      { phase: 'init', delay: 0, log: 'INITIALIZING WARP TUNNEL PROTOCOL...' },
      { phase: 'lock', delay: 1500, log: `LOCKING ASSETS ON ${originChain.name.toUpperCase()} SMART CONTRACT...` },
      { phase: 'validate', delay: 3500, log: 'VALIDATING CRYPTOGRAPHIC PROOFS VIA ORACLE NETWORK...' },
      { phase: 'warp', delay: 6000, log: isDarkForestEvent ? '[!] VANGUARD CORTEX: DARK FOREST SYBIL ATTACK DETECTED. DEPLOYING CARGO SHIELDS...' : 'INITIATING CROSS-CHAIN PARTICLE STREAM...' },
      { phase: 'mint', delay: 9000, log: isDarkForestEvent ? 'THREAT NEUTRALIZED. MINTING WRAPPED ASSETS ON FC CHAIN VANGUARD L1...' : 'MINTING WRAPPED ASSETS ON FC CHAIN VANGUARD L1...' },
      { phase: 'complete', delay: 11000, log: 'WARP TRANSFER COMPLETE. FINALITY ACHIEVED in 11.2s.' }
    ];

    type TransferPhaseType = 'idle' | 'init' | 'lock' | 'validate' | 'warp' | 'mint' | 'complete';
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    sequence.forEach(({ phase, delay, log }) => {
      timeouts.push(setTimeout(() => {
        setTransferPhase(phase as TransferPhaseType);
        setLogs(prev => [...prev, `[${new Date().toISOString().split('T')[1].slice(0,-1)}] ${log}`]);
      }, delay));
    });

    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 0.5; // Roughly 100% over 10 seconds (50ms * 200)
      });
    }, 50);

    timeouts.push(setTimeout(() => {
      setIsTransferring(false);
      clearInterval(progressInterval);
      
      const parsedAmount = parseFloat(amount);
      // Mock Oracle Rate: 1 USDC = 1.05 FCC
      const fccReceived = parsedAmount * 1.05;
      
      updateBalances({
        usdc: balances.usdc - parsedAmount,
        fcc: balances.fcc + fccReceived
      });

      if (isDarkForestEvent) {
        toast({ message: `Cargo Secured from Dark Forest. +300 XP. Bridged ${fccReceived.toFixed(2)} FCC.`, type: 'success', duration: 7000 });
        gainXP(300);
      } else {
        toast({ message: `Transfer complete. Received ${fccReceived.toFixed(2)} FCC on ${DESTINATION.name}.`, type: 'success', duration: 5000 });
        gainXP(50);
      }
    }, 12000));

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(progressInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTransferring, originChain, toast]);

  const handleWarp = () => {
    const parsedAmount = parseFloat(amount);
    if (!amount || parsedAmount <= 0) return;
    if (parsedAmount > balances.usdc) {
      toast({ message: `Insufficient USDC balance on ${originChain.name}.`, type: 'error' });
      return;
    }

    const triggerEvent = Math.random() < 0.10; // 10% chance
    setIsDarkForestEvent(triggerEvent);

    setIsTransferring(true);
    setTransferPhase('init');
    setProgress(0);
    setLogs([]);
    toast({ message: `Initiating quantum wrap to ${DESTINATION.name}`, type: 'process' });
  };

  const [particles] = useState(() => 
    [...Array(5)].map(() => ({
      r: Math.random() * 2 + 1,
      startX: 50 + Math.random() * 20,
      startY: 300 + Math.random() * 20,
      animX: 50 + (Math.random() * 100 - 50),
      animY: 300 + (Math.random() * 100 - 50),
      duration: 2 + Math.random()
    }))
  );

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-1 bg-cyan-500" />
          <h2 className="text-cyan-500 font-mono text-sm font-bold tracking-widest uppercase">L0 Interoperability Protocol</h2>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
          CROSS-CHAIN <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-slate-500">
            WARP BRIDGE
          </span>
        </h1>
        <p className="text-zinc-400 font-mono max-w-2xl leading-relaxed">
          Instantly teleport liquidity across the cryptoverse. Utilizing zero-knowledge proofs and atomic swaps for sub-12 second finality onto FC Chain.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        {/* Bridge Interface Card */}
        <motion.div 
          className="agency-panel p-8 relative overflow-hidden flex flex-col justify-between min-h-[600px]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Subtle BG grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />

          <AnimatePresence mode="wait">
            {!isTransferring && transferPhase === 'idle' ? (
              <motion.div 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative z-10 space-y-8 flex flex-col h-full"
              >
                {/* Network Selection */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Origin Chain */}
                  <div className="w-full md:w-[45%]">
                    <label className="block text-xs font-mono text-zinc-500 mb-2 uppercase">From Network</label>
                    <div className="agency-panel p-2 flex gap-2 overflow-x-auto no-scrollbar">
                      {CHAINS.map(chain => (
                        <button
                          key={chain.id}
                          onClick={() => setOriginChain(chain)}
                          className={`px-4 py-3  flex items-center gap-2 transition-all flex-shrink-0 ${
                            originChain.id === chain.id 
                              ? `bg-black/80 border border-slate-600 shadow-none` 
                              : 'border border-transparent hover:bg-white/5 opacity-50 hover:opacity-100'
                          }`}
                        >
                          <span className={`${chain.color} font-bold`}>{chain.icon}</span>
                          <span className="font-mono text-sm text-white">{chain.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Directional Arrow */}
                  <div className="flex-shrink-0 flex items-center justify-center p-4">
                    <div className="w-12 h-12 border border-white/10 flex items-center justify-center bg-black/50 relative group">
                      <div className="absolute inset-0 border border-cyan-500/30 group-hover:block hidden animate-pulse" />
                      <svg className="w-6 h-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Destination Chain */}
                  <div className="w-full md:w-[45%]">
                    <label className="block text-xs font-mono text-zinc-500 mb-2 font-bold uppercase">To Network</label>
                    <div className="agency-panel p-3 border border-cyan-500/30 bg-black/80 flex items-center gap-3">
                      <div className={`w-10 h-10  ${DESTINATION.bg} flex items-center justify-center border border-cyan-500/50`}>
                        <span className="text-xl font-bold font-mono text-cyan-500">{DESTINATION.icon}</span>
                      </div>
                      <div>
                        <div className="text-white font-mono font-bold">{DESTINATION.name}</div>
                        <div className="text-[10px] text-cyan-500 font-mono tracking-widest font-bold">VANGUARD L1</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amount Input */}
                <div className="flex-1">
                  <label className="block text-xs font-mono text-zinc-500 mb-2 font-bold uppercase">Asset Amount to Warp</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-black/80 border border-white/10 text-4xl font-mono font-bold text-white px-4 py-8 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-mono text-zinc-600">
                      USDC
                    </div>
                  </div>
                  <div className="flex justify-between mt-4 text-xs font-mono font-bold text-zinc-500">
                    <span>Balance: {balances.usdc.toLocaleString(undefined, {minimumFractionDigits: 2})} USDC</span>
                    <button className="text-cyan-500 hover:text-cyan-400" onClick={() => setAmount(balances.usdc.toString())}>MAX</button>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={handleWarp}
                  disabled={!amount || parseFloat(amount) <= 0}
                  className="w-full py-5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold tracking-widest text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative z-10">INITIATE WARP SEQUENCE</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="scanning"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10 h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-cyan-500 font-mono font-bold tracking-widest text-lg">WARP IN PROGRESS</h3>
                  <div className="font-mono font-bold text-white text-2xl">{Math.floor(progress)}%</div>
                </div>

                {/* Cyberpunk Loading Bar */}
                <div className="h-1 bg-black/80 border border-white/10 overflow-hidden mb-12 relative">
                  <style>{`.warp-progress { width: ${progress}%; }`}</style>
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-cyan-500 shadow-none warp-progress transition-all duration-75"
                  />
                </div>

                {/* Terminal Telemetry Logs */}
                <div className="flex-1 bg-black/60 border border-white/5 p-4 font-mono text-xs md:text-sm overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />
                  <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
                  
                  <div className="h-full overflow-y-auto space-y-2 flex flex-col justify-end no-scrollbar pb-2">
                    {logs.map((log, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`font-mono font-bold ${
                          log.includes('COMPLETE') ? 'text-cyan-400' :
                          log.includes('VALIDATING') ? 'text-slate-400' :
                          log.includes('MINTING') ? 'text-cyan-400' :
                          'text-zinc-500'
                        }`}
                      >
                        {log}
                      </motion.div>
                    ))}
                    {transferPhase !== 'complete' && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="text-cyan-500 font-bold"
                      >
                        ▌
                      </motion.div>
                    )}
                  </div>
                </div>

                {transferPhase === 'complete' && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => {
                      setTransferPhase('idle');
                      setAmount('');
                    }}
                    className="mt-6 w-full py-4 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-mono font-bold tracking-widest transition-colors"
                  >
                    EXECUTE NEW TRANSFER
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bridge Visualization Side */}
        <motion.div
          className="agency-panel border-white/5 relative overflow-hidden hidden lg:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Animated SVG Bridge Representation */}
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <svg className="w-full h-[80%] overflow-visible text-white/20" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="bridge-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" /> {/* Top/Origin */}
                  <stop offset="50%" stopColor="rgba(148, 163, 184, 0.4)" /> {/* Middle/Validate */}
                  <stop offset="100%" stopColor="rgba(6, 182, 212, 0.8)" /> {/* Bottom/Dest */}
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* The Path */}
              <motion.path 
                d="M 200,50 C 200,150 50,250 50,300 C 50,350 350,400 350,450 C 350,550 200,550 200,550"
                fill="none"
                stroke="url(#bridge-gradient)"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="opacity-50"
              />

              {/* Waypoints */}
              {/* Origin */}
              <rect x="180" y="30" width="40" height="40" fill="#000" stroke="#3b82f6" strokeWidth="2" />
              <text x="200" y="55" fill="#3b82f6" textAnchor="middle" fontSize="20" className="opacity-80 font-mono font-bold">{originChain.icon}</text>
              <text x="240" y="55" fill="#94a3b8" fontSize="10" className="font-mono font-bold uppercase tracking-widest">{originChain.name}</text>

              {/* Oracle Layer */}
              <rect x="35" y="285" width="30" height="30" fill="#000" stroke="#94a3b8" strokeWidth="2" className={`transition-all duration-1000 ${['validate', 'warp', 'mint', 'complete'].includes(transferPhase) ? 'opacity-100' : 'opacity-30'}`} />
              <text x="50" y="305" fill="#94a3b8" textAnchor="middle" fontSize="14" className="font-mono opacity-80">∅</text>
              <text x="80" y="305" fill="#94a3b8" fontSize="10" className="font-mono uppercase font-bold tracking-widest">Oracle Relayers</text>

              {/* Destination */}
              <rect x="325" y="425" width="50" height="50" fill="#000" stroke="#06b6d4" strokeWidth="2" className={`transition-all duration-1000 ${['mint', 'complete'].includes(transferPhase) ? 'opacity-100' : 'opacity-30'}`} />
              <text x="350" y="458" fill="#06b6d4" textAnchor="middle" fontSize="20" className="opacity-80 font-bold font-mono">FC</text>
              <text x="260" y="455" fill="#94a3b8" fontSize="10" className="font-mono font-bold uppercase tracking-widest">FC Chain L1</text>

              {/* Traveling Particle */}
              <AnimatePresence>
                {isTransferring && transferPhase !== 'init' && transferPhase !== 'complete' && (
                  <motion.circle
                    r="6"
                    fill="#fff"
                    filter="url(#glow)"
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{ duration: 7, ease: "linear" }}
                    className="[offset-path:path('M_200,50_C_200,150_50,250_50,300_C_50,350_350,400_350,450_C_350,550_200,550_200,550')]"
                  />
                )}
              </AnimatePresence>
              
              {/* Secondary decorative particles floating around */}
              {['validate', 'warp', 'mint'].includes(transferPhase) && (
                <>
                  {particles.map((p, i) => (
                    <motion.rect
                      key={`decor-${i}`}
                      width={p.r * 2}
                      height={p.r * 2}
                      fill={i % 2 === 0 ? "#06b6d4" : "#94a3b8"}
                      filter="url(#glow)"
                      initial={{ opacity: 0, x: p.startX, y: p.startY }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        x: p.animX,
                        y: p.animY 
                      }}
                      transition={{ duration: p.duration, repeat: Infinity }}
                    />
                  ))}
                </>
              )}
            </svg>
          </div>

          {/* Holographic interference overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50 pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20 MixBlendMode-overlay" />
        </motion.div>
      </div>
    </div>
  );
}
