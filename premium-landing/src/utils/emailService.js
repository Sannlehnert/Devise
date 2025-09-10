export const sendEmail = (formData) => {
  // En desarrollo, simula el envío
  if (process.env.NODE_ENV === 'development') {
    console.log('Simulando envío de email:', formData);
    return Promise.resolve({ status: 200, text: 'OK' });
  }
  
  // En producción, integra con EmailJS
  return window.emailjs.send(
    process.env.VITE_EMAILJS_SERVICE_ID,
    process.env.VITE_EMAILJS_TEMPLATE_ID,
    formData,
    process.env.VITE_EMAILJS_PUBLIC_KEY
  );
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateForm = (formData) => {
  const errors = {};
  
  if (!formData.name?.trim()) errors.name = 'Nombre es requerido';
  if (!validateEmail(formData.email)) errors.email = 'Email no válido';
  if (!formData.message?.trim()) errors.message = 'Mensaje es requerido';
  
  return errors;
};