import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Database,
  Eye,
  FileSignature,
  KeyRound,
  Layers,
  Network,
  Scale,
  ServerCog,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type CoreComponent = {
  icon: LucideIcon;
  label: string;
  title: string;
  copy: string;
  status: string;
};

type PartnerCategory = {
  icon: LucideIcon;
  label: string;
  title: string;
  copy: string;
  proof: string;
};

const coreComponents: CoreComponent[] = [
  {
    icon: ShieldCheck,
    label: 'Identity',
    title: 'Identity layer',
    copy: 'Verifiable credentials, did:key issuance, revocation registry, and audit-trail. Reviewable end-to-end without exposing raw subject data on a public chain.',
    status: 'Live demo on /identity',
  },
  {
    icon: KeyRound,
    label: 'Wallet & custody',
    title: 'Holder wallet + recovery',
    copy: 'Holder wallet bound to credential status, MPC-backed recovery rules, and role-limited operator keys for institutional review.',
    status: 'Sample preview',
  },
  {
    icon: Scale,
    label: 'Governance',
    title: 'Approval & policy fabric',
    copy: 'Multi-signer service approvals, policy as code, and separation of duties between credential issuance and benefit disbursement.',
    status: 'Sample preview',
  },
  {
    icon: Layers,
    label: 'Settlement',
    title: 'FC Chain settlement',
    copy: 'Transaction settlement layer for benefit, registry, and audit events. Community network-operation material lives separately at /community.',
    status: 'Live (sample-traffic)',
  },
  {
    icon: Database,
    label: 'Audit',
    title: 'Evidence pipeline',
    copy: 'Webhook event log, audit export, and control attestation surface. Mixed live and sample sources with explicit labels at every row.',
    status: 'Live + sample',
  },
  {
    icon: ServerCog,
    label: 'Operations',
    title: 'Operating dashboard',
    copy: 'Operator-facing tile dashboard covering control posture, throughput, and incident state. First tile feeds from a real local counter; remaining tiles are sample.',
    status: 'Mixed source',
  },
];

const partnerCategories: PartnerCategory[] = [
  {
    icon: Building2,
    label: 'Government APIs',
    title: 'Public agencies',
    copy: 'Existing civil registry, social services, and treasury systems connected as one-way evidence sources, never as bidirectional rails.',
    proof: 'Service catalogue, scope, data-minimization note',
  },
  {
    icon: ShieldCheck,
    label: 'KYC / AML',
    title: 'Identity verifiers',
    copy: 'Document, biometric, and sanctions-list providers feeding the issuer pipeline before any credential is minted.',
    proof: 'Vendor list, issuer-key custody, fallback policy',
  },
  {
    icon: Wallet,
    label: 'Payment rails',
    title: 'Disbursement networks',
    copy: 'Local fiat rails and approved stablecoin partners for benefit, treasury, and reconciliation workflows.',
    proof: 'Partner list, AML control map, escalation owner',
  },
  {
    icon: FileSignature,
    label: 'Audit / SIEM',
    title: 'Audit & compliance vendors',
    copy: 'Audit log shippers, SIEM partners, and external attestation services consuming the evidence pipeline on a defined cadence.',
    proof: 'Export schema, retention policy, incident contact',
  },
  {
    icon: Eye,
    label: 'Operations',
    title: 'SOC & monitoring',
    copy: 'Security operations partners running monitoring against the operator surface, with named runbooks and on-call rotations.',
    proof: 'Runbook, on-call rota, incident SLO',
  },
  {
    icon: Network,
    label: 'Settlement',
    title: 'Settlement counterparties',
    copy: 'Reserve banks, treasury counterparties, and chain operators downstream of FC Chain. Reconciled daily, never speculatively.',
    proof: 'Counterparty list, daily reconciliation, regulator-of-record',
  },
];

