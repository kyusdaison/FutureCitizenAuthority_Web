import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CipherHeading } from '../components/CipherHeading';
import { useToast } from '../contexts/ToastContext';
import { useWallet } from '../contexts/WalletContext';
import { mockDataService, type ValidatorData } from '../services/mockDataService';

const Staking = () => {
  // Staking & Synthesis simulator state
  const { toast } = useToast();
  const { connectedIdentity, balances, updateBalances, gainXP, stakedFCC, updateStakedFCC } = useWallet();
  const [allocation, setAllocation] = useState(stakedFCC);
  const [isStaking, setIsStaking] = useState(false);
  const [validators, setValidators] = useState<ValidatorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingData, setPendingData] = useState(0);
  const maxAllocation = 50000;

  useEffect(() => {
    setAllocation(stakedFCC);
  }, [stakedFCC]);

  useEffect(() => {
    if (stakedFCC <= 0) return;
    // Synthesis Engine loop
    const interval = setInterval(() => {
       // Accrue synthetic $DATA proportional to stakedFCC
       setPendingData(prev => prev + (stakedFCC * 0.00001));
    }, 1000);
    return () => clearInterval(interval);
  }, [stakedFCC]);

  useEffect(() => {
    const fetchValidators = async () => {
      try {
        const data = await mockDataService.getValidators();
        setValidators(data);
      } catch (error) {
        console.error('Failed to fetch validators', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchValidators();
  }, []);

  const handleStake = () => {
    if (!connectedIdentity) {
      toast({ message: "Identity Matrix Not Found. Connect Wallet.", type: "error" });
      return;
    }
    
    const difference = allocation - stakedFCC;
    if (difference === 0) return;
    
    setIsStaking(true);
    
    if (difference > 0) {
      // Locking Liquidity
      if (balances.fcc >= difference) {
        toast({ message: `Locking ${difference.toLocaleString()} FCC into Nexus...`, type: 'process' });
        setTimeout(() => {
           updateBalances({ fcc: balances.fcc - difference });
           updateStakedFCC(allocation);
           gainXP(50);
           setIsStaking(false);
           toast({ message: `Successfully locked ${difference.toLocaleString()} FCC`, type: 'success' });
        }, 2000);
      } else {
        setIsStaking(false);
        toast({ message: "INSUFFICIENT FUNDS IN WALLET", type: "error" });
      }
    } else {
      // Unlocking Liquidity
      const extractAmount = Math.abs(difference);
      toast({ message: `Extracting ${extractAmount.toLocaleString()} FCC from Nexus...`, type: 'process' });
      setTimeout(() => {
         updateBalances({ fcc: balances.fcc + extractAmount });
         updateStakedFCC(allocation);
         setIsStaking(false);
         toast({ message: `Successfully unstaked ${extractAmount.toLocaleString()} FCC`, type: 'success' });
      }, 2000);
    }
  };

  const handleHarvest = () => {
    if (pendingData <= 0 || !connectedIdentity) return;
    const harvested = Number(pendingData.toFixed(2));
    if (harvested <= 0) {
       toast({ message: `Insufficient compound to harvest.`, type: "error" });
       return;
    }
    updateBalances({ data: (balances.data || 0) + harvested });
    setPendingData(0);
    gainXP(20);
    toast({ message: `Synthesized ${harvested} $DATA securely to Wallet.`, type: "success" });
  };

  // Circular HUD Math
  const totalNetworkStake = 1.2; // Billion
  const totalEligibleSupply = 1.8; // Billion
  const stakeRatio = totalNetworkStake / totalEligibleSupply;
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - stakeRatio * circumference;

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full pb-20 fade-in">
      <header className="mb-10">
        <CipherHeading 
          text="VALIDATOR STAKING CONSOLE" 
          className="text-4xl text-vanguard text-white mb-2 tracking-widest"
        />
        <p className="text-telemetry text-slate-400">Manage liquidity flow, delegate to core nodes, and synthesize network rewards.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Network State HUD */}
        <div className="lg:col-span-1 space-y-8">
          {/* Circular HUD Ring */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="agency-panel p-6 flex flex-col items-center justify-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none"></div>
            <h3 className="text-sm text-telemetry text-slate-400 tracking-widest uppercase mb-8 font-bold">Network Stake Ratio</h3>
            
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-cyan-500/5 blur-xl"></div>
              
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 260 260">
                {/* Background Track */}
                <circle
                  cx="130"
                  cy="130"
                  r={radius}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="12"
                  fill="none"
                />
                {/* Active Progress */}
                <motion.circle
                  cx="130"
                  cy="130"
                  r={radius}
                  stroke="#06b6d4" /* Cyan 500 */
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="square"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                />
              </svg>
              
              {/* Inner Stats */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="text-[10px] text-slate-500 font-mono tracking-widest mb-1 font-bold">YOUR STAKE</div>
                <div className="text-3xl text-vanguard text-white">{stakedFCC.toLocaleString()} <span className="text-base text-slate-500 font-bold">FCC</span></div>
                <div className="text-[10px] text-cyan-500 mt-2 bg-cyan-950/50 px-3 py-1 border border-cyan-900 font-bold">
                  NETWORK: {totalNetworkStake}B
                </div>
              </div>
            </div>

            <div className="mt-8 text-center w-full">
              <div className="flex justify-between text-xs text-slate-500 font-mono mb-2 font-bold uppercase tracking-widest">
                <span>Security Threshold</span>
                <span className="text-cyan-500">Optimal</span>
              </div>
              <div className="w-full h-1 bg-white/10 overflow-hidden">
                <div className="h-full bg-cyan-500 w-4/5 shadow-[0_0_8px_#06b6d4]"></div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
             <button className="agency-panel p-4 flex items-center justify-center gap-2 hover:bg-white border border-transparent hover:border-white group transition-colors">
                <svg className="w-5 h-5 text-white group-hover:text-black group-hover:animate-spin [animation-duration:3s]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                <span className="text-xs font-bold text-white group-hover:text-black tracking-widest uppercase">COMPOUND</span>
             </button>
             <button className="agency-panel p-4 flex items-center justify-center gap-2 hover:bg-white border border-transparent hover:border-white group transition-colors">
                <svg className="w-5 h-5 text-cyan-400 group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                <span className="text-xs font-bold text-white group-hover:text-black tracking-widest uppercase">BRIDGE</span>
             </button>
          </div>
        </div>

        {/* Right Column: Interaction Console */}
        <div className="lg:col-span-2 space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="agency-panel p-6 relative overflow-hidden"
          >
            {/* Ambient Background Gradient */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="flex justify-between items-end mb-8 relative z-10">
              <div>
                <h2 className="text-2xl text-vanguard text-white mb-1 uppercase">Liquidity Allocation</h2>
                <p className="text-[10px] font-bold text-telemetry text-slate-500 uppercase tracking-widest">Fine-tune your physical FC stake delegation.</p>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-telemetry font-bold tracking-widest text-slate-400 mb-1 uppercase">CURRENT APY</div>
                <div className="text-3xl text-vanguard gold-gradient-text">14.2%</div>
              </div>
            </div>

            {/* The Cyber-Slider */}
            <div className="relative z-10 py-6">
              <div className="flex justify-between mb-4">
                <span className="text-sm font-mono text-cyan-500 border border-cyan-900 bg-cyan-950/50 px-4 py-1.5 font-bold tracking-widest">
                  {allocation.toLocaleString()} FCC
                </span>
                <span className="text-xs font-mono mt-2 text-slate-400 font-bold uppercase tracking-widest">Available: <span className="text-white">{balances.fcc.toLocaleString()} FCC</span></span>
              </div>
              
              <div className="relative w-full h-3 bg-black/60 border border-white/10 overflow-visible shadow-inner">
                 <input 
                   type="range" 
                   min="0" 
                   max={maxAllocation} 
                   step="100"
                   value={allocation}
                   onChange={(e) => setAllocation(Number(e.target.value))}
                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                   aria-label="Allocation Amount"
                 />
                 {/* Active Track */}
                 <style>{`
                   .allocation-bar { width: ${(allocation / maxAllocation) * 100}%; }
                   .allocation-thumb { left: calc(${(allocation / maxAllocation) * 100}% - 10px); }
                 `}</style>
                 <div 
                   className="absolute top-0 left-0 h-full bg-cyan-500 pointer-events-none allocation-bar"
                 ></div>
                 {/* Slider Thumb Representation */}
                 <div 
                   className="absolute top-1/2 -mt-2.5 w-5 h-5 bg-white pointer-events-none border-2 border-cyan-500 transition-transform duration-75 scale-110 allocation-thumb"
                 ></div>
              </div>
            </div>

            {/* Real-Time Synthesis Output */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 relative z-10">
              <div className="bg-black/40 border border-white/5 p-5 text-center shadow-inner hover:bg-white/[0.02] transition-colors col-span-1 md:col-span-2 relative overflow-hidden flex flex-col items-center justify-center">
                <div className="absolute top-0 left-0 w-32 h-32 bg-slate-500/10 blur-[50px]"></div>
                <div className="text-[10px] text-telemetry text-slate-400 mb-2 font-bold tracking-widest">REAL-TIME $DATA SYNTHESIS</div>
                <div className="text-4xl font-mono text-white">
                  {pendingData.toFixed(4)}
                </div>
              </div>
              <button 
                onClick={handleHarvest}
                disabled={pendingData < 0.01}
                className="bg-white/5 border border-white/20 p-5 text-center relative overflow-hidden hover:bg-white/10 transition-colors cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-[10px] font-bold text-telemetry text-slate-400 mb-2">ACTION</div>
                <div className="text-xl font-mono text-white tracking-widest mt-1">HARVEST</div>
              </button>
            </div>

            <button 
              onClick={handleStake}
              disabled={isStaking || allocation === stakedFCC}
              className="w-full mt-8 bg-white text-black hover:bg-white/90 font-bold uppercase py-4 text-sm tracking-widest transition-all disabled:opacity-50">
              {isStaking ? 'PROCESSING INSTRUCTION...' : allocation === stakedFCC ? 'ALLOCATION LOCKED' : 'CONFIRM ALLOCATION & SIGN TX'}
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="agency-panel p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl text-vanguard text-white uppercase">Validator Topology Matrix</h2>
              <button className="text-[10px] font-bold tracking-widest text-telemetry text-cyan-500 hover:text-white transition-colors border-b border-cyan-500/30 border-dashed pb-0.5 uppercase">Advanced View</button>
            </div>

            <div className="space-y-3">
              {isLoading ? (
                <div className="py-8 text-center text-slate-500 font-mono text-xs animate-pulse font-bold tracking-widest uppercase">
                  SYNCING VALIDATOR TOPOLOGY...
                </div>
              ) : (
                validators.map((val, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black/50 border border-white/10 flex items-center justify-center relative shadow-inner transition-colors">
                      <span className="text-xs font-mono font-bold text-white transition-colors">#{i+1}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1 group-hover:text-cyan-500 transition-colors uppercase tracking-widest font-mono">{val.name}</h4>
                      <div className="text-[10px] text-telemetry text-slate-500 flex gap-3 font-bold tracking-widest uppercase">
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-cyan-500"></span>
                          UPTIME {val.uptime}
                        </span>
                        <span>WEIGHT {val.weight}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-mono font-bold text-cyan-500 mb-1">{val.apy} APY</div>
                    <div className="text-[10px] font-bold text-telemetry text-slate-500 tracking-widest uppercase">FEE: {val.fee}</div>
                  </div>
                </div>
              )))}
            </div>
            
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Staking;
