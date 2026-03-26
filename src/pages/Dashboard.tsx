import { useState, useEffect, Suspense, lazy } from 'react';
const GlobalNodeMap = lazy(() => import('../components/GlobalNodeMap').then(module => ({ default: module.GlobalNodeMap })));
import { useTelemetryContext } from '../contexts/TelemetryContext';
import { useWallet } from '../contexts/WalletContext';
import { mockDataService, type ProposalData, type ValidatorData } from '../services/mockDataService';

const Dashboard = () => {
  const telemetry = useTelemetryContext();
  const { connectedIdentity, balances } = useWallet();
  const [proposals, setProposals] = useState<ProposalData[]>([]);
  const [validators, setValidators] = useState<ValidatorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      mockDataService.getActiveProposals(),
      mockDataService.getValidators()
    ]).then(([propsData, valData]) => {
      if (mounted) {
        setProposals(propsData);
        setValidators(valData.slice(0, 5)); // top 5 validators
        setIsLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full pb-20">
      {/* Top Stats Bar Vercel Style */}
      <div className="w-full flex justify-center mb-10 mt-4">
          <div className="vercel-stats-bar w-full grid grid-cols-1 md:grid-cols-4 text-center divide-y md:divide-y-0 md:divide-x divide-white/10 overflow-hidden">
              <div className="flex flex-col py-6 px-6 relative group">
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none"></div>
                  <span className="text-[10px] text-telemetry text-slate-500 mb-2">TOTAL VALUE LOCKED</span>
                  <span className="text-4xl text-vanguard text-white">$842.5M</span>
                  <div className="flex justify-center items-center text-xs mt-2 text-slate-400 font-bold">
                      <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                      12.4% vs last month
                  </div>
              </div>
              <div className="flex flex-col py-6 px-6 relative group">
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-cyan-500/5 transition-colors pointer-events-none"></div>
                  <span className="text-[10px] text-telemetry text-slate-500 mb-2">TOTAL FCC STAKED</span>
                  <div className="text-4xl text-vanguard text-white">1.2B <span className="text-xl text-slate-500 tracking-normal font-bold">FCC</span></div>
                  <div className="flex justify-center items-center text-xs mt-2 w-full max-w-[150px] mx-auto">
                     <div className="w-full bg-slate-800 h-1.5 mr-2">
                        <div className="bg-cyan-500 h-1.5 w-[68%]"></div>
                     </div>
                     <span className="text-slate-400 font-medium">68%</span>
                  </div>
              </div>
              <div className="flex flex-col py-6 px-6 relative group">
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none"></div>
                  <span className="text-[10px] text-telemetry text-slate-500 mb-2">STAKING APY</span>
                  <span className="text-4xl text-vanguard text-cyan-500 font-bold">14.2%</span>
                  <span className="text-xs text-slate-500 mt-2 font-medium">Auto-compounding active</span>
              </div>
              <div className="flex flex-col py-6 px-6 relative group">
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none"></div>
                  <span className="text-[10px] text-telemetry text-slate-500 mb-2">ACTIVE NODES</span>
                  <span className="text-4xl text-vanguard text-white">{telemetry.activeNodes.toLocaleString()}<span className="text-xl text-slate-500 tracking-normal">/25,000</span></span>
                  <div className="mt-2 text-center">
                    <span className="text-xs text-white font-bold bg-white/10 border border-white/20 px-3 py-1 inline-block">
                        NETWORK HEALTHY
                    </span>
                  </div>
              </div>
          </div>
      </div>

      {/* Global Node Topology Map */}
      <div className="mb-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-vanguard text-white uppercase">Global Node Topology</h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-500 animate-[pulse_2s_infinite]"></span>
            <span className="text-[10px] text-telemetry text-cyan-500 tracking-widest uppercase font-bold">Live Network</span>
          </div>
        </div>
        <div className="h-[450px]">
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="w-8 h-8 border-t-2 border-cyan-500 animate-spin"></div></div>}>
            <GlobalNodeMap />
          </Suspense>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="agency-panel p-6 h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-6 z-10">
              <h2 className="text-2xl text-vanguard text-white uppercase">FCC Staking Performance</h2>
              <div className="flex space-x-2 bg-black/40 p-1 border border-white/10">
                {['24H', '7D', '1M', 'ALL'].map((tf, i) => (
                  <button key={tf} className={`px-4 py-1.5  font-bold text-telemetry text-[9px] transition-colors ${i === 2 ? 'bg-white text-black' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                    {tf}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 border border-white/5 relative flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/20 via-transparent to-transparent">
              {/* Fake chart placeholder */}
              <div className="text-slate-600 text-sm text-center relative z-10 font-mono font-bold uppercase tracking-widest">
                <svg className="w-16 h-16 mx-auto mb-2 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                Telemetry Syncing...
              </div>
              {/* Synthetic visual line representing a climbing chart */}
              <svg className="absolute inset-x-0 bottom-0 w-full h-[80%] opacity-60" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,80 L10,75 L20,85 L30,60 L40,70 L50,40 L60,50 L70,20 L80,30 L90,10 L100,5" fill="none" stroke="#f8fafc" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
                  <path d="M0,100 L0,80 L10,75 L20,85 L30,60 L40,70 L50,40 L60,50 L70,20 L80,30 L90,10 L100,5 L100,100 Z" fill="url(#grad)" opacity="0.1"></path>
                  <defs>
                      <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#f8fafc" stopOpacity="1" />
                          <stop offset="100%" stopColor="#f8fafc" stopOpacity="0" />
                      </linearGradient>
                  </defs>
              </svg>
            </div>
          </div>

           <div className="agency-panel p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl text-vanguard text-white uppercase">Active Proposals</h2>
                <button className="bg-transparent hover:bg-white/10 text-white border border-white/20 font-bold text-[9px] px-4 py-1.5 hover:border-white transition-all uppercase">VIEW ARCHIVE</button>
              </div>
              <div className="space-y-4 relative min-h-[150px]">
                {isLoading && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="w-8 h-8 border-t-2 border-cyan-500 animate-spin"></div>
                  </div>
                )}
                {proposals.map((prop) => (
                  <div key={prop.id} className="p-5 bg-white/[0.02] border border-white/5 hover:border-white/30 transition-all hover:bg-white/[0.04]">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-[10px] font-bold text-white bg-white/10 border border-white/20 px-2.5 py-1 inline-block mb-3 uppercase tracking-wider">{prop.status}</span>
                        <h4 className="font-bold text-white text-lg font-mono uppercase tracking-widest">{prop.id}: {prop.title}</h4>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-1">Ends in</div>
                        <div className="text-sm font-mono text-cyan-500 bg-cyan-950/50 border border-cyan-900 px-2 py-1">{prop.endsIn}</div>
                      </div>
                    </div>
                    <div className="w-full bg-slate-900 border border-slate-800 h-3 mb-3 flex overflow-hidden">
                      <div className="bg-cyan-500 h-full border-r border-[#050505]" style={{ width: `${prop.yesPct}%` }}></div>
                      <div className="bg-slate-400 h-full border-r border-[#050505]" style={{ width: `${prop.noPct}%` }}></div>
                      <div className="bg-slate-800 h-full" style={{ width: `${prop.abstainPct}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400 font-bold tracking-widest uppercase">
                      <span className="text-cyan-400">Yes: {prop.yesPct}%</span>
                      <span className="text-slate-400">No: {prop.noPct}%</span>
                      <span>Abstain: {prop.abstainPct}%</span>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="agency-panel p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-6 relative flex justify-center items-center overflow-hidden border border-white/10 bg-white/5 grayscale">
                <img src="/fcc-lion-god-tier.webp" alt="Wallet Identity" className="w-full h-full object-contain scale-[1.3] opacity-80" />
              </div>
              <h3 className="text-xl text-vanguard text-white mb-2 uppercase">Cryptographic Identity</h3>
              <p className="text-[10px] text-telemetry text-slate-500 mb-8 bg-black border border-white/10 px-4 py-1.5 inline-block">{connectedIdentity || 'Not Connected'}</p>
              
              <div className="w-full bg-black/40 p-5 border border-white/5 mb-4 text-left shadow-inner">
                <div className="text-[10px] text-telemetry font-bold text-slate-500 mb-1">AVAILABLE BALANCE</div>
                <div className="text-3xl text-vanguard text-white">{balances.fcc.toLocaleString(undefined, {minimumFractionDigits: 2})} <span className="text-base text-slate-500 font-mono tracking-widest font-bold">FCC</span></div>
                <div className="text-xs text-cyan-500 mt-2 font-bold font-mono tracking-widest">≈ ${(balances.fcc * 0.69).toLocaleString(undefined, {minimumFractionDigits: 2})} USD</div>
              </div>

               <div className="w-full bg-black/40 p-5 border border-white/5 mb-8 text-left relative overflow-hidden shadow-inner group transition-all hover:border-white/20">
                <div className="text-[10px] text-telemetry font-bold text-slate-500 mb-1">UNCLAIMED REWARDS</div>
                <div className="text-2xl text-vanguard text-white">314.5 <span className="text-sm font-mono tracking-widest font-bold text-slate-500">FCC</span></div>
                <button className="mt-4 w-full bg-white text-black hover:bg-slate-200 border border-transparent py-2.5 text-xs tracking-widest uppercase font-bold transition-all">CLAIM REWARDS</button>
              </div>

              <button className="w-full bg-black hover:bg-white/10 text-white border border-white/20 py-3.5 text-xs tracking-widest font-bold transition-all uppercase">
                {connectedIdentity ? 'INITIATE NEW STAKE' : 'CONNECT WALLET'}
              </button>
           </div>

           <div className="agency-panel p-6">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl text-vanguard text-white uppercase">Top Validators</h2>
                <div className="w-2 h-2 bg-cyan-500 animate-[pulse_2s_infinite]"></div>
             </div>
             <div className="space-y-3 relative min-h-[250px]">
               {isLoading && (
                 <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="w-8 h-8 border-t-2 border-cyan-500 animate-spin"></div>
                 </div>
               )}
               {validators.map((node, i) => (
                 <div key={node.name} className="flex items-center justify-between p-3 hover:bg-white/[0.04] transition-colors cursor-pointer border border-transparent hover:border-white/10">
                   <div className="flex items-center space-x-4">
                     <div className="w-10 h-10 bg-black/50 border border-white/10 flex items-center justify-center text-sm font-bold text-white shadow-inner font-mono">
                       {i + 1}
                     </div>
                     <div>
                       <div className="text-sm font-bold text-white mb-0.5 tracking-wider uppercase font-mono">{node.name}</div>
                       <div className="text-[9px] text-telemetry font-bold text-slate-500 flex items-center tracking-widest">
                         UPTIME {node.uptime}
                       </div>
                     </div>
                   </div>
                   <div className="text-right">
                     <div className="text-sm font-mono text-white font-bold">{node.weight} <span className="text-slate-500 text-xs tracking-widest">PWR</span></div>
                     <div className="text-[9px] text-telemetry font-bold text-cyan-500/80">FEE: {node.fee}</div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
