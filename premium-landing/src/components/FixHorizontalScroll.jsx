import React, { useEffect } from 'react';

export default function FixHorizontalScroll() {
  useEffect(() => {
    // Prevenir scroll horizontal
    const preventHorizontalScroll = () => {
      document.body.style.overflowX = 'hidden';
      document.documentElement.style.overflowX = 'hidden';
      
      // Verificar elementos con overflow
      document.querySelectorAll('*').forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.overflowX === 'scroll' || style.overflowX === 'auto') {
          el.style.overflowX = 'hidden';
        }
      });
    };

    preventHorizontalScroll();
    
    // Ejecutar en cada resize
    window.addEventListener('resize', preventHorizontalScroll);
    
    return () => {
      window.removeEventListener('resize', preventHorizontalScroll);
      document.body.style.overflowX = '';
      document.documentElement.style.overflowX = '';
    };
  }, []);

  return null;
}