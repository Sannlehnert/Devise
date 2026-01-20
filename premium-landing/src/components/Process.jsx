import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Contacto',
    description: 'Nos escribís contándonos tu idea o proyecto.'
  },
  {
    number: '02',
    title: 'Reunión',
    description: 'Coordinamos una reunión en nuestra oficina para conocernos y pactar detalles.'
  },
  {
    number: '03',
    title: 'Realización',
    description: 'Nos ponemos manos a la obra con tu proyecto, aplicando todo nuestro expertise.'
  },
  {
    number: '04',
    title: 'Entrega',
    description: 'Te entregamos el trabajo con la mejor calidad, lista para impactar.'
  }
];

export default function Process() {
  return (
    <section id="proceso" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1C045A]/5 to-transparent"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="minimal-heading text-3xl md:text-4xl mb-4" style={{ fontFamily: 'Akira Expanded' }}>
            <span className="text-white/95">PROCESO </span>
            <span className="text-[#9AD4EA]">CLARO</span>
          </h2>
          <p className="minimal-body text-[#B8C2D9]/70 max-w-lg mx-auto">
            Simple, directo y enfocado en resultados. Así trabajamos.
          </p>
        </motion.div>

        {/* Timeline minimalista simplificada */}
        <div className="relative max-w-3xl mx-auto">
          {/* Línea de tiempo */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1C045A] via-[#584485] to-[#9AD4EA]"></div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative flex items-start gap-6"
              >
                {/* Punto en la línea */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#1C045A] to-[#584485] border-2 border-[#9AD4EA]/30 flex items-center justify-center z-10">
                  <span className="text-white text-sm font-bold">{step.number}</span>
                </div>

                {/* Contenido */}
                <div className="flex-1 card-devise-minimal p-6">
                  <h3 className="minimal-heading text-xl mb-3 text-white/90">
                    {step.title}
                  </h3>
                  <p className="minimal-body text-[#B8C2D9]/70">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA final del proceso */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-[#1C045A]/10 to-[#584485]/10 border border-[#9AD4EA]/10">
            <p className="minimal-body text-[#B8C2D9]/70 mb-3">
              ¿Listo para comenzar?
            </p>
            <a
              href="#contacto"
              className="btn-devise-minimal inline-flex items-center"
            >
              Agendar reunión
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}