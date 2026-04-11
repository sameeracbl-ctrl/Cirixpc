import React from 'react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';

const workstationBuilds = [
  {
    category: 'Visual Studio Builds',
    description: 'Optimized for 4K Video Editing (Adobe/DaVinci) and 3D Rendering (Blender/Maya).',
    color: '#FFD700', // Gold
    glow: 'shadow-[0_0_20px_rgba(255,215,0,0.3)]',
    items: [
      {
        id: 'ws-vfx-pro',
        title: 'VFX PRO FORGE',
        specs: 'Threadripper 5955WX | 128GB RAM | RTX 4090 24GB | 4TB NVMe Gen5',
        price: '1,250,000',
        img: 'https://images.unsplash.com/photo-1587202376732-817926363317?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'ws-edit-master',
        title: '4K EDIT MASTER',
        specs: 'Core i9-14900K | 64GB RAM | RTX 4080 Super | 2TB NVMe',
        price: '850,000',
        img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800&auto=format&fit=crop'
      }
    ]
  },
  {
    category: 'Engineering & Architecture',
    description: 'Specialized setups for AutoCAD, Revit, and SolidWorks.',
    color: '#FF8C00', // Dark Orange
    glow: 'shadow-[0_0_20px_rgba(255,140,0,0.3)]',
    items: [
      {
        id: 'ws-cad-elite',
        title: 'CAD ELITE STATION',
        specs: 'Core i7-14700K | 32GB RAM | RTX A4000 | 1TB NVMe',
        price: '450,000',
        img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'ws-revit-pro',
        title: 'BIM ARCHITECT PRO',
        specs: 'Ryzen 9 7950X | 64GB RAM | RTX A5000 | 2TB NVMe',
        price: '720,000',
        img: 'https://images.unsplash.com/photo-1591489378430-ef2f4c626b35?q=80&w=800&auto=format&fit=crop'
      }
    ]
  },
  {
    category: 'AI & Deep Learning',
    description: 'Multi-GPU workstation configurations (RTX 4090 / A-series focus).',
    color: '#FFA500', // Orange
    glow: 'shadow-[0_0_20px_rgba(255,165,0,0.3)]',
    items: [
      {
        id: 'ws-ai-tensor',
        title: 'TENSOR CORE AI',
        specs: 'Dual RTX 4090 | Xeon W7-2495X | 256GB RAM | 8TB NVMe RAID',
        price: '2,850,000',
        img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'ws-deep-learn',
        title: 'DEEP LEARN NODE',
        specs: 'RTX 6000 Ada | Core i9-14900KS | 128GB RAM | 4TB NVMe',
        price: '1,950,000',
        img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=800&auto=format&fit=crop'
      }
    ]
  }
];

export default function Workstations() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-surface relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,165,0,0.05),transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <div className="inline-block px-4 py-1 border border-orange-500/30 bg-surface/40 backdrop-blur-sm rounded-sm mb-8">
            <span className="text-orange-500 text-[10px] font-black tracking-[0.5em] uppercase">Professional Forge Protocol</span>
          </div>
          <h1 className="font-headline text-4xl md:text-9xl font-black text-white tracking-tighter uppercase mb-8 leading-[0.9]">
            THE <span className="text-orange-500/20">FORGE.</span>
          </h1>
          <p className="text-orange-500/60 max-w-2xl font-body leading-relaxed uppercase text-xs tracking-widest border-l-2 border-orange-500/30 pl-6">
            Industrial-grade workstations engineered for extreme computational tasks. 
            From 8K rendering to neural network training, we build the tools that power your vision.
          </p>
        </motion.div>

        <div className="space-y-32">
          {workstationBuilds.map((section, sIdx) => (
            <div key={section.category} className="space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-end gap-6"
              >
                <div className="flex-grow">
                  <h2 className="font-headline text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
                    {section.category}
                  </h2>
                  <p className="text-orange-500/40 text-xs font-bold uppercase tracking-widest max-w-xl">
                    {section.description}
                  </p>
                </div>
                <div className="hidden md:block h-[1px] flex-grow bg-orange-500/20 mb-4"></div>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {section.items.map((item, iIdx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: iIdx * 0.1 }}
                    className={`group relative bg-surface-container border border-orange-500/10 rounded-sm overflow-hidden flex flex-col md:flex-row ${section.glow} hover:border-orange-500/40 transition-all duration-500`}
                  >
                    <div className="w-full md:w-2/5 aspect-square md:aspect-auto relative overflow-hidden bg-surface">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-60 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-surface-container via-transparent to-transparent hidden md:block"></div>
                    </div>
                    
                    <div className="p-8 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-8 h-[1px] bg-orange-500"></div>
                          <span className="text-[10px] font-black text-orange-500 tracking-widest uppercase">Certified Forge Build</span>
                        </div>
                        <h3 className="font-headline text-2xl font-black text-white mb-4 uppercase tracking-tight group-hover:text-orange-500 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] leading-relaxed mb-8">
                          {item.specs}
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div className="text-3xl font-black text-orange-500 shadow-[0_0_15px_rgba(255,165,0,0.2)]">
                          <span className="text-xs font-bold mr-2">LKR</span>
                          {item.price}/=
                        </div>
                        <div className="flex gap-4">
                          <button 
                            onClick={() => addToCart({
                              id: item.id,
                              title: item.title,
                              price: `LKR ${item.price}`,
                              img: item.img,
                              category: 'Workstations'
                            })}
                            className="flex-1 bg-orange-500 text-surface py-4 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all shadow-[0_0_20px_rgba(255,165,0,0.3)]"
                          >
                            Add to Cart
                          </button>
                          <a 
                            href="https://wa.me/94789827123"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-14 h-14 flex items-center justify-center border border-orange-500/30 text-orange-500 hover:bg-orange-500 hover:text-surface transition-all"
                          >
                            <span className="material-icons">chat</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Custom Build CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-40 p-12 md:p-24 bg-surface-container border border-orange-500/20 rounded-sm text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,165,0,0.1),transparent_70%)]"></div>
          <div className="relative z-10">
            <h2 className="font-headline text-3xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">
              NEED A <span className="text-orange-500">CUSTOM FORGE?</span>
            </h2>
            <p className="text-orange-500/60 max-w-2xl mx-auto font-body uppercase text-xs tracking-widest mb-12 leading-relaxed">
              Our engineers specialize in custom liquid cooling, multi-GPU arrays, and specialized driver configurations. 
              Consult with us to build your ultimate professional tool.
            </p>
            <a 
              href="https://wa.me/94789827123"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-12 py-6 bg-orange-500 text-surface font-black text-xs uppercase tracking-[0.5em] hover:bg-white transition-all shadow-[0_0_40px_rgba(255,165,0,0.4)]"
            >
              Consult for Custom Build
              <span className="material-icons">terminal</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
