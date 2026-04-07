import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const heroImages = [
  "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1629813204780-f046a2a0953a?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1920&auto=format&fit=crop",
];

interface HeroSectionProps {
  onStartBuild: () => void;
  techSupportUrl: string;
}

export default function HeroSection({ onStartBuild, techSupportUrl }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[70vh] md:h-[90vh] min-h-[500px] md:min-h-[700px] overflow-hidden border-b border-gray-100">
      {/* Slideshow Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroImages[currentSlide]}
            alt="Premium Gaming Hardware"
            className="w-full h-full object-cover brightness-[0.9] scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Subtle Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent opacity-90"></div>
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay - Centered on Mobile, Middle-Left on Desktop */}
      <div className="relative z-10 h-full max-w-screen-2xl mx-auto px-4 md:px-12 flex flex-col justify-center items-center md:items-start text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-3xl w-full"
        >
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-auto">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStartBuild}
              className="w-full md:w-auto px-10 py-4 bg-black text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-lg transition-all"
            >
              Start Your Build
            </motion.button>
            <a 
              href={techSupportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto px-10 py-4 border border-gray-200 text-black font-black text-[10px] uppercase tracking-[0.3em] hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              Technical Support
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-10"></div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 flex gap-3 z-20">
        {heroImages.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1 transition-all duration-500 ${i === currentSlide ? 'bg-black w-12' : 'bg-gray-200 w-6 hover:bg-gray-400'}`}
          />
        ))}
      </div>
    </section>
  );
}
