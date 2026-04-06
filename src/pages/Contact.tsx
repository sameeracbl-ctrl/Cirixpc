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
                <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-4">Location</h3>
                <p className="text-primary/60 text-sm font-bold uppercase tracking-tight leading-relaxed">
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
                <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-4">Business Hours</h3>
                <p className="text-primary/60 text-sm font-bold uppercase tracking-tight leading-relaxed">
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
                  <span className="text-[10px] font-black text-[#25D366] uppercase tracking-[0.3em] block mb-1">WhatsApp Support</span>
                  <p className="text-white font-bold text-lg tracking-tight">+94 78 982 7123</p>
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
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] block mb-1">Email Protocol</span>
                  <p className="text-white font-bold text-lg tracking-tight">computercitrix@gmail.com</p>
                </div>
              </motion.a>
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
