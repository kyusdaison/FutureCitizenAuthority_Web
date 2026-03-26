import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface MarketData {
  fccPrice: number;
  tps: number;
  activeNodes: number;
  recentMegaTx: string | null;
}

const defaultMarketData: MarketData = {
  fccPrice: 14.52,
  tps: 4520,
  activeNodes: 1402,
  recentMegaTx: null,
};

const MarketContext = createContext<MarketData>(defaultMarketData);

export function MarketProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<MarketData>(defaultMarketData);

  useEffect(() => {
    // Simulate live WebSocket data feed for market dynamics
    const interval = setInterval(() => {
      setData(prev => {
        // Price fluctuations +/- 0.05
        const newPrice = Math.max(0.1, prev.fccPrice + (Math.random() * 0.1 - 0.05));
        
        // TPS natural jitter
        const newTps = Math.max(1000, prev.tps + Math.floor(Math.random() * 200 - 100));
        
        let newMegaTx = prev.recentMegaTx;
        // 2% chance of a mega transaction every second
        if (Math.random() > 0.98) {
           const amount = (Math.random() * 5 + 1).toFixed(1);
           const dests = ["Node Alpha", "Node Omega", "FC Vault", "Sentinel Proxy", "Genesis Core"];
           const dest = dests[Math.floor(Math.random() * dests.length)];
           newMegaTx = `ANOMALY: ${amount}M FCC Transferred to ${dest}`;
        } else if (newMegaTx) {
           // Clear it out occasionally so the ticker isn't permanently stuck
           if (Math.random() > 0.1) {
             newMegaTx = prev.recentMegaTx;
           } else {
             newMegaTx = null; // Expires
           }
        }

        return {
          fccPrice: newPrice,
          tps: newTps,
          activeNodes: prev.activeNodes,
          recentMegaTx: newMegaTx
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return <MarketContext.Provider value={data}>{children}</MarketContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMarket = () => useContext(MarketContext);
