import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Code2,
  FileCheck2,
  KeyRound,
  Network,
  ShieldCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const integrationTracks = [
  {
    icon: BadgeCheck,
    label: 'Credential issuance',
    title: 'Connect approved enrollment sources',
    copy: 'Issue verifiable credentials from a reviewed intake flow without exposing raw identity records to public settlement rails.',
    proof: 'Schema, issuer key, revocation policy',
  },
  {
    icon: KeyRound,
    label: 'Wallet permissions',
    title: 'Bind access to policy and recovery rules',
    copy: 'Map credential status to wallet limits, service eligibility, and operator permissions before any pilot transaction path is opened.',
    proof: 'MPC recovery, role limits, audit owner',
  },
  {
    icon: Network,
    label: 'Event evidence',
    title: 'Publish only the evidence reviewers need',
    copy: 'Route service events, approval decisions, and settlement references into an audit surface with live versus sample source labels.',
    proof: 'Webhook log, audit export, evidence hash',
  },
];

const reviewArtifacts = [
  'Credential schema map',
  'Issuer key custody note',
  'Webhook event catalogue',
  'Data minimization checklist',
  'Pilot sandbox access',
];

const integrationSnippets = {
  credential: {
    tab: 'Credential API',
    file: 'credential.issue.json',
    code: `POST /v1/credentials/issue
Authorization: Bearer <pilot-token>
Content-Type: application/json

{
  "schema": "resident-service-v1",
  "issuer": "agency-pilot-01",
  "subjectRef": "internal-user-48291",
  "claims": {
    "serviceEligible": true,
    "region": "pilot-district-a"
  },
  "privacy": {
    "publicRecords": "none",
    "evidence": "hashed-status-only"
  }
}`,
  },
  webhook: {
    tab: 'Evidence Webhook',
    file: 'service.approved.json',
    code: `POST https://partner.example/fca/events
X-FCA-Signature: ed25519:<signature>

{
  "event": "service.approved",
  "credentialId": "vc_9f3a...42d",
  "policy": "benefit-disbursement-v1",
  "decision": "approved",
  "review": {
    "source": "sample",
    "auditEvent": "0x81b2f940",
    "operatorRole": "case-reviewer"
  }
}`,
  },
  export: {
    tab: 'Audit Export',
    file: 'pilot-control-export.csv',
    code: `timestamp,control,source,result,owner
2026-05-04T16:20:00Z,credential-issued,live,pass,agency-pilot-01
2026-05-04T16:24:12Z,wallet-limit-applied,sample,pass,treasury-review
2026-05-04T16:31:44Z,service-approved,sample,pass,program-owner`,
  },
};

type SnippetKey = keyof typeof integrationSnippets;

