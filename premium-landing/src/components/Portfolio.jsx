import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const allProjects = [
  {
    id: 1,
    title: 'Campaña Branding',
    desc: 'Identidad visual completa para startup tech innovadora',
    category: 'Branding',
    images: [
      '/projects/branding-1.jpg',
      '/projects/branding-2.jpg',
      '/projects/branding-3.jpg',
      '/projects/branding-4.jpg'
    ],
    color: 'from-[#1C045A] to-[#3A1C7A]'
  },
  {
    id: 2,
    title: 'Redes Sociales',
    desc: 'Estrategia 360° para marca de moda sostenible',
    category: 'Social Media',
    images: [
      '/projects/social-1.jpg',
      '/projects/social-2.jpg',
      '/projects/social-3.jpg'
    ],
    color: 'from-[#584485] to-[#7A5CA8]'
  },
  {
    id: 3,
    title: 'Diseño Web',
    desc: 'Landing page de alto impacto conversivo',
    category: 'Diseño Web',
    images: [
      '/projects/web-1.jpg',
      '/projects/web-2.jpg',
      '/projects/web-3.jpg',
      '/projects/web-4.jpg'
    ],
    color: 'from-[#9AD4EA] to-[#7AA8EE]'
  },
  {
    id: 4,
    title: 'Motion Graphics',
    desc: 'Animación para campaña publicitaria viral',
    category: 'Motion',
    images: [
      '/projects/motion-1.jpg',
      '/projects/motion-2.jpg',
      '/projects/motion-3.jpg'
    ],
    color: 'from-[#FF6B9D] to-[#FF8E53]'
  },
  {
    id: 5,
    title: 'Edición Musical',
    desc: 'Producción y edición de audio profesional',
    category: 'Audio',
    images: [
      '/projects/audio-1.jpg',
      '/projects/audio-2.jpg'
    ],
    color: 'from-[#00C9B7] to-[#00A896]'
  },
  {
    id: 6,
    title: 'Diseño UX/UI',
    desc: 'Experiencia de usuario para aplicación móvil',
    category: 'Diseño Web',
    images: [
      '/projects/ux-1.jpg',
      '/projects/ux-2.jpg',
      '/projects/ux-3.jpg',
      '/projects/ux-4.jpg'
    ],
    color: 'from-[#FFD166] to-[#FFB347]'
  }
];

// Solo mostrar 3 proyectos destacados
const featuredProjects = allProjects.slice(0, 3);

