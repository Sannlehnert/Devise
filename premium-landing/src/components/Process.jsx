import React from 'react';
import { motion } from 'framer-motion';
export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Diagnóstico',
      description: 'Analizamos tu marca y objetivos para crear una estrategia personalizada.'
    },
    {
      number: '02',
      title: 'Estrategia',
      description: 'Desarrollamos un plan detallado con cronograma y KPIs claros.'
    },
    {
      number: '03',
      title: 'Ejecución',
      description: 'Implementamos la estrategia con creatividad y atención al detalle.'
    },
    {
      number: '04',
      title: 'Optimización',
      description: 'Medimos resultados y ajustamos para maximizar el rendimiento.'
    }
  ];
  return (
    <section id="proceso" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Akira Expanded' }}>
            NUESTRO PROCESO
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto" style={{ fontFamily: 'Aurora' }}>
            Simple, probado y enfocado en resultados. Así llevamos cada proyecto al éxito.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#1C045A] to-[#584485] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl" style={{ fontFamily: 'Akira Expanded' }}>
                  {step.number}
                </span>
              </div>

              <h3 className="text-white text-lg font-semibold mb-4" style={{ fontFamily: 'Akira Expanded' }}>
                {step.title}
              </h3>

              <p className="text-[#94a3b8] text-sm" style={{ fontFamily: 'Aurora' }}>
                {step.description}
              </p>

              <div className="mt-6">
                <div className="w-12 h-0.5 bg-[#9AD4EA] mx-auto"></div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-1/2 w-full h-0.5 bg-[#9AD4EA]/20 transform -translate-y-1/2"></div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}