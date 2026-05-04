import { useEffect, useState, useCallback } from 'react';

const INITIAL_LOGS = [
  "fca-review:~$ open settlement-readiness-brief",
  "[OK] HTTS settlement layer available",
  "[OK] Regional validator groups online",
  "[OK] Sample ZK identity proof verified: 0x8f9c...a1"
];

export const LiveTelemetry: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([...INITIAL_LOGS]);

  const addLog = useCallback(() => {
    const hash = Math.random().toString(16).substring(2, 10);
    const region = Math.floor(Math.random() * 64) + 1;
    const ms = (Math.random() * 0.1 + 0.3).toFixed(3);
    setLogs(prev => [...prev.slice(-5), `[audit-sync] region-${region} verified event 0x${hash} in ${ms}s`]);
  }, []);

  useEffect(() => {
    const id = setInterval(addLog, 2000);
    return () => clearInterval(id);
  }, [addLog]);

  return (
    <div className="font-mono text-[10px] text-slate-300/85 bg-[#010203] p-6 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,1)] w-full max-w-lg hidden lg:flex flex-col relative overflow-hidden h-[220px]">
      <div className="flex gap-2 mb-4 border-b border-white/5 pb-4 absolute top-6 left-6 right-6 bg-[#010203] z-10 w-[calc(100%-48px)]">
        <div className="w-2 h-2 border border-red-500/50 bg-red-500/20" />
        <div className="w-2 h-2 border border-yellow-500/50 bg-yellow-500/20" />
        <div className="w-2 h-2 border border-green-500/50 bg-green-500/20" />
      </div>
      <div className="mt-12 flex flex-col justify-end flex-1">
        {logs.map((log, i) => (
          <div 
            key={`${i}-${log.slice(-8)}`} 
            className="mb-2 truncate opacity-80"
            // 只对最新的日志应用动画
            style={i === logs.length - 1 ? { animation: 'fadeIn 0.3s ease-in' } : undefined}
          >
            {log}
          </div>
        ))}
        <div className="text-cyan-300 mt-2 flex items-center gap-2">
          &gt; REVIEW TELEMETRY ACTIVE <span className="w-2 h-3 bg-cyan-300 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
