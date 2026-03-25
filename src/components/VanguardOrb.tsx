import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { useMarket } from '../contexts/MarketContext';

export interface Message {
  id: string;
  role: 'vanguard' | 'user';
  content: string;
}

const OrbParticles = ({ isHovered }: { isHovered: boolean }) => {
  const ref = useRef<THREE.Points>(null);
  const particleCount = 500;
  
  const [positions] = useState(() => {
    const coords = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = 1 + Math.random() * 0.2; 
        coords[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        coords[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        coords[i * 3 + 2] = r * Math.cos(phi);
    }
    return coords;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * (isHovered ? 0.5 : 0.2);
      ref.current.rotation.y += delta * (isHovered ? 0.7 : 0.3);
      
      // Pulsate scale
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      ref.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={isHovered ? "#0ea5e9" : "#06b6d4"}
          size={isHovered ? 0.06 : 0.04}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

export const VanguardOrb = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { recentMegaTx } = useMarket();
  const lastMegaTx = useRef<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'vanguard',
      content: 'Greetings, Citizen. I am Vanguard OS, the local intelligence node for FC Chain. How may I assist your traversal today?'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { playHover, playTypewriter, playSuccess } = useSoundEffects();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const speak = (text: string) => {
    if (!isVoiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    // Find a robotic or British male voice if possible
    const voices = window.speechSynthesis.getVoices();
    const vanguardVoice = voices.find(v => 
      v.name.includes('Google UK English Male') || 
      v.name.includes('Daniel') || 
      v.name.includes('English (United Kingdom)')
    );
    
    if (vanguardVoice) {
      utterance.voice = vanguardVoice;
    }
    utterance.pitch = 0.8; 
    utterance.rate = 1.1; 
    
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (recentMegaTx && recentMegaTx !== lastMegaTx.current) {
      lastMegaTx.current = recentMegaTx;
      const msg = `Market Data Intercepted: ${recentMegaTx}. Deploying algorithmic stabilizing protocols...`;
      
      const vanguardMsg: Message = { id: Date.now().toString(), role: 'vanguard', content: msg };
      setMessages(prev => [...prev, vanguardMsg]);
      
      if (!isOpen) {
        setIsOpen(true);
      }
      playTypewriter();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      speak(msg);
    }
  }, [recentMegaTx]);

  const handleCommand = (cmd: string) => {
    if (!cmd.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: cmd };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    
    setTimeout(() => {
      let response = "Command not recognized in local index. Establishing uplink to core matrix for wider search...";
      const normalizedCmd = cmd.toLowerCase();
      
      if (normalizedCmd.includes('status')) {
        response = "All systems nominal. Network latency is 12ms. Global threat level stands at 0%.";
      } else if (normalizedCmd.includes('fcc') || normalizedCmd.includes('token') || normalizedCmd.includes('price')) {
        response = "FCC is currently trading at $1.24 per protocol telemetry. Total volume deployed across Vanguard DEX is 1.4B.";
      } else if (normalizedCmd.includes('hack') || normalizedCmd.includes('breach')) {
        response = "WARNING: Simulated breach parameters detected. Deploying Sentinel countermeasures. Standby.";
      } else if (normalizedCmd.includes('mint') || normalizedCmd.includes('identity')) {
        response = "Citizen passports are cryptographic NFTs bound to your biological signature. Proceed to the Artifacts sector to mint.";
      } else if (normalizedCmd.includes('hello') || normalizedCmd.includes('hi')) {
        response = "Greetings. Vanguard OS is actively monitoring your session.";
      } else if (normalizedCmd.includes('clear')) {
        setMessages([]);
        setIsTyping(false);
        return;
      }
      
      const vanguardMsg: Message = { id: (Date.now() + 1).toString(), role: 'vanguard', content: response };
      setMessages(prev => [...prev, vanguardMsg]);
      setIsTyping(false);
      playSuccess();
      speak(response);
    }, 1500 + Math.random() * 1000); // 1.5 - 2.5s response delay
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(e.currentTarget.value);
      e.currentTarget.value = '';
    } else if (e.key !== 'Shift' && e.key !== 'Meta' && e.key !== 'Control' && e.key !== 'Alt') {
      playTypewriter();
    }
  };

  const handleMouseEnter = () => {
    if (!isHovered) {
      playHover();
      setIsHovered(true);
    }
  };

  const handleClick = () => {
    playTypewriter();
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 pointer-events-auto origin-bottom-right"
          >
            <div className="agency-panel border border-vanguard/30 bg-black/80 backdrop-blur-xl p-4 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
               <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/10">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-vanguard animate-pulse"></div>
                   <h3 className="text-sm font-bold text-white tracking-widest font-mono">VANGUARD OS</h3>
                 </div>
                 <div className="flex items-center gap-2">
                   <button 
                     onClick={() => setIsVoiceEnabled(!isVoiceEnabled)} 
                     className={`flex items-center justify-center w-6 h-6  border transition-colors ${isVoiceEnabled ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' : 'bg-white/5 border-white/10 text-white/40'}`}
                     title={isVoiceEnabled ? 'Voice Synthesis Active' : 'Enable Voice Synthesis'}
                   >
                     {isVoiceEnabled ? (
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
                     ) : (
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                     )}
                   </button>
                   <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors text-lg">&times;</button>
                 </div>
               </div>
               
               <div className="text-xs font-mono leading-relaxed space-y-3 max-h-[250px] overflow-y-auto scrollbar-hide mb-4">
                 <p className="text-vanguard mb-2">Initializing cognitive subroutines...</p>
                 
                 {messages.map((msg) => (
                   <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                     <div className={`px-3 py-2  max-w-[90%] ${msg.role === 'user' ? 'bg-white/10 text-white' : 'bg-vanguard/10 border border-vanguard/20 text-cyan-100 shadow-[0_0_10px_rgba(6,182,212,0.1)]'}`}>
                       {msg.content}
                     </div>
                   </div>
                 ))}
                 
                 {isTyping && (
                   <div className="flex flex-col items-start">
                     <div className="px-3 py-2 bg-vanguard/5 border border-vanguard/10 flex gap-1 items-center h-[34px]">
                       <div className="w-1.5 h-1.5 rounded-full bg-vanguard animate-bounce" style={{ animationDelay: '0ms' }}></div>
                       <div className="w-1.5 h-1.5 rounded-full bg-vanguard animate-bounce" style={{ animationDelay: '150ms' }}></div>
                       <div className="w-1.5 h-1.5 rounded-full bg-vanguard animate-bounce" style={{ animationDelay: '300ms' }}></div>
                     </div>
                   </div>
                 )}
                 <div ref={messagesEndRef} />
               </div>
               
               <div className="relative border-t border-white/5 pt-3">
                 <input 
                    type="text" 
                    placeholder="Ask Vanguard..." 
                    className="w-full bg-black/50 border border-white/10 px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-vanguard focus:ring-1 focus:ring-vanguard/50 transition-all placeholder:text-white/30"
                    onKeyDown={handleKeyDown}
                    autoFocus
                 />
                 <div className="absolute right-3 top-1/2 translate-y-[-10%] pointer-events-none text-white/20">
                   <kbd className="font-sans px-1.5 py-0.5 bg-white/5 border border-white/10 text-[9px]">↵</kbd>
                 </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className="w-20 h-20 md:w-24 md:h-24 cursor-pointer pointer-events-auto relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <div className={`absolute inset-0 rounded-full bg-vanguard/20 blur-xl transition-opacity duration-500 max-w-[500px] overflow-hidden ${isHovered ? 'opacity-100 scale-110' : 'opacity-40 scale-100'}`}></div>
        <Canvas camera={{ position: [0, 0, 3], fov: 45 }} className="!w-full !h-full max-w-[500px] overflow-hidden">
          <ambientLight intensity={0.5} />
          <OrbParticles isHovered={isHovered} />
        </Canvas>
      </div>
    </div>
  );
};
