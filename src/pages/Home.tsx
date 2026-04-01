import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const carouselImages = [
  "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=2070&auto=format&fit=crop", // High-end PC Interior
  "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format&fit=crop", // Motherboard Detail
  "https://images.unsplash.com/photo-1624701928517-44c8ac49d93c?q=80&w=2070&auto=format&fit=crop", // GPU/VGA Detail
  "https://images.unsplash.com/photo-1555617766-c94804975da3?q=80&w=2070&auto=format&fit=crop", // Hardware Components
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* Massive Ultra-Widescreen Hero Slideshow */}
      <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden border-b border-primary/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={carouselImages[currentSlide]}
              alt="Hardware Showcase"
              className="w-full h-full object-cover brightness-[0.4]"
              referrerPolicy="no-referrer"
            />
            {/* Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/40 to-transparent opacity-80"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60"></div>
          </motion.div>
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="relative z-10 h-full max-w-screen-2xl mx-auto px-8 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <span className="inline-block px-4 py-1 rounded-sm border border-primary/30 text-primary text-[10px] font-black tracking-[0.4em] uppercase mb-8 neon-border-cyan bg-surface/40 backdrop-blur-sm">
              ESTABLISHED 2012 | CITRIX SYSTEMS
            </span>
            <h1 className="font-headline text-7xl md:text-9xl font-black text-primary tracking-tighter leading-[0.8] mb-8 neon-glow-cyan drop-shadow-[0_0_15px_rgba(0,242,255,0.5)]">
              PRECISION <br/>
              HARDWARE <br/>
              <span className="text-white">FOUNDRY.</span>
            </h1>
            <p className="text-xl md:text-2xl text-secondary font-bold tracking-tight mb-12 neon-glow-blue max-w-2xl">
              Expert Custom Builds & Industrial-Grade Repair Services.
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="btn-neon-cyan !px-12 !py-4 !text-sm">Start Your Build</button>
              <button className="btn-neon-blue !px-12 !py-4 !text-sm">Technical Support</button>
            </div>
          </motion.div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
          <button onClick={prevSlide} className="pointer-events-auto w-14 h-14 flex items-center justify-center rounded-full bg-surface/20 backdrop-blur-md border border-primary/20 text-primary hover:bg-primary hover:text-surface transition-all group">
            <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">chevron_left</span>
          </button>
          <button onClick={nextSlide} className="pointer-events-auto w-14 h-14 flex items-center justify-center rounded-full bg-surface/20 backdrop-blur-md border border-primary/20 text-primary hover:bg-primary hover:text-surface transition-all group">
            <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">chevron_right</span>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {carouselImages.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${i === currentSlide ? 'bg-primary w-10 shadow-[0_0_15px_rgba(0,242,255,0.8)]' : 'bg-primary/20 hover:bg-primary/40'}`}
            />
          ))}
        </div>

        {/* Certified Lab Badge - Lower Right */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-12 right-8 bg-surface/80 backdrop-blur-xl p-8 rounded-sm neon-border-blue max-w-[280px] hidden lg:block z-20"
        >
          <div className="flex items-center gap-4 mb-4 text-secondary">
            <span className="material-symbols-outlined text-3xl neon-glow-blue" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span className="text-xs font-black uppercase tracking-[0.2em]">Certified Lab</span>
          </div>
          <p className="text-[11px] text-on-surface-variant leading-relaxed uppercase tracking-tight font-bold">
            Industrial-grade chipset repairs conducted by expert technicians in a controlled environment.
          </p>
        </motion.div>
      </section>

      {/* Category Grid */}
      <section className="py-24 border-t border-primary/10">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="font-headline text-2xl font-black text-primary tracking-widest uppercase neon-glow-cyan">Hardware Foundry</h2>
              <div className="h-[1px] w-24 bg-primary mt-4 shadow-[0_0_10px_rgba(0,242,255,0.8)]"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-4">
            {[
              { img: 'https://picsum.photos/seed/intel-cpu/400/400', label: 'Processors', slug: 'processors' },
              { img: 'https://picsum.photos/seed/gaming-motherboard/400/400', label: 'Motherboards', slug: 'motherboards' },
              { img: 'https://picsum.photos/seed/rgb-ram/400/400', label: 'RAM', slug: 'ram' },
              { img: 'https://picsum.photos/seed/nvme-ssd/400/400', label: 'Storage', slug: 'storage' },
              { img: 'https://picsum.photos/seed/rtx-gpu/400/400', label: 'VGA', slug: 'vga' },
              { img: 'https://picsum.photos/seed/pc-case/400/400', label: 'Casings', slug: 'casings' },
              { img: 'https://picsum.photos/seed/modular-psu/400/400', label: 'PSU', slug: 'psu' },
              { img: 'https://picsum.photos/seed/gaming-monitor/400/400', label: 'Monitors', slug: 'monitors' },
              { img: 'https://picsum.photos/seed/thin-laptop/400/400', label: 'Laptops', slug: 'laptops' },
            ].map((cat, i) => (
              <Link key={i} to={`/category/${cat.slug}`} className="group flex flex-col items-center p-4 bg-surface-container rounded-sm border border-primary/10 hover:neon-border-cyan transition-all duration-500">
                <div className="w-full aspect-square mb-4 overflow-hidden rounded-sm bg-surface flex items-center justify-center p-2">
                  <img 
                    src={cat.img} 
                    alt={cat.label} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 brightness-75 group-hover:brightness-100" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[9px] font-bold text-primary/60 group-hover:text-primary uppercase tracking-[0.2em] text-center transition-colors">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hardware */}
      <section className="py-24 bg-surface-container/30">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="flex items-center justify-between mb-16">
            <h2 className="font-headline text-2xl font-black text-primary tracking-widest uppercase neon-glow-cyan">Featured Inventory</h2>
            <Link className="text-[10px] font-bold text-primary border-b border-primary/30 pb-1 hover:border-primary transition-all uppercase tracking-widest" to="/hardware">Access Full Catalog</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                tag: 'In Stock',
                category: 'Motherboards',
                title: 'ASUS ROG Maximus Z790 Hero',
                price: 'LKR 185,500',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXFnoh_VuVyHWpttWwmbhRRIMbOXqiQPi4fNSqRR9-mc3t0dxXB-WUgSAdU6fD94yPPH2Fq-TFd3Mw2Ugox4G89-AlV6XO6B2yjdB2j8uMjvOi-Wja2l8Pe-H1vaE5212Iwmq4kpR8ngr5xtTZKaGFPQcD9o_UlPJVfuETNdgNysE6hvdGdL2Y1oh_7OmESp0HduyhcpIPr303hScB9EiH_PGyElEws5ioMKlB0pokxSb_PbVmjOokwv0As0oguBTqNqnm6Afb'
              },
              {
                tag: 'In Stock',
                category: 'Processors',
                title: 'Intel Core i9-14900K Processor',
                price: 'LKR 210,000',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZu_e8iT42k7yiAHxp5QAiEbOlEvTwptLq0X5fkqkdECOqA6iew-ku0Hy_d1DVmPjBUZb3_YtQrGdpgCkiaa7JQkCoAoZSJa76vxlpgL5TPy9rdpa4cTLm_hYIVj2fFLcG2WXyXctiFS7h8m3vaISED2A0ZNx5kg087cNHN_j-f-h5y6JDeTubYF0zT7yO-xKscl10yzvQsUDrXznkBdSIKtbhRrajksGZ62D_ruDAZKhZ3Hn0ZJmIeRR9jK3ohKjLygGqNHPg'
              },
              {
                tag: 'In Stock',
                category: 'Laptops',
                title: 'HP ZBook Studio G10 Workstation',
                price: 'LKR 425,000',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2Hfj-y9jOqcJrVHl7SVoSvIjyRx5WYCuLMRByTQ--cNYMw72-p8ci4xXyo954lw8HeVSmzhdxlTa3yRd2FovCuAOYVZuudfQTf1GR5aRwDOL8ZoJHm0T47FQdiofS7CMXG7VMF9tuH1Qocv4By9GbLxMaXXUt28PU2rcd0i9RYH5qb4BN5JSmpVLIvq0yGex0_eaPLqk8tN3D0cRSQGT5C7_Ue91fllhwvogXy4BLtW1i2Vy12ZHifTNqgkbY78yphzqCZTqF'
              },
              {
                tag: 'Low Stock',
                category: 'Monitors',
                title: 'Samsung Odyssey G9 49" Curved',
                price: 'LKR 315,000',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjONtj8S6rwUS2E42Bm34m1tBeO2GqwqjG_O3--R4QTiktDYByvWF2Jek3I88jFC7BwzWTafZBlfSh940F1MHRXu_B3cXc5H2wwVzZQQrk-ezQqI5QF7yCbF3_MUY1bA6y1TfdPikNV4FOd_Mz91f1aeS1IqlfP3_v0co373wQ2vvb2dBU049Vo3xB0f4eIcDgyLS8focdP03UNAvs31HoP-iWezKGS8Ykr_GpaZiaT5YlnBwPShmDihProhKPAj0rgqTn1wzH'
              },
            ].map((prod, i) => (
              <div key={i} className="group flex flex-col bg-surface rounded-sm overflow-hidden border border-primary/10 hover:neon-border-cyan transition-all duration-500">
                <div className="relative aspect-square overflow-hidden bg-surface-container">
                  <img alt={prod.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" src={prod.img} referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 bg-primary text-surface text-[8px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest shadow-[0_0_10px_rgba(0,242,255,0.5)]">{prod.tag}</div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-[8px] font-bold text-primary/50 uppercase tracking-[0.3em] mb-2">{prod.category}</span>
                  <h3 className="font-headline font-bold text-sm text-white mb-4 line-clamp-2 uppercase tracking-tight group-hover:text-primary transition-colors">{prod.title}</h3>
                  <div className="mt-auto">
                    <div className="text-xl font-black text-primary mb-6 neon-glow-cyan">{prod.price}</div>
                    <div className="flex gap-2">
                      <button className="flex-1 btn-neon-cyan !py-2 !px-0">Add to Cart</button>
                      <button className="w-10 h-10 flex items-center justify-center border border-[#25D366]/50 text-[#25D366] rounded-sm hover:bg-[#25D366] hover:text-surface transition-all">
                        <span className="material-symbols-outlined text-xl">chat</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
