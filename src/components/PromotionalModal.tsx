import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function PromotionalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('citrix_promo_seen');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('citrix_promo_seen', 'true');
  };

  const handleViewOffers = () => {
    handleClose();
    navigate('/deals');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-surface/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-sm border-2 border-primary/30 bg-[#020617]/90 p-8 shadow-[0_0_50px_rgba(0,242,255,0.2)] backdrop-blur-2xl md:p-12"
          >
            {/* Animated Border Glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 border-2 border-primary/50 animate-pulse shadow-[inset_0_0_20px_rgba(0,242,255,0.2)]" />
              <div className="absolute -inset-[2px] bg-gradient-to-r from-primary via-gold to-secondary opacity-30 blur-sm animate-border-flow" />
            </div>

            {/* Digital Matrix Background Pattern */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] animate-scroll-slow" />
              <div className="grid grid-cols-10 gap-1 h-full w-full">
                {Array.from({ length: 100 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
                    className="h-full w-full border-[0.5px] border-primary/20"
                  />
                ))}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 z-50 text-primary/40 hover:text-primary transition-all hover:scale-110"
            >
              <span className="material-symbols-outlined text-3xl neon-glow-cyan">close</span>
            </button>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-primary text-[10px] font-black tracking-[0.6em] uppercase mb-4 block neon-glow-cyan">
                  Foundry Alert Protocol
                </span>
                <h2 className="font-headline text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
                  LIMITED TIME <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-gold to-secondary neon-glow-cyan">
                    CYBER DEALS
                  </span>
                </h2>
              </motion.div>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-primary/60 text-sm md:text-base max-w-md mb-10 font-medium leading-relaxed"
              >
                Grab the best prices on Processors, GPUs, and Custom Builds. 
                Exclusive discounts for Citrix Computer customers!
              </motion.p>

              {/* Offer Badge */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: 0.4, 
                  type: 'spring', 
                  damping: 12, 
                  stiffness: 200 
                }}
                className="relative mb-12 group"
              >
                <div className="absolute inset-0 bg-gold blur-2xl opacity-30 group-hover:opacity-50 transition-opacity animate-pulse" />
                <div className="relative bg-gradient-to-br from-gold via-amber-400 to-gold px-8 py-4 rounded-sm border border-white/20 shadow-[0_0_30px_rgba(255,215,0,0.4)] transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                  <span className="font-headline text-3xl md:text-5xl font-black text-surface uppercase tracking-tighter italic">
                    UP TO 30% OFF
                  </span>
                </div>
                <div className="absolute -top-4 -right-4 bg-primary text-surface text-[10px] font-black px-3 py-1 rounded-sm shadow-lg animate-bounce">
                  BIG DEALS INSIDE
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={handleViewOffers}
                className="group relative px-12 py-5 overflow-hidden rounded-sm"
              >
                <div className="absolute inset-0 bg-primary animate-pulse shadow-[0_0_30px_rgba(0,242,255,0.5)]" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 font-headline text-lg font-black text-surface uppercase tracking-[0.2em] flex items-center gap-3">
                  VIEW OFFERS NOW
                  <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </span>
              </motion.button>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={handleClose}
                className="mt-8 text-[10px] font-bold text-primary/30 uppercase tracking-widest hover:text-primary/60 transition-colors"
              >
                Dismiss for now
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
