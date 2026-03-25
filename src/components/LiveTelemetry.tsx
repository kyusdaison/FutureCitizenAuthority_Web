import { useEffect, useRef, useState, useCallback } from 'react';

const INITIAL_LOGS = [
  "nexus@fcc-core:~$ init_htts_engine --production",
  "[OK] HTTS Consensus Engine Booted",
  "[OK] Connecting to Shards: ALPHA-1 to ALPHA-64",
  "[OK] Validating ZKP Identity Proofs: 0x8f9c...a1"
];

/**
 * 高性能实时遥测组件
 * 使用 useRef 存储日志，避免频繁 re-render
 */
export const LiveTelemetry: React.FC = () => {
  const logsRef = useRef<string[]>([...INITIAL_LOGS]);
  const [, forceUpdate] = useState({});
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 使用 useCallback 缓存添加日志函数
  const addLog = useCallback(() => {
    const hash = Math.random().toString(16).substring(2, 10);
    const shard = Math.floor(Math.random() * 64) + 1;
    const ms = (Math.random() * 0.1 + 0.3).toFixed(3);
    
    const newLog = `[htts-sync] Shard_${shard} verified block 0x${hash} in ${ms}s`;
    
    logsRef.current = [...logsRef.current.slice(-5), newLog];
    
    // 强制更新，但保持引用不变
    forceUpdate({});
  }, []);

  useEffect(() => {
    // 使用较长的间隔减少更新频率
    intervalRef.current = setInterval(addLog, 2000); // 从 1500ms 增加到 2000ms

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [addLog]);

  const logs = logsRef.current;

  return (
    <div className="font-mono text-[10px] text-green-500/80 bg-[#010203] p-6 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,1)] w-full max-w-lg hidden lg:flex flex-col relative overflow-hidden h-[220px]">
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
        <div className="text-cyan-400 mt-2 flex items-center gap-2">
          &gt; SYSTEM ACTIVE <span className="w-2 h-3 bg-cyan-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
