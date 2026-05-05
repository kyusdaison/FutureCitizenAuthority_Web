import { useEffect, useRef } from 'react';

export const HexGridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const syncCanvasSize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    syncCanvasSize();

    const hexSize = 35; // Size of hexagon
    const hexHeight = hexSize * Math.sqrt(3);
    const hexOffsetX = hexSize * 1.5;
    const hexOffsetY = hexHeight;

    let mouseX = -1000;
    let mouseY = -1000;

    const drawHexagon = (x: number, y: number, size: number, distance: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      
      const maxDist = 400;
      const intensity = Math.max(0, 1 - distance / maxDist);
      
      // Base grid is barely visible, hover adds glow
      ctx.strokeStyle = `rgba(34, 211, 238, ${0.03 + intensity * 0.2})`; // cyan tracking
      ctx.lineWidth = 1;
      ctx.stroke();
      
      if (intensity > 0) {
        ctx.fillStyle = `rgba(34, 211, 238, ${intensity * 0.05})`;
        ctx.fill();
        
        // Add central connection dot
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${intensity * 0.8})`;
        ctx.fill();
      }
    };

    let animationFrameId: number | null = null;

    const render = () => {
      animationFrameId = null;
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / hexOffsetX) + 1;
      const rows = Math.ceil(height / hexOffsetY) + 2; // Extra row for safe bleeding

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * hexOffsetX;
          const y = row * hexOffsetY + (col % 2 === 1 ? hexOffsetY / 2 : 0);
          
          const dx = mouseX - x;
          const dy = mouseY - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          drawHexagon(x, y, hexSize, distance);
        }
      }
    };

    const scheduleRender = () => {
      if (animationFrameId !== null) return;
      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      scheduleRender();
    };

    scheduleRender();

    const handleResize = () => {
      syncCanvasSize();
      scheduleRender();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden mix-blend-screen opacity-60">
      <canvas 
        ref={canvasRef} 
        className="block h-full w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020306] via-transparent to-[#020306] pointer-events-none" />
    </div>
  );
};
