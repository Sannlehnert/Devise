import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "~ CUANDO FALTE LA MOTIVACIÓN, LA DISCIPLINA SERÁ TU MAYOR ALIADA ~",
  "~ LA RESILIENCIA DEFINE TU MARCA. TODOS JUNTOS AL SIGUIENTE NIVEL ~",
  "~ CADA DÍA ES UNA OPORTUNIDAD PARA SER MEJOR ~",
  "~ LA EVOLUCIÓN SE CONSIGUE HACIENDO AJUSTES, NO ACELERANDO LAS COSAS ~",
  "~ Tu visión merece la mejor expresión visual ~",
  "~ Cada gran marca comenzó con una idea ~",
  "~ Juntos creamos lo extraordinario ~",
  "~ Transformamos ideas en experiencias memorables ~"
];

export default function InspirationalMessages() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [checkMobile]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const scrollPercentage = scrollPosition / (documentHeight - windowHeight);
      
      const threshold = isMobile ? 0.1 : 0.2;
      
      if (scrollPercentage > threshold && scrollPercentage < 0.9) {
        setIsVisible(true);
        const messageIndex = Math.floor(scrollPercentage * messages.length);
        setCurrentMessage(Math.min(messageIndex, messages.length - 1));
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <div className="fixed bottom-4 md:bottom-10 left-0 right-0 z-40 pointer-events-none flex justify-center px-4">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-[#1C045A]/30 to-[#584485]/20 backdrop-blur-md border border-[#9AD4EA]/30 rounded-full px-4 py-2 md:px-6 md:py-3 w-full max-w-md shadow-lg shadow-[#1C045A]/20"
          >
            <p className="text-white text-center text-xs md:text-sm" style={{ fontFamily: 'Akira Expanded' }}>
              {messages[currentMessage]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}