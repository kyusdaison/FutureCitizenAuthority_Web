import { motion, useScroll, useTransform } from 'framer-motion';
import { Fingerprint, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TiltCard } from '../components/TiltCard';
import { FadeInUp } from '../components/FadeInUp';
import { HexGridBackground } from '../components/HexGridBackground';

export const IdentitySection = () => {
  const { scrollYProgress } = useScroll();
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const navigate = useNavigate();

  return (
    <section id="identity" className="py-24 px-6 lg:px-12 bg-transparent border-t border-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
      
      {/* Giant Watermark */}
      <motion.div style={{ y: yParallaxSlow }} className="absolute left-[80%] top-[40%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.015] font-display font-black text-[40vw] tracking-tighter text-white mix-blend-overlay z-0">
         PROOF
      </motion.div>
      <div className="absolute inset-0 z-0">
        <HexGridBackground />
      </div>

      {/* Vertical Label */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden 2xl:block opacity-[0.03] pointer-events-none vertical-text z-0">
         <h2 className="text-[8rem] font-serif font-black tracking-tighter uppercase text-white mix-blend-overlay">
           <span>03 IDENTITY</span>
         </h2>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="absolute -top-6 right-0 text-[10px] font-mono tracking-[0.4em] text-slate-500 uppercase flex items-center gap-2">
          <span className="w-2 h-2 bg-slate-700"></span>
          [CLASSIFICATION: UNRESTRICTED]
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch mt-8">
          
          <div className="lg:col-span-5 relative flex flex-col justify-center">
            <div className="absolute inset-0 bg-fc-gold/5 blur-[100px] rounded-full"></div>
            <FadeInUp className="h-full">
              <TiltCard intensity={5} className="h-full">
              <div className="agency-panel p-10 lg:p-12 relative border-l-4 border-l-fc-gold h-full flex flex-col justify-center bg-[#020617]/90 shadow-2xl">
               <Fingerprint className="w-10 h-10 text-fc-gold mb-8 opacity-80" />
               <h3 className="text-3xl font-serif font-light text-white mb-6 border-b border-slate-800 pb-6">
                 Identity Verification Layer
               </h3>
               <p className="text-sm text-gray-400 font-light leading-[1.8] tracking-wide mb-6">
	                 A standards-aligned credential architecture that binds verified identity primitives to service access, wallet permissions, and governance rules using <strong className="text-white font-medium">privacy-preserving proofs</strong>. In plain terms: a person or institution can prove eligibility without publishing raw personal records on public rails.
               </p>
               <div className="mb-8 border border-white/10 bg-white/[0.025] p-4">
                 <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-slate-500">Reviewer focus</p>
                 <p className="mt-2 text-sm leading-relaxed text-slate-300">
                   The identity layer should show who issued a credential, what it proves, what data stays private, and which services it can unlock.
                 </p>
               </div>
               <div className="flex flex-wrap gap-3 mb-8">
	                 {['Verified Enrollment', 'Private Proofs', 'Seedless Wallets', 'Governance Access'].map((item) => (
                   <span
                     key={item}
                     className="border border-fc-gold/20 bg-fc-gold/5 px-3 py-2 text-[9px] font-mono tracking-[0.3em] text-fc-gold uppercase"
                   >
                     {item}
                   </span>
                 ))}
               </div>
               <div className="mt-auto border-t border-slate-800 pt-6 relative overflow-hidden bg-slate-900/40 p-4 border-l border-slate-800">
                 <div className="absolute inset-x-0 top-0 h-px bg-fc-gold/25 pointer-events-none"></div>
                 <ul className="space-y-4 text-[9px] font-mono tracking-widest uppercase text-fc-gold/70 relative z-10">
                   <li className="flex items-center gap-4">
                     <span className="w-2 h-2 bg-fc-gold/50"></span>
	                     [REVIEW FILE] PRIVACY PROOF MODEL: DOCUMENTED
                   </li>
                   <li className="flex items-center gap-4">
                     <span className="w-2 h-2 bg-fc-gold/50"></span>
	                     [REVIEW FILE] GOVERNANCE ACCESS: ROLE-BOUND
                   </li>
                   <li className="flex items-center gap-4">
                     <span className="w-2 h-2 bg-fc-gold/50"></span>
	                     [REVIEW FILE] RAW DATA EXPOSURE: MINIMIZED
                   </li>
                 </ul>
                </div>
               <button
                 type="button"
                 onClick={() => navigate('/identity')}
                 className="mt-6 inline-flex items-center justify-center border border-fc-gold/30 bg-fc-gold/5 px-6 py-3 text-[10px] font-mono tracking-[0.35em] text-fc-gold uppercase transition-colors hover:border-fc-gold/60 hover:bg-fc-gold/10"
               >
	                 Review Identity Layer
               </button>
              </div>
              </TiltCard>
            </FadeInUp>
          </div>

          <div className="lg:col-span-7 relative flex flex-col items-center justify-center min-h-[500px] group">
            <FadeInUp delay={0.2} className="absolute inset-0">
              <div className="w-full h-full border border-slate-800 overflow-hidden relative shadow-2xl">
	                <img src="/fcc_web3_identity.webp" alt="Digital identity review interface" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-[#020617]/20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/30"></div>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={0.4} className="w-[90%] md:w-[80%] mt-40 lg:mt-32 relative z-10">
              <TiltCard intensity={8}>
              <div className="agency-panel p-8 md:p-10 bg-[#020617]/90 backdrop-blur-2xl border border-slate-700 shadow-2xl w-full">
               <ShieldCheck className="w-10 h-10 text-cyan-400 mb-6 opacity-80" />
               <h3 className="text-3xl font-serif font-light text-white mb-4 border-b border-slate-800 pb-4">
                 Seedless Identity Wallet
               </h3>
               <p className="text-sm text-gray-400 font-light leading-[1.8] tracking-wide mb-6">
	                 Complete self-custody with <strong className="text-cyan-400 font-medium">zero seed phrase risk</strong>. The FC Digital Wallet splits key authority across device enclaves, distributed custody infrastructure, and encrypted offline recovery so identity access remains resilient without turning a help desk into the single point of control.
               </p>
               <div className="p-4 border border-slate-800 bg-slate-900/50">
                 <p className="text-[9px] font-mono tracking-widest text-cyan-300 uppercase">System Notice:</p>
	                 <p className="text-xs font-serif italic text-white mt-1">"Credential recovery, wallet custody, and service approval remain separated so each control can be reviewed independently."</p>
               </div>
              </div>
              </TiltCard>
            </FadeInUp>
          </div>

        </div>
      </div>
    </section>
  );
};
