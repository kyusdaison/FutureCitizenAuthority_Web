import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Coins,
  Layers,
  ArrowLeftRight,
  Repeat,
  Boxes,
  Compass,
  MessageSquareLock,
  ShieldAlert,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type CommunityPath = {
  icon: LucideIcon;
  title: string;
  route: string;
  copy: string;
  kicker: string;
};

const communityPaths: CommunityPath[] = [
  {
    icon: Coins,
    kicker: 'Economics',
    title: 'Tokenomics',
    route: '/tokenomics',
    copy: 'FCC supply, distribution, fee flow, and reserve model. For token holders and on-chain analysts.',
  },
  {
    icon: Layers,
    kicker: 'Validator',
    title: 'Validator operations',
    route: '/staking',
    copy: 'Delegation, validator selection, rewards, and uptime accountability.',
  },
  {
    icon: ArrowLeftRight,
    kicker: 'Interop',
    title: 'Cross-chain bridge',
    route: '/bridge',
    copy: 'Asset movement between FC Chain and supported networks.',
  },
  {
    icon: Repeat,
    kicker: 'Liquidity',
    title: 'Liquidity router',
    route: '/swap',
    copy: 'Stablecoin and liquidity routing across the FC Chain ecosystem.',
  },
  {
    icon: Boxes,
    kicker: 'Assets',
    title: 'Digital asset registry',
    route: '/artifacts',
    copy: 'Credential and on-chain asset records — the public-facing artifact view.',
  },
  {
    icon: Compass,
    kicker: 'Intelligence',
    title: 'Policy intelligence',
    route: '/oracle',
    copy: 'Network and policy telemetry surfaced for community participants.',
  },
  {
    icon: MessageSquareLock,
    kicker: 'Messaging',
    title: 'Encrypted messaging',
    route: '/whisper',
    copy: 'Communications and proof exchange between verified holders.',
  },
  {
    icon: ShieldAlert,
    kicker: 'Security',
    title: 'Security operations',
    route: '/sentinel',
    copy: 'Public-side security operations view — incident posture and resolution.',
  },
];

const Community = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-10 max-w-7xl mx-auto w-full px-4 lg:px-8 pb-20">
      {/* Sample preview banner */}
      <div className="mt-4 border border-cyan-300/20 bg-cyan-300/[0.04] px-5 py-4 text-sm leading-relaxed text-slate-300">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-300">Community surfaces</span>
        <span className="mx-3 text-slate-600">/</span>
        Network economics, cross-chain rails, validator operations, and other community-facing
        experiences. These are separate from the institutional pitch — buyers evaluating the
        identity and governance layer should start at <button type="button" onClick={() => navigate('/identity')} className="underline underline-offset-4 decoration-fc-gold/50 hover:decoration-fc-gold transition-colors">Identity</button> and <button type="button" onClick={() => navigate('/dashboard')} className="underline underline-offset-4 decoration-fc-gold/50 hover:decoration-fc-gold transition-colors">Dashboard</button>.
      </div>

      {/* Header */}
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-cyan-300">Community</p>
          <h1 className="text-3xl md:text-5xl font-serif font-light text-white leading-tight">
            Network surfaces for participants.
          </h1>
          <p className="mt-3 text-sm leading-[1.85] text-slate-400">
            FC Chain operates as the settlement layer underneath the institutional pitch. These
            views serve token holders, validators, builders, and on-chain analysts — separate
            audiences from procurement reviewers.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="self-start md:self-end border border-white/10 bg-white/[0.02] px-4 py-2 text-[11px] font-mono uppercase tracking-[0.22em] text-slate-200 transition-colors hover:border-fc-gold/40 hover:text-white"
        >
          Back to institutional site
        </button>
      </header>

      {/* Path cards */}
      <section aria-label="Community paths" className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {communityPaths.map((path, index) => {
          const Icon = path.icon;
          return (
            <article key={path.route} className="border border-white/10 bg-[#020617]/70 p-6">
              <div className="mb-5 flex items-center justify-between">
                <Icon className="h-5 w-5 text-cyan-300" />
                <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-slate-600">
                  0{index + 1} // {path.kicker}
                </span>
              </div>
              <h2 className="text-xl font-serif font-light text-white mb-3">{path.title}</h2>
              <p className="mb-5 text-sm leading-relaxed text-slate-400">{path.copy}</p>
              <button
                type="button"
                onClick={() => navigate(path.route)}
                className="group inline-flex w-full items-center justify-between border border-white/10 bg-white/[0.02] px-4 py-3 text-[11px] font-mono uppercase tracking-[0.22em] text-slate-200 transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/5 hover:text-white"
              >
                <span>{path.route}</span>
                <ArrowRight className="h-4 w-4 text-cyan-300 transition-transform group-hover:translate-x-1" />
              </button>
            </article>
          );
        })}
      </section>

      {/* Footer note */}
      <section className="border border-white/10 bg-[#020617]/70 p-6 md:p-8">
        <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-300 mb-3">Why this is a separate area</p>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-300">
          Future Citizen Authority is built for two distinct audiences: governments and regulated
          institutions evaluating identity infrastructure, and the community of token holders,
          validators, and builders running the underlying network. Mixing them on the same surface
          confuses both. Institutional review starts at the home page; community participation lives
          here.
        </p>
      </section>
    </div>
  );
};

export default Community;
