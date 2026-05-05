import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const BOOT_LOGS = [
  'Review workspace ready',
  'Identity brief loaded',
  'Evidence labels active',
];

export const BootSequence: React.FC = () => {
  const [isBooting, setIsBooting] = useState(() => !sessionStorage.getItem('fcc_booted'));
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    if (!isBooting) return;

    const timers = BOOT_LOGS.map((log, index) =>
      window.setTimeout(() => {
        setLines((prev) => [...prev, log]);
      }, 120 + index * 130)
    );

    const closeTimer = window.setTimeout(() => {
      sessionStorage.setItem('fcc_booted', 'true');
      setIsBooting(false);
    }, 950);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(closeTimer);
    };
  }, [isBooting]);

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
          className="pointer-events-none fixed right-4 top-20 z-[80] w-[min(calc(100vw-2rem),24rem)] border border-white/10 bg-[#020617]/92 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl"
          role="status"
          aria-live="polite"
        >
          <div className="mb-3 flex items-center justify-between gap-4 border-b border-white/10 pb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fc-gold">Loading review context</span>
            <span className="h-1.5 w-1.5 bg-emerald-300" />
          </div>
          <div className="space-y-1.5">
            {lines.map((line) => (
              <div key={line} className="font-mono text-[11px] text-slate-300">
                {line}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
