import { useEffect, useState, useRef, useCallback } from 'react';

const SECTIONS = [
  { id: 'hero', index: '00', name: 'Initialize' },
  { id: 'audiences', index: '01', name: 'Audiences' },
  { id: 'model', index: '02', name: 'Model' },
  { id: 'identity', index: '03', name: 'Identity' },
  { id: 'architecture', index: '04', name: 'Wallet rail' },
  { id: 'governance', index: '05', name: 'Governance' },
  { id: 'assurance', index: '06', name: 'Assurance' },
  { id: 'deployment', index: '07', name: 'Deployment' },
  { id: 'matrix', index: '08', name: 'Stack' },
  { id: 'tokenomics', index: '09', name: 'Economics' },
  { id: 'collective', index: '10', name: 'Operations' },
  { id: 'roadmap', index: '11', name: 'Roadmap' }
];

export const NarrativeTracker: React.FC = () => {
  const [activeId, setActiveId] = useState('hero');
  const rafRef = useRef<number>(0);
  const ticking = useRef(false);

  // 使用 useCallback 缓存滚动处理函数
  const updateActiveSection = useCallback(() => {
    let currentId = 'hero';
    
    // 从后向前查找当前section
    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const el = document.getElementById(SECTIONS[i].id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45) {
          currentId = SECTIONS[i].id;
          break;
        }
      }
    }
    
    setActiveId(prev => prev !== currentId ? currentId : prev);
    ticking.current = false;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // 使用 requestAnimationFrame 节流
      if (!ticking.current) {
        rafRef.current = requestAnimationFrame(updateActiveSection);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(updateActiveSection);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateActiveSection]);

  const activeIndex = SECTIONS.findIndex((sec) => sec.id === activeId);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      aria-label="Page sections"
      className="group fixed left-5 top-1/2 z-[70] hidden -translate-y-1/2 flex-col border border-white/10 bg-[#020617]/35 px-2 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all duration-300 hover:w-[220px] hover:bg-[#020617]/85 hover:backdrop-blur-2xl 2xl:flex"
    >
      <div className="mb-2 flex items-center justify-between border-b border-white/5 px-1 pb-2">
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.28em] text-slate-500 opacity-0 transition-all duration-300 group-hover:max-w-[140px] group-hover:opacity-100">Page flow</span>
        <span className="text-[10px] font-mono text-fc-gold/90">
          {String(Math.max(activeIndex + 1, 1)).padStart(2, '0')}/{SECTIONS.length}
        </span>
      </div>

      {SECTIONS.map((sec) => (
        <button
          key={sec.id} 
          type="button"
          onClick={() => scrollToSection(sec.id)}
          title={`${sec.index} // ${sec.name}`}
          className={`group/item flex w-full items-center gap-2 border px-2 py-2 text-left transition-all duration-300 ${
            activeId === sec.id
              ? 'border-fc-gold/30 bg-fc-gold/[0.06] text-white shadow-[0_0_18px_rgba(212,175,55,0.06)]'
              : 'border-transparent text-slate-500 hover:border-white/10 hover:bg-white/[0.035] hover:text-slate-200'
          }`}
        >
          <div 
            className={`h-px shrink-0 transition-all duration-500 ${
              activeId === sec.id ? 'w-7 bg-fc-gold' : 'w-4 bg-slate-700 group-hover/item:w-6 group-hover/item:bg-slate-400'
            }`} 
          />
          <span className="w-5 shrink-0 text-[10px] font-mono text-slate-500">{sec.index}</span>
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.22em] opacity-0 transition-all duration-300 group-hover:max-w-[120px] group-hover:opacity-100">
            {sec.name}
          </span>
        </button>
      ))}
    </nav>
  );
};
