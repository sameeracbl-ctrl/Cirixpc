import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const WelcomePanelBorder = ({ isHovered }: { isHovered: boolean }) => {
  const containerRef = React.useRef<SVGSVGElement>(null);
  const [pathData, setPathData] = useState("");

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const notch = 10;
      
      // Path points matching the clip-path:
      // polygon(0% 10px, 10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%)
      const d = `
        M 0 ${notch} 
        L ${notch} 0 
        L ${width} 0 
        L ${width} ${height - notch} 
        L ${width - notch} ${height} 
        L 0 ${height} 
        Z
      `;
      setPathData(d);
    };

    const observer = new ResizeObserver(updatePath);
    if (containerRef.current) observer.observe(containerRef.current.parentElement!);
    updatePath();

    return () => observer.disconnect();
  }, []);

  return (
    <svg ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
      <defs>
        <linearGradient id="welcome-beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#ADD8E6" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      {/* Static thin border */}
      <path 
        d={pathData}
        fill="none" 
        stroke="#ADD8E6" 
        strokeWidth="1"
        className="opacity-20"
      />
      {/* Animated beam */}
      <path 
        d={pathData}
        fill="none" 
        stroke="url(#welcome-beam-gradient)" 
        strokeWidth="2"
        pathLength="100"
        strokeDasharray="20 80"
        className={`animate-border-slide-fast ${isHovered ? 'speed-up' : ''}`}
        style={{ 
          filter: 'drop-shadow(0 0 5px #ADD8E6)',
          animationDuration: isHovered ? '1.5s' : '3s'
        }}
      />
    </svg>
  );
};

export default function WelcomePanel() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative z-50 inline-block mt-4 group cursor-default"
    >
      {/* Small Panel Container */}
      <motion.div 
        animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
        className="relative px-6 py-4 bg-surface/40 backdrop-blur-md border border-[#ADD8E6]/10 overflow-hidden"
        style={{ clipPath: 'polygon(0% 10px, 10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%)' }}
      >
        {/* Sliding Neon Border */}
        <WelcomePanelBorder isHovered={isHovered} />

        {/* Pulse Glow on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#ADD8E6]/5 pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 20px rgba(173, 216, 230, 0.2)'
              }}
            />
          )}
        </AnimatePresence>

        {/* Welcome Text */}
        <div className="relative z-10 flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] leading-none mb-1 neon-glow-lightblue-dual opacity-80">
            WELCOME TO
          </span>
          <h2 className="font-headline text-xl md:text-2xl font-black uppercase tracking-tighter leading-none neon-glow-lightblue-dual">
            CITRIX HOME
          </h2>
        </div>
      </motion.div>

      {/* Subtle Pulse Animation for the whole panel */}
      {isHovered && (
        <motion.div
          layoutId="pulse-ring"
          className="absolute inset-0 border border-[#ADD8E6]/30 rounded-sm pointer-events-none"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: [0, 0.5, 0], scale: [1, 1.1, 1.2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}