// Componente de Carrusel Individual para cada Proyecto
function ProjectCarousel({ project, isActive, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const carouselRef = useRef(null);

  const nextImage = () => {
    setDirection(1);
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  // Auto-advance carousel
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      nextImage();
    }, 4000);

    return () => clearInterval(interval);
  }, [isActive, currentImageIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isActive) return;

      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, currentImageIndex]);

  const imageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 1.1,
      transition: {
        duration: 0.3
      }
    })
  };

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        ref={carouselRef}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 30 }}
        className="relative bg-[#0f172a] rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del Modal */}
        <div className="absolute top-0 left-0 right-0 z-20 p-6 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'Akira Expanded' }}>
                {project.title}
              </h3>
              <p className="text-[#94a3b8] mt-1" style={{ fontFamily: 'Aurora' }}>
                {project.desc}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
            >
              <span className="text-white text-xl">×</span>
            </button>
          </div>
        </div>

        {/* Carrusel de Imágenes */}
        <div className="relative h-[70vh] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentImageIndex}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center"
            >
              <img
                src={project.images[currentImageIndex]}
                alt={`${project.title} - Imagen ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = `https://placehold.co/800x600/1C045A/FFFFFF?text=${project.title}+${currentImageIndex + 1}`;
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Controles de Navegación */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm group"
          >
            <span className="text-white text-2xl group-hover:scale-110 transition-transform">‹</span>
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm group"
          >
            <span className="text-white text-2xl group-hover:scale-110 transition-transform">›</span>
          </button>

          {/* Indicadores */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {project.images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentImageIndex ? 1 : -1);
                  setCurrentImageIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/70'
                  }`}
              />
            ))}
          </div>

          {/* Contador */}
          <div className="absolute top-4 right-4 bg-black/50 rounded-full px-3 py-1 backdrop-blur-sm">
            <span className="text-white text-sm" style={{ fontFamily: 'Aurora' }}>
              {currentImageIndex + 1} / {project.images.length}
            </span>
          </div>
        </div>

        {/* Footer del Modal */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-gradient-to-t from-black/50 to-transparent">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-2" style={{ fontFamily: 'Akira Expanded' }}>
                Detalles del Proyecto
              </h4>
              <div className="space-y-1 text-[#94a3b8]" style={{ fontFamily: 'Aurora' }}>
                <p><span className="text-white">Categoría:</span> {project.category}</p>
                <p><span className="text-white">Cliente:</span> Cliente Premium</p>
                <p><span className="text-white">Resultados:</span> +200% engagement</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Componente de Tarjeta de Proyecto
function ProjectCard({ project, index, onOpen }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);

  // Auto-carrusel en hover
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPreviewIndex(prev =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [project.images.length]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group cursor-pointer"
      onClick={() => onOpen(project.id)}
    >
      <div className="bg-[#0f172a]/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 group-hover:border-[#9AD4EA]/30 group-hover:bg-[#0f172a]/80">
        {/* Carrusel de Preview */}
        <div className="relative h-48 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentPreviewIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              src={project.images[currentPreviewIndex]}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `https://placehold.co/400x300/1C045A/FFFFFF?text=${project.title}`;
              }}
            />
          </AnimatePresence>

          {/* Overlay de Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>

          {/* Indicadores de Imágenes */}
          <div className="absolute bottom-3 left-3 flex space-x-1">
            {project.images.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentPreviewIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/50'
                  }`}
              />
            ))}
          </div>

          {/* Badge de Categoría */}
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-white text-xs" style={{ fontFamily: 'Aurora' }}>
              {project.images.length} imágenes
            </span>
          </div>

          {/* Efecto Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
                <span className="text-white text-sm" style={{ fontFamily: 'Aurora' }}>
                  Ver Galería
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido de la Tarjeta */}
        <div className="p-6">
          <span className="text-[#9AD4EA] text-sm uppercase tracking-wider" style={{ fontFamily: 'Aurora' }}>
            {project.category}
          </span>
          <h3 className="text-white text-xl font-bold mt-2 mb-3" style={{ fontFamily: 'Akira Expanded' }}>
            {project.title}
          </h3>
          <p className="text-[#94a3b8] text-sm leading-relaxed" style={{ fontFamily: 'Aurora' }}>
            {project.desc}
          </p>

          {/* Footer de la Tarjeta */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-[#9AD4EA] text-sm flex items-center group-hover:translate-x-2 transition-transform duration-300" style={{ fontFamily: 'Aurora' }}>
              Explorar proyecto →
            </div>
            <div className="flex space-x-1">
              {project.images.slice(0, 3).map((_, idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-white text-xs"
                >
                  {idx + 1}
                </div>
              ))}
              {project.images.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#9AD4EA] to-[#584485] flex items-center justify-center text-white text-xs">
                  +{project.images.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// Componente Principal Portfolio - Solo Featured
export default function Portfolio() {
  const [activeProject, setActiveProject] = useState(null);
  const [filter, setFilter] = useState('Todos');

  const openProject = (projectId) => {
    setActiveProject(projectId);
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setActiveProject(null);
    document.body.style.overflow = 'unset';
  };

  const activeProjectData = featuredProjects.find(p => p.id === activeProject);

  return (
    <section id="portfolio" className="py-28 relative overflow-hidden">
      {/* Efectos de Fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071028] via-transparent to-[#030631]"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#030631] to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-[#9AD4EA] bg-clip-text text-transparent" style={{ fontFamily: 'Akira Expanded' }}>
            PROYECTOS DESTACADOS
          </h2>
          <p className="text-xl text-[#B8C2D9] max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Aurora', fontWeight: 300 }}>
            Una selección de nuestros trabajos más representativos.
            Cada proyecto cuenta una historia única de creatividad y estrategia.
          </p>
        </motion.div>

        {/* Grid de Proyectos Destacados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={openProject}
            />
          ))}
        </div>

        {/* Botón Ver Más Proyectos - Ultra Premium */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/proyectos"
            className="group relative inline-flex items-center px-12 py-5 bg-gradient-to-r from-[#1C045A] to-[#584485] hover:from-[#584485] hover:to-[#1C045A] text-white font-semibold rounded-2xl transition-all duration-500 hover:scale-105 shadow-2xl shadow-[#1C045A]/40 hover:shadow-[#584485]/50 overflow-hidden"
            style={{ fontFamily: 'Akira Expanded', letterSpacing: '0.05em' }}
          >
            <span className="relative z-10 flex items-center justify-center">
              EXPLORAR TODOS LOS PROYECTOS
              <svg className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Efecto de partículas en hover */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-20"
                  animate={{
                    y: [0, -20, 0],
                    x: [0, Math.sin(i) * 10, 0],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  style={{
                    left: `${20 + i * 15}%`,
                    bottom: '10%',
                  }}
                />
              ))}
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Modal de Carrusel */}
      <AnimatePresence>
        {activeProjectData && (
          <ProjectCarousel
            project={activeProjectData}
            isActive={true}
            onClose={closeProject}
          />
        )}
      </AnimatePresence>
    </section>
  );
}