import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mockDataService, type ProposalData } from '../services/mockDataService';
import { FCCTokenMark } from '../components/BrandMarks';

export default function Tokenomics() {
  const [supply, setSupply] = useState(1000000000);
  const [burned, setBurned] = useState(14250320);
  const [proposals, setProposals] = useState<ProposalData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Representative preview mechanics until a production economics feed is connected.
  useEffect(() => {
    let mounted = true;
    mockDataService.getActiveProposals().then(data => {
      if (mounted) {
        setProposals(data);
        setIsLoading(false);
      }
    });

    const interval = setInterval(() => {
      const burnAmount = Math.floor(Math.random() * 50) + 10;
      if (mounted) {
        setBurned(prev => prev + burnAmount);
        setSupply(prev => prev - burnAmount);
      }
    }, 3000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8 border border-fc-gold/20 bg-fc-gold/[0.04] px-5 py-4 text-sm leading-relaxed text-slate-300">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-fc-gold">Representative economics preview</span>
          <span className="mx-3 text-slate-600">/</span>
          Supply, burn, governance, and market figures are sample data for explaining FCC utility. Production disclosures should use verified treasury and network data.
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-12"
        >
          <div className="flex items-center space-x-4 mb-4">
            <FCCTokenMark className="h-12 w-12 shrink-0" />
            <div className="h-px w-12 bg-yellow-500/50" />
            <span className="text-telemetry text-yellow-500 tracking-[0.2em] text-sm font-bold">FCC ECONOMICS APPENDIX</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-vanguard mb-6">
            NETWORK ECONOMICS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-200">
              APPENDIX
            </span>
          </h1>
          <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed font-mono">
            Representative overview of the FCC utility model, reserve disclosures, and governance context. This page is depth material for specialist review, not the primary institutional homepage story.
          </p>
        </motion.div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'TOTAL SUPPLY', value: supply.toLocaleString(), unit: 'FCC', highlight: false },
            { label: 'TOTAL BURNED', value: burned.toLocaleString(), unit: 'FCC', highlight: true },
            { label: 'SAMPLE MARKET CAP', value: '$' + ((supply * 2.45) / 1000000000).toFixed(2) + 'B', unit: 'USD', highlight: false },
            { label: 'DISCLOSURE STATE', value: 'Sample', unit: 'Preview', highlight: false },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="agency-panel p-6 relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 via-transparent to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="text-xs text-zinc-500 font-mono mb-2 tracking-wider">{stat.label}</div>
              <div className="flex items-baseline space-x-2">
                <div className={`text-3xl font-bold font-mono ${stat.highlight ? 'text-red-400' : 'text-zinc-100'}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-yellow-500/70 font-mono">{stat.unit}</div>
              </div>
              {stat.highlight && (
                <div className="absolute top-0 right-0 p-4">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Supply Burn Chart Area (Mock SVG) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 agency-panel p-8 flex flex-col relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <h3 className="text-telemetry text-zinc-400 mb-8 border-b border-white/5 pb-4">SUPPLY DEFLATION CURVE</h3>
            
            <div className="flex-grow relative min-h-[300px] flex items-end">
               {/* Decorative Grid */}
               <div className="absolute inset-0 border-l border-b border-white/10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
               
               {/* Mock Data Lines */}
               <svg className="w-full h-full absolute inset-0 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,80 Q25,75 50,60 T100,20" fill="none" stroke="rgba(239,68,68,0.6)" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                  <path d="M0,20 Q25,25 50,40 T100,80" fill="none" stroke="rgba(234,179,8,0.4)" strokeWidth="2" strokeDasharray="4 4" />
                  
                  {/* Live Dot */}
                  <circle cx="100" cy="20" r="1.5" fill="#ef4444" className="animate-pulse" />
               </svg>
               
               <div className="absolute bottom-4 right-4 text-xs font-mono text-red-400 bg-red-950/40 px-2 py-1 border border-red-500/20 backdrop-blur-md">
                 SAMPLE ECONOMICS FEED: NOT MARKET DATA
               </div>
            </div>
          </motion.div>

          {/* Treasury Allocation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3 }}
            className="agency-panel p-8 flex flex-col relative"
          >
            <h3 className="text-telemetry text-zinc-400 mb-8 border-b border-white/5 pb-4">TREASURY ALLOCATION</h3>
            
            <div className="relative flex justify-center items-center py-8">
              {/* Mock Donut Chart */}
              <svg className="w-48 h-48 transform -rotate-90">
                <circle cx="96" cy="96" r="80" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="16" />
                <circle cx="96" cy="96" r="80" fill="transparent" stroke="#eab308" strokeWidth="16" strokeDasharray="502" strokeDashoffset="150" className="drop-shadow-[0_0_12px_rgba(234,179,8,0.6)]" />
                <circle cx="96" cy="96" r="80" fill="transparent" stroke="#06b6d4" strokeWidth="16" strokeDasharray="502" strokeDashoffset="400" />
                <circle cx="96" cy="96" r="80" fill="transparent" stroke="#ef4444" strokeWidth="16" strokeDasharray="502" strokeDashoffset="480" />
              </svg>
              <div className="absolute text-center flex flex-col items-center">
                <span className="text-zinc-500 text-xs font-mono mb-1">TOTAL</span>
                <span className="text-2xl font-bold font-mono text-zinc-200">14.2B</span>
              </div>
            </div>

            <div className="space-y-4 mt-auto">
              {[
                { label: 'Ecosystem Grants', color: 'bg-yellow-500', pct: '50%' },
                { label: 'Core Development', color: 'bg-cyan-500', pct: '30%' },
                { label: 'Security Reserves', color: 'bg-red-500', pct: '20%' },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center text-sm font-mono">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3  ${item.color}`} />
                    <span className="text-zinc-400">{item.label}</span>
                  </div>
                  <span className="text-zinc-200">{item.pct}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Governance Proposals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-telemetry border-l-2 border-yellow-500 pl-3">COMMUNITY POLICY PROPOSALS</h3>
            <button className="text-xs font-mono text-yellow-500 hover:text-yellow-400 transition-colors uppercase tracking-widest border border-yellow-500/20 px-4 py-2 bg-yellow-500/5 hover:bg-yellow-500/10">
              Appendix Only
            </button>
          </div>

          <div className="space-y-4 relative min-h-[150px]">
            {isLoading && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                 <div className="w-8 h-8 rounded-full border-t-2 border-yellow-500 animate-spin"></div>
              </div>
            )}
            {proposals.map((prop) => {
              // Convert percentages to mock raw vote counts for the UI logic since we lack true raw votes in ProposalData
              const mockTotalVotes = 100000000;
              const votesFor = (prop.yesPct / 100) * mockTotalVotes;
              const votesAgainst = (prop.noPct / 100) * mockTotalVotes;

              return (
                <div key={prop.id} className="agency-panel p-6 flex flex-col md:flex-row gap-6 relative group overflow-hidden">
                  {/* Status Indicator */}
                  <div className={`absolute top-0 left-0 w-1 h-full ${prop.status === 'Voting Active' ? 'bg-yellow-500' : 'bg-cyan-500/50'}`} />
                  
                  <div className="flex-grow pl-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-sm font-mono font-bold text-zinc-300">{prop.id}</span>
                      <span className={`text-[10px] px-2 py-0.5  font-mono font-bold uppercase ${
                        prop.status === 'Voting Active' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20'
                      }`}>
                        {prop.status}
                      </span>
                      {prop.status === 'Voting Active' && (
                        <span className="text-xs font-mono text-zinc-500 flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {prop.endsIn}
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-bold text-zinc-100 mb-2">{prop.title}</h4>
                    <p className="text-zinc-500 text-sm font-mono leading-relaxed max-w-3xl">
                      Voting participation: {prop.yesPct + prop.noPct + prop.abstainPct}%. The community must decide whether to approve this network upgrade before the voting window closes.
                    </p>
                  </div>

                  <div className="w-full md:w-64 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                    <div className="mb-3">
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-green-400">FOR {(votesFor / 1000000).toFixed(1)}M</span>
                        <span className="text-red-400">AGNST {(votesAgainst / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="h-1.5 w-full bg-red-500/20 rounded-full overflow-hidden flex">
                        <div 
                          className="h-full bg-green-500" 
                          style={{ width: `${(votesFor / (votesFor + votesAgainst)) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="border border-white/10 bg-white/[0.02] px-3 py-2 text-xs font-mono leading-relaxed text-zinc-500">
                      Community action is disabled in the institutional preview. Production governance should link to verified participation records.
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
