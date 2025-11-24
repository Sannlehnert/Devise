import React from 'react';
import { useParallax } from '../hooks/useParallax';

export default function ParallaxSection({ children, speed = 0.3, className = '' }) {
  const parallaxOffset = useParallax(speed);

  return (
    <div 
      className={className}
      style={{ 
        transform: `translateY(${parallaxOffset}px)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {children}
    </div>
  );
}