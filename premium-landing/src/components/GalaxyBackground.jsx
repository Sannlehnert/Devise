import React, { useRef, useEffect, useState } from 'react';

export default function GalaxyBackground() {
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

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
    let animationId;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Sistema estelar premium
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.color = `hsl(${Math.random() * 30 + 250}, 70%, ${Math.random() * 30 + 60}%)`;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        this.alpha = 0.3 + Math.sin(Date.now() * this.pulseSpeed + this.pulseOffset) * 0.2;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    const particles = [];
    const particleCount = isMobile ? 50 : 150;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Star());
    }

    const nebulae = [
      { x: canvas.width * 0.2, y: canvas.height * 0.3, radius: canvas.width * 0.4, color: '#1C045A' },
      { x: canvas.width * 0.7, y: canvas.height * 0.6, radius: canvas.width * 0.3, color: '#584485' },
      { x: canvas.width * 0.4, y: canvas.height * 0.8, radius: canvas.width * 0.2, color: '#9AD4EA' }
    ];

    const animate = () => {
      ctx.fillStyle = 'rgba(3, 6, 49, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nebulae.forEach(nebula => {
        const gradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0,
          nebula.x, nebula.y, nebula.radius
        );
        gradient.addColorStop(0, `${nebula.color}30`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] pointer-events-none"
      style={{ 
        background: 'linear-gradient(135deg, #030631 0%, #0a0f1d 50%, #030631 100%)'
      }}
    />
  );
}