import React, { useState, useEffect, Suspense, lazy } from "react";
import { AnimatePresence } from "framer-motion";
import VideoTrailer from "./components/VideoTrailer"; // import directo para evitar race con lazy

// Lazy load de demás componentes (opcional y recomendado)
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
  const [showVideo, setShowVideo] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [componentsLoaded, setComponentsLoaded] = useState(false);

  useEffect(() => {
    // Permite forzar el trailer via ?forceTrailer=1 (útil para testing)
    const urlParams = new URLSearchParams(window.location.search);
    const force = urlParams.get("forceTrailer") === "1";

    // En dev podés forzar cambiando devForce a true
    const devForce = process.env.NODE_ENV === "development" && false;

    const seen = localStorage.getItem("devise-video-seen");

    if (force || devForce) {
      console.log("[App] force showVideo:", { force, devForce });
      setShowVideo(true);
    } else if (seen === "true") {
      setShowVideo(false);
    } else {
      setShowVideo(true);
    }

    // simulacro de splash
    const t = setTimeout(() => {
      setIsLoading(false);
      // cargar componentes lazy después de pequeño delay
      setTimeout(() => setComponentsLoaded(true), 150);
    }, 700);

    return () => clearTimeout(t);
  }, []);

  const handleVideoEnd = () => {
    try { localStorage.setItem("devise-video-seen", "true"); } catch (e) {}
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

