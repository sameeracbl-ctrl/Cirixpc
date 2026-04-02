import React from 'react';
import { motion } from 'motion/react';
import { Facebook, Mail, MessageCircle, Music } from 'lucide-react';

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/1KCanXjNAP/',
    icon: Facebook,
    color: '#1877F2',
    glow: 'rgba(24, 119, 242, 0.6)'
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@sameeraja4?_r=1&_t=ZS-95CuD3jU7gA',
    icon: Music,
    color: '#FE2C55',
    glow: 'rgba(254, 44, 85, 0.6)'
  },
  {
    name: 'Gmail',
    href: 'mailto:computercitrix@gmail.com',
    icon: Mail,
    color: '#EA4335',
    glow: 'rgba(234, 67, 53, 0.6)'
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/94789827123',
    icon: MessageCircle,
    color: '#25D366',
    glow: 'rgba(37, 211, 102, 0.6)'
  }
];

export default function SocialSidebar() {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[9999] hidden md:block">
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex flex-col gap-5 p-4 bg-surface/20 backdrop-blur-2xl border border-white/5 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)]"
      >
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-500"
            whileHover={{ scale: 1.15, x: -10 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              type: 'spring',
              stiffness: 300,
              damping: 20,
              delay: index * 0.1 
            }}
          >
            {/* Neon Cyan Base Glow (Pulsing) */}
            <motion.div
              animate={{
                boxShadow: [
                  `0 0 15px rgba(0, 242, 255, 0.1)`,
                  `0 0 30px rgba(0, 242, 255, 0.3)`,
                  `0 0 15px rgba(0, 242, 255, 0.1)`
                ],
                borderColor: [
                  'rgba(0, 242, 255, 0.1)',
                  'rgba(0, 242, 255, 0.3)',
                  'rgba(0, 242, 255, 0.1)'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-2xl border transition-colors duration-500"
            />

            {/* Brand Glow on Hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"
              style={{ 
                boxShadow: `0 0 40px ${link.glow}, inset 0 0 20px ${link.glow}`,
                background: `radial-gradient(circle at center, ${link.color}33 0%, transparent 80%)`,
                border: `1px solid ${link.color}88`
              }}
            />

            {/* Icon */}
            <link.icon 
              className="w-6 h-6 relative z-10 text-primary/70 group-hover:text-white transition-all duration-500"
              style={{ 
                filter: `drop-shadow(0 0 10px rgba(0, 242, 255, 0.4))` 
              }}
              strokeWidth={1.5}
            />

            {/* Tooltip */}
            <div className="absolute right-full mr-6 px-4 py-2 bg-surface/95 backdrop-blur-xl border border-primary/20 rounded-lg text-[10px] font-black text-primary uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none translate-x-4 group-hover:translate-x-0 shadow-2xl">
              <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-surface rotate-45 border-r border-t border-primary/20"></div>
              {link.name}
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}

