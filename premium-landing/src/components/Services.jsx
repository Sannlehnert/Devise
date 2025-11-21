import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const services = [
  {
    title: 'Branding & Identidad',
    description: 'Desarrollamos identidades visuales únicas que comunican la esencia de tu marca y conectan emocionalmente.',
    // Placeholder - será reemplazado por imagen diseñada
    icon: '🎨', 
    link: 'portfolio',
    color: 'from-[#1C045A] to-[#3A1C7A]'
  },
  {
    title: 'Social Media',
    description: 'Estrategias 360° que generan engagement real y convierten seguidores en clientes leales.',
    // Placeholder - será reemplazado por imagen diseñada
    icon: '📱',
    link: 'portfolio',
    color: 'from-[#584485] to-[#7A5CA8]'
  },
  {
    title: 'Diseño Web',
    description: 'Experiencias digitales intuitivas y impactantes que convierten visitantes en leads.',
    // Placeholder - será reemplazado por imagen diseñada
    icon: '💻',
    link: 'portfolio',
    color: 'from-[#9AD4EA] to-[#7AA8EE]'
  },
  {
    title: 'Motion Graphics',
    description: 'Animaciones que dan vida a tus ideas y capturan la atención en segundos.',
    // Placeholder - será reemplazado por imagen diseñada
    icon: '🎬',
    link: 'portfolio',
    color: 'from-[#FF6B9D] to-[#FF8E53]'
  }
];

export default function Services() {
  return (
    <section id="servicios" className="py-28 relative overflow-hidden">
      {/* Efecto de fondo sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0f1d]/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-[#9AD4EA] bg-clip-text text-transparent" style={{ fontFamily: 'Akira Expanded' }}>
            SERVICIOS PREMIUM
          </h2>
          <p className="text-xl text-[#B8C2D9] max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Aurora', fontWeight: 300 }}>
            Soluciones integrales diseñadas para escalar tu presencia digital y transformar tu marca en una experiencia memorable.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <Link 
                to={service.link} 
                smooth={true} 
                duration={800}
                className="block cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                
                <div className="relative bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full transition-all duration-500 group-hover:border-white/20 group-hover:bg-[#0f172a]/80">
                  <div className="flex flex-col items-center text-center h-full">
                    {/* Icono - Placeholder para imagen diseñada */}
                    <div className={`w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl`}>
                      {/* Placeholder temporal - se reemplazará por imagen */}
                      <div className="text-3xl">{service.icon}</div>
                      
                      {/* Comentario para cuando tengan las imágenes */}
                      {/* <img 
                        src={`/icons/${service.title.toLowerCase().replace(' ', '-')}.svg`}
                        alt={service.title}
                        className="w-10 h-10"
                      /> */}
                    </div>
                    
                    <h3 className="text-white text-xl font-bold mb-4 leading-tight" style={{ fontFamily: 'Akira Expanded' }}>
                      {service.title}
                    </h3>

                    <p className="text-[#94a3b8] text-sm leading-relaxed mb-6 flex-grow" style={{ fontFamily: 'Aurora' }}>
                      {service.description}
                    </p>

                    {/* Botón de acción */}
                    <div className="mt-auto w-full">
                      <div className="inline-flex items-center text-[#9AD4EA] text-sm font-semibold group-hover:translate-x-2 transition-transform duration-300" style={{ fontFamily: 'Aurora' }}>
                        <span>Descubrir más</span>
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Efecto de brillo al hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            to="portfolio"
            smooth={true}
            duration={800}
            className="inline-flex items-center px-12 py-5 bg-gradient-to-r from-[#1C045A] to-[#584485] hover:from-[#584485] hover:to-[#1C045A] text-white font-semibold rounded-2xl transition-all duration-500 hover:scale-105 shadow-2xl shadow-[#1C045A]/40 hover:shadow-[#584485]/50 group"
            style={{ fontFamily: 'Akira Expanded', letterSpacing: '0.05em' }}
          >
            EXPLORAR TODOS LOS SERVICIOS
            <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}