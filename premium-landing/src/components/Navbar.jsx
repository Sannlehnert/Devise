import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Más sensible al scroll para mejor feedback visual
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
      
      // Detectar sección activa
      const sections = ['home', 'servicios', 'portfolio', 'proceso', 'testimonios', 'contacto'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevenir scroll del body cuando el menú mobile está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleSmoothScroll = (href, id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    
    setTimeout(() => {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const menuItems = [
    { name: 'Servicios', href: '#servicios', id: 'servicios' },
    { name: 'Proyectos', href: '#portfolio', id: 'portfolio' },
    { name: 'Proceso', href: '#proceso', id: 'proceso' },
    { name: 'Testimonios', href: '#testimonios', id: 'testimonios' },
    { name: 'Plantillas', href: '#plantillas', id: 'plantillas' },
  ];

  return (
    <motion.nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#0a0f1d]/95 backdrop-blur-xl py-3 shadow-2xl shadow-black/30 border-b border-white/10' 
          : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo con mejor transición */}
        <motion.div 
          className="flex items-center group"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <a 
            href="#home"
            onClick={() => handleSmoothScroll('#home', 'home')}
            className="flex items-center"
            aria-label="Ir al inicio"
            role="link"
          >
            <motion.img
              src="/img/devicesinfondo.png"
              alt="Devise - Agencia de Marketing y Diseño"
              className={`object-contain transition-all duration-300 ${
                isScrolled ? 'h-8' : 'h-10'
              } group-hover:scale-110`}
              whileHover={{ scale: 1.1 }}
            />
          </a>
        </motion.div>

        {/* Desktop Menu - Mejorado */}
        <div className="hidden md:flex items-center space-x-2" role="menubar">
          {menuItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={() => handleSmoothScroll(item.href, item.id)}
              className={`relative px-4 py-2 rounded-xl transition-all duration-300 ${
                activeSection === item.id 
                  ? 'text-[#9AD4EA] bg-gradient-to-r from-[#1C045A]/20 to-[#584485]/20' 
                  : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
              } border border-transparent hover:border-white/10`}
              style={{ fontFamily: 'Aurora', fontSize: '0.95rem' }}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              role="menuitem"
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              {item.name}
              {activeSection === item.id && (
                <motion.div 
                  className="absolute inset-0 border border-[#9AD4EA]/30 rounded-xl bg-gradient-to-r from-[#9AD4EA]/10 to-transparent"
                  layoutId="activeSectionBg"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  aria-hidden="true"
                />
              )}
            </motion.a>
          ))}
        </div>

        {/* CTA Button - Mejorado */}
        <div className="hidden md:flex items-center">
          <motion.a
            href="#contacto"
            onClick={() => handleSmoothScroll('#contacto', 'contacto')}
            className="px-6 py-3 bg-gradient-to-r from-[#1C045A] to-[#584485] hover:from-[#584485] hover:to-[#1C045A] text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#1C045A]/30 border border-[#9AD4EA]/20"
            style={{ fontFamily: 'Akira Expanded', fontSize: '0.9rem' }}
            whileHover={{ 
              scale: 1.05,
              y: -1
            }}
            whileTap={{ scale: 0.95 }}
            role="button"
            aria-label="Contactar"
          >
            CONTACTAR
          </motion.a>
        </div>

        {/* Mobile Menu Button - Mejorado */}
        <motion.button
          className="md:hidden flex flex-col gap-1.5 w-10 h-10 relative z-[9999] group bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
          whileTap={{ scale: 0.95 }}
          role="button"
        >
          <span className={`w-5 h-0.5 bg-white transition-all duration-300 mx-auto ${
            mobileMenuOpen ? 'rotate-45 translate-y-1.5' : 'group-hover:bg-[#9AD4EA]'
          }`}></span>
          <span className={`w-5 h-0.5 bg-white transition-all duration-300 mx-auto ${
            mobileMenuOpen ? 'opacity-0' : 'group-hover:bg-[#9AD4EA]'
          }`}></span>
          <span className={`w-5 h-0.5 bg-white transition-all duration-300 mx-auto ${
            mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'group-hover:bg-[#9AD4EA]'
          }`}></span>
        </motion.button>

        {/* Mobile Menu - MEJORADO Y ESTABLE */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Overlay de fondo */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              
              {/* Menú mobile */}
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ 
                  type: 'spring', 
                  damping: 30,
                  stiffness: 300
                }}
                className="fixed top-0 right-0 h-full w-80 max-w-full bg-[#0a0f1d]/95 backdrop-blur-2xl md:hidden flex flex-col z-[9999] border-l border-white/10 shadow-2xl"
                role="menu"
                aria-label="Menú mobile"
                id="mobile-menu"
              >
                {/* Header del menú mobile */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <img
                    src="/img/devicesinfondo.png"
                    alt="Devise"
                    className="h-8 object-contain opacity-90"
                  />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/10"
                    aria-label="Cerrar menú"
                  >
                    <span className="text-xl">×</span>
                  </button>
                </div>

                {/* Menu Items con scroll si es necesario */}
                <div className="flex-1 overflow-y-auto py-6">
                  <div className="space-y-2 px-6">
                    {menuItems.map((item, i) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        onClick={() => handleSmoothScroll(item.href, item.id)}
                        className={`block w-full text-left py-4 px-4 rounded-xl transition-all duration-300 ${
                          activeSection === item.id 
                            ? 'text-[#9AD4EA] bg-gradient-to-r from-[#1C045A]/30 to-[#584485]/30 border border-[#9AD4EA]/20' 
                            : 'text-white hover:text-[#9AD4EA] hover:bg-white/5 border border-transparent'
                        }`}
                        style={{ fontFamily: 'Akira Expanded' }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: i * 0.1,
                          type: "spring",
                          stiffness: 300
                        }}
                        role="menuitem"
                        aria-current={activeSection === item.id ? 'page' : undefined}
                      >
                        {item.name}
                      </motion.a>
                    ))}
                  </div>

                  {/* CTA Mobile */}
                  <motion.div
                    className="px-6 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <a
                      href="#contacto"
                      onClick={() => handleSmoothScroll('#contacto', 'contacto')}
                      className="block w-full py-4 px-6 bg-gradient-to-r from-[#1C045A] to-[#584485] hover:from-[#584485] hover:to-[#1C045A] text-white font-semibold rounded-xl text-center transition-all duration-300 hover:scale-105 border border-[#9AD4EA]/20"
                      style={{ fontFamily: 'Akira Expanded' }}
                      role="button"
                    >
                      CONTACTAR
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}