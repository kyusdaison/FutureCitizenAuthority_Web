import { useEffect, useRef } from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface TerminalLogProps {
  logs: string[];
  isDeploying: boolean;
  onCommand?: (cmd: string) => void;
}

export const TerminalLog = ({ logs, isDeploying, onCommand }: TerminalLogProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { playTypewriter } = useSoundEffects();

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim() && onCommand) {
      playTypewriter();
      onCommand(e.currentTarget.value.trim());
      e.currentTarget.value = '';
    } else if (e.key.length === 1 || e.key === 'Backspace') {
      playTypewriter();
    }
  };

  return (
    <div className="agency-panel border border-white/10 bg-black/90 relative overflow-hidden flex flex-col h-[400px] shadow-[0_0_30px_rgba(0,0,0,0.8)] inset-0">
      {/* Terminal Top Bar */}
      <div className="border-b border-white/10 bg-white/5 py-2 px-4 flex items-center justify-between pointer-events-none sticky top-0 z-10 backdrop-blur-md">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-500"></div>
        </div>
        <div className="text-[10px] text-slate-500 font-mono tracking-widest">vanguard-cli v2.4.1</div>
      </div>
      
      {/* Terminal Body */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-5 tracking-tight relative scroll-smooth">
        
        {logs.length === 0 ? (
          <div className="text-slate-600">Waiting for deployment trigger...</div>
        ) : (
          <div className="space-y-1">
            {logs.map((log, index) => {
              // Parse log types based on text content for coloring
              let textColor = 'text-slate-300';
              if (log.includes('[ERROR]')) textColor = 'text-red-400';
              else if (log.includes('[SUCCESS]') || log.includes('Deployed to:')) textColor = 'text-green-400 font-bold';
              else if (log.includes('[WARN]')) textColor = 'text-yellow-400';
              else if (log.includes('Compiling') || log.includes('Optimizing')) textColor = 'text-cyan-400';
              else if (log.startsWith('>')) textColor = 'text-vanguard text-white font-bold';

              return (
                <div key={index} className={`${textColor} break-all slide-in-bottom [animation-duration:0.2s]`}>
                  {log}
                </div>
              );
            })}
          </div>
        )}
        
        {/* Blinking Cursor if deploying */}
        {isDeploying && (
           <div className="w-2 h-4 bg-white/70 animate-pulse mt-1 inline-block"></div>
        )}

        {/* Interactive Input */}
        {onCommand && !isDeploying && (
          <div className="flex items-center mt-2 text-cyan-400">
            <span className="mr-2 text-vanguard">{'>'}</span>
            <input 
              ref={inputRef}
              type="text"
              title="Terminal Input"
              placeholder="Enter command..."
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none flex-1 font-mono text-xs text-white"
              spellCheck={false}
              autoFocus
            />
          </div>
        )}
      </div>
      
      {/* Ambient Scanline overlay for the terminal */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20"></div>
    </div>
  );
};
