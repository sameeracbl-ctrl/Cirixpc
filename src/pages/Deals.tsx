import React from 'react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';

const deals = [
  {
    id: 'deal-1',
    title: 'ULTIMATE GAMING COMBO',
    specs: 'Ryzen 5 5600G + B450 Mobo + 16GB RAM',
    price: '85,000',
    originalPrice: '95,000',
    badge: 'COMBO OFFER',
    img: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=800&auto=format&fit=crop',
    category: 'Budget-Friendly'
  },
  {
    id: 'deal-2',
    title: 'RTX 3060 TI (USED)',
    specs: 'Certified Used | 8GB GDDR6 | 3 Months Warranty',
    price: '65,000',
    originalPrice: '75,000',
    badge: 'CERTIFIED USED',
    img: 'https://images.unsplash.com/photo-1591489378430-ef2f4c626b35?q=80&w=800&auto=format&fit=crop',
    category: 'Performance-Per-Rupee'
  },
  {
    id: 'deal-3',
    title: '1TB NVMe SSD GEN4',
    specs: 'Brand New | 5000MB/s Read | Flash Sale Price',
    price: '18,500',
    originalPrice: '24,000',
    badge: 'FLASH SALE',
    img: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?q=80&w=800&auto=format&fit=crop',
    category: 'Budget-Friendly'
  },
  {
    id: 'deal-4',
    title: 'CORE I5-12400F BUNDLE',
    specs: 'i5 12400F + H610M + 16GB 3200MHz',
    price: '92,500',
    originalPrice: '105,000',
    badge: 'COMBO OFFER',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    category: 'Performance-Per-Rupee'
  }
];

export default function Deals() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-surface relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.05),transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <div className="inline-block px-4 py-1 border border-primary/30 bg-surface/40 backdrop-blur-sm rounded-sm mb-8">
            <span className="text-primary text-[10px] font-black tracking-[0.5em] uppercase">Foundry Drops Protocol</span>
          </div>
          <h1 className="font-headline text-4xl md:text-9xl font-black text-white tracking-tighter uppercase mb-8 leading-[0.9]">
            FOUNDRY <span className="text-primary/20">DROPS.</span>
          </h1>
          <p className="text-primary/60 max-w-2xl font-body leading-relaxed uppercase text-xs tracking-widest border-l-2 border-primary/30 pl-6">
            Limited-time hardware drops and performance bundles. 
            Maximum value, zero compromise. Verified by Citrix Computer engineers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {deals.map((deal, i) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-surface-container border border-primary/10 rounded-sm overflow-hidden flex flex-col hover:neon-border-cyan transition-all duration-500 relative"
            >
              {/* Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-sm text-[8px] font-black uppercase tracking-widest z-20 shadow-lg ${
                deal.badge === 'FLASH SALE' ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]' :
                deal.badge === 'COMBO OFFER' ? 'bg-primary text-surface shadow-[0_0_15px_rgba(0,242,255,0.5)]' :
                'bg-yellow-500 text-surface shadow-[0_0_15px_rgba(234,179,8,0.5)]'
              }`}>
                {deal.badge}
              </div>

              <div className="relative aspect-square overflow-hidden bg-surface">
                <img 
                  src={deal.img} 
                  alt={deal.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <span className="text-[8px] font-black text-primary/40 uppercase tracking-[0.3em] mb-2">{deal.category}</span>
                <h3 className="font-headline font-bold text-lg text-white mb-4 uppercase tracking-tight group-hover:text-primary transition-colors">
                  {deal.title}
                </h3>
                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-8 leading-relaxed">
                  {deal.specs}
                </p>

                <div className="mt-auto">
                  <div className="flex items-end gap-3 mb-8">
                    <div className="text-3xl font-black text-primary neon-glow-cyan">
                      <span className="text-xs font-bold mr-1">Rs.</span>
                      {deal.price}/=
                    </div>
                    <div className="text-xs font-bold text-white/20 line-through mb-1">
                      Rs. {deal.originalPrice}
                    </div>
                  </div>

                  <button 
                    onClick={() => addToCart({
                      id: deal.id,
                      title: deal.title,
                      price: `LKR ${deal.price}`,
                      img: deal.img,
                      category: 'Deals'
                    })}
                    className="w-full py-4 bg-primary text-surface font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)]"
                  >
                    Grab Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter / Alert CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 p-12 md:p-24 bg-surface-container border border-primary/20 rounded-sm text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.1),transparent_70%)]"></div>
          <div className="relative z-10">
            <h2 className="font-headline text-3xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">
              NEVER MISS A <span className="text-primary">DROP.</span>
            </h2>
            <p className="text-primary/60 max-w-2xl mx-auto font-body uppercase text-xs tracking-widest mb-12 leading-relaxed">
              Join our WhatsApp community for instant notifications on flash sales and limited hardware bundles.
            </p>
            <a 
              href="https://chat.whatsapp.com/your-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-12 py-6 border border-primary/30 text-primary font-black text-xs uppercase tracking-[0.5em] hover:bg-primary hover:text-surface transition-all shadow-[0_0_40px_rgba(0,242,255,0.2)]"
            >
              Join WhatsApp Community
              <span className="material-icons">chat</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
