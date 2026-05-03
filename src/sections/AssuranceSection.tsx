import { ArrowRight, ClipboardCheck, FileCheck2, LockKeyhole, Scale, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CipherHeading } from '../components/CipherHeading';
import { FadeInUp } from '../components/FadeInUp';
import { TiltCard } from '../components/TiltCard';

const assurancePillars = [
  {
    icon: FileCheck2,
    title: 'Compliance Review',
    copy: 'Document identity proof models, policy controls, audit events, and approval boundaries before any production deployment.',
  },
  {
    icon: LockKeyhole,
    title: 'Data Protection',
    copy: 'Use zero-knowledge proofs and permissioned access paths so sensitive participant data does not need to be exposed on public rails.',
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
                Government and regulated institutions do not buy opaque infrastructure. They need clear accountability, data boundaries, auditability, and a controlled path from briefing to pilot.
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
                      <span className="text-xs text-slate-600">0{index + 1}</span>
                    </div>
                    <h4 className="text-xl font-serif font-light text-white mb-4">{pillar.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{pillar.copy}</p>
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
