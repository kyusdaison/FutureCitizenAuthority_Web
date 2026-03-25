import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { HolographicGlobe } from '../components/HolographicGlobe';
import { FadeInUp } from '../components/FadeInUp';
import { MagneticButton } from '../components/MagneticButton';
import { HexGridBackground } from '../components/HexGridBackground';
import { NetworkMatrix } from '../components/NetworkMatrix';

export const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const opacityHeroText = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const yHeroText = useTransform(scrollYProgress, [0, 0.15], [0, 100]);

  return (
    <section id="vision" className="min-h-screen w-full flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* HUD Elements */}
      <div className="absolute top-1/4 left-12 hidden xl:flex flex-col gap-2 text-left opacity-60">
         <div className="text-[10px] font-mono tracking-[0.4em] text-slate-500 uppercase">SYS.COORD <span className="text-slate-700">//</span> 45.92.110</div>
         <div className="text-[10px] font-mono tracking-[0.4em] text-yellow-500 uppercase">NET.STATUS <span className="text-slate-700">//</span> OPTIMAL</div>
         <div className="w-16 h-px bg-slate-800 mt-2"></div>
      </div>
      
      <div className="absolute bottom-1/3 right-12 hidden xl:flex flex-col gap-2 text-right opacity-60">
         <div className="text-[10px] font-mono tracking-[0.4em] text-fc-gold uppercase"><span className="text-slate-700">//</span> PROTOCOL ZKP-MPC</div>
         <div className="text-[10px] font-mono tracking-[0.4em] text-slate-500 uppercase"><span className="text-slate-700">//</span> SHARD ALPHA-7</div>
         <div className="w-16 h-px bg-slate-800 mt-2 ml-auto"></div>
      </div>
      
      {/* Hex Grid and Node Network Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <NetworkMatrix />
        <HexGridBackground />
        <HolographicGlobe />
      </div>

      {/* Vertical Label */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden 2xl:block opacity-[0.05] rotate-180 pointer-events-none vertical-text">
         <h2 className="text-[8rem] font-serif font-black tracking-tighter uppercase text-white mix-blend-overlay">
           <span>DECLARATION</span>
         </h2>
      </div>

      <motion.div style={{ opacity: opacityHeroText, y: yHeroText }} className="text-center mt-20 md:mt-0 w-full max-w-7xl mx-auto flex flex-col items-center">
        
        <FadeInUp delay={0.8}>
          <MagneticButton intensity={0.2}>
            <button className="premium-btn px-12 py-5 auth-glass-panel rounded-sm" data-text="INITIATE CLEARANCE">
              <span className="relative z-10 text-[11px] font-mono tracking-[0.5em] text-gold-gradient uppercase">INITIATE CLEARANCE</span>
            </button>
          </MagneticButton>
        </FadeInUp>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6.5rem] font-serif font-light leading-[1.1] tracking-widest drop-shadow-md text-white my-12 text-center"
        >
          FUTURE CITIZEN<br/>
          <span className="text-gold-gradient font-serif italic tracking-[0.1em] font-normal">
            AUTHORITY
          </span>
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.6 }} className="mt-4 max-w-2xl flex flex-col items-center relative z-20">
          <div className="w-px h-16 bg-gradient-to-b from-slate-800 to-transparent mb-8 w-[1px]"></div>
          <p className="text-[11px] md:text-[13px] font-mono tracking-[0.25em] text-slate-300 uppercase leading-[2.5] text-center max-w-xl auth-glass-panel border-gold-glow border-t p-8 rounded-sm">
            The official ledger of <span className="text-gold-gradient font-bold drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">State Identity</span> and <span className="text-gold-gradient font-bold drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">Public Trust</span>. A parallelized L1 architecture merging sub-second finality with sovereign regulatory compliance.
          </p>
        </motion.div>

      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 2 }} className="absolute bottom-16 flex flex-col items-center gap-4 z-20">
        <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-slate-500">ENGAGE PROTOCOL</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-4 h-4 text-cyan-500/80" />
        </motion.div>
      </motion.div>
      
      {/* Infinite Marquee Ticker */}
      <div className="absolute bottom-0 w-[200vw] left-0 h-10 border-t border-slate-800 bg-slate-950 flex items-center overflow-hidden z-20">
        <div className="animate-marquee flex gap-12 text-[9px] font-mono tracking-[0.3em] text-slate-500 uppercase">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex gap-12 whitespace-nowrap">
              <span>// MAINNET TPS: 140,000+</span>
              <span>// TTF: 400ms</span>
              <span>// ACTIVE PROTOCOLS: 2,048</span>
              <span>// EXECUTION: SECURE ENCLAVE</span>
              <span>// CLASSIFICATION: UNRESTRICTED // NATIVE ASSET: $FCC</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
