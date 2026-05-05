import { ArrowRight, Building2, Code2, Landmark, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FadeInUp } from '../components/FadeInUp';
import { TiltCard } from '../components/TiltCard';

const audiencePaths = [
  {
    icon: Landmark,
    audience: 'Government',
    title: 'Public-service identity and benefit review',
    copy: 'Evaluate one resident service where identity, eligibility, approvals, privacy boundaries, and settlement visibility need to be reviewed together.',
    reviewerQuestion: 'Can the agency verify eligibility without exposing unnecessary personal records?',
    firstStep: 'Select one resident or citizen workflow',
    route: '/identity',
    action: 'Review identity layer',
    accent: 'text-fc-gold',
    border: 'hover:border-fc-gold/40',
  },
  {
    icon: Building2,
    audience: 'Institutions',
    title: 'Treasury, custody, and approval controls',
    copy: 'Review how approved operators use seedless wallets, treasury permissions, recovery boundaries, and reporting checkpoints without creating a single point of failure.',
    reviewerQuestion: 'Who can initiate, approve, recover, and report sensitive wallet actions?',
    firstStep: 'Define custody, approval, and reporting owners',
    route: '/dashboard',
    action: 'Open dashboard',
    accent: 'text-cyan-300',
    border: 'hover:border-cyan-300/40',
  },
  {
    icon: Code2,
    audience: 'Infrastructure Partners',
    title: 'Identity-aware services and integration APIs',
    copy: 'Connect approved services to credentials, wallet permissions, governance events, and policy controls without rebuilding trust infrastructure or storing unnecessary identity data.',
    reviewerQuestion: 'Can partners consume trust signals without taking on full identity custody risk?',
    firstStep: 'Review trust signals, proof hooks, and event surfaces',
    route: '/developer',
    action: 'Integration portal',
    accent: 'text-emerald-300',
    border: 'hover:border-emerald-300/40',
  },
];

const reviewFit = [
  'A bounded first use case',
  'A named operating owner',
  'A measurable service outcome',
  'A documented privacy and custody boundary',
];

export const AudiencePathsSection = () => {
  const navigate = useNavigate();

  return (
    <section id="audiences" className="relative overflow-hidden border-y border-white/5 bg-[#04070d] px-6 py-24 lg:px-12">
      <div className="absolute inset-0 bg-tactical-dots opacity-20 pointer-events-none" />
      <div className="absolute left-[-20%] top-1/2 h-[640px] w-[640px] -translate-y-1/2 rounded-full bg-fc-gold/[0.035] blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <FadeInUp>
          <div className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <div className="h-px w-10 bg-fc-gold/45" />
                <h2 className="text-xs font-bold uppercase text-fc-gold">
                  01 // Audience Paths
                </h2>
              </div>
              <h3 className="mb-6 text-5xl font-light leading-tight text-white md:text-7xl font-serif">
                Choose The{' '}
                <span className="italic text-fc-gold font-serif">Review Path.</span>
              </h3>
              <p className="max-w-2xl text-base leading-[1.85] text-slate-400 md:text-lg">
                Governments, regulated institutions, and builders should not have to interpret the same message in the same way. Each path starts with the review question that audience is likely to bring into a serious evaluation.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border border-white/10 bg-[#020617]/80 p-6 md:p-8">
                <div className="mb-6 flex items-center gap-3 text-white">
                  <ShieldCheck className="h-5 w-5 text-cyan-300" />
                  <h4 className="text-2xl font-light font-serif">Ready for review when</h4>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {reviewFit.map((item, index) => (
                    <div key={item} className="border border-white/10 bg-white/[0.02] px-4 py-3">
                      <div className="mb-2 text-[10px] uppercase tracking-[0.28em] text-slate-400">0{index + 1}</div>
                      <div className="text-sm text-slate-200">{item}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => document.getElementById('deployment')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="group inline-flex flex-1 items-center justify-between border border-fc-gold/30 bg-fc-gold/5 px-5 py-3.5 text-sm text-fc-gold transition-colors hover:border-fc-gold/55 hover:bg-fc-gold/10"
                  >
                    <span>Map to a deployment path</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/review-room')}
                    className="inline-flex flex-1 items-center justify-center gap-2 border border-white/10 bg-white/[0.02] px-5 py-3.5 text-sm text-slate-200 transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/5 hover:text-white"
                  >
                    Open Review Room
                  </button>
                </div>
                <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-slate-400">
                  Self-check first. The review room packages the next conversation.
                </p>
              </div>
            </div>
          </div>
        </FadeInUp>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {audiencePaths.map((path, index) => {
            const Icon = path.icon;

            return (
              <FadeInUp key={path.audience} delay={0.12 + index * 0.08} className="h-full">
                <TiltCard intensity={5} className="h-full">
                  <article className={`agency-panel flex h-full flex-col border border-slate-800 bg-[#020617]/90 p-7 transition-colors ${path.border}`}>
                    <div className="mb-10 flex items-start justify-between gap-5">
                      <div>
                        <p className={`mb-4 text-xs uppercase tracking-[0.25em] ${path.accent}`}>{path.audience}</p>
                        <h4 className="text-2xl font-light leading-tight text-white font-serif">{path.title}</h4>
                      </div>
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/10 bg-white/[0.03]">
                        <Icon className={`h-6 w-6 ${path.accent}`} />
                      </div>
                    </div>
                    <p className="mb-6 text-sm leading-[1.85] text-slate-400">{path.copy}</p>
                    <div className="mb-8 border border-white/10 bg-white/[0.025] p-4">
                      <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-slate-500">Reviewer question</p>
                      <p className="text-sm leading-relaxed text-slate-200">{path.reviewerQuestion}</p>
                    </div>
                    <div className="mt-auto border-t border-white/10 pt-5">
                      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">First step</p>
                      <p className="mb-6 text-sm leading-relaxed text-white/85">{path.firstStep}</p>
                      <button
                        type="button"
                        onClick={() => navigate(path.route)}
                        className="group inline-flex w-full items-center justify-between border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-white transition-colors hover:border-fc-gold/40 hover:bg-fc-gold/5"
                      >
                        <span>{path.action}</span>
                        <ArrowRight className="h-4 w-4 text-fc-gold transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </article>
                </TiltCard>
              </FadeInUp>
            );
          })}
        </div>

      </div>
    </section>
  );
};
