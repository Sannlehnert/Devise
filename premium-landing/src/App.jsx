import React, { useState, useEffect, Suspense, lazy } from "react";
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes que cargan inmediatamente (críticos)
import FixHorizontalScroll from "./components/FixHorizontalScroll";
import SEOHead from "./components/SEOHead";
import AccessibilityEnhancer from "./components/AccessibilityEnhancer";
import GalaxyBackground from "./components/GalaxyBackground";
import ScrollIndicator from "./components/ScrollIndicator";
import InspirationalMessages from "./components/InspirationalMessages";

// Lazy load para componentes no críticos
const Navbar = lazy(() => import("./components/Navbar"));
const Hero = lazy(() => import("./components/Hero"));
const Services = lazy(() => import("./components/Services"));
const Portfolio = lazy(() => import("./components/Portfolio"));
const BrandCarousel = lazy(() => import("./components/BrandCarousel"));
const Process = lazy(() => import("./components/Process"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const CustomCursor = lazy(() => import("./components/CustomCursor"));
const AllProjects = lazy(() => import("./components/AllProjects"));

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#030631] to-[#0a0f1d]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#9AD4EA]/30 border-t-[#9AD4EA] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#B8C2D9] text-sm" style={{ fontFamily: 'Aurora' }}>
          Cargando experiencia Devise...
        </p>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <SEOHead />
      <AccessibilityEnhancer />
      <FixHorizontalScroll />
      <GalaxyBackground />
      <ScrollIndicator />
      <InspirationalMessages />
      
      {/* Componentes lazy con Suspense individual para mejor UX */}
      <Suspense fallback={<div className="min-h-screen bg-transparent"></div>}>
        <Navbar />
        <Hero />
      </Suspense>
      
      <Suspense fallback={<div className="h-20 bg-transparent"></div>}>
        <Services />
      </Suspense>
      
      <Suspense fallback={<div className="h-20 bg-transparent"></div>}>
        <Portfolio />
      </Suspense>
      
      <Suspense fallback={<div className="h-20 bg-transparent"></div>}>
        <BrandCarousel />
      </Suspense>
      
      <Suspense fallback={<div className="h-20 bg-transparent"></div>}>
        <Process />
      </Suspense>
      
      <Suspense fallback={<div className="h-20 bg-transparent"></div>}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<div className="h-20 bg-transparent"></div>}>
        <Contact />
      </Suspense>
      
      <Suspense fallback={<div className="h-20 bg-transparent"></div>}>
        <Footer />
      </Suspense>
      
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Precarga simplificada y segura
    const preloadCriticalResources = () => {
      const criticalResources = [
        '/img/devisebandera.jpg',
        '/img/devicesinfondo.png'
      ];

      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'image';
        document.head.appendChild(link);
      });
    };

    preloadCriticalResources();

    // Timeout de carga más corto
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <HelmetProvider>
      <Router>
        <div className="relative min-h-screen cosmic-bg">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/proyectos" element={
              <Suspense fallback={<LoadingSpinner />}>
                <AllProjects />
              </Suspense>
            } />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}