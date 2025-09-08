import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import VideoTrailer from './components/VideoTrailer';
import InspirationalMessages from './components/InspirationalMessages';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [showVideo, setShowVideo] = useState(true);
  const [hasInteraction, setHasInteraction] = useState(false);

  useEffect(() => {
    // Para navegadores que bloquean autoplay, esperar interacción del usuario
    const handleInteraction = () => {
      setHasInteraction(true);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  const handleVideoEnd = () => {
    setShowVideo(false);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {showVideo && hasInteraction && <VideoTrailer onEnd={handleVideoEnd} />}
      </AnimatePresence>
      
      {(!showVideo || !hasInteraction) && (
        <>
          <Navbar />
          <Hero />
          <Services />
          <Portfolio />
          <Process />
          <Testimonials />
          <Contact />
          <Footer />
          <InspirationalMessages />
        </>
      )}

      {/* Overlay para invitar a la interacción en móviles */}
      {showVideo && !hasInteraction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="text-center p-6 max-w-md mx-4 bg-[#0f172a] rounded-2xl border border-accent/30">
            <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Akira Expanded' }}>
              BIENVENIDO A DEVISE
            </h3>
            <p className="text-subtle mb-6" style={{ fontFamily: 'Aurora' }}>
              Toca en cualquier lugar para comenzar la experiencia
            </p>
            <button 
              onClick={() => setHasInteraction(true)}
              className="px-6 py-3 bg-accent text-white rounded-lg font-semibold"
              style={{ fontFamily: 'Akira Expanded' }}
            >
              INICIAR EXPERIENCIA
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;