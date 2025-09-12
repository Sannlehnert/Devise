import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Campaña Branding',
    desc: 'Identidad visual completa para startup tech',
    category: 'Branding',
    img: '/placeholder-1.jpg'
  },
  {
    id: 2,
    title: 'Redes Sociales',
    desc: 'Estrategia 360° para marca de moda',
    category: 'Social Media',
    img: '/placeholder-2.jpg'
  },
  {
    id: 3,
    title: 'Diseño Web',
    desc: 'Landing page de alto impacto conversivo',
    category: 'Diseño Web',
    img: '/placeholder-3.jpg'
  },
  {
    id: 4,
    title: 'Motion Graphics',
    desc: 'Animación para campaña publicitaria',
    category: 'Motion',
    img: '/placeholder-4.jpg'
  },
  {
    id: 5,
    title: 'Edición Musical',
    desc: 'Producción y edición de audio profesional',
    category: 'Audio',
    img: '/placeholder-5.jpg'
  },
  {
    id: 6,
    title: 'Diseño UX/UI',
    desc: 'Experiencia de usuario para aplicación móvil',
    category: 'Diseño Web',
    img: '/placeholder-6.jpg'
  }
];

export default function Portfolio() {
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState('Todos');
  const categories = ['Todos', ...new Set(projects.map(p => p.category))];

  const filteredProjects = filter === 'Todos'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-[linear-gradient(180deg,#071028,transparent)]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Akira Expanded' }}>
            PROYECTOS DESTACADOS
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto" style={{ fontFamily: 'Aurora' }}>
            Descubrí cómo llevamos ideas al siguiente nivel con creatividad y estrategia.
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${filter === category
                ? 'bg-gradient-to-r from-[#1C045A] to-[#584485] text-white'
                : 'bg-white/5 text-[#94a3b8] hover:text-white'
                }`}
              style={{ fontFamily: 'Aurora' }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Grid de proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => setActive(project.id)}
            >
              <div className="bg-[#0f172a] rounded-xl overflow-hidden border border-white/5 transition-all group-hover:border-[#9AD4EA]/30">
                <div className="h-48 bg-gradient-to-r from-[#1C045A]/20 to-[#584485]/10 flex items-center justify-center">
                  <div className="text-2xl" style={{ fontFamily: 'Constantine' }}>
                    ΔE∨ASE
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-[#9AD4EA] text-sm" style={{ fontFamily: 'Aurora' }}>
                    {project.category}
                  </span>
                  <h3 className="text-white text-lg font-semibold mt-2" style={{ fontFamily: 'Akira Expanded' }}>
                    {project.title}
                  </h3>
                  <p className="text-[#94a3b8] text-sm mt-2" style={{ fontFamily: 'Aurora' }}>
                    {project.desc}
                  </p>
                  <div className="mt-4 text-[#9AD4EA] text-sm flex items-center" style={{ fontFamily: 'Aurora' }}>
                    Ver proyecto →
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
              onClick={() => setActive(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#0f172a] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {projects.filter(p => p.id === active).map(project => (
                  <div key={project.id} className="p-8">
                    <button
                      onClick={() => setActive(null)}
                      className="text-[#94a3b8] hover:text-white mb-6"
                      style={{ fontFamily: 'Aurora' }}
                    >
                      ← Volver
                    </button>

                    <div className="h-64 bg-gradient-to-r from-[#1C045A]/20 to-[#584485]/10 rounded-lg mb-6 flex items-center justify-center">
                      <div className="text-4xl" style={{ fontFamily: 'Constantine' }}>
                        ΔE∨ASE
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Akira Expanded' }}>
                          {project.title}
                        </h3>
                        <p className="text-[#94a3b8]" style={{ fontFamily: 'Aurora' }}>
                          {project.desc} — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Nullam auctor, nisl eu ultricies lacinia, nunc nisl aliquam nisl.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-white font-semibold mb-4" style={{ fontFamily: 'Akira Expanded' }}>
                          Detalles del proyecto
                        </h4>
                        <div className="space-y-3 text-[#94a3b8]" style={{ fontFamily: 'Aurora' }}>
                          <p><span className="text-white">Categoría:</span> {project.category}</p>
                          <p><span className="text-white">Cliente:</span> Cliente Premium</p>
                          <p><span className="text-white">Resultados:</span> +200% engagement</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}