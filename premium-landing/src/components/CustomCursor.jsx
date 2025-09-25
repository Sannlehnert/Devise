import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorImage, setCursorImage] = useState(null);

  useEffect(() => {
    // Precargar imagen del cursor
    const img = new Image();
    img.src = '/img/iconodevise.png';
    img.onload = () => setCursorImage(img);

    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleHover = (e) => {
      setIsHovering(true);
    };

    const handleLeave = (e) => {
      setIsHovering(false);
    };

    document.addEventListener('mousemove', updateCursor);
    
    const interactiveElements = document.querySelectorAll(
      'button, a, input, textarea, [role="button"], .interactive'
    );
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  if (!cursorImage) return null;

  return (
    <div 
      className={`fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out ${
        isHovering ? 'scale-150' : 'scale-100'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        mixBlendMode: 'difference'
      }}
    >
      <img 
        src="/img/banderasinfondo.png" 
        alt="Cursor Devise"
        className="w-6 h-6 transition-all duration-200"
        style={{
          filter: 'invert(1) brightness(2)',
          opacity: isHovering ? 1 : 0.8
        }}
      />
      
      {/* Anillo exterior en hover */}
      {isHovering && (
        <div 
          className="absolute inset-0 border-2 border-[#9AD4EA] rounded-full animate-ping"
          style={{
            width: '40px',
            height: '40px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.3
          }}
        />
      )}
    </div>
  );
}