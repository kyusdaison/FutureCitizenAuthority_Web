import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Activity,
  AlertTriangle,
  Globe2,
  Gauge,
  ScrollText,
  Server,
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
    icon: Activity,
    kicker: 'Network',
    label: 'Network uptime · 30d',
    value: '99.97%',
    delta: '+0.04 vs prior 30d',
    sub: '0 SEV-1 incidents · 2 SEV-3 (resolved)',
  },
  {
    icon: ScrollText,
    kicker: 'Audit',
    label: 'Audit log integrity · 24h',
    value: '14,902',
    delta: '0 missing · 0 tamper alerts',
    sub: 'Sealed events with reference hash',
  },
  {
    icon: Gauge,
    kicker: 'Latency',
    label: 'Settlement latency',
    value: '180ms',
    sub: 'p50 · p95 450ms · p99 720ms',
  },
  {
    icon: AlertTriangle,
    kicker: 'Anomalies',
    label: 'Anomaly flags · 24h',
    value: '3',
    sub: '1 active · 2 resolved · 0 escalated',
  },
  {
    icon: Server,
    kicker: 'Throughput',
    label: 'Events per minute · 1h avg',
    value: '424',
    sub: 'peak 1.2k · baseline 110',
  },
  {
    icon: Globe2,
    kicker: 'Coverage',
    label: 'Jurisdiction coverage',
    value: '12',
    sub: '4 active pilots · 8 observer regions',
  },
];

type EventRow = {
  time: string;
  type: 'Issuance' | 'Revocation' | 'Approval' | 'Recovery' | 'Settlement';
  jurisdiction: string;
  refHash: string;
  status: 'Sealed' | 'Pending' | 'Flagged';
};

const eventStream: EventRow[] = [
  { time: '14:21:08', type: 'Issuance', jurisdiction: 'JUR-04 · Civic', refHash: '0x83a9…d214', status: 'Sealed' },
  { time: '14:20:55', type: 'Settlement', jurisdiction: 'JUR-02 · Treasury', refHash: '0xf012…91ee', status: 'Sealed' },
  { time: '14:20:31', type: 'Approval', jurisdiction: 'JUR-04 · Council', refHash: '0x44b2…71fa', status: 'Sealed' },
  { time: '14:20:02', type: 'Issuance', jurisdiction: 'JUR-08 · Civic', refHash: '0xc101…e809', status: 'Sealed' },
  { time: '14:19:47', type: 'Recovery', jurisdiction: 'JUR-04 · Recovery', refHash: '0x6e90…2bd1', status: 'Pending' },
  { time: '14:19:18', type: 'Revocation', jurisdiction: 'JUR-08 · Civic', refHash: '0x95cc…0a17', status: 'Flagged' },
  { time: '14:18:54', type: 'Settlement', jurisdiction: 'JUR-02 · Treasury', refHash: '0xa7e3…c912', status: 'Sealed' },
  { time: '14:18:21', type: 'Approval', jurisdiction: 'JUR-04 · Council', refHash: '0x21fd…5b88', status: 'Sealed' },
];

type AnomalyRow = {
  time: string;
  category: 'Settlement' | 'Audit' | 'Identity' | 'Custody';
  severity: 'Critical' | 'Warn' | 'Info';
  description: string;
  status: 'Active' | 'Resolved' | 'Acknowledged';
};

const anomalies: AnomalyRow[] = [
  {
    time: '10:14',
    category: 'Settlement',
    severity: 'Critical',
    description: 'Settlement reconciliation diff exceeded threshold (JUR-04, +2 events)',
    status: 'Active',
  },
  {
    time: '08:42',
    category: 'Identity',
    severity: 'Warn',
    description: 'Issuance rate spike on JUR-08 · Civic (3.4× baseline, 14 min)',
    status: 'Acknowledged',
  },
  {
    time: '06:01',
    category: 'Custody',
    severity: 'Warn',
    description: 'MPC role rotation drift detected on Recovery Council key set',
    status: 'Resolved',
  },
  {
    time: '00:33',
    category: 'Audit',
    severity: 'Info',
    description: 'Audit backfill threshold reached for window 2026-05-03 22:00–24:00',
    status: 'Resolved',
  },
];

