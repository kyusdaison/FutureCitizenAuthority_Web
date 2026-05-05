import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { IssuerDemo } from '../components/IssuerDemo';
import { DataSourceBadge } from '../components/DataSourceBadge';

const issuerPillars = [
  {
    kicker: 'Schema',
    title: 'Credential schemas and proof types',
    copy: 'Issue W3C-aligned verifiable credentials with jurisdiction-specific templates, role-based fields, and selective disclosure paths. Eligibility checks can be performed without exposing every underlying record.',
    reviewerQuestion: 'Which credential types must be reviewable, and which fields can stay private?',
  },
  {
    kicker: 'Issuance',
    title: 'Issuance and revocation flow',
    copy: 'Define enrollment, attestation, signing, delivery, and revocation as named steps with explicit owners and inspectable audit events. Failed issuances and revoked credentials remain inspectable for the program lifetime.',
    reviewerQuestion: 'Who signs an issuance, who can revoke it, and how is each action recorded?',
  },
  {
    kicker: 'Custody',
    title: 'Custody and recovery boundary',
    copy: 'HSM-backed custody splits signing and recovery across approved controls instead of relying on a single private-key holder. The recovery process itself is reviewable rather than informal.',
    reviewerQuestion: 'What roles exist, who can recover a holder, and what evidence is left behind?',
  },
  {
    kicker: 'Audit',
    title: 'Audit surface and reporting',
    copy: 'Every issuance, revocation, custody change, and credential presentation produces an inspectable record that can be filtered by jurisdiction, role, time window, or specific holder.',
    reviewerQuestion: 'Can a procurement audit reproduce the full lifecycle of a credential within minutes?',
  },
  {
    kicker: 'Privacy',
    title: 'Data and privacy boundary',
    copy: 'Underlying participant records do not need to be placed on a public settlement chain. Eligibility checks can be performed via selective disclosure or audited proof attestations.',
    reviewerQuestion: 'Where does the data physically live, and what leaves the issuer environment?',
  },
];

export default function Identity() {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 md:space-y-12 flex flex-col items-center md:items-stretch">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-serif font-light text-white mb-2">
            Identity Layer
          </h1>
          <p className="text-slate-400 font-mono text-xs tracking-widest">ISSUER BRIEF</p>
        </div>
      </div>

      {/* Issuer view — institutional brief */}
      <section className="mb-12 border-b border-white/5 pb-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-fc-gold">Issuer view</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white leading-tight">
              What an institution issuing credentials sees.
            </h2>
            <p className="mt-4 text-sm leading-[1.85] text-slate-400">
              Identity infrastructure for governments and regulated institutions to issue verifiable credentials, define recovery boundaries, and inspect every issuance and revocation event without moving sensitive participant data into public settlement.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start border border-white/10 bg-white/[0.02] px-3 py-2">
            <DataSourceBadge kind="sample" label="Issuer brief · sample" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {issuerPillars.map((pillar, index) => (
            <article key={pillar.title} className="border border-white/10 bg-[#020617]/70 p-5">
              <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-cyan-300/70">
                0{index + 1} // {pillar.kicker}
              </p>
              <h3 className="mb-3 text-lg font-serif font-light text-white">{pillar.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-slate-400">{pillar.copy}</p>
              <div className="border-t border-white/5 pt-4">
                <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-slate-500">Reviewer question</p>
                <p className="text-sm leading-relaxed text-slate-300">{pillar.reviewerQuestion}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate('/#deployment')}
            className="group inline-flex flex-1 items-center justify-between border border-fc-gold/30 bg-fc-gold/5 px-6 py-4 text-sm text-fc-gold transition-colors hover:border-fc-gold/55 hover:bg-fc-gold/10"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Map to a deployment path
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <a
            href="mailto:pilots@fca.ms?subject=Identity%20pilot%20review"
            className="inline-flex flex-1 items-center justify-center gap-2 border border-white/10 bg-white/[0.02] px-6 py-4 text-sm text-slate-200 transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/5 hover:text-white"
          >
            Discuss a pilot
          </a>
        </div>
      </section>

      <IssuerDemo />
    </div>
  );
}
