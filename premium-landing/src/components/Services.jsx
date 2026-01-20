import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const services = [
  {
    title: 'Diseño Gráfico',
    description: 'Logos, flyers, identidad visual completa',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: '#1C045A',
    link: 'portfolio'
  },
  {
    title: 'Videos & Reels',
    description: 'Contenido audiovisual profesional para redes',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    color: '#584485',
    link: 'portfolio'
  },
  {
    title: 'Fotografía',
    description: 'Sesiones profesionales de producto y marca',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: '#9AD4EA',
    link: 'portfolio'
  },
  {
    title: 'Estampado',
    description: 'Remeras y productos con la mejor calidad',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
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