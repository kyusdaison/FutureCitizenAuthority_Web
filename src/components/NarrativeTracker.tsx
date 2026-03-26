import { useEffect, useState, useRef, useCallback } from 'react';

const SECTIONS = [
  { id: 'hero', name: '00 // INITIALIZE' },
  { id: 'architecture', name: '01 // ARCHITECTURE' },
  { id: 'identity', name: '02 // IDENTITY' },
  { id: 'matrix', name: '03 // MATRIX' },
  { id: 'tokenomics', name: '04 // ECONOMICS' },
  { id: 'governance', name: '05 // GOVERNANCE' },
  { id: 'collective', name: '06 // THE COLLECTIVE' },
  { id: 'roadmap', name: '07 // GENESIS' }
];

export const NarrativeTracker: React.FC = () => {
  const [activeId, setActiveId] = useState('hero');
  const rafRef = useRef<number>(0);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // 使用 useCallback 缓存滚动处理函数
  const updateActiveSection = useCallback(() => {
    const scrollY = window.scrollY;
    
    // 如果滚动距离小于50px，不更新
    if (Math.abs(scrollY - lastScrollY.current) < 50) {
      ticking.current = false;
      return;
    }
    
    lastScrollY.current = scrollY;
    let currentId = 'hero';
    
    // 从后向前查找当前section
    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const el = document.getElementById(SECTIONS[i].id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
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

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-[90] hidden xl:flex flex-col gap-8 pointer-events-none mix-blend-difference">
      {SECTIONS.map((sec) => (
        <div 
          key={sec.id} 
          className={`flex items-center gap-4 transition-opacity duration-500 ${
            activeId === sec.id ? 'opacity-100' : 'opacity-30'
          }`}
        >
          <div 
            className={`h-px transition-all duration-700 ${
              activeId === sec.id ? 'w-12 bg-white' : 'w-4 bg-white/50'
            }`} 
          />
          <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-white">
            {sec.name}
          </span>
        </div>
      ))}
    </div>
  );
};
