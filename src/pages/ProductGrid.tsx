import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import ProductSpecsModal from '../components/ProductSpecsModal';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import PriceFilter from '../components/PriceFilter';
import { 
  usedProcessors, 
  ryzenBrandNew, 
  intelBrandNew, 
  usedRAM, 
  usedStorage, 
  motherboardInventory, 
  vgaInventory, 
  accessoryData,
  allProducts
} from '../constants/inventory';

const intelChipsets = [
// ... (rest of the file remains the same, I'll just show the relevant parts)
  'G41', 'H61', 'H81', 'H110', 'H310', 'H410', 'H510',
  'B75', 'B85', 'B150', 'B250', 'B360', 'B460',
  'Z97', 'Z170', 'Z270', 'Z370', 'Z390', 'Z490'
];

const ryzenSeries = ['A320', 'B450', 'B550', 'X470', 'X570'];

const laptopGenerations = [
  { label: 'Core i3', gens: '2nd to 11th Gen' },
  { label: 'Core i5', gens: '2nd to 11th Gen' },
  { label: 'Core i7', gens: '2nd to 11th Gen' },
  { label: 'Ryzen Series', gens: '3000 to 5000 Series' }
];

const ConditionBadge = ({ condition }: { condition: string }) => {
  const isNew = condition === 'new';
  const isUsed = condition === 'used';
  const label = isNew ? 'Brand New - Sealed Box' : (isUsed ? 'Used - Tested & Guaranteed' : condition.toUpperCase());
  const colorClass = isNew ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 
                     (isUsed ? 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]' : 
                     'bg-primary shadow-[0_0_10px_rgba(0,242,255,0.5)]');

  return (
    <div className={`absolute top-4 right-4 px-2 py-1 rounded-sm text-[8px] font-bold uppercase tracking-widest shadow-lg z-20 text-surface ${colorClass}`}>
      {label}
    </div>
  );
};

const OutOfStockOverlay = () => (
  <div className="absolute inset-0 bg-surface/80 backdrop-blur-[2px] z-30 flex items-center justify-center">
    <span className="font-headline text-xl font-black text-red-500 uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.5)] border border-red-500/50 px-4 py-2 rounded-sm rotate-[-5deg]">OUT OF STOCK</span>
  </div>
);

