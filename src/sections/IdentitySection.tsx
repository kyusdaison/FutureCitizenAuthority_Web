import { motion, useScroll, useTransform } from 'framer-motion';
import { Fingerprint, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TiltCard } from '../components/TiltCard';
import { FadeInUp } from '../components/FadeInUp';
import { CipherHeading } from '../components/CipherHeading';
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
         ZKP
      </motion.div>
      <div className="absolute inset-0 z-0">
        <HexGridBackground />
      </div>

      {/* Vertical Label */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden 2xl:block opacity-[0.03] pointer-events-none vertical-text z-0">
         <h2 className="text-[8rem] font-serif font-black tracking-tighter uppercase text-white mix-blend-overlay">
           <span>02 IDENTITY</span>
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
                 <CipherHeading text="Identity Verification Layer" />
               </h3>
               <p className="text-sm text-gray-400 font-light leading-[1.8] tracking-wide mb-8">
	                 A W3C-compliant Decentralized Identity (DID) architecture that binds verified identity primitives to the blockchain using <strong className="text-white font-medium">zk-SNARKs</strong>. This is the access layer for every wallet, treasury, governance, and service flow across the FC network without exposing raw personal records on the public ledger.
               </p>
               <div className="flex flex-wrap gap-3 mb-8">
	                 {['Verified Enrollment', 'zk-KYC Proofs', 'Seedless Wallets', 'Governance Access'].map((item) => (
                   <span
                     key={item}
                     className="border border-fc-gold/20 bg-fc-gold/5 px-3 py-2 text-[9px] font-mono tracking-[0.3em] text-fc-gold uppercase"
                   >
                     {item}
                   </span>
                 ))}
               </div>
               <div className="mt-auto border-t border-slate-800 pt-6 relative overflow-hidden bg-slate-900/40 p-4 border-l border-slate-800">
                 {/* Scanning laser background */}
                 <div className="absolute top-0 left-0 w-full h-[20px] bg-gradient-to-b from-transparent via-fc-gold/10 to-transparent animate-[scan_3s_ease-in-out_infinite_alternate] pointer-events-none"></div>
                 <ul className="space-y-4 text-[9px] font-mono tracking-widest uppercase text-fc-gold/70 relative z-10">
                   <li className="flex items-center gap-4">
                     <span className="w-2 h-2 bg-fc-gold/50 animate-pulse [animation-delay:0s]"></span>
	                     [REVIEW] ZK_SNARK_VERIFICATION: APPROVED
                   </li>
                   <li className="flex items-center gap-4">
                     <span className="w-2 h-2 bg-fc-gold/50 animate-pulse [animation-delay:0.5s]"></span>
	                     [REVIEW] GOVERNANCE_STATE_SYNC: ESTABLISHED
                   </li>
                   <li className="flex items-center gap-4">
                     <span className="w-2 h-2 bg-fc-gold/50 animate-pulse [animation-delay:1s]"></span>
	                     [REVIEW] GLOBAL_IDENTITY_CREDENTIAL: ACTIVE
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
                 <CipherHeading text="Seedless Identity Wallet" />
               </h3>
               <p className="text-sm text-gray-400 font-light leading-[1.8] tracking-wide mb-6">
	                 Complete self-custody with <strong className="text-cyan-400 font-medium">zero seed phrase risk</strong>. The FC Digital Wallet splits key authority across device enclaves, validator infrastructure, and encrypted offline recovery so identity access remains resilient without sacrificing control.
               </p>
               <div className="p-4 border border-slate-800 bg-slate-900/50">
                 <p className="text-[9px] font-mono tracking-widest text-cyan-300 uppercase">System Notice:</p>
	                 <p className="text-xs font-serif italic text-white mt-1">"Credential recovery and wallet custody remain separated, auditable, and resilient against single points of failure."</p>
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
