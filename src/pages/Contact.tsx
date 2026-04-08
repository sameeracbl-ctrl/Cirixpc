import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, MessageCircle, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const whatsappUrl = "https://wa.me/94789827123";
  const emailUrl = "mailto:computercitrix@gmail.com";

  return (
    <div className="min-h-screen bg-surface py-24 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center md:text-left"
        >
          <div className="flex items-center gap-4 mb-4 justify-center md:justify-start">
            <div className="h-[1px] w-12 bg-primary/30"></div>
            <span className="text-primary text-[11px] font-black tracking-[0.6em] uppercase block">Contact Protocol</span>
          </div>
          <h1 className="font-headline text-4xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6">
            Get in <span className="text-primary neon-glow-cyan">Touch.</span>
          </h1>
          <p className="text-primary/60 text-sm md:text-base font-medium max-w-2xl leading-relaxed uppercase tracking-widest">
            Visit our flagship store in Galle or reach out through our digital channels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="p-8 bg-surface-container/40 backdrop-blur-xl border border-primary/10 rounded-sm group hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center border border-primary/20 mb-6 group-hover:neon-glow-cyan transition-all">
                  <MapPin className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-4 location-tag">Location</h3>
                <p className="text-primary/60 text-sm font-bold uppercase tracking-tight leading-relaxed address-text">
                  Main Street,<br />
                  Galle, Sri Lanka
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-8 bg-surface-container/40 backdrop-blur-xl border border-primary/10 rounded-sm group hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center border border-primary/20 mb-6 group-hover:neon-glow-cyan transition-all">
                  <Clock className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-4 hours-tag">Business Hours</h3>
                <p className="text-primary/60 text-sm font-bold uppercase tracking-tight leading-relaxed business-hours-text">
                  Mon - Sat: 9:00 AM - 7:00 PM<br />
                  Sun: Closed
                </p>
              </motion.div>
            </div>

            <div className="space-y-4">
              <motion.a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-6 p-6 bg-[#25D366]/5 border border-[#25D366]/20 rounded-sm hover:bg-[#25D366]/10 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center border border-[#25D366]/30 group-hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all">
                  <MessageCircle className="text-[#25D366] w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-[#25D366] uppercase tracking-[0.3em] block mb-1 contact-info-label">WhatsApp Support</span>
                  <p className="text-white font-bold text-lg tracking-tight contact-details">+94 78 982 7123</p>
                </div>
              </motion.a>

              <motion.a 
                href={emailUrl}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-6 p-6 bg-primary/5 border border-primary/20 rounded-sm hover:bg-primary/10 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:neon-glow-cyan transition-all">
                  <Mail className="text-primary w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] block mb-1 contact-info-label">Email Protocol</span>
                  <p className="text-white font-bold text-lg tracking-tight contact-details">computercitrix@gmail.com</p>
                </div>
              </motion.a>

              {/* Premium Social Row */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-6 pt-4 justify-center md:justify-start"
              >
                <a href="https://wa.me/94789827123" target="_blank" rel="noopener noreferrer" className="social-icon-premium" title="WhatsApp">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
                <a href="https://www.facebook.com/share/1KCanXjNAP/" target="_blank" rel="noopener noreferrer" className="social-icon-premium" title="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.tiktok.com/@sameeraja4" target="_blank" rel="noopener noreferrer" className="social-icon-premium" title="TikTok">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.53 1.53-.3 2.7-1.67 2.67-3.22.03-5.45 0-10.89.01-16.34z"/></svg>
                </a>
                <a href="mailto:computercitrix@gmail.com" className="social-icon-premium" title="Gmail">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08c1.618-1.214 3.927-.059 3.927 1.964z"/></svg>
                </a>
              </motion.div>
            </div>
          </div>

          {/* Map */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="relative aspect-square lg:aspect-auto h-full min-h-[450px] bg-surface-container/40 border border-primary/20 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(0,242,255,0.1)]"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.579461141723!2d80.21440787413662!3d6.052296493933481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae17300456185bb%3A0xc07a2761899148d!2sCitrix%20Computer!5e0!3m2!1sen!2slk!4v1712404700000!5m2!1sen!2slk" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale brightness-75 contrast-125 hover:grayscale-0 hover:brightness-100 transition-all duration-700"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none border-[20px] border-surface-container/20"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
