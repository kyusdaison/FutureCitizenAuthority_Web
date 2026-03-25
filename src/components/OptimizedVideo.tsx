import { useState, useEffect, useRef } from 'react';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

export const OptimizedVideo = ({ 
  src, 
  poster,
  className = ''
}: OptimizedVideoProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: '100px'
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={videoRef}
      className={`relative overflow-hidden bg-black/50 ${className}`}
    >
      {isInView ? (
        <video
          controls
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={poster}
          onLoadedData={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-80' : 'opacity-0'
          }`}
        >
          <source src={src} type="video/mp4" />
          {poster && (
            <img 
              src={poster} 
              alt="Video thumbnail" 
              className="w-full h-full object-cover"
            />
          )}
        </video>
      ) : (
        poster ? (
          <img 
            src={poster} 
            alt="Video thumbnail" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="w-12 h-12 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
          </div>
        )
      )}
      
      {!isLoaded && isInView && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-12 h-12 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};
