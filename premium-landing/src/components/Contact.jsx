import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
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

    // Simular envío (en producción integrar con EmailJS/Netlify Forms)
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contacto" className="py-20 relative">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Akira Expanded' }}>
            LLEVEMOS TUS IDEAS AL SIGUIENTE NIVEL
          </h2>
          <p className="text-[#94a3b8] mt-4 max-w-2xl mx-auto" style={{ fontFamily: 'Aurora' }}>
            Contanos sobre tu proyecto y creemos algo increíble juntos.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="grid gap-6 minimal-card p-6 md:p-8"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-[#94a3b8]" style={{ fontFamily: 'Aurora' }}>
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="minimal-input w-full"
                placeholder="Tu nombre completo"
                style={{ fontFamily: 'Aurora' }}
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1" style={{ fontFamily: 'Aurora' }}>
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-[#94a3b8]" style={{ fontFamily: 'Aurora' }}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="minimal-input w-full"
                placeholder="tu@email.com"
                style={{ fontFamily: 'Aurora' }}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1" style={{ fontFamily: 'Aurora' }}>
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-[#94a3b8]" style={{ fontFamily: 'Aurora' }}>
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              className="minimal-input w-full"
              placeholder="Contanos sobre tu proyecto, objetivos y visión..."
              style={{ fontFamily: 'Aurora' }}
            ></textarea>
            {errors.message && (
              <p className="text-red-400 text-sm mt-1" style={{ fontFamily: 'Aurora' }}>
                {errors.message}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="minimal-button bg-gradient-to-r from-[#1C045A] to-[#584485] text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ fontFamily: 'Akira Expanded' }}
            >
              {status === 'sending' ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ENVIANDO...
                </>
              ) : (
                'ENVIAR MENSAJE'
              )}
            </button>

            <div className="text-sm text-[#94a3b8] flex items-center" style={{ fontFamily: 'Aurora' }}>
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1zm11 15a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v10a1 1 0 001 1h11z" clipRule="evenodd" />
              </svg>
              Respondemos en menos de 24h
            </div>
          </div>

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-green-300"
              style={{ fontFamily: 'Aurora' }}
            >
              ✅ Mensaje enviado correctamente. Te contactaremos pronto.
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}