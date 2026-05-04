import { motion, useScroll, useTransform } from 'framer-motion';
import { TiltCard } from '../components/TiltCard';
import { CipherHeading } from '../components/CipherHeading';

export const CollectiveSection = () => {
  const { scrollYProgress } = useScroll();
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section id="collective" className="py-32 px-6 lg:px-12 bg-transparent border-t border-slate-800 relative overflow-hidden flex flex-col items-center">
      {/* Giant Watermark */}
      <motion.div style={{ y: yParallaxSlow }} className="absolute right-[10%] top-[30%] translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.015] font-serif font-black text-[30vw] tracking-tighter text-white mix-blend-overlay z-0">
         FCA
      </motion.div>
      
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/5 blur-[150px] mix-blend-screen rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"></div>

      {/* Vertical Label */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden 2xl:block opacity-[0.03] pointer-events-none vertical-text z-0">
         <h2 className="text-[8rem] font-serif font-black tracking-tighter uppercase text-white mix-blend-overlay">
	           <span>09 OPERATIONS</span>
         </h2>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="absolute -top-6 right-0 text-[10px] font-mono tracking-[0.4em] text-slate-500 uppercase flex items-center gap-2">
          <span className="w-2 h-2 bg-slate-700"></span>
          [CLASSIFICATION: UNRESTRICTED]
        </div>
        <div className="mb-20 mt-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-slate-700"></div>
            <h2 className="text-[10px] font-bold tracking-[0.5em] text-slate-500 uppercase">
	              <CipherHeading text="09 // Architecture & Operations" />
            </h2>
          </div>
          <h3 className="text-5xl md:text-7xl font-serif font-light tracking-tight drop-shadow-lg mb-8 text-white">
            <CipherHeading text="FCA Engineering " className="inline-block" /><br/>
            <span className="italic text-slate-500 font-serif"><CipherHeading text="&amp; Operations." /></span>
          </h3>
          <p className="text-gray-400 font-light leading-[1.8] tracking-wide text-lg max-w-2xl">
	            A globally distributed engineering and operations group covering applied cryptography, scalable systems, institutional UX, and deployment support for the identity, wallet, and governance stack.
          </p>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Box 1: Scale */}
          <TiltCard intensity={5} className="md:col-span-2 md:row-span-2">
            <div className="h-full agency-panel p-10 md:p-16 flex flex-col justify-between relative min-h-[400px] group overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none mix-blend-overlay"></div>
              
              <div className="relative z-10">
	                <h4 className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-cyan-600 mb-4 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">ACTIVE OPERATING GROUPS</h4>
                <div className="text-7xl md:text-9xl font-serif font-light tracking-tighter text-white mb-2 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all">36</div>
                <div className="text-[11px] md:text-xs tracking-widest uppercase text-slate-400 font-mono">Core Contributors</div>
              </div>
              
              <div className="relative z-10 mt-16 md:mt-24 grid grid-cols-2 gap-8 border-t border-slate-800 pt-8">
                <div>
                  <div className="text-3xl md:text-4xl font-serif text-white mb-2">12</div>
                  <div className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Active Geozones</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-serif text-white mb-2">0</div>
	                  <div className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-fc-gold font-bold">Critical Incidents</div>
                </div>
              </div>

              {/* Abstract Geometric Hover Element */}
              <div className="absolute right-0 top-1/2 w-[400px] h-[400px] border border-white/5 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-1000 flex items-center justify-center opacity-30 group-hover:opacity-100 mix-blend-screen pointer-events-none">
                <div className="w-[300px] h-[300px] border border-cyan-500/20 rounded-full flex items-center justify-center animate-[spin_30s_linear_infinite]">
                  <div className="w-[200px] h-[200px] border border-fc-gold/20 rounded-full border-dashed animate-[spin_20s_linear_infinite_reverse]"></div>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Box 2: ZKP */}
          <TiltCard intensity={10} className="h-full">
            <div className="h-full agency-panel p-8 flex flex-col justify-end relative min-h-[200px] md:min-h-[250px] group overflow-hidden border-t border-slate-700">
              <div className="absolute top-8 right-8 text-4xl md:text-5xl font-display font-black tracking-tighter text-white/10 group-hover:text-white/30 transition-colors">12</div>
              <div className="relative z-10">
                <h5 className="text-white text-lg font-serif mb-2 group-hover:text-fc-gold transition-colors">Cryptography</h5>
	                <p className="text-xs text-gray-400 leading-relaxed font-light">ZKP and consensus researchers focused on privacy-preserving verification, finality, and scalable public infrastructure.</p>
              </div>
            </div>
          </TiltCard>

          {/* Box 3: Systems */}
          <TiltCard intensity={10} className="h-full">
            <div className="h-full agency-panel p-8 flex flex-col justify-end relative min-h-[200px] md:min-h-[250px] group overflow-hidden border-t border-slate-700 hover:border-slate-500">
              <div className="absolute top-8 right-8 text-4xl md:text-5xl font-display font-black tracking-tighter text-white/10 group-hover:text-white/30 transition-colors">14</div>
              <div className="relative z-10">
                <h5 className="text-white text-lg font-serif mb-2">Core Systems</h5>
	                <p className="text-xs text-gray-400 leading-relaxed font-light">Rust and Go engineers deploying regional execution services, validator tooling, and operational reliability systems.</p>
              </div>
            </div>
          </TiltCard>
          
          {/* Box 4: Design & Ecosystem */}
          <TiltCard intensity={10} className="h-full">
            <div className="h-full agency-panel p-8 flex flex-col justify-end relative min-h-[200px] md:min-h-[250px] group overflow-hidden border-t border-slate-700">
              <div className="absolute top-8 right-8 text-4xl md:text-5xl font-serif font-light tracking-tighter text-cyan-500/10 group-hover:text-cyan-500/30 transition-colors">10</div>
              <div className="relative z-10">
                <h5 className="text-white text-lg font-serif mb-2 group-hover:text-cyan-600 transition-colors">Human-Machine Interfaces</h5>
	                <p className="text-xs text-gray-400 leading-relaxed font-light">Product and interface specialists designing secure operator workflows for institutional users.</p>
              </div>
              
              {/* Horizontal scanning laser line */}
              <div className="absolute left-0 right-0 h-[1px] bg-cyan-500 shadow-[0_0_15px_#06b6d4] top-[10%] opacity-0 group-hover:opacity-100 animate-[scan_3s_ease-in-out_infinite] pointer-events-none"></div>
            </div>
          </TiltCard>

        </div>
      </div>
    </section>
  );
};
