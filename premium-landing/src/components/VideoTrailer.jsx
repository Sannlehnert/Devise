import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function VideoTrailer({ onEnd }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    console.log("[VideoTrailer] mounted");
    const v = videoRef.current;
    if (!v) {
      console.warn("[VideoTrailer] no videoRef");
      return;
    }

    const handleCanPlay = () => {
      console.log("[VideoTrailer] canplay fired, trying autoplay...");
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("[VideoTrailer] autoplay succeeded");
            setIsPlaying(true);
            setShowPlayButton(false);
          })
          .catch((err) => {
            console.warn("[VideoTrailer] autoplay prevented:", err);
            setShowPlayButton(true);
          });
      }
    };

    const handleEnded = () => {
      console.log("[VideoTrailer] ended -> onEnd({skipped:false})");
      setIsPlaying(false);
      onEnd && onEnd({ skipped: false });
    };

    const handleError = (e) => {
      console.error("[VideoTrailer] error loading video", e);
      setVideoError(true);
      // fallback: saltar al sitio
      setTimeout(() => onEnd && onEnd({ skipped: true }), 800);
    };

    v.addEventListener("canplay", handleCanPlay);
    v.addEventListener("ended", handleEnded);
    v.addEventListener("error", handleError);

    // Forzar fetch
    try { v.load(); } catch (e) {}

    if (v.readyState >= 3) handleCanPlay();

    return () => {
      console.log("[VideoTrailer] unmount");
      v.removeEventListener("canplay", handleCanPlay);
      v.removeEventListener("ended", handleEnded);
      v.removeEventListener("error", handleError);
    };
  }, [onEnd]);

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
      onEnd && onEnd({ skipped: true });
    }
  };

  const handleSkip = () => {
    try { videoRef.current && videoRef.current.pause(); } catch (e) {}
    console.log("[VideoTrailer] skip -> onEnd({skipped:true})");
    onEnd && onEnd({ skipped: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      <video
        id="devise-debug-video"
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/trailer.mp4" type="video/mp4" />
        <source src="/videos/trailer.webm" type="video/webm" />
        Tu navegador no soporta video.
      </video>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {showPlayButton && !isPlaying && !videoError && (
          <div className="pointer-events-auto">
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={handlePlayClick}
              className="bg-[#1C045A] text-white px-8 py-3 rounded-full flex items-center gap-3 shadow-lg hover:bg-[#4b3a9a]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="font-semibold">REPRODUCIR INTRO</span>
            </motion.button>
          </div>
        )}

        {videoError && (
          <div className="pointer-events-auto text-center bg-black/60 p-6 rounded-md">
            <p className="text-white mb-3">No se pudo cargar el video.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => onEnd && onEnd({ skipped: true })} className="px-4 py-2 bg-[#1C045A] rounded text-white">Continuar</button>
            </div>
          </div>
        )}

        <div className="absolute bottom-6 right-6 pointer-events-auto">
          <button
            onClick={handleSkip}
            className="px-4 py-2 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition"
          >
            Saltar intro
          </button>
        </div>

        {isDev && (
          <div className="absolute bottom-6 left-6 pointer-events-auto">
            <button
              onClick={() => {
                try {
                  localStorage.removeItem("devise-video-seen-ts");
                  alert("devise-video-seen-ts borrado. Refresca la página para ver el trailer otra vez.");
                } catch (e) { console.error(e); }
              }}
              className="px-3 py-1 rounded bg-white/10 text-white text-sm border border-white/10"
            >
              Reset trailer (dev)
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}