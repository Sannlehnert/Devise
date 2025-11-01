import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Servicios', href: '#servicios', id: 'servicios' },
    { name: 'Proyectos', href: '#portfolio', id: 'portfolio' },
    { name: 'Proceso', href: '#proceso', id: 'proceso' },
    { name: 'Testimonios', href: '#testimonios', id: 'testimonios' },
  ];

  return (
    <motion.nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-[#0a0f1d]/95 backdrop-blur-xl py-3 border-b border-white/10'
          : 'bg-transparent py-6'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center group"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <img
            src="/img/devicesinfondo.png"
            alt="Devise"
            className="h-10 object-contain transition-transform group-hover:scale-110"
          />
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${activeSection === item.id
                  ? 'text-[#9AD4EA] bg-white/5'
                  : 'text-[#94a3b8] hover:text-white'
                }`}
              style={{ fontFamily: 'Aurora' }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
              {activeSection === item.id && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9AD4EA]"
                  layoutId="activeSection"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <motion.a
            href="#contacto"
            className="px-6 py-3 bg-gradient-to-r from-[#1C045A] to-[#584485] text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#1C045A]/30"
            style={{ fontFamily: 'Akira Expanded' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            CONTACTAR
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden flex flex-col gap-1.5 w-8 h-8 relative z-50 group"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menú mobile"
          aria-expanded={mobileMenuOpen}
          whileTap={{ scale: 0.9 }}
        >
          <span className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : 'group-hover:bg-[#9AD4EA]'
            }`}></span>
          <span className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'group-hover:bg-[#9AD4EA]'
            }`}></span>
          <span className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : 'group-hover:bg-[#9AD4EA]'
            }`}></span>
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', ease: 'easeInOut' }}
              className="fixed inset-0 bg-[#0a0f1d]/98 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center space-y-8 text-2xl"
            >
              {menuItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-[#9AD4EA] transition-colors py-4"
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
                className="mt-8 px-8 py-4 bg-gradient-to-r from-[#1C045A] to-[#584485] text-white rounded-xl font-semibold"
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