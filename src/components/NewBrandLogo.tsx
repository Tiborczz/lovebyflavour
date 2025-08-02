import React from 'react';

interface NewBrandLogoProps {
  variant?: 'full' | 'icon' | 'wordmark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const NewBrandLogo: React.FC<NewBrandLogoProps> = ({ 
  variant = 'full', 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-3xl'
  };

  const LogoIcon = () => (
    <div className={`relative ${sizeClasses[size]} flex-shrink-0`}>
      <svg
        viewBox="0 0 40 40"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8b4cb" />
            <stop offset="50%" stopColor="#f093fb" />
            <stop offset="100%" stopColor="#f5576c" />
          </linearGradient>
          
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4facfe" />
            <stop offset="100%" stopColor="#00f2fe" />
          </linearGradient>
        </defs>

        {/* Main Circle */}
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="url(#logoGradient)"
          stroke="white"
          strokeWidth="2"
        />
        
        {/* Heart Shape */}
        <path
          d="M20,28 C16,24 12,20 12,16 C12,13 14,11 17,11 C18,11 19,12 20,13 C21,12 22,11 23,11 C26,11 28,13 28,16 C28,20 24,24 20,28 Z"
          fill="white"
          opacity="0.9"
        />
        
        {/* Small Dots for Flavor */}
        <circle cx="14" cy="14" r="1.5" fill="#ffd93d" opacity="0.8" />
        <circle cx="26" cy="14" r="1.5" fill="#6bcf7f" opacity="0.8" />
        <circle cx="20" cy="32" r="1.5" fill="#ff6b9d" opacity="0.8" />
      </svg>
    </div>
  );

  const LogoWordmark = () => (
    <div className={`font-bold ${textSizeClasses[size]} text-gray-800`}>
      <span className="font-light">Love by</span>
      <span className="ml-2 font-black bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
        Flavour
      </span>
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

export default NewBrandLogo; 