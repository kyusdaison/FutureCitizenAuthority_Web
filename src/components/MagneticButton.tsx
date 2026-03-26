import { useRef, useCallback, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

/**
 * 高性能磁吸按钮
 * 使用 CSS transform 替代 Framer Motion spring，减少 JS 计算负担
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = '', 
  intensity = 0.3
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || prefersReducedMotion) return;
    
    // 取消之前的动画帧
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = (e.clientX - centerX) * intensity;
      const distanceY = (e.clientY - centerY) * intensity;
      
      setTransform({ x: distanceX, y: distanceY });
    });
  }, [intensity, prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    // 使用 CSS transition 实现平滑回弹
    setTransform({ x: 0, y: 0 });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  // 如果偏好减少动画，直接渲染子元素
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`relative cursor-pointer flex items-center justify-center p-4 -m-4 ${className}`}
    >
      <div 
        style={{ 
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          transition: isHovering
            ? 'none'
            : 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
          willChange: 'transform'
        }}
      >
        {children}
      </div>
    </div>
  );
};
