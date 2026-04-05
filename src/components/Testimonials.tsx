import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'motion/react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const REVIEWS = [
  {
    name: "Sanka",
    comment: "Best place in Galle for high-end PC builds. Extremely professional service!",
    rating: 5
  },
  {
    name: "Lahiru Madusha",
    comment: "Found the perfect i7 used processor here. Performance is 100% as promised.",
    rating: 5
  },
  {
    name: "Pasindu Kalhara",
    comment: "Excellent repair service. They fixed my laptop's chip-level issue within a day.",
    rating: 5
  },
  {
    name: "Pawan Lakshan",
    comment: "Reasonable prices and very friendly staff. Highly recommended for gamers!",
    rating: 5
  },
  {
    name: "Lakmal Gamage",
    comment: "Got a brand new Ryzen setup. The cable management was top-notch. Truly Citrix quality!",
    rating: 5
  },
  {
    name: "Wasantha Ranathunga",
    comment: "Trustworthy place for used hardware. Everything is thoroughly tested.",
    rating: 5
  },
  {
    name: "Maleesha Gamage",
    comment: "Their customer support is great. Answered all my technical questions patiently.",
    rating: 5
  },
  {
    name: "Kavindu Prasad",
    comment: "Premium experience. The website makes it so easy to browse their inventory.",
    rating: 5
  },
  {
    name: "Ayesha Madurangi",
    comment: "Very reliable shop. Bought a workstation PC and it's working perfectly for my design work.",
    rating: 5
  }
];

// Triple the reviews for a seamless infinite scroll effect
const EXTENDED_REVIEWS = [...REVIEWS, ...REVIEWS, ...REVIEWS];

export default function Testimonials() {
  // Start at the beginning of the middle set
  const [currentIndex, setCurrentIndex] = useState(REVIEWS.length);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      // If we reach the end of the middle set + some buffer, we'll handle the jump in the animation end or just let it loop
      // For simplicity in this implementation, we'll wrap around the extended array
      return nextIndex >= REVIEWS.length * 2 ? REVIEWS.length : nextIndex;
    });
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => {
      const nextIndex = prev - 1;
      return nextIndex < REVIEWS.length ? REVIEWS.length * 2 - 1 : nextIndex;
    });
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      next();
    }, 6000); // Slow auto-scroll (6 seconds)
    return () => clearInterval(interval);
  }, [isPaused, next]);

  // Calculate card width accounting for gap-6 (24px)
  const cardWidth = useMemo(() => {
    return `calc(${100 / visibleCards}% - ${(24 * (visibleCards - 1)) / visibleCards}px)`;
  }, [visibleCards]);

  return (
    <section 
      className="py-24 bg-surface relative overflow-hidden border-t border-primary/10 group/section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-4 md:px-12 mb-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-primary/30"></div>
            <span className="text-primary text-[11px] font-black tracking-[0.6em] uppercase block">Client Feedback</span>
            <div className="h-[1px] w-12 bg-primary/30"></div>
          </div>
          <h2 className="font-headline text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">
            Trusted by <span className="text-primary neon-glow-cyan">Professionals.</span>
          </h2>
          <p className="text-primary/40 text-xs md:text-sm font-bold tracking-[0.2em] uppercase max-w-2xl mx-auto">
            Experience the Citrix standard through the eyes of our valued customers.
          </p>
        </motion.div>
      </div>

      {/* Slider Container */}
      <div className="relative max-w-screen-2xl mx-auto px-4 md:px-12">
        {/* Navigation Arrows - Appear/Glow on Hover */}
        <div className={`absolute -left-2 md:left-2 top-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          <button 
            onClick={prev}
            className="w-12 h-12 flex items-center justify-center bg-surface-container/80 backdrop-blur-md border border-primary/30 rounded-full text-primary hover:bg-primary hover:text-surface hover:shadow-[0_0_25px_rgba(0,242,255,0.8)] transition-all group/btn"
          >
            <ChevronLeft className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
        <div className={`absolute -right-2 md:right-2 top-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <button 
            onClick={next}
            className="w-12 h-12 flex items-center justify-center bg-surface-container/80 backdrop-blur-md border border-primary/30 rounded-full text-primary hover:bg-primary hover:text-surface hover:shadow-[0_0_25px_rgba(0,242,255,0.8)] transition-all group/btn"
          >
            <ChevronRight className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>

        <div 
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div 
            className="flex gap-6"
            animate={{ x: `-${currentIndex * (100 / visibleCards)}%` }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 1
            }}
          >
            {EXTENDED_REVIEWS.map((review, idx) => (
              <div 
                key={`${review.name}-${idx}`}
                className="flex-shrink-0"
                style={{ width: cardWidth }}
              >
                <div className="h-full p-8 bg-surface-container/60 backdrop-blur-xl border border-primary/10 rounded-2xl transition-all duration-500 hover:border-primary/40 hover:neon-border-cyan hover:shadow-[0_0_30px_rgba(0,242,255,0.15)] relative overflow-hidden group">
                  {/* Subtle Grid Pattern Overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                  
                  <div className="relative z-10">
                    <div className="flex gap-1 mb-6">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary shadow-[0_0_10px_rgba(0,242,255,0.5)]" />
                      ))}
                    </div>
                    
                    <p className="text-white text-sm md:text-base font-medium leading-relaxed mb-8 italic min-h-[100px]">
                      "{review.comment}"
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-sm shadow-[0_0_15px_rgba(0,242,255,0.3)]">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-white font-black text-sm uppercase tracking-widest">{review.name}</h4>
                        <span className="text-primary/40 text-[10px] font-bold uppercase tracking-tighter">Verified Customer</span>
                      </div>
                    </div>
                  </div>

                  {/* Cybernetic Accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-primary">
                      <path d="M100 0 L100 100 L0 0 Z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Indicators - Only for the middle set */}
        <div className="flex justify-center gap-2 mt-12">
          {REVIEWS.map((_, idx) => {
            const actualIndex = idx + REVIEWS.length;
            const isActive = currentIndex % REVIEWS.length === idx;
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(actualIndex)}
                className={`h-1 transition-all duration-500 ${isActive ? 'w-8 bg-primary shadow-[0_0_10px_rgba(0,242,255,0.8)]' : 'w-2 bg-primary/20'}`}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="mt-20 max-w-screen-2xl mx-auto px-4 md:px-12">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      </div>
    </section>
  );
}
