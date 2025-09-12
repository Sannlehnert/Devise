import React from 'react';
import { motion } from 'framer-motion';
const services = [
  {
    title: 'Branding & Identidad',
    description: 'Desarrollamos identidades visuales únicas que comunican la esencia de tu marca.',
    icon: '🔄'
  },
  {
    title: 'Social Media',
    description: 'Estrategias 360° para redes sociales que generan engagement y conversiones.',
    icon: '📱'
  },
  {
    title: 'Diseño Web',
    description: 'Diseño y desarrollo de experiencias digitales intuitivas y impactantes.',
    icon: '💻'
  },
  {
    title: 'Motion Graphics',
    description: 'Animaciones y videos que dan vida a tus ideas y capturan la atención.',
    icon: '🎬'
  }
];
export default function Services() {
  return (
    <section id="servicios" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Akira Expanded' }}>
            SERVICIOS PREMIUM
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto" style={{ fontFamily: 'Aurora' }}>
            Soluciones completas para empresas y profesionales que buscan escalar su presencia online.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-[#0f172a] p-6 rounded-xl border border-white/5 hover:border-[#9AD4EA]/30 transition-all"
            >
              <div className="text-3xl mb-4">{service.icon}</div>

              <h3 className="text-white text-lg font-semibold mb-3" style={{ fontFamily: 'Akira Expanded' }}>
                {service.title}
              </h3>

              <p className="text-[#94a3b8] text-sm mb-4" style={{ fontFamily: 'Aurora' }}>
                {service.description}
              </p>

              <div className="text-[#9AD4EA] text-sm flex items-center" style={{ fontFamily: 'Aurora' }}>
                Descubrir más →
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="#contacto"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#1C045A] to-[#584485] hover:from-[#584485] hover:to-[#1C045A] rounded-lg font-semibold transition-colors text-white"
            style={{ fontFamily: 'Akira Expanded' }}
          >
            EXPLORAR TODOS LOS SERVICIOS
          </a>
        </motion.div>
      </div>
    </section>
  );
}