import { motion, useScroll, useTransform } from 'framer-motion';
import { Scale } from 'lucide-react';
import { TiltCard } from '../components/TiltCard';
import { CipherHeading } from '../components/CipherHeading';
import { GlitchText } from '../components/GlitchText';

export const GovernanceSection = () => {
  const { scrollYProgress } = useScroll();
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section id="governance" className="py-24 px-6 lg:px-12 bg-[#020306] relative overflow-hidden">
      {/* Giant Watermark */}
      <motion.div style={{ y: yParallaxFast }} className="absolute left-[70%] top-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.015] font-display font-black text-[40vw] tracking-tighter text-white mix-blend-overlay z-0">
         DAO
      </motion.div>
      {/* Vertical Label */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden 2xl:block opacity-[0.03] rotate-180 pointer-events-none vertical-text">
         <h2 className="text-[8rem] font-display font-black tracking-tighter uppercase text-white mix-blend-overlay">
           <GlitchText text="05 GOVERNANCE" isActive={true} />
         </h2>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center relative z-10">
        
        <div className="w-full md:w-1/2 relative flex flex-col">
           <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2 }} className="w-full h-[350px] md:h-[450px] mb-12 relative overflow-hidden border border-white/5 group bg-black">
             <img src="/fcc_governance_scale.webp" alt="DAO Scale" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#020306] via-[#020306]/20 to-transparent"></div>
           </motion.div>
           <div className="relative z-10 md:-mt-24 px-6 md:px-0">
             <Scale className="w-10 h-10 text-fc-gold/50 mb-8" />
             <div className="flex items-center gap-4 mb-6">
               <div className="w-8 h-px bg-white/30"></div>
              <h2 className="text-[10px] font-bold tracking-[0.5em] text-white/50 uppercase">
                <CipherHeading text="05 // Statecraft & DAO" />
              </h2>
            </div>
             <h3 className="text-5xl md:text-7xl font-serif font-light tracking-tight drop-shadow-lg mb-8 text-white">
               <CipherHeading text="Institutional " className="inline-block" /><br/>
               <span className="italic text-gray-500 font-serif"><CipherHeading text="Governance." /></span>
             </h3>
             <p className="text-gray-400 font-light leading-[1.8] tracking-wide text-lg">
               Future Citizen operates essentially as a highly fortified <strong className="text-white font-medium">Decentralized Autonomous Organization (DAO)</strong>. All sovereign technological and strategic shifts are cryptographically determined via our verifiable on-chain committee charter framework.
             </p>
           </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-8">
           <TiltCard intensity={10}>
             <div className="p-8 border-l border-white/10 hover:border-fc-gold/50 transition-colors duration-500 group bg-white/[0.02] h-full">
               <h4 className="text-xl font-serif font-light text-white mb-4 group-hover:text-fc-gold transition-colors">Specialized Committees</h4>
               <p className="text-sm text-gray-400 leading-[1.8] font-light tracking-wide">Macro-structure is completely compartmentalized into isolated professional directorates: A dedicated Legal Enforcement Team, Commercialization & Operations Board, an Institutional Finance Center, and the Core Protocol R&D Collective.</p>
             </div>
           </TiltCard>
           <TiltCard intensity={10}>
             <div className="p-8 border-l border-white/10 hover:border-fc-gold/50 transition-colors duration-500 group bg-white/[0.02] h-full">
               <h4 className="text-xl font-serif font-light text-white mb-4 group-hover:text-fc-gold transition-colors">Uncompromising Transparency</h4>
               <p className="text-sm text-gray-400 leading-[1.8] font-light tracking-wide">Mandated strict ledger transparency to fortify institutional compliance. Requires routine annual cryptographically-verified structural audits, alongside mandatory ad-hoc open telemetry broadcasts for all major security updates.</p>
             </div>
           </TiltCard>
        </div>
      </div>
    </section>
  );
};
