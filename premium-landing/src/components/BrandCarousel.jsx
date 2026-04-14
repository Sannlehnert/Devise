import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  { name: 'Marca 1', logo: '/brands/cabedj.jpg' },
  { name: 'Marca 2', logo: '/brands/cafe.jpg' },
  { name: 'Marca 3', logo: '/brands/curly.jpg' },
  { name: 'Marca 4', logo: '/brands/dcu.jpg' },
  { name: 'Marca 5', logo: '/brands/experienciaelite.jpg' },
  { name: 'Marca 6', logo: '/brands/giselle.jpg' },
  { name: 'Marca 7', logo: '/brands/kpop.jpg' },
  { name: 'Marca 8', logo: '/brands/mcgym.jpg' },
];

export default function BrandCarousel() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0a0f1d] to-[#030631] relative overflow-hidden">
      {/* Efecto de overlay sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1C045A]/10 to-[#584485]/10"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Akira Expanded' }}>
            MARCAS QUE CONFÍAN EN NOSOTROS
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto" style={{ fontFamily: 'Aurora' }}>
            Descubrí algunas de las marcas que han llevado su presencia al siguiente nivel con nosotros.
          </p>
        </motion.div>

        <div className="relative overflow-hidden py-8">
          <motion.div
            className="flex space-x-12"
            animate={{
              x: [0, -1800],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
              },
            }}
          >
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center"
              >
                <div className="w-44 h-20">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-contain opacity-100"
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Overlay de degradado en los bordes */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0f1d] to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0f1d] to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
}