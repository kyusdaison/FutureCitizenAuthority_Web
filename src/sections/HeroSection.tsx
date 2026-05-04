import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FadeInUp } from '../components/FadeInUp';
import { MagneticButton } from '../components/MagneticButton';
import { lazy, Suspense } from 'react';
import { HexGridBackground } from '../components/HexGridBackground';

const NetworkMatrix = lazy(() => import('../components/NetworkMatrix').then(module => ({ default: module.NetworkMatrix })));

const institutionalSignals = [
  'Reviewable identity',
  'Audit trails',
  'Data boundaries',
  'Pilot readiness',
];

const briefingFacts = [
  {
    label: 'Audience',
    value: 'Public agencies, regulated institutions, and infrastructure partners',
  },
  {
    label: 'Primary control',
    value: 'Verified identity before wallet, treasury, or service execution',
  },
  {
    label: 'Deployment motion',
    value: 'One bounded pilot, measurable controls, then scale decision',
  },
];

export const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const opacityHeroText = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const yHeroText = useTransform(scrollYProgress, [0, 0.15], [0, 100]);
  const navigate = useNavigate();

  return (
    <section id="hero" className="min-h-screen w-full flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* HUD Elements */}
      <div className="absolute top-1/4 left-12 hidden xl:flex flex-col gap-2 text-left opacity-80">
         <div className="text-[10px] font-mono tracking-[0.5em] text-slate-400 uppercase drop-shadow-md">REVIEW.COORD <span className="text-slate-600">//</span> 45.92.110</div>
         <div className="text-[10px] font-mono tracking-[0.5em] text-fc-gold uppercase drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">SERVICE.STATUS <span className="text-slate-600">//</span> READY</div>
         <div className="w-32 h-px bg-gradient-to-r from-fc-gold/40 to-transparent mt-2"></div>
      </div>
      
      <div className="absolute bottom-1/3 right-12 hidden xl:flex flex-col gap-2 text-right opacity-80">
         <div className="text-[10px] font-mono tracking-[0.5em] text-fc-gold uppercase drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"><span className="text-slate-600">//</span> CONTROL ZKP-MPC</div>
	         <div className="text-[10px] font-mono tracking-[0.5em] text-slate-400 uppercase drop-shadow-md"><span className="text-slate-600">//</span> PILOT REGION READY</div>
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
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden 2xl:block opacity-[0.018] rotate-180 pointer-events-none vertical-text">
         <h2 className="text-[7rem] font-serif font-black tracking-tighter uppercase text-white mix-blend-overlay">
           <span>DECLARATION</span>
         </h2>
      </div>

      <motion.div style={{ opacity: opacityHeroText, y: yHeroText }} className="text-center mt-20 md:mt-0 w-full max-w-7xl mx-auto flex flex-col items-center">
        
        <FadeInUp delay={0.8}>
          <MagneticButton intensity={0.2}>
            <div className="premium-btn px-12 py-5 auth-glass-panel rounded-sm">
              <span className="relative z-10 text-[11px] font-mono tracking-[0.5em] text-gold-gradient uppercase">IDENTITY LAYER ACTIVE</span>
            </div>
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
            The <span className="text-gold-gradient font-bold drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">Digital Governance Infrastructure</span> ecosystem. Identity-first rails for wallets, programmable finance, compliance proofs, and verifiable public services.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <MagneticButton intensity={0.18}>
              <button
                type="button"
                onClick={() => navigate('/identity')}
                className="premium-btn px-10 py-4 auth-glass-panel rounded-sm"
              >
	                <span className="relative z-10 text-[11px] font-mono tracking-[0.4em] text-gold-gradient uppercase">Review Identity</span>
              </button>
            </MagneticButton>
            <MagneticButton intensity={0.14}>
              <button
                type="button"
                onClick={() => document.getElementById('model')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="px-10 py-4 border border-white/10 bg-[#020617]/80 text-[11px] font-mono tracking-[0.4em] text-slate-300 uppercase transition-colors hover:border-cyan-500/40 hover:text-white"
              >
	                See Operating Model
              </button>
            </MagneticButton>
          </div>
	          <p className="mt-4 text-[10px] font-mono tracking-[0.35em] uppercase text-slate-500 text-center">
	            Identity onboarding for access, governance, and verifiable services.
	          </p>
            <div className="mt-8 grid w-full max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
              {institutionalSignals.map((signal) => (
                <div key={signal} className="border border-white/10 bg-[#020617]/75 px-4 py-3 text-center backdrop-blur-md">
                  <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-slate-400">{signal}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 grid w-full max-w-5xl grid-cols-1 gap-3 lg:grid-cols-3">
              {briefingFacts.map((fact) => (
                <div key={fact.label} className="border border-white/10 bg-[#020617]/80 p-4 text-left backdrop-blur-md">
                  <div className="mb-2 text-[9px] font-mono uppercase tracking-[0.28em] text-fc-gold/80">{fact.label}</div>
                  <div className="text-xs leading-relaxed text-slate-300">{fact.value}</div>
                </div>
              ))}
            </div>
	        </motion.div>

      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 2 }} className="absolute bottom-16 flex flex-col items-center gap-4 z-20">
	        <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-slate-500">REVIEW FRAMEWORK</span>
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
              <span>// SETTLEMENT CAPACITY: 50,000+ TPS</span>
              <span>// TARGET FINALITY: 0.5 - 2.0 SECONDS</span>
              <span>// CORE CONTROLS: IDENTITY & ZKP-MPC</span>
              <span>// EXECUTION: GOVERNANCE ENCLAVE</span>
              <span>// REVIEW STATUS: PILOT READY <span className="text-fc-gold opacity-50 ml-2">// NATIVE DENOMINATION: $FCC</span></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