const Ecosystem = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-10 max-w-7xl mx-auto w-full px-4 lg:px-8 pb-20">
      {/* Sample preview banner */}
      <div className="mt-4 border border-emerald-300/20 bg-emerald-300/[0.04] px-5 py-4 text-sm leading-relaxed text-slate-300">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-300">Ecosystem map</span>
        <span className="mx-3 text-slate-400">/</span>
        Reviewable infrastructure components and integration paths. Use this to scope what is
        already live, what is sample preview, and what each partner category needs to surface
        before a pilot path opens.
      </div>

      {/* Header */}
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-emerald-300">Ecosystem</p>
          <h1 className="text-3xl md:text-5xl font-serif font-light text-white leading-tight">
            What FCA ships, what it integrates.
          </h1>
          <p className="mt-3 text-sm leading-[1.85] text-slate-400">
            Two views on one page. First, the components Future Citizen Authority operates as a
            first-party system. Second, the partner categories an institutional reviewer should
            expect to see scoped — with named owners and reviewable evidence — before any pilot is
            authorized.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/review-room')}
          className="self-start md:self-end border border-fc-gold/35 bg-fc-gold/[0.04] px-4 py-2 text-[11px] font-mono uppercase tracking-[0.22em] text-fc-gold transition-colors hover:border-fc-gold hover:bg-fc-gold/[0.08]"
        >
          Open Review Room
        </button>
      </header>

      {/* Section 1: Core components FCA operates */}
      <section aria-label="Core infrastructure components">
        <div className="mb-6 flex items-baseline justify-between border-b border-white/10 pb-3">
          <h2 className="text-xl font-serif font-light text-white">Core components FCA operates</h2>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">First-party</span>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {coreComponents.map((c, i) => {
            const Icon = c.icon;
            return (
              <article key={c.title} className="border border-white/10 bg-[#020617]/70 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <Icon className="h-5 w-5 text-emerald-300" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-slate-400">
                    0{i + 1} // {c.label}
                  </span>
                </div>
                <h3 className="text-lg font-serif font-light text-white mb-3">{c.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-slate-400">{c.copy}</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">Status</p>
                  <p className="text-sm text-slate-200">{c.status}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Section 2: Integration partner categories */}
      <section aria-label="Integration partner categories">
        <div className="mb-6 flex items-baseline justify-between border-b border-white/10 pb-3">
          <h2 className="text-xl font-serif font-light text-white">Integration partner categories</h2>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">Scoped per pilot</span>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {partnerCategories.map((c, i) => {
            const Icon = c.icon;
            return (
              <article key={c.title} className="border border-white/10 bg-[#020617]/70 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <Icon className="h-5 w-5 text-fc-gold" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-slate-400">
                    0{i + 1} // {c.label}
                  </span>
                </div>
                <h3 className="text-lg font-serif font-light text-white mb-3">{c.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-slate-400">{c.copy}</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">Reviewer asks for</p>
                  <p className="text-sm text-slate-200">{c.proof}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Default posture + dual CTA */}
      <section className="border border-white/10 bg-[#020617]/70 p-6 md:p-8">
        <p className="text-[10px] uppercase tracking-[0.28em] text-emerald-300 mb-3">Default partner posture</p>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-300">
          New partners enter the ecosystem in a sandbox, carry sample labels until verified sources
          are connected, and never require a reviewer to inspect network economics before the use case
          is understood. Every partner integration starts with a one-page scope, a named owner, and a
          reviewable evidence path on the audit pipeline.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate('/developer')}
            className="group inline-flex items-center justify-between gap-4 border border-emerald-300/30 bg-emerald-300/[0.03] px-5 py-3 text-[11px] font-mono uppercase tracking-[0.22em] text-emerald-200 transition-colors hover:border-emerald-300/60 hover:bg-emerald-300/[0.07]"
          >
            <span>See integration portal</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            type="button"
            onClick={() => navigate('/review-room')}
            className="group inline-flex items-center justify-between gap-4 border border-fc-gold/30 bg-fc-gold/[0.04] px-5 py-3 text-[11px] font-mono uppercase tracking-[0.22em] text-fc-gold transition-colors hover:border-fc-gold/60 hover:bg-fc-gold/[0.08]"
          >
            <span>Open Review Room</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Ecosystem;
