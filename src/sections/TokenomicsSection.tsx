import { motion, useScroll, useTransform } from 'framer-motion';
import { TiltCard } from '../components/TiltCard';
import { FadeInUp } from '../components/FadeInUp';
import { CipherHeading } from '../components/CipherHeading';
import { GlitchText } from '../components/GlitchText';

export const TokenomicsSection = () => {
  const { scrollYProgress } = useScroll();
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section id="tokenomics" className="py-24 px-6 lg:px-12 border-y border-white/5 bg-[#020306] relative overflow-hidden">
      {/* Blueprint Background Dots */}
      <div className="absolute inset-0 bg-tactical-dots opacity-40 pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020306] via-transparent to-[#020306] pointer-events-none z-0"></div>

      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-fc-gold/5 blur-[150px] mix-blend-screen rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"></div>
      
      {/* Giant Watermark */}
      <motion.div style={{ y: yParallaxSlow }} className="absolute left-[50%] top-[60%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.015] font-display font-black text-[40vw] tracking-tighter text-white mix-blend-overlay z-0">
         FCC
      </motion.div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden 2xl:block opacity-[0.03] pointer-events-none vertical-text">
         <h2 className="text-[8rem] font-display font-black tracking-tighter uppercase text-white mix-blend-overlay">
           <GlitchText text="07 ECONOMICS" isActive={true} />
         </h2>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <FadeInUp>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-fc-gold/50"></div>
            <h2 className="text-[10px] font-bold tracking-[0.5em] text-fc-gold uppercase">
              <CipherHeading text="07 // Network Economics" />
            </h2>
            <div className="w-12 h-px bg-fc-gold/50"></div>
          </div>
          <h3 className="text-5xl md:text-7xl font-serif font-light tracking-tight mb-24 text-center drop-shadow-lg text-white">
            <CipherHeading text="The " className="inline-block" />
            <span className="text-gradient-gold italic font-serif"><CipherHeading text="5 Billion" /></span>
            <CipherHeading text=" Asset." className="inline-block" />
          </h3>
        </FadeInUp>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full h-auto">
          
          {/* Token Presentation & Stats */}
          <div className="md:col-span-5 flex flex-col relative group">
            <FadeInUp delay={0.2} className="h-full">
              <TiltCard intensity={10} className="h-full">
                <div className="w-full h-[300px] md:h-[400px] mb-6 relative overflow-hidden flex items-center justify-center border border-white/10 bg-[#040508]">
                   <div className="absolute inset-0 bg-fc-gold/10 blur-[80px] group-hover:bg-fc-gold/20 transition-colors duration-1000"></div>
                   <motion.img 
                     animate={{ y: [0, -15, 0] }} 
                     transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} 
                     src="/fcc_token_asset.webp" 
                     alt="FCC Token" 
                     className="w-[85%] h-auto object-contain relative z-10 drop-shadow-[0_0_50px_rgba(197,154,69,0.3)] group-hover:scale-110 transition-transform duration-1000" 
                   />
                </div>
              </TiltCard>
              <div className="agency-panel p-10 pr-12 flex-1 flex flex-col justify-center border-l-4 border-fc-gold relative z-20 md:-mt-16 mx-4 md:mx-6 bg-[#020306]/95 backdrop-blur-2xl">
                <span className="text-[10px] font-bold tracking-[0.4em] text-gray-500 uppercase mb-6 block border-b border-white/10 pb-4">Native Denomination</span>
                <h4 className="text-5xl lg:text-7xl font-serif font-light text-white mb-6">$FCC</h4>
                <p className="text-sm text-gray-400 font-light leading-[1.8] tracking-wide">
                  The solitary, foundational native token powering the entire distributed network. No convoluted dual-token arbitrage structures. FCC intrinsically fuels transaction gas computationally, establishes node staking rewards, and drives absolute on-chain decentralized governance voting logic.
                </p>
              </div>
            </FadeInUp>
          </div>

          {/* Bento Box Distribution Grid */}
          <div className="md:col-span-7 grid grid-cols-2 grid-rows-3 gap-4 md:gap-6 relative z-10 w-full min-h-[400px]">
            
            {/* 74% Bento Block (Large) */}
            <FadeInUp delay={0.3} className="col-span-2 row-span-1 h-full">
              <TiltCard intensity={8} className="h-full">
                <div className="h-full agency-panel p-8 md:p-10 group hover:border-fc-gold/50 transition-colors bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fc-gold/10 to-transparent flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="text-5xl md:text-6xl font-serif text-white mb-2 group-hover:text-fc-gold transition-colors drop-shadow-md">74%</div>
                    <div className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-gray-400">Ecosystem Incentive</div>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-white/10"></div>
                  <div className="text-xs text-gray-500 md:max-w-[280px] md:text-right font-light leading-relaxed">3.7 Billion FCC. Reserved entirely as a cryptographic reward pool for active L1 node miners. 800 million released Year 1, algorithmic halving strict schedule every 3 years.</div>
                </div>
              </TiltCard>
            </FadeInUp>
            
            {/* 10% Bento Block (Tall) */}
            <FadeInUp delay={0.4} className="col-span-2 md:col-span-1 row-span-2 h-full">
              <TiltCard intensity={12} className="h-full">
                <div className="h-full agency-panel p-6 md:p-8 flex flex-col justify-end group hover:border-white/30 transition-colors bg-white/[0.01] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] rounded-full pointer-events-none"></div>
                  <div className="mb-auto mt-2">
                    <div className="w-1.5 h-1.5 border border-cyan-500 bg-cyan-500/20 glow glow-cyan-500/50"></div>
                  </div>
                  <div className="text-4xl md:text-5xl font-serif text-white mb-2 mt-12 md:mt-24">10%</div>
                  <div className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-4">Early Presale</div>
                  <p className="text-[10px] text-gray-500 font-light leading-relaxed">500 Million FCC. Allocated to immediately fund core fundamental zero-knowledge technical research, physical data center hardware deployments, and sovereign structural operations.</p>
                </div>
              </TiltCard>
            </FadeInUp>
            
            {/* Right side stacked blocks */}
            <div className="col-span-2 md:col-span-1 row-span-2 flex flex-col gap-4 md:gap-6">
              
              {/* 8% Top (Wide) */}
              <FadeInUp delay={0.5} className="flex-1 h-full">
                <TiltCard intensity={12} className="h-full">
                  <div className="h-full agency-panel p-6 md:p-8 group hover:border-white/30 transition-colors flex flex-col justify-center relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-fc-gold/5 blur-[40px] rounded-full pointer-events-none"></div>
                     <div className="text-3xl md:text-4xl font-serif text-white mb-1">8%</div>
                     <div className="text-[8px] md:text-[9px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-2">R&D Team</div>
                     <p className="text-[9px] text-gray-500 font-light leading-relaxed drop-shadow-sm">400M. Subject to an extreme, uncompromising 5-year mathematical lock-in contract.</p>
                  </div>
                </TiltCard>
              </FadeInUp>
              
              {/* 8% Bottom (Wide) */}
              <FadeInUp delay={0.6} className="flex-1 h-full">
                <TiltCard intensity={12} className="h-full">
                  <div className="h-full agency-panel p-6 md:p-8 group hover:border-white/30 transition-colors flex flex-col justify-center relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-[40px] rounded-full pointer-events-none"></div>
                     <div className="text-3xl md:text-4xl font-serif text-white mb-1">8%</div>
                     <div className="text-[8px] md:text-[9px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-2">Management Fund</div>
                     <p className="text-[9px] text-gray-500 font-light leading-relaxed drop-shadow-sm">400M. On-chain reserve treasury to systematically incentivize late-joining elite engineering talent.</p>
                  </div>
                </TiltCard>
              </FadeInUp>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
