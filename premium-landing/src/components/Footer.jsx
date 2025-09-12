import React from 'react';

export default function Footer() {
  return (
    <footer className="py-16 bg-[#0a0f1d] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="/img/devicesinfondo.png" 
                alt="Devise" 
                className="h-12 object-contain"
              />
            </div>
            <p className="text-[#94a3b8] max-w-md mt-2 mb-8" style={{ fontFamily: 'Aurora' }}>
              Llevamos tus ideas al siguiente nivel con estrategias creativas y soluciones innovadoras.
              Tu éxito es nuestra motivación.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg" style={{ fontFamily: 'Akira Expanded' }}>
              CONTACTO DIRECTAMENTE
            </h4>
            
            <div className="space-y-4">
              <a
                href="https://wa.me/5492991234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-[#1C045A]/20 hover:bg-[#1C045A]/30 border border-[#584485]/30 rounded-lg p-4 transition-all group"
              >
                <div className="bg-[#584485] rounded-full p-2 mr-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488"/>
                  </svg>
                </div>
                <div>
                  <h5 className="text-white font-semibold" style={{ fontFamily: 'Akira Expanded' }}>Redes y Audiovisual</h5>
                  <p className="text-[#9AD4EA] text-sm" style={{ fontFamily: 'Aurora' }}>+54 9 299 123-4567</p>
                </div>
              </a>
              
              <a
                href="https://wa.me/5492999876543"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-[#1C045A]/20 hover:bg-[#1C045A]/30 border border-[#584485]/30 rounded-lg p-4 transition-all group"
              >
                <div className="bg-[#584485] rounded-full p-2 mr-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488"/>
                  </svg>
                </div>
                <div>
                  <h5 className="text-white font-semibold" style={{ fontFamily: 'Akira Expanded' }}>Diseño Gráfico</h5>
                  <p className="text-[#9AD4EA] text-sm" style={{ fontFamily: 'Aurora' }}>+54 9 299 987-6543</p>
                </div>
              </a>
              
              <a
                href="mailto:info@devise.com"
                className="flex items-center bg-[#1C045A]/20 hover:bg-[#1C045A]/30 border border-[#584485]/30 rounded-lg p-4 transition-all group"
              >
                <div className="bg-[#584485] rounded-full p-2 mr-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12.713l-11.985-9.713h23.970l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
                  </svg>
                </div>
                <div>
                  <h5 className="text-white font-semibold" style={{ fontFamily: 'Akira Expanded' }}>Email</h5>
                  <p className="text-[#9AD4EA] text-sm" style={{ fontFamily: 'Aurora' }}>info@devise.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#94a3b8] text-sm" style={{ fontFamily: 'Aurora' }}>
            © {new Date().getFullYear()} Devise. Todos los derechos reservados.
          </p>
          <p className="text-[#94a3b8] text-sm mt-4 md:mt-0" style={{ fontFamily: 'Aurora' }}>
            Hecho con ❤️ por Devise
          </p>
        </div>
      </div>
    </footer>
  );
}