import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { useTelemetryContext } from '../contexts/TelemetryContext';
import { CosmicBackground } from '../components/CosmicBackground';
import { DecipherText } from '../components/DecipherText';
import { HologramModal } from '../components/HologramModal';
import { NetworkGraph } from '../components/NetworkGraph';
import { FCChainNetworkSeal } from '../components/BrandMarks';
const GlobalNodeMap = lazy(() => import('../components/GlobalNodeMap').then(module => ({ default: module.GlobalNodeMap })));
import type { 
  Block, 
  Transaction 
} from '../data/mockExplorerData';
import { 
  generateInitialBlocks, 
  generateInitialTransactions,
  generateInitialBlocks as genMoreBlocks, // alias
  generateInitialTransactions as genMoreTxs
} from '../data/mockExplorerData';

const Explorer = () => {
  const currentHeightRef = useRef(18459200);
  const [blocks, setBlocks] = useState<Block[]>(() => generateInitialBlocks(10, 18459200));
  const [transactions, setTransactions] = useState<Transaction[]>(() => generateInitialTransactions(10));
  
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const telemetry = useTelemetryContext();

  // Simulate Live Network Telemetry synced with global hook
  useEffect(() => {
    if (telemetry.blockHeight > currentHeightRef.current) {
      const heightToUse = telemetry.blockHeight;
      currentHeightRef.current = heightToUse;
      
      setTimeout(() => {
        // Create 1 new block corresponding to the telemetry height
        setBlocks(prev => {
          const newBlock = genMoreBlocks(1, heightToUse)[0];
          // Keep only top 15 to prevent DOM bloat
          return [newBlock, ...prev].slice(0, 15);
        });

        // Create 1-3 new transactions mimicking network activity for this block
        setTransactions(prev => {
          const txCount = Math.floor(Math.random() * 3) + 1;
          const newTxs = genMoreTxs(txCount);
          return [...newTxs, ...prev].slice(0, 15);
        });
      }, 0);
    }
  }, [telemetry.blockHeight]);

  return (
    <div className="mt-16 space-y-6 relative z-10 max-w-7xl mx-auto w-full pb-20 px-4 sm:px-6 lg:px-8">
      <CosmicBackground />

      {/* Omni-Search Terminal */}
      <div className="pt-8 pb-12">
        <div className="max-w-3xl mx-auto text-center relative group">
          <div className="absolute inset-0 bg-cyan-500/5 blur-3xl scale-110 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          <div className="mb-5 flex justify-center">
            <div className="flex items-center gap-3 border border-white/10 bg-[#020617]/85 px-4 py-3 backdrop-blur-xl">
              <FCChainNetworkSeal className="h-10 w-10" />
              <div className="text-left">
                <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-fc-gold/80">FC Chain</div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">Network explorer</div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl text-vanguard mb-8 text-white relative z-10 uppercase tracking-widest font-bold">
            Network <span className="text-cyan-400 tracking-tight">Telemetry</span>
          </h1>
          <div className="relative z-10 flex border focus-within:border-cyan-500/50 border-white/10 bg-black shadow-none transition-colors overflow-hidden">
            <div className="pl-6 flex items-center justify-center flex-shrink-0">
               <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
               </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search by Txn Hash / Block / Address..." 
              className="w-full bg-transparent border-none text-white px-4 py-5 focus:outline-none focus:ring-0 text-sm font-mono placeholder-slate-500 uppercase tracking-widest"
            />
            <button className="px-8 bg-white/5 hover:bg-cyan-500/20 text-cyan-500 text-sm font-bold tracking-widest uppercase transition-colors border-l border-white/10">
              Scan
            </button>
          </div>
        </div>
      </div>

      {/* Live Stats HUD */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
         <div className="bg-black/60 border border-white/5 p-5 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
            <div className="text-[10px] text-telemetry text-slate-500 mb-2 group-hover:text-cyan-500/70 transition-colors font-bold uppercase tracking-widest">FC PRICE</div>
            <div className="text-2xl text-vanguard text-white font-bold">${telemetry.fcPrice}</div>
            <div className="text-xs text-cyan-500 mt-1 font-mono">{telemetry.fcPriceChange} (24h)</div>
         </div>
         <div className="bg-black/60 border border-white/5 p-5 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
            <div className="text-[10px] text-telemetry text-slate-500 mb-2 group-hover:text-cyan-500/70 transition-colors font-bold uppercase tracking-widest">LATEST BLOCK</div>
            <div className="text-2xl text-vanguard text-white font-bold">{telemetry.blockHeight.toLocaleString()}</div>
            <div className="text-xs text-slate-500 mt-1 font-mono uppercase tracking-widest">Syncing live...</div>
         </div>
         <div className="bg-black/60 border border-white/5 p-5 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
            <div className="text-[10px] text-telemetry text-slate-500 mb-2 group-hover:text-cyan-500/70 transition-colors font-bold uppercase tracking-widest">NETWORK TPS</div>
            <div className="text-2xl text-vanguard text-white font-bold">{telemetry.tps.toLocaleString()}</div>
            <div className="text-xs text-slate-500 mt-1 font-mono uppercase tracking-widest">Max: {telemetry.maxTps.toLocaleString()}</div>
         </div>
         <div className="bg-black/60 border border-white/5 p-5 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
            <div className="text-[10px] text-telemetry text-slate-500 mb-2 group-hover:text-cyan-500/70 transition-colors font-bold uppercase tracking-widest">AVG BLOCK TIME</div>
            <div className="text-2xl text-vanguard text-white font-bold">{telemetry.finality}<span className="text-base text-slate-500 ml-1">s</span></div>
            <div className="text-xs text-slate-500 mt-1 font-mono uppercase tracking-widest">Real-time finality</div>
         </div>
      </div>

      {/* Global Node Map */}
      <div className="mb-8 bg-black/80 border border-white/5 p-6 overflow-hidden relative group h-[500px]">
        <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
           <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
        </div>
        <div className="flex items-center justify-between mb-4 relative z-10 pointer-events-none font-bold tracking-widest uppercase">
          <div className="text-[10px] text-telemetry text-slate-500 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-cyan-500 animate-pulse shadow-none"></div>
            GLOBAL NODE TOPOLOGY
          </div>
          <div className="text-[10px] text-telemetry text-cyan-500/50">ACTIVE ROUTING</div>
        </div>
        <div className="absolute inset-0 top-12 z-0 cursor-move">
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="w-8 h-8 border-t-2 border-cyan-500 animate-spin"></div></div>}>
            <GlobalNodeMap />
          </Suspense>
        </div>
      </div>

      {/* Network Activity Graph */}
      <div className="mb-8 bg-black/80 border border-white/5 p-6 overflow-hidden relative group">
        <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
           <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
        </div>
        <div className="flex items-center justify-between mb-4 relative z-10 font-bold tracking-widest uppercase">
          <div className="text-[10px] text-telemetry text-slate-500 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-cyan-500 animate-pulse shadow-none"></div>
            LIVE NETWORK LOAD (TPS)
          </div>
          <div className="text-[10px] text-telemetry text-cyan-500/50">SYNCED</div>
        </div>
        <NetworkGraph />
      </div>

      {/* Dual Engines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Latest Blocks */}
        <div className="bg-black/80 border border-white/5 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-white/10 flex justify-between items-center bg-black/40">
             <h2 className="text-lg text-vanguard text-white flex items-center uppercase tracking-widest font-bold">
               <div className="w-1.5 h-1.5 bg-cyan-500 mr-3 shadow-none"></div>
               Latest Blocks
             </h2>
             <button className="text-[10px] text-telemetry font-bold text-cyan-500 hover:text-white transition-colors px-3 py-1.5 bg-white/5 border border-white/10 hover:border-cyan-500/30 uppercase tracking-widest">
               VIEW ALL
             </button>
          </div>
          <div className="flex-1 overflow-hidden relative">
             <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
             <div className="max-h-[600px] overflow-y-auto scrollbar-hide py-2 px-2 flex flex-col gap-2 relative">
                {blocks.map((block) => (
                  <div 
                    key={block.hash} 
                    onClick={() => setSelectedBlock(block)}
                    className="bg-white/[0.02] border border-white/5 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 hover:bg-white/[0.04] hover:border-cyan-500/30 transition-colors cursor-pointer group"
                  >
                     <div className="flex items-center gap-4 w-full sm:w-auto">
                       <div className="w-12 h-12 bg-black/50 border border-white/10 flex items-center justify-center relative overflow-hidden shrink-0">
                         <div className="absolute inset-0 bg-cyan-500/10 opacity-0 hover:opacity-100 transition-opacity"></div>
                         <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                         </svg>
                       </div>
                       <div className="flex flex-col min-w-0">
                         <div className="text-sm font-bold text-white font-mono mb-1">{block.height.toLocaleString()}</div>
                         <div className="text-[10px] text-telemetry text-slate-500 uppercase tracking-widest font-bold flex flex-wrap gap-1">
                           <span className="text-white/40">Minced by </span>
                           <span className="text-white hover:text-cyan-400 cursor-pointer transition-colors max-w-[100px] sm:max-w-[120px] truncate inline-block align-bottom"><DecipherText text={block.miner} duration={700} /></span>
                         </div>
                       </div>
                     </div>
                     <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto shrink-0 border-t border-white/5 sm:border-0 pt-2 sm:pt-0">
                       <div className="text-xs text-white font-mono sm:mb-1">{block.txCount} txns</div>
                       <div className="text-[9px] text-telemetry font-bold text-slate-500 uppercase tracking-widest">{block.timeDelay}s ago</div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Latest Transactions */}
        <div className="bg-black/80 border border-white/5 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-white/10 flex justify-between items-center bg-black/40">
             <h2 className="text-lg text-vanguard text-white flex items-center uppercase tracking-widest font-bold">
               <div className="w-1.5 h-1.5 bg-cyan-500 mr-3 shadow-none"></div>
               Latest Transactions
             </h2>
             <button className="text-[10px] text-telemetry font-bold text-cyan-500 hover:text-white transition-colors px-3 py-1.5 bg-white/5 border border-white/10 hover:border-cyan-500/30 uppercase tracking-widest">
               VIEW ALL
             </button>
          </div>
          <div className="flex-1 overflow-hidden relative">
             <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
             <div className="max-h-[600px] overflow-y-auto scrollbar-hide py-2 px-2 flex flex-col gap-2 relative">
                {transactions.map((tx) => (
                  <div 
                    key={tx.hash} 
                    onClick={() => setSelectedTx(tx)}
                    className="bg-white/[0.02] border border-white/5 p-4 flex items-center justify-between hover:bg-white/[0.04] hover:border-cyan-500/30 transition-colors cursor-pointer group"
                  >
                     <div className="flex flex-col gap-2 w-full max-w-[100%] sm:max-w-[70%]">
                       <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 bg-cyan-500 shadow-none shrink-0" title="Confirmed"></div>
                         <span className="text-[10px] sm:text-xs px-2 py-0.5 bg-white/5 text-slate-400 border border-white/10 font-bold font-mono group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-colors hidden sm:block">TX#</span>
                         <span className="text-[10px] sm:text-[11px] text-telemetry text-cyan-400 hover:text-cyan-300 cursor-pointer truncate w-full"><DecipherText text={tx.hash} duration={1000} /></span>
                       </div>
                       <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] sm:text-[10px] text-telemetry font-bold tracking-widest uppercase">
                         <div className="flex items-center gap-1 min-w-0">
                           <span className="text-slate-500 shrink-0">FROM</span>
                           <span className="text-white hover:text-cyan-400 cursor-pointer truncate w-[60px] sm:w-[100px]"><DecipherText text={tx.from} duration={600} /></span>
                         </div>
                         <span className="text-slate-600 shrink-0">→</span>
                         <div className="flex items-center gap-1 min-w-0">
                           <span className="text-slate-500 shrink-0">TO</span>
                           <span className="text-white hover:text-cyan-400 cursor-pointer truncate w-[60px] sm:w-[100px]"><DecipherText text={tx.to} duration={600} /></span>
                         </div>
                       </div>
                     </div>
                     <div className="flex flex-col items-end shrink-0 pl-4">
                       <span className="text-xs font-bold text-white mb-1"><span className="text-white font-mono">{tx.value}</span> FCC</span>
                       <span className="text-[9px] text-telemetry text-slate-500 tracking-widest font-bold uppercase">{tx.timeDelay}s ago</span>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

      </div>

      <HologramModal 
        isOpen={!!selectedBlock} 
        onClose={() => setSelectedBlock(null)}
        title={`Block #${selectedBlock?.height.toLocaleString()}`}
        data={(selectedBlock as unknown as Record<string, unknown>) || {}}
        theme="cyan"
      />
      
      <HologramModal 
        isOpen={!!selectedTx} 
        onClose={() => setSelectedTx(null)}
        title="Transaction Details"
        data={(selectedTx as unknown as Record<string, unknown>) || {}}
        theme="cyan"
      />
    </div>
  );
};

export default Explorer;
