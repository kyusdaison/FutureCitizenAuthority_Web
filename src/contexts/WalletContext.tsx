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
  xp: number;
  level: number;
  gainXP: (amount: number) => void;
  stakedFCC: number;
  updateStakedFCC: (newTotal: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const STORAGE_KEY = 'fcc-wallet-state';

const loadSavedState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const saved = loadSavedState();

  const [connectedIdentity, setConnectedIdentity] = useState<string | null>(
    saved?.connectedIdentity ?? null
  );
  const [balances, setBalances] = useState<Balances>(
    saved?.balances ? { fcc: 0, usdc: 0, data: 0, neon: 0, ...saved.balances } : { fcc: 0, usdc: 0, data: 0, neon: 0 }
  );
  const [xp, setXp] = useState<number>(
    typeof saved?.xp === 'number' ? saved.xp : 0
  );
  const [stakedFCC, setStakedFCC] = useState<number>(
    typeof saved?.stakedFCC === 'number' ? saved.stakedFCC : 0
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ connectedIdentity, balances, xp, stakedFCC }));
  }, [connectedIdentity, balances, xp, stakedFCC]);

  // Clearance Level scales intentionally
  // Level 1: 0 - 499
  // Level 2: 500 - 1499
  // Level 3: 1500 - 4999
  // Level 4: 5000+
  let level = 1;
  if (xp >= 5000) level = 4;
  else if (xp >= 1500) level = 3;
  else if (xp >= 500) level = 2;

  // 使用 useCallback 缓存函数引用
  const gainXP = useCallback((amount: number) => {
    if (connectedIdentity) setXp(prev => prev + amount);
  }, [connectedIdentity]);

  const connectWallet = useCallback((identity: string) => {
    setConnectedIdentity(identity);
    // When a wallet is connected, simulate fetching mock balances
    setBalances({
      fcc: Number((Math.random() * 10000 + 500).toFixed(2)),
      usdc: Number((Math.random() * 5000 + 100).toFixed(2)),
      data: 0,
      neon: 0,
    });
    setXp(Number((Math.random() * 1500).toFixed(0))); // Start with random XP
  }, []);

  const disconnectWallet = useCallback(() => {
    setConnectedIdentity(null);
    setBalances({ fcc: 0, usdc: 0, data: 0, neon: 0 });
    setXp(0);
    setStakedFCC(0);
  }, []);

  const updateBalances = useCallback((newBalances: Partial<Balances>) => {
    setBalances(prev => ({ ...prev, ...newBalances }));
  }, []);

  const updateStakedFCC = useCallback((newTotal: number) => {
    setStakedFCC(newTotal);
  }, []);

  // 使用 useMemo 缓存 context value
  const value = useMemo(() => ({
    connectedIdentity,
    connectWallet,
    disconnectWallet,
    balances,
    updateBalances,
    xp,
    level,
    gainXP,
    stakedFCC,
    updateStakedFCC
  }), [
    connectedIdentity,
    connectWallet,
    disconnectWallet,
    balances,
    updateBalances,
    xp,
    level,
    gainXP,
    stakedFCC,
    updateStakedFCC
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
