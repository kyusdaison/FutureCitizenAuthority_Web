import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DecipherText } from './DecipherText';
import { lazy, Suspense } from 'react';
const HoloCore = lazy(() => import('./HoloCore').then(module => ({ default: module.HoloCore })));

interface HologramModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: Record<string, unknown>;
  theme?: 'blue' | 'yellow' | 'cyan'; // cyan as default brutalist theme
}

export const HologramModal = ({ isOpen, onClose, title, data, theme = 'cyan' }: HologramModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) { 
    // Keep it returning AnimatePresence wrapping null if not open, but AnimatePresence wraps the children inside the component using it.
    // Actually, HologramModal assumes it's rendered conditionally, or it conditionally renders itself.
    // For AnimatePresence to work, it MUST be wrapped around the conditionally rendered element, and the conditionally rendered element must exist inside it.
  }

  const colorConfig = {
    yellow: {
      border: 'border-yellow-500/30',
      text: 'text-yellow-500',
      bgGlow: 'bg-yellow-500/5',
      shadowClass: 'shadow-[var(--glow-gold)]'
    },
    blue: {
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      bgGlow: 'bg-cyan-500/5',
      shadowClass: 'shadow-[0_0_20px_rgba(6,182,212,0.4)]'
    },
    cyan: {
      border: 'border-white/10',
      text: 'text-cyan-400',
      bgGlow: 'bg-cyan-500/5',
      shadowClass: 'shadow-none hover:border-cyan-500/30 transition-colors'
    }
  };

  const style = colorConfig[theme];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40"
        >
          <div 
            className="absolute inset-0 z-0 cursor-pointer" 
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative z-10 w-full max-w-5xl max-h-[90vh] overflow-hidden agency-panel shadow-2xl  border ${style.border} ${style.shadowClass} flex flex-col md:flex-row`}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
          >
            <div className={`scan-line ${style.bgGlow} absolute inset-0 z-0 pointer-events-none `}></div>
            
            {/* Left Hologram Panel (3D Core) */}
            <div className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-white/5 relative bg-black/60 min-h-[300px] flex flex-col">
              <Suspense fallback={<div className="flex-1 flex items-center justify-center"><div className="w-8 h-8 border-t-2 border-cyan-500 rounded-full animate-spin"></div></div>}>
                <HoloCore theme={theme} />
              </Suspense>
              <div className="absolute bottom-6 left-0 w-full text-center z-10 pointer-events-none">
                <div className={`inline-flex items-center gap-2 px-3 py-1  bg-black border ${style.border} text-[9px] uppercase tracking-[0.2em] font-mono ${style.text} backdrop-blur-md font-bold`}>
                  <div className={`w-1.5 h-1.5  ${theme === 'yellow' ? 'bg-yellow-500' : (theme === 'cyan' ? 'bg-cyan-500' : 'bg-cyan-400')} animate-[pulse_2s_infinite]`}></div>
                  HOLO-CORE SYNCED
                </div>
              </div>
            </div>

            {/* Right Data Panel */}
            <div className="w-full md:w-3/5 flex flex-col h-full max-h-[90vh] overflow-y-auto relative z-10 bg-black/40">
              
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-white/10 sticky top-0 bg-black/80 backdrop-blur-md z-20">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3  animate-[pulse_2s_infinite] ${theme === 'yellow' ? 'bg-yellow-500 shadow-[0_0_8px_#eab308]' : (theme === 'cyan' ? 'bg-cyan-500 shadow-none' : 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]')}`}></div>
                  <h2 className="text-2xl font-bold text-white tracking-widest uppercase">{title}</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="text-white/50 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content Body */}
              <div className="p-6 space-y-2">
                {Object.entries(data).map(([key, value], idx) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] hover:border-cyan-500/20 transition-colors px-2">
                    <div className="w-full sm:w-1/3 text-[10px] filter saturate-0 text-slate-500 font-bold uppercase tracking-widest mb-1 sm:mb-0">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="w-full sm:w-2/3 flex items-center gap-2 overflow-hidden">
                      {typeof value === 'object' ? (
                        <pre className={`text-xs font-mono font-bold ${style.text} bg-black p-3  border border-white/5 overflow-x-auto w-full`}>
                          {JSON.stringify(value, null, 2)}
                        </pre>
                      ) : (
                        <span className={`text-sm text-white font-mono truncate ${typeof value === 'string' && value.startsWith('0x') ? style.text : ''}`}>
                          {typeof value === 'string' && (value.length > 20 || value.startsWith('0x')) ? (
                            <DecipherText text={value} duration={800 + (idx * 100)} />
                          ) : (
                            String(value)
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
