import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FadeInUp } from '../components/FadeInUp';
import { MagneticButton } from '../components/MagneticButton';
import { lazy, Suspense } from 'react';
import { HexGridBackground } from '../components/HexGridBackground';

const NetworkMatrix = lazy(() => import('../components/NetworkMatrix').then(module => ({ default: module.NetworkMatrix })));

export const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const opacityHeroText = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const yHeroText = useTransform(scrollYProgress, [0, 0.15], [0, 100]);

  return (
    <section id="vision" className="min-h-screen w-full flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* HUD Elements */}
      <div className="absolute top-1/4 left-12 hidden xl:flex flex-col gap-2 text-left opacity-80">
         <div className="text-[10px] font-mono tracking-[0.5em] text-slate-400 uppercase drop-shadow-md">SYS.COORD <span className="text-slate-600">//</span> 45.92.110</div>
         <div className="text-[10px] font-mono tracking-[0.5em] text-fc-gold uppercase drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">NET.STATUS <span className="text-slate-600">//</span> OPTIMAL</div>
         <div className="w-32 h-px bg-gradient-to-r from-fc-gold/40 to-transparent mt-2"></div>
      </div>
      
      <div className="absolute bottom-1/3 right-12 hidden xl:flex flex-col gap-2 text-right opacity-80">
         <div className="text-[10px] font-mono tracking-[0.5em] text-fc-gold uppercase drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"><span className="text-slate-600">//</span> PROTOCOL ZKP-MPC</div>
         <div className="text-[10px] font-mono tracking-[0.5em] text-slate-400 uppercase drop-shadow-md"><span className="text-slate-600">//</span> SHARD ALPHA-7</div>
         <div className="w-32 h-px bg-gradient-to-l from-fc-gold/40 to-transparent mt-2 ml-auto"></div>
      </div>
      
      {/* Hex Grid and Node Network Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-transparent" />}>
          <NetworkMatrix />
        </Suspense>
        <HexGridBackground />
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
          <div className="w-px h-16 bg-gradient-to-b from-fc-gold/20 to-transparent mb-8"></div>
          <p className="text-[11px] md:text-[13px] font-mono tracking-[0.3em] text-slate-300 uppercase leading-[2.5] text-center max-w-2xl auth-glass-panel border-t border-[rgba(212,175,55,0.15)] p-8 rounded-sm">
            The <span className="text-gold-gradient font-bold drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">Sovereign Digital Infrastructure</span> ecosystem. A high-performance public chain matrix integrating Web3 Identity, programmable finance, and sovereign government services.
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
      <div className="absolute bottom-0 w-[200vw] left-0 h-10 border-t border-white/5 bg-[#020306] flex items-center overflow-hidden z-20">
        <div className="hairline-divider-h absolute top-0 left-0"></div>
        <div className="animate-marquee flex gap-16 text-[9px] font-mono tracking-[0.4em] text-slate-500 uppercase">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex gap-16 whitespace-nowrap">
              <span>// MAINNET TPS: 50,000+ (HTTS)</span>
              <span>// TTF: 0.5 - 2.0 SECONDS</span>
              <span>// CORE PROTOCOLS: WEB3 ID & ZKP-MPC</span>
              <span>// EXECUTION: SOVEREIGN ENCLAVE</span>
              <span>// CLASSIFICATION: UNRESTRICTED <span className="text-fc-gold opacity-50 ml-2">// NATIVE ASSET: $FCC</span></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
