import React, { useEffect } from 'react';

export default function AccessibilityEnhancer() {
  useEffect(() => {
    // Mejorar contraste dinámicamente - método seguro
    const improveContrast = () => {
      const styleId = 'accessibility-contrast';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
          .text-\\[\\#94a3b8\\] {
            color: rgba(165, 180, 202, 0.95) !important;
          }
          .text-\\[\\#B8C2D9\\] {
            color: rgba(200, 210, 230, 0.98) !important;
          }
          .bg-white\\/5 {
            background-color: rgba(255, 255, 255, 0.08) !important;
          }
          
          /* Focus styles para accesibilidad */
          button:focus-visible,
          a:focus-visible,
          input:focus-visible,
          textarea:focus-visible {
            outline: 2px solid #9AD4EA !important;
            outline-offset: 2px !important;
            border-radius: 8px !important;
          }
        `;
        document.head.appendChild(style);
      }
    };

    // Añadir roles ARIA de forma segura
    const enhanceAccessibility = () => {
      try {
        const buttons = document.querySelectorAll('button, [role="button"]');
        buttons.forEach(btn => {
          if (!btn.getAttribute('role')) {
            btn.setAttribute('role', 'button');
          }
          if (!btn.getAttribute('tabindex')) {
            btn.setAttribute('tabindex', '0');
          }
        });

        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
          if (!link.getAttribute('role')) {
            link.setAttribute('role', 'link');
          }
        });

        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (!img.getAttribute('alt') && !img.getAttribute('aria-hidden')) {
            img.setAttribute('alt', 'Elemento decorativo');
            img.setAttribute('aria-hidden', 'true');
          }
        });
      } catch (error) {
        console.log('Error en mejora de accesibilidad:', error);
      }
    };

    improveContrast();
    
    // Ejecutar después de un pequeño delay para asegurar que el DOM esté listo
    setTimeout(enhanceAccessibility, 100);

    return () => {
      // Cleanup seguro
      const styleElement = document.getElementById('accessibility-contrast');
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  return null;
}