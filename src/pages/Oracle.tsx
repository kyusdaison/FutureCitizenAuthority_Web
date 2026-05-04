import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DecipherText } from '../components/DecipherText';
import { CipherHeading } from '../components/CipherHeading';
import { useWallet } from '../contexts/WalletContext';

interface Message {
  id: string;
  sender: 'user' | 'oracle';
  text: string;
  timestamp: string;
}

const PREDICTIONS = [
  "[TELEMETRY] 4,192 active nodes. Byzantine fault tolerance within target range. Security posture normal.",
  "[ANALYSIS] Gas fee volatility at 4.2%. Suggested execution window: Block #902441. Confidence: 98.4%.",
  "[SECURITY] Scanning settlement queue... 0 anomalies detected. Protection layer functioning within policy.",
  "[ANALYSIS] Liquidity fragmentation resolved. Routing pathways optimized.",
  "[SYSTEM] Predictive models suggest a 12% increase in cross-chain volume within 4 reporting cycles.",
  "[NOTICE] Minor sync drift in node cluster 7. Auto-correction scheduled. Resolution expected in 4 seconds."
];

export default function Oracle() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-0',
      sender: 'oracle',
	      text: 'POLICY INTELLIGENCE ONLINE. FCA REVIEW MODEL READY. AWAITING QUERY...',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [latency] = useState(() => Math.floor(Math.random() * 10 + 2));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { gainXP, connectedIdentity } = useWallet();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;

    const newUserMsg: Message = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: inputValue.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsProcessing(true);

    // Simulate Oracle Processing Delay
    setTimeout(() => {
      let responseText = '';
      const cmd = inputValue.trim().toLowerCase();
      
      if (cmd === 'help') {
	        responseText = "[SYS_HELP] AVAILABLE COMMANDS:\n> PING: Check network latency\n> SCAN [target]: Review network anomalies\n> DEPLOY: Simulate contract deployment\n> AUTH: Review identity credential\n> PREDICT: Run policy model";
      } else if (cmd === 'ping') {
        responseText = `[PONG] Network Latency: ${latency}ms. Node connection STABLE.`;
        if (connectedIdentity) gainXP(5);
      } else if (cmd.startsWith('scan')) {
        const target = cmd.replace('scan', '').trim().toUpperCase() || 'GLOBAL_MEMPOOL';
        responseText = `[SCAN COMPLETED] Target: ${target}\n0 anomalies detected. MEV protection layer functioning at 100% efficiency.`;
        if (connectedIdentity) gainXP(10);
      } else if (cmd.startsWith('deploy')) {
        const target = cmd.replace('deploy', '').trim().toUpperCase() || '0xUNKNOWN_CONTRACT';
        responseText = `[DEPLOYMENT] Simulating deployment of ${target}...\nSTATUS: SUCCESS. Gas optimization: +12%.`;
        if (connectedIdentity) gainXP(50);
      } else if (cmd === 'auth') {
	        responseText = "[AUTH] Verified identity credential required. Please proceed to the Identity layer.";
      } else if (cmd === 'predict') {
        responseText = PREDICTIONS[Math.floor(Math.random() * PREDICTIONS.length)];
        if (connectedIdentity) gainXP(20);
      } else {
	        responseText = `[UNRECOGNIZED_QUERY] Command '${cmd.split(' ')[0]}' not found in the policy model. Returning a relevant telemetry insight:\n${PREDICTIONS[Math.floor(Math.random() * PREDICTIONS.length)]}`;
      }

      const newOracleMsg: Message = {
        id: `msg-${Date.now()}-oracle`,
        sender: 'oracle',
        text: responseText,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, newOracleMsg]);
      setIsProcessing(false);
    }, 1500 + Math.random() * 2000); // 1.5s to 3.5s delay
  };

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto min-h-screen flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full mb-8 text-center"
      >
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="w-12 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
	          <h2 className="text-cyan-500 font-mono font-bold text-sm tracking-widest uppercase">Policy Review Sub-System</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        </div>
        <CipherHeading 
	          text="POLICY INTELLIGENCE" 
          className="text-5xl md:text-7xl font-light text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-800 tracking-tight"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full flex-1 mb-12">
        {/* Left: AI Core Visualization */}
        <motion.div 
          className="lg:col-span-1 agency-panel border-white/10 relative flex flex-col items-center justify-center p-8 overflow-hidden min-h-[400px]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* CRT scanline overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-40 mix-blend-overlay z-10" />
          
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Outer rotating ring */}
            <motion.div 
              className="absolute inset-0 border border-cyan-500/30 rounded-full border-l-transparent border-r-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner fast ring */}
            <motion.div 
              className="absolute inset-4 border border-cyan-400/50 rounded-full border-t-transparent border-b-transparent"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            {/* Core Glow */}
            <motion.div 
              className="absolute inset-16 bg-cyan-500 rounded-full blur-[40px] opacity-40"
              animate={{ scale: isProcessing ? [1, 1.5, 1] : [1, 1.1, 1], opacity: isProcessing ? [0.4, 0.8, 0.4] : [0.4, 0.5, 0.4] }}
              transition={{ duration: isProcessing ? 0.5 : 3, repeat: Infinity }}
            />
            
            {/* Hexagon Core SVG */}
            <svg viewBox="0 0 100 100" className={`w-24 h-24 text-cyan-500 shadow-none transition-transform duration-300 ${isProcessing ? 'scale-110' : 'scale-100'}`}>
              <polygon points="50 5, 90 25, 90 75, 50 95, 10 75, 10 25" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="50" r="10" fill="currentColor" />
              <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              <line x1="10" y1="25" x2="90" y2="75" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              <line x1="90" y1="25" x2="10" y2="75" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            </svg>

            {/* Radar Sweep */}
            <motion.div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, transparent 70%, rgba(6, 182, 212, 0.4) 100%)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="mt-12 text-center relative z-20">
            <div className="font-mono text-cyan-400 font-bold mb-2 tracking-widest">
	              {isProcessing ? 'ANALYZING POLICY DATA...' : 'READY FOR INPUT'}
            </div>
            <div className="font-mono text-xs text-zinc-500">
	              UPTIME: 99.999% | MODEL: POLICY-V1
            </div>
            <div className="font-mono text-xs text-zinc-500 mt-1">
              LATENCY: {latency}ms
            </div>
          </div>
        </motion.div>

        {/* Right: Terminal Chat Interface */}
        <motion.div 
          className="lg:col-span-2 agency-panel border-white/10 relative flex flex-col h-[600px] overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Header */}
          <div className="h-12 border-b border-white/5 bg-black/50 flex items-center px-4 justify-between relative z-20 shrink-0">
             <div className="flex items-center space-x-2">
               <div className="w-2 h-2 bg-cyan-500 animate-[pulse_2s_infinite]" />
               <span className="font-mono text-xs font-bold text-cyan-400 tracking-wider">SECURE CHANNEL ESTABLISHED</span>
             </div>
	             <div className="font-mono text-xs text-zinc-500">REVIEW@POLICY:~#</div>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth z-20 no-scrollbar">
             <AnimatePresence initial={false}>
               {messages.map((msg) => (
                 <motion.div
                   key={msg.id}
                   initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                   animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                   className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                 >
                   <div className={`max-w-[80%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                     <span className="text-[10px] font-mono text-zinc-500 mb-1">
                       {msg.timestamp.split('T')[1].slice(0, -1)} // {msg.sender.toUpperCase()}
                     </span>
                     <div 
                       className={`font-mono font-bold whitespace-pre-wrap text-sm p-4  ${
                         msg.sender === 'user' 
                           ? 'bg-white/10 text-white border border-white/20' 
                           : 'bg-cyan-900/40 text-cyan-300 border border-cyan-500/30'
                       }`}
                     >
                       {/* Only decipher the latest oracle message if it's new */}
                       {msg.sender === 'oracle' ? (
                         <DecipherText text={msg.text} duration={1000} />
                       ) : (
                         msg.text
                       )}
                     </div>
                   </div>
                 </motion.div>
               ))}
               {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[80%] flex flex-col items-start">
                      <span className="text-[10px] font-mono text-zinc-500 mb-1">
	                        POLICY
                      </span>
                      <div className="font-mono font-bold text-sm p-4 bg-cyan-900/40 text-cyan-300 border border-cyan-500/30">
	                        <span className="animate-[pulse_1s_infinite]">| PROCESSING REVIEW...</span>
                      </div>
                    </div>
                  </motion.div>
               )}
             </AnimatePresence>
             <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-cyan-500/20 bg-black/50 backdrop-blur-md relative z-20 shrink-0">
             <form onSubmit={handleSubmit} className="relative flex items-center">
               <span className="absolute left-4 font-mono text-cyan-500 font-bold">{'>'}</span>
               <input
                 ref={inputRef}
                 type="text"
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 disabled={isProcessing}
	                 placeholder="ASK POLICY INTELLIGENCE..."
                 className="w-full bg-black/40 border border-white/10 py-4 pl-10 pr-24 font-mono font-bold text-white text-sm focus:outline-none focus:border-cyan-400 transition-all disabled:opacity-50"
               />
               <button
                 type="submit"
                 disabled={isProcessing || !inputValue.trim()}
                 className="absolute right-2 top-2 bottom-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 px-4 font-mono font-bold text-xs tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 TRANSMIT
               </button>
             </form>
          </div>
          
        </motion.div>
      </div>
    </div>
  );
}
