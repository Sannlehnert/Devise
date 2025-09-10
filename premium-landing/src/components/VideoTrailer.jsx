import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function VideoTrailer({ onEnd }) {
  const videoRef = useRef(null);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      console.log("Video puede reproducirse");

      // Intentar reproducción automática en todos los dispositivos
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Reproducción automática exitosa");
            setShowPlayButton(false);
            setIsPlaying(true);
          })
          .catch(error => {
            console.log("Autoplay prevenido:", error);
            setShowPlayButton(true);
          });
      }
    };

    const handleError = () => {
      console.error("Error al cargar el video");
      setVideoError(true);
      // Si hay error, saltar directamente al contenido después de un breve tiempo
      setTimeout(() => onEnd(), 1500);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', onEnd);
    video.addEventListener('error', handleError);

    // Forzar la carga del video
    video.load();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', onEnd);
      video.removeEventListener('error', handleError);
    };
  }, [onEnd]);

  const handlePlayClick = () => {
    const video = videoRef.current;
    if (video) {
      video.play()
        .then(() => {
          setShowPlayButton(false);
          setIsPlaying(true);
        })
        .catch(error => {
          console.error("Error al reproducir:", error);
          // Si falla, saltar directamente al contenido
          onEnd();
        });
    }
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onEnd();
  };

  // Si el video tarda más de 8 segundos en cargar, saltar al contenido
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isPlaying) {
        console.log("Tiempo de carga excedido, saltando...");
        onEnd();
      }
    }, 8000);

    return () => clearTimeout(timeout);
  }, [isPlaying, onEnd]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        autoPlay
        playsInline
        preload="auto"
      >
        <source src="/videos/trailer.mp4" type="video/mp4" />
        <source src="/videos/trailer.webm" type="video/webm" />
        Tu navegador no soporta el video.
      </video>

      {/* Overlay para botones */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center">
        {showPlayButton && !isPlaying && !videoError && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="absolute bg-[#1C045A] text-white px-8 py-4 rounded-full hover:bg-[#584485] transition-all group flex items-center gap-2"
            onClick={handlePlayClick}
            style={{ fontFamily: 'Akira Expanded' }}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            REPRODUCIR INTRO
          </motion.button>
        )}

        {videoError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute text-center text-white p-6 bg-black/50 rounded-lg"
          >
            <p className="mb-4">No se pudo cargar el video introductorio</p>
            <button
              onClick={onEnd}
              className="px-6 py-2 bg-[#1C045A] rounded-full hover:bg-[#584485] transition-colors"
            >
              Continuar al sitio
            </button>
          </motion.div>
        )}

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          onClick={handleSkip}
          className="absolute bottom-10 right-10 bg-white/10 text-white px-6 py-2 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all border border-white/20"
          style={{ fontFamily: 'Aurora' }}
        >
          Saltar intro
        </motion.button>
      </div>
    </motion.div>
  );
}