import { useState, useEffect } from 'react';

export interface TelemetryData {
  tps: number;
  maxTps: number;
  tpsHistory: number[];
  finality: string;
  activeNodes: number;
  blockHeight: number;
  algoDiff: string;
  txPool: number;
  fcPrice: string;
  fcPriceChange: string;
}

export function useTelemetry(intervalMs: number = 2000) {
  const [data, setData] = useState<TelemetryData>(() => ({
    tps: 14352,
    maxTps: 65000,
    tpsHistory: Array.from({ length: 20 }, () => 14000 + Math.floor(Math.random() * 2000)),
    finality: '0.90',
    activeNodes: 12450,
    blockHeight: 18459200,
    algoDiff: '84.21',
    txPool: 41410,
    fcPrice: '699.42',
    fcPriceChange: '+12.4%'
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newTps = Math.max(0, prev.tps + Math.floor(Math.random() * 1000) - 450);
        const newHistory = [...prev.tpsHistory.slice(1), newTps];
        
        return {
          ...prev,
          tps: newTps,
          maxTps: Math.max(prev.maxTps, newTps),
          tpsHistory: newHistory,
          finality: (0.9 + (Math.random() * 0.1 - 0.05)).toFixed(2),
          activeNodes: prev.activeNodes + Math.floor(Math.random() * 6) - 2,
          blockHeight: prev.blockHeight + (Math.random() > 0.5 ? 1 : 0),
          algoDiff: (parseFloat(prev.algoDiff) + (Math.random() * 0.1 - 0.05)).toFixed(2),
          txPool: Math.max(0, prev.txPool + Math.floor(Math.random() * 600) - 300),
          fcPrice: (parseFloat(prev.fcPrice) + (Math.random() * 2 - 0.5)).toFixed(2),
        };
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return data;
}
