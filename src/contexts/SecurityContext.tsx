import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

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
  const { playSuccess } = useSoundEffects();

  const triggerSimulatedBreach = useCallback(() => {
    setThreatLevel(85 + Math.random() * 15); // Random threat between 85-100%
  }, []);

  const neutralizeThreat = useCallback(() => {
    if (isBreached) {
      setThreatLevel(0);
      playSuccess();
    }
  }, [isBreached, playSuccess]);

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
