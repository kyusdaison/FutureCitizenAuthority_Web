import { motion, useScroll, useTransform, AnimatePresence, MotionConfig } from 'framer-motion';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { OfficialBackground } from './components/OfficialBackground';
import { MobileMenu } from './components/MobileMenu';
import { LiveTelemetryFooter } from './components/LiveTelemetryFooter';
import { CommandPalette, type Command } from './components/CommandPalette';
import { ConnectWalletModal } from './components/ConnectWalletModal';
import { HeroSection } from './sections/HeroSection';
import { OperatingModelSection } from './sections/OperatingModelSection';
import { AssuranceSection } from './sections/AssuranceSection';
import { ConversionSection } from './sections/ConversionSection';
import { FooterSection } from './sections/FooterSection';
import { Sidebar } from './components/Sidebar';
import React, { Suspense } from 'react';
import { PageLoader } from './components/PageLoader';
import { SeoMeta } from './components/SeoMeta';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Ecosystem = React.lazy(() => import('./pages/Ecosystem'));
const Explorer = React.lazy(() => import('./pages/Explorer'));
const DeveloperHub = React.lazy(() => import('./pages/DeveloperHub'));
const Identity = React.lazy(() => import('./pages/Identity'));
const ReviewRoom = React.lazy(() => import('./pages/ReviewRoom'));
const PilotApplication = React.lazy(() => import('./pages/PilotApplication'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const Terms = React.lazy(() => import('./pages/Terms'));
const Security = React.lazy(() => import('./pages/Security'));

import { useWallet } from './contexts/WalletContext';
import { useCommandPalette } from './hooks/useCommandPalette';
import { useMouseTracker } from './hooks/useMouseTracker';
import { useSoundEffects } from './hooks/useSoundEffects';

type View = 'home' | 'dashboard' | 'ecosystem' | 'explorer' | 'developer' | 'identity' | 'review-room' | 'pilot-application' | 'privacy' | 'terms' | 'security';

const homeNavItems = [
  { label: 'Model', target: 'model' },
  { label: 'Assurance', target: 'assurance' },
  { label: 'Pilot', target: 'deployment' },
];

const legalViews: View[] = ['privacy', 'terms', 'security'];

export default function App() {
  const location = useLocation();
  const navigateFn = useNavigate();
  const rawView = location.pathname === '/' ? 'home' : location.pathname.slice(1);
  const currentView = (rawView === 'passport' ? 'identity' : rawView) as View;
  const isReviewRoom = currentView === 'review-room';
  const isPilotApplication = currentView === 'pilot-application';
  const isLegalView = legalViews.includes(currentView);
  const navigate = useCallback((view: string) => {
    navigateFn(view === 'home' ? '/' : `/${view}`);
  }, [navigateFn]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { isOpen: isCommandPaletteOpen, close: closeCommandPalette, open: openCommandPalette } = useCommandPalette();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { connectedIdentity } = useWallet();
  const { scrollYProgress } = useScroll();
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const { toggleAmbient } = useSoundEffects();
  
  const [isLowPowerMode, setIsLowPowerMode] = useState(() => {
    return localStorage.getItem('fca:low-power-mode') === 'true';
  });

  useEffect(() => {
    if (isLowPowerMode) {
      document.body.classList.add('low-power-mode');
      localStorage.setItem('fca:low-power-mode', 'true');
    } else {
      document.body.classList.remove('low-power-mode');
      localStorage.setItem('fca:low-power-mode', 'false');
    }
  }, [isLowPowerMode]);

  useEffect(() => {
    if (rawView === 'passport') {
      navigateFn('/identity', { replace: true });
    }
  }, [rawView, navigateFn]);

  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useMouseTracker();

  const scrollToSection = useCallback((target: string) => {
    const element = document.getElementById(target);
    if (!element) return;

    window.history.replaceState(null, '', `#${target}`);
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const navigateToHomeSection = useCallback((target: string) => {
    if (currentView !== 'home') {
      navigateFn(`/#${target}`);
      return;
    }

    scrollToSection(target);
  }, [currentView, navigateFn, scrollToSection]);

  useEffect(() => {
    if (!location.hash) return;

    const target = location.hash.slice(1);
    const timers = [150, 650].map((delay) =>
      window.setTimeout(() => scrollToSection(target), delay)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [currentView, location.hash, scrollToSection]);

  // 使用 useMemo 缓存 commands 数组
  const commands: Command[] = useMemo(() => [
    {
      id: 'nav-dashboard',
      title: 'Open Operating Dashboard',
      subtitle: 'Pilot controls, source labels, and institutional operating posture',
      action: () => { navigate('dashboard'); closeCommandPalette(); }
    },
    {
      id: 'nav-ecosystem',
      title: 'Open Integration Directory',
      subtitle: 'Payment, asset, identity, and governance integrations',
      action: () => { navigate('ecosystem'); closeCommandPalette(); }
    },
    {
      id: 'nav-explorer',
      title: 'Open Evidence Explorer',
      subtitle: 'Audit evidence, exceptions, and settlement references',
      action: () => { navigate('explorer'); closeCommandPalette(); }
    },
    {
      id: 'nav-home',
      title: 'Go to Home Page',
      subtitle: 'Institutional landing page',
      action: () => { navigate('home'); closeCommandPalette(); }
    },
    {
      id: 'nav-review-room',
      title: 'Open Review Room',
      subtitle: 'Pilot packet, control files, and approval matrix',
      action: () => { navigate('review-room'); closeCommandPalette(); }
    },
    {
      id: 'nav-pilot-application',
      title: 'Request Pilot Review',
      subtitle: 'Application intake, email draft, and local conversion event',
      action: () => { navigate('pilot-application'); closeCommandPalette(); }
    },
    {
      id: 'nav-privacy',
      title: 'Open Privacy Policy',
      subtitle: 'Visitor data, local browser state, and pilot-review contact handling',
      action: () => { navigate('privacy'); closeCommandPalette(); }
    },
    {
      id: 'nav-security',
      title: 'Open Security Posture',
      subtitle: 'Demo boundaries, pilot controls, and vulnerability reporting',
      action: () => { navigate('security'); closeCommandPalette(); }
    },
    {
      id: 'nav-model',
      title: 'See Operating Model',
      subtitle: 'Identity, wallet, governance, and pilot flow',
      action: () => { navigateToHomeSection('model'); closeCommandPalette(); }
    },
    {
      id: 'nav-deployment',
      title: 'See Deployment Paths',
      subtitle: 'Government, institution, and builder entry points',
      action: () => { navigateToHomeSection('deployment'); closeCommandPalette(); }
    },
    {
      id: 'nav-assurance',
      title: 'Inspect Institutional Assurance',
      subtitle: 'Compliance, data governance, and pilot readiness',
      action: () => { navigateToHomeSection('assurance'); closeCommandPalette(); }
    },
    {
      id: 'nav-developer',
      title: 'Open Integration Portal',
      subtitle: 'SDKs, integration paths, and deployment tooling',
      action: () => { navigate('developer'); closeCommandPalette(); }
    },
    {
      id: 'nav-identity',
      title: 'Go to Identity',
      subtitle: 'Verified identity review layer',
      action: () => { navigate('identity'); closeCommandPalette(); }
    },
    {
      id: 'action-connect-wallet',
      title: 'Open Identity Preview',
      subtitle: 'Representative identity connection flow',
      action: () => { setIsWalletModalOpen(true); closeCommandPalette(); }
    },
    {
      id: 'sys-reboot',
      title: 'System: Reload Session',
      subtitle: 'Clear session cache and reload the application',
      action: () => { sessionStorage.clear(); window.location.reload(); }
    },
    {
      id: 'sys-power-mode',
      title: `System: ${isLowPowerMode ? 'Disable' : 'Enable'} Low Power Mode`,
      subtitle: 'Toggle heavy visual effects for performance',
      action: () => { 
          setIsLowPowerMode(!isLowPowerMode); 
          closeCommandPalette(); 
      }
    },
    {
      id: 'sys-ambient-drone',
      title: `System: ${ambientPlaying ? 'Disable' : 'Enable'} Ambient Drone`,
      subtitle: 'Toggle deep background hum',
      action: () => { 
          toggleAmbient(!ambientPlaying);
          setAmbientPlaying(!ambientPlaying); 
          closeCommandPalette(); 
      }
    }
  ], [navigate, navigateToHomeSection, closeCommandPalette, ambientPlaying, toggleAmbient, isLowPowerMode]);

  return (
    <MotionConfig reducedMotion="user">
    <SeoMeta currentView={currentView} />
    <div className="min-h-screen bg-[#0b1220] text-slate-100 font-sans selection:bg-cyan-500/20 selection:text-white pb-8">
      <OfficialBackground />

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {isCommandPaletteOpen && (
        <CommandPalette 
          isOpen={isCommandPaletteOpen} 
          onClose={closeCommandPalette} 
          commands={commands} 
        />
      )}

      {isWalletModalOpen && (
        <ConnectWalletModal
          isOpen={isWalletModalOpen}
          onClose={() => setIsWalletModalOpen(false)}
        />
      )}

      {/* Ambient Volumetric Orbs - Muted for Authority */}
      <div className="fixed top-[10%] left-[-15%] w-[50vw] h-[50vw] rounded-full bg-cyan-700/[0.012] blur-[150px] z-0 pointer-events-none mix-blend-screen will-change-transform" />
      <div className="fixed bottom-[-15%] right-[-15%] w-[60vw] h-[60vw] rounded-full bg-slate-500/[0.012] blur-[150px] z-0 pointer-events-none mix-blend-screen will-change-transform" />

      {/* The Immersive 8K Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden scale-105">
        <motion.img 
          style={{ y: yBackground }}
          src="/fcc_web_hero_bg.webp"
          alt="Future Citizen Cinematic Background" 
          className="w-full h-full object-cover opacity-10 mix-blend-screen will-change-transform"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1220]/80 via-[#0b1220]/90 to-[#0b1220]" />
      </div>

      {/* Top Navigation Protocol */}
      {currentView === 'home' && (
      <nav className="fixed top-0 w-full z-50 py-3 sm:py-4 px-4 sm:px-6 md:px-16 flex justify-between items-center bg-[#020617]/95 backdrop-blur-md border-b border-slate-800 transition-all">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <img src="/hero-logo.webp" alt="Future Citizen Authority" className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] grayscale group-hover:grayscale-0 transition-all duration-500" loading="eager" decoding="async" />
          <div className="flex min-w-0 flex-col">
            <span className="max-w-[54vw] truncate text-[11px] font-bold tracking-[0.16em] uppercase text-white sm:max-w-none sm:text-sm sm:tracking-[0.3em]">Future Citizen Authority</span>
            <span className="hidden text-[9px] tracking-[0.2em] font-mono text-slate-500 sm:block">Digital Governance Infrastructure</span>
          </div>
        </div>
        <div className="hidden xl:flex gap-6 2xl:gap-9 text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase font-sans">
          {homeNavItems.map((item) => (
            <button
              key={item.target}
              type="button"
              onClick={() => scrollToSection(item.target)}
              className="hover:text-white transition-colors duration-300 uppercase tracking-[0.2em]"
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={openCommandPalette}
            className="hidden 2xl:flex items-center gap-2 px-3 py-2 bg-[#020306]/80 border border-white/10 overflow-hidden relative group hover:border-cyan-500/30 transition-colors"
          >
            <div className="absolute inset-0 bg-cyan-500/5 -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <svg className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-500 transition-colors relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-[10px] text-slate-500 font-mono font-medium tracking-widest flex items-center gap-1 relative z-10">
              COMMAND <kbd className="font-sans px-1.5 py-0.5 bg-white/5 border border-white/10 text-[9px] group-hover:text-white transition-colors">⌘</kbd><kbd className="font-sans px-1.5 py-0.5 bg-white/5 border border-white/10 text-[9px] group-hover:text-white transition-colors">K</kbd>
            </span>
          </button>
          
          <button onClick={() => navigate('review-room')} className="hidden lg:block relative p-[1px] bg-slate-800 hover:bg-slate-600 transition-colors overflow-hidden group">
            <div className="relative bg-slate-950 px-6 py-2 flex items-center justify-center">
              <span className="text-[10px] font-mono tracking-widest text-slate-300 group-hover:text-white transition-colors z-10">Open Review Room</span>
            </div>
          </button>
          {connectedIdentity && (
            <button
              type="button"
              onClick={() => navigate('identity')}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full transition-colors hover:bg-green-500/15"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-widest">{connectedIdentity}</span>
            </button>
          )}
        </div>
        <button 
          className="xl:hidden flex items-center justify-center w-10 h-10 border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Toggle Mobile Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </nav>
      )}

      {currentView === 'home' ? (
      <motion.main style={{ y: yContent }} className="relative z-10 w-full will-change-transform">
        <HeroSection />
        <OperatingModelSection />
        <AssuranceSection />
        <ConversionSection />
        <FooterSection />
      </motion.main>
      ) : (
        <div className="relative z-10 flex min-h-screen">
          <>
            {/* Mobile Header for dashboard/inner pages */}
            <div className="lg:hidden fixed top-0 left-0 w-full h-16 bg-[#020617]/95 backdrop-blur-md border-b border-slate-800 z-50 flex items-center justify-between px-6">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateFn('/')}>
                <img src="/hero-logo.webp" alt="Logo" className="w-8 h-8 object-contain filter brightness-150" loading="eager" decoding="async" />
                <span className="text-xs font-bold font-mono tracking-widest text-slate-300 uppercase">F.C.A</span>
              </div>
              <button onClick={() => setIsMobileSidebarOpen(true)} className="text-white p-2" aria-label="Toggle Mobile Menu" title="Menu">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              </button>
            </div>

            <Sidebar
              isMobileOpen={isMobileSidebarOpen}
              onCloseMobile={() => setIsMobileSidebarOpen(false)}
              onConnectClick={() => setIsWalletModalOpen(true)}
            />
            <main className="w-full lg:ml-64 lg:w-[calc(100%-16rem)] min-h-screen mt-16 lg:mt-0 relative z-10 overflow-y-auto">
              <Suspense fallback={<PageLoader />}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentView}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full min-h-screen"
                  >
                     {currentView === 'ecosystem' && <Ecosystem />}
                     {currentView === 'dashboard' && <Dashboard />}
                     {currentView === 'explorer' && <Explorer />}
                     {currentView === 'developer' && <DeveloperHub />}
                     {currentView === 'identity' && <Identity />}
                     {currentView === 'review-room' && <ReviewRoom />}
                     {currentView === 'pilot-application' && <PilotApplication />}
                     {currentView === 'privacy' && <Privacy />}
                     {currentView === 'terms' && <Terms />}
                     {currentView === 'security' && <Security />}
                    </motion.div>
                  </AnimatePresence>
                </Suspense>
              </main>
            </>
        </div>
      )}

      {currentView !== 'home' && !isReviewRoom && !isPilotApplication && !isLegalView && (
        <LiveTelemetryFooter />
      )}
    </div>
    </MotionConfig>
  );
}
