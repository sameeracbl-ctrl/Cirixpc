import React from 'react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onStartBuild: () => void;
  techSupportUrl: string;
}

export default function HeroSection({ onStartBuild, techSupportUrl }: HeroSectionProps) {
  return (
    <div className="hero-container">
      {/* SLIDESHOW ENGINE */}
      <div className="slideshow">
        <div className="slide"></div>
        <div className="slide"></div>
        <div className="slide"></div>
        <div className="slide"></div>
      </div>

      {/* HERO CONTENT */}
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-4xl w-full px-4"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="text-[#00ccff] text-[12px] md:text-[14px] font-black tracking-[0.6em] uppercase mb-8 block font-headline"
          >
            Premium Hardware Foundry
          </motion.span>
          <h1 className="font-headline text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-10">
            Build Your <br/>
            <span className="text-neutral-700">Legacy.</span>
          </h1>
          <p className="text-neutral-400 text-sm md:text-xl max-w-2xl mx-auto mb-14 font-medium leading-relaxed uppercase tracking-widest">
            Custom engineered workstations and gaming rigs. <br className="hidden md:block"/>
            Performance without compromise.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center w-full md:w-auto">
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: '#00ccff', color: '#000' }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartBuild}
              className="px-12 py-5 bg-white text-black font-black text-[11px] uppercase tracking-[0.4em] rounded-xl shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all"
            >
              Start Your Build
            </motion.button>
            <a 
              href={techSupportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-5 border border-white/10 text-white font-black text-[11px] uppercase tracking-[0.4em] rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2"
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.5em]">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="material-symbols-outlined text-white/50 text-3xl">expand_more</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
