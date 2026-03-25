import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  distance?: number;
  duration?: number;
}

/**
 * 高性能入场动画组件
 * 使用纯 transform 和 opacity，避免使用 filter: blur() 造成 GPU 负担
 */
export const FadeInUp: React.FC<FadeInUpProps> = ({ 
  children, 
  delay = 0, 
  className = '',
  distance = 40,
  duration = 0.8
}) => {
  const prefersReducedMotion = useReducedMotion();

  // 如果用户偏好减少动画，直接显示内容
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration, 
        ease: [0.25, 0.1, 0.25, 1], // 更平滑的缓动曲线
        delay 
      }}
      className={className}
      // 使用 will-change 优化 GPU 加速
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
};
