import { ArrowRight, ClipboardCheck, FileCheck2, LockKeyhole, Scale, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CipherHeading } from '../components/CipherHeading';
import { FadeInUp } from '../components/FadeInUp';
import { TiltCard } from '../components/TiltCard';

const assurancePillars = [
  {
    icon: FileCheck2,
    title: 'Compliance Review',
    copy: 'Document identity proof models, policy controls, audit events, approval boundaries, and responsible parties before any production deployment.',
  },
  {
    icon: LockKeyhole,
    title: 'Data Protection',
    copy: 'Use zero-knowledge proofs and permissioned access paths so sensitive participant data does not need to be exposed on public settlement rails.',
  },
  {
    icon: ClipboardCheck,
    title: 'Pilot Readiness',
    copy: 'Define the first controlled use case, success metrics, responsible operators, and review checkpoints before scaling the program.',
  },
  {
    icon: Scale,
    title: 'Governance Accountability',
    copy: 'Connect every treasury, identity, and service action to committee ownership, role permissions, and inspectable records.',
  },
];

const reviewItems = [
  'Identity credential model',
  'Wallet custody and recovery boundary',
  'Audit trail and reporting surface',
  'Pilot scope and operating owner',
  'Security escalation and continuity plan',
];

const assuranceBoundaries = [
  'Jurisdictional policy remains with the responsible public authority.',
  'Raw participant records do not need to be placed on public settlement rails.',
  'High-risk treasury or service actions keep human approval and escalation paths.',
  'Public rollout follows a bounded pilot, not an unreviewed platform launch.',
];

const termTranslations = [
  {
    term: 'ZK proofs',
    meaning: 'Eligibility can be verified without publishing the underlying personal record.',
  },
  {
    term: 'MPC custody',
    meaning: 'Wallet recovery and signing can be split across approved controls instead of one seed phrase.',
  },
  {
    term: 'Governance gates',
    meaning: 'Sensitive actions can require named roles, approval paths, and audit records.',
  },
];

const reviewPacket = [
  {
    file: 'Identity & enrollment model',
    evidence: 'Credential schema, proof flow, privacy boundary',
    decision: 'Can this participant group be verified safely?',
  },
  {
    file: 'Wallet custody model',
    evidence: 'MPC roles, recovery process, operator permissions',
    decision: 'Who can initiate, recover, or approve wallet access?',
  },
  {
    file: 'Governance approval trail',
    evidence: 'Committee ownership, policy gates, treasury controls',
    decision: 'Can every sensitive action be attributed and reviewed?',
  },
  {
    file: 'Pilot operating plan',
    evidence: 'Scope, success metrics, escalation path, reporting cadence',
    decision: 'Is this ready for a controlled 60-90 day pilot?',
  },
];

