import { useState, useEffect, useRef, memo } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  placeholderColor?: string;
  webp?: boolean; // 是否自动使用 webp 版本
}

/**
 * 高性能图片组件
 * - 支持懒加载
 * - 自动使用 WebP 格式（如果可用）
 * - 模糊占位效果
 * - 渐进式显示动画
 */
export const OptimizedImage = memo(function OptimizedImage({ 
  src, 
  alt, 
  className = '',
  priority = false,
  placeholderColor = '#020617',
  webp = true
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [imgSrc, setImgSrc] = useState(src);
  const [prevSrc, setPrevSrc] = useState(src);
  const imgRef = useRef<HTMLDivElement>(null);

  // Sync imgSrc when src prop changes (state-during-render pattern)
  if (prevSrc !== src) {
    setPrevSrc(src);
    setImgSrc(src);
  }

  // Async WebP availability check (only for .png sources)
  useEffect(() => {
    if (!webp || !src.endsWith('.png')) return;
    const webpSrc = src.replace('.png', '.webp');
    const img = new Image();
    img.onload = () => setImgSrc(webpSrc);
    img.onerror = () => setImgSrc(src);
    img.src = webpSrc;
    return () => { img.onload = null; img.onerror = null; };
  }, [src, webp]);

  // 懒加载观察
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: placeholderColor }}
    >
      {isInView && (
        <picture>
          {/* WebP source */}
          {webp && imgSrc.endsWith('.webp') && (
            <source srcSet={imgSrc} type="image/webp" />
          )}
          {/* Fallback PNG */}
          <img
            src={imgSrc.endsWith('.webp') ? src : imgSrc}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          />
        </picture>
      )}
      {!isLoaded && (
        <div 
          className="absolute inset-0 animate-pulse"
          style={{ backgroundColor: placeholderColor }}
        />
      )}
    </div>
  );
});
