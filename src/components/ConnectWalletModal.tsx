import { useState, useEffect } from 'react';
import { DecipherText } from './DecipherText';
import { useWallet } from '../contexts/WalletContext';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectWalletModal = ({ isOpen, onClose }: ConnectWalletModalProps) => {
  const { connectWallet } = useWallet();
  // Setup simulated connection phases
  // 0: Initializing scanner
  // 1: Decrypting Handshake
  // 2: Identity Confirmed
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const fakeIdentity = 'FC-94A2-B7F1';

  useEffect(() => {
    // Transition to signature verification
    const t1 = setTimeout(() => {
      setPhase(1);
    }, 1500);

    // Transition to Confirmed
    const t2 = setTimeout(() => {
      setPhase(2);
    }, 4000);

    // Complete and Close
    const t3 = setTimeout(() => {
      connectWallet(fakeIdentity);
      onClose();
    }, 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [connectWallet, onClose]);

  // Rely on App.tsx to unmount, but safety guard
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 backdrop-blur-md bg-black/80 transition-opacity">
      <div 
        className="absolute inset-0 z-0" 
        onClick={onClose}
      />
      
      <div className="relative z-10 w-full max-w-md bg-[#09090b] border border-white/10 shadow-2xl overflow-hidden agency-panel flex flex-col items-center justify-center py-12 px-8 min-h-[320px]">
        {/* Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <div className="scan-line opacity-30"></div>
        </div>

	        {/* Phase 0: Preparing credential check */}
        <div className={`flex flex-col items-center transition-all duration-500 absolute ${phase === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 border-2 border-cyan-500 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-2 border border-cyan-400 rounded-full animate-spin-slow [animation-duration:3s]"></div>
            <div className="absolute inset-4 border border-dashed border-cyan-300 rounded-full animate-spin-reverse-slow"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
               </svg>
            </div>
          </div>
	          <h3 className="text-lg text-white font-medium tracking-widest mb-2">PREPARING IDENTITY REVIEW</h3>
	          <p className="text-xs text-cyan-400 font-mono text-telemetry animate-pulse">Checking local credential path...</p>
        </div>

	        {/* Phase 1: Verifying signature */}
        <div className={`flex flex-col items-center w-full transition-all duration-500 absolute ${phase === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          <div className="w-16 h-16 mb-6 bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
	          <h3 className="text-lg text-yellow-500 font-medium tracking-widest mb-4">VERIFYING SIGNATURE</h3>
          
          <div className="w-full bg-black/50 border border-white/5 p-3 text-center overflow-hidden">
             {phase >= 1 && (
               <div className="text-xs font-mono text-telemetry text-slate-400 break-all leading-relaxed">
                  <DecipherText text="0x93A4F8E2...FC CHAIN KEY V.04...VERIFYING SIGNATURE...ACCESS GRANTED" duration={2000} />
               </div>
             )}
          </div>
        </div>

        {/* Phase 2: Identity Confirmed */}
        <div className={`flex flex-col items-center transition-all duration-500 absolute ${phase === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          <div className="relative w-20 h-20 mb-6">
             <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
             <div className="relative w-full h-full bg-white/5 border border-green-500/50 rounded-full flex items-center justify-center">
               <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
               </svg>
             </div>
          </div>
	          <h3 className="text-lg text-white font-medium tracking-widest mb-2">IDENTITY VERIFIED</h3>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mt-2">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
            <span className="text-sm font-mono text-green-400 tracking-wider font-bold">{fakeIdentity}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
