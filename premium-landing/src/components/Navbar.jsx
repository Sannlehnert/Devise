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
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0a0f1d]/90 backdrop-blur-sm py-3 shadow-lg' : 'bg-transparent py-5'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
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
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#9AD4EA] transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center">
          <a
            href="#contacto"
            className="ml-6 px-5 py-2.5 bg-gradient-to-r from-[#1C045A] to-[#584485] hover:from-[#584485] hover:to-[#1C045A] rounded-lg font-semibold transition-colors text-white"
            style={{ fontFamily: 'Akira Expanded' }}
          >
            CONTACTAR
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 w-6 h-6 relative z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menú mobile"
          aria-expanded={mobileMenuOpen}
        >
          <span className={`w-full h-0.5 bg-white transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-full h-0.5 bg-white transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-full h-0.5 bg-white transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
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
                  className="text-white text-2xl"
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
                className="px-8 py-3 bg-gradient-to-r from-[#1C045A] to-[#584485] rounded-lg font-semibold mt-8 text-lg text-white"
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