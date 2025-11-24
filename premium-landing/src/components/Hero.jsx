import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Solo importamos motion, no AnimatePresence

const videoTrailers = [
  {
    src: '/videos/trailer.mp4',
    title: 'Branding Experience',
    color: 'from-[#1C045A] to-[#3A1C7A]'
  },
  {
    src: '/videos/trailer-2.mp4',
    title: 'Motion Design',
    color: 'from-[#584485] to-[#7A5CA8]'
  },
  {
    src: '/videos/trailer-3.mp4',
    title: 'Digital Campaigns',
    color: 'from-[#9AD4EA] to-[#7AA8EE]'
  }
];

export default function Hero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);
  const videoRef = useRef(null);

  // Efecto para cambiar automáticamente los videos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex(prev => (prev + 1) % videoTrailers.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Cargar y reproducir el video actual
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      video.loop = true;
      video.muted = true;
      video.play().catch(() => {
        // Autoplay bloqueado, no hacemos nada
      });
    };

    video.addEventListener('loadeddata', handleLoadedData);

    // Reiniciar carga cuando cambia el video
    setIsVideoLoaded(false);
    video.load();

    return () => video.removeEventListener('loadeddata', handleLoadedData);
  }, [currentVideoIndex]);

  const handleSmoothScroll = (href) => {
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ paddingTop: '80px' }}>
      {/* Fondo */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/img/devisebandera.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#030631]/95 via-[#0a0f1d]/90 to-[#030631]/95"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Texto Principal */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6 tracking-tighter"
              style={{ fontFamily: 'Akira Expanded' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <span className="block text-white/95">ELEVA TU</span>
              <span className="block bg-gradient-to-r from-[#9AD4EA] via-[#7AA8EE] to-[#9AD4EA] bg-clip-text text-transparent bg-size-200 animate-gradient">
                MARCA
              </span>
              <span className="block text-white/95">AL SIGUIENTE</span>
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
              Transformamos visiones en <span className="text-[#9AD4EA] font-medium">experiencias digitales extraordinarias</span>.
              Donde la creatividad se encuentra con la estrategia para generar impacto real.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <motion.button
                onClick={() => handleSmoothScroll('#contacto')}
                onHoverStart={() => setIsHoveringCTA(true)}
                onHoverEnd={() => setIsHoveringCTA(false)}
                className="group relative px-12 py-5 bg-gradient-to-r from-[#1C045A] to-[#584485] hover:from-[#584485] hover:to-[#1C045A] text-white font-semibold rounded-2xl transition-all duration-500 shadow-2xl shadow-[#1C045A]/40 hover:shadow-[#584485]/50 overflow-hidden"
                style={{ fontFamily: 'Akira Expanded', letterSpacing: '0.05em' }}
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
                role="button"
                aria-label="Comenzar proyecto"
              >
                <span className="relative z-10 flex items-center justify-center">
                  COMENZAR PROYECTO
                  <motion.svg 
                    className="w-5 h-5 ml-3" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    animate={{ x: isHoveringCTA ? 5 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </motion.svg>
                </span>
              </motion.button>

              <motion.button
                onClick={() => handleSmoothScroll('#portfolio')}
                className="group relative px-12 py-5 border-2 border-white/20 hover:border-[#9AD4EA] text-white font-semibold rounded-2xl transition-all duration-500 backdrop-blur-sm bg-white/5 hover:bg-[#9AD4EA]/10"
                style={{ fontFamily: 'Akira Expanded', letterSpacing: '0.05em' }}
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
                role="button"
                aria-label="Ver portfolio"
              >
                <span className="group-hover:text-[#9AD4EA] transition-colors duration-300 flex items-center justify-center">
                  VER PORTFOLIO
                  <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Carrusel de Videos */}
          <motion.div
            className="flex-1 flex justify-center w-full max-w-2xl"
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <div className="relative w-full aspect-video rounded-3xl bg-gradient-to-br from-[#1C045A] via-[#584485] to-[#9AD4EA] p-[2px] shadow-2xl shadow-[#1C045A]/30 hover:shadow-[#9AD4EA]/20 transition-all duration-500 group">
              <div className="w-full h-full rounded-2xl bg-[#030631] flex items-center justify-center overflow-hidden relative">
                <video
                  key={currentVideoIndex}
                  ref={videoRef}
                  className="w-full h-full object-cover scale-105"
                  muted
                  playsInline
                  preload="metadata"
                  poster="/img/video-poster.jpg"
                  aria-label={`Video demostrativo: ${videoTrailers[currentVideoIndex].title}`}
                >
                  <source src={videoTrailers[currentVideoIndex].src} type="video/mp4" />
                  Tu navegador no soporta el elemento video.
                </video>

                {!isVideoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1C045A]/20 to-[#584485]/20">
                    <motion.div 
                      className="text-4xl text-[#9AD4EA]"
                      style={{ fontFamily: 'Constantine' }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      DEVISE
                    </motion.div>
                  </div>
                )}

                {/* Overlay sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030631]/40 via-transparent to-transparent"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}