import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'icon' | 'wordmark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ 
  variant = 'full', 
  size = 'md', 
  animated = true,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  const LogoIcon = () => (
    <div className={`relative ${sizeClasses[size]} ${animated ? 'animate-candy-swirl' : ''}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="candyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fdeee0" />
            <stop offset="25%" stopColor="#e0fbf3" />
            <stop offset="50%" stopColor="#e0f2fe" />
            <stop offset="75%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fce7f3" />
          </linearGradient>
          
          <radialGradient id="brainGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#48c0f9" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </radialGradient>
          
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#be185d" />
          </linearGradient>

          {/* Drop Shadow Filter */}
          <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.2"/>
          </filter>
        </defs>

        {/* Main Candy Swirl Shape */}
        <path
          d="M20,50 Q30,20 50,30 Q70,40 80,50 Q70,80 50,70 Q30,60 20,50 Z"
          fill="url(#candyGradient)"
          filter="url(#dropShadow)"
          className={animated ? 'animate-candy-melt' : ''}
        />
        
        {/* Psychology Brain Outline */}
        <path
          d="M35,25 Q45,15 55,25 Q65,20 70,30 Q75,40 70,50 Q65,60 55,55 Q50,65 45,55 Q35,60 30,50 Q25,40 30,30 Q30,20 35,25 Z"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="2"
          opacity="0.7"
          className={animated ? 'animate-pulse-slow' : ''}
        />
        
        {/* Heart Center */}
        <path
          d="M45,40 Q45,35 50,35 Q55,35 55,40 Q55,45 50,55 Q45,45 45,40 Z"
          fill="url(#heartGradient)"
          className={animated ? 'animate-heartbeat' : ''}
        />
        
        {/* Flavor Dots */}
        <circle cx="25" cy="35" r="3" fill="#f4a050" opacity="0.8" className={animated ? 'animate-candy-bounce' : ''} />
        <circle cx="75" cy="35" r="3" fill="#58e3c3" opacity="0.8" className={animated ? 'animate-candy-bounce' : ''} style={{animationDelay: '0.2s'}} />
        <circle cx="25" cy="65" r="3" fill="#48c0f9" opacity="0.8" className={animated ? 'animate-candy-bounce' : ''} style={{animationDelay: '0.4s'}} />
        <circle cx="75" cy="65" r="3" fill="#f59e0b" opacity="0.8" className={animated ? 'animate-candy-bounce' : ''} style={{animationDelay: '0.6s'}} />
        
        {/* Sparkle Effects */}
        {animated && (
          <>
            <circle cx="15" cy="20" r="1" fill="#ffffff" opacity="0.9" className="animate-twinkle" />
            <circle cx="85" cy="25" r="1" fill="#ffffff" opacity="0.9" className="animate-twinkle" style={{animationDelay: '0.5s'}} />
            <circle cx="20" cy="80" r="1" fill="#ffffff" opacity="0.9" className="animate-twinkle" style={{animationDelay: '1s'}} />
            <circle cx="80" cy="75" r="1" fill="#ffffff" opacity="0.9" className="animate-twinkle" style={{animationDelay: '1.5s'}} />
          </>
        )}
      </svg>
    </div>
  );

  const LogoWordmark = () => (
    <div className={`font-bold ${textSizeClasses[size]} bg-candy-rainbow bg-clip-text text-transparent ${animated ? 'animate-text-shimmer' : ''}`}>
      <span className="tracking-tight">Love by</span>
      <span className="ml-2 font-black">Flavour</span>
    </div>
  );

  const LogoFull = () => (
    <div className="flex items-center gap-3">
      <LogoIcon />
      <LogoWordmark />
    </div>
  );

  const renderLogo = () => {
    switch (variant) {
      case 'icon':
        return <LogoIcon />;
      case 'wordmark':
        return <LogoWordmark />;
      case 'full':
      default:
        return <LogoFull />;
    }
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      {renderLogo()}
    </div>
  );
};

export default BrandLogo; 