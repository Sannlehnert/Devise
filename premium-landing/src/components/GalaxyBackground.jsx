import React, { useRef, useEffect, useState } from 'react';

export default function GalaxyBackground() {
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => window.innerWidth <= 768;
    setIsMobile(checkMobile());
    
    const handleResize = () => {
      setIsMobile(checkMobile());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Configuración optimizada para rendimiento
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();
    
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setCanvasSize, 250);
    };

    window.addEventListener('resize', handleResize);

    // Sistema estelar optimizado
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.1;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.color = `hsl(${Math.random() * 30 + 250}, 70%, ${Math.random() * 30 + 60}%)`;
        this.alpha = Math.random() * 0.4 + 0.1;
        this.pulseSpeed = Math.random() * 0.01 + 0.005;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Rebote suave en los bordes
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -0.98;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -0.98;

        this.alpha = 0.3 + Math.sin(Date.now() * this.pulseSpeed + this.pulseOffset) * 0.15;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        
        // Gradiente optimizado
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 2
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Núcleo de la estrella
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Número de partículas ajustado por dispositivo
    const particles = [];
    const particleCount = isMobile ? 40 : 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Star());
    }

    // Nebulosas optimizadas
    const nebulae = [
      { 
        x: canvas.width * 0.2, 
        y: canvas.height * 0.3, 
        radius: canvas.width * 0.3, 
        color: '#1C045A',
        alpha: 0.15
      },
      { 
        x: canvas.width * 0.7, 
        y: canvas.height * 0.6, 
        radius: canvas.width * 0.25, 
        color: '#584485',
        alpha: 0.12
      },
      { 
        x: canvas.width * 0.4, 
        y: canvas.height * 0.8, 
        radius: canvas.width * 0.15, 
        color: '#9AD4EA',
        alpha: 0.1
      }
    ];

    const animate = () => {
      // Limpiar canvas con opacidad para efecto de estela
      ctx.fillStyle = 'rgba(3, 6, 49, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dibujar nebulosas
      nebulae.forEach(nebula => {
        const gradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0,
          nebula.x, nebula.y, nebula.radius
        );
        gradient.addColorStop(0, `${nebula.color}${Math.floor(nebula.alpha * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Actualizar y dibujar partículas
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] pointer-events-none"
      style={{ 
        background: 'linear-gradient(135deg, #030631 0%, #0a0f1d 50%, #030631 100%)'
      }}
      aria-hidden="true"
    />
  );
}