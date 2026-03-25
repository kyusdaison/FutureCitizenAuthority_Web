import React from 'react';

interface GeometricLionProps {
  className?: string;
}

export const GeometricLion: React.FC<GeometricLionProps> = ({ className = "w-full h-full" }) => {
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
        {/* Mane Outer Left */}
        <polygon points="50,15 25,30 30,50 15,65 35,90 50,75" fill="url(#gold-dark)" opacity={0.8}/>
        {/* Mane Outer Right */}
        <polygon points="50,15 75,30 70,50 85,65 65,90 50,75" fill="url(#gold-dark)" opacity={0.6}/>
        
        {/* Face Left */}
        <polygon points="50,25 35,45 50,65" fill="url(#gold-bright)" opacity={0.9}/>
        {/* Face Right */}
        <polygon points="50,25 65,45 50,65" fill="url(#gold-bright)" opacity={0.7}/>
        
        {/* Nose/Muzzle */}
        <polygon points="50,65 42,75 50,85 58,75" fill="url(#gold-dark)"/>
        
        {/* Eyes */}
        <polygon points="40,48 45,50 42,45" fill="#0f172a"/>
        <polygon points="60,48 55,50 58,45" fill="#0f172a"/>

        {/* Crown geometry at top */}
        <polygon points="40,15 50,5 60,15 50,25" fill="url(#gold-bright)"/>
    </svg>
  );
};
