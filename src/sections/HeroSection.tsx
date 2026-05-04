import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BadgeCheck, ChevronDown, FileCheck2, Landmark, Network, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FadeInUp } from '../components/FadeInUp';
import { MagneticButton } from '../components/MagneticButton';
import { HexGridBackground } from '../components/HexGridBackground';
import { FCChainNetworkSeal } from '../components/BrandMarks';

const institutionalSignals = [
  {
    label: 'Reviewable identity',
    copy: 'Access, wallet use, and service eligibility begin with a credential model that can be inspected before launch.',
  },
  {
    label: 'Visible controls',
    copy: 'Custody, approval, reporting, and governance rules are framed as operating controls rather than technical decoration.',
  },
  {
    label: 'Bounded pilot',
    copy: 'The first deployment is scoped around one measurable service path, named owners, and a documented scale decision.',
  },
];

const reviewPacket = [
  {
    icon: Landmark,
    step: '01',
    label: 'Authority',
    title: 'Future Citizen Authority',
    copy: 'Institutional governance, official trust positioning, and program ownership for review.',
  },
  {
    icon: BadgeCheck,
    step: '02',
    label: 'Identity',
    title: 'Verified access layer',
    copy: 'Who can access a service, wallet, or approval flow before any execution happens.',
  },
  {
    icon: Network,
    step: '03',
    label: 'Network',
    title: 'FC Chain settlement rail',
    copy: 'Settlement, validator events, wallet operations, and the FCC utility denomination.',
  },
  {
    icon: FileCheck2,
    step: '04',
    label: 'Pilot',
    title: 'Controlled deployment path',
    copy: 'One bounded workflow, measurable outcomes, and a clear go / pause / scale decision.',
  },
];

const reviewOutputs = [
  'Pilot scope memo',
  'Identity proof model',
  'Custody boundary',
  'Approval matrix',
];

