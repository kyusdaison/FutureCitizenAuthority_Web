import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CosmicBackground } from '../components/CosmicBackground';
import { DecipherText } from '../components/DecipherText';
import { CipherHeading } from '../components/CipherHeading';

import { mockDataService, type ArtifactData } from '../services/mockDataService';
const ArtifactCard = ({ artifact }: { artifact: ArtifactData }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);
  
  const glareOpacity = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0, 0.5, 0]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize coordinates from -0.5 to 0.5
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'Legendary': return 'text-yellow-400 border-yellow-400/50 shadow-[0_0_15px_rgba(234,179,8,0.3)] bg-yellow-400/5';
      case 'Epic': return 'text-purple-400 border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.3)] bg-purple-400/5';
      case 'Rare': return 'text-blue-400 border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.3)] bg-blue-400/5';
      default: return 'text-green-400 border-green-400/50 shadow-[0_0_15px_rgba(34,197,94,0.3)] bg-green-400/5';
    }
  };

  return (
    <motion.div 
      className="w-full aspect-[3/4] cursor-pointer"
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={`w-full h-full relative border  overflow-hidden agency-panel ${getRarityColor(artifact.rarity)}`}
      >
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-center px-4" style={{ transform: "translateZ(20px)" }}>
           <span className="font-mono text-[10px] tracking-widest">{artifact.id}</span>
           <span className="font-mono text-[10px] bg-black/50 px-2 py-0.5 border border-white/10 uppercase">{artifact.type}</span>
        </div>
        
        <div className="absolute inset-0 z-0 border border-white/10">
          <img src={artifact.image} alt={artifact.id} className="w-full h-full object-cover opacity-60 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 z-10" style={{ transform: "translateZ(30px)" }}>
           <h3 className="text-xl font-bold text-white mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight">{artifact.rarity} Artifact</h3>
           
           <div className="flex gap-2 mb-3 flex-wrap">
             {artifact.traits.map((t: string) => (
               <span key={t} className="text-[9px] font-mono border border-white/20 bg-white/10 text-slate-200 px-1.5 py-0.5 backdrop-blur">{t}</span>
             ))}
           </div>

           <div className="grid grid-cols-2 gap-2 text-[10px] font-mono border-t border-white/10 pt-3">
              <div>
                <p className="text-slate-500 mb-0.5">POWER</p>
                <p className="text-cyan-400">{artifact.power.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-500 mb-0.5">OWNER</p>
                <p className="text-slate-300">{artifact.owner}</p>
              </div>
           </div>
        </div>

        {/* Glare effect */}
        <motion.div 
          className="absolute pointer-events-none mix-blend-screen"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 50%)",
            opacity: glareOpacity,
            left: glareX,
            top: glareY,
            width: "200%",
            height: "200%",
            transform: "translate(-25%, -25%)"
          }}
        />
      </div>
    </motion.div>
  );
};

