import { motion } from 'framer-motion';
import { Cpu, RefreshCw, Network } from 'lucide-react';
import { LiveTelemetry } from '../components/LiveTelemetry';
import { TiltCard } from '../components/TiltCard';
import { NodeNetwork } from '../components/NodeNetwork';
import { FadeInUp } from '../components/FadeInUp';
import { CipherHeading } from '../components/CipherHeading';
import { OptimizedVideo } from '../components/OptimizedVideo';

export const ArchitectureSection = () => {
  return (
    <section id="architecture" className="min-h-screen py-20 px-6 lg:px-12 border-t border-slate-800 bg-transparent backdrop-blur-3xl relative overflow-hidden">
      
      {/* Interactive infrastructure topology */}
      <NodeNetwork />

      {/* Giant Watermark */}
      <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.015] font-display font-black text-[40vw] tracking-tighter text-white mix-blend-overlay z-0">
         HTTS
      </div>
      
      {/* Vertical Label */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden 2xl:block opacity-[0.03] rotate-180 pointer-events-none vertical-text z-0">
         <h2 className="text-[8rem] font-serif font-black tracking-tighter uppercase text-white mix-blend-overlay">
           <span>03 WALLET RAIL</span>
         </h2>
      </div>

      {/* Telemetry Bar */}
      <div className="w-full max-w-7xl mx-auto mb-16 border-y border-slate-800 bg-slate-900/40 backdrop-blur-md px-6 py-2 flex items-center justify-between relative z-20">
         <div className="flex gap-4 md:gap-8 overflow-hidden text-[9px] font-mono tracking-widest text-slate-300 uppercase whitespace-nowrap">
	            <span className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500/80 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div> [REVIEW.ENV.LIVE]</span>
            <span className="opacity-80">TPS: 142,881 <span className="text-cyan-500 animate-[pulse_1s_infinite]">↑</span></span>
            <span className="opacity-80">LATENCY: 398ms</span>
	            <span className="opacity-80 hidden md:block">VALIDATOR GROUPS: 2048 / ONLINE</span>
	            <span className="opacity-80 hidden lg:block">AUDIT SEQUENCE: 489211</span>
         </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="absolute -top-6 left-0 text-[10px] font-mono tracking-[0.4em] text-slate-500 uppercase flex items-center gap-2">
          <span className="w-2 h-2 bg-fc-gold"></span>
          [CLASSIFICATION: UNRESTRICTED]
        </div>
        <div className="flex flex-col md:flex-row gap-8 mb-24 mt-8">
          <div className="flex-1">
            <FadeInUp>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-[10px] font-bold tracking-[0.5em] text-cyan-600 uppercase">
                  <CipherHeading text="03 // Wallet & Settlement Rail" />
                </h2>
                <div className="w-24 h-px bg-slate-700"></div>
              </div>
              
              <h3 className="text-5xl md:text-7xl font-serif font-light tracking-tight mb-8 text-white drop-shadow-md">
                <CipherHeading text="The " className="inline-block" />
                <span className="italic text-cyan-600 font-serif"><CipherHeading text="Wallet" /></span>
                <CipherHeading text=" Rail." className="inline-block" />
              </h3>
            </FadeInUp>
          </div>
          <div className="flex-1 md:mt-12 border-l border-white/10 pl-8 md:pl-12 relative">
            <FadeInUp delay={0.2}>
              <div className="absolute top-0 left-[-1px] w-[2px] h-12 bg-fc-gold"></div>
              <p className="text-[11px] md:text-[13px] font-mono tracking-[0.1em] text-slate-400 uppercase leading-[2.5] mb-10">
                Verified identity is only useful when it can instantly open a working wallet. The <strong className="text-white font-bold">HTTS settlement rail</strong> provisions seedless access, sub-second execution, and auto-gas treasury logic so institutions and citizens can move from verification into real payments without operational friction.
              </p>
            </FadeInUp>
            
	            {/* Review telemetry panel */}
            <FadeInUp delay={0.4}>
              <LiveTelemetry />
            </FadeInUp>
          </div>
        </div>

        {/* Broadcast Transmission Framework */}
        <FadeInUp delay={0.2}>
          <div className="w-full aspect-video mb-32 relative overflow-hidden group border border-slate-700 bg-[#020617] shadow-xl">
            <OptimizedVideo 
              src="/fcc_architecting_blockchain.mp4"
              poster="/fcc_architecture_core.webp"
              className="w-full h-full group-hover:opacity-100 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute top-6 left-6 flex items-center gap-4 z-10 pointer-events-none agency-panel px-4 py-2">
              <div className="w-2 h-2 bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]"></div>
              <span className="text-[10px] font-bold text-slate-300 tracking-[0.4em] uppercase">Executive Briefing // Wallet & Settlement</span>
            </div>
          </div>
        </FadeInUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FadeInUp delay={0.1} className="h-full">
            <TiltCard intensity={10} className="h-full">
            <div className="agency-panel p-8 md:p-10 group hover:border-fc-gold/30 transition-all duration-500 relative overflow-hidden h-full">
              <div className="absolute right-0 top-0 w-32 h-32 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_20s_linear_infinite]">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#c59a45" strokeWidth="1" strokeDasharray="4 8" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="#c59a45" strokeWidth="1" strokeDasharray="2 4" />
                </svg>
              </div>
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <Cpu className="w-8 h-8 text-fc-gold opacity-70" />
                  <div className="flex gap-1 items-end h-4">
                    {[3, 7, 4, 8, 5, 9, 4].map((h, i) => (
                      <motion.div key={i} animate={{ height: [`${h}px`, "16px", `${h}px`] }} transition={{ duration: 1 + i*0.2, repeat: Infinity }} className="w-1 bg-fc-gold/40" />
                    ))}
                  </div>
                </div>
                <h4 className="text-2xl font-serif text-white mb-4 relative z-10">Identity-Bound Wallets</h4>
	                <p className="text-[11px] md:text-[13px] font-mono tracking-widest text-slate-400 uppercase leading-[2] mb-6 relative z-10">Provision device-linked wallets through validator-assisted MPC so verified users can activate institutional custody without seed phrases, custody desks, or manual recovery rituals.</p>
                <div className="h-0.5 w-full bg-slate-800 overflow-hidden relative z-10 mt-auto"><div className="h-full bg-fc-gold w-0 group-hover:w-full transition-all duration-1000 ease-out"></div></div>
              </div>
            </TiltCard>
          </FadeInUp>
          
          <FadeInUp delay={0.3} className="h-full">
            <TiltCard intensity={10} className="h-full">
            <div className="agency-panel p-8 md:p-10 group hover:border-cyan-500/30 transition-all duration-500 relative overflow-hidden h-full">
              <div className="absolute right-0 top-0 w-32 h-32 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2 6" className="animate-pulse" />
                  <circle cx="50" cy="50" r="15" fill="#06b6d4" opacity="0.2" className="animate-ping" />
                </svg>
              </div>
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <RefreshCw className="w-8 h-8 text-cyan-600 opacity-70" />
	                  <div className="text-[9px] font-mono tracking-widest text-cyan-600/50">FINALITY // 0.4s</div>
                </div>
                <h4 className="text-2xl font-serif text-white mb-4 relative z-10">400ms Settlement</h4>
                <p className="text-[11px] md:text-[13px] font-mono tracking-widest text-slate-400 uppercase leading-[2] mb-6 relative z-10">Asynchronous Byzantine Fault Tolerance (aBFT) and parallel execution make verified payroll, treasury, and merchant flows settle in under a second without sacrificing auditability.</p>
                <div className="h-0.5 w-full bg-slate-800 overflow-hidden relative z-10 mt-auto"><div className="h-full bg-cyan-600 w-0 group-hover:w-full transition-all duration-1000 ease-out"></div></div>
              </div>
            </TiltCard>
          </FadeInUp>

          <FadeInUp delay={0.5} className="h-full">
            <TiltCard intensity={10} className="h-full">
            <div className="agency-panel p-8 md:p-10 group hover:border-cyan-500/30 transition-all duration-500 relative overflow-hidden h-full">
              <div className="absolute right-0 top-0 w-32 h-32 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect x="20" y="20" width="20" height="60" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="2 4" />
                  <rect x="60" y="40" width="20" height="40" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="2 4" />
                </svg>
              </div>
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <Network className="w-8 h-8 text-emerald-600 opacity-70" />
                  <div className="flex gap-1.5 items-end h-6">
                    <div className="w-1.5 h-3 bg-red-600/40 relative"><div className="absolute left-1/2 -translate-x-1/2 -top-1 -bottom-2 w-px bg-red-600/40"></div></div>
                    <div className="w-1.5 h-5 bg-emerald-600/40 relative"><div className="absolute left-1/2 -translate-x-1/2 -top-2 -bottom-1 w-px bg-emerald-600/40"></div></div>
                    <div className="w-1.5 h-4 bg-emerald-600/40 relative"><div className="absolute left-1/2 -translate-x-1/2 -top-1 -bottom-2 w-px bg-emerald-600/40"></div></div>
                  </div>
                </div>
                <h4 className="text-2xl font-serif text-white mb-4 relative z-10">Auto-Gas Treasury</h4>
	                <p className="text-[11px] md:text-[13px] font-mono tracking-widest text-slate-400 uppercase leading-[2] mb-6 relative z-10">Built-in liquidity routing converts stablecoins into FCC for gas behind the scenes, giving governments and institutions programmable money rails without making operators manage token logistics.</p>
                <div className="h-0.5 w-full bg-slate-800 overflow-hidden relative z-10 mt-auto"><div className="h-full bg-cyan-600 w-0 group-hover:w-full transition-all duration-1000 ease-out"></div></div>
              </div>
            </TiltCard>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
};
