import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const categoryData: Record<string, { title: string; icon: string; description: string }> = {
  processors: { title: 'Processors', icon: 'memory', description: 'High-performance CPUs for gaming and workstations.' },
  motherboards: { title: 'Motherboards', icon: 'developer_board', description: 'The foundation of your digital architecture.' },
  ram: { title: 'Memory (RAM)', icon: 'memory_alt', description: 'High-speed DDR4 and DDR5 memory modules.' },
  storage: { title: 'Storage', icon: 'sd_card', description: 'Fast NVMe SSDs and high-capacity hard drives.' },
  vga: { title: 'Graphics Cards', icon: 'videogame_asset', description: 'Next-gen GPUs for immersive visuals.' },
  casings: { title: 'Casings', icon: 'computer', description: 'Stylish and functional enclosures for your build.' },
  psu: { title: 'Power Supplies', icon: 'power', description: 'Reliable power for your high-end hardware.' },
  monitors: { title: 'Monitors', icon: 'monitor', description: 'Crystal-clear displays for every setup.' },
  laptops: { title: 'Laptops', icon: 'laptop', description: 'Portable power for professionals and gamers.' },
};

export default function CategorySelection() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const category = categoryData[slug || ''] || { title: slug, icon: 'category', description: 'Explore our hardware inventory.' };

  return (
    <div className="min-h-screen bg-surface py-20 px-8">
      <div className="max-w-screen-xl mx-auto">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60 hover:text-primary mb-16 transition-all group"
        >
          <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
          Back to Home
        </motion.button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="font-headline text-5xl md:text-7xl font-black text-primary tracking-tighter uppercase mb-6 neon-glow-cyan">
            {category.title} <br/>
            <span className="text-white opacity-20">INVENTORY</span>
          </h1>
          <p className="text-primary/60 max-w-lg font-body leading-relaxed uppercase text-xs tracking-widest">
            {category.description} Select your preferred condition to browse our verified stock.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* BRAND NEW Option */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Link 
              to={`/category/${slug}/new`}
              className="group relative block h-[400px] bg-surface-container rounded-sm border border-primary/10 hover:neon-border-cyan transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="p-12 h-full flex flex-col justify-between relative z-10">
                <div>
                  <span className="inline-block px-3 py-1 border border-primary/30 text-primary text-[8px] font-bold tracking-[0.3em] uppercase mb-6 neon-border-cyan">
                    Factory Sealed
                  </span>
                  <h2 className="font-headline text-4xl font-black text-white uppercase tracking-tighter group-hover:text-primary transition-colors">Brand New</h2>
                  <p className="text-primary/40 text-[10px] uppercase tracking-widest mt-4 max-w-[200px]">Latest generation hardware with full manufacturer warranty.</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Explore New</span>
                  <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                <span className="material-symbols-outlined text-[240px]">{category.icon}</span>
              </div>
            </Link>
          </motion.div>

          {/* USED Option */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              to={`/category/${slug}/used`}
              className="group relative block h-[400px] bg-surface-container rounded-sm border border-secondary/10 hover:neon-border-blue transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="p-12 h-full flex flex-col justify-between relative z-10">
                <div>
                  <span className="inline-block px-3 py-1 border border-secondary/30 text-secondary text-[8px] font-bold tracking-[0.3em] uppercase mb-6 neon-border-blue">
                    Certified Value
                  </span>
                  <h2 className="font-headline text-4xl font-black text-white uppercase tracking-tighter group-hover:text-secondary transition-colors">Used / Refurbished</h2>
                  <p className="text-secondary/40 text-[10px] uppercase tracking-widest mt-4 max-w-[200px]">Rigorous 48-point testing ensures every circuit meets Citrix standards.</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Explore Used</span>
                  <span className="material-symbols-outlined text-secondary group-hover:translate-x-2 transition-transform">history</span>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                <span className="material-symbols-outlined text-[240px]">construction</span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
