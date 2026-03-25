import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSoundEffects } from '../hooks/useSoundEffects';

const BOOT_LOGS = [
  "SECURE KERNEL INITIALIZATION 0xVANGUARD",
  "VERIFYING CRYPTOGRAPHIC SIGNATURES... OK",
  "ESTABLISHING SECURE GLOBAL UPLINK... OK",
  "SYNCHRONIZING WITH 2,048 FEDERATED NODES...",
  "NETWORK CONSENSUS ACHIEVED (0.4s LATENCY)",
  "MOUNTING INSTITUTIONAL DATABASES...",
  "LOADING EXECUTIVE OVERRIDE PROTOCOLS...",
  "BIOMETRIC CLEARANCE: TOP SECRET REQUIRED",
  "AUTHENTICATION IN PROGRESS...",
  "IDENTITY VERIFIED. WELCOME, DIRECTOR.",
  "STATECRAFT ENGINE ON-LINE."
];

export const BootSequence: React.FC = () => {
  const [isBooting, setIsBooting] = useState(() => !sessionStorage.getItem('fcc_booted'));
  const [lines, setLines] = useState<string[]>([]);
  const [flash, setFlash] = useState(false);
  const { playTypewriter, playSuccess } = useSoundEffects();

  useEffect(() => {
    if (!isBooting) return;

    let delay = 0;
    BOOT_LOGS.forEach((log, index) => {
      delay += Math.random() * 80 + 40; // Random delay between 40-120ms
      setTimeout(() => {
        setLines(prev => [...prev, log]);
        playTypewriter();
        if (index === BOOT_LOGS.length - 1) {
          setTimeout(() => {
            playSuccess();
            setFlash(true);
            setTimeout(() => {
               sessionStorage.setItem('fcc_booted', 'true');
               setIsBooting(false);
            }, 800); // Wait for flash to peak
          }, 300);
        }
      }, delay);
    });

    // Fallback emergency kill
    const timeout = setTimeout(() => {
        sessionStorage.setItem('fcc_booted', 'true');
        setIsBooting(false);
    }, 4500);
    return () => clearTimeout(timeout);
  }, [isBooting, playTypewriter, playSuccess]);

  if (!isBooting && !flash) return null;

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] bg-[#050505] text-slate-300 font-mono text-xs sm:text-sm p-8 overflow-hidden flex flex-col justify-end pb-16 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"
        >
          <div className="max-w-4xl mx-auto w-full relative z-10">
            {lines.map((line, i) => (
              <div key={i} className="mb-1 opacity-90">{line}</div>
            ))}
            <div className="w-3 h-5 bg-slate-300 animate-pulse mt-2 opacity-80"></div>
          </div>
          
          <AnimatePresence>
              {flash && (
                  <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 bg-white z-50 flex items-center justify-center mix-blend-screen"
                  >
                        <div className="w-64 h-64 border border-cyan-500/30 rounded-full animate-ping"></div>
                  </motion.div>
              )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
