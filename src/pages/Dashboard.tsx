import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Clock,
  AlertTriangle,
  KeyRound,
  ScrollText,
  Activity,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type KpiTile = {
  icon: LucideIcon;
  kicker: string;
  label: string;
  value: string;
  delta?: string;
  sub: string;
};

const kpiTiles: KpiTile[] = [
  {
    icon: FileCheck2,
    kicker: 'Issuance',
    label: 'Credentials issued · 30d',
    value: '2,418',
    delta: '+11.4% vs prior 30d',
    sub: '38 templates · 4 jurisdictions',
  },
  {
    icon: Clock,
    kicker: 'Approvals',
    label: 'Approvals pending',
    value: '47',
    sub: '6 high-risk · 41 standard',
  },
  {
    icon: AlertTriangle,
    kicker: 'Policy',
    label: 'Policy flags · 7d',
    value: '3',
    sub: '1 active · 2 resolved this week',
  },
  {
    icon: KeyRound,
    kicker: 'Recovery',
    label: 'Recovery cases',
    value: '5',
    sub: '2 open · 3 closed · avg 18h',
  },
  {
    icon: ScrollText,
    kicker: 'Audit',
    label: 'Audit events · 24h',
    value: '14,902',
    sub: 'integrity ✓ · 0 missing',
  },
  {
    icon: Activity,
    kicker: 'SLA',
    label: 'Service SLA · 30d',
    value: '99.6%',
    sub: 'issuance · recovery · escalation',
  },
];

type IssuanceRow = {
  time: string;
  template: string;
  issuer: string;
  holder: string;
  status: 'Issued' | 'Revoked' | 'Pending';
};

const issuanceLog: IssuanceRow[] = [
  { time: '14:21', template: 'Resident · Tier 2', issuer: 'Civic Office #12', holder: '0x83a9…d214', status: 'Issued' },
  { time: '14:08', template: 'Operator · Treasury', issuer: 'Operator Console', holder: '0x44b2…71fa', status: 'Issued' },
  { time: '13:55', template: 'Resident · Tier 1', issuer: 'Civic Office #12', holder: '0xc101…e809', status: 'Issued' },
  { time: '13:43', template: 'Custodian · Recovery', issuer: 'Recovery Council', holder: '0x6e90…2bd1', status: 'Pending' },
  { time: '13:21', template: 'Resident · Tier 2', issuer: 'Civic Office #08', holder: '0x95cc…0a17', status: 'Revoked' },
  { time: '13:02', template: 'Builder · API key', issuer: 'Developer Portal', holder: '0xa7e3…c912', status: 'Issued' },
];

type ApprovalRow = {
  id: string;
  type: string;
  submitter: string;
  ageHours: number;
  risk: 'High' | 'Standard';
};

const openApprovals: ApprovalRow[] = [
  { id: 'APR-0481', type: 'Treasury · Settlement', submitter: 'Operator #04', ageHours: 4, risk: 'High' },
  { id: 'APR-0480', type: 'Identity · Bulk re-issue', submitter: 'Civic Office #12', ageHours: 7, risk: 'Standard' },
  { id: 'APR-0479', type: 'Custody · Role rotation', submitter: 'Recovery Council', ageHours: 11, risk: 'High' },
  { id: 'APR-0478', type: 'Identity · Tier upgrade', submitter: 'Civic Office #08', ageHours: 22, risk: 'Standard' },
];

type PolicyRow = {
  time: string;
  rule: string;
  severity: 'Critical' | 'Warn' | 'Info';
  status: 'Active' | 'Resolved' | 'Acknowledged';
};

