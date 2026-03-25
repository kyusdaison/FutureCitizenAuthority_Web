import { useState, useEffect, useRef } from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';

export interface Command {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  commands: Command[];
}

export const CommandPalette = ({ isOpen, onClose, commands }: CommandPaletteProps) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { playTypewriter, playSuccess, playError } = useSoundEffects();

  // Filter commands based on input
  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(query.toLowerCase()) || 
    (cmd.subtitle && cmd.subtitle.toLowerCase().includes(query.toLowerCase()))
  );

  // Focus input when opened and lock scroll
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => {
           const next = Math.min(prev + 1, filteredCommands.length - 1);
           if (next !== prev) playTypewriter();
           return next;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => {
           const next = Math.max(prev - 1, 0);
           if (next !== prev) playTypewriter();
           return next;
        });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          playSuccess();
          filteredCommands[selectedIndex].action();
          onClose();
        } else {
          playError();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose, playError, playSuccess, playTypewriter]);

  // Ensure selected item is visible
  useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  // The component unmounts when !isOpen, so we don't need this check, but keeping it for safety
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 backdrop-blur-sm bg-black/60 transition-opacity">
      <div 
        className="absolute inset-0 z-0" 
        onClick={onClose}
      />
      
      <div className="relative z-10 w-full max-w-2xl bg-[#09090b] border border-white/10 shadow-2xl overflow-hidden flex flex-col agency-panel">
        {/* Input Header */}
        <div className="flex items-center px-4 border-b border-white/10 relative bg-black/40">
          <svg className="w-5 h-5 text-cyan-500 mr-3 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent border-none text-white font-mono text-lg py-5 focus:outline-none focus:ring-0 placeholder-white/20 tracking-wide"
            placeholder="Awaiting Executive Command..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0); // reset selection on type
              playTypewriter();
            }}
          />
          <div className="hidden sm:flex text-[10px] text-telemetry text-slate-500 gap-2 absolute right-4">
             <span className="px-1.5 py-0.5 bg-white/5 border border-white/10">↑</span>
             <span className="px-1.5 py-0.5 bg-white/5 border border-white/10">↓</span>
             <span className="px-1.5 py-0.5 bg-white/5 border border-white/10">enter</span>
          </div>
        </div>

        {/* Command List */}
        <div 
          ref={listRef}
          className="max-h-[60vh] overflow-y-auto py-2 px-2 custom-scrollbar"
        >
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => (
              <div
                key={cmd.id}
                onMouseEnter={() => {
                   if (idx !== selectedIndex) {
                       setSelectedIndex(idx);
                       playTypewriter();
                   }
                }}
                onClick={() => {
                  playSuccess();
                  cmd.action();
                  onClose();
                }}
                className={`flex items-center px-4 py-3  cursor-pointer transition-all duration-200 ${
                  idx === selectedIndex 
                    ? 'bg-cyan-500/10 border-l-2 border-cyan-500 shadow-[inset_2px_0_10px_rgba(6,182,212,0.1)]' 
                    : 'border-l-2 border-transparent hover:bg-white/[0.02]'
                }`}
              >
                {cmd.icon && (
                  <div className={`mr-4 ${idx === selectedIndex ? 'text-cyan-400' : 'text-slate-500'}`}>
                    {cmd.icon}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className={`text-sm ${idx === selectedIndex ? 'text-white font-medium' : 'text-slate-300'}`}>
                    {cmd.title}
                  </span>
                  {cmd.subtitle && (
                    <span className="text-xs text-slate-500 font-mono mt-0.5">
                      {cmd.subtitle}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center text-sm text-slate-500 font-mono">
              No directives found for "<span className="text-yellow-500">{query}</span>"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
