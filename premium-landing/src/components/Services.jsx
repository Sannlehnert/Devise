import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const services = [
  {
    title: 'Diseño Gráfico',
    description: 'Logos, flyers, identidad visual completa',
    icon: <img src="/icons/diseñologo.png" alt="Diseño Gráfico" className="w-10 h-10" />,
    color: '#1C045A',
    link: 'portfolio'
  },
  {
    title: 'Videos & Reels',
    description: 'Contenido audiovisual profesional para redes',
    icon: <img src="/icons/logoreels.png" alt="Videos & Reels" className="w-10 h-10" />,
    color: '#584485',
    link: 'portfolio'
  },
  {
    title: 'Fotografía',
    description: 'Sesiones profesionales de producto y marca',
    icon: <img src="/icons/logovideos.png" alt="Fotografía" className="w-10 h-10" />,
    color: '#9AD4EA',
    link: 'portfolio'
  },
  {
    title: 'Estampado',
    description: 'Remeras y productos con la mejor calidad',
    icon: <img src="/icons/estampadoreels.png" alt="Estampado" className="w-10 h-10" />,
    color: '#F9DB5F',
    link: 'portfolio'
  }
];

export default function Services() {
  return (
    <section id="servicios" className="py-20 relative">
      {/* Fondo sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0f1d]/10 to-transparent"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header minimalista */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <h2 className="minimal-heading text-3xl md:text-4xl mb-4" style={{ fontFamily: 'Akira Expanded' }}>
            <span className="text-white/95">SERVICIOS </span>
            <span className="gradient-devise-premium">PREMIUM</span>
          </h2>
          <p className="minimal-body text-[#B8C2D9]/70 max-w-xl mx-auto">
            Soluciones integrales <span className="text-devise-accent font-bold">DISEÑADAS</span> para escalar{' '}
            <span className="text-devise-accent font-bold">TU PRESENCIA DIGITAL</span> y transformar{' '}
            <span className="text-devise-accent font-bold">TU MARCA</span> en una experiencia memorable
          </p>
        </motion.div>

        {/* Grid de servicios - UX clara */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link
                to={service.link}
                smooth={true}
                duration={500}
                className="block h-full"
              >
                <div className="card-devise-minimal p-6 h-full flex flex-col items-center text-center group cursor-pointer">
                  {/* Icono con color de la paleta */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}20, ${service.color}10)`,
                      border: `1px solid ${service.color}30`
                    }}
                  >
                    <div style={{ color: service.color }}>
                      {service.icon}
                    </div>
                  </div>

                  {/* Título */}
                  <h3 className="minimal-heading text-lg mb-3 text-white/90">
                    {service.title}
                  </h3>

                  {/* Descripción */}
                  <p className="minimal-body text-sm text-[#B8C2D9]/70 mb-4 flex-grow">
                    {service.description}
                  </p>

                  {/* Indicador sutil */}
                  <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-[#9AD4EA] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA sutil */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="minimal-body text-[#B8C2D9]/60 mb-4">
            ¿Necesitas algo específico?
          </p>
          <Link
            to="contacto"
            smooth={true}
            duration={500}
            className="inline-flex items-center text-[#9AD4EA] hover:text-[#9AD4EA]/80 transition-colors minimal-body text-sm"
          >
            Háblanos de tu proyecto
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}