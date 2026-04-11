import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const categoryData: Record<string, { 
  title: string; 
  icon: string; 
  description: string; 
  img: string;
  subCategories?: { label: string; slug: string; description: string; icon: string }[]
}> = {
  processors: { 
    title: 'Processors', 
    icon: 'memory', 
    description: 'High-performance CPUs for gaming and workstations.',
    img: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=1000'
  },
  motherboards: { 
    title: 'Motherboards', 
    icon: 'developer_board', 
    description: 'The foundation of your digital architecture.',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000'
  },
  ram: { 
    title: 'Memory (RAM)', 
    icon: 'memory_alt', 
    description: 'High-speed DDR4 and DDR5 memory modules.',
    img: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=1000'
  },
  storage: { 
    title: 'Storage', 
    icon: 'sd_card', 
    description: 'Fast NVMe SSDs and high-capacity hard drives.',
    img: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&q=80&w=1000'
  },
  vga: { 
    title: 'Graphics Cards', 
    icon: 'videogame_asset', 
    description: 'Next-gen GPUs for immersive visuals.',
    img: 'https://images.unsplash.com/photo-1591489378430-ef2f4c626b35?auto=format&fit=crop&q=80&w=1000'
  },
  casings: { 
    title: 'Casings', 
    icon: 'computer', 
    description: 'Stylish and functional enclosures for your build.',
    img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1000'
  },
  psu: { 
    title: 'Power Supplies', 
    icon: 'power', 
    description: 'Reliable power for your high-end hardware.',
    img: 'https://images.unsplash.com/photo-1616132422484-916940007802?auto=format&fit=crop&q=80&w=1000'
  },
  monitors: { 
    title: 'Monitors', 
    icon: 'monitor', 
    description: 'Crystal-clear displays for every setup.',
    img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000'
  },
  laptops: { 
    title: 'Laptops', 
    icon: 'laptop', 
    description: 'Portable power for professionals and gamers.',
    img: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=1000'
  },
  keyboards: {
    title: 'Keyboards',
    icon: 'keyboard',
    description: 'Mechanical and membrane keyboards for every typing style.',
    img: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=1000',
    subCategories: [
      { label: 'Gaming', slug: 'gaming', description: 'RGB mechanical keyboards with linear or tactile switches.', icon: 'videogame_asset' },
      { label: 'Standard', slug: 'standard', description: 'Reliable membrane keyboards for office and home use.', icon: 'keyboard' },
      { label: 'Wireless', slug: 'wireless', description: 'Bluetooth and 2.4GHz wireless keyboards for a clean setup.', icon: 'wifi' },
    ]
  },
  mouse: {
    title: 'Mouse',
    icon: 'mouse',
    description: 'Precision mice for gaming and productivity.',
    img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=1000',
    subCategories: [
      { label: 'Gaming', slug: 'gaming', description: 'High-DPI sensors and programmable buttons.', icon: 'videogame_asset' },
      { label: 'Standard', slug: 'standard', description: 'Ergonomic mice for everyday computing.', icon: 'mouse' },
      { label: 'Wireless', slug: 'wireless', description: 'Lag-free wireless performance for ultimate freedom.', icon: 'wifi' },
    ]
  },
  speakers: {
    title: 'Speakers',
    icon: 'speaker',
    description: 'Immersive audio for music, movies, and gaming.',
    img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=1000',
    subCategories: [
      { label: 'Standard', slug: 'standard', description: '2.0 and 2.1 speaker systems for clear audio.', icon: 'speaker' },
      { label: 'RGB', slug: 'rgb', description: 'Speakers with synchronized lighting effects.', icon: 'palette' },
      { label: 'Subwoofers', slug: 'subwoofers', description: 'Deep bass for a powerful cinematic experience.', icon: 'surround_sound' },
    ]
  },
  'laptop-accessories': {
    title: 'Laptop Accessories',
    icon: 'laptop_mac',
    description: 'Essential add-ons for your portable workstation.',
    img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=1000',
    subCategories: [
      { label: 'Chargers', slug: 'chargers', description: 'Replacement and travel power adapters.', icon: 'power' },
      { label: 'Batteries', slug: 'batteries', description: 'High-capacity replacement batteries.', icon: 'battery_full' },
      { label: 'Displays', slug: 'displays', description: 'Replacement LCD and LED screens.', icon: 'monitor' },
    ]
  },
  'network-accessories': {
    title: 'Network',
    icon: 'router',
    description: 'Stay connected with high-speed networking gear.',
    img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000',
    subCategories: [
      { label: 'Routers', slug: 'routers', description: 'High-speed Wi-Fi 6 and dual-band routers.', icon: 'router' },
      { label: 'Switches', slug: 'switches', description: 'Gigabit switches for expanded wired connectivity.', icon: 'settings_ethernet' },
      { label: 'Dongles', slug: 'dongles', description: 'USB Wi-Fi and Bluetooth adapters.', icon: 'usb' },
    ]
  },
  cables: {
    title: 'Cables',
    icon: 'cable',
    description: 'High-quality connectivity for all your devices.',
    img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1000',
    subCategories: [
      { label: 'HDMI', slug: 'hdmi', description: '4K and 8K high-speed HDMI cables.', icon: 'settings_input_hdmi' },
      { label: 'VGA', slug: 'vga', description: 'Reliable analog video cables.', icon: 'settings_input_component' },
      { label: 'Power', slug: 'power', description: 'Standard and heavy-duty power cords.', icon: 'power' },
      { label: 'SATA', slug: 'sata', description: 'High-speed data cables for storage.', icon: 'storage' },
    ]
  },
  ups: {
    title: 'UPS',
    icon: 'battery_charging_full',
    description: 'Uninterrupted power protection for your hardware.',
    img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000',
    subCategories: [
      { label: '650VA', slug: '650va', description: 'Compact protection for home PCs.', icon: 'battery_1_bar' },
      { label: '1200VA', slug: '1200va', description: 'High-capacity backup for workstations.', icon: 'battery_5_bar' },
      { label: 'Pro Series', slug: 'pro', description: 'Industrial grade power solutions.', icon: 'battery_full' },
    ]
  },
  'party-boxes': {
    title: 'Party Boxes',
    icon: 'music_note',
    description: 'Powerful Bluetooth speakers for ultimate entertainment.',
    img: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?auto=format&fit=crop&q=80&w=1000',
    subCategories: [
      { label: 'Standard', slug: 'standard', description: 'Portable party speakers with great sound.', icon: 'speaker' },
      { label: 'RGB Pro', slug: 'rgb-pro', description: 'Large speakers with advanced light shows.', icon: 'palette' },
      { label: 'Subwoofers', slug: 'subwoofers', description: 'Extra bass for large venues.', icon: 'surround_sound' },
    ]
  },
};

