import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCyberSound } from '../hooks/useCyberSound';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { playHover, playClick } = useCyberSound();
  const navigate = useNavigate();
  
  const links = [
    { label: "Review Paths", href: "#audiences" },
    { label: "Operating Model", href: "#model" },
    { label: "Identity", href: "#identity" },
    { label: "Assurance", href: "#assurance" },
    { label: "Pilot", href: "#deployment" }
  ];

  const handleLinkClick = (href: string) => {
    playClick();
    onClose();
    // Allow slight delay for menu animation before harsh scroll
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(40px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)", transition: { delay: 0.3 } }}
          className="fixed inset-0 z-[100] bg-[#020306]/90 flex flex-col justify-center items-center px-6 sm:px-8 xl:hidden"
        >
          {/* Close Area Background */}
          <div className="absolute inset-0 z-0" onClick={() => { playClick(); onClose(); }}></div>
          
          <div className="absolute top-6 right-6 z-10 w-full flex justify-end px-8">
            <button 
              onClick={() => { playClick(); onClose(); }}
              onMouseEnter={() => playHover()}
              className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full bg-black/50 hover:bg-fc-gold transition-colors text-white"
              aria-label="Close Mobile Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <motion.div 
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
              hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
            }}
            className="flex flex-col gap-5 w-full z-10 -mt-10"
          >
            {links.map((link, i) => (
              <motion.div 
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -30, filter: "blur(10px)" },
                  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 20 } }
                }}
                className="w-full"
              >
                <button 
                  onClick={() => handleLinkClick(link.href)}
                  onMouseEnter={() => playHover()}
                  className="group flex flex-col items-start w-full border-b border-white/10 pb-4 text-left"
                >
                  <span className="text-[10px] font-mono tracking-widest text-fc-gold uppercase opacity-80 mb-1">0{i+1} //</span>
                  <span className="text-2xl font-serif font-light text-white tracking-[0.12em] uppercase group-hover:text-fc-gold transition-colors sm:text-3xl sm:tracking-widest">{link.label}</span>
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* Connect Button in Mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.8, type: "spring", stiffness: 100 } }}
            exit={{ opacity: 0, y: 30 }}
            className="absolute bottom-10 w-full px-8 z-10"
          >
            <button 
              onMouseEnter={() => playHover()}
              onClick={() => { playClick(); onClose(); navigate('/review-room'); }}
              className="w-full relative p-[1px] bg-white/10 hover:bg-fc-gold/50 transition-colors overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fc-gold to-transparent -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out"></div>
              <div className="relative bg-[#020306] px-8 py-4 flex items-center justify-center">
                <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-fc-gold group-hover:text-white transition-colors z-10 sm:tracking-[0.4em]">Open Review Room</span>
              </div>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
