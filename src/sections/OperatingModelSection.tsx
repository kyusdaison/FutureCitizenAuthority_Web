import { ArrowRight, BadgeCheck, ClipboardCheck, Landmark, ShieldCheck, WalletCards } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FadeInUp } from '../components/FadeInUp';
import { TiltCard } from '../components/TiltCard';

const operatingSteps = [
  {
    icon: BadgeCheck,
    title: 'Verify the participant',
    copy: 'Issue a reusable identity credential that can gate services, wallets, permissions, and governance participation.',
    plain: 'This answers: who is allowed to act?',
    proof: 'Credential model',
    evidence: 'Issuer, eligibility rule, proof type, revocation path',
  },
  {
    icon: WalletCards,
    title: 'Activate the wallet rail',
    copy: 'Connect verified users to seedless MPC wallets, recovery boundaries, stablecoin routing, and settlement status.',
    plain: 'This answers: how do they transact safely?',
    proof: 'Custody boundary',
    evidence: 'Operator roles, recovery process, signing policy, limit rules',
  },
  {
    icon: ShieldCheck,
    title: 'Apply governance controls',
    copy: 'Route approvals through committee ownership, policy gates, treasury rules, and inspectable audit events.',
    plain: 'This answers: who approves sensitive actions?',
    proof: 'Approval trail',
    evidence: 'Decision owner, quorum rule, audit event, escalation path',
  },
  {
    icon: Landmark,
    title: 'Deploy one service path',
    copy: 'Start with a controlled public service, treasury, or builder workflow before scaling into the full operating stack.',
    plain: 'This answers: what proves value first?',
    proof: 'Pilot scope',
    evidence: 'Use case, success metric, data boundary, go / pause decision',
  },
];

const reviewQuestions = [
  'Who is being verified, and by which authority?',
  'What data stays private or off public rails?',
  'Who can approve, recover, or revoke actions?',
  'Which pilot proves value before expansion?',
];

const decisionPath = [
  {
    phase: 'Briefing',
    outcome: 'Agree the first citizen, treasury, or institutional workflow worth testing and name the responsible owner.',
  },
  {
    phase: 'Control review',
    outcome: 'Inspect identity proofs, wallet boundaries, approval ownership, reporting needs, and privacy exposure.',
  },
  {
    phase: 'Pilot authorization',
    outcome: 'Define operators, success metrics, escalation paths, data handling rules, and decision authority.',
  },
  {
    phase: 'Scale decision',
    outcome: 'Expand only after the pilot shows measurable service value and governance clarity.',
  },
];

const decisionCriteria = [
  'Clear responsible authority',
  'Measurable public or institutional value',
  'Inspectable audit and reporting surface',
  'Bounded privacy and custody exposure',
];

export const OperatingModelSection = () => {
  const navigate = useNavigate();

  return (
    <section id="model" className="py-24 px-6 lg:px-12 bg-[#020617] border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-tactical-grid opacity-15 pointer-events-none" />
      <div className="absolute right-0 top-0 w-[720px] h-[720px] rounded-full bg-cyan-500/[0.035] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeInUp>
          <div className="grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] gap-12 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-px bg-fc-gold/45" />
                <h2 className="text-xs font-bold text-fc-gold uppercase">
                  02 // Operating Model
                </h2>
              </div>
              <h3 className="text-5xl md:text-7xl font-serif font-light text-white leading-tight mb-8">
                One Clear{' '}
                <span className="italic text-fc-gold font-serif">Logic.</span>
              </h3>
              <p className="text-base md:text-lg text-slate-400 leading-[1.85] max-w-xl mb-8">
                Future Citizen is easiest to evaluate as a control plane: identity proves who can act, wallets let them transact, governance defines what is allowed, and deployment turns that into one measurable service path. The reviewer should never have to guess where authority, data, or custody responsibility sits.
              </p>

              <div className="border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center gap-3 text-white mb-4">
                  <ClipboardCheck className="w-5 h-5 text-cyan-300" />
                  <span className="text-sm font-medium">First-review questions</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {reviewQuestions.map((question, index) => (
                    <div key={question} className="border border-white/10 bg-[#020617]/80 px-4 py-3">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-2">0{index + 1}</div>
                      <div className="text-sm text-slate-200">{question}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {operatingSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <FadeInUp key={step.title} delay={0.12 + index * 0.08} className="h-full">
                    <TiltCard intensity={5} className="h-full">
                      <article className="agency-panel h-full p-6 md:p-8 bg-[#05070b]/90 border border-slate-800 transition-colors hover:border-fc-gold/30 flex flex-col">
                        <div className="flex items-start justify-between gap-6 mb-10">
                          <div className="w-12 h-12 border border-white/10 bg-white/[0.03] flex items-center justify-center">
                            <Icon className="w-6 h-6 text-fc-gold" />
                          </div>
                          <span className="text-xs text-slate-400">0{index + 1}</span>
                        </div>
                        <h4 className="text-2xl font-serif font-light text-white mb-4">{step.title}</h4>
                        <p className="text-sm text-slate-400 leading-[1.8] mb-5">{step.copy}</p>
                        <div className="mb-5 border border-white/10 bg-white/[0.025] px-4 py-3">
                          <p className="text-xs leading-relaxed text-slate-300">{step.plain}</p>
                        </div>
                        <div className="mb-8 border border-fc-gold/15 bg-fc-gold/[0.035] px-4 py-3">
                          <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-fc-gold/80">Evidence to review</p>
                          <p className="text-xs leading-relaxed text-slate-400">{step.evidence}</p>
                        </div>
                        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-5">
                          <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Proof</span>
                          <button 
                            type="button"
                            onClick={() => navigate('/review-room')}
                            className="group inline-flex items-center gap-2 text-sm text-cyan-200 hover:text-cyan-100 transition-colors cursor-pointer"
                          >
                            {step.proof}
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                          </button>
                        </div>
                      </article>
                    </TiltCard>
                  </FadeInUp>
                );
              })}
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.35}>
          <div className="mt-10 grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
            <div className="border border-white/10 bg-[#05070b]/90 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-fc-gold mb-3">Institutional decision path</p>
                  <h4 className="text-2xl md:text-3xl font-serif font-light text-white">From executive interest to controlled pilot.</h4>
                </div>
                <p className="max-w-sm text-sm text-slate-500 leading-relaxed">
                  The site should help a reviewer understand not only what the system can do, but how a serious organization can safely evaluate it.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {decisionPath.map((item, index) => (
                  <div key={item.phase} className="relative border border-white/10 bg-white/[0.02] p-5 min-h-[190px]">
                    <div className="mb-8 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Gate</span>
                      <span className="text-xs text-slate-400">0{index + 1}</span>
                    </div>
                    <h5 className="text-lg font-serif font-light text-white mb-4">{item.phase}</h5>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.outcome}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-white/10 bg-white/[0.025] p-6 md:p-8">
              <div className="flex items-center gap-3 text-white mb-6">
                <ShieldCheck className="w-5 h-5 text-cyan-300" />
                <h4 className="text-2xl md:text-3xl font-serif font-light">Pilot readiness criteria</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-7">
                A professional reviewer should be able to answer these before moving from a concept conversation into a formal pilot.
              </p>
              <div className="space-y-3">
                {decisionCriteria.map((criterion, index) => (
                  <div key={criterion} className="flex items-center justify-between gap-5 border border-white/10 bg-[#020617]/80 px-4 py-3">
                    <span className="text-sm text-slate-200">{criterion}</span>
                    <span className="text-xs text-cyan-300/70">0{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};
