import { ArrowRight, Building2, Code2, Landmark, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FadeInUp } from '../components/FadeInUp';
import { TiltCard } from '../components/TiltCard';
import { CipherHeading } from '../components/CipherHeading';

const deploymentPaths = [
  {
    icon: Landmark,
    audience: 'Government Programs',
    title: 'Digital public services',
    summary: 'Issue verifiable identity, route benefits, and supervise public treasury flows from one auditable authority layer.',
    proof: 'Resident credentials, benefit disbursement, compliance dashboards',
    action: 'Review Identity',
    route: '/identity',
    accent: 'text-fc-gold',
    border: 'hover:border-fc-gold/45',
  },
  {
    icon: Building2,
    audience: 'Institutions',
    title: 'Treasury and settlement',
    summary: 'Connect verified operators to seedless wallets, auto-gas execution, programmable payouts, and policy-bound approvals.',
    proof: 'MPC custody, merchant settlement, treasury controls',
    action: 'Open Dashboard',
    route: '/dashboard',
    accent: 'text-cyan-300',
    border: 'hover:border-cyan-400/45',
  },
  {
    icon: Code2,
    audience: 'Ecosystem Builders',
    title: 'Identity-aware applications',
    summary: 'Build services that consume identity proofs, wallet permissions, governance events, and settlement rails without rebuilding trust infrastructure.',
    proof: 'SDK access, oracle hooks, compliance gates',
    action: 'Developer Console',
    route: '/developer',
    accent: 'text-emerald-300',
    border: 'hover:border-emerald-400/45',
  },
];

export const ConversionSection = () => {
  const navigate = useNavigate();

  return (
    <section id="deployment" className="py-24 px-6 lg:px-12 bg-[#05070b] border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-tactical-dots opacity-25 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fc-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeInUp>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-px bg-fc-gold/45" />
                <h2 className="text-xs font-bold text-fc-gold uppercase">
                  <CipherHeading text="04 // Deployment Paths" />
                </h2>
              </div>
              <h3 className="text-5xl md:text-7xl font-serif font-light text-white leading-tight mb-6">
                <CipherHeading text="Choose The " className="inline-block" />
                <span className="italic text-fc-gold font-serif"><CipherHeading text="Entry Point." /></span>
              </h3>
              <p className="text-base md:text-lg text-slate-400 leading-[1.8] max-w-2xl">
                Future Citizen becomes easier to understand when every conversation starts from the buyer's first useful deployment. Identity is the base, but the business case changes by audience.
              </p>
            </div>

            <div className="border border-white/10 bg-white/[0.02] px-6 py-5 max-w-sm">
              <div className="flex items-center gap-3 text-white mb-3">
                <ShieldCheck className="w-5 h-5 text-fc-gold" />
                <span className="text-sm font-medium">Conversion rule</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Lead with the deployment path, then show the chain, token, and governance system as supporting infrastructure.
              </p>
            </div>
          </div>
        </FadeInUp>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {deploymentPaths.map((path, index) => {
            const Icon = path.icon;

            return (
              <FadeInUp key={path.title} delay={0.15 + index * 0.12} className="h-full">
                <TiltCard intensity={7} className="h-full">
                  <article className={`agency-panel h-full p-8 md:p-10 bg-[#020617]/90 border border-slate-800 ${path.border} transition-colors duration-500 flex flex-col`}>
                    <div className="flex items-start justify-between gap-6 mb-10">
                      <div>
                        <p className={`text-xs uppercase ${path.accent} mb-4`}>{path.audience}</p>
                        <h4 className="text-3xl font-serif font-light text-white leading-tight">{path.title}</h4>
                      </div>
                      <div className="w-12 h-12 border border-white/10 bg-white/[0.03] flex items-center justify-center shrink-0">
                        <Icon className={`w-6 h-6 ${path.accent}`} />
                      </div>
                    </div>

                    <p className="text-sm text-slate-400 leading-[1.9] mb-8">{path.summary}</p>

                    <div className="mt-auto border-t border-white/10 pt-6">
                      <p className="text-xs uppercase text-slate-500 mb-3">First proof of value</p>
                      <p className="text-sm text-white/85 leading-relaxed mb-8">{path.proof}</p>
                      <button
                        type="button"
                        onClick={() => navigate(path.route)}
                        className="group inline-flex w-full items-center justify-between gap-4 border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-white transition-colors hover:border-fc-gold/40 hover:bg-fc-gold/5"
                      >
                        <span>{path.action}</span>
                        <ArrowRight className="w-4 h-4 text-fc-gold transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
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
