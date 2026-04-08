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
            <div 
              className="relative z-10 text-primary/70 group-hover:text-white transition-all duration-500 w-6 h-6 flex items-center justify-center"
              style={{ 
                filter: `drop-shadow(0 0 10px rgba(0, 242, 255, 0.4))` 
              }}
            >
              {link.name === 'Facebook' && <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>}
              {link.name === 'TikTok' && <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.53 1.53-.3 2.7-1.67 2.67-3.22.03-5.45 0-10.89.01-16.34z"/></svg>}
              {link.name === 'Gmail' && <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08c1.618-1.214 3.927-.059 3.927 1.964z"/></svg>}
              {link.name === 'WhatsApp' && <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>}
            </div>

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

