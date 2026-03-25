import React, { useState, useEffect, useRef } from 'react';

interface GlitchTextProps {
  text: string;
  interval?: number;
  isActive?: boolean;
  className?: string;
  characters?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ 
  text, 
  interval = 40, 
  isActive = true, 
  className = '',
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>/?'
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerGlitch = () => {
    if (!isActive || isGlitching) return;
    setIsGlitching(true);
    let iterations = 0;
    const maxIterations = 15;

    const jumble = () => {
      if (iterations >= maxIterations) {
        setDisplayText(text);
        setIsGlitching(false);
        return;
      }
      
      const glitched = text.split('').map((char, index) => {
        if (char === ' ' || char === '\n') return char;
        if (index < (iterations / maxIterations) * text.length) {
            return text[index];
        }
        return characters[Math.floor(Math.random() * characters.length)];
      }).join('');
      
      setDisplayText(glitched);
      iterations++;
      timeoutRef.current = setTimeout(jumble, interval);
    };
    
    jumble();
  };

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  useEffect(() => {
    return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, []);

  return (
    <span 
      className={`inline-block whitespace-pre-wrap ${className}`}
      onMouseEnter={triggerGlitch}
    >
      {displayText}
    </span>
  );
};
