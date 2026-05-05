import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  DatabaseZap,
  Download,
  FileCheck2,
  KeyRound,
  Landmark,
  LockKeyhole,
  Mail,
  Route,
  Scale,
  ShieldCheck,
  TimerReset,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { DataSourceBadge } from '../components/DataSourceBadge';
import { pilotApplicationRoute, reviewPacketHref, trackConversionEvent } from '../lib/conversion';

type PacketFile = {
  icon: LucideIcon;
  file: string;
  purpose: string;
  evidence: string;
  decision: string;
};

const packetFiles: PacketFile[] = [
  {
    icon: Route,
    file: 'Pilot scope memo',
    purpose: 'Define the first useful workflow before platform expansion.',
    evidence: 'Use case, eligible population, responsible owner, success metric, 60-90 day window',
    decision: 'Is this focused enough for a controlled pilot?',
  },
  {
    icon: BadgeCheck,
    file: 'Identity credential model',
    purpose: 'Show who can issue, hold, present, and revoke credentials.',
    evidence: 'Issuer authority, credential schema, proof type, revocation path, holder lifecycle',
    decision: 'Can the participant group be verified without unnecessary data exposure?',
  },
  {
    icon: KeyRound,
    file: 'Custody boundary',
    purpose: 'Separate wallet signing, recovery, and operator authority.',
    evidence: 'MPC roles, recovery council, device controls, signing limits, escalation procedure',
    decision: 'Who can initiate, recover, pause, or approve wallet access?',
  },
  {
    icon: ClipboardCheck,
    file: 'Approval matrix',
    purpose: 'Make sensitive actions attributable before execution.',
    evidence: 'Action class, requester, approver, quorum, audit event, emergency override',
    decision: 'Can every high-risk action be traced to a named authority?',
  },
  {
    icon: FileCheck2,
    file: 'Audit trail map',
    purpose: 'Show what becomes inspectable during and after the pilot.',
    evidence: 'Issuance event, approval event, settlement event, revocation event, reporting export',
    decision: 'Can an external reviewer reproduce the lifecycle of a credential or transaction?',
  },
  {
    icon: LockKeyhole,
    file: 'Data boundary note',
    purpose: 'Clarify what data stays private, what is shared, and what is never public.',
    evidence: 'Raw records, proof outputs, public references, retention policy, access logs',
    decision: 'Is privacy exposure acceptable for the responsible authority?',
  },
];

const decisionGates = [
  {
    gate: 'Briefing',
    owner: 'Executive sponsor',
    output: 'One priority workflow and responsible operating owner',
  },
  {
    gate: 'Control review',
    owner: 'Risk, legal, security',
    output: 'Identity, custody, approval, and data boundaries accepted for pilot',
  },
  {
    gate: 'Pilot authorization',
    owner: 'Program owner',
    output: 'Operators, success metrics, reporting cadence, and escalation path approved',
  },
  {
    gate: 'Scale decision',
    owner: 'Steering group',
    output: 'Scale, pause, or revise based on evidence from the pilot window',
  },
];

const approvalRows = [
  {
    action: 'Credential issuance',
    requester: 'Enrollment operator',
    approver: 'Issuing authority',
    evidence: 'Credential ID, issuer signature, eligibility proof, timestamp',
  },
  {
    action: 'Bulk re-issue or revocation',
    requester: 'Program office',
    approver: 'Policy owner + security reviewer',
    evidence: 'Change reason, affected group, approval hash, exception report',
  },
  {
    action: 'Treasury settlement',
    requester: 'Treasury operator',
    approver: 'Finance approver + committee quorum',
    evidence: 'Payment batch, limit check, settlement reference, reconciliation status',
  },
  {
    action: 'Wallet recovery',
    requester: 'Holder or operator',
    approver: 'Recovery council',
    evidence: 'Recovery case, role attestation, device change, post-action review',
  },
];

