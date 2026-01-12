import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import CustomCursor from './CustomCursor';

const allProjects = [
    {
        id: 1,
        title: 'Identidad Visual para Café',
        desc: 'Diseño de logo, papelería y packaging para una cafetería artesanal.',
        category: 'Diseño',
        images: [
            '/projects/cafe-1.jpg',
            '/projects/cafe-2.jpg',
            '/projects/cafe-3.jpg',
            '/projects/cafe-4.jpg'
        ],
        color: 'from-[#1C045A] to-[#3A1C7A]'
    },
    {
        id: 2,
        title: 'Campaña de Reels para Gym',
        desc: 'Producción y edición de reels promocionales para un gimnasio local.',
        category: 'Video',
        images: [
            '/projects/gym-1.jpg',
            '/projects/gym-2.jpg',
            '/projects/gym-3.jpg'
        ],
        color: 'from-[#584485] to-[#7A5CA8]'
    },
    {
        id: 3,
        title: 'Sesión de Fotos para Restaurante',
        desc: 'Fotografía profesional de platos y ambiente para un restaurante gourmet.',
        category: 'Foto',
        images: [
            '/projects/restaurant-1.jpg',
            '/projects/restaurant-2.jpg',
            '/projects/restaurant-3.jpg',
            '/projects/restaurant-4.jpg'
        ],
        color: 'from-[#9AD4EA] to-[#7AA8EE]'
    },
    {
        id: 4,
        title: 'Estampado para Evento Corporativo',
        desc: 'Diseño y estampado de remeras para el personal de una empresa tecnológica.',
        category: 'Estampado',
        images: [
            '/projects/stamp-1.jpg',
            '/projects/stamp-2.jpg',
            '/projects/stamp-3.jpg'
        ],
        color: 'from-[#FF6B9D] to-[#FF8E53]'
    }
];

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

export default function AllProjects() {
    const navigate = useNavigate();
    const [activeProject, setActiveProject] = useState(null);
    const [filter, setFilter] = useState('Todos');
    const categories = ['Todos', ...new Set(allProjects.map(p => p.category))];

    const filteredProjects = filter === 'Todos'
        ? allProjects
        : allProjects.filter(p => p.category === filter);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const openProject = (projectId) => {
        setActiveProject(projectId);
        document.body.style.overflow = 'hidden';
    };

    const closeProject = () => {
        setActiveProject(null);
        document.body.style.overflow = 'unset';
    };

    const handleContactClick = () => {
        navigate('/');
        setTimeout(() => {
            const contactSection = document.getElementById('contacto');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const activeProjectData = allProjects.find(p => p.id === activeProject);

    return (
        <div className="min-h-screen cosmic-bg pt-32">
            <CustomCursor />
            {/* Header de la página */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1C045A]/10 to-[#584485]/10"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center text-[#9AD4EA] hover:text-white transition-colors duration-300 mb-8"
                            style={{ fontFamily: 'Aurora' }}
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Volver al inicio
                        </Link>

                        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-[#9AD4EA] bg-clip-text text-transparent" style={{ fontFamily: 'Akira Expanded' }}>
                            GALERÍA COMPLETA
                        </h1>
                        <p className="text-2xl text-[#B8C2D9] max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: 'Aurora', fontWeight: 300 }}>
                            Explora nuestro portafolio completo.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filtros */}
            <section className="py-10">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                onClick={() => setFilter(category)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 backdrop-blur-sm ${filter === category
                                    ? 'bg-gradient-to-r from-[#1C045A] to-[#584485] text-white shadow-2xl'
                                    : 'bg-white/5 text-[#94a3b8] hover:text-white hover:bg-white/10'
                                    }`}
                                style={{ fontFamily: 'Aurora' }}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Grid de Todos los Proyectos */}
            <section className="py-10 pb-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -30, scale: 0.9 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    layout
                                >
                                    <ProjectCard
                                        project={project}
                                        index={index}
                                        onOpen={openProject}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Mensaje cuando no hay proyectos */}
                    {filteredProjects.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl text-white mb-4" style={{ fontFamily: 'Akira Expanded' }}>
                                No se encontraron proyectos
                            </h3>
                            <p className="text-[#94a3b8]" style={{ fontFamily: 'Aurora' }}>
                                Prueba con otro filtro o categoryía
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Call to Action Final */}
            <section className="py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#030631] to-transparent"></div>
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-gradient-to-r from-[#1C045A]/20 to-[#584485]/20 rounded-3xl p-12 backdrop-blur-sm border border-white/10"
                    >
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Akira Expanded' }}>
                            ¿Te gusta lo que ves?
                        </h3>
                        <p className="text-xl text-[#B8C2D9] mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Aurora' }}>
                            Hablemos sobre tu próximo proyecto y creemos algo extraordinario juntos.
                        </p>
                        <button
                            onClick={handleContactClick}
                            className="inline-flex items-center px-12 py-5 bg-gradient-to-r from-[#1C045A] to-[#584485] hover:from-[#584485] hover:to-[#1C045A] text-white font-semibold rounded-2xl transition-all duration-500 hover:scale-105 shadow-2xl"
                            style={{ fontFamily: 'Akira Expanded' }}
                        >
                            INICIAR PROYECTO
                            <svg className="w-5 h-5 ml-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            </section>

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
        </div>
    );
}