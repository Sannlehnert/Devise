import React, { useState, useEffect, Suspense, lazy } from "react";
import { HelmetProvider } from 'react-helmet-async';

// Lazy load components
const Navbar = lazy(() => import("./components/Navbar"));
const Hero = lazy(() => import("./components/Hero"));
const Services = lazy(() => import("./components/Services"));
const Portfolio = lazy(() => import("./components/Portfolio"));
const BrandCarousel = lazy(() => import("./components/BrandCarousel"));
const Process = lazy(() => import("./components/Process"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const GalaxyBackground = lazy(() => import("./components/GalaxyBackground"));
const ScrollIndicator = lazy(() => import("./components/ScrollIndicator"));
const InspirationalMessages = lazy(() => import("./components/InspirationalMessages"));
const CustomCursor = lazy(() => import("./components/CustomCursor"));
const SEOHead = lazy(() => import("./components/SEOHead"));

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#030631] to-[#0a0f1d]">
      <div className="text-center">
        <div className="w-20 h-20 border-4 border-[#9AD4EA]/30 border-t-[#9AD4EA] rounded-full animate-spin mx-auto mb-6"></div>
        <p className="text-[#B8C2D9] text-lg" style={{ fontFamily: 'Aurora' }}>Inicializando experiencia Devise...</p>
      </div>
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <HelmetProvider>
      <div className="relative min-h-screen cosmic-bg">
        <Suspense fallback={<LoadingSpinner />}>
          <SEOHead />
          <GalaxyBackground />
          <CustomCursor />
          <ScrollIndicator />
          <Navbar />
          <Hero />
          <Services />
          <Portfolio />
          <BrandCarousel />
          <Process />
          <Testimonials />
          <Contact />
          <Footer />
          <InspirationalMessages />
        </Suspense>
      </div>
    </HelmetProvider>
  );
}