import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';

// ✅ Configuración CORRECTA de EmailJS
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_qix8jhb',
  TEMPLATE_ID: 'template_lt3xuk4',
  PUBLIC_KEY: 'QuKQ7miwt33lga1bh'
};

// Inicializar EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Nombre es requerido';
    if (!form.email.trim()) newErrors.email = 'Email es requerido';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email no válido';
    if (!form.phone.trim()) newErrors.phone = 'Teléfono es requerido';
    if (!form.service.trim()) newErrors.service = 'Seleccioná un servicio';
    if (!form.message.trim()) newErrors.message = 'Mensaje es requerido';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setStatus('sending');

    try {
      // ✅ Envío REAL con EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: 'santiagolehnert2016@gmail.com', // Cambiar por el email del cliente
          date: new Date().toLocaleString('es-AR')
        }
      );

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error enviando email:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contacto" className="py-28 relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#030631]/50 via-[#0a0f1d]/30 to-[#1C045A]/20"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-[#9AD4EA] bg-clip-text text-transparent" style={{ fontFamily: 'Akira Expanded' }}>
            HABLEMOS DE TU PROYECTO
          </h2>
          <p className="text-xl text-[#B8C2D9] max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Aurora', fontWeight: 300 }}>
            ¿Listo para llevar <span className="text-devise-accent font-bold">TU MARCA</span> al siguiente nivel?
            Contanos sobre <span className="text-devise-accent font-bold">TU PROYECTO</span> y creemos algo extraordinario{' '}
            <span className="text-devise-accent font-bold">JUNTOS</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1C045A] to-[#584485] rounded-3xl blur-xl opacity-10"></div>

          <form
            onSubmit={handleSubmit}
            className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10 max-w-2xl mx-auto shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <label htmlFor="name" className="block text-lg font-medium mb-4 text-[#94a3b8]" style={{ fontFamily: 'Aurora' }}>
                  👤 Nombre completo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className="input-devise-minimal w-full"
                  placeholder="Tu nombre"
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-sm mt-2 flex items-center"
                    style={{ fontFamily: 'Aurora' }}
                  >
                    ⚠️ {errors.name}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <label htmlFor="email" className="block text-lg font-medium mb-4 text-[#94a3b8]" style={{ fontFamily: 'Aurora' }}>
                  📧 Email profesional
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="input-devise-minimal w-full"
                  placeholder="tu@empresa.com"
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-sm mt-2 flex items-center"
                    style={{ fontFamily: 'Aurora' }}
                  >
                    ⚠️ {errors.email}
                  </motion.p>
                )}
              </motion.div>
            </div>

            {/* Nueva fila: Teléfono y Servicio */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <label htmlFor="phone" className="block text-lg font-medium mb-4 text-[#94a3b8]" style={{ fontFamily: 'Aurora' }}>
                  📱 Teléfono (WhatsApp)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className="input-devise-minimal w-full"
                  placeholder="+54 9 299 000-0000"
                />
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-sm mt-2 flex items-center"
                    style={{ fontFamily: 'Aurora' }}
                  >
                    ⚠️ {errors.phone}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <label htmlFor="service" className="block text-lg font-medium mb-4 text-[#94a3b8]" style={{ fontFamily: 'Aurora' }}>
                  🎯 Servicio de interés
                </label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="input-devise-minimal w-full"
                >
                  <option value="">Seleccioná un servicio</option>
                  <option value="Diseño Gráfico">Diseño Gráfico</option>
                  <option value="Videos & Reels">Videos & Reels</option>
                  <option value="Fotografía">Fotografía</option>
                  <option value="Estampado">Estampado</option>
                  <option value="Otro">Otro</option>
                </select>
                {errors.service && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-sm mt-2 flex items-center"
                    style={{ fontFamily: 'Aurora' }}
                  >
                    ⚠️ {errors.service}
                  </motion.p>
                )}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <label htmlFor="message" className="block text-lg font-medium mb-4 text-[#94a3b8]" style={{ fontFamily: 'Aurora' }}>
                💬 Contanos sobre tu proyecto
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={form.message}
                onChange={handleChange}
                className="ultimate-input w-full"
                placeholder="Describí tu visión, objetivos, timeline y cualquier detalle relevante..."
              ></textarea>
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm mt-2 flex items-center"
                  style={{ fontFamily: 'Aurora' }}
                  >
                    ⚠️ {errors.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-between gap-6"
              >
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-devise-minimal w-full"
                  whileHover={{ scale: status !== 'sending' ? 1.05 : 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {status === 'sending' ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                      ENVIANDO...
                    </span>
                  ) : status === 'success' ? (
                    '✅ MENSAJE ENVIADO'
                  ) : (
                    'ENVIAR MENSAJE'
                  )}
                </motion.button>

                <div className="text-sm text-[#94a3b8] flex items-center" style={{ fontFamily: 'Aurora' }}>
                  <div className="w-2 h-2 bg-[#9AD4EA] rounded-full mr-3 animate-pulse"></div>
                  Respuesta garantizada en menos de 24h
                </div>
              </motion.div>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl text-green-300 text-center backdrop-blur-sm"
                  style={{ fontFamily: 'Aurora' }}
                >
                  🎉 ¡Mensaje enviado correctamente! Te contactaremos dentro de las próximas 24 horas.
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 p-4 bg-gradient-to-r from-red-900/20 to-pink-900/20 border border-red-500/30 rounded-xl text-red-300 text-center backdrop-blur-sm"
                  style={{ fontFamily: 'Aurora' }}
                >
                  ❌ Hubo un error al enviar el mensaje. Por favor, intenta nuevamente o contáctanos directamente.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    );
  }
