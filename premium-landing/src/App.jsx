import React, { useState, useEffect, Suspense, lazy } from "react";
import { AnimatePresence } from "framer-motion";
import VideoTrailer from "./components/VideoTrailer";

// Lazy load (mantengo tu estructura)
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
  // Config: TTL en días — cambia si querés otro periodo
  const TTL_DAYS = 30;
  const TTL_MS = TTL_DAYS * 24 * 60 * 60 * 1000;

  const [showVideo, setShowVideo] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [componentsLoaded, setComponentsLoaded] = useState(false);

  useEffect(() => {
    // Query param para forzar (útil en pruebas): ?forceTrailer=1
    const urlParams = new URLSearchParams(window.location.search);
    const force = urlParams.get("forceTrailer") === "1";

    // Forzar en dev (cambiar a true si querés verlo siempre en dev)
    const devForce = process.env.NODE_ENV === "development" && false;

    // Leer timestamp guardado
    const ts = localStorage.getItem("devise-video-seen-ts");
    let seenTimestamp = null;
    if (ts) {
      const n = Number(ts);
      if (!Number.isNaN(n)) seenTimestamp = n;
    }

    const now = Date.now();
    const isExpired = !seenTimestamp || (now - seenTimestamp) > TTL_MS;

    if (force || devForce) {
      console.log("[App] Trailer forced (force/devForce):", { force, devForce });
      setShowVideo(true);
    } else if (isExpired) {
      // si no hay timestamp o expiró, mostramos el trailer
      console.log("[App] Trailer will show (not seen or expired).");
      setShowVideo(true);
    } else {
      // ya lo vio y no expiró -> no lo mostramos
      console.log("[App] Trailer skipped (recently seen).");
      setShowVideo(false);
    }

    // Simular splash / cargar componentes lazy
    const t = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setComponentsLoaded(true), 150);
    }, 700);

    return () => clearTimeout(t);
  }, []);

  // handleVideoEnd recibe un objeto: { skipped: boolean }
  const handleVideoEnd = (info = { skipped: false }) => {
    try {
      // Guardamos timestamp para no repetir el trailer por TTL_MS
      localStorage.setItem("devise-video-seen-ts", String(Date.now()));
      console.log("[App] guardado timestamp (video visto). info:", info);
    } catch (e) {
      console.error("[App] error guardando timestamp", e);
    }
    setShowVideo(false);
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