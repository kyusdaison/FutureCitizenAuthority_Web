import { motion, useScroll, useTransform } from 'framer-motion';
import { Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TiltCard } from '../components/TiltCard';
import { CipherHeading } from '../components/CipherHeading';
import { GlitchText } from '../components/GlitchText';

export const GovernanceSection = () => {
  const { scrollYProgress } = useScroll();
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const navigate = useNavigate();

  return (
    <section id="governance" className="py-24 px-6 lg:px-12 bg-[#020306] relative overflow-hidden">
      {/* Giant Watermark */}
      <motion.div style={{ y: yParallaxFast }} className="absolute left-[70%] top-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.015] font-display font-black text-[40vw] tracking-tighter text-white mix-blend-overlay z-0">
         DAO
      </motion.div>
      {/* Vertical Label */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden 2xl:block opacity-[0.03] rotate-180 pointer-events-none vertical-text">
         <h2 className="text-[8rem] font-display font-black tracking-tighter uppercase text-white mix-blend-overlay">
           <GlitchText text="03 GOVERNANCE" isActive={true} />
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
                <CipherHeading text="03 // Governance Access" />
              </h2>
            </div>
             <h3 className="text-5xl md:text-7xl font-serif font-light tracking-tight drop-shadow-lg mb-8 text-white">
               <CipherHeading text="Verified " className="inline-block" /><br/>
               <span className="italic text-gray-500 font-serif"><CipherHeading text="Governance." /></span>
             </h3>
             <p className="text-gray-400 font-light leading-[1.8] tracking-wide text-lg">
               Identity-bound access flows into a fortified <strong className="text-white font-medium">on-chain governance framework</strong>. Verified operators, institutions, and committees can approve budgets, supervise treasury movement, and execute digital statecraft with attributable, auditable authority.
             </p>
             <div className="mt-8 flex flex-wrap gap-4">
               <button
                 type="button"
                 onClick={() => navigate('/dashboard')}
                 className="border border-fc-gold/30 bg-fc-gold/5 px-5 py-3 text-[10px] font-mono tracking-[0.3em] text-fc-gold uppercase transition-colors hover:border-fc-gold/60 hover:bg-fc-gold/10"
               >
                 Open Dashboard
               </button>
               <button
                 type="button"
                 onClick={() => navigate('/identity')}
                 className="border border-white/10 bg-white/[0.02] px-5 py-3 text-[10px] font-mono tracking-[0.3em] text-white uppercase transition-colors hover:border-white/25 hover:bg-white/[0.05]"
               >
                 Review Identity Access
               </button>
             </div>
           </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-8">
           <TiltCard intensity={10}>
             <div className="p-8 border-l border-white/10 hover:border-fc-gold/50 transition-colors duration-500 group bg-white/[0.02] h-full">
               <h4 className="text-xl font-serif font-light text-white mb-4 group-hover:text-fc-gold transition-colors">Verified Committees</h4>
               <p className="text-sm text-gray-400 leading-[1.8] font-light tracking-wide">Operational authority is segmented into credentialed committees for compliance, treasury, protocol R&amp;D, and service operations so every approval path has a named, attributable owner.</p>
             </div>
           </TiltCard>
           <TiltCard intensity={10}>
             <div className="p-8 border-l border-white/10 hover:border-fc-gold/50 transition-colors duration-500 group bg-white/[0.02] h-full">
               <h4 className="text-xl font-serif font-light text-white mb-4 group-hover:text-fc-gold transition-colors">Auditable Treasury Controls</h4>
               <p className="text-sm text-gray-400 leading-[1.8] font-light tracking-wide">Budget votes, policy changes, and treasury actions stay visible on-chain with cryptographically verifiable audit trails, making compliance review and institutional reporting first-class behaviors instead of afterthoughts.</p>
             </div>
           </TiltCard>
        </div>
      </div>
    </section>
  );
};
