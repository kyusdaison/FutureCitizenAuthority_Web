import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWallet } from './WalletContext';
import { useMarket } from './MarketContext';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface SecurityContextType {
  threatLevel: number;
  isBreached: boolean;
  neutralizeThreat: () => void;
  triggerSimulatedBreach: () => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [threatLevel, setThreatLevel] = useState(0);
  const isBreached = threatLevel >= 80;
  const { gainXP } = useWallet();
  const { playSuccess } = useSoundEffects();
  const { recentMegaTx } = useMarket();

  const triggerSimulatedBreach = () => {
    setThreatLevel(85 + Math.random() * 15); // Random threat between 85-100%
  };

  const neutralizeThreat = () => {
    if (isBreached) {
      setThreatLevel(0);
      playSuccess();
      gainXP(500); // Massive XP bonus for defending the network
    }
  };

  // React to market anomalies (demo-only: disabled in production)
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    if (recentMegaTx && !isBreached) {
       if (Math.random() < 0.3) {
         const timer = setTimeout(() => {
           triggerSimulatedBreach();
         }, 1500);
         return () => clearTimeout(timer);
       }
    }
  }, [recentMegaTx, isBreached]);

  // Randomly simulate a breach event (demo-only: disabled in production)
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const interval = setInterval(() => {
      if (!isBreached && Math.random() < 0.05) {
        triggerSimulatedBreach();
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [isBreached]);

  return (
    <SecurityContext.Provider value={{ threatLevel, isBreached, neutralizeThreat, triggerSimulatedBreach }}>
      {children}
    </SecurityContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSecurity() {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
}
