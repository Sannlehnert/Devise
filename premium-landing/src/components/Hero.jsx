import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

export default function Hero() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Configuración de Three.js para el efecto 3D
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    mountRef.current.appendChild(renderer.domElement);
    
    // Crear geometría personalizada para el logo
    const geometry = new THREE.TorusGeometry(3, 1, 16, 100);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x7c3aed,
      shininess: 100,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.2
    });
    
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);
    
    // Añadir luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x7c3aed, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Posicionar cámara
    camera.position.z = 8;
    
    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Ajustar en resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <header className="min-h-screen flex items-center relative overflow-hidden" style={{ paddingTop: '80px' }}>
      {/* Canvas 3D */}
      <div ref={mountRef} className="absolute inset-0 z-0 opacity-30" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold leading-tight mb-6"
              style={{ fontFamily: 'Akira Expanded' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              ELEVA TU <span className="text-accent">MARCA</span> AL SIGUIENTE NIVEL
            </motion.h1>
            
            <motion.p 
              className="text-xl text-subtle mb-8 max-w-2xl"
              style={{ fontFamily: 'Aurora' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Transformamos visiones en realidades con diseño innovador y estrategias que inspiran.
              Tu éxito es nuestra motivación.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <a 
                href="#contacto" 
                className="px-8 py-4 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-all hover:scale-105 shadow-lg shadow-accent/30"
                style={{ fontFamily: 'Akira Expanded' }}
              >
                COMENZAR AHORA
              </a>
              <a 
                href="#portfolio" 
                className="px-8 py-4 border border-white/20 hover:border-accent hover:bg-accent/10 text-white font-semibold rounded-lg transition-all hover:scale-105"
                style={{ fontFamily: 'Akira Expanded' }}
              >
                VER RESULTADOS
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-[#0f172a] to-[#0a0f1d] rounded-2xl p-8 border border-accent/20 shadow-2xl shadow-accent/10">
              <div className="aspect-video bg-gradient-to-r from-accent/20 to-purple-500/10 rounded-xl flex items-center justify-center overflow-hidden relative">
                <img 
                  src="/img/fotoperfil.jpg" 
                  alt="Devise" 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] to-transparent"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}