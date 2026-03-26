import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '../contexts/WalletContext';
import { useToast } from '../contexts/ToastContext';

interface Message {
  id: string;
  sender: 'me' | 'them' | 'system';
  text: string;
  isEncrypted: boolean;
  timestamp: string;
}

const generateHash = (length: number = 16) => {
  const chars = '0123456789abcdef';
  return '0x' + Array.from({length}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

export default function Whisper() {
  const { balances, updateBalances, gainXP } = useWallet();
  const { toast } = useToast();
  
  const [targetAddress, setTargetAddress] = useState('');
  const [connectionState, setConnectionState] = useState<'idle' | 'handshake' | 'connected'>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [probeEvent, setProbeEvent] = useState<{ active: boolean; timeLeft: number }>({ active: false, timeLeft: 0 });
  const [scrambleTexts, setScrambleTexts] = useState<Record<string, string>>({});
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const probeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle Hash Scrambling Animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScrambleTexts(prev => {
        const next = { ...prev };
        messages.forEach(msg => {
          if (msg.isEncrypted && msg.sender !== 'system') {
            next[msg.id] = generateHash(msg.text.length > 20 ? 32 : 16);
          }
        });
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [messages]);

  // Adversarial Probe Timer
  useEffect(() => {
    if (probeEvent.active && probeEvent.timeLeft > 0) {
      probeTimerRef.current = setTimeout(() => {
        setProbeEvent(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (probeEvent.active && probeEvent.timeLeft === 0) {
      probeTimerRef.current = setTimeout(() => {
        toast({ message: "Probe breached defenses. Transmission failed. 5 $DATA lost.", type: "error" });
        setProbeEvent({ active: false, timeLeft: 0 });
        setMessages(prev => [...prev, {
          id: Date.now().toString(), sender: 'system', text: '[!] TRANSMISSION INTERCEPTED AND DESTROYED.', isEncrypted: false, timestamp: new Date().toISOString()
        }]);
      }, 0);
    }
    return () => {
      if (probeTimerRef.current) clearTimeout(probeTimerRef.current);
    };
  }, [probeEvent, toast]);

  const initiateHandshake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetAddress) return;
    
    setConnectionState('handshake');
    setMessages([{
      id: 'init-1', sender: 'system', text: `INITIATING ZK-TUNNEL TO ${targetAddress}...`, isEncrypted: false, timestamp: new Date().toISOString()
    }]);

    setTimeout(() => {
      setMessages(p => [...p, { id: 'init-2', sender: 'system', text: 'VERIFYING STARK PROOFS...', isEncrypted: false, timestamp: new Date().toISOString() }]);
    }, 1500);

    setTimeout(() => {
      setConnectionState('connected');
      setMessages(p => [...p, { id: 'init-3', sender: 'system', text: 'SECURE CHANNEL ESTABLISHED.', isEncrypted: false, timestamp: new Date().toISOString() }]);
    }, 3500);
  };

  const deliverMessage = useCallback((msgId: string, text: string) => {
    setTimeout(() => {
      setMessages(p => p.map(m => m.id === msgId ? { ...m, isEncrypted: false } : m));
      setTimeout(() => {
        const replyId = (Date.now() + 1).toString();
        setMessages(p => [...p, {
          id: replyId,
          sender: 'them',
          text: `ACK: "${text.substring(0, 10)}..."`,
          isEncrypted: true,
          timestamp: new Date().toISOString()
        }]);
        setTimeout(() => {
          setMessages(p => p.map(m => m.id === replyId ? { ...m, isEncrypted: false } : m));
        }, 1500);
      }, 1000);
    }, 2000);
  }, []);

  const handleSendMessage = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || connectionState !== 'connected') return;
    if (balances.data < 5) {
      toast({ message: "Insufficient $DATA to encrypt payload. Requires 5 $DATA.", type: "error" });
      return;
    }
    if (probeEvent.active) return;

    const msgId = Date.now().toString();
    const newMsg: Message = {
      id: msgId,
      sender: 'me',
      text: inputValue,
      isEncrypted: true,
      timestamp: new Date().toISOString()
    };

    setMessages(p => [...p, newMsg]);
    setInputValue('');
    updateBalances({ data: balances.data - 5 });

    if (Math.random() < 0.15) {
      setTimeout(() => setProbeEvent({ active: true, timeLeft: 5 }), 500);
      return;
    }

    deliverMessage(msgId, newMsg.text);
  }, [inputValue, connectionState, balances, toast, probeEvent, updateBalances, deliverMessage]);

  const handleDeflect = () => {
    setProbeEvent({ active: false, timeLeft: 0 });
    gainXP(200);
    toast({ message: "Countermeasure signed. Probe neutralized. +200 XP.", type: "success" });
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(), sender: 'system', text: '[✓] VANGUARD: ADVERSARIAL PROBE DEFLECTED.', isEncrypted: false, timestamp: new Date().toISOString()
    }]);

    // Deliver the last pending message
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.sender === 'me' && lastMsg.isEncrypted) {
      deliverMessage(lastMsg.id, lastMsg.text);
    }
  };

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto min-h-[calc(100vh-6rem)] flex flex-col pb-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center space-x-4 mb-2">
          <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-transparent" />
          <h2 className="text-purple-500 font-mono text-xs tracking-widest uppercase">L0 Unified Communications</h2>
        </div>
        <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight">
          WHISPER <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">PROTOCOL</span>
        </h1>
      </motion.div>

      <div className="flex-1 agency-panel border border-white/10 flex flex-col overflow-hidden relative shadow-[0_0_50px_rgba(168,85,247,0.05)]">
        
        {/* Terminal Header */}
        <div className="bg-black/80 px-4 py-3 border-b border-white/5 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${connectionState === 'connected' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : connectionState === 'handshake' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}`} />
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
              {connectionState === 'idle' ? 'DISCONNECTED' : connectionState === 'handshake' ? 'ESTABLISHING ZK-TUNNEL...' : `SECURED: ${targetAddress.slice(0,6)}...${targetAddress.slice(-4)}`}
            </span>
          </div>
          <div className="font-mono text-xs text-purple-400 flex items-center gap-2">
            <span>COST: 5</span>
            <span className="font-bold">$DATA</span>
            <span>/</span>
            <span>MSG</span>
          </div>
        </div>

        {/* Emergent Probe Alert Overlay */}
        <AnimatePresence>
          {probeEvent.active && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="absolute inset-x-4 top-16 bg-red-950/90 border border-red-500/50 p-6 z-30 shadow-[0_0_30px_rgba(239,68,68,0.3)] backdrop-blur flex flex-col items-center justify-center text-center"
            >
              <h3 className="text-red-500 font-mono font-bold text-xl mb-2 flex items-center gap-2">
                <svg className="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                CRITICAL: ADVERSARIAL NETWORK PROBE
              </h3>
              <p className="text-red-200 font-mono text-sm max-w-md mb-6">
                An unauthorized external entity is attempting to intercept the ZK-Proof payload. Vanguard requires manual authorization to deploy countermeasures.
              </p>
              <div className="flex items-center gap-6">
                <div className="text-4xl font-bold font-mono text-red-500">
                  00:0{probeEvent.timeLeft}
                </div>
                <button 
                  onClick={handleDeflect}
                  className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-mono font-bold tracking-widest text-sm transition-colors shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                >
                  SIGN COUNTERMEASURE
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Feed */}
        <div className="flex-1 p-6 overflow-y-auto font-mono text-sm space-y-4 relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/10 via-black to-black">
          {messages.length === 0 && connectionState === 'idle' && (
            <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-4">
              <svg className="w-16 h-16 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="tracking-widest uppercase">Select a node to establish tunnel</p>
            </div>
          )}

          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : msg.sender === 'them' ? 'items-start' : 'items-center my-6'}`}
            >
              <div className={`
                max-w-[80%]  px-4 py-2 
                ${msg.sender === 'me' ? 'bg-purple-900/40 border border-purple-500/30 text-purple-100' : ''}
                ${msg.sender === 'them' ? 'bg-zinc-900/80 border border-white/5 text-zinc-300' : ''}
                ${msg.sender === 'system' ? 'text-xs text-yellow-500/80 border-b border-yellow-500/20 pb-1 w-full text-center' : ''}
              `}>
                {msg.isEncrypted ? (
                  <span className="opacity-70 blur-[0.5px] select-none text-purple-400">
                    {scrambleTexts[msg.id] || generateHash(16)}
                  </span>
                ) : (
                  <span>{msg.text}</span>
                )}
              </div>
              {msg.sender !== 'system' && (
                <div className="mt-1 text-[10px] text-zinc-600 flex items-center gap-2">
                  <span>{msg.timestamp.split('T')[1].slice(0,8)}</span>
                  {msg.isEncrypted && <span className="text-purple-500 uppercase">Encrypting...</span>}
                  {!msg.isEncrypted && msg.sender === 'me' && <span className="text-green-500 uppercase">Verified</span>}
                </div>
              )}
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black/90 border-t border-white/5">
          {connectionState === 'idle' ? (
            <form onSubmit={initiateHandshake} className="flex gap-4 max-w-2xl mx-auto">
              <input
                type="text"
                value={targetAddress}
                onChange={(e) => setTargetAddress(e.target.value)}
                placeholder="Enter 0x address or .eth domain..."
                className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-purple-500 transition-colors"
                autoFocus
              />
              <button 
                type="submit"
                disabled={!targetAddress}
                className="px-6 bg-purple-600 hover:bg-purple-500 text-white font-mono text-sm tracking-widest uppercase disabled:opacity-50 transition-colors"
              >
                Connect
              </button>
            </form>
          ) : (
            <form onSubmit={handleSendMessage} className="flex gap-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={connectionState === 'handshake'}
                placeholder={connectionState === 'handshake' ? 'Establishing secure tunnel...' : 'Type highly classified payload...'}
                className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                autoFocus
              />
              <button 
                type="submit"
                disabled={!inputValue.trim() || connectionState === 'handshake' || probeEvent.active}
                className="px-8 bg-purple-600 hover:bg-purple-500 text-white font-mono text-sm tracking-widest uppercase disabled:opacity-50 transition-colors group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                <span className="relative z-10 flex items-center gap-2">
                  Send
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
