import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { CipherHeading } from '../components/CipherHeading';
import { useWallet } from '../contexts/WalletContext';
import { useToast } from '../contexts/ToastContext';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { mockDataService, type IdentityStat, type ActivityLog } from '../services/mockDataService';
import { ConnectWalletModal } from '../components/ConnectWalletModal';
import { IssuerDemo } from '../components/IssuerDemo';
import { lazy, Suspense } from 'react';
const IdentityAvatar = lazy(() => import('../components/IdentityAvatar').then(module => ({ default: module.IdentityAvatar })));

const generateHash = (length = 16) => {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < length; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
};

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
    copy: 'MPC-backed wallets allow signing and recovery to be split across approved controls instead of relying on a single seed phrase. The recovery process itself is reviewable rather than informal.',
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
    copy: 'Underlying participant records do not need to be placed on a public settlement chain. Eligibility checks can be performed against zero-knowledge proofs or selectively disclosed fields.',
    reviewerQuestion: 'Where does the data physically live, and what leaves the issuer environment?',
  },
];

export default function Identity() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { connectedIdentity, balances, level, stakedFCC } = useWallet();
  const [isMinted, setIsMinted] = useState(false);
  const [mintPhase, setMintPhase] = useState(0); // 0=idle, 1=uplink, 2=biometrics, 3=hash, 4=minting, 5=done
  const [isScanning, setIsScanning] = useState(true);
  const [authHash, setAuthHash] = useState('');
  const [identityStats, setIdentityStats] = useState<IdentityStat[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [showHolderPreview, setShowHolderPreview] = useState(false);
  const { playSuccess } = useSoundEffects();
  
  // 使用 ref 存储所有 timeout ID
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  const startMintingFlow = useCallback(() => {
    // 清理之前的 timeouts
    clearAllTimeouts();
    
    setMintPhase(1); // Establishing Secure Uplink
    
    const t1 = setTimeout(() => setMintPhase(2), 2000); // Checking credential factors
    timeoutsRef.current.push(t1);
    
    const t2 = setTimeout(() => {
      setMintPhase(3); // Generating review hash
      let hash = '';
      for(let i=0; i<32; i++) {
          hash += Math.floor(Math.random()*16).toString(16).toUpperCase();
      }
      setAuthHash(hash);
    }, 5000);
    timeoutsRef.current.push(t2);
    
    const t3 = setTimeout(() => setMintPhase(4), 7000); // Issuing credential
    timeoutsRef.current.push(t3);
    
    const t4 = setTimeout(() => {
      setMintPhase(5); // Done
      playSuccess();
      const t5 = setTimeout(() => setIsMinted(true), 1500); // Reveal Identity
      timeoutsRef.current.push(t5);
    }, 9000);
    timeoutsRef.current.push(t4);
  }, [playSuccess, clearAllTimeouts]);

  // 组件卸载时清理所有 timeouts
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);


  // 16-segment radar stats (mock)
  const stats = [85, 92, 78, 65, 88, 95];
  const maxStat = 100;
  const labels = ['TRUST', 'ACCESS', 'ACTIVITY', 'GOVERNANCE', 'RECORDS', 'OPERATIONS'];

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleInitializeIdentity = useCallback(() => {
    if (!connectedIdentity) {
      setIsWalletModalOpen(true);
      toast({ message: 'Authorization required before identity verification.', type: 'process' });
      return;
    }

    startMintingFlow();
  }, [connectedIdentity, startMintingFlow, toast]);

  useEffect(() => {
    if (isMinted) {
      const timer = setTimeout(() => setIsScanning(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isMinted, connectedIdentity]);

  useEffect(() => {
    let mounted = true;
    
    Promise.all([
      mockDataService.getIdentityStats(),
      mockDataService.getActivityLogs()
    ]).then(([statsData, logsData]) => {
      if (mounted) {
        setIdentityStats(statsData);
        setActivityLogs(logsData);
        setIsDataLoading(false);
      }
    });

    return () => { mounted = false; };
  }, [connectedIdentity]);

  // SVG Radar generator logic
  const radarRadius = 100;
  const centerX = 150;
  const centerY = 150;
  const availableLiquidity = balances.fcc;
  const delegatedLiquidity = stakedFCC;
  const portfolioUsdValue = availableLiquidity * 0.69;
  const credentialStatus = !connectedIdentity
    ? 'AWAITING AUTHORIZATION'
    : isMinted
      ? 'VERIFIED'
      : 'READY FOR ISSUANCE';
  const credentialTier = level >= 3 ? 'INSTITUTIONAL' : level >= 2 ? 'CIVIC PLUS' : 'CITIZEN';
  
  const getPointCoordinates = (value: number, index: number, total: number, customRadius = radarRadius) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const distance = (value / maxStat) * customRadius;
    const x = centerX + distance * Math.cos(angle);
    const y = centerY + distance * Math.sin(angle);
    return { x, y };
  };



  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 md:space-y-12 flex flex-col items-center md:items-stretch">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-serif font-light text-white mb-2">
            <CipherHeading text="Identity Layer" />
          </h1>
          <p className="text-slate-400 font-mono text-xs tracking-widest">ISSUER BRIEF + HOLDER PREVIEW</p>
        </div>
        {level >= 2 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-xs font-bold text-yellow-500 tracking-widest uppercase">Premium</span>
          </div>
        )}
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
            <span className="h-1.5 w-1.5 rounded-full bg-fc-gold" />
            <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-slate-400">Brief — sample data</span>
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
        <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-slate-400">
          Issuer view is the institutional brief. Holder preview below is a sample wallet experience, not a procurement artifact.
        </p>
      </section>

      <IssuerDemo />

      {/* Holder view divider */}
      <div className="mb-10 border-b border-white/10 pb-6">
        <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-fc-gold">Holder view</p>
        <h2 className="text-2xl md:text-3xl font-serif font-light text-white leading-tight">
          What a verified holder sees.
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
          Holder preview only — sample wallet view. Optional. Click below to expand a representative credential issuance and wallet experience.
        </p>
        <button
          type="button"
          onClick={() => setShowHolderPreview((prev) => !prev)}
          className="mt-5 inline-flex items-center gap-3 border border-white/10 bg-white/[0.02] px-5 py-2.5 text-[11px] font-mono uppercase tracking-[0.22em] text-slate-300 transition-colors hover:border-fc-gold/40 hover:bg-fc-gold/5 hover:text-white"
          aria-expanded={showHolderPreview}
        >
          <span aria-hidden>{showHolderPreview ? '▼' : '▶'}</span>
          {showHolderPreview ? 'Hide holder preview' : 'Show holder preview'}
        </button>
      </div>

      {showHolderPreview && (
        <>
      {!isMinted ? (
        <div className="flex flex-col items-center justify-center py-20">
          {/* Minting Flow Visualization */}
          <motion.div 
            className="relative w-full max-w-2xl vercel-glass-card p-6 md:p-12 flex flex-col items-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            {/* Animated Connection Lines */}
            <div className="absolute inset-0 overflow-hidden">
              <svg className="w-full h-full opacity-20">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {mintPhase === 0 ? (
              <>
                <Suspense fallback={<div className="w-full h-full animate-pulse bg-cyan-500/10 rounded-full" />}>
                  <IdentityAvatar address={connectedIdentity || '0x0000000000000000000000000000000000000000'} level={level} />
                </Suspense>
                <h2 className="text-2xl font-display text-white mb-2 mt-8">Activate Your Identity</h2>
                <p className="text-slate-400 text-sm text-center max-w-md mb-8">
                  Issue a verifiable identity credential anchored to FC Chain.
                  This process is secure, private, and designed for wallet-bound access.
                </p>
                <button 
                  onClick={handleInitializeIdentity}
                  className="btn-vercel-primary px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase"
                >
                  {connectedIdentity ? 'Initialize Verification' : 'Authorize Identity'}
                </button>
                <p className="mt-4 text-[10px] font-mono tracking-[0.3em] uppercase text-slate-500 text-center">
                  {connectedIdentity ? 'Authorization complete. Verification sequence available.' : 'Authorize an identity credential before issuing access.'}
                </p>
              </>
            ) : (
              <div className="flex flex-col items-center py-8">
                <div className="w-24 h-24 relative mb-6">
                  {/* Orbiting particles animation */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
                    >
                      <div 
                        className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] absolute"
                        style={{ top: 0, left: '50%', transform: 'translateX(-50%)' }}
                      />
                    </motion.div>
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-cyan-400">{Math.floor((mintPhase / 5) * 100)}%</span>
                  </div>
                </div>

                <div className="space-y-2 text-center">
                  <div className={`text-sm font-mono transition-colors ${mintPhase >= 1 ? 'text-cyan-400' : 'text-slate-400'}`}>
                    {mintPhase > 1 ? '✓' : mintPhase === 1 ? '⟳' : '○'} Establishing secure session...
                  </div>
                  <div className={`text-sm font-mono transition-colors ${mintPhase >= 2 ? 'text-cyan-400' : 'text-slate-400'}`}>
                    {mintPhase > 2 ? '✓' : mintPhase === 2 ? '⟳' : '○'} Checking credential factors...
                  </div>
                  <div className={`text-sm font-mono transition-colors ${mintPhase >= 3 ? 'text-cyan-400' : 'text-slate-400'}`}>
                    {mintPhase > 3 ? '✓' : mintPhase === 3 ? '⟳' : '○'} Generating review hash...
                  </div>
                  <div className={`text-sm font-mono transition-colors ${mintPhase >= 4 ? 'text-cyan-400' : 'text-slate-400'}`}>
                    {mintPhase > 4 ? '✓' : mintPhase === 4 ? '⟳' : '○'} Issuing Credential...
                  </div>
                  
                  {mintPhase === 3 && authHash && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 p-3 bg-black/50 font-mono text-xs text-yellow-400 break-all max-w-sm"
                    >
                      HASH: 0x{authHash}
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Identity Card */}
          <motion.div 
            className="lg:col-span-2 vercel-glass-card p-4 md:p-8 relative overflow-hidden group w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            {/* Holographic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="relative z-10 space-y-8">
              {/* --- 1. CREDENTIAL DECK --- */}
              <div className="flex flex-col md:flex-row gap-8 items-start relative pb-6 border-b border-white/5">
                {/* Tactical Backdrop */}
                <div className="absolute inset-0 bg-tactical-grid opacity-[0.15] bg-[length:30px_30px] pointer-events-none" />
                
                {/* Avatar Section */}
                <div className="w-32 h-32 md:w-40 md:h-40 relative flex-shrink-0 z-10">
                  <Suspense fallback={<div className="absolute inset-0 animate-pulse bg-cyan-500/10 rounded-none" />}>
                    <IdentityAvatar address={connectedIdentity || '0x0000...0000'} level={level} />
                  </Suspense>
                  
                  {/* Digital Borders */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/50" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/50" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50" />
                  
                  {isScanning && (
                    <motion.div 
                      className="absolute inset-0 border border-cyan-400/30 bg-cyan-400/10"
                      animate={{ opacity: [0.1, 0.5, 0.1], translateY: ["-10%", "10%", "-10%"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Identity Details */}
                <div className="flex-1 space-y-6 w-full z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-display font-light text-white tracking-widest uppercase">Citizen ID</h2>
                      </div>
                      <p className="font-mono text-xs text-slate-400 bg-black/50 px-3 py-1.5 inline-block border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]">{connectedIdentity || 'Not Connected'}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="border border-cyan-500/20 bg-cyan-500/5 px-3 py-2 text-[9px] font-mono tracking-[0.28em] text-cyan-300 uppercase">{credentialStatus}</span>
                        <span className="border border-yellow-500/20 bg-yellow-500/5 px-3 py-2 text-[9px] font-mono tracking-[0.28em] text-yellow-400 uppercase">{credentialTier}</span>
                      </div>
                    </div>
                    {/* Official Seal Mockup */}
                    <div className="w-16 h-16 rounded-full border border-yellow-500/30 hidden md:flex items-center justify-center bg-yellow-500/5 relative">
                      <div className="absolute inset-0 rounded-full border border-dashed border-yellow-500/50 animate-spin-slow" />
                      <span className="text-[8px] font-bold text-yellow-500 tracking-[0.2em] uppercase text-center leading-tight">State<br/>Auth</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-black/40 border border-white/5 relative overflow-hidden group-hover:border-cyan-500/20 transition-colors">
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                      <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-1">Clearance</div>
                      <div className="font-bold text-cyan-400 font-mono tracking-wider">LEVEL {level}</div>
                    </div>
                    <div className="p-3 bg-black/40 border border-white/5 group-hover:border-green-500/20 transition-colors relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
                      <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-1">Status</div>
                      <div className="font-bold text-green-400 font-mono tracking-wider">{connectedIdentity ? 'ACTIVE' : 'PENDING'}</div>
                    </div>
                    <div className="col-span-2 p-3 bg-black/40 border border-white/5">
                      <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-1">Authorization Hash</div>
                      <div className="font-mono text-[10px] text-yellow-500 truncate">{authHash || generateHash()}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => navigate('/dashboard')}
                      className="border border-white/10 bg-white/5 px-4 py-3 text-[10px] font-mono tracking-[0.32em] text-white uppercase transition-colors hover:bg-white/10"
                    >
                      Open Dashboard
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/#deployment')}
                      className="border border-fc-gold/30 bg-fc-gold/5 px-4 py-3 text-[10px] font-mono tracking-[0.32em] text-fc-gold uppercase transition-colors hover:border-fc-gold/50 hover:bg-fc-gold/10"
                    >
                      Map to deployment path
                    </button>
                  </div>
                </div>
              </div>

              {/* Data Matrix / Visual Barcode */}
              <div className="w-full h-10 bg-tactical-dots bg-[length:8px_8px] opacity-30 border-y border-white/10 flex items-center px-4 overflow-hidden relative">
                 <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500/10 via-transparent to-yellow-500/10 pointer-events-none" />
                 <div className="font-mono text-[8px] tracking-[0.3em] text-cyan-400 opacity-60 whitespace-nowrap overflow-hidden">
                   {generateHash(128)}
                 </div>
              </div>

              {/* --- 2. THE CONTROL VAULT --- */}
              <div className="pt-8">
                <div className="flex items-center gap-3 mb-6 relative">
                  <div className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-yellow-500/30 to-transparent" />
                  <svg className="w-5 h-5 text-yellow-600 drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <h3 className="text-xl font-bold text-white tracking-[0.2em] uppercase text-shadow-gold">Control Vault</h3>
                  <span className="ml-auto border border-fc-gold/25 bg-fc-gold/5 px-3 py-1 text-[9px] font-mono uppercase tracking-[0.28em] text-fc-gold/80">Sample preview</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  {/* Balance Panel */}
                  <div className="p-6 bg-[#09090b] border border-yellow-500/20 relative group hover:border-yellow-500/50 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute left-0 top-0 w-1 h-full bg-yellow-600/50 group-hover:bg-yellow-500 transition-colors" />
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-2 font-mono ml-2">Available Liquidity</div>
                    <div className="flex items-baseline gap-2 ml-2">
                       <span className="text-3xl font-display font-bold text-white tracking-wider">{availableLiquidity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                       <span className="text-yellow-600 font-bold font-mono">FCC</span>
                    </div>
                    <div className="mt-4 text-[10px] font-mono text-slate-500 flex justify-between ml-2 pt-4 border-t border-white/5">
                       <span>USD EQUIVALENT</span>
                       <span className="text-slate-300">~${portfolioUsdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  {/* Staked / Delegated Panel */}
                  <div className="p-6 bg-[#09090b] border border-cyan-500/20 relative group hover:border-cyan-500/50 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute left-0 top-0 w-1 h-full bg-cyan-600/50 group-hover:bg-cyan-400 transition-colors" />
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-2 font-mono ml-2">Delegated To Network</div>
                    <div className="flex items-baseline gap-2 ml-2">
                       <span className="text-3xl font-display font-bold text-white tracking-wider">{delegatedLiquidity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                       <span className="text-cyan-600 font-bold font-mono">FCC</span>
                    </div>
                    <div className="mt-4 text-[10px] font-mono text-slate-500 flex justify-between ml-2 pt-4 border-t border-white/5">
                       <span>VERIFIED NODES</span>
                       <span className="text-slate-300">{delegatedLiquidity > 0 ? '4 ACTIVE' : 'NO POSITIONS'}</span>
                    </div>
                  </div>
                </div>

                {/* Radar Stats Sub-Section inside the vault */}
                <div className="mt-12 relative overflow-hidden bg-black/30 border border-white/5 p-8 flex flex-col md:flex-row items-center gap-12">
                   <div className="absolute inset-0 bg-tactical-grid opacity-20 pointer-events-none mix-blend-screen" />
                   
                   <div className="flex-1 space-y-4 relative z-10 w-full">
                     <h4 className="text-sm font-bold text-white tracking-widest uppercase">Trust Metrics</h4>
                     <p className="text-xs text-slate-400 leading-relaxed">
                       Credential status, wallet activity, governance permissions, and operational records are presented as reviewable indicators. These values are representative until connected to a production identity data source.
                     </p>
                     <div className="pt-4 space-y-2">
                       {stats.slice(0, 3).map((stat, idx) => (
                         <div key={idx} className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-2">
                           <span className="text-slate-500">{labels[idx]}</span>
                           <span className={stat > 80 ? "text-cyan-400" : "text-yellow-500"}>{stat}%</span>
                         </div>
                       ))}
                     </div>
                   </div>

                   <div className="relative w-[200px] h-[200px] flex-shrink-0 flex items-center justify-center">
                     <svg width="240" height="240" className="overflow-visible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        {/* Background Grid */}
                        {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
                          <polygon
                            key={i}
                            points={stats.map((_, idx) => {
                              const coords = getPointCoordinates(scale * maxStat, idx, stats.length, 80);
                              return `${coords.x},${coords.y}`;
                            }).join(' ')}
                            fill="none"
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="1"
                          />
                        ))}
                        
                        {/* Data Polygon */}
                        <motion.path
                          d={stats.map((s, i) => getPointCoordinates(s, i, stats.length, 80)).map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'}
                          fill="rgba(6, 182, 212, 0.15)"
                          stroke="#06b6d4"
                          strokeWidth="1.5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                        
                        {/* Labels */}
                        {labels.map((label, i) => {
                          const coords = getPointCoordinates(maxStat * 1.25, i, labels.length, 80);
                          return (
                            <text
                              key={label}
                              x={coords.x}
                              y={coords.y}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="fill-slate-500 text-[8px] uppercase tracking-widest font-mono"
                            >
                              {label}
                            </text>
                          );
                        })}
                      </svg>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Activity Log Sidebar */}
          <div className="space-y-6">
            <div className="vercel-glass-card p-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                Identity Metrics
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {isDataLoading ? (
                  [1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-20 bg-white/5 animate-pulse" />
                  ))
                ) : (
                  identityStats.map((stat) => (
                    <div key={stat.title} className="border border-white/5 bg-black/30 p-4">
                      <div className="text-[9px] font-mono tracking-[0.28em] text-slate-500 uppercase">{stat.title}</div>
                      <div className="mt-2 text-2xl font-display text-white">{stat.val}</div>
                      <div className="mt-1 text-[10px] font-mono text-cyan-300">{stat.sub}</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="vercel-glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              Activity Log
            </h3>
            <div className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin">
              {isDataLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-white/5 animate-pulse" />
                  ))}
                </div>
              ) : (
                activityLogs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 bg-black/30 border border-white/5 hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm text-white mb-1">{log.action}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{log.target}</div>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono whitespace-nowrap">
                        {log.time}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            </div>
          </div>
        </div>
      )}
        </>
      )}
      <ConnectWalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </div>
  );
}