export default function CategorySelection() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const category = categoryData[slug || ''] || { 
    title: slug, 
    icon: 'category', 
    description: 'Explore our hardware inventory.',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000' // Generic tech fallback
  };

  return (
    <div className="min-h-screen bg-surface relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 cyber-metal opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-surface to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-20 relative z-10">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.5em] text-primary/60 hover:text-primary mb-16 transition-all group"
        >
          <span className="material-icons text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
          Return to Hub
        </motion.button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-24"
        >
          <div className="inline-block px-4 py-1 border border-primary/30 bg-surface/40 backdrop-blur-sm rounded-sm mb-6 md:mb-8">
            <span className="text-primary text-[10px] font-black tracking-[0.5em] uppercase">Category Protocol</span>
          </div>
          <h1 className="font-headline text-3xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter uppercase mb-6 md:mb-8 neon-glow-cyan leading-[0.9]">
            {category.title} <br/>
            <span className="text-primary/20">SELECTION.</span>
          </h1>
          <p className="text-primary/60 max-w-xl font-body leading-relaxed uppercase text-[10px] md:text-xs tracking-widest border-l-2 border-primary/30 pl-4 md:pl-6">
            {category.description} Access our verified inventory of high-performance components.
          </p>
        </motion.div>

        <div className={`grid grid-cols-1 ${category.subCategories ? 'sm:grid-cols-2 md:grid-cols-3' : 'sm:grid-cols-2'} gap-6 md:gap-12`}>
          {category.subCategories ? (
            category.subCategories.map((sub, idx) => (
              <motion.div
                key={sub.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link 
                  to={`/category/${slug}/${sub.slug}`}
                  className="group relative block h-[200px] md:h-[400px] cyber-metal rounded-sm border border-primary/30 hover:neon-border-cyan transition-all duration-700 overflow-hidden perspective-1000"
                >
                  <div className="scanline"></div>
                  <div className="absolute top-12 left-0 led-strip opacity-20 group-hover:opacity-80 transition-opacity"></div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    className="w-full h-full p-6 md:p-8 flex flex-col justify-between relative z-10"
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <div>
                      <div className="inline-block px-3 py-1 border border-primary/50 bg-surface/90 backdrop-blur-xl rounded-sm mb-3 md:mb-6 shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                        <span className="text-primary text-[8px] md:text-[10px] font-black tracking-[0.5em] uppercase neon-glow-cyan">Selection Mode</span>
                      </div>
                      <h2 className="font-headline text-2xl md:text-4xl font-black text-white uppercase tracking-tighter group-hover:text-primary transition-colors mb-2 md:mb-4 leading-none">{sub.label}</h2>
                      <p className="text-primary/40 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed max-w-xs">{sub.description}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-primary/20 pt-4 md:pt-6">
                      <span className="text-[9px] md:text-[10px] font-black text-primary uppercase tracking-[0.5em]">Initialize</span>
                      <span className="material-icons text-primary group-hover:translate-x-4 transition-transform text-2xl md:text-3xl">{sub.icon}</span>
                    </div>
                  </motion.div>

                  <div className="absolute -bottom-10 -right-10 opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none">
                    <img 
                      src={category.img} 
                      alt={sub.label} 
                      className="w-48 md:w-64 lg:w-80 h-auto object-contain grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <>
              {/* BRAND NEW Option */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link 
                  to={`/category/${slug}/new`}
                  className="group relative block h-[240px] md:h-[500px] cyber-metal rounded-sm border border-primary/30 hover:neon-border-cyan transition-all duration-700 overflow-hidden perspective-1000"
                >
                  {/* Scanline Effect */}
                  <div className="scanline"></div>

                  {/* LED Strip Lights */}
                  <div className="absolute top-12 left-0 led-strip opacity-20 group-hover:opacity-80 transition-opacity"></div>
                  <div className="absolute bottom-12 left-0 led-strip opacity-20 group-hover:opacity-80 transition-opacity"></div>

                  <motion.div 
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    className="w-full h-full p-6 md:p-16 flex flex-col justify-between relative z-10"
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <div>
                      <div className="inline-block px-4 md:px-6 py-2 border border-primary/50 bg-surface/90 backdrop-blur-xl rounded-sm mb-4 md:mb-8 shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                        <span className="text-primary text-[9px] md:text-[11px] font-black tracking-[0.5em] uppercase neon-glow-cyan">Factory Sealed</span>
                      </div>
                      <h2 className="font-headline text-3xl md:text-6xl font-black text-white uppercase tracking-tighter group-hover:text-primary transition-colors mb-2 md:mb-6 leading-none">Brand New</h2>
                      <p className="text-primary/40 text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] leading-relaxed max-w-xs">Latest generation hardware with full manufacturer warranty.</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-primary/20 pt-4 md:pt-8">
                      <span className="text-[10px] md:text-[12px] font-black text-primary uppercase tracking-[0.5em]">Initialize New</span>
                      <span className="material-icons text-primary group-hover:translate-x-4 transition-transform text-2xl md:text-4xl">arrow_forward</span>
                    </div>
                  </motion.div>

                  {/* Background Image Decor */}
                  <div className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none">
                    <img 
                      src={category.img} 
                      alt={category.title} 
                      className="w-64 md:w-[500px] lg:w-[600px] h-auto object-contain grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </Link>
              </motion.div>

              {/* USED Option */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link 
                  to={`/category/${slug}/used`}
                  className="group relative block h-[240px] md:h-[500px] cyber-metal rounded-sm border border-secondary/30 hover:neon-border-blue transition-all duration-700 overflow-hidden perspective-1000"
                >
                  {/* Scanline Effect */}
                  <div className="scanline"></div>

                  {/* LED Strip Lights (Blue for Used) */}
                  <div className="absolute top-12 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-secondary/50 to-transparent shadow-[0_0_10px_rgba(0,123,255,0.8)] opacity-20 group-hover:opacity-80 transition-opacity"></div>
                  <div className="absolute bottom-12 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-secondary/50 to-transparent shadow-[0_0_10px_rgba(0,123,255,0.8)] opacity-20 group-hover:opacity-80 transition-opacity"></div>

                  <motion.div 
                    whileHover={{ scale: 1.05, rotateY: -5 }}
                    className="w-full h-full p-6 md:p-16 flex flex-col justify-between relative z-10"
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div>
                      <div className="inline-block px-4 md:px-6 py-2 border border-secondary/50 bg-surface/90 backdrop-blur-xl rounded-sm mb-4 md:mb-8 shadow-[0_0_15px_rgba(0,123,255,0.2)]">
                        <span className="text-secondary text-[9px] md:text-[11px] font-black tracking-[0.5em] uppercase">Certified Value</span>
                      </div>
                      <h2 className="font-headline text-3xl md:text-6xl font-black text-white uppercase tracking-tighter group-hover:text-secondary transition-colors mb-2 md:mb-6 leading-none">Used Gear</h2>
                      <p className="text-secondary/40 text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] leading-relaxed max-w-xs">Rigorous 48-point testing ensures every circuit meets industrial standards.</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-secondary/20 pt-4 md:pt-8">
                      <span className="text-[10px] md:text-[12px] font-black text-secondary uppercase tracking-[0.5em]">Initialize Used</span>
                      <span className="material-icons text-secondary group-hover:translate-x-4 transition-transform text-2xl md:text-4xl">history</span>
                    </div>
                  </motion.div>

                  {/* Background Image Decor */}
                  <div className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none">
                    <img 
                      src={category.img} 
                      alt={category.title} 
                      className="w-64 md:w-[500px] lg:w-[600px] h-auto object-contain grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
