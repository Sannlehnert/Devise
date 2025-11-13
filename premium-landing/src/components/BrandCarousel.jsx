import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  { name: 'Marca 1', logo: '/brands/logo1.png' },
  { name: 'Marca 2', logo: '/brands/logo2.png' },
  { name: 'Marca 3', logo: '/brands/logo3.png' },
  { name: 'Marca 4', logo: '/brands/logo4.png' },
  { name: 'Marca 5', logo: '/brands/logo5.png' },
  { name: 'Marca 6', logo: '/brands/logo6.png' },
  { name: 'Marca 7', logo: '/brands/logo7.png' },
  { name: 'Marca 8', logo: '/brands/logo8.png' },
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
                className="flex-shrink-0 flex items-center justify-center group"
              >
                <div className="w-32 h-16 bg-white/5 rounded-xl flex items-center justify-center p-4 backdrop-blur-sm border border-white/5 hover:border-[#9AD4EA]/20 transition-all duration-300 group-hover:scale-110">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-full max-h-8 filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
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