export default function ProductGrid() {
  const { slug, condition } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { searchQuery } = useSearch();
  const [filter, setFilter] = useState<'all' | 'new' | 'used' | string>(condition || 'all');
  const [activeTab, setActiveTab] = useState('Intel Core i3 Series');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500000 });
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const scrollToGrid = () => {
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const parsePrice = (priceStr: string) => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/,/g, ''), 10);
  };

  const isAccessory = ['keyboards', 'mouse', 'speakers', 'laptop-accessories', 'network-accessories', 'cables', 'ups', 'party-boxes'].includes(slug || '');
  const isUsed = filter === 'used';
  const isNew = filter === 'new';
  const isAll = filter === 'all';
  const isMotherboard = slug === 'motherboards';
  const isLaptop = slug === 'laptops';
  const isProcessor = slug === 'processors';
  const isRAM = slug === 'ram';
  const isStorage = slug === 'storage';
  const isVGA = slug === 'vga';

  const currentCategoryMinMax = useMemo(() => {
    let allItems: any[] = [];
    
    if (isProcessor) {
      Object.values(usedProcessors).forEach(cat => allItems.push(...cat));
      Object.values(ryzenBrandNew).forEach(cat => allItems.push(...cat));
      Object.values(intelBrandNew).forEach(cat => allItems.push(...cat));
    }
    if (isRAM) {
      Object.values(usedRAM).forEach(cat => allItems.push(...cat));
    }
    if (isStorage) {
      Object.values(usedStorage).forEach(cat => allItems.push(...cat));
    }
    if (isVGA) {
      Object.values(vgaInventory).forEach(cat => allItems.push(...cat));
    }
    if (isMotherboard) {
      Object.values(motherboardInventory).forEach(cat => allItems.push(...cat));
    }
    if (isAccessory && slug && accessoryData[slug]) {
      Object.values(accessoryData[slug]).forEach(cat => allItems.push(...cat));
    }

    if (allItems.length === 0) return { min: 0, max: 500000 };

    const prices = allItems.map(item => parsePrice(item.price || '0')).filter(p => p > 0);
    if (prices.length === 0) return { min: 0, max: 500000 };

    const min = Math.min(...prices);
    const max = Math.max(...prices);
    
    return { 
      min: Math.max(0, Math.floor(min / 1000) * 1000 - 1000), 
      max: Math.ceil(max / 1000) * 1000 + 1000 
    };
  }, [slug, isProcessor, isRAM, isStorage, isMotherboard, isAccessory]);

  useEffect(() => {
    setPriceRange({ min: currentCategoryMinMax.min, max: currentCategoryMinMax.max });
  }, [currentCategoryMinMax]);

  const brandColor = selectedBrand === 'ryzen' ? 'ryzen' : (selectedBrand === 'intel' ? 'secondary' : 'primary');
  const neonGlow = selectedBrand === 'ryzen' ? 'neon-glow-ryzen' : (selectedBrand === 'intel' ? 'neon-glow-blue' : 'neon-glow-cyan');
  const neonBorder = selectedBrand === 'ryzen' ? 'hover:neon-border-ryzen' : (selectedBrand === 'intel' ? 'hover:neon-border-blue' : 'hover:neon-border-cyan');

  useEffect(() => {
    const showUsed = filter === 'all' || filter === 'used';
    if (isProcessor && showUsed) {
      setActiveTab('Intel Core i3 Series');
    } else if (isRAM && showUsed) {
      setActiveTab('DDR3 Series');
    } else if (isStorage && showUsed) {
      setActiveTab('SSD');
    } else if (isVGA && showUsed) {
      setActiveTab('NVIDIA Series');
    } else if (isMotherboard && showUsed) {
      setActiveTab('H-Series (Budget Boards)');
    }
  }, [isProcessor, isRAM, isStorage, isVGA, isMotherboard, filter]);

  const renderSpecializedGrid = () => {
    const showUsed = filter === 'all' || filter === 'used';
    const showNew = filter === 'all' || filter === 'new';
    const sections: React.ReactNode[] = [];

    const filterItems = (items: any[]) => {
      if (!items) return [];
      let filtered = items;
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const keywords = query.split(' ').filter(k => k.length > 0);
        filtered = filtered.filter(item => {
          const searchString = `${item.model || ''} ${item.name || ''} ${item.label || ''} ${item.category || ''} ${item.condition || ''}`.toLowerCase();
          return keywords.every(keyword => searchString.includes(keyword));
        });
      }

      filtered = filtered.filter(item => {
        const price = parsePrice(item.price || '0');
        return price >= priceRange.min && price <= priceRange.max;
      });

      return filtered;
    };

    if (isProcessor) {
      if (showUsed) {
        const filteredUsed = filterItems(usedProcessors[activeTab as keyof typeof usedProcessors] || []);
        sections.push(
          <div key="used-processors" className="space-y-12">
            {filter === 'all' && <h3 className="font-headline text-xl font-black text-primary mb-8 uppercase tracking-widest neon-glow-cyan">Certified Used Processors</h3>}
            <div ref={gridRef} className="flex flex-wrap gap-4 border-b border-primary/20 pb-4 scroll-mt-32">
              {Object.keys(usedProcessors).map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveTab(category);
                    scrollToGrid();
                  }}
                  className={`px-8 py-3 font-headline text-sm font-bold uppercase tracking-widest transition-all rounded-sm border ${
                    activeTab === category
                      ? 'bg-primary text-surface border-primary shadow-[0_0_20px_rgba(0,242,255,0.4)]'
                      : 'bg-surface-container text-primary/40 border-primary/10 hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredUsed.map((item: any, i: number) => (
                  <motion.div
                    key={item.model}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedProduct({ ...item, condition: 'used', category: 'Processors' })}
                    className="group bg-surface-container border border-primary/20 hover:neon-border-cyan transition-all rounded-sm flex flex-col relative overflow-hidden cursor-pointer"
                  >
                    <ConditionBadge condition="used" />
                    {(item as any).outOfStock && <OutOfStockOverlay />}
                    <div className="w-full h-48 bg-surface rounded-t-sm border-b border-primary/30 flex items-center justify-center group-hover:neon-border-cyan transition-all shadow-[inset_0_0_15px_rgba(0,242,255,0.1)] p-4">
                      {item.img ? (
                        <img 
                          src={item.img} 
                          alt={item.model} 
                          className="w-full h-full object-contain neon-bloom"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="material-icons text-6xl text-primary neon-glow-cyan">memory</span>
                      )}
                    </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h4 className="font-headline font-bold text-white group-hover:text-primary transition-colors uppercase tracking-tight mb-2 text-lg">{item.model}</h4>
                        <div className="text-2xl font-black text-primary neon-glow-cyan mb-6">
                          <span className="text-xs font-bold mr-1">Rs.</span>
                          {item.price}/=
                        </div>
                        <div className="mt-auto flex gap-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart({
                                id: `used-proc-${item.model}`,
                                title: item.model,
                                price: `LKR ${item.price}`,
                                img: item.img || 'https://picsum.photos/seed/cpu/400/400',
                                category: 'Processors'
                              });
                            }}
                            className="flex-1 btn-neon-cyan flex items-center justify-center gap-2 !py-3 !text-[10px]"
                          >
                            <span className="material-symbols-outlined text-2xl icon-enhanced">shopping_cart</span>
                            BUY NOW
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(`https://wa.me/94789827123?text=${encodeURIComponent(`Hi Citrix Computer, I am interested in the ${item.model}. Is it available?`)}`, '_blank');
                            }}
                            className="w-12 h-12 flex items-center justify-center border border-[#25D366]/30 text-[#25D366] rounded-sm hover:bg-[#25D366] hover:text-surface transition-all"
                          >
                            <span className="material-symbols-outlined text-2xl icon-enhanced">chat</span>
                          </button>
                        </div>
                      </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        );
      }

      if (showNew) {
        if (!selectedBrand) {
          sections.push(
            <div key="brand-selection" className="space-y-12">
              {filter === 'all' && <h3 className="font-headline text-xl font-black text-secondary mb-8 uppercase tracking-widest neon-glow-blue">Brand New Processors</h3>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto pt-12">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedBrand('intel')}
                  className="group relative aspect-[4/3] bg-surface-container border border-primary/20 rounded-sm overflow-hidden flex flex-col items-center justify-center gap-6 hover:neon-border-cyan transition-all duration-500 shadow-[0_0_30px_rgba(0,242,255,0.05)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-32 h-32 rounded-full bg-surface border border-primary/30 flex items-center justify-center group-hover:neon-border-cyan transition-all shadow-[0_0_20px_rgba(0,242,255,0.1)]">
                    <span className="material-icons text-7xl text-primary neon-glow-cyan">memory</span>
                  </div>
                  <div className="text-center">
                    <h3 className="font-headline text-3xl font-black text-white group-hover:text-primary transition-colors uppercase tracking-widest mb-2">INTEL BRAND NEW</h3>
                    <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Brand New Selection</p>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedBrand('ryzen')}
                  className="group relative aspect-[4/3] bg-surface-container border border-ryzen/20 rounded-sm overflow-hidden flex flex-col items-center justify-center gap-6 hover:neon-border-ryzen transition-all duration-500 shadow-[0_0_30px_rgba(255,78,0,0.05)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-ryzen/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-32 h-32 rounded-full bg-surface border border-ryzen/30 flex items-center justify-center group-hover:neon-border-ryzen transition-all shadow-[0_0_20px_rgba(255,78,0,0.1)]">
                    <span className="material-icons text-7xl text-ryzen neon-glow-ryzen">memory</span>
                  </div>
                  <div className="text-center">
                    <h3 className="font-headline text-3xl font-black text-white group-hover:text-ryzen transition-colors uppercase tracking-widest mb-2">RYZEN BRAND NEW</h3>
                    <p className="text-[10px] font-bold text-ryzen/40 uppercase tracking-widest">Brand New Selection</p>
                  </div>
                </motion.button>
              </div>
            </div>
          );
        } else {
          const brandData = selectedBrand === 'ryzen' ? ryzenBrandNew : intelBrandNew;
          sections.push(
            <div key="new-processors-data" className="space-y-24">
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setSelectedBrand(null)}
                className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-${brandColor}/60 hover:text-${brandColor} transition-all group mb-8`}
              >
                <span className="material-icons text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
                BACK TO BRAND SELECTION
              </motion.button>

              {Object.entries(brandData).map(([category, items], catIdx) => {
                const filteredItems = filterItems(items);
                if (filteredItems.length === 0) return null;
                
                return (
                  <div key={category}>
                    <h3 className={`font-headline text-2xl font-black text-${brandColor} mb-8 uppercase tracking-widest ${neonGlow}`}>{category}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredItems.map((item: any, i: number) => (
                        <motion.div
                          key={item.model}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: (catIdx * 0.1) + (i * 0.05) }}
                          onClick={() => setSelectedProduct({ ...item, condition: 'new', category: 'Processors' })}
                          className={`group bg-surface-container border border-${brandColor}/10 ${neonBorder} transition-all rounded-sm flex flex-col relative overflow-hidden cursor-pointer`}
                        >
                          <ConditionBadge condition="new" />
                          {item.warranty && (
                            <div className="absolute top-12 right-4 px-2 py-1 rounded-sm text-[8px] font-bold uppercase tracking-widest shadow-lg z-20 text-surface bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                              Official Warranty
                            </div>
                          )}
                          {(item as any).outOfStock && <OutOfStockOverlay />}
                          <div className={`w-full h-48 bg-surface rounded-t-sm border-b border-${brandColor}/20 flex items-center justify-center ${neonBorder} transition-all overflow-hidden p-4`}>
                            {item.img ? (
                              <img src={item.img} alt={item.model} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                            ) : (
                              <span className={`material-icons text-6xl text-${brandColor} ${neonGlow}`}>memory</span>
                            )}
                          </div>
                          <div className="p-6 flex flex-col flex-grow">
                            <h4 className={`font-headline font-bold text-white group-hover:text-${brandColor} transition-colors uppercase tracking-tight mb-1 text-lg`}>{item.model}</h4>
                            {!item.outOfStock && (
                              <>
                                <div className={`text-2xl font-black text-${brandColor} ${neonGlow} mb-1`}>LKR {item.price}</div>
                                <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest mb-6">{item.warranty}</div>
                              </>
                            )}
                            <div className="mt-auto flex gap-2">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart({
                                    id: `new-proc-${item.model}`,
                                    title: item.model,
                                    price: `LKR ${item.price}`,
                                    img: item.img || 'https://picsum.photos/seed/cpu-new/400/400',
                                    category: 'Processors'
                                  });
                                }}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 border border-${brandColor}/30 text-${brandColor} rounded-sm hover:bg-${brandColor} hover:text-surface transition-all font-bold text-[10px] uppercase tracking-widest shadow-[0_0_10px_rgba(0,242,255,0.2)]`}
                              >
                                <span className="material-symbols-outlined text-2xl icon-enhanced">shopping_cart</span>
                                BUY NOW
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(`https://wa.me/94789827123?text=${encodeURIComponent(`Hi Citrix Computer, I am interested in the ${item.model}. Is it available?`)}`, '_blank');
                                }}
                                className={`flex-1 flex items-center justify-center gap-2 border border-[#25D366]/30 text-[#25D366] rounded-sm hover:bg-[#25D366] hover:text-surface transition-all font-bold text-[10px] uppercase tracking-widest`}
                              >
                                <span className="material-symbols-outlined text-2xl icon-enhanced">chat</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }
      }
    }

    if (isMotherboard) {
      if (showUsed) {
        const filteredUsed = filterItems(motherboardInventory[activeTab as keyof typeof motherboardInventory] || []);
        sections.push(
          <div key="used-motherboards" className="space-y-12">
            {filter === 'all' && <h3 className="font-headline text-xl font-black text-primary mb-8 uppercase tracking-widest neon-glow-cyan">Certified Used Motherboards</h3>}
            <div ref={gridRef} className="flex flex-wrap gap-4 border-b border-primary/20 pb-4 scroll-mt-32">
              {Object.keys(motherboardInventory).map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveTab(category);
                    scrollToGrid();
                  }}
                  className={`px-8 py-3 font-headline text-sm font-bold uppercase tracking-widest transition-all rounded-sm border ${
                    activeTab === category
                      ? 'bg-primary text-surface border-primary shadow-[0_0_20px_rgba(0,242,255,0.4)]'
                      : 'bg-surface-container text-primary/40 border-primary/10 hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredUsed.map((item: any, i: number) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedProduct({ ...item, condition: 'used', category: 'Motherboards' })}
                    className="group bg-surface-container border border-primary/20 hover:neon-border-cyan transition-all rounded-sm flex flex-col relative overflow-hidden cursor-pointer"
                  >
                    <ConditionBadge condition="used" />
                    {item.outOfStock && <OutOfStockOverlay />}
                    <div className="w-full h-48 bg-transparent rounded-t-sm border-b border-primary/30 flex items-center justify-center group-hover:neon-border-cyan transition-all shadow-[inset_0_0_15px_rgba(0,242,255,0.1)] p-4">
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                        style={{ 
                          mixBlendMode: 'screen', 
                          filter: 'contrast(120%) brightness(110%) drop-shadow(0 0 15px rgba(0, 242, 255, 0.4))' 
                        }}
                        referrerPolicy="no-referrer" 
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-primary/50 uppercase tracking-[0.2em]">{item.chip}</span>
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] neon-glow-lightblue-dual">{item.warranty}</span>
                      </div>
                      <h4 className="font-headline font-bold text-white group-hover:text-primary transition-colors uppercase tracking-tight mb-2 text-lg">{item.name}</h4>
                      <div className="text-2xl font-black text-primary neon-glow-cyan mb-6">
                        <span className="text-xs font-bold mr-1">Rs.</span>
                        {item.price}/=
                      </div>
                      <div className="mt-auto flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart({
                              id: item.id,
                              title: item.name,
                              price: `LKR ${item.price}`,
                              img: item.img,
                              category: 'Motherboards'
                            });
                          }}
                          className="flex-1 btn-neon-cyan flex items-center justify-center gap-2 !py-3 !text-[10px]"
                        >
                          <span className="material-symbols-outlined text-2xl icon-enhanced">shopping_cart</span>
                          BUY NOW
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://wa.me/94789827123?text=${encodeURIComponent(`Hi Citrix Computer, I am interested in the ${item.name}. Is it available?`)}`, '_blank');
                          }}
                          className="w-12 h-12 flex items-center justify-center border border-[#25D366]/30 text-[#25D366] rounded-sm hover:bg-[#25D366] hover:text-surface transition-all"
                        >
                          <span className="material-symbols-outlined text-2xl icon-enhanced">chat</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        );
      }
    }

    if (isLaptop) {
      if (showUsed) {
        const filteredLaptops = filterItems(laptopGenerations || []);
        sections.push(
          <div key="used-laptops" className="space-y-12">
            {filter === 'all' && <h3 className="font-headline text-xl font-black text-primary mb-8 uppercase tracking-widest neon-glow-cyan">Certified Used Laptops</h3>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredLaptops.map((gen, i) => (
                <motion.div
                  key={gen.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedProduct({ ...gen, condition: 'used', category: 'Laptops' })}
                  className="group bg-surface-container border border-primary/10 hover:neon-border-cyan transition-all rounded-sm flex flex-col relative overflow-hidden cursor-pointer"
                >
                  <ConditionBadge condition="used" />
                  <div className="w-full h-48 bg-surface rounded-t-sm border-b border-primary/30 flex items-center justify-center group-hover:neon-border-cyan transition-all shadow-[inset_0_0_15px_rgba(0,242,255,0.1)] p-4">
                    <span className="material-icons text-6xl text-primary neon-glow-cyan">laptop</span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-headline text-2xl font-black text-white group-hover:text-primary transition-colors uppercase tracking-tighter mb-2">{gen.label}</h3>
                    <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest mb-6">{gen.gens}</p>
                    <div className="mt-auto flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({
                            id: `used-laptop-${gen.label}`,
                            title: `${gen.label} Laptop`,
                            price: 'LKR 45,000.00',
                            img: 'https://picsum.photos/seed/laptop/400/400',
                            category: 'Laptops'
                          });
                        }}
                        className="flex-1 btn-neon-cyan !py-3 !text-[10px] flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-2xl icon-enhanced">shopping_cart</span>
                        BUY NOW
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`https://wa.me/94789827123?text=${encodeURIComponent(`Hi Citrix Computer, I am interested in the ${gen.label} Laptop. Is it available?`)}`, '_blank');
                        }}
                        className="w-12 h-12 border border-[#25D366]/30 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-surface transition-all rounded-sm"
                      >
                        <span className="material-symbols-outlined text-2xl icon-enhanced">chat</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      }
    }

    if (isRAM) {
      if (showUsed) {
        const filteredRAM = filterItems(usedRAM[activeTab as keyof typeof usedRAM] || []);
        sections.push(
          <div key="used-ram" className="space-y-12">
            {filter === 'all' && <h3 className="font-headline text-xl font-black text-primary mb-8 uppercase tracking-widest neon-glow-cyan">Certified Used RAM</h3>}
            <div ref={gridRef} className="flex flex-wrap gap-4 border-b border-primary/20 pb-4 scroll-mt-32">
              {Object.keys(usedRAM).map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveTab(category);
                    scrollToGrid();
                  }}
                  className={`px-8 py-3 font-headline text-sm font-bold uppercase tracking-widest transition-all rounded-sm border ${
                    activeTab === category
                      ? 'bg-primary text-surface border-primary shadow-[0_0_20px_rgba(0,242,255,0.4)]'
                      : 'bg-surface-container text-primary/40 border-primary/10 hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredRAM.map((item: any, i: number) => (
                  <motion.div
                    key={item.model}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedProduct({ ...item, condition: 'used', category: 'RAM' })}
                    className="group bg-surface-container border border-primary/20 hover:neon-border-cyan transition-all rounded-sm flex flex-col relative overflow-hidden cursor-pointer"
                  >
                    <ConditionBadge condition="used" />
                    {(item as any).outOfStock && <OutOfStockOverlay />}
                    <div className="w-full h-48 bg-surface rounded-t-sm border-b border-primary/30 flex items-center justify-center group-hover:neon-border-cyan transition-all shadow-[inset_0_0_15px_rgba(0,242,255,0.1)] p-4">
                      <span className="material-icons text-6xl text-primary neon-glow-cyan">memory_alt</span>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h4 className="font-headline font-bold text-white group-hover:text-primary transition-colors uppercase tracking-tight mb-2 text-lg">{item.model}</h4>
                      <div className="text-2xl font-black text-primary neon-glow-cyan mb-6">
                        <span className="text-xs font-bold mr-1">Rs.</span>
                        {item.price}/=
                      </div>
                      <div className="mt-auto flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart({
                              id: `used-ram-${item.model}`,
                              title: item.model,
                              price: `LKR ${item.price}`,
                              img: 'https://picsum.photos/seed/ram/400/400',
                              category: 'RAM'
                            });
                          }}
                          className="flex-1 btn-neon-cyan flex items-center justify-center gap-2 !py-3 !text-[10px]"
                        >
                          <span className="material-symbols-outlined text-2xl icon-enhanced">shopping_cart</span>
                          BUY NOW
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://wa.me/94789827123?text=${encodeURIComponent(`Hi Citrix Computer, I am interested in the ${item.model}. Is it available?`)}`, '_blank');
                          }}
                          className="w-12 h-12 flex items-center justify-center border border-[#25D366]/30 text-[#25D366] rounded-sm hover:bg-[#25D366] hover:text-surface transition-all"
                        >
                          <span className="material-symbols-outlined text-2xl icon-enhanced">chat</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        );
      }
    }

    if (isVGA) {
      if (showUsed) {
        const filteredVGA = filterItems(vgaInventory[activeTab as keyof typeof vgaInventory] || []);
        sections.push(
          <div key="used-vga" className="space-y-12">
            {filter === 'all' && <h3 className="font-headline text-xl font-black text-primary mb-8 uppercase tracking-widest neon-glow-cyan">Certified Used VGA</h3>}
            <div ref={gridRef} className="flex flex-wrap gap-4 border-b border-primary/20 pb-4 scroll-mt-32">
              {Object.keys(vgaInventory).map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveTab(category);
                    scrollToGrid();
                  }}
                  className={`px-8 py-3 font-headline text-sm font-bold uppercase tracking-widest transition-all rounded-sm border ${
                    activeTab === category
                      ? 'bg-primary text-surface border-primary shadow-[0_0_20px_rgba(0,242,255,0.4)]'
                      : 'bg-surface-container text-primary/40 border-primary/10 hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredVGA.map((item: any, i: number) => (
                  <motion.div
                    key={item.model}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedProduct({ ...item, condition: 'used', category: 'VGA' })}
                    className="group bg-surface-container border border-primary/20 hover:neon-border-cyan transition-all rounded-sm flex flex-col relative overflow-hidden cursor-pointer"
                  >
                    <ConditionBadge condition="used" />
                    {(item as any).outOfStock && <OutOfStockOverlay />}
                    <div className="w-full h-48 bg-surface rounded-t-sm border-b border-primary/30 flex items-center justify-center group-hover:neon-border-cyan transition-all shadow-[inset_0_0_15px_rgba(0,242,255,0.1)] p-4">
                      {item.img ? (
                        <img src={item.img} alt={item.model} className="w-full h-full object-contain neon-bloom" referrerPolicy="no-referrer" />
                      ) : (
                        <span className="material-icons text-6xl text-primary neon-glow-cyan">videogame_asset</span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h4 className="font-headline font-bold text-white group-hover:text-primary transition-colors uppercase tracking-tight mb-2 text-lg">{item.model}</h4>
                      <div className="text-2xl font-black text-primary neon-glow-cyan mb-6">
                        <span className="text-xs font-bold mr-1">Rs.</span>
                        {item.price}/=
                      </div>
                      <div className="mt-auto flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart({
                              id: `used-vga-${item.model}`,
                              title: item.model,
                              price: `LKR ${item.price}`,
                              img: item.img || 'https://picsum.photos/seed/vga/400/400',
                              category: 'VGA'
                            });
                          }}
                          className="flex-1 btn-neon-cyan flex items-center justify-center gap-2 !py-3 !text-[10px]"
                        >
                          <span className="material-symbols-outlined text-2xl icon-enhanced">shopping_cart</span>
                          BUY NOW
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://wa.me/94789827123?text=${encodeURIComponent(`Hi Citrix Computer, I am interested in the ${item.model}. Is it available?`)}`, '_blank');
                          }}
                          className="w-12 h-12 flex items-center justify-center border border-[#25D366]/30 text-[#25D366] rounded-sm hover:bg-[#25D366] hover:text-surface transition-all"
                        >
                          <span className="material-symbols-outlined text-2xl icon-enhanced">chat</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        );
      }
    }

    if (isStorage) {
      if (showUsed) {
        const filteredStorage = filterItems(usedStorage[activeTab as keyof typeof usedStorage] || []);
        sections.push(
          <div key="used-storage" className="space-y-12">
            {filter === 'all' && <h3 className="font-headline text-xl font-black text-primary mb-8 uppercase tracking-widest neon-glow-cyan">Certified Used Storage</h3>}
            <div ref={gridRef} className="flex flex-wrap gap-4 border-b border-primary/20 pb-4 scroll-mt-32">
              {Object.keys(usedStorage).map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveTab(category);
                    scrollToGrid();
                  }}
                  className={`px-8 py-3 font-headline text-sm font-bold uppercase tracking-widest transition-all rounded-sm border ${
                    activeTab === category
                      ? 'bg-primary text-surface border-primary shadow-[0_0_20px_rgba(0,242,255,0.4)]'
                      : 'bg-surface-container text-primary/40 border-primary/10 hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredStorage.map((item: any, i: number) => (
                  <motion.div
                    key={item.model}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedProduct({ ...item, condition: 'used', category: 'Storage' })}
                    className="group bg-surface-container border border-primary/20 hover:neon-border-cyan transition-all rounded-sm flex flex-col relative overflow-hidden cursor-pointer"
                  >
                    <ConditionBadge condition="used" />
                    {(item as any).outOfStock && <OutOfStockOverlay />}
                    <div className="w-full h-48 bg-surface rounded-t-sm border-b border-primary/30 flex items-center justify-center group-hover:neon-border-cyan transition-all shadow-[inset_0_0_15px_rgba(0,242,255,0.1)] p-4">
                      <span className="material-icons text-6xl text-primary neon-glow-cyan">{item.icon}</span>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h4 className="font-headline font-bold text-white group-hover:text-primary transition-colors uppercase tracking-tight mb-2 text-lg">{item.model}</h4>
                      <div className="text-2xl font-black text-primary neon-glow-cyan mb-6">
                        <span className="text-xs font-bold mr-1">Rs.</span>
                        {item.price}/=
                      </div>
                      <div className="mt-auto flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart({
                              id: `used-storage-${item.model}`,
                              title: item.model,
                              price: `LKR ${item.price}`,
                              img: 'https://picsum.photos/seed/storage/400/400',
                              category: 'Storage'
                            });
                          }}
                          className="flex-1 btn-neon-cyan flex items-center justify-center gap-2 !py-3 !text-[10px]"
                        >
                          <span className="material-symbols-outlined text-2xl icon-enhanced">shopping_cart</span>
                          BUY NOW
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://wa.me/94789827123?text=${encodeURIComponent(`Hi Citrix Computer, I am interested in the ${item.model}. Is it available?`)}`, '_blank');
                          }}
                          className="w-12 h-12 flex items-center justify-center border border-[#25D366]/30 text-[#25D366] rounded-sm hover:bg-[#25D366] hover:text-surface transition-all"
                        >
                          <span className="material-symbols-outlined text-2xl icon-enhanced">chat</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        );
      }
    }

    const isAccessoryLocal = ['keyboards', 'mouse', 'speakers', 'laptop-accessories', 'network-accessories', 'cables', 'ups', 'party-boxes'].includes(slug || '');

    if (isAccessoryLocal && slug) {
      const categoryAccessories = accessoryData[slug];
      if (categoryAccessories) {
        const subSlug = filter === 'all' ? Object.keys(categoryAccessories)[0] : filter;
        const filteredAccessories = filterItems(categoryAccessories[subSlug] || []);
        
        sections.push(
          <div key={`accessory-${slug}`} className="space-y-12">
            <div className="flex flex-wrap gap-4 border-b border-primary/20 pb-4">
              {Object.keys(categoryAccessories).map((sub) => (
                <button
                  key={sub}
                  onClick={() => setFilter(sub as any)}
                  className={`px-8 py-3 font-headline text-sm font-bold uppercase tracking-widest transition-all rounded-sm border ${
                    filter === sub
                      ? 'bg-primary text-surface border-primary shadow-[0_0_20px_rgba(0,242,255,0.4)]'
                      : 'bg-surface-container text-primary/40 border-primary/10 hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredAccessories.map((item: any, i: number) => (
                  <motion.div
                    key={item.model}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedProduct({ ...item, condition: filter, category: slug.toUpperCase() })}
                    className="group bg-surface-container border border-primary/20 hover:neon-border-cyan transition-all rounded-sm flex flex-col relative overflow-hidden cursor-pointer"
                  >
                    <ConditionBadge condition={filter} />
                    <div className="w-full h-48 bg-surface rounded-t-sm border-b border-primary/30 flex items-center justify-center group-hover:neon-border-cyan transition-all shadow-[inset_0_0_15px_rgba(0,242,255,0.1)] p-4">
                      {item.img ? (
                        <img src={item.img} alt={item.model} className="w-full h-full object-contain neon-bloom" referrerPolicy="no-referrer" />
                      ) : (
                        <span className="material-icons text-6xl text-primary neon-glow-cyan">{item.icon || 'inventory_2'}</span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h4 className="font-headline font-bold text-white group-hover:text-primary transition-colors uppercase tracking-tight mb-2 text-lg">{item.model}</h4>
                      <div className="text-2xl font-black text-primary neon-glow-cyan mb-6">
                        <span className="text-xs font-bold mr-1">Rs.</span>
                        {item.price}/=
                      </div>
                      <div className="mt-auto flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart({
                              id: `${slug}-${item.model}`,
                              title: item.model,
                              price: `LKR ${item.price}`,
                              img: item.img || 'https://picsum.photos/seed/accessory/400/400',
                              category: slug.toUpperCase()
                            });
                          }}
                          className="flex-1 btn-neon-cyan flex items-center justify-center gap-2 !py-3 !text-[10px]"
                        >
                          <span className="material-symbols-outlined text-2xl icon-enhanced">shopping_cart</span>
                          BUY NOW
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://wa.me/94789827123?text=${encodeURIComponent(`Hi Citrix Computer, I am interested in the ${item.model}. Is it available?`)}`, '_blank');
                          }}
                          className="w-12 h-12 flex items-center justify-center border border-[#25D366]/30 text-[#25D366] rounded-sm hover:bg-[#25D366] hover:text-surface transition-all"
                        >
                          <span className="material-symbols-outlined text-2xl icon-enhanced">chat</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        );
      }
    }

    if (slug === 'all') {
      const results = allProducts.filter((item: any) => {
        const query = searchQuery.toLowerCase();
        const keywords = query.split(' ').filter(k => k.length > 0);
        const searchString = `${item.model || ''} ${item.name || ''} ${item.category || ''} ${item.condition || ''}`.toLowerCase();
        const matchesSearch = keywords.every(keyword => searchString.includes(keyword));
        
        const price = parsePrice(item.price || '0');
        const matchesPrice = price >= priceRange.min && price <= priceRange.max;
        return matchesSearch && matchesPrice;
      });

      sections.push(
        <div key="search-results" className="space-y-12">
          <h3 className="font-headline text-xl font-black text-primary mb-8 uppercase tracking-widest neon-glow-cyan">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Components'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((item: any, i: number) => (
              <motion.div
                key={item.model || item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedProduct({ ...item, condition: item.warranty ? 'new' : 'used', category: 'Search Result' })}
                className="group bg-surface-container border border-primary/20 hover:neon-border-cyan transition-all rounded-sm flex flex-col relative overflow-hidden cursor-pointer"
              >
                <ConditionBadge condition={item.warranty ? 'new' : 'used'} />
                {item.outOfStock && <OutOfStockOverlay />}
                <div className="w-full h-48 bg-surface rounded-t-sm border-b border-primary/30 flex items-center justify-center group-hover:neon-border-cyan transition-all shadow-[inset_0_0_15px_rgba(0,242,255,0.1)] p-4">
                  <span className="material-icons text-6xl text-primary neon-glow-cyan">inventory_2</span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="font-headline font-bold text-white group-hover:text-primary transition-colors uppercase tracking-tight mb-2 text-lg">{item.model || item.name}</h4>
                  <div className="text-2xl font-black text-primary neon-glow-cyan mb-6">
                    <span className="text-xs font-bold mr-1">Rs.</span>
                    {item.price}/=
                  </div>
                    <div className="mt-auto flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({
                            id: `search-${item.model || item.name}`,
                            title: item.model || item.name,
                            price: `LKR ${item.price}`,
                            img: 'https://picsum.photos/seed/search/400/400',
                            category: 'Search Result'
                          });
                        }}
                        className="flex-1 btn-neon-cyan flex items-center justify-center gap-2 !py-3 !text-[10px]"
                      >
                        <span className="material-symbols-outlined text-2xl icon-enhanced">shopping_cart</span>
                        BUY NOW
                      </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`https://wa.me/94789827123?text=${encodeURIComponent(`Hi Citrix Computer, I am interested in the ${item.model || item.name}. Is it available?`)}`, '_blank');
                      }}
                      className="w-12 h-12 flex items-center justify-center border border-[#25D366]/30 text-[#25D366] rounded-sm hover:bg-[#25D366] hover:text-surface transition-all"
                    >
                      <span className="material-symbols-outlined text-2xl icon-enhanced">chat</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-24">
        {sections.length > 0 ? sections : (
          <div className="text-center py-32 border border-dashed border-primary/20 rounded-sm bg-surface-container/20 backdrop-blur-sm">
            <div className="relative inline-block mb-8">
              <span className="material-icons text-8xl text-primary/10">inventory_2</span>
              <span className="material-symbols-outlined absolute inset-0 flex items-center justify-center text-primary/40 text-4xl neon-glow-cyan">search_off</span>
            </div>
            <h3 className="text-white font-headline text-2xl font-black uppercase tracking-tighter mb-4">No matching hardware found</h3>
            <p className="text-primary/40 font-bold uppercase tracking-[0.2em] max-w-md mx-auto leading-relaxed">
              Our foundry is currently out of this specific component. <br/>
              <span className="text-primary/60">Contact Citrix Support for special orders or custom sourcing.</span>
            </p>
            <button 
              onClick={() => window.open('https://wa.me/94789827123', '_blank')}
              className="mt-12 px-8 py-4 border border-primary/30 text-primary font-black text-[10px] uppercase tracking-[0.3em] hover:bg-primary hover:text-surface transition-all shadow-[0_0_20px_rgba(0,242,255,0.1)]"
            >
              Contact Support Protocol
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-surface py-20 px-4 md:px-12">
      <div className="max-w-screen-2xl mx-auto">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(`/category/${slug}`)}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60 hover:text-primary mb-16 transition-all group"
        >
          <span className="material-icons text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
          Back to Selection
        </motion.button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h1 className={`font-headline text-5xl md:text-7xl font-black text-${brandColor} tracking-tighter uppercase mb-6 ${neonGlow}`}>
              {filter === 'all' ? 'Complete' : (filter === 'used' ? 'Certified' : 'Brand New')} <br/>
              <span className="text-white opacity-20">{slug}</span>
            </h1>
            <div className={`h-[1px] w-24 bg-${brandColor} mt-4 shadow-[0_0_10px_rgba(0,242,255,0.8)]`}></div>
          </div>

          {/* Mobile Filter Trigger */}
          <button 
            onClick={() => setShowMobileFilter(true)}
            className="md:hidden flex items-center justify-center gap-3 px-6 py-4 bg-surface-container border border-primary/20 rounded-sm text-primary font-headline text-xs font-black uppercase tracking-widest hover:neon-border-cyan transition-all"
          >
            <span className="material-icons text-sm">filter_list</span>
            Budget & Filters
          </button>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Desktop Sidebar Filter */}
          <aside className="hidden lg:block w-80 flex-shrink-0 space-y-8">
            <PriceFilter 
              min={currentCategoryMinMax.min}
              max={currentCategoryMinMax.max}
              currentMin={priceRange.min}
              currentMax={priceRange.max}
              onChange={(min, max) => setPriceRange({ min, max })}
            />

            {!isAccessory && (
              <div className="bg-surface-container/40 backdrop-blur-xl border border-primary/20 p-6 rounded-sm">
                <h3 className="font-headline text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-6">Condition Protocol</h3>
                <div className="flex flex-col gap-2">
                  {[
                    { id: 'all', label: 'All Inventory' },
                    { id: 'new', label: 'Brand New' },
                    { id: 'used', label: 'Used' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFilter(f.id as any)}
                      className={`text-left px-4 py-3 font-headline text-[10px] font-bold uppercase tracking-[0.2em] transition-all rounded-sm border ${
                        filter === f.id
                          ? 'bg-primary text-surface border-primary shadow-[0_0_20px_rgba(0,242,255,0.4)]'
                          : 'bg-surface-container text-primary/40 border-primary/10 hover:border-primary/40 hover:text-primary'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Main Grid Content */}
          <div className="flex-grow">
            {/* Mobile/Tablet Condition Filter (Horizontal) */}
            {!isAccessory && (
              <div className="lg:hidden flex flex-wrap gap-4 mb-12">
                {[
                  { id: 'all', label: 'All Inventory' },
                  { id: 'new', label: 'Brand New' },
                  { id: 'used', label: 'Used' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id as any)}
                    className={`px-6 py-3 font-headline text-[10px] font-bold uppercase tracking-[0.2em] transition-all rounded-sm border ${
                      filter === f.id
                        ? 'bg-primary text-surface border-primary shadow-[0_0_20px_rgba(0,242,255,0.4)]'
                        : 'bg-surface-container text-primary/40 border-primary/10 hover:border-primary/40 hover:text-primary'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}

            {renderSpecializedGrid()}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      <AnimatePresence>
        {showMobileFilter && (
          <div className="fixed inset-0 z-[110] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilter(false)}
              className="absolute inset-0 bg-surface/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-xs bg-surface-container border-l border-primary/20 p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="font-headline text-xl font-black text-white uppercase tracking-tighter">Filters</h2>
                <button 
                  onClick={() => setShowMobileFilter(false)}
                  className="text-primary/40 hover:text-primary transition-all"
                >
                  <span className="material-symbols-outlined text-3xl">close</span>
                </button>
              </div>

              <div className="space-y-12">
                <PriceFilter 
                  min={currentCategoryMinMax.min}
                  max={currentCategoryMinMax.max}
                  currentMin={priceRange.min}
                  currentMax={priceRange.max}
                  onChange={(min, max) => setPriceRange({ min, max })}
                />

                {!isAccessory && (
                  <div className="space-y-6">
                    <h3 className="font-headline text-[10px] font-black text-white/40 uppercase tracking-[0.3em] border-b border-white/10 pb-2">Condition Protocol</h3>
                    <div className="flex flex-col gap-3">
                      {[
                        { id: 'all', label: 'All Inventory' },
                        { id: 'new', label: 'Brand New' },
                        { id: 'used', label: 'Used' }
                      ].map((f) => (
                        <button
                          key={f.id}
                          onClick={() => {
                            setFilter(f.id as any);
                            setShowMobileFilter(false);
                          }}
                          className={`text-left px-6 py-4 font-headline text-xs font-bold uppercase tracking-[0.2em] transition-all rounded-sm border ${
                            filter === f.id
                              ? 'bg-primary text-surface border-primary shadow-[0_0_20px_rgba(0,242,255,0.4)]'
                              : 'bg-surface-container text-primary/40 border-primary/10 hover:border-primary/40 hover:text-primary'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button 
                  onClick={() => setShowMobileFilter(false)}
                  className="w-full py-4 bg-primary text-surface font-black text-xs uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(0,242,255,0.3)] mt-12"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Product Details Modal */}
      <ProductSpecsModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p) => {
          addToCart({
            id: `modal-${p.model || p.name}`,
            title: p.model || p.name,
            price: `LKR ${p.price}`,
            img: p.img || 'https://picsum.photos/seed/pc/400/400',
            category: p.category
          });
        }}
      />
    </div>
  );
}