export const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const opacityHeroText = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const yHeroText = useTransform(scrollYProgress, [0, 0.15], [0, 72]);
  const navigate = useNavigate();

  return (
    <section id="hero" className="min-h-screen w-full px-6 pb-28 pt-36 lg:px-12 relative overflow-hidden flex items-center">
      {/* Institutional review coordinates */}
      <div className="absolute top-1/4 left-12 hidden xl:flex flex-col gap-2 text-left opacity-80">
         <div className="text-[10px] font-mono tracking-[0.5em] text-slate-400 uppercase drop-shadow-md">REVIEW DESK <span className="text-slate-400">//</span> PUBLIC-SECTOR</div>
         <div className="text-[10px] font-mono tracking-[0.5em] text-fc-gold uppercase drop-shadow-[0_0_8px_rgba(212,175,55,0.25)]">PILOT STATUS <span className="text-slate-400">//</span> SCOPED</div>
         <div className="w-32 h-px bg-gradient-to-r from-fc-gold/40 to-transparent mt-2"></div>
      </div>
      
      <div className="absolute bottom-1/3 right-12 hidden xl:flex flex-col gap-2 text-right opacity-80">
         <div className="text-[10px] font-mono tracking-[0.5em] text-fc-gold uppercase drop-shadow-[0_0_8px_rgba(212,175,55,0.25)]"><span className="text-slate-400">//</span> PRIVACY + CUSTODY</div>
	         <div className="text-[10px] font-mono tracking-[0.5em] text-slate-400 uppercase drop-shadow-md"><span className="text-slate-400">//</span> ASSURANCE FILE READY</div>
         <div className="w-32 h-px bg-gradient-to-l from-fc-gold/40 to-transparent mt-2 ml-auto"></div>
      </div>
      
      {/* Hex Grid and Node Network Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <HexGridBackground />
      </div>

      {/* Vertical Label */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden 2xl:block opacity-[0.018] rotate-180 pointer-events-none vertical-text">
         <h2 className="text-[7rem] font-serif font-black tracking-tighter uppercase text-white mix-blend-overlay">
           <span>AUTHORITY</span>
         </h2>
      </div>

      <motion.div style={{ opacity: opacityHeroText, y: yHeroText }} className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
        <div className="text-left">
          <FadeInUp delay={0.55}>
            <div className="inline-flex items-center gap-3 border border-fc-gold/20 bg-[#020617]/75 px-5 py-3 backdrop-blur-xl">
              <ShieldCheck className="h-4 w-4 text-fc-gold" />
              <span className="text-[10px] font-mono uppercase tracking-[0.34em] text-fc-gold">Institutional review entry</span>
            </div>
          </FadeInUp>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="my-9 max-w-4xl text-[3.1rem] font-serif font-light leading-[1.02] tracking-[0.04em] text-white drop-shadow-md sm:text-[4.2rem] md:text-[5.4rem] xl:text-[6.4rem]"
          >
            Future Citizen
            <span className="block text-gold-gradient font-serif italic font-normal">
              Authority
            </span>
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 0.35 }} className="relative z-20 max-w-3xl">
            <p className="border-l border-fc-gold/35 pl-6 text-base leading-[1.9] text-slate-300 md:text-lg">
              Identity-first digital governance infrastructure for public agencies, regulated institutions, and infrastructure partners. FCA presents identity, wallet access, governance approvals, and FC Chain settlement as one reviewable operating layer before any pilot.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <MagneticButton intensity={0.16}>
                <button
                  type="button"
                  onClick={() => navigate('/identity')}
                  className="premium-btn w-full px-8 py-4 auth-glass-panel rounded-sm sm:w-auto"
                >
	                <span className="relative z-10 text-[11px] font-mono tracking-[0.34em] text-gold-gradient uppercase">Review Identity</span>
                </button>
              </MagneticButton>
              <MagneticButton intensity={0.12}>
                <button
                  type="button"
                  onClick={() => document.getElementById('model')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="group inline-flex w-full items-center justify-center gap-3 border border-white/10 bg-[#020617]/80 px-8 py-4 text-[11px] font-mono uppercase tracking-[0.3em] text-slate-300 transition-colors hover:border-cyan-500/40 hover:text-white sm:w-auto"
                >
	                Operating Model
                  <ArrowRight className="h-3.5 w-3.5 text-fc-gold transition-transform group-hover:translate-x-1" />
                </button>
              </MagneticButton>
            </div>

            <p className="mt-5 text-[10px] font-mono uppercase tracking-[0.28em] text-slate-500">
              Designed for control review, pilot authorization, and institutional procurement conversations.
            </p>
            <div className="mt-6 grid max-w-3xl grid-cols-2 gap-2 sm:grid-cols-4">
              {reviewOutputs.map((output) => (
                <div key={output} className="border border-white/10 bg-white/[0.025] px-3 py-2">
                  <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-slate-500">Output</div>
                  <div className="mt-1 text-xs text-slate-200">{output}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="mt-10 hidden max-w-4xl grid-cols-1 gap-3 xl:grid xl:grid-cols-3">
            {institutionalSignals.map((signal, index) => (
              <div key={signal.label} className="border border-white/10 bg-[#020617]/70 p-4 backdrop-blur-md">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-fc-gold/80">0{index + 1}</span>
                  <div className="h-px w-8 bg-white/10" />
                </div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-white">{signal.label}</h3>
                <p className="text-xs leading-relaxed text-slate-500">{signal.copy}</p>
              </div>
            ))}
          </div>
        </div>

        <FadeInUp delay={0.78}>
          <aside className="relative overflow-hidden border border-white/10 bg-[#020617]/85 p-5 shadow-2xl shadow-black/35 backdrop-blur-2xl xl:p-7">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fc-gold/60 to-transparent" />
            <div className="absolute right-[-120px] top-[-120px] h-72 w-72 rounded-full bg-fc-gold/[0.06] blur-[110px]" />

            <div className="relative mb-5 flex items-start justify-between gap-6 border-b border-white/10 pb-5">
              <div>
                <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.32em] text-fc-gold/80">Institutional packet</p>
                <h2 className="max-w-sm text-2xl font-serif font-light leading-tight text-white md:text-3xl xl:text-4xl">
                  What a reviewer needs to understand before a pilot.
                </h2>
              </div>
              <img src="/brand/fca-authority-crest.png" alt="Future Citizen Authority crest" className="h-14 w-14 shrink-0 object-contain grayscale transition-all duration-500 hover:grayscale-0" />
            </div>

            <div className="relative space-y-3">
              {reviewPacket.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.step} className="grid grid-cols-[auto_1fr] gap-3 border border-white/10 bg-white/[0.02] p-3 xl:p-4">
                    <div className="flex h-10 w-10 items-center justify-center border border-white/10 bg-[#020617]/80 xl:h-11 xl:w-11">
                      <Icon className="h-5 w-5 text-fc-gold" />
                    </div>
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <span className="text-[10px] font-mono text-slate-400">{item.step}</span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-cyan-200/80">{item.label}</span>
                      </div>
                      <h3 className="mb-1 text-base font-semibold text-white">{item.title}</h3>
                      <p className="hidden text-sm leading-relaxed text-slate-500 xl:block">{item.copy}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative mt-5 flex items-center gap-3 border border-fc-gold/15 bg-fc-gold/[0.04] p-4">
              <FCChainNetworkSeal className="h-10 w-10 shrink-0" />
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-fc-gold/80">Powered by FC Chain</div>
                <div className="mt-1 text-xs leading-relaxed text-slate-500">FC Chain is the settlement network; FCC is the gas and utility denomination, not the primary institutional story.</div>
              </div>
            </div>
          </aside>
        </FadeInUp>

      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1.2 }} className="absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-4">
	        <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-slate-500">Review Framework</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-4 h-4 text-cyan-500/80" />
        </motion.div>
      </motion.div>
      
      {/* Infinite Marquee Ticker */}
      <div className="absolute bottom-0 w-[200vw] left-0 h-10 border-t border-white/5 bg-[#020306] flex items-center overflow-hidden z-20">
        <div className="hairline-divider-h absolute top-0 left-0"></div>
        <div className="animate-marquee motion-reduce:animate-none flex gap-16 text-[9px] font-mono tracking-[0.4em] text-slate-500 uppercase">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex gap-16 whitespace-nowrap">
              <span>// IDENTITY PROOF: REVIEWABLE CREDENTIAL</span>
              <span>// PRIVACY: NO RAW RECORDS ON PUBLIC RAILS</span>
              <span>// CUSTODY: SEEDLESS MPC RECOVERY</span>
              <span>// GOVERNANCE: HUMAN APPROVAL GATES</span>
              <span>// PILOT: BOUNDED 60-90 DAY EVALUATION <span className="text-fc-gold opacity-50 ml-2">// FCC: GAS / SETTLEMENT UTILITY</span></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
