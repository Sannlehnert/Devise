import React from 'react';
import { motion } from 'framer-motion';
const testimonials = [
  {
    name: 'María González',
    company: 'Dueña de Cafetería',
    text: 'Devise creó toda mi identidad visual desde cero. El logo, flyers y redes sociales reflejan perfectamente mi esencia.',
    rating: 5
  },
  {
    name: 'Juan Martínez',
    company: 'Gimnasio local',
    text: 'Los reels que produjeron aumentaron nuestro engagement en un 300%. Profesionales y creativos.',
    rating: 5
  },
  {
    name: 'Ana Rodríguez',
    company: 'Empresa de eventos',
    text: 'Las remeras estampadas para nuestro evento fueron un éxito total. Calidad y diseño excepcionales.',
    rating: 5
  }
];
export default function Testimonials() {
  return (
    <section id="testimonios" className="py-24 bg-[linear-gradient(180deg,transparent,#04102a)]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Akira Expanded' }}>
            CONFÍAN EN NOSOTROS
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto" style={{ fontFamily: 'Aurora' }}>
            Descubrí lo que dicen nuestros clientes sobre la experiencia de trabajar con Devise.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="bg-[#0f172a] p-6 rounded-xl border border-white/5"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>

              <p className="text-[#94a3b8] italic mb-6" style={{ fontFamily: 'Aurora' }}>
                "{testimonial.text}"
              </p>

              <div>
                <h4 className="text-white font-semibold" style={{ fontFamily: 'Akira Expanded' }}>
                  {testimonial.name}
                </h4>
                <p className="text-[#94a3b8] text-sm" style={{ fontFamily: 'Aurora' }}>
                  {testimonial.company}
                </p>
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
            className="inline-block px-8 py-3 border border-[#9AD4EA] text-[#9AD4EA] hover:bg-[#9AD4EA] hover:text-white rounded-lg font-semibold transition-colors"
            style={{ fontFamily: 'Akira Expanded' }}
          >
            UNIRSE A CLIENTES SATISFECHOS
          </a>
        </motion.div>
      </div>
    </section>
  );
}