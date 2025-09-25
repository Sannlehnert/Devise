import React, { useEffect, useState } from 'react';

const motivationalQuotes = [

];

export default function BackgroundMotivation() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-15">
      <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 rotate-12">
        <p className="text-2xl font-bold text-[#1C045A]" style={{ fontFamily: 'Akira Expanded', textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
          {motivationalQuotes[currentQuote]}
        </p>
      </div>
      <div className="absolute bottom-1/3 right-1/4 transform translate-x-1/2 translate-y-1/2 -rotate-6">
        <p className="text-xl text-[#584485]" style={{ fontFamily: 'Constantine', textShadow: '0 0 8px rgba(255,255,255,0.2)' }}>
          {motivationalQuotes[(currentQuote + 1) % motivationalQuotes.length]}
        </p>
      </div>
      <div className="absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 rotate-3">
        <p className="text-lg text-[#9AD4EA]" style={{ fontFamily: 'Aurora', textShadow: '0 0 5px rgba(255,255,255,0.1)' }}>
          {motivationalQuotes[(currentQuote + 2) % motivationalQuotes.length]}
        </p>
      </div>
      
      {/* Efectos de partículas */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: Math.random() * 10 + 5 + 'px',
              height: Math.random() * 10 + 5 + 'px',
              background: `radial-gradient(circle, rgba(${i % 3 === 0 ? '28,4,90' : i % 3 === 1 ? '88,68,133' : '154,212,234'}, ${0.1 + Math.random() * 0.2}) 0%, transparent 70%)`,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 15 + 's',
              animationDuration: (15 + Math.random() * 25) + 's'
            }}
          />
        ))}
      </div>
    </div>
  );
}