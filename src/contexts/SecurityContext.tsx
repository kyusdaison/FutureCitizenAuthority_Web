import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useWallet } from './WalletContext';
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

  const triggerSimulatedBreach = useCallback(() => {
    setThreatLevel(85 + Math.random() * 15); // Random threat between 85-100%
  }, []);

  const neutralizeThreat = useCallback(() => {
    if (isBreached) {
      setThreatLevel(0);
      playSuccess();
      gainXP(500); // Massive XP bonus for defending the network
    }
  }, [gainXP, isBreached, playSuccess]);

  // Randomly simulate a breach event (demo-only: disabled in production)
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const interval = setInterval(() => {
      if (!isBreached && Math.random() < 0.05) {
        triggerSimulatedBreach();
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [isBreached, triggerSimulatedBreach]);

  const value = useMemo(
    () => ({ threatLevel, isBreached, neutralizeThreat, triggerSimulatedBreach }),
    [isBreached, neutralizeThreat, threatLevel, triggerSimulatedBreach]
  );

  return (
    <SecurityContext.Provider value={value}>
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
