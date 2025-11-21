// components/FreeTemplates.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from 'emailjs-com';

const FreeTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [downloadStatus, setDownloadStatus] = useState('idle');

  const templates = [
    {
      id: 1,
      title: 'Kit Navideño Premium',
      description: 'Pack completo con banners, stories y posts para redes sociales. Diseños modernos y festivos.',
      category: 'Navidad',
      preview: '/templates/christmas-pack.jpg',
      file: '/templates/christmas-pack.zip',
      includes: ['5 Banners', '10 Stories', '8 Posts', '3 Mockups'],
      color: 'from-red-500 to-green-500'
    },
    {
      id: 2,
      title: 'Stories Festivos',
      description: 'Colección de stories animados para Instagram con motivos navideños elegantes.',
      category: 'Navidad',
      preview: '/templates/christmas-stories.jpg',
      file: '/templates/christmas-stories.zip',
      includes: ['12 Stories', 'Animaciones', 'EFfectos premium'],
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 3,
      title: 'Posts Redes Sociales',
      description: 'Plantillas editables para Facebook, Instagram y LinkedIn. Totalmente personalizables.',
      category: 'Marketing',
      preview: '/templates/social-posts.jpg',
      file: '/templates/social-posts.zip',
      includes: ['8 Posts', 'Formatos PSD', 'Guías de uso'],
      color: 'from-pink-500 to-orange-500'
    }
  ];

  const handleDownload = (template) => {
    setSelectedTemplate(template);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDownloadStatus('sending');

    try {
      // Enviar email con EmailJS
      await emailjs.send(
        'service_qix8jhb',
        'template_lt3xuk4',
        {
          from_name: formData.name,
          from_email: formData.email,
          template_name: selectedTemplate.title,
          to_email: 'santiagolehnert2016@gmail.com',
          date: new Date().toLocaleString('es-AR')
        }
      );

      // Simular descarga
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = selectedTemplate.file;
        link.download = selectedTemplate.title + '.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setDownloadStatus('success');
        setTimeout(() => {
          setShowModal(false);
          setDownloadStatus('idle');
          setFormData({ name: '', email: '' });
        }, 2000);
      }, 1500);

    } catch (error) {
      console.error('Error:', error);
      setDownloadStatus('error');
    }
  };

  return (
    <section id="plantillas" className="py-28 relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#030631]/50 via-[#0a0f1d]/30 to-[#1C045A]/20"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#030631] to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-[#9AD4EA] bg-clip-text text-transparent" style={{ fontFamily: 'Akira Expanded' }}>
            PLANTILLAS GRATUITAS
          </h2>
          <p className="text-xl text-[#B8C2D9] max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Aurora', fontWeight: 300 }}>
            Descargá nuestros recursos premium diseñados para elevar tu presencia digital. 
            <span className="text-[#9AD4EA]"> Totalmente gratis.</span>
          </p>
        </motion.div>

        {/* Grid de Plantillas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => handleDownload(template)}
            >
              <div className="bg-[#0f172a]/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 group-hover:border-[#9AD4EA]/30 group-hover:bg-[#0f172a]/80">
                {/* Preview de la plantilla */}
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-20`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="text-4xl mb-3">🎄</div>
                      <span className="text-white text-lg font-bold" style={{ fontFamily: 'Akira Expanded' }}>
                        {template.title}
                      </span>
                    </div>
                  </div>
                  
                  {/* Badge de categoría */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-xs" style={{ fontFamily: 'Aurora' }}>
                      {template.category}
                    </span>
                  </div>

                  {/* Overlay de hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="text-center">
                      <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20 mb-3">
                        <span className="text-white text-sm" style={{ fontFamily: 'Aurora' }}>
                          Descargar Gratis
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <h3 className="text-white text-xl font-bold mb-3" style={{ fontFamily: 'Akira Expanded' }}>
                    {template.title}
                  </h3>
                  <p className="text-[#94a3b8] text-sm mb-4" style={{ fontFamily: 'Aurora' }}>
                    {template.description}
                  </p>

                  {/* Incluye */}
                  <div className="space-y-2">
                    {template.includes.map((item, idx) => (
                      <div key={idx} className="flex items-center text-[#9AD4EA] text-sm" style={{ fontFamily: 'Aurora' }}>
                        <div className="w-1 h-1 bg-[#9AD4EA] rounded-full mr-3"></div>
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Footer de la tarjeta */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="text-[#9AD4EA] text-sm flex items-center justify-between" style={{ fontFamily: 'Aurora' }}>
                      <span>Descarga inmediata</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA adicional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-[#1C045A]/20 to-[#584485]/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Akira Expanded' }}>
              ¿Necesitás algo personalizado?
            </h3>
            <p className="text-[#B8C2D9] mb-6 max-w-2xl mx-auto" style={{ fontFamily: 'Aurora' }}>
              Creamos plantillas y diseños exclusivos para tu marca.
            </p>
            <a
              href="#contacto"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#1C045A] to-[#584485] hover:from-[#584485] hover:to-[#1C045A] text-white font-semibold rounded-2xl transition-all duration-500 hover:scale-105"
              style={{ fontFamily: 'Akira Expanded' }}
            >
              SOLICITAR DISEÑO PERSONALIZADO
              <svg className="w-5 h-5 ml-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Modal de Descarga */}
      <AnimatePresence>
        {showModal && selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 30 }}
              className="bg-[#0f172a] rounded-3xl max-w-md w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🎁</div>
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Akira Expanded' }}>
                  {selectedTemplate.title}
                </h3>
                <p className="text-[#94a3b8]" style={{ fontFamily: 'Aurora' }}>
                  Completá tus datos para descargar la plantilla gratis
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="ultimate-input w-full"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="ultimate-input w-full"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={downloadStatus === 'sending'}
                  className="w-full py-4 bg-gradient-to-r from-[#1C045A] to-[#584485] text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Akira Expanded' }}
                  whileHover={{ scale: downloadStatus !== 'sending' ? 1.05 : 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {downloadStatus === 'sending' ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                      PREPARANDO DESCARGA...
                    </span>
                  ) : downloadStatus === 'success' ? (
                    '✅ DESCARGA COMPLETA'
                  ) : (
                    'DESCARGAR PLANTILLA GRATIS'
                  )}
                </motion.button>
              </form>

              <p className="text-[#94a3b8] text-xs text-center mt-4" style={{ fontFamily: 'Aurora' }}>
                Al descargar, aceptás recibir contenido de valor de DEVISE. Podés darte de baja cuando quieras.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FreeTemplates;