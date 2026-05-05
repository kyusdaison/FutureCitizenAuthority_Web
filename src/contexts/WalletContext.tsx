/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useMemo, useCallback, type ReactNode } from 'react';

export interface Balances {
  fcc: number;
  usdc: number;
  data: number;
  neon: number;
}

export interface WalletContextType {
  connectedIdentity: string | null;
  connectWallet: (identity: string) => void;
  disconnectWallet: () => void;
  balances: Balances;
  updateBalances: (newBalances: Partial<Balances>) => void;
  stakedFCC: number;
  updateStakedFCC: (newTotal: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const STORAGE_KEY = 'fca:wallet';

const loadSavedState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [connectedIdentity, setConnectedIdentity] = useState<string | null>(() => {
    const saved = loadSavedState();
    return saved?.connectedIdentity ?? null;
  });
  const [balances, setBalances] = useState<Balances>(() => {
    const saved = loadSavedState();
    return saved?.balances ? { fcc: 0, usdc: 0, data: 0, neon: 0, ...saved.balances } : { fcc: 0, usdc: 0, data: 0, neon: 0 };
  });
  const [stakedFCC, setStakedFCC] = useState<number>(() => {
    const saved = loadSavedState();
    return typeof saved?.stakedFCC === 'number' ? saved.stakedFCC : 0;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ connectedIdentity, balances, stakedFCC }));
  }, [connectedIdentity, balances, stakedFCC]);

  // Connection means "authenticated institutional reviewer", not "starter loot".
  // No random pre-fill of balances or progression points.
  const connectWallet = useCallback((identity: string) => {
    setConnectedIdentity(identity);
  }, []);

  const disconnectWallet = useCallback(() => {
    setConnectedIdentity(null);
    setBalances({ fcc: 0, usdc: 0, data: 0, neon: 0 });
    setStakedFCC(0);
  }, []);

  const updateBalances = useCallback((newBalances: Partial<Balances>) => {
    setBalances(prev => ({ ...prev, ...newBalances }));
  }, []);

  const updateStakedFCC = useCallback((newTotal: number) => {
    setStakedFCC(newTotal);
  }, []);

  const value = useMemo(() => ({
    connectedIdentity,
    connectWallet,
    disconnectWallet,
    balances,
    updateBalances,
    stakedFCC,
    updateStakedFCC,
  }), [
    connectedIdentity,
    connectWallet,
    disconnectWallet,
    balances,
    updateBalances,
    stakedFCC,
    updateStakedFCC,
  ]);

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