const dataBoundaryRows = [
  {
    category: 'Raw personal records',
    treatment: 'Remain in the issuer or approved system of record',
    visibility: 'Not placed on public settlement rails',
  },
  {
    category: 'Eligibility proofs',
    treatment: 'Presented as proof outputs or selectively disclosed fields',
    visibility: 'Visible only to approved services and reviewers',
  },
  {
    category: 'Audit references',
    treatment: 'Anchored as signed references and reproducible event records',
    visibility: 'Available to authorized audit and oversight roles',
  },
  {
    category: 'Settlement events',
    treatment: 'Recorded as network or treasury events without raw participant data',
    visibility: 'Visible through evidence and reporting surfaces',
  },
];

const pilotPlan = [
  {
    window: '0-30 days',
    focus: 'Define scope, owners, identity schema, data boundary, and approval rules.',
  },
  {
    window: '31-60 days',
    focus: 'Run limited operators through issuance, recovery, approval, and audit workflows.',
  },
  {
    window: '61-90 days',
    focus: 'Inspect evidence, measure service outcome, and decide scale, pause, or revise.',
  },
];

const fileStatus = [
  ['Status', 'Representative pilot-ready preview'],
  ['Use', 'Internal scoping conversation'],
  ['Data', 'Sample evidence model, not a production evidence feed'],
];

const reviewDirectory = [
  ['Scope', '#scope', 'Decision gates and pilot ownership'],
  ['Controls', '#controls', 'Identity, custody, approval, and audit files'],
  ['Evidence', '#evidence', 'Approval matrix and data boundary'],
  ['Pilot Plan', '#pilot-plan', '60-90 day pilot cadence'],
  ['Next Step', '#next-step', 'Route to deeper pilot surfaces'],
];

