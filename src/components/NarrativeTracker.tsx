import { useEffect, useState, useRef, useCallback } from 'react';

const SECTIONS = [
  { id: 'hero', index: '00', name: 'Initialize' },
  { id: 'model', index: '01', name: 'Model' },
  { id: 'identity', index: '02', name: 'Identity' },
  { id: 'architecture', index: '03', name: 'Wallet rail' },
  { id: 'governance', index: '04', name: 'Governance' },
  { id: 'assurance', index: '05', name: 'Assurance' },
  { id: 'deployment', index: '06', name: 'Deployment' },
  { id: 'matrix', index: '07', name: 'Stack' },
  { id: 'tokenomics', index: '08', name: 'Economics' },
  { id: 'collective', index: '09', name: 'Operations' },
  { id: 'roadmap', index: '10', name: 'Roadmap' }
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
      className="fixed left-6 top-1/2 z-[70] hidden w-[248px] -translate-y-1/2 flex-col border border-white/10 bg-[#020617]/[0.86] px-3 py-4 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl 2xl:flex"
    >
      <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
        <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-slate-500">Page flow</span>
        <span className="text-[10px] font-mono text-fc-gold/90">
          {String(Math.max(activeIndex + 1, 1)).padStart(2, '0')}/{SECTIONS.length}
        </span>
      </div>

      {SECTIONS.map((sec) => (
        <button
          key={sec.id} 
          type="button"
          onClick={() => scrollToSection(sec.id)}
          className={`group flex w-full items-center gap-3 border px-3 py-2.5 text-left transition-all duration-300 ${
            activeId === sec.id
              ? 'border-fc-gold/35 bg-fc-gold/[0.075] text-white shadow-[0_0_24px_rgba(212,175,55,0.08)]'
              : 'border-transparent text-slate-500 hover:border-white/10 hover:bg-white/[0.035] hover:text-slate-200'
          }`}
        >
          <div 
            className={`h-px shrink-0 transition-all duration-500 ${
              activeId === sec.id ? 'w-8 bg-fc-gold' : 'w-4 bg-slate-700 group-hover:w-6 group-hover:bg-slate-400'
            }`} 
          />
          <span className="w-5 shrink-0 text-[10px] font-mono text-slate-500">{sec.index}</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.22em]">
            {sec.name}
          </span>
        </button>
      ))}
    </nav>
  );
};
