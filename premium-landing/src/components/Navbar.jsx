// Navbar.jsx - Versión más minimalista
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Servicios', href: '#servicios' },
    { name: 'Proyectos', href: '#portfolio' },
    { name: 'Proceso', href: '#proceso' },
    { name: 'Testimonios', href: '#testimonios' },
  ];

  return (
    <motion.nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#0a0f1d]/80 backdrop-blur-md py-3 border-b border-white/5' 
          : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <img
            src="/img/devicesinfondo.png"
            alt="Devise"
            className="h-10 object-contain"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[#94a3b8] hover:text-white transition-colors relative group"
              style={{ fontFamily: 'Aurora' }}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#9AD4EA] transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center">
          <a
            href="#contacto"
            className="minimal-button"
            style={{ fontFamily: 'Akira Expanded' }}
          >
            CONTACTAR
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 w-6 h-6 relative z-50 group"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menú mobile"
          aria-expanded={mobileMenuOpen}
        >
          <span className={`w-full h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : 'group-hover:bg-[#9AD4EA]'}`}></span>
          <span className={`w-full h-0.5 bg-white transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'group-hover:bg-[#9AD4EA]'}`}></span>
          <span className={`w-full h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : 'group-hover:bg-[#9AD4EA]'}`}></span>
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', ease: 'easeInOut' }}
              className="fixed inset-0 bg-[#0a0f1d]/95 backdrop-blur-md md:hidden flex flex-col items-center justify-center space-y-8 text-xl"
            >
              {menuItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-white text-2xl hover:text-[#9AD4EA] transition-colors"
                  style={{ fontFamily: 'Akira Expanded' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.a
                href="#contacto"
                className="minimal-button mt-8 text-lg"
                style={{ fontFamily: 'Akira Expanded' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                CONTACTAR
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}