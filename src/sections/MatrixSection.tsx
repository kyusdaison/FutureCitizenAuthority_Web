import { motion, useScroll, useTransform } from 'framer-motion';
import { TiltCard } from '../components/TiltCard';
import { FadeInUp } from '../components/FadeInUp';
import { CipherHeading } from '../components/CipherHeading';

export const MatrixSection = () => {
  const { scrollYProgress } = useScroll();
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section id="matrix" className="py-24 px-6 lg:px-12 bg-[#020306] border-y border-white/5 relative overflow-hidden">
      {/* Blueprint Background Grid */}
      <div className="absolute inset-0 bg-tactical-grid opacity-30 pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020306] via-transparent to-[#020306] pointer-events-none z-0"></div>

      <div className="absolute left-0 top-1/2 w-[600px] h-[600px] bg-slate-800/20 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none"></div>
      
      {/* Giant Watermark */}
      <motion.div style={{ y: yParallaxFast }} className="absolute left-[30%] top-[30%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.015] font-serif font-black text-[40vw] tracking-tighter text-white mix-blend-overlay z-0">
         FCA
      </motion.div>
      {/* Vertical Label */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden 2xl:block opacity-[0.03] rotate-180 pointer-events-none vertical-text">
         <h2 className="text-[6rem] font-serif font-black tracking-tighter uppercase text-white mix-blend-overlay">
           <span>07 STACK</span>
         </h2>
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="absolute -top-12 right-0 text-[10px] font-mono tracking-[0.4em] text-slate-500 uppercase flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan-600"></span>
          [CLASSIFICATION: UNRESTRICTED]
        </div>
        <FadeInUp>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-[10px] font-bold tracking-[0.5em] text-cyan-600 uppercase">
              <CipherHeading text="07 // Identity To State Stack" />
            </h2>
            <div className="w-24 h-px bg-slate-700"></div>
          </div>
          <h3 className="text-5xl md:text-7xl font-serif font-light tracking-tight mb-6 drop-shadow-lg text-center text-white">
            <CipherHeading text="The " className="inline-block" />
            <span className="text-cyan-600 italic font-serif"><CipherHeading text="Operating" /></span>
            <CipherHeading text=" Stack." className="inline-block" />
          </h3>
          <p className="text-slate-400 font-mono text-[11px] md:text-[13px] tracking-[0.1em] max-w-2xl leading-[2] mb-16 text-center mx-auto uppercase">
            After identity, wallet, and governance access are established, the FC operating stack expands into custody, payments, assets, policy intelligence, and digital public infrastructure. Each layer compounds the one before it.
          </p>
        </FadeInUp>
        <div className="relative pl-0 md:pl-12">
          {/* Dual Avant-Garde PCB Traces */}
          <div className="absolute left-[38px] top-4 bottom-4 flex gap-1 pointer-events-none hidden md:flex">
             <div className="w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent relative">
                <div className="absolute top-1/4 w-full h-1/4 bg-fc-gold shadow-[0_0_15px_#c59a45] animate-[scan_4s_ease-in-out_infinite_alternate]"></div>
             </div>
             <div className="w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent relative mt-16">
                <div className="absolute top-1/2 w-full h-1/3 bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-[scan_6s_linear_infinite_reverse]"></div>
             </div>
          </div>
          
          <div className="space-y-4 lg:space-y-6">
          {[
	            { level: 'L7', name: 'Policy Intelligence & SDKs', desc: 'Agentic wallet copilots, risk automation, policy engines, and SDKs for digital public services.', color: 'border-slate-600' },
            { level: 'L6', name: 'Government Operations', desc: 'Digital resident registries, benefit workflows, committee execution, and public service portals.', color: 'border-slate-700' },
            { level: 'L5', name: 'Asset & Capital Markets', desc: 'Stablecoin issuance, bond rails, land tokenization, and institutional-grade programmable assets.', color: 'border-slate-800' },
            { level: 'L4', name: 'Payments & Treasury', desc: 'Treasury sweeps, merchant rails, payout operations, ATM integrations, and programmable settlement flows.', color: 'border-slate-800' },
	            { level: 'L3', name: 'Institutional Custody', desc: 'Seedless MPC wallets, deep cold storage, offline cards, and recovery layers bound to verified access.', color: 'border-fc-gold/30' },
            { level: 'L2', name: 'Identity & Compliance', desc: 'Global identity credentials, zk-KYC proofs, cryptographic signatures, policy gates, and reputation graphs.', color: 'border-cyan-600/30' },
            { level: 'L1', name: 'Execution Base Layer', desc: 'FC Chain HTTS consensus, validator sequencing, and parallel execution state for sub-second finality.', color: 'border-cyan-600/30' }
          ].map((layer, index) => (
            <motion.div key={layer.level} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: index * 0.1 }} className="relative group">
                
              {/* PCB Node */}
              <div className="hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 w-4 h-4 border border-cyan-500/50 bg-[#020306] z-10 justify-center items-center group-hover:bg-cyan-500 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all duration-500">
                <div className="w-1 h-1 bg-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              {/* PCB Connection Line */}
              <div className="hidden md:block absolute -left-12 top-1/2 -translate-y-1/2 w-12 h-px bg-cyan-500/30 group-hover:bg-cyan-400 group-hover:w-[48px] transition-all duration-500 z-0 origin-left"></div>

              <TiltCard intensity={4}>
              <div className={`agency-panel p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 border-l-2 md:border-l-4 ${layer.color} hover:bg-slate-900/80 transition-all duration-500 relative overflow-hidden bg-[#020617]/90 md:ml-4 group/inner shadow-md hover:shadow-lg border border-slate-700`}>
                {/* Sub-surface Scan Sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/[0.04] via-fc-gold/[0.015] to-transparent opacity-0 group-hover/inner:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                <div className="text-2xl md:text-5xl font-serif font-light text-slate-700 group-hover/inner:text-white transition-colors duration-500 w-24 relative z-10">{layer.level}</div>
                <div className="flex-1 border-b border-slate-800 pb-2 group-hover/inner:border-transparent transition-colors duration-500 relative z-10">
                  <h4 className="text-[13px] font-bold tracking-[0.3em] uppercase text-white mb-3 group-hover/inner:text-cyan-600 transition-colors">{layer.name}</h4>
                  <p className="text-[11px] md:text-[13px] font-mono tracking-[0.1em] text-slate-400 uppercase leading-relaxed">{layer.desc}</p>
                </div>
              </div>
              </TiltCard>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};
