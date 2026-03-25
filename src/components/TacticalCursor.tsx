import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const TacticalCursor = () => {
  const [isHovering, setIsHovering] = useState(false);

  // High-performance spring setup for fluid tracking
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(-100, springConfig);
  const cursorYSpring = useSpring(-100, springConfig);
  const dotXSpring = useSpring(-100, { damping: 40, stiffness: 400 });
  const dotYSpring = useSpring(-100, { damping: 40, stiffness: 400 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      dotXSpring.set(e.clientX - 3);
      dotYSpring.set(e.clientY - 3);
      cursorXSpring.set(e.clientX - 16); // center the 32px ring
      cursorYSpring.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Heuristic for interactive elements
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorXSpring, cursorYSpring, dotXSpring, dotYSpring]);

  return (
    <div className="hidden md:block">
      {/* Zero-latency core dot */}
      <motion.div 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: dotXSpring,
          y: dotYSpring
        }}
      />

      {/* Spring-physics outer tactical ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovering ? 2.5 : 1,
          borderColor: isHovering ? 'rgba(197, 154, 69, 0.8)' : 'rgba(255, 255, 255, 0.5)',
          backgroundColor: isHovering ? 'rgba(197, 154, 69, 0.05)' : 'transparent',
        }}
        transition={{ duration: 0.2 }}
      >
        {isHovering && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full border border-fc-gold/30 rounded-full absolute animate-[spin_4s_linear_infinite]"
          />
        )}
      </motion.div>
    </div>
  );
};
