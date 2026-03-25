import { motion } from 'framer-motion';
import { useMarket } from '../contexts/MarketContext';
import { useSecurity } from '../contexts/SecurityContext';

export function MarketTicker() {
  const { fccPrice, tps, activeNodes, recentMegaTx } = useMarket();
  const { isBreached } = useSecurity();

  return (
    <div className={`fixed bottom-0 left-0 w-full h-8 z-40 border-t backdrop-blur-md flex items-center overflow-hidden transition-colors duration-500 ${isBreached ? 'bg-red-950/80 border-red-500/50 text-red-500' : 'bg-black/80 border-cyan-500/30 text-cyan-500'}`}>
      <div className="flex whitespace-nowrap items-center px-4 font-mono text-[10px] sm:text-xs tracking-[0.2em] font-bold">
         <span className={isBreached ? 'text-white' : 'text-zinc-400'}>FC_OS // LIVE_TELEMETRY</span>
      </div>
      <div className="flex-1 overflow-hidden relative h-full flex items-center">
        <motion.div 
          className="flex whitespace-nowrap items-center space-x-12 font-mono text-xs tracking-widest absolute left-0"
          animate={{ x: [0, -1500] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          {/* Loop 1 */}
          <span className={isBreached ? 'text-red-400' : 'text-emerald-400'}>$FCC: ${fccPrice.toFixed(2)}</span>
          <span className="text-zinc-500">|</span>
          <span className={isBreached ? 'text-red-400' : 'text-emerald-400'}>TPS: {tps.toLocaleString()}</span>
          <span className="text-zinc-500">|</span>
          <span className={isBreached ? 'text-red-400' : 'text-emerald-400'}>NODES: {activeNodes.toLocaleString()}</span>
          <span className="text-zinc-500">|</span>
          <span className={isBreached ? 'text-red-400' : 'text-emerald-400'}>STATUS: {isBreached ? 'CRITICAL' : 'NOMINAL'}</span>
          <span className="text-zinc-500">|</span>
          {recentMegaTx && (
            <>
                <span className="text-white bg-white/10 px-2 py-0.5 animate-pulse">{recentMegaTx}</span>
                <span className="text-zinc-500">|</span>
            </>
          )}
          
          {/* Loop 2 */}
          <span className={isBreached ? 'text-red-400' : 'text-emerald-400'}>$FCC: ${fccPrice.toFixed(2)}</span>
          <span className="text-zinc-500">|</span>
          <span className={isBreached ? 'text-red-400' : 'text-emerald-400'}>TPS: {tps.toLocaleString()}</span>
          <span className="text-zinc-500">|</span>
          <span className={isBreached ? 'text-red-400' : 'text-emerald-400'}>NODES: {activeNodes.toLocaleString()}</span>
          <span className="text-zinc-500">|</span>
          <span className={isBreached ? 'text-red-400' : 'text-emerald-400'}>STATUS: {isBreached ? 'CRITICAL' : 'NOMINAL'}</span>
          <span className="text-zinc-500">|</span>
          {recentMegaTx && (
            <>
                <span className="text-white bg-white/10 px-2 py-0.5 animate-pulse">{recentMegaTx}</span>
                <span className="text-zinc-500">|</span>
            </>
          )}

          {/* Loop 3 */}
          <span className={isBreached ? 'text-red-400' : 'text-emerald-400'}>$FCC: ${fccPrice.toFixed(2)}</span>
          <span className="text-zinc-500">|</span>
          <span className={isBreached ? 'text-red-400' : 'text-emerald-400'}>TPS: {tps.toLocaleString()}</span>
          <span className="text-zinc-500">|</span>
          <span className={isBreached ? 'text-red-400' : 'text-emerald-400'}>NODES: {activeNodes.toLocaleString()}</span>
          <span className="text-zinc-500">|</span>
          <span className={isBreached ? 'text-red-400' : 'text-emerald-400'}>STATUS: {isBreached ? 'CRITICAL' : 'NOMINAL'}</span>
          <span className="text-zinc-500">|</span>
          {recentMegaTx && (
            <>
                <span className="text-white bg-white/10 px-2 py-0.5 animate-pulse">{recentMegaTx}</span>
                <span className="text-zinc-500">|</span>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
