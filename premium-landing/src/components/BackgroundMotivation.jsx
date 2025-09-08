import React, { useEffect, useState } from 'react';

const motivationalQuotes = [
  "Tu visión merece la mejor expresión",
  "Creamos experiencias que inspiran",
  "El diseño es donde la ciencia y el arte se equilibran",
  "Innovar es encontrar nuevas formas de hacer lo mismo",
  "Tu éxito es nuestra motivación"
];

export default function BackgroundMotivation() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
      <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 rotate-12">
        <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Akira Expanded' }}>
          {motivationalQuotes[currentQuote]}
        </p>
      </div>
      <div className="absolute bottom-1/3 right-1/4 transform translate-x-1/2 translate-y-1/2 -rotate-6">
        <p className="text-xl text-accent" style={{ fontFamily: 'Constantine' }}>
          {motivationalQuotes[(currentQuote + 1) % motivationalQuotes.length]}
        </p>
      </div>
      <div className="absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 rotate-3">
        <p className="text-lg text-subtle" style={{ fontFamily: 'Aurora' }}>
          {motivationalQuotes[(currentQuote + 2) % motivationalQuotes.length]}
        </p>
      </div>
    </div>
  );
}