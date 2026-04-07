import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

export default function HardwareCatalog() {
  const { addToCart } = useCart();
  const [activeChipset, setActiveChipset] = useState("Z490 Series");
  const [showSpecs, setShowSpecs] = useState(false);

  const intelSeries = [
    { name: "Z490 Series", featured: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtDNfgCXol74uBSDNbhCM-MkDeF0TxaxQ3jeo2uNcPmbEL-s7k_MEP37ENGCdVTzXPIR1vWPD1go9BH9VSgv4KP8Zt-F7VTGsHJ2SzHt29hJ-rT7b6M4PuUBneoA-FiaQtXhH1fTt0qCu2L-qgGKe_7Xy0GKc6r49pXGOa88pXj7LjWiAfR4tH93Eto6JjER5GYL5CpIP1XSzwvTgyg2kLyslMkLKTg-UbicZXGkdGZovyO6jdu8Oz40yeGQKl2Taz_GckfcYh", specs: { socket: "LGA 1200", pcie: "PCIe 3.0", memory: "DDR4-2933", usb: "USB 3.2 Gen 2x1" } },
    { name: "Z390 Series", specs: { socket: "LGA 1151", pcie: "PCIe 3.0", memory: "DDR4-2666", usb: "USB 3.1 Gen 2" } },
    { name: "Z370 Series", specs: { socket: "LGA 1151", pcie: "PCIe 3.0", memory: "DDR4-2666", usb: "USB 3.1 Gen 1" } },
    { name: "Z270 Series", specs: { socket: "LGA 1151", pcie: "PCIe 3.0", memory: "DDR4-2400", usb: "USB 3.0" } },
    { name: "Z170 Series", specs: { socket: "LGA 1151", pcie: "PCIe 3.0", memory: "DDR4-2133", usb: "USB 3.0" } },
    { name: "Z97 Series", specs: { socket: "LGA 1150", pcie: "PCIe 3.0", memory: "DDR3-1600", usb: "USB 3.0" } },
    { name: "Z87 Series", specs: { socket: "LGA 1150", pcie: "PCIe 3.0", memory: "DDR3-1600", usb: "USB 3.0" } },
    { name: "Z77 Series", specs: { socket: "LGA 1155", pcie: "PCIe 3.0", memory: "DDR3-1600", usb: "USB 3.0" } },
  ];

  const currentChipset = intelSeries.find(s => s.name === activeChipset) || intelSeries[0];

  const whatsappQuote = (chipsetName: string) => {
    const text = `Hi Citrix Computer, I am interested in the ${chipsetName} Foundry Edition. Can I get a price quote?`;
    window.open(`https://wa.me/94789827123?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white font-body">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-12 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 mb-10">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span className="material-icons text-[14px]">chevron_right</span>
          <Link to="/hardware" className="hover:text-white transition-colors">Hardware Catalog</Link>
          <span className="material-icons text-[14px]">chevron_right</span>
          <span className="text-white">Intel Chipsets</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black font-headline tracking-tighter uppercase">Intel Chipsets</h2>
              <button className="lg:hidden material-icons">filter_list</button>
            </div>
            <ul className="space-y-1">
              {intelSeries.map((series, i) => (
                <li key={i}>
                  <button 
                    onClick={() => setActiveChipset(series.name)}
                    className={`w-full text-left px-4 py-3 rounded-sm text-sm font-bold tracking-tight transition-all border-l-2 ${
                      activeChipset === series.name 
                        ? 'bg-white/10 text-white border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                        : 'border-transparent hover:bg-white/5 text-gray-500 hover:text-white'
                    }`}
                  >
                    {series.name}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Content */}
          <main className="flex-grow">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <button className="flex items-center justify-center bg-white/5 w-10 h-10 rounded-sm text-white hover:bg-white/10 transition-all border border-white/10">
                  <span className="material-icons text-sm">filter_alt</span>
                </button>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Showing 12 Results</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.3)] border border-white/40">
                  <span className="material-icons">grid_view</span>
                </button>
                <button className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-white transition-all">
                  <span className="material-icons">view_list</span>
                </button>
              </div>
            </div>

            {/* Featured Product */}
            <motion.div 
              layout
              className="bg-white/5 rounded-2xl overflow-hidden mb-12 flex flex-col md:flex-row shadow-2xl border border-white/10 relative"
            >
              <div className="w-full md:w-1/2 p-12 flex flex-col justify-center relative z-10">
                <span className="text-gray-500 font-bold tracking-[0.3em] text-[10px] uppercase mb-4">PREMIUM PERFORMANCE</span>
                <h3 className="text-5xl font-black font-headline tracking-tighter mb-6 leading-none">{activeChipset} <br/><span className="text-gray-600">Foundry Edition</span></h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-sm">Engineered for high-performance computing. Featuring optimized thermal solutions and extreme overclocking stability.</p>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => addToCart({
                      id: `featured-${activeChipset}`,
                      title: `${activeChipset} Foundry Edition`,
                      price: 'LKR 45,000.00', // Placeholder price
                      img: currentChipset.img || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
                      category: 'Intel Chipsets'
                    })}
                    className="bg-white text-black px-8 py-4 rounded-sm font-bold tracking-tight flex items-center gap-3 hover:opacity-90 transition-all shadow-lg shadow-white/10"
                  >
                    Add to Cart
                    <span className="material-icons">add_shopping_cart</span>
                  </button>
                  <button 
                    onClick={() => whatsappQuote(activeChipset)}
                    className="bg-[#25D366] text-white px-8 py-4 rounded-sm font-bold tracking-tight flex items-center gap-3 hover:opacity-90 transition-all shadow-lg shadow-emerald-900/20"
                  >
                    WhatsApp for Price
                    <span className="material-icons">chat</span>
                  </button>
                  <button 
                    onClick={() => setShowSpecs(true)}
                    className="w-14 h-14 flex items-center justify-center border border-white/20 rounded-sm hover:bg-white/10 transition-all text-white"
                  >
                    <span className="material-icons">info</span>
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/2 relative bg-white/5 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeChipset}
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 0.8, scale: 1.1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    alt={activeChipset} 
                    className="w-full h-full object-cover -rotate-12 translate-x-10 translate-y-10" 
                    src={currentChipset.img || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"} 
                    referrerPolicy="no-referrer" 
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
              </div>
            </motion.div>

            {/* Legacy Inventory Grid */}
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-[0.4em] mb-8">Legacy Inventory</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[
                { name: "H410M-K", chipset: "H410", price: "18,500" },
                { name: "B460M-A", chipset: "B460", price: "24,500" },
                { name: "H510M-E", chipset: "H510", price: "22,500" },
                { name: "B560M-PRO", chipset: "B560", price: "28,500" },
                { name: "Z590-PLUS", chipset: "Z590", price: "45,500" },
                { name: "H610M-K", chipset: "H610", price: "26,500" },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all group relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.chipset} Chipset</span>
                    <span className="material-icons text-gray-500 group-hover:text-white transition-colors">memory</span>
                  </div>
                  <h5 className="text-lg font-bold mb-4">{item.name}</h5>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="text-xl font-black text-white">LKR {item.price}</div>
                    <button 
                      onClick={() => addToCart({
                        id: `legacy-${item.name}`,
                        title: item.name,
                        price: `LKR ${item.price}`,
                        img: 'https://picsum.photos/seed/mobo/400/400',
                        category: 'Legacy Inventory'
                      })}
                      className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-white hover:text-black transition-all shadow-lg"
                    >
                      <span className="material-icons text-sm">add_shopping_cart</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Quick Specs Modal */}
      <AnimatePresence>
        {showSpecs && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSpecs(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-sm shadow-[0_0_50px_rgba(255,255,255,0.05)]"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="text-white/40 text-[10px] font-black tracking-[0.4em] uppercase mb-2 block">Technical Specifications</span>
                  <h2 className="font-headline text-3xl font-black text-white tracking-tighter uppercase">{activeChipset}</h2>
                </div>
                <button 
                  onClick={() => setShowSpecs(false)}
                  className="text-white/20 hover:text-white transition-colors"
                >
                  <span className="material-icons text-2xl">close</span>
                </button>
              </div>

              <div className="space-y-6">
                {Object.entries(currentChipset.specs || {}).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{key}</span>
                    <span className="text-sm font-bold text-white tracking-tight">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-4 bg-white/5 border border-white/10 rounded-sm">
                <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">
                  * Specifications are based on reference designs. Actual features may vary by manufacturer.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