const policyFeed: PolicyRow[] = [
  { time: '10:14', rule: 'Treasury · single-actor approval', severity: 'Critical', status: 'Active' },
  { time: '08:42', rule: 'Issuance · stale operator session', severity: 'Warn', status: 'Acknowledged' },
  { time: '06:01', rule: 'Custody · split-key drift', severity: 'Warn', status: 'Resolved' },
  { time: '00:33', rule: 'Audit · backfill threshold', severity: 'Info', status: 'Resolved' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  // Static sample timestamp; production wires this to a real telemetry source.
  const [now] = useState(() => new Date().toISOString().slice(11, 16));

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full px-4 lg:px-8 pb-20">
      {/* Sample preview banner */}
      <div className="mt-4 border border-fc-gold/20 bg-fc-gold/[0.04] px-5 py-4 text-sm leading-relaxed text-slate-300">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-fc-gold">Sample preview</span>
        <span className="mx-3 text-slate-600">/</span>
        Operating dashboard for institutional walkthroughs. Production pilots connect this surface to verified identity, treasury, audit, and recovery sources. Numbers are representative.
      </div>

      {/* Header */}
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-fc-gold">Operating dashboard</p>
          <h1 className="text-3xl md:text-5xl font-serif font-light text-white leading-tight">
            Today&apos;s operating posture.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-[1.85] text-slate-400">
            One screen for the people running an institutional pilot. Tracks issuance, approvals, policy flags, recovery, audit integrity, and service SLA.
          </p>
        </div>
        <div className="flex items-center gap-3 self-start md:self-end">
          <span className="border border-white/10 bg-white/[0.02] px-3 py-2 text-[10px] font-mono uppercase tracking-[0.24em] text-slate-400">
            {now} UTC
          </span>
          <button
            type="button"
            onClick={() => navigate('/identity')}
            className="border border-white/10 bg-white/[0.02] px-4 py-2 text-[11px] font-mono uppercase tracking-[0.22em] text-slate-200 transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/5 hover:text-white"
          >
            Identity layer
          </button>
        </div>
      </header>

      {/* KPI tiles */}
      <section aria-label="Operating KPIs" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {kpiTiles.map((tile, i) => {
          const Icon = tile.icon;
          return (
            <article key={tile.label} className="border border-white/10 bg-[#020617]/70 p-5">
              <div className="mb-4 flex items-center justify-between">
                <Icon className="h-5 w-5 text-cyan-300" />
                <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-slate-600">
                  0{i + 1} // {tile.kicker}
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">{tile.label}</p>
              <p className="mt-3 text-3xl md:text-4xl font-serif font-light text-white">{tile.value}</p>
              {tile.delta && <p className="mt-1 text-[11px] font-mono text-cyan-300/80">{tile.delta}</p>}
              <p className="mt-3 border-t border-white/5 pt-3 text-[12px] leading-relaxed text-slate-400">
                {tile.sub}
              </p>
            </article>
          );
        })}
      </section>

      {/* Main grid: issuance log + side rails */}
      <section className="grid grid-cols-1 gap-3 lg:grid-cols-[1.5fr_1fr]">
        {/* Issuance activity */}
        <article className="border border-white/10 bg-[#020617]/70 p-5">
          <header className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-300/70">Issuance · last 30 min</p>
              <h2 className="mt-2 text-xl font-serif font-light text-white">Recent credential events</h2>
            </div>
            <span className="text-[9px] font-mono uppercase tracking-[0.28em] text-slate-600">Sample data</span>
          </header>
          <div className="space-y-1 overflow-x-auto">
            <div className="grid min-w-[640px] grid-cols-[60px_1.4fr_1.2fr_1fr_80px] gap-3 px-3 py-2 text-[9px] font-mono uppercase tracking-[0.22em] text-slate-600">
              <span>Time</span>
              <span>Template</span>
              <span>Issuer</span>
              <span>Holder</span>
              <span className="text-right">Status</span>
            </div>
            {issuanceLog.map((row) => (
              <div
                key={`${row.time}-${row.holder}`}
                className="grid min-w-[640px] grid-cols-[60px_1.4fr_1.2fr_1fr_80px] gap-3 border border-white/5 bg-white/[0.015] px-3 py-3 text-[12px] text-slate-300"
              >
                <span className="font-mono text-slate-500">{row.time}</span>
                <span>{row.template}</span>
                <span className="text-slate-400">{row.issuer}</span>
                <span className="font-mono text-slate-500">{row.holder}</span>
                <span
                  className={
                    'text-right font-mono text-[10px] uppercase tracking-[0.24em] ' +
                    (row.status === 'Revoked'
                      ? 'text-red-400/80'
                      : row.status === 'Pending'
                        ? 'text-fc-gold/80'
                        : 'text-cyan-300/80')
                  }
                >
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </article>

        {/* Side: open approvals + policy feed */}
        <div className="flex flex-col gap-3">
          <article className="border border-white/10 bg-[#020617]/70 p-5">
            <header className="mb-5">
              <p className="text-[10px] uppercase tracking-[0.28em] text-fc-gold">Awaiting approval</p>
              <h2 className="mt-2 text-xl font-serif font-light text-white">Open approvals</h2>
            </header>
            <div className="space-y-2">
              {openApprovals.map((row) => (
                <div key={row.id} className="border border-white/5 bg-white/[0.02] p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">
                      {row.id} · {row.ageHours}h
                    </span>
                    <span
                      className={
                        'border px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.24em] ' +
                        (row.risk === 'High'
                          ? 'border-red-400/30 bg-red-400/5 text-red-300/90'
                          : 'border-white/10 bg-white/[0.02] text-slate-400')
                      }
                    >
                      {row.risk}
                    </span>
                  </div>
                  <p className="text-sm text-slate-200">{row.type}</p>
                  <p className="mt-1 text-[11px] text-slate-500">{row.submitter}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="border border-white/10 bg-[#020617]/70 p-5">
            <header className="mb-5">
              <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-300/70">Policy &amp; escalation</p>
              <h2 className="mt-2 text-xl font-serif font-light text-white">Recent flags</h2>
            </header>
            <div className="space-y-2">
              {policyFeed.map((row) => (
                <div key={`${row.time}-${row.rule}`} className="flex items-start justify-between gap-3 border border-white/5 bg-white/[0.02] p-3">
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-slate-500">
                      {row.time} · {row.severity}
                    </p>
                    <p className="mt-1 text-sm text-slate-200">{row.rule}</p>
                  </div>
                  <span
                    className={
                      'shrink-0 border px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.24em] ' +
                      (row.status === 'Active'
                        ? 'border-red-400/30 bg-red-400/5 text-red-300/90'
                        : row.status === 'Acknowledged'
                          ? 'border-fc-gold/25 bg-fc-gold/5 text-fc-gold/80'
                          : 'border-white/10 bg-white/[0.02] text-slate-400')
                    }
                  >
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* Footer CTA — Ready for review */}
      <section className="border border-white/10 bg-[#020617]/70 p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 shrink-0 text-fc-gold" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-fc-gold">Ready for review</p>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-300">
                When this dashboard reflects a named operating owner, a bounded use case, a measurable outcome, and a documented privacy boundary — you are ready for a pilot review.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate('/#deployment')}
              className="group inline-flex items-center justify-between gap-3 border border-fc-gold/30 bg-fc-gold/5 px-5 py-3 text-sm text-fc-gold transition-colors hover:border-fc-gold/55 hover:bg-fc-gold/10"
            >
              <span>Map to a deployment path</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="mailto:pilots@fca.ms?subject=Dashboard%20pilot%20review"
              className="inline-flex items-center justify-center gap-2 border border-white/10 bg-white/[0.02] px-5 py-3 text-sm text-slate-200 transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/5 hover:text-white"
            >
              Discuss a pilot
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
