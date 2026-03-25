import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CosmicBackground } from '../components/CosmicBackground';
import { DecipherText } from '../components/DecipherText';
import { CipherHeading } from '../components/CipherHeading';
import { useWallet } from '../contexts/WalletContext';
import { useToast } from '../contexts/ToastContext';

// Helper to generate initial random candles
const generateCandles = () => {
  let currentPrice = 680;
  return Array.from({ length: 40 }).map((_, i) => {
    const volatility = Math.random() * 20 - 10;
    const open = currentPrice;
    const close = currentPrice + volatility;
    const high = Math.max(open, close) + Math.random() * 10;
    const low = Math.min(open, close) - Math.random() * 10;
    currentPrice = close;
    return {
      x: i * 20,
      open: Math.max(0, open),
      close: Math.max(0, close),
      high: Math.max(0, high),
      low: Math.max(0, low),
      isUp: close >= open,
      volume: Math.random() * 50 + 10 // Random volume between 10 and 60
    };
  });
};

// Animated Candlestick Chart Placeholder using pure SVG
const CandlestickChart = () => {
  const [candles, setCandles] = useState<{ x: number, open: number, close: number, high: number, low: number, isUp: boolean, volume: number }[]>(generateCandles);

  useEffect(() => {    // Live update simulation
    const interval = setInterval(() => {
      setCandles(prev => {
        const newCandles = [...prev];
        const lastCandle = newCandles[newCandles.length - 1];
        
        // Slightly modify the last candle
        const volatility = (Math.random() - 0.5) * 5;
        lastCandle.close += volatility;
        lastCandle.high = Math.max(lastCandle.high, lastCandle.close);
        lastCandle.low = Math.min(lastCandle.low, lastCandle.close);
        lastCandle.isUp = lastCandle.close >= lastCandle.open;
        
        // Every ~10 ticks, make a new candle
        if (Math.random() > 0.8) {
          const shift = newCandles.slice(1).map(c => ({...c, x: c.x - 20}));
          const newOpen = lastCandle.close;
          const newClose = newOpen + (Math.random() * 10 - 5); // New close price
          const newCandle = {
            x: prev[prev.length - 1].x + 20,
            open: lastCandle.close,
            close: newClose,
            high: Math.max(lastCandle.close, newClose) + Math.random() * 10,
            low: Math.min(lastCandle.close, newClose) - Math.random() * 10,
            isUp: newClose >= lastCandle.close,
            volume: Math.random() * 60 + 10
          };
          shift.push(newCandle);
          return shift;
        }
        
        return newCandles;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Map values to SVG coordinates
  const height = 300;
  const minPrice = Math.min(...candles.map(c => c.low)) - 10;
  const maxPrice = Math.max(...candles.map(c => c.high)) + 10;
  const range = maxPrice - minPrice;
  
  const getY = (price: number) => height - ((price - minPrice) / range) * height;

  return (
    <div className="w-full h-[300px] relative overflow-hidden bg-black/40 border border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent pointer-events-none"></div>
      
      {/* Grid Lines */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-20">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-full h-px bg-white/20 border-b border-dashed border-white/10"></div>
        ))}
      </div>

      <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
        <AnimatePresence>
          {candles.map((c, i) => (
            <motion.g 
              key={`${i}-${c.x}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.01 }}
              className="transition-all duration-300 ease-out"
            >
              {/* Wick */}
              <line 
                x1={c.x + 8} y1={getY(c.high)} 
                x2={c.x + 8} y2={getY(c.low)} 
                stroke={c.isUp ? '#22c55e' : '#ef4444'} 
                strokeWidth="2"
                className="drop-shadow-none"
              />
              {/* Body */}
              <rect 
                x={c.x} 
                y={getY(Math.max(c.open, c.close))} 
                width="16" 
                height={Math.max(1, Math.abs(getY(c.open) - getY(c.close)))} 
                fill={c.isUp ? '#22c55e' : '#ef4444'}
                className="transition-all duration-300 shadow-none drop-shadow-none"
              />
            </motion.g>
          ))}
        </AnimatePresence>
        
        {/* Glow Line Chart Overlay */}
        <motion.path
          d={`M ${candles[0]?.x + 8} ${getY(candles[0]?.close)} ${candles.map(c => `L ${c.x + 8} ${getY(c.close)}`).join(' ')}`}
          fill="none"
          stroke="rgba(34,211,238,0.4)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

// Order Book Placeholder
const OrderBook = () => {
  const [asks, setAsks] = useState<{ price: string, amount: string, total: string }[]>([]);
  const [bids, setBids] = useState<{ price: string, amount: string, total: string }[]>([]);

  useEffect(() => {
    // Mock orderbook data gen
    const generateOrders = (basePrice: number, isBid: boolean) => {
      return Array.from({ length: 8 }).map((_, i) => {
        const offset = (i + 1) * (Math.random() * 2);
        const price = isBid ? basePrice - offset : basePrice + offset;
        const amount = (Math.random() * 1000).toFixed(2);
        const total = (parseFloat(amount) * price).toFixed(2);
        return { price: price.toFixed(2), amount, total };
      });
    };

    const updateBook = () => {
      // Current market price base
      const basePrice = 699.42;
      setAsks(generateOrders(basePrice, false).sort((a, b) => parseFloat(b.price) - parseFloat(a.price)));
      setBids(generateOrders(basePrice, true).sort((a, b) => parseFloat(b.price) - parseFloat(a.price)));
    };

    updateBook();
    const interval = setInterval(updateBook, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-black/40 border border-white/5 font-mono text-[10px] overflow-hidden">
      <div className="grid grid-cols-3 px-4 py-2 border-b border-white/10 text-slate-500 font-bold uppercase tracking-widest text-[9px]">
        <span>Price (USDT)</span>
        <span className="text-right">Amount (FCC)</span>
        <span className="text-right">Total</span>
      </div>
      
      {/* Asks (Sell Orders - Red) */}
      <div className="flex-1 overflow-hidden flex flex-col justify-end p-2 relative">
         <style>{asks.map((ask, i) => `.ask-amount-${i} { width: ${Math.min(100, parseFloat(ask.amount) / 10)}%; }`).join('\n')}</style>
         {asks.map((ask, i) => (
           <div key={`ask-${i}`} className="grid grid-cols-3 px-2 py-1 relative group cursor-pointer hover:bg-white/5 transition-colors">
              <div className={`absolute inset-y-0 right-0 bg-red-500/10 pointer-events-none ask-amount-${i}`}></div>
              <span className="text-red-400 z-10">{ask.price}</span>
              <span className="text-white z-10 text-right">{ask.amount}</span>
              <span className="text-slate-400 z-10 text-right">{ask.total}</span>
           </div>
         ))}
      </div>

      {/* Spread / Current Price */}
      <div className="flex items-center justify-between px-4 py-3 border-y border-white/10 bg-white/[0.02]">
        <div className="text-lg font-bold text-green-400">
           $699.42 <span className="text-xs text-white ml-1">USDT</span>
        </div>
        <div className="text-[10px] text-slate-500">Spread: $0.05</div>
      </div>

      {/* Bids (Buy Orders - Green) */}
      <div className="flex-1 overflow-hidden flex flex-col p-2 relative">
         <style>{bids.map((bid, i) => `.bid-amount-${i} { width: ${Math.min(100, parseFloat(bid.amount) / 10)}%; }`).join('\n')}</style>
         {bids.map((bid, i) => (
           <div key={`bid-${i}`} className="grid grid-cols-3 px-2 py-1 relative group cursor-pointer hover:bg-white/5 transition-colors">
              <div className={`absolute inset-y-0 right-0 bg-green-500/10 pointer-events-none bid-amount-${i}`}></div>
              <span className="text-green-400 z-10">{bid.price}</span>
              <span className="text-white z-10 text-right">{bid.amount}</span>
              <span className="text-slate-400 z-10 text-right">{bid.total}</span>
           </div>
         ))}
      </div>
    </div>
  );
};


const Swap = () => {
  const { balances, updateBalances, gainXP } = useWallet();
  const { toast } = useToast();
  const [payAmount, setPayAmount] = useState<string>('');
  const [receiveToken, setReceiveToken] = useState<'DATA' | 'NEON'>('DATA');

  const rate = receiveToken === 'DATA' ? 10 : 2;
  const receiveAmount = payAmount ? (parseFloat(payAmount) * rate).toFixed(2) : '0.00';

  const [isSwapping, setIsSwapping] = useState(false);
  const [swapPhase, setSwapPhase] = useState(0);
  const [isMEVEvent, setIsMEVEvent] = useState(false);

  const handleSwap = () => {
    const payNum = parseFloat(payAmount);
    if (isNaN(payNum) || payNum <= 0) {
      toast({ message: "INVALID EXECUTION AMOUNT", type: "error" });
      return;
    }
    if (balances.fcc < payNum) {
      toast({ message: "INSUFFICIENT FCC BALANCE", type: "error" });
      return;
    }

    setIsSwapping(true);
    setSwapPhase(1);
    
    // Simulate Emergent MEV Interaction
    const mevIntercepted = Math.random() < 0.15; // 15% chance
    if (mevIntercepted) {
      setIsMEVEvent(true);
    } else {
      toast({ message: `Initiating swap for ${payAmount} FCC`, type: 'process' });
    }
    
    // Simulate smart contract routing phases
    setTimeout(() => setSwapPhase(2), 1500); // Route Calculation
    setTimeout(() => setSwapPhase(3), 3000); // Liquidity Validation
    setTimeout(() => setSwapPhase(4), 4500); // Execution
    setTimeout(() => {
      setSwapPhase(0);
      setIsSwapping(false);
      
      const newReceiveBalance = balances[receiveToken.toLowerCase() as 'data' | 'neon'] + parseFloat(receiveAmount);
      updateBalances({ 
        fcc: balances.fcc - payNum,
        [receiveToken.toLowerCase()]: newReceiveBalance
      });

      if (mevIntercepted) {
        setIsMEVEvent(false);
        toast({ message: `VANGUARD SECURED ROUTE. Gained +250 XP`, type: 'success' });
        gainXP(250);
      } else {
        toast({ message: `Successfully swapped ${payAmount} FCC for ${receiveAmount} ${receiveToken}`, type: 'success' });
      }
      setPayAmount('');
    }, 6000);
  };

  return (
    <div className="mt-16 space-y-6 relative z-10 max-w-7xl mx-auto w-full pb-20 px-4 sm:px-6 lg:px-8">
      <CosmicBackground />

      <div className="pt-8 pb-4 border-b border-white/10 flex justify-between items-end">
        <div>
          <CipherHeading 
            text="LIQUIDITY MATRIX" 
            className="text-4xl md:text-5xl text-vanguard text-white mb-2 uppercase tracking-widest font-bold"
          />
          <p className="text-xs text-telemetry text-cyan-400 font-mono mt-2">DECENTRALIZED EXCHANGE // ROUTER V4.2.0</p>
        </div>
        
        <div className="hidden md:flex gap-2">
           <button className="px-4 py-2 border border-cyan-500/30 text-cyan-400 bg-cyan-500/10 text-[10px] font-bold tracking-widest uppercase hover:bg-cyan-500/20 transition-all">
             Swap
           </button>
           <button className="px-4 py-2 border border-white/10 text-slate-400 bg-white/5 text-[10px] font-bold tracking-widest uppercase hover:bg-white/10 transition-all">
             Pools
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        
        {/* Left Column: Chart & Orderbook */}
        <div className="lg:col-span-2 flex flex-col gap-6">
           <div className="agency-panel p-6 relative group overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                   <div className="flex -space-x-2">
                     <div className="w-8 h-8 bg-cyan-500 flex items-center justify-center border border-[#0a0c10] z-10"><span className="text-black font-bold text-[10px]">FCC</span></div>
                     <div className="w-8 h-8 bg-slate-800 flex items-center justify-center border border-[#0a0c10]"><span className="text-white font-bold text-[10px]">$</span></div>
                   </div>
                   <h2 className="text-xl text-vanguard text-white uppercase tracking-widest font-bold">FCC / {receiveToken}</h2>
                </div>
                <div className="flex gap-2">
                   {['15M', '1H', '4H', '1D'].map(tf => (
                     <button key={tf} className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] text-slate-400 font-bold transition-colors">{tf}</button>
                   ))}
                </div>
              </div>
              <CandlestickChart />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
             {/* Orderbook Component */}
             <div className="agency-panel p-4 flex flex-col relative overflow-hidden">
                <h3 className="text-sm text-vanguard text-white mb-4 flex items-center gap-2 uppercase tracking-widest font-bold">
                  <div className="w-1.5 h-1.5 bg-cyan-400 animate-pulse"></div>
                  Order Book Stream
                </h3>
                <OrderBook />
             </div>

             {/* Dynamic Routing Matrix (Placeholder for visual depth) */}
             <div className="agency-panel p-6 relative overflow-hidden flex flex-col justify-center items-center group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none"></div>
                
                <h3 className="absolute top-6 left-6 text-sm text-vanguard text-white z-10 uppercase tracking-widest font-bold">Smart Routing</h3>
                
                {/* SVG Routing Map Mockup */}
                <svg viewBox="0 0 200 200" className="w-[80%] h-[80%] opacity-70 group-hover:opacity-100 transition-opacity">
                  {/* Nodes */}
                  <rect x="16" y="96" width="8" height="8" fill="#06b6d4" className="animate-pulse" />
                  <rect x="95" y="35" width="10" height="10" fill="#06b6d4" />
                  <rect x="94" y="94" width="12" height="12" fill="#06b6d4" />
                  <rect x="95" y="155" width="10" height="10" fill="#06b6d4" />
                  <rect x="176" y="96" width="8" height="8" fill="#06b6d4" className="animate-pulse" />
                  
                  {/* Paths */}
                  <path d="M 28 100 L 90 40" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 4" fill="none" className="animate-[dash_20s_linear_infinite]" />
                  <path d="M 28 100 L 88 100" stroke="#06b6d4" strokeWidth="3" fill="none" opacity="0.8" />
                  <path d="M 28 100 L 90 160" stroke="#06b6d4" strokeWidth="1" opacity="0.4" fill="none" />
                  
                  <path d="M 110 40 L 172 100" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 4" fill="none" className="animate-[dash_20s_linear_infinite]" />
                  <path d="M 112 100 L 172 100" stroke="#06b6d4" strokeWidth="3" fill="none" opacity="0.8" />
                  <path d="M 110 160 L 172 100" stroke="#06b6d4" strokeWidth="1" opacity="0.4" fill="none" />
                  
                  <text x="50" y="85" fill="#06b6d4" fontSize="8" fontFamily="monospace">80%</text>
                  <text x="50" y="55" fill="#06b6d4" fontSize="8" fontFamily="monospace">15%</text>
                  <text x="50" y="145" fill="#06b6d4" fontSize="8" opacity="0.5" fontFamily="monospace">5%</text>
                </svg>
                
                <div className="absolute bottom-6 left-6 text-[9px] text-telemetry text-slate-500 bg-black/50 px-3 py-1 border border-white/5 backdrop-blur">
                  Best Route: V4 Pools → Auto-Split
                </div>
             </div>
           </div>
        </div>        {/* Right Column: Interactive Swap Interface */}
        <div className="w-full">
           <div className="bg-black/80 p-6 relative overflow-hidden group border border-white/5">
             <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none"></div>
             
             <div className="flex justify-between items-center mb-6 relative z-10">
               <h2 className="text-xl text-vanguard text-white uppercase tracking-widest font-bold">Execution Terminal</h2>
               <div className="flex gap-2">
                 <button className="p-2 hover:bg-white/10 transition-colors text-slate-400" aria-label="Settings">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                 </button>
               </div>
             </div>

             {/* Swap Inputs */}
             <div className="space-y-2 relative z-10">
                {/* Pay */}
                <div className="bg-black/50 border border-white/10 p-4 hover:border-cyan-500/30 transition-colors">
                   <div className="text-[10px] text-telemetry text-slate-500 mb-2 font-bold tracking-widest uppercase">YOU PAY</div>
                   <div className="flex justify-between items-center">
                      <input 
                        type="number" 
                        value={payAmount}
                        onChange={(e) => setPayAmount(e.target.value)}
                        className="bg-transparent text-3xl font-bold font-mono text-white outline-none w-[60%] placeholder-slate-600"
                        placeholder="0.0"
                      />
                      <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-1.5 border border-white/10 transition-colors">
                        <div className="w-5 h-5 bg-cyan-500 flex items-center justify-center"><span className="text-black font-bold text-[8px]">FC</span></div>
                        <span className="font-bold text-sm text-white">FCC</span>
                        <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </button>
                   </div>
                   <div className="text-[10px] text-slate-500 mt-2 text-right font-bold tracking-widest uppercase">Balance: {balances.fcc.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                </div>

                {/* Switch Button */}
                <div className="flex justify-center -my-3 relative z-20">
                   <button className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center text-cyan-400 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all shadow-none" aria-label="Switch swap direction">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg>
                   </button>
                </div>

                {/* Receive */}
                <div className="bg-black/50 border border-white/10 p-4 hover:border-cyan-500/30 transition-colors">
                   <div className="text-[10px] text-telemetry text-slate-500 mb-2 font-bold tracking-widest uppercase">YOU RECEIVE</div>
                   <div className="flex justify-between items-center">
                      <div className="text-3xl font-bold font-mono text-white opacity-80">{receiveAmount}</div>
                      
                      <select 
                        value={receiveToken} 
                        onChange={(e) => setReceiveToken(e.target.value as 'DATA' | 'NEON')}
                        aria-label="Select Target Asset"
                        className="bg-white/5 hover:bg-white/10 px-3 py-1.5 border border-white/10 transition-colors text-sm font-bold text-white outline-none cursor-pointer appearance-none text-center uppercase tracking-widest"
                      >
                        <option value="DATA" className="bg-[#0a0c10] text-white">DATA</option>
                        <option value="NEON" className="bg-[#0a0c10] text-white">NEON</option>
                      </select>
                   </div>
                   <div className="text-[10px] text-slate-500 mt-2 text-right font-bold tracking-widest uppercase">Balance: {balances[receiveToken.toLowerCase() as 'data' | 'neon'].toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                </div>
             </div>

             {/* Swap Details */}
             <div className="mt-6 p-4 bg-white/[0.02] border border-white/5 space-y-2 text-xs font-mono relative z-10 font-bold uppercase tracking-widest">
                <div className="flex justify-between">
                  <span className="text-slate-500">Rate</span>
                  <span className="text-white">1 FCC = {rate} {receiveToken}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Price Impact</span>
                  <span className="text-cyan-500">&lt; 0.01%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Network Fee</span>
                  <span className="text-white">0.0001 FCC ($0.06)</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 mt-2">
                  <span className="text-slate-500">Order Routing</span>
                  <span className="text-cyan-500 flex items-center gap-1">
                    V4 Core <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
                  </span>
                </div>
             </div>

             {/* Submit Button & Animations */}
             <div className="mt-6 relative z-10">
               {isSwapping ? (
                  <div className="w-full h-14 bg-black border border-white/10 relative overflow-hidden flex flex-col justify-center px-4">
                    <style>{`.swap-phase-bar { width: ${(swapPhase / 4) * 100}%; transition: width 1s linear; }`}</style>
                    <div className={`absolute inset-y-0 left-0 swap-phase-bar ${isMEVEvent ? 'bg-red-500/40 animate-pulse' : 'bg-cyan-500/20'}`}></div>
                    <div className={`relative text-xs font-mono flex justify-between items-center w-full ${isMEVEvent ? 'text-red-400' : 'text-cyan-400'}`}>
                       <span>
                         {swapPhase === 1 && !isMEVEvent && '>> INITIALIZING ROUTE...'}
                         {swapPhase === 1 && isMEVEvent && '[!] VANGUARD: MEV SANDWICH DETECTED. INTERCEPTING...'}
                         {swapPhase === 2 && '>> CALCULATING OPTIMAL PATH...'}
                         {swapPhase === 3 && '>> VALIDATING LIQUIDITY...'}
                         {swapPhase === 4 && '>> SIGNING EXECUTION...'}
                       </span>
                       <span className="animate-pulse">_</span>
                    </div>
                  </div>
               ) : (
                  <button 
                    onClick={handleSwap}
                    className="w-full h-14 bg-white hover:bg-slate-200 text-black font-bold uppercase tracking-widest transition-all shadow-none"
                  >
                    Execute Swap
                  </button>
               )}
             </div>

           </div>
           
           {/* Terminal Output Log for Swap context */}
           <div className="mt-6 bg-black/80 p-4 border border-white/5">
             <div className="text-[10px] text-telemetry text-slate-500 flex items-center gap-2 mb-3">
               <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
               ROUTER TERMINAL LOGS
             </div>
             <div className="h-32 overflow-y-auto font-mono text-[9px] text-slate-400 space-y-1 scrollbar-hide">
               {isSwapping ? (
                 <>
                   {swapPhase >= 1 && !isMEVEvent && <div className="text-cyan-400"><DecipherText text="[SYS] Initializing Vanguard Swap Router v4.2" duration={500} /></div>}
                   {swapPhase >= 1 && isMEVEvent && <div className="text-red-400 font-bold bg-red-500/10 p-1"><DecipherText text="[WARN] JITO MEV BOT DETECTED. EXECUTING ANTI-SANDWICH PROTOCOLS..." duration={500} /></div>}
                   {swapPhase >= 2 && <div><span className="text-slate-500">[{new Date().toTimeString().split(' ')[0]}]</span> Scanning available liquidity matrix...</div>}
                   {swapPhase >= 2 && <div className="text-green-400 pl-4">&gt; Found target pool for {receiveToken} with 24M reserves</div>}
                   {swapPhase >= 3 && <div><span className="text-slate-500">[{new Date().toTimeString().split(' ')[0]}]</span> Simulating trade route execution...</div>}
                   {swapPhase >= 3 && <div className="text-yellow-400 pl-4">&gt; Route verified. Slippage tolerance matched (0.01%).</div>}
                   {swapPhase >= 4 && <div><span className="text-slate-500">[{new Date().toTimeString().split(' ')[0]}]</span> Broadcasting transaction to FC mainnet payload...</div>}
                   {swapPhase >= 4 && <div className="text-cyan-400 pl-4 font-bold">&gt; ENCRYPTION SIGNATURE ACCEPTED.</div>}
                   {swapPhase === 0 && isMEVEvent && <div className="text-green-400 pl-4 font-bold mt-2">&gt; MEV EXTRACTOR NEUTRALIZED. SECURED +250 XP.</div>}
                 </>
               ) : (
                 <div className="opacity-50 text-slate-600 italic">// Waiting for swap initiation...</div>
               )}
             </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default Swap;
