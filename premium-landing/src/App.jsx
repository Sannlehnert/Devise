// src/App.jsx
import React, { useState, useEffect, Suspense, lazy } from "react";
import { AnimatePresence } from "framer-motion";
import VideoTrailer from "./components/VideoTrailer";

const Navbar = lazy(() => import("./components/Navbar"));
const Hero = lazy(() => import("./components/Hero"));
const Services = lazy(() => import("./components/Services"));
const Portfolio = lazy(() => import("./components/Portfolio"));
const Process = lazy(() => import("./components/Process"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const BackgroundMotivation = lazy(() => import("./components/BackgroundMotivation"));
const InspirationalMessages = lazy(() => import("./components/InspirationalMessages"));
const ScrollIndicator = lazy(() => import("./components/ScrollIndicator"));

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030631]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#9AD4EA]/30 border-t-[#9AD4EA] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#94a3b8]">Cargando experiencia Devise...</p>
      </div>
    </div>
  );
}

export default function App() {
  // TTL para no mostrar el trailer constantemente (en ms)
  const TTL_DAYS = 30;
  const TTL_MS = TTL_DAYS * 24 * 60 * 60 * 1000;
  const STORAGE_KEY = "devise-video-seen-ts";

  const [showVideo, setShowVideo] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [componentsLoaded, setComponentsLoaded] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const force = urlParams.get("forceTrailer") === "1";
    const devForce = process.env.NODE_ENV === "development" && false;

    // lee timestamp
    let ts = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const n = Number(raw);
      if (!Number.isNaN(n)) ts = n;
    } catch (e) {
      console.warn("No se pudo leer localStorage", e);
    }

    const now = Date.now();
    const expired = !ts || (now - ts) > TTL_MS;

    if (force || devForce) {
      console.log("[App] Trailer forzado por query/dev.");
      setShowVideo(true);
    } else if (expired) {
      console.log("[App] Trailer se mostrará (no visto o expiró).");
      setShowVideo(true);
    } else {
      console.log("[App] Trailer SKIP - reciente en localStorage.");
      setShowVideo(false);
    }

    // simulamos carga de recursos
    const t = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setComponentsLoaded(true), 120);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  // cuando termina / salta -> guardamos timestamp
  const handleVideoEnd = (info = { skipped: false }) => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch (e) {
      console.warn("No se pudo guardar timestamp", e);
    }
    console.log("[App] onEnd recibida:", info);
    setShowVideo(false);
  };

  // botón público para reproducir otra vez el trailer (borra timestamp y muestra trailer)
  const handleReplay = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    // pequeña pausa para asegurar que state cambie
    setTimeout(() => setShowVideo(true), 50);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>
        {showVideo && <VideoTrailer onEnd={handleVideoEnd} />}
      </AnimatePresence>

      {!showVideo && (
        <Suspense fallback={<div className="h-2 bg-[#1C045A]" />}>
          {componentsLoaded && <BackgroundMotivation />}

          {/* Botón flotante para volver a ver intro */}
          <button
            onClick={handleReplay}
            title="Ver intro"
            className="fixed bottom-6 left-6 z-40 btn-ultra text-sm px-3 py-2"
            style={{ boxShadow: "0 6px 18px rgba(28,4,90,0.25)" }}
          >
            Ver Intro
          </button>

          <ScrollIndicator />
          <Navbar />
          <Hero />
          <Services />
          <Portfolio />
          <Process />
          <Testimonials />
          <Contact />
          <Footer />
          <InspirationalMessages />
        </Suspense>
      )}
    </div>
  );
}