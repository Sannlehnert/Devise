import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Flag3D() {
  const flagRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    
    const flag = flagRef.current;
    if (flag) {
      flag.addEventListener('mouseenter', handleMouseEnter);
      flag.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (flag) {
        flag.removeEventListener('mouseenter', handleMouseEnter);
        flag.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <motion.div 
      ref={flagRef}
      className="relative w-full h-full flag-3d-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Efecto de bandera flameante en 3D */}
      <div 
        className="absolute inset-0 w-full h-full flag-3d-wave"
        style={{
          backgroundImage: "url('/img/devisebandera.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `
            perspective(1000px)
            rotateX(${mousePosition.y * 8}deg)
            rotateY(${mousePosition.x * 8}deg)
            scale3d(1.1, 1.1, 1.1)
          `,
          filter: 'brightness(1.1) contrast(1.1)',
          transition: 'transform 0.1s ease-out, filter 0.3s ease'
        }}
      />
      
      {/* Efectos de iluminación 3D */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-[#1C045A]/40 via-transparent to-[#9AD4EA]/30"
        style={{
          mixBlendMode: 'overlay'
        }}
      />
      
      {/* Sombras 3D dinámicas */}
      <div 
        className="absolute inset-0 shadow-3d"
        style={{
          boxShadow: `
            ${mousePosition.x * 30}px ${mousePosition.y * 30}px 60px rgba(28, 4, 90, 0.4),
            ${-mousePosition.x * 20}px ${-mousePosition.y * 20}px 40px rgba(154, 212, 234, 0.3)
          `,
          transition: 'box-shadow 0.1s ease-out'
        }}
      />
      
      {/* Efecto de partículas flotantes */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#9AD4EA] rounded-full"
            animate={{
              y: [0, -20, 0],
              x: [0, Math.sin(i) * 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
            style={{
              left: `${10 + (i * 6)}%`,
              top: `${20 + (i * 4)}%`,
            }}
          />
        ))}
      </div>

      {/* Efecto de brillo al hover */}
      {isHovering && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[#9AD4EA]/20 to-[#584485]/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            mixBlendMode: 'soft-light'
          }}
        />
      )}
    </motion.div>
  );
}