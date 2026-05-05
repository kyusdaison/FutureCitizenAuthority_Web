import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSoundEffects } from '../hooks/useSoundEffects';

export interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
}

const AssistantBeacon = ({ isHovered }: { isHovered: boolean }) => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div
      className={`absolute h-full w-full rounded-full border border-cyan-300/25 transition-transform duration-500 ${
        isHovered ? 'scale-110 border-cyan-200/45' : 'scale-100'
      }`}
    />
    <div className="absolute h-[72%] w-[72%] rounded-full border border-fc-gold/20 animate-[spin_12s_linear_infinite]" />
    <div className="absolute h-[48%] w-[48%] rounded-full border border-cyan-300/25 animate-[spin_8s_linear_infinite_reverse]" />
    <div className="h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_22px_rgba(103,232,249,0.55)]" />
  </div>
);

export const VanguardOrb = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: 'Welcome. I can help evaluators inspect identity, governance, deployment, and operating controls.'
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

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const reviewVoice = voices.find(v =>
      v.name.includes('Google UK English Male') ||
      v.name.includes('Daniel') ||
      v.name.includes('English (United Kingdom)')
    );

    if (reviewVoice) {
      utterance.voice = reviewVoice;
    }
    utterance.pitch = 0.9;
    utterance.rate = 1.05;

    window.speechSynthesis.speak(utterance);
  };

  const handleCommand = (cmd: string) => {
    if (!cmd.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: cmd };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      let response = 'I do not have that item in the local briefing index. Try identity, deployment, compliance, governance, or status.';
      const normalizedCmd = cmd.toLowerCase();

      if (normalizedCmd.includes('status')) {
        response = 'The demo review workspace is nominal. Treat operational figures as sample data until production sources are connected.';
      } else if (normalizedCmd.includes('fcc') || normalizedCmd.includes('token') || normalizedCmd.includes('price')) {
        response = 'FCC economics are kept in the community appendix so institutional reviewers can inspect identity, custody, governance, and pilot controls first.';
      } else if (normalizedCmd.includes('hack') || normalizedCmd.includes('breach')) {
        response = 'Security simulation recognized. The review path is incident classification, operator notification, containment, and audit logging.';
      } else if (normalizedCmd.includes('mint') || normalizedCmd.includes('identity')) {
        response = 'Identity records are verifiable credentials issued through approved enrollment, recovery, and permission policies. Open the Identity layer to review the model.';
      } else if (normalizedCmd.includes('hello') || normalizedCmd.includes('hi')) {
        response = 'The FCA review assistant is active. I can summarize identity, deployment, compliance, and governance surfaces.';
      } else if (normalizedCmd.includes('clear')) {
        setMessages([]);
        setIsTyping(false);
        return;
      }

      const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
      playSuccess();
      speak(response);
    }, 700);
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
    <div className="fixed bottom-12 right-5 z-40 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-3 w-72 pointer-events-auto origin-bottom-right md:w-80"
          >
            <div className="agency-panel border border-vanguard/30 bg-black/80 backdrop-blur-xl p-4 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-vanguard animate-pulse"></div>
                  <h3 className="text-sm font-bold text-white tracking-widest font-mono">FCA REVIEW ASSISTANT</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                    className={`flex items-center justify-center w-6 h-6 border transition-colors ${isVoiceEnabled ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' : 'bg-white/5 border-white/10 text-white/40'}`}
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
                <p className="text-vanguard mb-2">Review assistant ready.</p>

                {messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-3 py-2 max-w-[90%] ${msg.role === 'user' ? 'bg-white/10 text-white' : 'bg-vanguard/10 border border-vanguard/20 text-cyan-100 shadow-[0_0_10px_rgba(6,182,212,0.1)]'}`}>
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
                  placeholder="Ask about identity, deployment, compliance..."
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
        className="w-12 h-12 md:w-14 md:h-14 cursor-pointer pointer-events-auto relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <div className={`absolute inset-0 rounded-full bg-vanguard/15 blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-80 scale-110' : 'opacity-25 scale-100'}`}></div>
        <AssistantBeacon isHovered={isHovered} />
      </div>
    </div>
  );
};
