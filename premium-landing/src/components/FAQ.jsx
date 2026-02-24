import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'Cuanto tiempo tarda un proyecto de diseno?',
    answer: 'El tiempo de entrega depende de la complejidad del proyecto. Un logo basico toma entre 3-5 dias habiles, mientras que una identidad visual completa puede tomar 2-3 semanas. Siempre acordamos plazos antes de comenzar.'
  },
  {
    question: 'Necesito tener las imagenes o contenido listo?',
    answer: 'No te preocupes, podemos ayudarte a crear el contenido. Para fotografia de productos, podemos coordinar una sesion o usar stock de alta calidad. Para textos, podemos asistirte con la redaccion.'
  },
  {
    question: 'Como es el proceso de trabajo?',
    answer: 'Primero tenemos una reunion para entender tu vision. Luego enviamos propuestas y bocetos. Trabajamos con revisiones ilimitadas. El proceso es colaborativo y transparente.'
  },
  {
    question: 'Que incluye el servicio de estampado?',
    answer: 'Incluye diseno personalizado, telas de calidad premium, impresion de alta durabilidad y confection profesional. Trabajamos con tecnicas de sublimacion, serigrafia y Vinilo.'
  },
  {
    question: 'Tienen garantia de satisfaccion?',
    answer: 'Si, estamos comprometidos con tu satisfaccion. Incluye revisiones ilimitadas durante el proceso y ajustes finales hasta que el resultado sea lo que esperabas.'
  },
  {
    question: 'Como puedo contratar sus servicios?',
    answer: 'Simplemente completa el formulario de contacto o escribenos por WhatsApp. Te respondemos en menos de 24 horas con una propuesta personalizada sin compromiso.'
  }
];

function FAQItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-white/10"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
        aria-expanded={isOpen}
      >
        <span 
          className="text-lg text-white group-hover:text-[#9AD4EA] transition-colors duration-300"
          style={{ fontFamily: 'Akira Expanded' }}
        >
          {faq.question}
        </span>
        <motion.span
          className="text-[#9AD4EA] text-2xl ml-4"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          v
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p 
              className="pb-6 text-[#B8C2D9] leading-relaxed"
              style={{ fontFamily: 'Aurora' }}
            >
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030631] via-[#0a0f1d] to-[#030631]"></div>
      
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-[#9AD4EA] bg-clip-text text-transparent"
            style={{ fontFamily: 'Akira Expanded' }}
          >
            PREGUNTAS FRECUENTES
          </h2>
          <p 
            className="text-xl text-[#B8C2D9] max-w-2xl mx-auto"
            style={{ fontFamily: 'Aurora', fontWeight: 300 }}
          >
            Resolve tus dudas sobre nuestros servicios de diseno y marketing
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8"
        >
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-[#B8C2D9] mb-4" style={{ fontFamily: 'Aurora' }}>
            Tenes otra pregunta?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center text-[#9AD4EA] hover:text-white transition-colors duration-300"
            style={{ fontFamily: 'Akira Expanded' }}
          >
            CONTACTANOS
          </a>
        </motion.div>
      </div>
    </section>
  );
}
