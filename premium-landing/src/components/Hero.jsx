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
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    mountRef.current.appendChild(renderer.domElement);

    // Crear geometría personalizada para el logo
    const geometry = new THREE.TorusGeometry(3, 1, 16, 100);
    const material = new THREE.MeshPhongMaterial({
      color: 0x1C045A,
      shininess: 100,
      emissive: 0x584485,
      emissiveIntensity: 0.3,
      specular: 0x9AD4EA
    });

    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    // Añadir luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x1C045A, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x584485, 0.8);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Posicionar cámara
    camera.position.z = 8;

    // Partículas de fondo
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;

    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
      colorArray[i] = Math.random();
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animación
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      torus.rotation.x = elapsedTime * 0.1;
      torus.rotation.y = elapsedTime * 0.05;

      particlesMesh.rotation.y = -elapsedTime * 0.05;

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
      <div ref={mountRef} className="absolute inset-0 z-0 opacity-40" />

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
              ELEVA TU <span className="text-[#9AD4EA]">MARCA</span> AL <span className="text-[#584485]">SIGUIENTE NIVEL</span>
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
                className="px-8 py-4 bg-gradient-to-r from-[#1C045A] to-[#584485] hover:from-[#584485] hover:to-[#1C045A] text-white font-semibold rounded-lg transition-all hover:scale-105 shadow-lg shadow-[#1C045A]/30 relative overflow-hidden group"
                style={{ fontFamily: 'Akira Expanded' }}
              >
                <span className="relative z-10">COMENZAR AHORA</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#584485] to-[#1C045A] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a
                href="#portfolio"
                className="px-8 py-4 border border-white/20 hover:border-[#9AD4EA] hover:bg-[#9AD4EA]/10 text-white font-semibold rounded-lg transition-all hover:scale-105 group"
                style={{ fontFamily: 'Akira Expanded' }}
              >
                <span className="group-hover:text-[#9AD4EA] transition-colors">VER RESULTADOS</span>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-[#0f172a] to-[#0a0f1d] rounded-2xl p-8 border border-[#1C045A]/20 shadow-2xl shadow-[#1C045A]/10 relative overflow-hidden">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#1C045A] via-[#584485] to-[#1C045A] opacity-20 blur-lg"></div>
              <div className="aspect-video bg-gradient-to-r from-[#1C045A]/20 to-[#584485]/10 rounded-xl flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/img/fotoperfil.jpg"
                    alt="Devise"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] to-transparent"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}