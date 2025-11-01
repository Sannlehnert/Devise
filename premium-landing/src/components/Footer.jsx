// components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Datos de contactos
  const contacts = [
    {
      type: 'whatsapp',
      label: 'Redes y Audiovisual',
      number: '+54 9 299 123-4567',
      url: 'https://wa.me/5492991234567',
    },
    {
      type: 'whatsapp',
      label: 'Diseño Gráfico',
      number: '+54 9 299 987-6543',
      url: 'https://wa.me/5492999876543',
    },
    {
      type: 'whatsapp',
      label: 'Otro número',
      number: '+54 9 299 555-5555',
      url: 'https://wa.me/5492995555555',
    },
    {
      type: 'instagram',
      label: 'Instagram',
      user: '@devise.agency',
      url: 'https://instagram.com/devise.agency',
    },
    {
      type: 'email',
      label: 'Email',
      email: 'info@devise.com',
      url: 'mailto:info@devise.com',
    },
  ];

  // Función para obtener el icono según el tipo
  const getIcon = (type) => {
    switch (type) {
      case 'whatsapp':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.262-6.187-3.55-8.444"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        );
      case 'email':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#030631] via-[#0a0f1d] to-[#1C045A] border-t border-white/5">
      {/* Efectos decorativos sutiles */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#9AD4EA] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-[#584485] rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Contenido principal - Layout minimalista */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
            
            {/* Logo y descripción */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <img
                  src="/img/devicesinfondo.png"
                  alt="Devise"
                  className="h-8 object-contain opacity-90"
                />
              </div>
              <p className="text-[#94a3b8] text-sm max-w-md leading-relaxed" style={{ fontFamily: 'Aurora' }}>
                Transformamos visiones en experiencias digitales extraordinarias
              </p>
            </motion.div>

            {/* Iconos de contacto - Minimalistas */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4"
            >
              {contacts.map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.url}
                  target={contact.type === 'email' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="group relative p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/5 hover:border-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title={`${contact.label}: ${contact.number || contact.user || contact.email}`}
                >
                  <div className="w-5 h-5 flex items-center justify-center text-white">
                    {getIcon(contact.type)}
                  </div>
                  
                  {/* Tooltip simple en hover */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {contact.label}: {contact.number || contact.user || contact.email}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Línea separadora sutil */}
          <div className="border-t border-white/10 mb-8"></div>

          {/* Información inferior - Ultra minimalista */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-between gap-4 text-center"
          >
            <div className="text-[#94a3b8] text-sm" style={{ fontFamily: 'Aurora' }}>
              <p>© {currentYear} Devise. Todos los derechos reservados.</p>
            </div>
            
            <div className="flex items-center gap-6 text-[#94a3b8] text-sm" style={{ fontFamily: 'Aurora' }}>
              <span className="flex items-center gap-2">
                <div className="w-1 h-1 bg-[#9AD4EA] rounded-full"></div>
                Hecho con 💜 por Devise
              </span>
              <span>Neuquén, Argentina</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}