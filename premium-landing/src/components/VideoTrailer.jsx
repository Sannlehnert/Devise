import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function VideoTrailer({ onEnd }) {
  const videoRef = useRef(null);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video && !isSkipped) {
      const playVideo = async () => {
        try {
          await video.play();
        } catch (error) {
          console.log("Autoplay prevented:", error);
          // Si el autoplay falla, mostrar un botón de play
        }
      };
      
      playVideo();
      
      const handleEnded = () => {
        onEnd();
      };
      
      video.addEventListener('ended', handleEnded);
      
      return () => {
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, [onEnd, isSkipped]);

  const handleSkip = () => {
    setIsSkipped(true);
    onEnd();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        playsInline
        onEnded={onEnd}
        preload="auto"
      >
        <source src="/videos/trailer.mp4" type="video/mp4" />
        <source src="/videos/trailer.webm" type="video/webm" />
        Tu navegador no soporta el video.
      </video>
      
      <button
        onClick={handleSkip}
        className="absolute bottom-10 right-10 bg-white/20 text-white px-6 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all z-50"
        style={{ fontFamily: 'Akira Expanded' }}
      >
        Saltar intro
      </button>

      {/* Fallback si el video no se carga */}
      {isSkipped && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <p className="text-white text-lg">El video no está disponible</p>
        </div>
      )}
    </motion.div>
  );
}