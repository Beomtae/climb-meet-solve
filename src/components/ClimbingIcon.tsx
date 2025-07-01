
import React from 'react';

interface ClimbingIconProps {
  className?: string;
  size?: number;
}

const ClimbingIcon: React.FC<ClimbingIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
    >
      {/* 클라이밍 홀드들 */}
      <circle cx="4" cy="4" r="2" fill="currentColor" opacity="0.8"/>
      <circle cx="12" cy="6" r="2" fill="currentColor" opacity="0.8"/>
      <circle cx="20" cy="8" r="2" fill="currentColor" opacity="0.8"/>
      <circle cx="6" cy="12" r="2" fill="currentColor" opacity="0.8"/>
      <circle cx="16" cy="14" r="2" fill="currentColor" opacity="0.8"/>
      <circle cx="10" cy="18" r="2" fill="currentColor" opacity="0.8"/>
      
      {/* 클라이밍 루트 연결선 */}
      <path 
        d="M4 6 L12 8 L20 10 M6 14 L16 16 M10 20 L16 16" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        opacity="0.6"
      />
      
      {/* 클라이머 실루엣 */}
      <path 
        d="M14 16 L15 18 L14 20 M15 18 L17 19" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ClimbingIcon;
