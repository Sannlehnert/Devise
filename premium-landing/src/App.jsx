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
import BackgroundMotivation from './components/BackgroundMotivation';
import InspirationalMessages from './components/InspirationalMessages';
import ScrollIndicator from './components/ScrollIndicator';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [showVideo, setShowVideo] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si el usuario ya vio el video
    const hasSeenVideo = localStorage.getItem('devise-video-seen');
    
    if (hasSeenVideo) {
      setShowVideo(false);
    }

    // Simular carga de recursos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnd = () => {
    localStorage.setItem('devise-video-seen', 'true');
    setShowVideo(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030631]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#9AD4EA]/30 border-t-[#9AD4EA] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#94a3b8]" style={{ fontFamily: 'Aurora' }}>Cargando experiencia Devise...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <BackgroundMotivation />
      <ScrollIndicator />
      
      <AnimatePresence>
        {showVideo && <VideoTrailer onEnd={handleVideoEnd} />}
      </AnimatePresence>
      
      {!showVideo && (
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
    </div>
  );
}

export default App;