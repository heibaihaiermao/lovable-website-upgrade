
import React from 'react';

const Logo = ({ className = "", textClassName = "" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo SVG with design-appropriate colors */}
      <div className="relative">
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 400 400" 
          className="transition-transform duration-300 hover:scale-105"
        >
          {/* Anvil base - dark navy matching the design */}
          <path 
            d="M120 200 L280 200 L300 260 L100 260 Z" 
            fill="currentColor" 
            className="text-gray-800 dark:text-gray-200"
          />
          {/* Anvil top - gradient matching brand colors */}
          <path 
            d="M80 200 L320 200 L300 180 L100 180 Z" 
            fill="url(#logoGradient)"
          />
          {/* Spark/star element - accent color */}
          <g transform="translate(240, 150)">
            <path 
              d="M0,-12 L3,-3 L12,0 L3,3 L0,12 L-3,3 L-12,0 L-3,-3 Z" 
              fill="currentColor"
              className="text-violet-500 dark:text-violet-400"
            />
          </g>
          {/* Gradient definition */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Text */}
      <span className={`text-2xl sm:text-3xl md:text-3xl font-bold select-none ${textClassName}`}>
        BlogForge
      </span>
    </div>
  );
};

export default Logo;
