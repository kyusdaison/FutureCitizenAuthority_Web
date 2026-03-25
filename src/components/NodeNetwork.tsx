import { useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export const NodeNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const frameCountRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  // 使用 useCallback 缓存动画函数
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const particles = particlesRef.current;

    // 每2帧渲染一次 (30fps)，减少CPU负载
    frameCountRef.current++;
    if (frameCountRef.current % 2 === 0) {
      ctx.clearRect(0, 0, width, height);

      // 批量绘制粒子
      ctx.fillStyle = 'rgba(6, 182, 212, 0.5)';
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 使用空间分割优化连接计算
      // 只检查距离小于150的粒子对
      ctx.lineWidth = 1;
      const maxDist = 150;
      const maxDistSq = maxDist * maxDist;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        // 只检查后面的粒子，避免重复计算
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const opacity = (1 - dist / maxDist) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(197, 154, 69, ${opacity})`;
            ctx.stroke();
          }
        }
      }
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // 如果用户偏好减少动画，不渲染
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // 使用 willReadFrequently: false 优化性能
    const ctx = canvas.getContext('2d', { 
      alpha: true,
      willReadFrequently: false 
    });
    if (!ctx) return;

    const init = () => {
      const parent = canvas.parentElement;
      const width = canvas.width = parent ? parent.clientWidth : window.innerWidth;
      const height = canvas.height = parent ? parent.clientHeight : window.innerHeight;

      // 减少粒子数量，根据屏幕尺寸动态调整
      const baseCount = Math.min(Math.floor(width / 30), 60);
      particlesRef.current = [];

      for (let i = 0; i < baseCount; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3, // 降低速度
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.2 + 0.5
        });
      }
    };

    init();
    rafRef.current = requestAnimationFrame(animate);

    // 使用 ResizeObserver 替代 resize 事件
    const resizeObserver = new ResizeObserver(() => {
      init();
    });
    
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate, prefersReducedMotion]);

  // 如果用户偏好减少动画，返回空
  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-50 will-change-transform"
    />
  );
};
