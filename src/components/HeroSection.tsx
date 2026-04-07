import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const heroImages = [
  "/slider1.jpg",
  "/slider2.jpg",
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
    <section className="relative w-full h-[70vh] md:h-[90vh] min-h-[500px] md:min-h-[700px] overflow-hidden border-b border-white/5 bg-black">
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
            className="w-full h-full object-cover brightness-[0.7] scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Subtle Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
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
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="text-accent text-[10px] md:text-[12px] font-black tracking-[0.5em] uppercase mb-6 block"
          >
            Premium Hardware Foundry
          </motion.span>
          <h1 className="font-headline text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
            Build Your <br/>
            <span className="text-gray-500">Legacy.</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-lg max-w-xl mb-12 font-medium leading-relaxed uppercase tracking-wide">
            Custom engineered workstations and gaming rigs. <br className="hidden md:block"/>
            Performance without compromise.
          </p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-auto">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStartBuild}
              className="w-full md:w-auto px-10 py-4 bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all"
            >
              Start Your Build
            </motion.button>
            <a 
              href={techSupportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto px-10 py-4 border border-white/20 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              Technical Support
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em]">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="material-symbols-outlined text-white/40 text-2xl">expand_more</span>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-12 hidden md:flex gap-3 z-20">
        {heroImages.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1 transition-all duration-500 ${i === currentSlide ? 'bg-white w-12' : 'bg-white/20 w-6 hover:bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  );
}