const DeveloperHub = () => {
  const [activeTab, setActiveTab] = useState<SnippetKey>('credential');
  const navigate = useNavigate();
  const activeSnippet = integrationSnippets[activeTab];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto w-full max-w-7xl space-y-8 pb-20">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        className="grid gap-6 border-b border-white/10 pb-8 md:grid-cols-[1fr_auto] md:items-end"
      >
        <div>
          <div className="mb-4 inline-flex items-center gap-3 border border-emerald-400/20 bg-emerald-400/[0.04] px-4 py-2">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-200">Institutional integration portal</span>
          </div>
          <h1 className="mb-4 text-4xl font-serif font-light leading-tight text-white md:text-6xl">
            Build against the reviewable control layer.
          </h1>
          <p className="max-w-3xl text-sm leading-[1.9] text-slate-400 md:text-base">
            This portal frames integration work around credentials, wallet permissions, policy events, and audit exports. It is built for pilot scoping and technical review, not public-chain deployment theatrics.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 md:w-[23rem] md:grid-cols-1">
          <button
            type="button"
            onClick={() => navigate('/review-room')}
            className="group flex items-center justify-between border border-fc-gold/25 bg-fc-gold/[0.04] px-5 py-4 text-left transition-colors hover:border-fc-gold/50 hover:bg-fc-gold/[0.08]"
          >
            <span className="text-sm text-fc-gold">Open pilot packet</span>
            <ArrowRight className="h-4 w-4 text-fc-gold transition-transform group-hover:translate-x-1" />
          </button>
          <button
            type="button"
            onClick={() => navigate('/identity')}
            className="group flex items-center justify-between border border-white/10 bg-white/[0.02] px-5 py-4 text-left transition-colors hover:border-emerald-300/40 hover:bg-emerald-300/[0.04]"
          >
            <span className="text-sm text-slate-200">Review identity model</span>
            <ArrowRight className="h-4 w-4 text-emerald-300 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </motion.header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {integrationTracks.map((track, index) => {
          const Icon = track.icon;

          return (
            <motion.article
              key={track.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.08 }}
              className="agency-panel flex min-h-[22rem] flex-col p-6 md:p-7"
            >
              <div className="mb-8 flex items-start justify-between gap-5">
                <div>
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-300/80">{track.label}</p>
                  <h2 className="text-2xl font-serif font-light leading-tight text-white">{track.title}</h2>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/10 bg-white/[0.03]">
                  <Icon className="h-5 w-5 text-emerald-300" />
                </div>
              </div>
              <p className="mb-8 text-sm leading-[1.85] text-slate-400">{track.copy}</p>
              <div className="mt-auto border-t border-white/10 pt-5">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">Reviewer asks for</p>
                <p className="text-sm text-slate-200">{track.proof}</p>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.76fr_1.24fr]">
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="agency-panel p-6 md:p-8"
        >
          <div className="mb-7 flex items-center gap-3">
            <FileCheck2 className="h-5 w-5 text-fc-gold" />
            <h2 className="text-xl font-serif font-light text-white">Integration review checklist</h2>
          </div>
          <div className="space-y-3">
            {reviewArtifacts.map((artifact, index) => (
              <div key={artifact} className="flex items-start gap-4 border border-white/10 bg-white/[0.02] px-4 py-3">
                <span className="mt-0.5 font-mono text-[10px] text-fc-gold/80">0{index + 1}</span>
                <span className="text-sm leading-relaxed text-slate-300">{artifact}</span>
              </div>
            ))}
          </div>
          <div className="mt-7 border border-white/10 bg-[#020617]/70 p-5">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">Default rule</p>
            <p className="text-sm leading-relaxed text-slate-400">
              Integrations start in a sandbox, carry sample labels until verified sources are connected, and never require a reviewer to inspect network economics before the use case is understood.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="agency-panel overflow-hidden"
        >
          <div className="flex flex-wrap border-b border-white/10 bg-black/30">
            {(Object.keys(integrationSnippets) as SnippetKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`border-r border-white/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                  activeTab === key ? 'bg-white/10 text-emerald-200' : 'text-slate-500 hover:bg-white/[0.04] hover:text-slate-200'
                }`}
              >
                {integrationSnippets[key].tab}
              </button>
            ))}
          </div>
          <div className="grid min-h-[34rem] grid-cols-1 lg:grid-cols-[1fr_18rem]">
            <div className="overflow-auto bg-[#020617]/95 p-5">
              <div className="mb-4 flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <Code2 className="h-4 w-4 text-emerald-300" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">{activeSnippet.file}</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300/70">Sample</span>
              </div>
              <pre className="overflow-auto whitespace-pre-wrap break-words text-[12px] leading-[1.8] text-slate-300">
                <code>{activeSnippet.code}</code>
              </pre>
            </div>
            <aside className="border-t border-white/10 bg-white/[0.02] p-6 lg:border-l lg:border-t-0">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-fc-gold/80">Pilot posture</p>
              <h3 className="mb-5 text-2xl font-serif font-light leading-tight text-white">Make each integration auditable before it is impressive.</h3>
              <div className="space-y-4 text-sm leading-relaxed text-slate-400">
                <p>Every sample event should answer where the data came from, who can approve it, what is exposed, and how it can be revoked.</p>
                <p>The production path is evidence first: connect one issuer, one service workflow, and one reporting surface.</p>
              </div>
            </aside>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default DeveloperHub;
