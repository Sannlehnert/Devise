import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      video.loop = true;
      video.muted = true;
      video.play().catch(console.log);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    return () => video.removeEventListener('loadeddata', handleLoadedData);
  }, []);

  return (
    <header className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ paddingTop: '80px' }}>
      {/* Bandera flameante de fondo con animación mejorada */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full flag-flame"
          style={{
            backgroundImage: "url('/img/devisebandera.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.12,
            transform: 'scale(1.1)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#030631]/95 via-[#0a0f1d]/90 to-[#030631]/95"></div>
        
        {/* Efecto de partículas sutil */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#9AD4EA] rounded-full animate-pulse"
              style={{
                top: `${20 + i * 10}%`,
                left: `${10 + i * 12}%`,
                animationDelay: `${i * 0.5}s`,
                opacity: 0.4
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Texto Principal - Ultra Impactante */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="inline-block mb-6"
            >
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6 tracking-tighter"
              style={{ fontFamily: 'Akira Expanded' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <span className="block text-white/90">ELEVA TU</span>
              <span className="block bg-gradient-to-r from-[#9AD4EA] via-[#7AA8EE] to-[#9AD4EA] bg-clip-text text-transparent bg-size-200 animate-gradient">
                MARCA
              </span>
              <span className="block text-white/90">AL SIGUIENTE</span>
              <span className="block bg-gradient-to-r from-[#584485] via-[#8A6BC9] to-[#584485] bg-clip-text text-transparent bg-size-200 animate-gradient">
                NIVEL
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-[#B8C2D9] mb-10 max-w-3xl leading-relaxed"
              style={{ fontFamily: 'Aurora', fontWeight: 300 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Transformamos visiones en <span className="text-[#9AD4EA]">experiencias digitales extraordinarias</span>. 
              Donde la creatividad se encuentra con la estrategia para generar impacto real.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <a 
                href="#contacto" 
                className="group relative px-12 py-5 bg-gradient-to-r from-[#1C045A] to-[#584485] hover:from-[#584485] hover:to-[#1C045A] text-white font-semibold rounded-2xl transition-all duration-500 hover:scale-105 shadow-2xl shadow-[#1C045A]/40 hover:shadow-[#584485]/50 overflow-hidden"
                style={{ fontFamily: 'Akira Expanded', letterSpacing: '0.05em' }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  COMENZAR PROYECTO
                  <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              
              <a 
                href="#portfolio" 
                className="group relative px-12 py-5 border-2 border-white/20 hover:border-[#9AD4EA] text-white font-semibold rounded-2xl transition-all duration-500 hover:scale-105 backdrop-blur-sm bg-white/5 hover:bg-[#9AD4EA]/10"
                style={{ fontFamily: 'Akira Expanded', letterSpacing: '0.05em' }}
              >
                <span className="group-hover:text-[#9AD4EA] transition-colors duration-300 flex items-center justify-center">
                  VER PROYECTOS
                  <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                  </svg>
                </span>
              </a>
            </motion.div>

          </motion.div>
          
          {/* Video Rectangular Cinematográfico */}
          <motion.div 
            className="flex-1 flex justify-center w-full max-w-2xl"
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <div className="relative w-full aspect-video rounded-3xl bg-gradient-to-br from-[#1C045A] via-[#584485] to-[#9AD4EA] p-[3px] shadow-2xl shadow-[#1C045A]/50 hover:shadow-[#9AD4EA]/30 transition-all duration-500 group">
              <div className="w-full h-full rounded-2xl bg-[#030631] flex items-center justify-center overflow-hidden relative">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover scale-105"
                  muted
                  playsInline
                  preload="auto"
                  poster="/img/video-poster.jpg"
                >
                  <source src="/videos/trailer.mp4" type="video/mp4" />
                  <source src="/videos/trailer.webm" type="video/webm" />
                </video>
                
                {!isVideoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1C045A]/20 to-[#584485]/20">
                    <div className="text-4xl text-[#9AD4EA] animate-pulse" style={{ fontFamily: 'Constantine' }}>
                      ΔE∨ASE
                    </div>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#030631]/60 via-transparent to-transparent"></div>
                
              </div>
              
              {/* Efecto de brillo perimetral */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1C045A]/20 via-[#584485]/15 to-[#9AD4EA]/10 animate-pulse pointer-events-none"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}