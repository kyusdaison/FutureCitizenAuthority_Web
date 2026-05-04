import { useNavigate, useLocation } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';

interface SidebarProps {
  onConnectClick: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar = ({ onConnectClick, isMobileOpen = false, onCloseMobile }: SidebarProps) => {
  const { connectedIdentity } = useWallet();
  const navigateFn = useNavigate();
  const location = useLocation();
  const rawView = location.pathname === '/' ? 'home' : location.pathname.slice(1);
  const currentView = rawView === 'passport' ? 'identity' : rawView;
  const onNavigate = (view: string) => {
    navigateFn(view === 'home' ? '/' : `/${view}`);
    onCloseMobile?.();
  };
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-[#020306]/80 backdrop-blur-sm z-[90]"
          onClick={onCloseMobile}
        />
      )}
      <aside className={`fixed left-0 top-0 bottom-0 w-64 bg-[#020617]/95 backdrop-blur-md border-r border-slate-800 flex flex-col z-[100] transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="p-6 flex items-center space-x-3 border-b border-slate-800 group pt-8 cursor-pointer" onClick={() => onNavigate('home')}>
        <div className="w-10 h-10 flex items-center justify-center p-1 bg-slate-900 border border-slate-700">
          <img src="/hero-logo.webp" alt="Logo" className="w-full h-full object-contain filter brightness-150" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-sans font-black leading-tight tracking-[0.2em] text-slate-100 uppercase">FUTURE CITIZEN</span>
          <span className="text-[9px] font-mono font-bold leading-none tracking-[0.3em] text-cyan-500 mt-1 uppercase">A U T H O R I T Y</span>
        </div>
      </div>

      <div className="p-4 flex-1">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 px-6">Platform Sections</div>
        <nav className="flex-1 mt-2">
          <ul className="space-y-1 px-4">
            <li>
              <button
                onClick={() => onNavigate('identity')}
                className={`w-full flex items-center space-x-3 px-4 py-2.5  transition-all group ${currentView === 'identity' ? 'text-cyan-400 bg-slate-800/50 border-l-2 border-cyan-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border-l-2 border-transparent'}`}
              >
                 <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                 </svg>
	                 <span className="text-xs font-bold tracking-widest uppercase">Verified Identity</span>
              </button>
            </li>
            
            <li>
              <button 
                onClick={() => onNavigate('dashboard')} 
                className={`w-full flex items-center space-x-3 px-4 py-2.5  transition-all group ${currentView === 'dashboard' ? 'text-cyan-400 bg-slate-800/50 border-l-2 border-cyan-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border-l-2 border-transparent'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
                <span className="text-xs font-bold tracking-widest uppercase">Dashboard</span>
              </button>
            </li>
            
            <li>
              <button 
                onClick={() => onNavigate('ecosystem')} 
                className={`w-full flex items-center space-x-3 px-4 py-2.5  transition-all group ${currentView === 'ecosystem' ? 'text-cyan-400 bg-slate-800/50 border-l-2 border-cyan-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border-l-2 border-transparent'}`}
              >
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                 <span className="text-xs font-bold tracking-widest uppercase">Ecosystem</span>
              </button>
            </li>

            <li>
              <button 
                onClick={() => onNavigate('explorer')} 
                className={`w-full flex items-center space-x-3 px-4 py-2.5  transition-all group ${currentView === 'explorer' ? 'text-cyan-400 bg-slate-800/50 border-l-2 border-cyan-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border-l-2 border-transparent'}`}
              >
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                 <span className="text-xs font-bold tracking-widest uppercase">Telemetry</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => onNavigate('sentinel')}
                className={`w-full flex items-center space-x-3 px-4 py-2.5  transition-all group ${currentView === 'sentinel' ? 'text-red-500 bg-slate-800/50 border-l-2 border-red-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border-l-2 border-transparent'}`}
              >
                 <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                 </svg>
	                 <span className="text-xs font-bold tracking-widest uppercase">Security Operations</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => onNavigate('tokenomics')}
                className={`w-full flex items-center space-x-3 px-4 py-2.5  transition-all group ${currentView === 'tokenomics' ? 'text-cyan-400 bg-slate-800/50 border-l-2 border-cyan-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border-l-2 border-transparent'}`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-bold tracking-widest uppercase">Economics</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => onNavigate('bridge')}
                className={`w-full flex items-center space-x-3 px-4 py-2.5  transition-all group ${currentView === 'bridge' ? 'text-cyan-400 bg-slate-800/50 border-l-2 border-cyan-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border-l-2 border-transparent'}`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <span className="text-xs font-bold tracking-widest uppercase">Cross-Chain</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => onNavigate('swap')}
                className={`w-full flex items-center space-x-3 px-4 py-2.5  transition-all group ${currentView === 'swap' ? 'text-cyan-400 bg-slate-800/50 border-l-2 border-cyan-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border-l-2 border-transparent'}`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
	                <span className="text-xs font-bold tracking-widest uppercase">Liquidity Rail</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => onNavigate('whisper')}
                className={`w-full flex items-center space-x-3 px-4 py-2.5  transition-all group ${currentView === 'whisper' ? 'text-cyan-400 bg-slate-800/50 border-l-2 border-cyan-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border-l-2 border-transparent'}`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
	                <span className="text-xs font-bold tracking-widest uppercase">Secure Messaging</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => onNavigate('artifacts')}
                className={`w-full flex items-center space-x-3 px-4 py-2.5  transition-all group ${currentView === 'artifacts' ? 'text-cyan-400 bg-slate-800/50 border-l-2 border-cyan-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border-l-2 border-transparent'}`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs font-bold tracking-widest uppercase">Assets</span>
              </button>
            </li>
            
            <li>
              <button
                onClick={() => onNavigate('oracle')}
                className={`w-full flex items-center space-x-3 px-4 py-2.5  transition-all group ${currentView === 'oracle' ? 'text-cyan-400 bg-slate-800/50 border-l-2 border-cyan-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border-l-2 border-transparent'}`}
              >
                 <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM12 16v-4m0-4h.01" />
                 </svg>
	                 <span className="text-xs font-bold tracking-widest uppercase">Policy Intelligence</span>
              </button>
            </li>

            <li>
              <button 
                onClick={() => onNavigate('staking')} 
                className={`w-full flex items-center space-x-3 px-4 py-2.5  transition-all group ${currentView === 'staking' ? 'text-cyan-400 bg-slate-800/50 border-l-2 border-cyan-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border-l-2 border-transparent'}`}
              >
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
	                 <span className="text-xs font-bold tracking-widest uppercase">Validator Ops</span>
              </button>
            </li>

            <li>
              <button 
                onClick={() => onNavigate('developer')} 
                className={`w-full flex items-center space-x-3 px-4 py-2.5  transition-all group ${currentView === 'developer' ? 'text-cyan-400 bg-slate-800/50 border-l-2 border-cyan-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border-l-2 border-transparent'}`}
              >
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
	                 <span className="text-xs font-bold tracking-widest uppercase">Developer Portal</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="p-6">
        {connectedIdentity ? (
          <div className="bg-slate-900 border border-slate-800 p-4 flex flex-col gap-3 mb-4 transition-colors hover:border-cyan-900">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">State Identity</div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-cyan-950 border border-cyan-900 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-cyan-500 shadow-[0_0_8px_#06b6d4]"></div>
              </div>
              <span className="text-sm font-mono text-cyan-400 font-bold tracking-wider">{connectedIdentity}</span>
            </div>
          </div>
        ) : (
          <button 
            onClick={onConnectClick}
            className="w-full mb-4 px-4 py-3 bg-cyan-950/50 hover:bg-cyan-900/50 border border-cyan-900 text-cyan-500 text-xs tracking-widest uppercase flex items-center justify-center gap-2 group transition-all"
          >
            <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
	            Connect Identity
          </button>
        )}

        <div className="bg-[#020617] border border-slate-800 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
             <div className="w-8 h-8 bg-slate-900 flex items-center justify-center border border-slate-700">
                 <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
             </div>
             <div>
               <div className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Jurisdiction</div>
               <div className="text-xs font-mono font-bold text-slate-300 tracking-wider">FCC-MAINNET</div>
             </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-slate-800 bg-[#020617]">
        <div className="text-[10px] text-slate-500 flex items-center justify-between font-mono">
          <span>AUTHORITY OS v1.0</span>
          <span className="flex items-center text-cyan-500/80"><span className="w-1.5 h-1.5 bg-cyan-500 mr-2 shadow-[0_0_5px_rgba(6,182,212,0.5)]"></span> SECURE</span>
        </div>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