const ReviewRoom = () => {
  const navigate = useNavigate();
  const startPilotRequest = (source: string) => {
    trackConversionEvent('pilot_request_started', source);
    navigate(pilotApplicationRoute);
  };

  const trackPacketDownload = (source: string) => {
    trackConversionEvent('review_packet_downloaded', source);
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-20 lg:px-8">
      <section className="mt-4 border border-fc-gold/20 bg-fc-gold/[0.04] px-5 py-4 text-sm leading-relaxed text-slate-300">
        <DataSourceBadge kind="representative" label="Review room" className="mr-3 align-middle" />
        <span className="mx-3 text-slate-600">/</span>
        Representative pilot-ready packet for institutional scoping. It shows the control
        model, evidence structure, and pilot path before production data or partner-specific
        records are connected.
      </section>

      <header className="grid grid-cols-1 gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-fc-gold">Pilot-ready packet</p>
          <h1 className="max-w-4xl text-4xl font-serif font-light leading-tight text-white md:text-6xl">
            Everything an evaluator needs before a controlled pilot.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-[1.85] text-slate-400">
            The Review Room turns the Future Citizen Authority story into a practical evaluation
            packet: scope, identity model, custody boundary, approval matrix, audit trail, data
            boundary, and a 60-90 day pilot path.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {fileStatus.map(([label, value]) => (
              <div key={label} className="border border-white/10 bg-white/[0.02] p-4">
                <div className="mb-2 text-[10px] uppercase tracking-[0.24em] text-slate-500">{label}</div>
                <div className="text-sm leading-relaxed text-slate-200">{value}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => startPilotRequest('review-room-header')}
              className="inline-flex items-center justify-center gap-3 border border-fc-gold/35 bg-fc-gold/[0.08] px-5 py-4 text-sm font-medium text-fc-gold transition-colors hover:border-fc-gold/60 hover:bg-fc-gold/[0.14]"
            >
              <Mail className="h-4 w-4" />
              <span>Request a pilot</span>
            </button>
            <a
              href={reviewPacketHref}
              download
              onClick={() => trackPacketDownload('review-room-header')}
              className="inline-flex items-center justify-center gap-3 border border-white/10 bg-white/[0.02] px-5 py-4 text-sm font-medium text-slate-200 transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/5 hover:text-white"
            >
              <Download className="h-4 w-4 text-cyan-300" />
              <span>Download review packet</span>
            </a>
          </div>
        </div>
        <div className="border border-white/10 bg-[#020617]/70 p-6">
          <div className="mb-5 flex items-center gap-3 text-white">
            <ShieldCheck className="h-5 w-5 text-cyan-300" />
            <h2 className="text-2xl font-serif font-light">Evaluation posture</h2>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            A procurement lead should leave this page knowing what can be piloted, who owns each
            decision, what evidence will be produced, and what data does not leave approved systems.
          </p>
          <div className="mt-5 border border-cyan-300/15 bg-cyan-300/[0.035] p-4">
            <div className="mb-3">
              <DataSourceBadge kind="representative" label="Disclosure" />
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              Figures and event examples on this page are representative. A formal pilot should
              replace them with partner-approved evidence, system boundaries, and reporting terms.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              ['1', 'use case'],
              ['4', 'control gates'],
              ['90d', 'pilot window'],
            ].map(([value, label]) => (
              <div key={label} className="border border-white/10 bg-white/[0.02] p-4">
                <div className="text-2xl font-serif font-light text-white">{value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <nav aria-label="Review packet directory" className="border border-white/10 bg-[#020617]/70 p-4">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-fc-gold">How to read this packet</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Start with scope, confirm controls, inspect evidence, then agree on the pilot decision path.
            </p>
          </div>
          <DataSourceBadge kind="representative" label="Institutional packet" />
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
          {reviewDirectory.map(([label, href, description], index) => (
            <a
              key={href}
              href={href}
              className="group border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-fc-gold/35 hover:bg-fc-gold/[0.04]"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-white">{label}</span>
                <span className="text-[10px] font-mono text-slate-500">0{index + 1}</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-500 group-hover:text-slate-400">{description}</p>
            </a>
          ))}
        </div>
      </nav>

      <section id="scope" aria-label="Decision gates" className="scroll-mt-24 grid grid-cols-1 gap-3 md:grid-cols-4">
        {decisionGates.map((gate, index) => (
          <article key={gate.gate} className="border border-white/10 bg-[#020617]/70 p-5">
            <div className="mb-8 flex items-center justify-between">
              <Landmark className="h-5 w-5 text-fc-gold" />
              <span className="text-[10px] font-mono text-slate-600">0{index + 1}</span>
            </div>
            <h2 className="mb-3 text-xl font-serif font-light text-white">{gate.gate}</h2>
            <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">{gate.owner}</p>
            <p className="text-sm leading-relaxed text-slate-400">{gate.output}</p>
          </article>
        ))}
      </section>

      <section id="controls" className="scroll-mt-24 grid grid-cols-1 gap-3 md:grid-cols-2">
        {packetFiles.map((item, index) => {
          const Icon = item.icon;

          return (
            <article key={item.file} className="border border-white/10 bg-[#020617]/70 p-6">
              <div className="mb-6 flex items-start justify-between gap-5">
                <div>
                  <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-fc-gold">
                    File 0{index + 1}
                  </p>
                  <h2 className="text-2xl font-serif font-light text-white">{item.file}</h2>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/10 bg-white/[0.03]">
                  <Icon className="h-5 w-5 text-cyan-300" />
                </div>
              </div>
              <p className="mb-5 text-sm leading-relaxed text-slate-400">{item.purpose}</p>
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <div className="border border-white/10 bg-white/[0.02] p-4">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">Evidence</p>
                  <p className="text-sm leading-relaxed text-slate-300">{item.evidence}</p>
                </div>
                <div className="border border-fc-gold/15 bg-fc-gold/[0.035] p-4">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-fc-gold/80">Decision supported</p>
                  <p className="text-sm leading-relaxed text-slate-300">{item.decision}</p>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section id="evidence" className="scroll-mt-24 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_0.9fr]">
        <article className="border border-white/10 bg-[#020617]/70 p-6">
          <div className="mb-6 flex items-center justify-between gap-6">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-fc-gold">Approval matrix</p>
              <h2 className="text-3xl font-serif font-light text-white">Who can act, approve, and audit.</h2>
            </div>
            <Scale className="hidden h-6 w-6 text-cyan-300 md:block" />
          </div>
          <div className="space-y-2 overflow-x-auto">
            <div className="grid min-w-[760px] grid-cols-[1fr_1fr_1.2fr_1.4fr] gap-3 px-3 py-2 text-[9px] font-mono uppercase tracking-[0.22em] text-slate-600">
              <span>Action</span>
              <span>Requester</span>
              <span>Approver</span>
              <span>Evidence left behind</span>
            </div>
            {approvalRows.map((row) => (
              <div
                key={row.action}
                className="grid min-w-[760px] grid-cols-[1fr_1fr_1.2fr_1.4fr] gap-3 border border-white/5 bg-white/[0.015] px-3 py-3 text-[12px] text-slate-300"
              >
                <span>{row.action}</span>
                <span className="text-slate-400">{row.requester}</span>
                <span className="text-slate-400">{row.approver}</span>
                <span className="text-slate-500">{row.evidence}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="border border-white/10 bg-[#020617]/70 p-6">
          <div className="mb-6 flex items-center gap-3 text-white">
            <DatabaseZap className="h-5 w-5 text-cyan-300" />
            <h2 className="text-3xl font-serif font-light">Data boundary</h2>
          </div>
          <div className="space-y-3">
            {dataBoundaryRows.map((row) => (
              <div key={row.category} className="border border-white/10 bg-white/[0.02] p-4">
                <p className="mb-2 text-sm font-medium text-white">{row.category}</p>
                <p className="text-sm leading-relaxed text-slate-400">{row.treatment}</p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-fc-gold/80">{row.visibility}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section id="pilot-plan" className="scroll-mt-24 grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="border border-fc-gold/20 bg-fc-gold/[0.035] p-6">
          <div className="mb-6 flex items-center gap-3 text-white">
            <TimerReset className="h-5 w-5 text-fc-gold" />
            <h2 className="text-3xl font-serif font-light">60-90 day pilot plan</h2>
          </div>
          <div className="space-y-3">
            {pilotPlan.map((item) => (
              <div key={item.window} className="border border-white/10 bg-[#020617]/60 p-4">
                <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-fc-gold">{item.window}</p>
                <p className="text-sm leading-relaxed text-slate-300">{item.focus}</p>
              </div>
            ))}
          </div>
        </article>

        <article id="next-step" className="scroll-mt-24 border border-white/10 bg-[#020617]/70 p-6">
          <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-cyan-300">Next pilot path</p>
          <h2 className="mb-5 text-3xl font-serif font-light text-white">Use this page to start the serious conversation.</h2>
          <p className="mb-7 max-w-2xl text-sm leading-relaxed text-slate-400">
            The Review Room should be the link sent after an introductory conversation. From here,
            evaluators can inspect the identity model, preview the operating dashboard, and evaluate
            the evidence explorer without confusing those materials with the community
            token surfaces.
          </p>
          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => startPilotRequest('review-room-next-step')}
              className="inline-flex items-center justify-between border border-fc-gold/30 bg-fc-gold/[0.06] px-4 py-3 text-sm text-fc-gold transition-colors hover:border-fc-gold/55 hover:bg-fc-gold/[0.12]"
            >
              <span>Request a pilot</span>
              <Mail className="h-4 w-4" />
            </button>
            <a
              href={reviewPacketHref}
              download
              onClick={() => trackPacketDownload('review-room-next-step')}
              className="inline-flex items-center justify-between border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-slate-200 transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/5 hover:text-white"
            >
              <span>Download review packet</span>
              <Download className="h-4 w-4 text-cyan-300" />
            </a>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              ['Identity layer', '/identity'],
              ['Operating dashboard', '/dashboard'],
              ['Evidence explorer', '/explorer'],
            ].map(([label, route]) => (
              <button
                key={route}
                type="button"
                onClick={() => navigate(route)}
                className="group inline-flex items-center justify-between border border-white/10 bg-white/[0.02] px-4 py-3 text-left text-sm text-slate-200 transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/5 hover:text-white"
              >
                <span>{label}</span>
                <ArrowRight className="h-4 w-4 text-cyan-300 transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};

export default ReviewRoom;
