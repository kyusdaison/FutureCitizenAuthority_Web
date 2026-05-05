import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { RefObject } from 'react';

// Cryptographic character pool
const CHARS = '!<>-_\\\\/[]{}—=+*^?#________';

interface CipherHeadingProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: 'span' | 'h1' | 'h2' | 'h3';
}

export const CipherHeading = ({ 
  text, 
  className = '', 
  duration = 1000, 
  delay = 0,
  as = 'span'
}: CipherHeadingProps) => {
  const ref = useRef<HTMLElement>(null);
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

  const visualText = <span aria-hidden="true">{displayText}</span>;

  if (as === 'h1') {
    return (
      <motion.h1 ref={ref as RefObject<HTMLHeadingElement>} className={className} aria-label={text}>
        {visualText}
      </motion.h1>
    );
  }

  if (as === 'h2') {
    return (
      <motion.h2 ref={ref as RefObject<HTMLHeadingElement>} className={className} aria-label={text}>
        {visualText}
      </motion.h2>
    );
  }

  if (as === 'h3') {
    return (
      <motion.h3 ref={ref as RefObject<HTMLHeadingElement>} className={className} aria-label={text}>
        {visualText}
      </motion.h3>
    );
  }

  return (
    <motion.span ref={ref as RefObject<HTMLSpanElement>} className={className} aria-label={text}>
      {visualText}
    </motion.span>
  );
};
