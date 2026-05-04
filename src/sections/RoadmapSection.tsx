import { motion, useScroll, useTransform } from 'framer-motion';
import { TiltCard } from '../components/TiltCard';
import { FadeInUp } from '../components/FadeInUp';
import { CipherHeading } from '../components/CipherHeading';

export const RoadmapSection = () => {
  const { scrollYProgress } = useScroll();
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section id="roadmap" className="py-24 px-6 lg:px-12 bg-[#020306] border-y border-white/5 relative overflow-hidden">
      {/* Giant Watermark */}
      <motion.div style={{ y: yParallaxSlow }} className="absolute left-[20%] top-[40%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.015] font-display font-black text-[40vw] tracking-tighter text-white mix-blend-overlay z-0">
	         DEPLOY
      </motion.div>
      <div className="max-w-7xl mx-auto relative z-10">
        <FadeInUp>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-fc-gold/50"></div>
            <h2 className="text-[10px] font-bold tracking-[0.5em] text-fc-gold uppercase">
              <CipherHeading text="10 // Strategic Deployment" />
            </h2>
            <div className="w-12 h-px bg-fc-gold/50"></div>
          </div>
          <h3 className="text-5xl md:text-7xl font-serif font-light tracking-tight mb-24 text-center drop-shadow-lg text-white">
            <CipherHeading text="The Phased " className="inline-block" /><br/>
            <span className="italic text-fc-gold font-serif"><CipherHeading text="Blueprint." /></span>
          </h3>
        </FadeInUp>
        
        <div className="relative pt-12 md:pt-16">
          {/* Horizontal / Vertical Timeline Connection Line */}
          <div className="hidden md:block absolute top-[90px] left-[10%] right-[10%] h-px bg-white/10 z-0 overflow-hidden">
             <div className="w-1/3 h-full bg-fc-gold shadow-[0_0_15px_#c59a45] animate-[moveRight_4s_linear_infinite]"></div>
          </div>
          <div className="md:hidden absolute left-[30px] top-0 bottom-0 w-px bg-white/10 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            
            <FadeInUp delay={0.2} className="h-full">
              <TiltCard intensity={8} className="h-full">
                <div className="h-full agency-panel p-8 md:p-10 relative overflow-hidden group">
                  {/* Timeline dot */}
                  <div className="absolute top-0 md:-top-3.5 left-6 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-[#020306] border border-cyan-500 z-20 group-hover:bg-cyan-500 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                  
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent group-hover:via-cyan-500 transition-all duration-700"></div>
	                  <h4 className="text-2xl md:text-3xl font-serif font-light text-white mb-3 mt-4 md:mt-0">Phase 1: Foundation</h4>
                  <p className="text-[10px] font-bold tracking-[0.4em] text-cyan-500 uppercase mb-8 pb-4 border-b border-white/5">2026 Q2 - 2026 Q4</p>
	                  <p className="text-sm text-gray-400 font-light leading-[1.8] tracking-wide">Establish L1 consensus, verifiable identity profiles, Shamir MPC institutional wallets, and cash-backed stablecoin rails. Formalize the baseline infrastructure for controlled pilots.</p>
                </div>
              </TiltCard>
            </FadeInUp>
            
            <FadeInUp delay={0.4} className="h-full">
              <TiltCard intensity={8} className="h-full">
                <div className="h-full agency-panel p-8 md:p-10 relative overflow-hidden group mt-0 md:mt-16">
                  {/* Timeline dot */}
                  <div className="absolute top-0 md:-top-3.5 left-6 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-[#020306] border border-fc-gold z-20 group-hover:bg-fc-gold transition-colors shadow-[0_0_10px_rgba(197,154,69,0.5)]"></div>

                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-fc-gold/20 to-transparent group-hover:via-fc-gold transition-all duration-700"></div>
	                  <h4 className="text-2xl md:text-3xl font-serif font-light text-white mb-3 mt-4 md:mt-0">Phase 2: Institutional Pilots</h4>
                  <p className="text-[10px] font-bold tracking-[0.4em] text-fc-gold uppercase mb-8 pb-4 border-b border-white/5">2027 Q1 - 2027 Q3</p>
	                  <p className="text-sm text-gray-400 font-light leading-[1.8] tracking-wide">Deploy government digital portals, institutional payment clearance channels, and regional POS integrations through staged pilots with defined operating owners and review checkpoints.</p>
                </div>
              </TiltCard>
            </FadeInUp>
            
            <FadeInUp delay={0.6} className="h-full">
              <TiltCard intensity={8} className="h-full">
                <div className="h-full agency-panel p-8 md:p-10 relative overflow-hidden group mt-0 md:mt-32">
                  {/* Timeline dot */}
                  <div className="absolute top-0 md:-top-3.5 left-6 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-[#020306] border border-cyan-500 z-20 group-hover:bg-cyan-500 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>

                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent group-hover:via-cyan-500 transition-all duration-700"></div>
	                  <h4 className="text-2xl md:text-3xl font-serif font-light text-white mb-3 mt-4 md:mt-0">Phase 3: Scale & Interoperability</h4>
                  <p className="text-[10px] font-bold tracking-[0.4em] text-cyan-500 uppercase mb-8 pb-4 border-b border-white/5">2027 Q4 - 2028 Q2</p>
	                  <p className="text-sm text-gray-400 font-light leading-[1.8] tracking-wide">Expand real-world asset workflows, automated capital controls, and on-chain risk monitoring into interoperable Special Economic Zone and institutional service environments.</p>
                </div>
              </TiltCard>
            </FadeInUp>

          </div>
        </div>
      </div>
    </section>
  );
};