export const AssuranceSection = () => {
  const navigate = useNavigate();

  return (
    <section id="assurance" className="py-24 px-6 lg:px-12 bg-[#070a10] border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-tactical-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeInUp>
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20 items-start">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-px bg-cyan-300/45" />
                <h2 className="text-xs font-bold text-cyan-300 uppercase">
                  <CipherHeading text="04 // Institutional Assurance" />
                </h2>
              </div>
              <h3 className="text-5xl md:text-7xl font-serif font-light text-white leading-tight mb-8">
                <CipherHeading text="Built For " className="inline-block" />
                <span className="italic text-cyan-300 font-serif"><CipherHeading text="Review." /></span>
              </h3>
              <p className="text-base md:text-lg text-slate-400 leading-[1.85] max-w-2xl mb-8">
                Government and regulated institutions do not buy opaque infrastructure. They need clear accountability, data boundaries, auditability, and a controlled path from briefing to pilot. This section turns technical claims into reviewable evidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/identity')}
                  className="inline-flex items-center justify-center gap-3 border border-cyan-300/25 bg-cyan-300/5 px-6 py-4 text-sm text-cyan-100 transition-colors hover:border-cyan-300/50 hover:bg-cyan-300/10"
                >
                  Review Identity Layer
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center justify-center gap-3 border border-white/10 bg-white/[0.02] px-6 py-4 text-sm text-white transition-colors hover:border-fc-gold/40 hover:bg-fc-gold/5"
                >
                  Open Operating Dashboard
                </button>
              </div>
            </div>

            <div className="border border-white/10 bg-[#020617]/85 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 text-white">
                <ShieldCheck className="w-6 h-6 text-fc-gold" />
                <h4 className="text-2xl md:text-3xl font-serif font-light">Institutional review file</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-8">
                These are the materials a serious evaluator should be able to inspect before procurement, pilot approval, or public-sector deployment.
              </p>
              <div className="space-y-3">
                {reviewItems.map((item, index) => (
                  <div key={item} className="flex items-center justify-between gap-6 border border-white/10 bg-white/[0.02] px-4 py-3">
                    <span className="text-sm text-slate-200">{item}</span>
                    <span className="text-xs text-slate-500">0{index + 1}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 border border-fc-gold/15 bg-fc-gold/[0.035] p-4">
                <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-fc-gold/80">Procurement posture</p>
                <p className="text-sm leading-relaxed text-slate-300">
                  Lead with evidence, responsibilities, and pilot boundaries. Keep protocol performance and FCC economics as supporting context.
                </p>
              </div>
            </div>
          </div>
        </FadeInUp>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {assurancePillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <FadeInUp key={pillar.title} delay={0.12 + index * 0.08} className="h-full">
                <TiltCard intensity={5} className="h-full">
                  <article className="h-full border border-white/10 bg-[#020617]/80 p-6 transition-colors hover:border-cyan-300/30">
                    <div className="flex items-center justify-between mb-8">
                      <Icon className="w-6 h-6 text-cyan-300" />
                      <span className="text-xs text-slate-400">0{index + 1}</span>
                    </div>
                    <h4 className="text-xl font-serif font-light text-white mb-4">{pillar.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{pillar.copy}</p>
                  </article>
                </TiltCard>
              </FadeInUp>
            );
          })}
        </div>

        <FadeInUp delay={0.3}>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-6 border border-white/10 bg-[#020617]/80 p-6 md:p-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300 mb-4">Governance posture</p>
              <h4 className="text-3xl md:text-4xl font-serif font-light text-white leading-tight">
                Serious infrastructure should state its boundaries.
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {assuranceBoundaries.map((boundary, index) => (
                <div key={boundary} className="border border-white/10 bg-white/[0.02] p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Boundary</span>
                    <span className="text-xs text-slate-400">0{index + 1}</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{boundary}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.34}>
          <div className="mt-10 border border-white/10 bg-white/[0.025] p-6 md:p-8">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.25em] text-cyan-300">Plain-language controls</p>
                <h4 className="text-3xl md:text-4xl font-serif font-light text-white">Translate the technical layer into review language.</h4>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-slate-500">
                This is the layer that helps non-technical decision makers understand what risk is being reduced.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {termTranslations.map((item) => (
                <div key={item.term} className="border border-white/10 bg-[#020617]/70 p-5">
                  <div className="mb-3 text-sm font-medium text-white">{item.term}</div>
                  <p className="text-sm leading-relaxed text-slate-400">{item.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.38}>
          <div className="mt-10 border border-white/10 bg-[#030712]/90 p-6 md:p-8">
            <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.25em] text-fc-gold">Review packet</p>
                <h4 className="text-3xl md:text-4xl font-serif font-light text-white">The materials a serious evaluator should ask for.</h4>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-slate-500">
                This makes procurement, pilot approval, and internal risk review easier because each file connects evidence to a concrete decision.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {reviewPacket.map((item, index) => (
                <div key={item.file} className="grid grid-cols-1 gap-4 border border-white/10 bg-white/[0.02] p-5 md:grid-cols-[0.24fr_0.38fr_0.38fr] md:items-center">
                  <div>
                    <div className="mb-2 text-[10px] uppercase tracking-[0.28em] text-slate-400">File 0{index + 1}</div>
                    <div className="text-sm font-medium text-white">{item.file}</div>
                  </div>
                  <div>
                    <div className="mb-2 text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">Evidence</div>
                    <div className="text-sm leading-relaxed text-slate-400">{item.evidence}</div>
                  </div>
                  <div>
                    <div className="mb-2 text-[10px] uppercase tracking-[0.22em] text-fc-gold/70">Decision supported</div>
                    <div className="text-sm leading-relaxed text-slate-300">{item.decision}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};
