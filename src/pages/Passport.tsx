import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CipherHeading } from '../components/CipherHeading';
import { useWallet } from '../contexts/WalletContext';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { mockDataService, type PassportStat, type ActivityLog } from '../services/mockDataService';
import { lazy, Suspense } from 'react';
const IdentityAvatar = lazy(() => import('../components/IdentityAvatar').then(module => ({ default: module.IdentityAvatar })));

const generateHash = (length = 16) => {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < length; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
};

export default function Passport() {
  const { connectedIdentity, level } = useWallet();
  const [isMinted, setIsMinted] = useState(false);
  const [mintPhase, setMintPhase] = useState(0); // 0=idle, 1=uplink, 2=biometrics, 3=hash, 4=minting, 5=done
  const [isScanning, setIsScanning] = useState(true);
  const [authHash, setAuthHash] = useState('');
  const [, setPassportStats] = useState<PassportStat[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const { playSuccess } = useSoundEffects();
  
  // 使用 ref 存储所有 timeout ID
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  const startMintingFlow = useCallback(() => {
    // 清理之前的 timeouts
    clearAllTimeouts();
    
    setMintPhase(1); // Establishing Secure Uplink
    
    const t1 = setTimeout(() => setMintPhase(2), 2000); // Scanning Biometrics
    timeoutsRef.current.push(t1);
    
    const t2 = setTimeout(() => {
      setMintPhase(3); // Generating Quantum Hash
      let hash = '';
      for(let i=0; i<32; i++) {
          hash += Math.floor(Math.random()*16).toString(16).toUpperCase();
      }
      setAuthHash(hash);
    }, 5000);
    timeoutsRef.current.push(t2);
    
    const t3 = setTimeout(() => setMintPhase(4), 7000); // Minting NFT
    timeoutsRef.current.push(t3);
    
    const t4 = setTimeout(() => {
      setMintPhase(5); // Done
      playSuccess();
      const t5 = setTimeout(() => setIsMinted(true), 1500); // Reveal Passport
      timeoutsRef.current.push(t5);
    }, 9000);
    timeoutsRef.current.push(t4);
  }, [playSuccess, clearAllTimeouts]);

  // 组件卸载时清理所有 timeouts
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);


  // 16-segment radar stats (mock)
  const stats = [85, 92, 78, 65, 88, 95];
  const maxStat = 100;
  const labels = ['TRUST', 'YIELD', 'VOLUME', 'GOVERNANCE', 'ARTIFACTS', 'NODE OPS'];

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    if (isMinted) {
      const timer = setTimeout(() => setIsScanning(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isMinted, connectedIdentity]);

  useEffect(() => {
    let mounted = true;
    
    Promise.all([
      mockDataService.getPassportStats(),
      mockDataService.getActivityLogs()
    ]).then(([statsData, logsData]) => {
      if (mounted) {
        setPassportStats(statsData);
        setActivityLogs(logsData);
        setIsDataLoading(false);
      }
    });

    return () => { mounted = false; };
  }, [connectedIdentity]);

  // SVG Radar generator logic
  const radarRadius = 100;
  const centerX = 150;
  const centerY = 150;
  
  const getPointCoordinates = (value: number, index: number, total: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const distance = (value / maxStat) * radarRadius;
    const x = centerX + distance * Math.cos(angle);
    const y = centerY + distance * Math.sin(angle);
    return { x, y };
  };

  const radarPoints = stats.map((s, i) => getPointCoordinates(s, i, stats.length));
  const radarPath = radarPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-serif font-light text-white mb-2">
            <CipherHeading text="Citizen Passport" />
          </h1>
          <p className="text-slate-400 font-mono text-xs tracking-widest">SECURE IDENTITY VERIFICATION</p>
        </div>
        {level >= 2 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-xs font-bold text-yellow-500 tracking-widest uppercase">Premium</span>
          </div>
        )}
      </div>

      {!isMinted ? (
        <div className="flex flex-col items-center justify-center py-20">
          {/* Minting Flow Visualization */}
          <motion.div 
            className="relative w-full max-w-2xl vercel-glass-card p-12 flex flex-col items-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            {/* Animated Connection Lines */}
            <div className="absolute inset-0 overflow-hidden">
              <svg className="w-full h-full opacity-20">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {mintPhase === 0 ? (
              <>
                <Suspense fallback={<div className="w-full h-full animate-pulse bg-cyan-500/10 rounded-full" />}>
                  <IdentityAvatar address={connectedIdentity || '0x0000000000000000000000000000000000000000'} level={level} />
                </Suspense>
                <h2 className="text-2xl font-display text-white mb-2 mt-8">Mint Your Identity</h2>
                <p className="text-slate-400 text-sm text-center max-w-md mb-8">
                  Establish a cryptographic link between your physical identity and the FC blockchain.
                  This process is secure, private, and irreversible.
                </p>
                <button 
                  onClick={startMintingFlow}
                  className="btn-vercel-primary px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase"
                >
                  Initialize Mint
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center py-8">
                <div className="w-24 h-24 relative mb-6">
                  {/* Orbiting particles animation */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
                    >
                      <div 
                        className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] absolute"
                        style={{ top: 0, left: '50%', transform: 'translateX(-50%)' }}
                      />
                    </motion.div>
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-cyan-400">{Math.floor((mintPhase / 5) * 100)}%</span>
                  </div>
                </div>

                <div className="space-y-2 text-center">
                  <div className={`text-sm font-mono transition-colors ${mintPhase >= 1 ? 'text-cyan-400' : 'text-slate-600'}`}>
                    {mintPhase > 1 ? '✓' : mintPhase === 1 ? '⟳' : '○'} Establishing Secure Uplink...
                  </div>
                  <div className={`text-sm font-mono transition-colors ${mintPhase >= 2 ? 'text-cyan-400' : 'text-slate-600'}`}>
                    {mintPhase > 2 ? '✓' : mintPhase === 2 ? '⟳' : '○'} Scanning Biometrics...
                  </div>
                  <div className={`text-sm font-mono transition-colors ${mintPhase >= 3 ? 'text-cyan-400' : 'text-slate-600'}`}>
                    {mintPhase > 3 ? '✓' : mintPhase === 3 ? '⟳' : '○'} Generating Quantum Hash...
                  </div>
                  <div className={`text-sm font-mono transition-colors ${mintPhase >= 4 ? 'text-cyan-400' : 'text-slate-600'}`}>
                    {mintPhase > 4 ? '✓' : mintPhase === 4 ? '⟳' : '○'} Minting NFT...
                  </div>
                  
                  {mintPhase === 3 && authHash && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 p-3 bg-black/50 font-mono text-xs text-yellow-400 break-all max-w-sm"
                    >
                      HASH: 0x{authHash}
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Passport Card */}
          <motion.div 
            className="lg:col-span-2 vercel-glass-card p-8 relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            {/* Holographic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              {/* Avatar Section */}
              <div className="w-40 h-40 relative">
                <Suspense fallback={<div className="absolute inset-0 animate-pulse bg-cyan-500/10 rounded-full" />}>
                  <IdentityAvatar address={connectedIdentity || '0x0000...0000'} level={level} />
                </Suspense>
                {isScanning && (
                  <motion.div 
                    className="absolute inset-0 border-2 border-cyan-400/50 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>

              {/* Identity Details */}
              <div className="flex-1 space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl font-bold text-white">Citizen</h2>
                    <span className="px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold tracking-widest uppercase">
                      Level {level}
                    </span>
                  </div>
                  <p className="font-mono text-sm text-slate-400">{connectedIdentity || 'Not Connected'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-black/30 border border-white/5">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Auth Hash</div>
                    <div className="font-mono text-xs text-yellow-500 truncate">{authHash || generateHash()}</div>
                  </div>
                  <div className="p-4 bg-black/30 border border-white/5">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Issue Date</div>
                    <div className="font-mono text-xs text-white">{new Date().toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Radar Stats Visualization */}
            <div className="mt-8 flex justify-center">
              <svg width="300" height="300" className="overflow-visible">
                {/* Background Grid */}
                {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
                  <polygon
                    key={i}
                    points={stats.map((_, idx) => {
                      const coords = getPointCoordinates(scale * maxStat, idx, stats.length);
                      return `${coords.x},${coords.y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                  />
                ))}
                
                {/* Data Polygon */}
                <motion.path
                  d={radarPath}
                  fill="rgba(6, 182, 212, 0.2)"
                  stroke="#06b6d4"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                
                {/* Labels */}
                {labels.map((label, i) => {
                  const coords = getPointCoordinates(maxStat * 1.15, i, labels.length);
                  return (
                    <text
                      key={label}
                      x={coords.x}
                      y={coords.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-slate-400 text-[10px] uppercase tracking-wider"
                    >
                      {label}
                    </text>
                  );
                })}
              </svg>
            </div>
          </motion.div>

          {/* Activity Log Sidebar */}
          <div className="vercel-glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              Activity Log
            </h3>
            <div className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin">
              {isDataLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-white/5 animate-pulse" />
                  ))}
                </div>
              ) : (
                activityLogs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 bg-black/30 border border-white/5 hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm text-white mb-1">{log.action}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{log.target}</div>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono whitespace-nowrap">
                        {log.time}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
