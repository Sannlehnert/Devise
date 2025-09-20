import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function VideoTrailer({ onEnd }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    console.log("[VideoTrailer] mounted");
    const v = videoRef.current;
    if (!v) return;

    const tryAutoplay = () => {
      // autoplay solo intentado si está muted (está)
      const p = v.play();
      if (p !== undefined) {
        p.then(() => {
          console.log("[VideoTrailer] autoplay succeeded");
          setIsPlaying(true);
          setShowPlayButton(false);
        }).catch((err) => {
          console.warn("[VideoTrailer] autoplay prevented:", err);
          setShowPlayButton(true);
        });
      } else {
        // viejo navegador - mostramos botón
        setShowPlayButton(true);
      }
    };

    const onCanPlay = () => {
      console.log("[VideoTrailer] canplay -> intentar autoplay");
      tryAutoplay();
    };

    const onEnded = () => {
      console.log("[VideoTrailer] ended -> pasando al sitio");
      setIsPlaying(false);
      onEnd && onEnd({ skipped: false });
    };

    const onErr = (e) => {
      console.error("[VideoTrailer] error loading video", e);
      setVideoError(true);
      // fallback: saltar al sitio
      setTimeout(() => onEnd && onEnd({ skipped: true }), 700);
    };

    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("ended", onEnded);
    v.addEventListener("error", onErr);

    // force load
    try { v.load(); } catch (e) {}

    // si ya está listo
    if (v.readyState >= 3) tryAutoplay();

    // safety timeout: si no arranca en 8s saltar
    const t = setTimeout(() => {
      if (!isPlaying && !showPlayButton) {
        console.log("[VideoTrailer] timeout autoplay -> mostrar play");
        setShowPlayButton(true);
      }
    }, 8000);

    return () => {
      console.log("[VideoTrailer] unmount");
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("error", onErr);
      clearTimeout(t);
    };
  }, [onEnd, isPlaying, showPlayButton]);

  const handlePlayClick = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      await v.play();
      setIsPlaying(true);
      setShowPlayButton(false);
      console.log("[VideoTrailer] user play succeeded");
    } catch (err) {
      console.error("[VideoTrailer] user play failed", err);
      // fallback: pasar al sitio
      onEnd && onEnd({ skipped: true });
    }
  };

  const handleSkip = () => {
    try { videoRef.current && videoRef.current.pause(); } catch (e) {}
    console.log("[VideoTrailer] skip pressed");
    onEnd && onEnd({ skipped: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      aria-live="polite"
    >
      {/* fondo vortex / spotlight */}
      <div className="vortex-bg" aria-hidden="true"></div>
      <div className="spotlight" aria-hidden="true"></div>

      <div className="video-container w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          // no autoPlay explícito — lo intentamos en JS para controlar el flujo
        >
          <source src="/videos/trailer.mp4" type="video/mp4" />
          <source src="/videos/trailer.webm" type="video/webm" />
          Tu navegador no soporta video.
        </video>

        {/* overlay con controles */}
        <div className="video-overlay">
          {/* centro: reproducir si autoplay bloqueado */}
          {!isPlaying && showPlayButton && !videoError && (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260 }}
              onClick={handlePlayClick}
              className="btn-ultra px-8 py-3 rounded-full shadow-lg"
              aria-label="Reproducir intro"
            >
              <svg className="inline-block w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              REPRODUCIR INTRO
            </motion.button>
          )}

          {/* error */}
          {videoError && (
            <div className="bg-black/60 p-6 rounded-md ultra-glass text-center">
              <p className="mb-4">No se pudo cargar el video introductorio.</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => onEnd && onEnd({ skipped: true })} className="btn-ultra">Continuar</button>
              </div>
            </div>
          )}

          {/* skip fixed bottom-right */}
          <div className="absolute bottom-6 right-6">
            <button
              onClick={handleSkip}
              className="px-4 py-2 rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition border border-white/20"
              aria-label="Saltar intro"
            >
              Saltar intro
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}