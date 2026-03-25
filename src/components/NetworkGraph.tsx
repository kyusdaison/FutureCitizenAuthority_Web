import { useState, useEffect } from 'react';

export const NetworkGraph = () => {
  const [bars, setBars] = useState<number[]>(Array(40).fill(20));

  useEffect(() => {
    // Simulate real-time fluctuating network load
    const interval = setInterval(() => {
      setBars(prev => {
        // Shift left, add a new random bar on the right
        // The bar height is between 10 and 100
        const newBar = Math.floor(Math.random() * 60) + 20; 
        
        // Randomly create a 'spike'
        const isSpike = Math.random() > 0.85;
        const finalBar = isSpike ? newBar + 40 : newBar;

        return [...prev.slice(1), Math.min(finalBar, 100)];
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-16 flex items-end gap-[2px] opacity-70">
      <style>{bars.map((height, i) => `.network-bar-${i} { height: ${height}%; }`).join('\n')}</style>
      {bars.map((height, i) => {
        // Create a heat map color based on height
        const isHighLoad = height > 70;
        const isMediumLoad = height > 40;
        
        let colorClass = 'bg-yellow-500/30';
        if (isHighLoad) colorClass = 'bg-red-500/60 shadow-[0_0_8px_rgba(239,68,68,0.5)]';
        else if (isMediumLoad) colorClass = 'bg-orange-500/50 shadow-[0_0_5px_rgba(249,115,22,0.3)]';

        return (
          <div 
            key={i} 
            className={`flex-1 rounded-t-sm transition-all duration-300 ease-out ${colorClass} network-bar-${i}`}
          />
        );
      })}
    </div>
  );
};
