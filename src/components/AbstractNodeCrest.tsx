import React from 'react';

interface GeometricProps {
  className?: string;
}

export const AbstractNodeCrest: React.FC<GeometricProps> = ({ className = "w-full h-full" }) => {
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
        {/* Outer Hexagon bounding box */}
        <polygon points="50,5 89,27 89,73 50,95 11,73 11,27" 
                 fill="none" stroke="url(#gold-dark)" strokeWidth="6" strokeLinejoin="round"/>
        
        {/* Inner Network Lines */}
        <line x1="50" y1="90" x2="50" y2="55" stroke="url(#gold-bright)" strokeWidth="8" strokeLinecap="round"/>
        <line x1="50" y1="55" x2="30" y2="35" stroke="url(#gold-bright)" strokeWidth="8" strokeLinecap="round"/>
        <line x1="50" y1="55" x2="70" y2="35" stroke="url(#gold-bright)" strokeWidth="8" strokeLinecap="round"/>
        <line x1="50" y1="55" x2="50" y2="25" stroke="url(#gold-bright)" strokeWidth="8" strokeLinecap="round"/>
        
        {/* Node dots */}
        <circle cx="30" cy="35" r="5" fill="#f8fafc" />
        <circle cx="70" cy="35" r="5" fill="#f8fafc" />
        <circle cx="50" cy="25" r="5" fill="#f8fafc" />
    </svg>
  );
};