const MintingTerminal = () => {
  const [isMinting, setIsMinting] = useState(false);
  const [mintPhase, setMintPhase] = useState(0);
  const [hashPayload, setHashPayload] = useState('');
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // 清理所有 timeouts
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];
  };

  // 组件卸载时清理
  useEffect(() => {
    return () => clearAllTimeouts();
  }, []);

  const startMint = () => {
    // 清理之前的 timeouts
    clearAllTimeouts();
    
    setIsMinting(true);
    setMintPhase(1);
    setHashPayload(Array.from({length: 12}).map(() => Math.floor(Math.random()*16).toString(16)).join(''));
    
    timeoutsRef.current.push(setTimeout(() => setMintPhase(2), 2000));
    timeoutsRef.current.push(setTimeout(() => setMintPhase(3), 4000));
    timeoutsRef.current.push(setTimeout(() => setMintPhase(4), 6000));
    timeoutsRef.current.push(setTimeout(() => {
      setMintPhase(0);
      setIsMinting(false);
    }, 8500));
  };

  return (
    <div className="agency-panel p-6 relative overflow-hidden group border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.05)] h-full flex flex-col">
       <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none"></div>
       <div className="flex justify-between items-center mb-6 relative z-10">
         <h2 className="text-xl text-vanguard text-white">Quantum Forge</h2>
         <div className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-1 border border-purple-500/20">STATUS: ONLINE</div>
       </div>

       <div className="flex-1 border border-white/5 bg-black/40 p-4 font-mono text-[10px] text-slate-400 overflow-y-auto relative flex flex-col justify-end">
          {isMinting ? (
             <div className="space-y-2">
               {mintPhase >= 1 && <div className="text-cyan-400"><DecipherText text="[SYS] INITIATING ARTIFACT DECRYPTION SEQUENCE..." duration={800} /></div>}
               {mintPhase >= 2 && <div className="text-yellow-400">» Allocating hyper-thread quantum resources... [OK]</div>}
               {mintPhase >= 3 && <div className="text-purple-400">» Synthesizing algorithmic traits from genesis blocks...</div>}
               {mintPhase >= 3 && <div className="text-slate-500 pl-4">Hashing payload: 0x{hashPayload}...</div>}
               {mintPhase >= 4 && <div className="text-green-400 font-bold mt-2"><DecipherText text=">> ARTIFACT MINTED SUCCESSFULLY. ADDED TO MATRIX." duration={1000} /></div>}
             </div>
          ) : (
            <div className="text-slate-600 opacity-50 flex flex-col items-center justify-center h-full text-center">
              <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>Awaiting forge instructions...<br/>Cost: 5,000 FCC</span>
            </div>
          )}
       </div>

       <div className="mt-6 relative z-10">
          <button 
            disabled={isMinting}
            onClick={startMint}
            className={`w-full h-12 flex items-center justify-center font-bold uppercase tracking-widest  transition-all ${
              isMinting 
                ? 'bg-[#111] text-slate-500 border border-white/10 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transform hover:-translate-y-0.5'
            }`}
          >
            {isMinting ? 'Forging...' : 'Mint Unknown Artifact'}
          </button>
       </div>
    </div>
  );
};


const Artifacts = () => {
  const [artifacts, setArtifacts] = useState<ArtifactData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        const data = await mockDataService.getArtifacts();
        setArtifacts(data);
      } catch (error) {
        console.error('Failed to fetch artifacts', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtifacts();
  }, []);

  return (
    <div className="mt-16 space-y-6 relative z-10 max-w-7xl mx-auto w-full pb-20 px-4 sm:px-6 lg:px-8">
      <CosmicBackground />

      <div className="pt-8 pb-4 border-b border-white/10 flex justify-between items-end">
        <div>
          <CipherHeading 
            text="DIGITAL ARTIFACTS" 
            className="text-4xl md:text-5xl text-vanguard mb-2 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          />
          <p className="text-xs text-telemetry text-purple-400 font-mono">NON-FUNGIBLE IDENTITIES & ASSETS // OMEGA PROTOCOL</p>
        </div>
        
        <div className="hidden md:flex gap-2">
           <button className="px-4 py-2 border border-purple-500/30 text-purple-400 bg-purple-500/10 text-[10px] font-bold tracking-widest uppercase hover:bg-purple-500/20 transition-all">
             My Vault
           </button>
           <button className="px-4 py-2 border border-white/10 text-slate-400 bg-white/5 text-[10px] font-bold tracking-widest uppercase hover:bg-white/10 transition-all">
             Marketplace
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-4">
        {/* Left Col: Forge Terminal */}
        <div className="lg:col-span-1 h-[400px]">
           <MintingTerminal />
        </div>

        {/* Right Col: Gallery */}
        <div className="lg:col-span-3">
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {isLoading ? (
                <div className="col-span-full py-20 flex justify-center items-center">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-purple-500 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    <span className="text-slate-400 font-mono text-sm tracking-widest">DECRYPTING ARTIFACT DATA...</span>
                  </div>
                </div>
              ) : (
                artifacts.map(artifact => (
                  <ArtifactCard key={artifact.id} artifact={artifact} />
                ))
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Artifacts;
