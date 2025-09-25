import React from 'react';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#030631] via-[#0a0f1d] to-[#1C045A] border-t border-white/10">
      {/* Efectos decorativos */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#9AD4EA] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#584485] rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <img 
                  src="/img/devicesinfondo.png" 
                  alt="Devise" 
                  className="h-12 object-contain"
                />
              </div>
              <p className="text-[#B8C2D9] text-lg leading-relaxed max-w-md mb-8" style={{ fontFamily: 'Aurora' }}>
                Llevamos tus ideas al siguiente nivel con estrategias creativas y soluciones innovadoras. 
                Tu éxito es nuestra motivación.
              </p>
            </div>
            
            {/* Enlaces rápidos */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg" style={{ fontFamily: 'Akira Expanded' }}>
                ENLACES RÁPIDOS
              </h4>
              <div className="space-y-3">
                {['Servicios', 'Portfolio', 'Proceso', 'Testimonios', 'Contacto'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-[#94a3b8] hover:text-[#9AD4EA] transition-colors duration-300 py-2"
                    style={{ fontFamily: 'Aurora' }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Contacto */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg" style={{ fontFamily: 'Akira Expanded' }}>
                CONTACTO
              </h4>
              <div className="space-y-4">
                <a
                  href="https://wa.me/5492991234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[#94a3b8] hover:text-[#9AD4EA] transition-colors duration-300 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#1C045A] to-[#584485] rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                    <span className="text-sm">💬</span>
                  </div>
                  <div>
                    <div className="text-white text-sm" style={{ fontFamily: 'Aurora' }}>Redes y Audiovisual</div>
                    <div className="text-xs">+54 9 299 123-4567</div>
                  </div>
                </a>
                
                <a
                  href="https://wa.me/5492999876543"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[#94a3b8] hover:text-[#9AD4EA] transition-colors duration-300 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#584485] to-[#9AD4EA] rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                    <span className="text-sm">🎨</span>
                  </div>
                  <div>
                    <div className="text-white text-sm" style={{ fontFamily: 'Aurora' }}>Diseño Gráfico</div>
                    <div className="text-xs">+54 9 299 987-6543</div>
                  </div>
                </a>
                
                <a
                  href="mailto:info@devise.com"
                  className="flex items-center text-[#94a3b8] hover:text-[#9AD4EA] transition-colors duration-300 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#9AD4EA] to-[#1C045A] rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                    <span className="text-sm">📧</span>
                  </div>
                  <div>
                    <div className="text-white text-sm" style={{ fontFamily: 'Aurora' }}>Email</div>
                    <div className="text-xs">info@devise.com</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          
          {/* Línea separadora */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#94a3b8] text-sm" style={{ fontFamily: 'Aurora' }}>
              © {new Date().getFullYear()} Devise. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-[#94a3b8] text-sm" style={{ fontFamily: 'Aurora' }}>
                Hecho con 💜 por Devise
              </span>
              <span className="text-[#94a3b8] text-sm" style={{ fontFamily: 'Aurora' }}>
                Neuquén, Argentina
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}