const Explorer = () => {
  const navigate = useNavigate();
  // Static sample timestamp; production wires this to real network telemetry.
  const [now] = useState(() => new Date().toISOString().slice(11, 16));

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full px-4 lg:px-8 pb-20">
      {/* Sample preview banner */}
      <div className="mt-4 border border-fc-gold/20 bg-fc-gold/[0.04] px-5 py-4 text-sm leading-relaxed text-slate-300">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-fc-gold">Sample preview</span>
        <span className="mx-3 text-slate-400">/</span>
        Network telemetry surface for institutional walkthroughs. Production deployments connect this
        view to real audit-event streams, settlement integrity checks, and anomaly detectors. Numbers
        are representative.
      </div>

      {/* Header */}
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-fc-gold">Network telemetry</p>
          <h1 className="text-3xl md:text-5xl font-serif font-light text-white leading-tight">
            What the network is doing right now.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-[1.85] text-slate-400">
            One screen for auditors, technical reviewers, and operations leads. Tracks uptime,
            audit-log integrity, settlement latency, anomaly flags, throughput, and jurisdictional
            coverage.
          </p>
        </div>
        <div className="flex items-center gap-3 self-start md:self-end">
          <span className="border border-white/10 bg-white/[0.02] px-3 py-2 text-[10px] font-mono uppercase tracking-[0.24em] text-slate-400">
            {now} UTC · live
          </span>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="border border-white/10 bg-white/[0.02] px-4 py-2 text-[11px] font-mono uppercase tracking-[0.22em] text-slate-200 transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/5 hover:text-white"
          >
            Operating dashboard
          </button>
        </div>
      </header>

      {/* KPI tiles */}
      <section aria-label="Network telemetry KPIs" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {kpiTiles.map((tile, i) => {
          const Icon = tile.icon;
          return (
            <article key={tile.label} className="border border-white/10 bg-[#020617]/70 p-5">
              <div className="mb-4 flex items-center justify-between">
                <Icon className="h-5 w-5 text-cyan-300" />
                <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-slate-400">
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

      {/* Main grid: live event stream + anomaly feed */}
      <section className="grid grid-cols-1 gap-3 lg:grid-cols-[1.5fr_1fr]">
        {/* Live event stream */}
        <article className="border border-white/10 bg-[#020617]/70 p-5">
          <header className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-300/70">Stream · last 3 min</p>
              <h2 className="mt-2 text-xl font-serif font-light text-white">Sealed audit events</h2>
            </div>
            <span className="text-[9px] font-mono uppercase tracking-[0.28em] text-slate-400">Sample data</span>
          </header>
          <div className="space-y-1 overflow-x-auto">
            <div className="grid min-w-[680px] grid-cols-[80px_1fr_1.4fr_1fr_80px] gap-3 px-3 py-2 text-[9px] font-mono uppercase tracking-[0.22em] text-slate-400">
              <span>Time</span>
              <span>Type</span>
              <span>Jurisdiction</span>
              <span>Reference hash</span>
              <span className="text-right">Status</span>
            </div>
            {eventStream.map((row) => (
              <div
                key={`${row.time}-${row.refHash}`}
                className="grid min-w-[680px] grid-cols-[80px_1fr_1.4fr_1fr_80px] gap-3 border border-white/5 bg-white/[0.015] px-3 py-3 text-[12px] text-slate-300"
              >
                <span className="font-mono text-slate-500">{row.time}</span>
                <span>{row.type}</span>
                <span className="text-slate-400">{row.jurisdiction}</span>
                <span className="font-mono text-slate-500">{row.refHash}</span>
                <span
                  className={
                    'text-right font-mono text-[10px] uppercase tracking-[0.24em] ' +
                    (row.status === 'Flagged'
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
          <p className="mt-4 text-[11px] font-mono text-slate-500">
            Each event is signed and anchored to the audit ledger. Reference hashes are reproducible
            on demand for procurement / external audit.
          </p>
        </article>

        {/* Anomaly feed */}
        <article className="border border-white/10 bg-[#020617]/70 p-5">
          <header className="mb-5">
            <p className="text-[10px] uppercase tracking-[0.28em] text-fc-gold">Detector output</p>
            <h2 className="mt-2 text-xl font-serif font-light text-white">Anomalies · last 24h</h2>
          </header>
          <div className="space-y-2">
            {anomalies.map((row) => (
              <div key={`${row.time}-${row.description}`} className="border border-white/5 bg-white/[0.02] p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">
                    {row.time} · {row.category} · {row.severity}
                  </span>
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
                <p className="text-sm text-slate-200">{row.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] font-mono text-slate-500">
            Anomalies are detector output, not human-reported tickets. Each can be expanded into the
            full event chain for review.
          </p>
        </article>
      </section>

      {/* Footer CTA */}
      <section className="border border-white/10 bg-[#020617]/70 p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 shrink-0 text-fc-gold" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-fc-gold">Reviewable observability</p>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-300">
                Every metric on this page can be reproduced from sealed audit events. A pilot's
                operational integrity does not depend on this UI being available — the underlying log
                is the source of truth.
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
              href="mailto:pilots@fca.ms?subject=Telemetry%20pilot%20review"
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

export default Explorer;
