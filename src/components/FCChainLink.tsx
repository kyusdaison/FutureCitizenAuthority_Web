import React from 'react';

interface GeometricProps {
  className?: string;
}

export const FCChainLink: React.FC<GeometricProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg viewBox="0 0 100 100" className={className}>
        <defs>
            <linearGradient id="gold-bright" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#CA8A04" />
            </linearGradient>
            <linearGradient id="gold-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EAB308" />
                <stop offset="100%" stopColor="#854D0E" />
            </linearGradient>
        </defs>
        <g transform="translate(50, 50) rotate(-30) translate(-50, -50)">
            {/* The 'C' letter (Left Link) in White/Silver */}
            <path d="M 50 15 L 30 25 L 30 75 L 50 85 L 60 80" 
                  fill="none" stroke="#f8fafc" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M 50 15 L 40 20 L 40 80 L 50 85" 
                  fill="none" stroke="#94a3b8" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" opacity={0.5}/>
            
            {/* The 'F' letter (Right Link) in Gold */}
            <path d="M 35 30 L 70 30 L 70 75" 
                  fill="none" stroke="url(#gold-bright)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M 45 52 L 70 52" 
                  fill="none" stroke="url(#gold-bright)" strokeWidth="12" strokeLinecap="round"/>
        </g>
    </svg>
  );
};
