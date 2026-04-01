import { Link } from 'react-router-dom';

export default function HardwareCatalog() {
  const intelSeries = [
    { name: "Z490 Series", featured: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtDNfgCXol74uBSDNbhCM-MkDeF0TxaxQ3jeo2uNcPmbEL-s7k_MEP37ENGCdVTzXPIR1vWPD1go9BH9VSgv4KP8Zt-F7VTGsHJ2SzHt29hJ-rT7b6M4PuUBneoA-FiaQtXhH1fTt0qCu2L-qgGKe_7Xy0GKc6r49pXGOa88pXj7LjWiAfR4tH93Eto6JjER5GYL5CpIP1XSzwvTgyg2kLyslMkLKTg-UbicZXGkdGZovyO6jdu8Oz40yeGQKl2Taz_GckfcYh" },
    { name: "Z390 Series" },
    { name: "Z370 Series" },
    { name: "Z270 Series" },
    { name: "Z170 Series" },
    { name: "Z97 Series" },
    { name: "Z87 Series" },
    { name: "Z77 Series" },
  ];

  return (
    <div className="dark-theme min-h-screen bg-surface text-on-surface font-body">
      <div className="max-w-screen-2xl mx-auto px-8 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-outline mb-10">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link to="/hardware" className="hover:text-primary transition-colors">Hardware Catalog</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary">Intel Chipsets</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black font-headline tracking-tighter uppercase">Intel Chipsets</h2>
              <button className="lg:hidden material-symbols-outlined">filter_list</button>
            </div>
            <ul className="space-y-1">
              {intelSeries.map((series, i) => (
                <li key={i}>
                  <button className={`w-full text-left px-4 py-3 rounded text-sm font-bold tracking-tight transition-all ${series.featured ? 'bg-primary-container text-on-primary-container shadow-lg' : 'hover:bg-surface-container-high text-outline hover:text-on-surface'}`}>
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
                <button className="flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-surface-container-highest transition-all">
                  <span className="material-symbols-outlined text-sm">filter_alt</span>
                  Filter
                </button>
                <span className="text-xs font-bold text-outline uppercase tracking-widest">Showing 12 Results</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 bg-primary-container text-on-primary-container rounded shadow-md">
                  <span className="material-symbols-outlined">grid_view</span>
                </button>
                <button className="p-2 text-outline hover:text-on-surface">
                  <span className="material-symbols-outlined">view_list</span>
                </button>
              </div>
            </div>

            {/* Featured Product */}
            <div className="bg-surface-container-low rounded-2xl overflow-hidden mb-12 flex flex-col md:flex-row shadow-2xl border border-outline-variant/10">
              <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                <span className="text-secondary font-bold tracking-[0.3em] text-[10px] uppercase mb-4">PREMIUM PERFORMANCE</span>
                <h3 className="text-5xl font-black font-headline tracking-tighter mb-6 leading-none">Z490 Series <br/><span className="text-outline">Foundry Edition</span></h3>
                <p className="text-outline text-sm leading-relaxed mb-10 max-w-sm">Engineered for 10th Gen Intel Core processors. Featuring 12+2 DrMOS power stages and optimized thermal solutions for extreme overclocking.</p>
                <div className="flex items-center gap-4">
                  <button className="bg-[#25D366] text-white px-8 py-4 rounded font-bold tracking-tight flex items-center gap-3 hover:opacity-90 transition-all shadow-lg shadow-emerald-900/20">
                    WhatsApp for Price
                    <span className="material-symbols-outlined">chat</span>
                  </button>
                  <button className="w-14 h-14 flex items-center justify-center border border-outline rounded hover:bg-surface-container-high transition-all">
                    <span className="material-symbols-outlined">info</span>
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/2 relative bg-surface-container-high overflow-hidden">
                <img alt="Z490 Motherboard" className="w-full h-full object-cover scale-110 -rotate-12 translate-x-10 translate-y-10 opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtDNfgCXol74uBSDNbhCM-MkDeF0TxaxQ3jeo2uNcPmbEL-s7k_MEP37ENGCdVTzXPIR1vWPD1go9BH9VSgv4KP8Zt-F7VTGsHJ2SzHt29hJ-rT7b6M4PuUBneoA-FiaQtXhH1fTt0qCu2L-qgGKe_7Xy0GKc6r49pXGOa88pXj7LjWiAfR4tH93Eto6JjER5GYL5CpIP1XSzwvTgyg2kLyslMkLKTg-UbicZXGkdGZovyO6jdu8Oz40yeGQKl2Taz_GckfcYh" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-r from-surface-container-low via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Legacy Inventory Grid */}
            <h4 className="text-xs font-bold text-outline uppercase tracking-[0.4em] mb-8">Legacy Inventory</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[
                { name: "H410M-K", chipset: "H410", price: "18,500" },
                { name: "B460M-A", chipset: "B460", price: "24,500" },
                { name: "H510M-E", chipset: "H510", price: "22,500" },
                { name: "B560M-PRO", chipset: "B560", price: "28,500" },
                { name: "Z590-PLUS", chipset: "Z590", price: "45,500" },
                { name: "H610M-K", chipset: "H610", price: "26,500" },
              ].map((item, i) => (
                <div key={i} className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 hover:border-primary/40 transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-bold text-outline uppercase tracking-widest">{item.chipset} Chipset</span>
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">memory</span>
                  </div>
                  <h5 className="text-lg font-bold mb-4">{item.name}</h5>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="text-xl font-black text-on-surface">LKR {item.price}</div>
                    <button className="w-10 h-10 flex items-center justify-center bg-surface-container-high rounded-full hover:bg-primary-container hover:text-on-primary-container transition-all">
                      <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
