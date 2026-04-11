import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, AlertTriangle, ClipboardCheck, Info, Cpu, HardDrive } from 'lucide-react';

export default function Warranty() {
  return (
    <div className="min-h-screen bg-surface py-24 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-primary/30"></div>
            <span className="text-primary text-[11px] font-black tracking-[0.6em] uppercase block">Service Protocol</span>
            <div className="h-[1px] w-12 bg-primary/30"></div>
          </div>
          <h1 className="font-headline text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6">
            Warranty <span className="text-primary neon-glow-cyan">Policy.</span>
          </h1>
          <p className="text-primary/60 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            At Citrix Computer, we prioritize customer trust. To ensure a smooth experience, the following warranty terms apply to all hardware purchases.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* 1. Warranty Period */}
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center border border-primary/20">
                <ShieldCheck className="text-primary w-6 h-6 shadow-[0_0_10px_rgba(0,242,255,0.5)]" />
              </div>
              <h2 className="font-headline text-2xl font-black text-white uppercase tracking-tight">01. Warranty Period</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-surface-container/40 backdrop-blur-xl border-2 border-primary rounded-sm shadow-[0_0_30px_rgba(0,242,255,0.1)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Cpu className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-primary text-xs font-black uppercase tracking-[0.2em] mb-4">Used Processors & Hardware</h3>
                <p className="text-white text-lg font-bold leading-tight mb-4">
                  All pre-owned (Used) components come with a <span className="text-primary neon-glow-cyan">03-Month (90 Days)</span> Full Warranty.
                </p>
                <div className="flex items-center gap-2 text-[10px] text-primary/40 font-bold uppercase tracking-widest">
                  <Info className="w-3 h-3" />
                  Standard Citrix Coverage
                </div>
              </div>

              <div className="p-8 bg-surface-container/20 backdrop-blur-xl border border-primary/10 rounded-sm hover:border-primary/30 transition-all group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <HardDrive className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-primary/60 text-xs font-black uppercase tracking-[0.2em] mb-4">Brand New Hardware</h3>
                <p className="text-white/80 text-lg font-bold leading-tight mb-4">
                  Manufacturer warranty applies as per the official brand terms.
                </p>
                <div className="flex items-center gap-2 text-[10px] text-primary/40 font-bold uppercase tracking-widest">
                  <Info className="w-3 h-3" />
                  Official Brand Support
                </div>
              </div>
            </div>
          </motion.section>

          {/* 2. Warranty Exclusions */}
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-sm bg-red-500/10 flex items-center justify-center border border-red-500/20">
                <AlertTriangle className="text-red-500 w-6 h-6 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
              </div>
              <h2 className="font-headline text-2xl font-black text-white uppercase tracking-tight">02. Warranty Exclusions</h2>
            </div>

            <div className="bg-surface-container/40 backdrop-blur-xl border border-red-500/20 rounded-sm p-8 md:p-12">
              <p className="text-red-500 text-xs font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                The warranty will be considered VOID under these conditions:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {[
                  { title: 'Physical Damage', desc: 'Any signs of bending, cracking, scratching, or Bent Pins on processors/motherboards.' },
                  { title: 'Burn Damage', desc: 'Components damaged due to unstable power supply, incorrect installation, or short circuits.' },
                  { title: 'Liquid Damage', desc: 'Any exposure to water or other liquids.' },
                  { title: 'Tampering', desc: 'If the item has been opened, repaired by a third party, or modified without our authorization.' },
                  { title: 'Warranty Sticker', desc: 'If the official Citrix Computer warranty sticker is removed, torn, or altered.' }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                      <span className="text-red-500 text-lg">×</span> {item.title}
                    </h4>
                    <p className="text-primary/40 text-xs font-medium leading-relaxed pl-5">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* 3. Testing & Claims */}
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center border border-primary/20">
                <ClipboardCheck className="text-primary w-6 h-6 shadow-[0_0_10px_rgba(0,242,255,0.5)]" />
              </div>
              <h2 className="font-headline text-2xl font-black text-white uppercase tracking-tight">03. Testing & Claims</h2>
            </div>

            <div className="bg-surface-container/20 backdrop-blur-xl border border-primary/10 rounded-sm p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shadow-[0_0_5px_rgba(0,242,255,1)]"></div>
                <p className="text-white/80 text-sm font-medium leading-relaxed">
                  All items are 100% tested before being handed over to the customer.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shadow-[0_0_5px_rgba(0,242,255,1)]"></div>
                <p className="text-white/80 text-sm font-medium leading-relaxed">
                  In the event of a warranty claim, the item must be left with our technical team for inspection. This process may take a few working days.
                </p>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Footer Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          <p className="text-[10px] font-black text-primary/20 uppercase tracking-[0.5em]">
            Citrix Computer Systems | Quality Assurance Protocol
          </p>
        </motion.div>
      </div>
    </div>
  );
}
