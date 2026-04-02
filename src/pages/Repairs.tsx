import { motion } from 'motion/react';

const repairServices = [
  {
    title: 'NO POWER REPAIR',
    desc: "Expert diagnosis and repair for laptops that won't turn on (Power IC & Board-level fixes).",
    icon: 'power_settings_new',
    id: 'repair-no-power'
  },
  {
    title: 'DISPLAY & KEYBOARD REPLACEMENT',
    desc: 'High-quality replacement screens and keyboards for all laptop brands (Dell, HP, ASUS, Acer, etc.).',
    icon: 'laptop_mac',
    id: 'repair-display'
  },
  {
    title: 'BATTERY & CHARGING FIXES',
    desc: 'Genuine battery replacements and charging port (DC Jack) repairs to keep your device mobile.',
    icon: 'battery_charging_full',
    id: 'repair-battery'
  },
  {
    title: 'CHIP-LEVEL SERVICING',
    desc: 'Basic to intermediate motherboard repairs, BIOS flashing, and component-level troubleshooting.',
    icon: 'memory',
    id: 'repair-chip'
  }
];

export default function Repairs() {
  const checkStatus = () => {
    const text = "Hi Citrix Computer, I want to check the status of my repair/get a price for a laptop part.";
    window.open(`https://wa.me/94789827123?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-surface relative overflow-hidden font-body text-on-surface">
      {/* Background Texture */}
      <div className="absolute inset-0 cyber-metal opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-surface to-transparent"></div>

      <div className="max-w-screen-xl mx-auto px-8 pt-32 pb-20 relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
          id="repairs-hero"
        >
          <div className="inline-block px-4 py-1 border border-primary/30 bg-surface/40 backdrop-blur-sm rounded-sm mb-8">
            <span className="text-primary text-[10px] font-black tracking-[0.5em] uppercase">Service Protocol</span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6 neon-glow-cyan leading-none">
            ADVANCED LAPTOP & <br/>
            <span className="text-primary/40">MOTHERBOARD REPAIR.</span>
          </h1>
          <p className="text-primary/60 max-w-2xl mx-auto font-body leading-relaxed uppercase text-xs tracking-widest">
            FAST, RELIABLE SOLUTIONS FOR ALL YOUR TECH ISSUES.
          </p>
        </motion.div>

        {/* Repair Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24" id="repairs-grid">
          {repairServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 bg-surface-container-low border border-primary/20 hover:border-primary/50 rounded-sm transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,242,255,0.1)] overflow-hidden"
              id={service.id}
            >
              {/* Scanline Effect */}
              <div className="scanline opacity-10 group-hover:opacity-30"></div>
              
              <div className="relative z-10">
                <div className="mb-6 p-3 bg-primary/10 rounded-sm inline-block group-hover:neon-glow-cyan transition-all">
                  <span className="material-icons text-3xl text-primary">{service.icon}</span>
                </div>
                <h3 className="text-xl font-black font-headline tracking-tight text-white mb-4 group-hover:text-primary transition-colors uppercase">
                  {service.title}
                </h3>
                <p className="text-outline text-sm leading-relaxed uppercase tracking-wider">
                  {service.desc}
                </p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/40 transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>

        {/* Action Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center p-12 bg-surface-container-high/40 backdrop-blur-xl border border-primary/30 rounded-sm text-center relative overflow-hidden"
          id="repairs-action"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
          
          <h2 className="text-3xl font-black font-headline tracking-tighter text-white mb-8 uppercase relative z-10">
            Need an urgent <span className="text-primary">Repair Status?</span>
          </h2>
          
          <button 
            onClick={checkStatus}
            className="group relative flex items-center gap-4 px-10 py-5 bg-primary text-surface font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-500 shadow-[0_0_20px_rgba(0,242,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] rounded-sm"
            id="btn-check-status"
          >
            Check Repair Status
            <span className="material-icons text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
          </button>

          <div className="mt-12 flex items-center gap-3 text-primary/40" id="experience-badge">
            <span className="material-icons text-sm">verified</span>
            <span className="text-[10px] font-black tracking-[0.3em] uppercase">
              OVER 10 YEARS OF TECHNICAL EXPERTISE IN ELECTRONICS
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
