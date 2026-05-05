import { useEffect, useRef } from 'react';

/** RAF-throttled mouse tracker that sets CSS custom properties on body. */
export function useMouseTracker() {
  const mousePos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const ticking = useRef(false);

  useEffect(() => {
    const canTrackPointer = window.matchMedia('(pointer: fine)').matches && window.matchMedia('(hover: hover)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canTrackPointer || prefersReducedMotion) return;

    const updateMousePosition = () => {
      document.body.style.setProperty('--mouse-x', `${mousePos.current.x}px`);
      document.body.style.setProperty('--mouse-y', `${mousePos.current.y}px`);
      ticking.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!ticking.current) {
        rafRef.current = requestAnimationFrame(updateMousePosition);
        ticking.current = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);
}
