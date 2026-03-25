import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Cryptographic character pool
const CHARS = '!<>-_\\\\/[]{}—=+*^?#________';

interface CipherHeadingProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
}

export const CipherHeading = ({ 
  text, 
  className = '', 
  duration = 1000, 
  delay = 0
}: CipherHeadingProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  // Start fully scrambled
  const [displayText, setDisplayText] = useState(text.replace(/./g, '·'));
  
  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp + (delay * 1000);
      }
      
      const elapsed = timestamp - startTime;
      
      if (elapsed < 0) {
        // waiting for the initial delay to finish
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      // Determine how many characters from the real string are "locked in"
      const solvedLength = Math.floor(progress * text.length);
      
      let newText = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          newText += ' '; // Preserve spaces for structure
        } else if (i < solvedLength) {
          newText += text[i]; // Actual locked character
        } else {
          // Random glyph for unsolved characters
          newText += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      
      setDisplayText(newText);

      if (progress < 1) {
        // limit refresh rate slightly for visual clarity (like an old terminal)
        timeoutId = setTimeout(() => {
           animationFrame = requestAnimationFrame(animate);
        }, 30);
      } else {
        // Ensure exact final text on completion
        setDisplayText(text);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timeoutId);
    };
  }, [isInView, text, duration, delay]);

  return (
    <motion.span ref={ref} className={className}>
      {displayText}
    </motion.span>
  );
};
