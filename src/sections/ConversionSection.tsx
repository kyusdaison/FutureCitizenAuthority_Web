import { ArrowRight, BadgeCheck, Building2, Code2, FileCheck2, Landmark, Route, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FadeInUp } from '../components/FadeInUp';
import { TiltCard } from '../components/TiltCard';
import { CipherHeading } from '../components/CipherHeading';

const deploymentPaths = [
  {
    icon: Landmark,
    audience: 'Government Programs',
    title: 'Digital public services',
    summary: 'Issue verifiable identity, route benefits, and supervise public treasury flows from one auditable authority layer.',
    proof: 'Resident credentials, benefit disbursement, compliance dashboards',
    checkpoint: 'Name the agency owner, eligible population, data boundary, and first service outcome.',
    action: 'Review Identity',
    route: '/identity',
    accent: 'text-fc-gold',
    border: 'hover:border-fc-gold/45',
  },
  {
    icon: Building2,
    audience: 'Institutions',
    title: 'Treasury and settlement',
    summary: 'Connect verified operators to seedless wallets, auto-gas execution, programmable payouts, and policy-bound approvals.',
    proof: 'MPC custody, merchant settlement, treasury controls',
    checkpoint: 'Define approval roles, recovery paths, reporting obligations, and transaction limits.',
    action: 'Open Dashboard',
    route: '/dashboard',
    accent: 'text-cyan-300',
    border: 'hover:border-cyan-400/45',
  },
  {
    icon: Code2,
    audience: 'Ecosystem Builders',
    title: 'Identity-aware applications',
    summary: 'Build services that consume identity proofs, wallet permissions, governance events, and settlement rails without rebuilding trust infrastructure.',
    proof: 'SDK access, policy data hooks, compliance gates',
    checkpoint: 'Confirm what trust signal is consumed, what data is not stored, and how policy changes are handled.',
    action: 'Developer Portal',
    route: '/developer',
    accent: 'text-emerald-300',
    border: 'hover:border-emerald-400/45',
  },
];

const evaluationSteps = [
  {
    icon: BadgeCheck,
    title: 'Verify the participant',
    copy: 'Start with a reusable identity credential that can gate wallets, services, and policy permissions.',
  },
  {
    icon: Route,
    title: 'Map the operating flow',
    copy: 'Choose the first useful transaction path: public services, treasury operations, or builder access.',
  },
  {
    icon: FileCheck2,
    title: 'Prove the control layer',
    copy: 'Show audit trails, approval ownership, and settlement status before scaling into the full stack.',
  },
];

const proofSignals = [
  { value: '1', label: 'lead use case' },
  { value: '4', label: 'control surfaces' },
  { value: '90d', label: 'pilot window' },
  { value: 'ZK / MPC', label: 'privacy and custody controls' },
];

const pilotCadence = [
  { window: '0-30 days', focus: 'Use-case selection and control review' },
  { window: '31-60 days', focus: 'Limited operator pilot and reporting checks' },
  { window: '61-90 days', focus: 'Scale, pause, or revise decision' },
];

const supportingMaterials = [
  {
    label: 'Identity specification',
    copy: 'Credential issuance, recovery, and service permission detail.',
    route: '/identity',
  },
  {
    label: 'Network explorer',
    copy: 'Representative FC Chain blocks, transactions, and validator telemetry.',
    route: '/explorer',
  },
  {
    label: 'FCC economics',
    copy: 'Gas, validator incentives, reserves, and treasury utility.',
    route: '/tokenomics',
  },
  {
    label: 'Developer portal',
    copy: 'SDKs, proof hooks, policy surfaces, and integration tooling.',
    route: '/developer',
  },
];

const firstMeetingPackage = [
  'Responsible owner and decision sponsor',
  'First service or treasury workflow',
  'Data that must stay private',
  'Operator and approval roles',
  'Success metric for a 60-90 day pilot',
];

