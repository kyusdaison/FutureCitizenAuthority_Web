import { motion, useScroll, useTransform } from 'framer-motion';
import {BadgeCheck, ChevronDown, FileCheck2, Landmark, Network} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FadeInUp } from '../components/FadeInUp';
import { MagneticButton } from '../components/MagneticButton';

const institutionalSignals = [
  {
    label: 'Decision ready',
    copy: 'The first conversation is framed around scope, authority, risk ownership, and evidence required for a pilot decision.',
  },
  {
    label: 'Clear controls',
    copy: 'Identity, custody, approval, reporting, and data boundaries are presented as operating controls a reviewer can inspect.',
  },
  {
    label: 'Bounded pilot',
    copy: 'The first deployment is scoped around one measurable service path, named owners, and a documented scale / pause decision.',
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
    title: 'Settlement evidence rail',
    copy: 'Settlement references, wallet operations, and audit evidence kept behind the institutional review story.',
  },
  {
    icon: FileCheck2,
    step: '04',
    label: 'Pilot',
    title: 'Controlled deployment path',
    copy: 'One bounded workflow, measurable outcomes, and a clear go / pause / scale decision.',
  },
];

export const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const opacityHeroText = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const yHeroText = useTransform(scrollYProgress, [0, 0.15], [0, 72]);
  const navigate = useNavigate();

  return (
    <section id="hero" className="min-h-[100svh] w-full px-5 pb-28 pt-32 sm:px-6 sm:pt-36 lg:px-12 relative overflow-hidden flex items-start sm:items-center">
      <motion.div style={{ opacity: opacityHeroText, y: yHeroText }} className="hero-mobile-frame relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
        <div className="min-w-0 text-left">
            <FadeInUp delay={0.55}>
              <p className="mt-5 max-w-3xl border border-white/10 bg-white/[0.025] px-5 py-4 text-sm leading-[1.75] text-slate-300 sm:text-base">
                <span className="mr-2 font-semibold text-white">FCA establishes the trusted authority layer</span>
                {' '}where governments and regulated institutions can issue credentials, govern access, approve wallets,
                and settle activity with audit-ready evidence.
              </p>
            </FadeInUp>

          <motion.h1
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="my-6 max-w-4xl text-[2.65rem] font-serif font-light leading-[1.03] tracking-[0.02em] text-white drop-shadow-md sm:my-8 sm:text-[4.2rem] sm:tracking-[0.04em] md:text-[5.4rem] xl:text-[6.4rem]"
          >
            Future Citizen
            <span className="block text-gold-gradient font-serif italic font-normal">
              Authority
            </span>
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 0.35 }} className="relative z-20 w-full max-w-3xl min-w-0">
            <p className="hero-copy whitespace-normal break-words border-l border-fc-gold/35 pl-5 text-sm leading-[1.85] text-slate-300 [overflow-wrap:anywhere] sm:pl-6 md:text-lg md:leading-[1.9]">
              Identity infrastructure for public agencies — issue verifiable credentials and govern access without putting resident data on a public chain.
            </p>

            <div className="mt-8">
              <MagneticButton intensity={0.16} className="w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => navigate('/review-room')}
                  className="premium-btn w-full px-5 py-4 auth-glass-panel rounded-sm sm:w-auto sm:px-10"
                >
                  <span className="relative z-10 text-[11px] font-mono tracking-[0.18em] text-gold-gradient uppercase sm:tracking-[0.34em]">Open Review Room</span>
                </button>
              </MagneticButton>
            </div>

            <p className="hero-copy mt-5 whitespace-normal break-words text-[10px] font-mono uppercase tracking-[0.12em] text-slate-500 [overflow-wrap:anywhere] sm:tracking-[0.28em]">
              Primary next step: open the Review Room for scope, controls, evidence, and pilot readiness.
            </p>
            <button
              type="button"
              onClick={() => navigate('/identity#issuer-demo')}
              className="hero-copy mt-2 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.12em] text-cyan-300/80 transition-colors hover:text-cyan-200 sm:tracking-[0.28em]"
            >
              <span aria-hidden>→</span>
              Or run the live W3C credential demo
            </button>
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
                  What an evaluator needs before pilot authorization.
                </h2>
              </div>
              <img src="/hero-logo.webp" alt="Future Citizen Authority crest" className="h-14 w-14 shrink-0 object-contain grayscale transition-all duration-500 hover:grayscale-0" loading="eager" decoding="async" />
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

          </aside>
        </FadeInUp>

      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1.2 }} className="absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-4">
	        <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-slate-500">Review Framework</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-4 h-4 text-cyan-500/80" />
        </motion.div>
      </motion.div>
    </section>
  );
};
