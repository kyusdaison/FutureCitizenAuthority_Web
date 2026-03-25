import { useState, useEffect } from 'react';

interface DecipherTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
}

const HEX_CHARS = '0123456789ABCDEFx';

export const DecipherText = ({ text, className = '', duration = 600, delay = 0 }: DecipherTextProps) => {
  const [displayText, setDisplayText] = useState<string>('');
  const [isDeciphering, setIsDeciphering] = useState(false);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    // Start delay
    const timeoutId = setTimeout(() => {
      setIsDeciphering(true);
      const startTime = Date.now();
      
      intervalId = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        if (progress === 1) {
          setDisplayText(text);
          setIsDeciphering(false);
          clearInterval(intervalId);
          return;
        }

        // Calculate how many actual characters should be revealed based on progress
        const revealedCount = Math.floor(text.length * progress);
        
        let currentText = '';
        for (let i = 0; i < text.length; i++) {
          if (i < revealedCount) {
            currentText += text[i];
          } else {
            // Unrevealed characters are random hex
            currentText += HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
          }
        }
        
        setDisplayText(currentText);
      }, 30); // update every 30ms for rapid flickering
      
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, duration, delay]);

  return (
    <span className={`${className} ${isDeciphering ? 'text-yellow-500/70' : ''} transition-colors duration-300`}>
      {displayText || text.replace(/./g, '0')}
    </span>
  );
};