export const ConversionSection = () => {
  const navigate = useNavigate();

  return (
    <section id="deployment" className="py-24 px-6 lg:px-12 bg-[#05070b] border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-tactical-dots opacity-25 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fc-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeInUp>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-px bg-fc-gold/45" />
                <h2 className="text-xs font-bold text-fc-gold uppercase">
                  <CipherHeading text="05 // Deployment Paths" />
                </h2>
              </div>
              <h3 className="text-5xl md:text-7xl font-serif font-light text-white leading-tight mb-6">
                <CipherHeading text="Choose The " className="inline-block" />
                <span className="italic text-fc-gold font-serif"><CipherHeading text="Entry Point." /></span>
              </h3>
              <p className="text-base md:text-lg text-slate-400 leading-[1.8] max-w-2xl">
                Future Citizen becomes easier to understand when every conversation starts from the buyer's first useful deployment. Identity is the base, but the review path should begin with the service outcome, responsible owner, and control boundary.
              </p>
            </div>

            <div className="border border-white/10 bg-white/[0.02] px-6 py-5 max-w-sm">
              <div className="flex items-center gap-3 text-white mb-3">
                <ShieldCheck className="w-5 h-5 text-fc-gold" />
                <span className="text-sm font-medium">Evaluation rule</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Lead with the buyer's first deployment path. Treat protocol, economics, and network telemetry as supporting appendix material.
              </p>
            </div>
          </div>
        </FadeInUp>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {deploymentPaths.map((path, index) => {
            const Icon = path.icon;

            return (
              <FadeInUp key={path.title} delay={0.15 + index * 0.12} className="h-full">
                <TiltCard intensity={7} className="h-full">
                  <article className={`agency-panel h-full p-8 md:p-10 bg-[#020617]/90 border border-slate-800 ${path.border} transition-colors duration-500 flex flex-col`}>
                    <div className="flex items-start justify-between gap-6 mb-10">
                      <div>
                        <p className={`text-xs uppercase ${path.accent} mb-4`}>{path.audience}</p>
                        <h4 className="text-3xl font-serif font-light text-white leading-tight">{path.title}</h4>
                      </div>
                      <div className="w-12 h-12 border border-white/10 bg-white/[0.03] flex items-center justify-center shrink-0">
                        <Icon className={`w-6 h-6 ${path.accent}`} />
                      </div>
                    </div>

                    <p className="text-sm text-slate-400 leading-[1.9] mb-8">{path.summary}</p>

                    <div className="mt-auto border-t border-white/10 pt-6">
                      <p className="text-xs uppercase text-slate-500 mb-3">First proof of value</p>
                      <p className="text-sm text-white/85 leading-relaxed mb-8">{path.proof}</p>
                      <div className="mb-8 border border-white/10 bg-white/[0.025] p-4">
                        <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-slate-500">Pilot checkpoint</p>
                        <p className="text-sm leading-relaxed text-slate-300">{path.checkpoint}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate(path.route)}
                        className="group inline-flex w-full items-center justify-between gap-4 border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-white transition-colors hover:border-fc-gold/40 hover:bg-fc-gold/5"
                      >
                        <span>{path.action}</span>
                        <ArrowRight className="w-4 h-4 text-fc-gold transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </article>
                </TiltCard>
              </FadeInUp>
            );
          })}
        </div>

        <FadeInUp delay={0.25}>
          <div className="mt-10 grid grid-cols-1 xl:grid-cols-[1.35fr_0.65fr] gap-6">
            <div className="border border-white/10 bg-[#020617]/80 p-6 md:p-8">
              <div className="flex items-center justify-between gap-6 mb-8">
                <div>
                  <p className="text-xs uppercase text-fc-gold mb-3">Evaluation sequence</p>
                  <h4 className="text-2xl md:text-3xl font-serif font-light text-white">From first meeting to pilot scope</h4>
                </div>
                <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-fc-gold/30 via-white/10 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {evaluationSteps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div key={step.title} className="relative border border-white/10 bg-white/[0.02] p-5 min-h-[210px]">
                      <div className="flex items-center justify-between mb-8">
                        <Icon className="w-6 h-6 text-fc-gold" />
                        <span className="text-xs text-slate-500">0{index + 1}</span>
                      </div>
                      <h5 className="text-lg font-serif font-light text-white mb-4">{step.title}</h5>
                      <p className="text-sm text-slate-400 leading-relaxed">{step.copy}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border border-white/10 bg-white/[0.02] p-6 md:p-8 flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase text-cyan-300 mb-3">Signals to inspect</p>
                <h4 className="text-2xl md:text-3xl font-serif font-light text-white mb-5">Make the promise checkable.</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  A professional walkthrough should end with a bounded next step. The cleanest path is a short pilot with visible controls, clear owners, documented evidence, and a decision point that can be defended internally.
                </p>
              </div>

              <div className="mt-7 space-y-3">
                {pilotCadence.map((item) => (
                  <div key={item.window} className="border border-white/10 bg-[#020617]/70 px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.2em] text-fc-gold/80 mb-2">{item.window}</div>
                    <div className="text-sm text-slate-300 leading-relaxed">{item.focus}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                {proofSignals.map((signal) => (
                  <div key={signal.label} className="border border-white/10 bg-[#020617]/80 p-4">
                    <div className="text-2xl font-serif font-light text-white mb-1">{signal.value}</div>
                    <div className="text-xs uppercase text-slate-500">{signal.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.32}>
          <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-[0.82fr_1.18fr]">
            <div className="border border-fc-gold/20 bg-fc-gold/[0.035] p-6 md:p-8">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-fc-gold">First meeting package</p>
              <h4 className="mb-6 text-2xl md:text-3xl font-serif font-light text-white">What we should define before a formal pilot.</h4>
              <div className="space-y-3">
                {firstMeetingPackage.map((item, index) => (
                  <div key={item} className="flex items-start gap-4 border border-white/10 bg-[#020617]/55 px-4 py-3">
                    <span className="mt-0.5 text-[10px] font-mono text-fc-gold/80">0{index + 1}</span>
                    <span className="text-sm leading-relaxed text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-white/10 bg-[#020617]/75 p-6 md:p-8">
              <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.25em] text-slate-500">Technical appendix</p>
                  <h4 className="text-2xl md:text-3xl font-serif font-light text-white">Deeper material lives off the institutional homepage.</h4>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-slate-500">
                  The homepage should close the review conversation. Token, explorer, and developer material remain available as depth pages for specialist audiences.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {supportingMaterials.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => navigate(item.route)}
                    className="group border border-white/10 bg-white/[0.02] p-5 text-left transition-colors hover:border-fc-gold/35 hover:bg-fc-gold/[0.04]"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-white">{item.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-fc-gold transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="text-xs leading-relaxed text-slate-500">{item.copy}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};
