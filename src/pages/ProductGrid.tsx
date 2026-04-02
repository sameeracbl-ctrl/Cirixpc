import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';

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

const usedProcessors = {
  'Intel Core i3 Series': [
    { model: 'i3 3rd Gen (3220)', price: '1,700' },
    { model: 'i3 4th Gen (4150)', price: '1,850' },
    { model: 'i3 6th Gen (6100)', price: '3,500' },
    { model: 'i3 7th Gen (7100)', price: '4,500' },
    { model: 'i3 8th Gen (8100)', price: '7,900' },
    { model: 'i3 9th Gen (9100)', price: '9,500' },
    { model: 'i3 10th Gen (10100)', price: '23,500' },
  ],
  'Intel Core i5 Series': [
    { model: 'i5 2nd Gen (2100)', price: '3,650' },
    { model: 'i5 3rd Gen (3470)', price: '4,950' },
    { model: 'i5 4th Gen (4430/70)', price: '6,950' },
    { model: 'i5 4th Gen (4590)', price: '6,950' },
    { model: 'i5 4th Gen (4670)', price: '7,250' },
    { model: 'i5 6th Gen (6500)', price: '10,000' },
    { model: 'i5 7th Gen (7500)', price: '11,750' },
    { model: 'i5 8th Gen (8500)', price: '20,000' },
    { model: 'i5 9th Gen (9500)', price: '23,500' },
    { model: 'i5 10th Gen (10500)', price: '34,500' },
  ],
  'Intel Core i7 & i9 Series': [
    { model: 'i7 2nd Gen (2600)', price: '9,000' },
    { model: 'i7 3rd Gen (3770)', price: '10,000' },
    { model: 'i7 4th Gen (4790)', price: '13,500' },
    { model: 'i7 4th Gen (4790K)', price: '13,750' },
    { model: 'i7 6th Gen (6700)', price: '18,900' },
    { model: 'i7 6th Gen (6700K)', price: '19,500' },
    { model: 'i7 7th Gen (7700)', price: '19,000' },
    { model: 'i7 8th Gen (8700)', price: '36,000' },
    { model: 'i7 9th Gen (9700)', price: '41,000' },
    { model: 'i7 10th Gen (10700)', price: '65,000' },
    { model: 'i9 9th Gen (9900K)', price: '55,500' },
  ]
};

const ryzenBrandNew = {
  'R5 SERIES': [
    { model: 'Ryzen 3 3200G', price: '22,500', warranty: '03 Years Warranty' },
    { model: 'Ryzen 5 3400G', price: '27,000', warranty: '03 Years Warranty' },
    { model: 'Ryzen 5 4600G', price: '35,500', warranty: '01 Year Warranty' },
    { model: 'Ryzen 5 5500X 3D', price: '61,500', warranty: '03 Years Warranty' },
    { model: 'Ryzen 5 5600X', price: '43,500', warranty: '03 Years Warranty' },
    { model: 'Ryzen 5 7500F', price: '44,500', warranty: '03 Years Warranty' },
    { model: 'Ryzen 5 7600X', price: '61,000', warranty: '03 Years Warranty' },
    { model: 'Ryzen 5 8400F', price: '42,500', warranty: '03 Years Warranty' },
    { model: 'Ryzen 5 8500G', price: '53,000', warranty: '03 Years Warranty' },
    { model: 'Ryzen 5 8600G', price: '63,500', warranty: '03 Years Warranty' },
    { model: 'Ryzen 5 9600X', price: '65,500', warranty: '03 Years Warranty' },
    { model: 'Ryzen 5 3600', price: '0', outOfStock: true },
    { model: 'Ryzen 5 3600X', price: '0', outOfStock: true },
    { model: 'Ryzen 5 5500', price: '0', outOfStock: true },
    { model: 'Ryzen 5 5500GT', price: '0', outOfStock: true },
    { model: 'Ryzen 5 5600', price: '0', outOfStock: true },
    { model: 'Ryzen 5 5600GT', price: '0', outOfStock: true },
  ],
  'R7 SERIES': [
    { model: 'Ryzen 7 5700G', price: '60,500', warranty: '03 Years Warranty' },
    { model: 'Ryzen 7 7700', price: '70,500', warranty: '03 Years Warranty' },
    { model: 'Ryzen 7 7800X 3D', price: '104,500', warranty: '03 Years Warranty' },
    { model: 'Ryzen 7 8700F', price: '54,250', warranty: '03 Years Warranty' },
    { model: 'Ryzen 7 8700G', price: '90,000', warranty: '03 Years Warranty' },
    { model: 'Ryzen 7 9700X', price: '85,500', warranty: '03 Years Warranty' },
    { model: 'Ryzen 7 9800X 3D', price: '151,500', warranty: '03 Years Warranty' },
    { model: 'Ryzen 7 5700X', price: '0', outOfStock: true },
  ],
  'R9 SERIES': [
    { model: 'Ryzen 9 9900X', price: '133,500', warranty: '03 Years Warranty' },
    { model: 'Ryzen 9 9900X 3D', price: '177,500', warranty: '03 Years Warranty' },
    { model: 'Ryzen 9 9950X 3D', price: '224,500', warranty: '03 Years Warranty' },
  ]
};

const intelBrandNew = {
  'Intel Core i3 Series': [
    { model: 'Core i3 12100', price: '43,000', warranty: '03 Years Warranty' },
    { model: 'Core i3 12100F', price: '29,750', warranty: '03 Years Warranty' },
    { model: 'Core i3 14100', price: '48,500', warranty: '03 Years Warranty' },
  ],
  'Intel Core i5 Series': [
    { model: 'Core i5 12400', price: '61,000', outOfStock: true },
    { model: 'Core i5 12400F', price: '46,000', warranty: '03 Years Warranty' },
    { model: 'Core i5 13400F', price: '54,000', warranty: '03 Years Warranty' },
    { model: 'Core i5 14400', price: '79,500', warranty: '03 Years Warranty' },
    { model: 'Core i5 14400F', price: '57,000', outOfStock: true },
    { model: 'Core i5 14600K', price: '81,500', warranty: '03 Years Warranty' },
  ],
  'Intel Core i7 Series': [
    { model: 'Core i7 12700', price: '98,000', warranty: '03 Years Warranty' },
    { model: 'Core i7 12700K', price: '90,000', outOfStock: true },
    { model: 'Core i7 14700', price: '136,500', warranty: '03 Years Warranty' },
    { model: 'Core i7 14700K', price: '138,500', warranty: '03 Years Warranty' },
    { model: 'Core i7 14700F', price: '102,000', outOfStock: true },
  ],
  'Intel Core i9 Series': [
    { model: 'Core i9 13900K', price: '155,500', warranty: '03 Years Warranty' },
    { model: 'Core i9 14900K', price: '172,500', warranty: '03 Years Warranty' },
  ]
};

const usedRAM = {
  'DDR3 Series': [
    { model: '4GB DDR3', price: '2,500' },
    { model: '8GB DDR3', price: '5,850' },
    { model: '8GB DDR3 Heat Sink', price: '5,900' },
  ],
  'DDR4 Series': [
    { model: '4GB DDR4', price: '6,900' },
    { model: '8GB DDR4', price: '13,900' },
    { model: '8GB DDR4 Heat Sink', price: '14,900' },
    { model: '16GB DDR4', price: '29,500' },
    { model: '16GB DDR4 Heat Sink', price: '31,000' },
  ]
};

const usedStorage = {
  'SSD': [
    { model: '128GB SSD (Branded)', price: '5,900', icon: 'hard_drive' },
    { model: '256GB SSD', price: '10,900', icon: 'hard_drive' },
  ],
  'M.2 (SATA)': [
    { model: '128GB M.2', price: '5,550', icon: 'memory' },
    { model: '256GB M.2', price: '8,900', icon: 'memory' },
    { model: '512GB M.2', price: '15,900', icon: 'memory' },
    { model: '1TB M.2', price: '21,000', icon: 'memory' },
  ],
  'NVMe': [
    { model: '128GB NVMe', price: '6,650', icon: 'memory_alt' },
    { model: '256GB NVMe', price: '11,500', icon: 'memory_alt' },
    { model: '512GB NVMe', price: '18,000', icon: 'memory_alt' },
  ]
};

const verifiedIntelInventory = [
  { name: 'H61 Series', price: '5,500', img: 'https://drive.google.com/thumbnail?id=1DlL88Ebe26RQIeZ27OJ0f-wItwlewtqd&sz=w800', chip: 'LGA 1155' },
  { name: 'H81 Series', price: '6,000', img: 'https://drive.google.com/thumbnail?id=1j2oyxZhjZXPKr-xuqzFfbsOPjimyObii&sz=w800', chip: 'LGA 1150' },
  { name: 'H110 Series', price: '7,500', img: 'https://drive.google.com/thumbnail?id=1FJCzaAaEcPGyfBmGXiOhxRCVUDHs1XXR&sz=w800', chip: 'LGA 1151' },
  { name: 'H310 Series', price: '11,500', img: 'https://drive.google.com/thumbnail?id=1dBkbWN0dfQxadZINBlQTBexhNNV3znCN&sz=w800', chip: 'LGA 1151v2' },
  { name: 'H410 Series', price: '14,500', img: 'https://drive.google.com/thumbnail?id=19uKYtB6NVBjTAxGsgPgAh2LHaX5_f6Ll&sz=w800', chip: 'LGA 1200' },
  { name: 'H510 Series', price: '15,900', img: 'https://drive.google.com/thumbnail?id=15iRliIy1Kt0sn53cy96flDbvxABZQpMg&sz=w800', chip: 'LGA 1200' },
];

const ConditionBadge = ({ condition }: { condition: 'new' | 'used' }) => (
  <div className={`absolute top-4 right-4 px-2 py-1 rounded-sm text-[8px] font-bold uppercase tracking-widest shadow-lg z-20 ${
    condition === 'new' 
      ? 'bg-green-500 text-surface shadow-[0_0_10px_rgba(34,197,94,0.5)]' 
      : 'bg-yellow-500 text-surface shadow-[0_0_10px_rgba(234,179,8,0.5)]'
  }`}>
    {condition === 'new' ? 'NEW' : 'CERTIFIED'}
  </div>
);

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
  const [filter, setFilter] = useState<'all' | 'new' | 'used'>(condition as any || 'all');
  const [activeTab, setActiveTab] = useState('Intel Core i3 Series');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const isUsed = filter === 'used';
  const isNew = filter === 'new';
  const isAll = filter === 'all';
  const isMotherboard = slug === 'motherboards';
  const isLaptop = slug === 'laptops';
  const isProcessor = slug === 'processors';
  const isRAM = slug === 'ram';
  const isStorage = slug === 'storage';

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
    }
  }, [isProcessor, isRAM, isStorage, filter]);

  const renderSpecializedGrid = () => {
    const showUsed = filter === 'all' || filter === 'used';
    const showNew = filter === 'all' || filter === 'new';
    const sections: React.ReactNode[] = [];

    const filterItems = (items: any[]) => {
      if (!searchQuery) return items;
      const query = searchQuery.toLowerCase();
      return items.filter(item => 
        (item.model?.toLowerCase().includes(query)) || 
        (item.name?.toLowerCase().includes(query)) ||
        (item.label?.toLowerCase().includes(query))
      );
    };

    if (isProcessor) {
      if (showUsed) {
        const filteredUsed = filterItems(usedProcessors[activeTab as keyof typeof usedProcessors] || []);
        sections.push(
          <div key="used-processors" className="space-y-12">
            {filter === 'all' && <h3 className="font-headline text-xl font-black text-primary mb-8 uppercase tracking-widest neon-glow-cyan">Certified Used Processors</h3>}
            <div className="flex flex-wrap gap-4 border-b border-primary/20 pb-4">
              {Object.keys(usedProcessors).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
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
                    className="group bg-surface-container border border-primary/20 hover:neon-border-cyan transition-all p-6 rounded-sm flex items-center gap-6 relative overflow-hidden"
                  >
                    <ConditionBadge condition="used" />
                    {(item as any).outOfStock && <OutOfStockOverlay />}
                    <div className="w-20 h-20 flex-shrink-0 bg-surface rounded-sm border border-primary/30 flex items-center justify-center group-hover:neon-border-cyan transition-all shadow-[inset_0_0_15px_rgba(0,242,255,0.1)]">
                      <span className="material-icons text-5xl text-primary neon-glow-cyan">memory</span>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-headline font-bold text-white group-hover:text-primary transition-colors uppercase tracking-tight mb-2 text-lg">{item.model}</h4>
                      <div className="text-2xl font-black text-primary neon-glow-cyan mb-4">
                        <span className="text-xs font-bold mr-1">Rs.</span>
                        {item.price}/=
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => addToCart({
                            id: `used-proc-${item.model}`,
                            title: item.model,
                            price: `LKR ${item.price}`,
                            img: 'https://picsum.photos/seed/cpu/400/400',
                            category: 'Processors'
                          })}
                          className="flex-1 flex items-center justify-center gap-2 py-2 border border-primary/30 text-primary rounded-sm hover:bg-primary hover:text-surface transition-all font-bold text-[10px] uppercase tracking-widest shadow-[0_0_10px_rgba(0,242,255,0.2)]"
                        >
                          <span className="material-icons text-lg">add_shopping_cart</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-[#25D366]/30 text-[#25D366] rounded-sm hover:bg-[#25D366] hover:text-surface transition-all font-bold text-[10px] uppercase tracking-widest">
                          <span className="material-icons text-lg">chat</span>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredItems.map((item: any, i: number) => (
                        <motion.div
                          key={item.model}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: (catIdx * 0.1) + (i * 0.05) }}
                          className={`group bg-surface-container border border-${brandColor}/10 ${neonBorder} transition-all p-6 rounded-sm flex items-center gap-6 relative overflow-hidden`}
                        >
                          <ConditionBadge condition="new" />
                          {(item as any).outOfStock && <OutOfStockOverlay />}
                          <div className={`w-20 h-20 flex-shrink-0 bg-surface rounded-sm border border-${brandColor}/20 flex items-center justify-center ${neonBorder} transition-all`}>
                            <span className={`material-icons text-5xl text-${brandColor} ${neonGlow}`}>memory</span>
                          </div>
                          <div className="flex-grow">
                            <h4 className={`font-headline font-bold text-white group-hover:text-${brandColor} transition-colors uppercase tracking-tight mb-1 text-lg`}>{item.model}</h4>
                            {!item.outOfStock && (
                              <>
                                <div className={`text-2xl font-black text-${brandColor} ${neonGlow} mb-1`}>LKR {item.price}</div>
                                <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest mb-4">{item.warranty}</div>
                              </>
                            )}
                            <div className="flex gap-2">
                              <button 
                                onClick={() => addToCart({
                                  id: `new-proc-${item.model}`,
                                  title: item.model,
                                  price: `LKR ${item.price}`,
                                  img: 'https://picsum.photos/seed/cpu-new/400/400',
                                  category: 'Processors'
                                })}
                                className={`flex items-center justify-center w-10 h-10 border border-${brandColor}/30 text-${brandColor} rounded-sm hover:bg-${brandColor} hover:text-surface transition-all`}
                              >
                                <span className="material-icons text-lg">add_shopping_cart</span>
                              </button>
                              <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#25D366] hover:text-white transition-colors group/btn">
                                <span className="material-icons text-lg">chat</span>
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
        const filteredUsed = filterItems(verifiedIntelInventory || []);
        sections.push(
          <motion.div 
            key="used-motherboards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-24"
          >
            <div>
              <h3 className="font-headline text-xl font-black text-primary mb-8 uppercase tracking-widest neon-glow-cyan">Certified Used Motherboards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Static Item */}
                {(!searchQuery || "ASUS Z490 MOTHERBOARD".toLowerCase().includes(searchQuery.toLowerCase())) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group flex flex-col bg-surface-container rounded-sm overflow-hidden border border-primary/30 neon-border-cyan transition-all duration-500 relative"
                  >
                    <ConditionBadge condition="used" />
                    <div className="relative aspect-square overflow-hidden bg-surface">
                      <img 
                        alt="ASUS Z490 Motherboard" 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                        src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop" 
                        referrerPolicy="no-referrer" 
                      />
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <span className="text-[8px] font-bold text-primary/50 uppercase tracking-[0.3em] mb-2">Intel Z490 Series</span>
                      <h3 className="font-headline font-bold text-lg text-white mb-4 uppercase tracking-tight group-hover:text-primary transition-colors">
                        ASUS Z490 MOTHERBOARD
                      </h3>
                      <p className="text-[10px] text-primary/40 uppercase tracking-widest mb-6 leading-relaxed">
                        Professional-grade performance. Rigorously tested for stability and overclocking potential.
                      </p>
                      <div className="mt-auto">
                        <div className="text-3xl font-black text-primary mb-8 neon-glow-cyan">LKR 35,000.00</div>
                        <div className="flex gap-3">
                          <button 
                            onClick={() => addToCart({
                              id: 'used-mobo-z490',
                              title: 'ASUS Z490 MOTHERBOARD',
                              price: 'LKR 35,000.00',
                              img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
                              category: 'Motherboards'
                            })}
                            className="flex-1 btn-neon-cyan flex items-center justify-center"
                          >
                            <span className="material-icons">add_shopping_cart</span>
                          </button>
                          <button className="w-12 h-12 flex items-center justify-center border border-[#25D366]/50 text-[#25D366] rounded-sm hover:bg-[#25D366] hover:text-surface transition-all shadow-[0_0_10px_rgba(37,211,102,0.3)]">
                            <span className="material-icons text-2xl">chat</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {filteredUsed.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex flex-col bg-surface-container rounded-sm overflow-hidden border border-primary/30 neon-border-cyan transition-all duration-500 relative"
                  >
                    <ConditionBadge condition="used" />
                    {(item as any).outOfStock && <OutOfStockOverlay />}
                    <div className="relative aspect-square overflow-hidden bg-surface">
                      <img 
                        alt={item.name} 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                        src={item.img} 
                        referrerPolicy="no-referrer" 
                      />
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <span className="text-[8px] font-bold text-primary/50 uppercase tracking-[0.3em] mb-2">{item.chip}</span>
                      <h3 className="font-headline font-bold text-lg text-white mb-4 uppercase tracking-tight group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-[10px] text-primary/40 uppercase tracking-widest mb-6 leading-relaxed">
                        Tested for stability and performance. Guaranteed quality.
                      </p>
                      <div className="mt-auto">
                        <div className="text-3xl font-black text-primary mb-8 neon-glow-cyan">LKR {item.price}.00</div>
                        <div className="flex gap-3">
                          <button 
                            onClick={() => addToCart({
                              id: `used-mobo-${item.name}`,
                              title: item.name,
                              price: `LKR ${item.price}.00`,
                              img: item.img,
                              category: 'Motherboards'
                            })}
                            className="flex-1 btn-neon-cyan flex items-center justify-center"
                          >
                            <span className="material-icons">add_shopping_cart</span>
                          </button>
                          <button className="flex-1 flex items-center justify-center gap-2 border border-[#25D366] text-[#25D366] rounded-sm hover:bg-[#25D366] hover:text-surface transition-all shadow-[0_0_15px_rgba(37,211,102,0.4)] font-bold text-[10px] uppercase tracking-widest">
                            <span className="material-icons text-xl">chat</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-headline text-xl font-black text-primary/40 mb-8 uppercase tracking-widest">Browse by Chipset</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {intelChipsets.map((chip, i) => (
                  <motion.button
                    key={chip}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="p-6 bg-surface-container border border-primary/10 hover:neon-border-cyan transition-all group flex flex-col items-center justify-center rounded-sm"
                  >
                    <span className="text-xs font-bold text-primary/40 group-hover:text-primary transition-colors uppercase tracking-widest mb-2">Intel</span>
                    <span className="text-lg font-black text-white group-hover:text-primary transition-colors">{chip}</span>
                  </motion.button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-headline text-xl font-black text-secondary/40 mb-8 uppercase tracking-widest">Ryzen Series</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {ryzenSeries.map((chip, i) => (
                  <motion.button
                    key={chip}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-6 bg-surface-container border border-secondary/10 hover:neon-border-blue transition-all group flex flex-col items-center justify-center rounded-sm"
                  >
                    <span className="text-xs font-bold text-secondary/40 group-hover:text-secondary transition-colors uppercase tracking-widest mb-2">AMD</span>
                    <span className="text-lg font-black text-white group-hover:text-secondary transition-colors">{chip}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        );
      }
    }

    if (isLaptop) {
      if (showUsed) {
        const filteredLaptops = filterItems(laptopGenerations || []);
        sections.push(
          <div key="used-laptops" className="space-y-12">
            {filter === 'all' && <h3 className="font-headline text-xl font-black text-primary mb-8 uppercase tracking-widest neon-glow-cyan">Certified Used Laptops</h3>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredLaptops.map((gen, i) => (
                <motion.div
                  key={gen.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 bg-surface-container border border-primary/10 hover:neon-border-cyan transition-all group rounded-sm flex flex-col justify-between h-64 relative overflow-hidden"
                >
                  <ConditionBadge condition="used" />
                  <div>
                    <h3 className="font-headline text-3xl font-black text-white group-hover:text-primary transition-colors uppercase tracking-tighter mb-2">{gen.label}</h3>
                    <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">{gen.gens}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => addToCart({
                        id: `used-laptop-${gen.label}`,
                        title: `${gen.label} Laptop`,
                        price: 'LKR 45,000.00', // Placeholder price
                        img: 'https://picsum.photos/seed/laptop/400/400',
                        category: 'Laptops'
                      })}
                      className="flex-1 btn-neon-cyan !py-2 !text-[10px] flex items-center justify-center"
                    >
                      <span className="material-icons text-lg">add_shopping_cart</span>
                    </button>
                    <button className="flex-1 border border-[#25D366]/30 text-[#25D366] !py-2 !text-[10px] flex items-center justify-center hover:bg-[#25D366] hover:text-surface transition-all">
                      <span className="material-icons">chat</span>
                    </button>
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
            <div className="flex flex-wrap gap-4 border-b border-primary/20 pb-4">
              {Object.keys(usedRAM).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
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
                    className="group bg-surface-container border border-primary/20 hover:neon-border-cyan transition-all p-6 rounded-sm flex items-center gap-6 relative overflow-hidden"
                  >
                    <ConditionBadge condition="used" />
                    {(item as any).outOfStock && <OutOfStockOverlay />}
                    <div className="w-20 h-20 flex-shrink-0 bg-surface rounded-sm border border-primary/30 flex items-center justify-center group-hover:neon-border-cyan transition-all shadow-[inset_0_0_15px_rgba(0,242,255,0.1)]">
                      <span className="material-icons text-5xl text-primary neon-glow-cyan">memory_alt</span>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-headline font-bold text-white group-hover:text-primary transition-colors uppercase tracking-tight mb-2 text-lg">{item.model}</h4>
                      <div className="text-2xl font-black text-primary neon-glow-cyan mb-4">
                        <span className="text-xs font-bold mr-1">Rs.</span>
                        {item.price}/=
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => addToCart({
                            id: `used-ram-${item.model}`,
                            title: item.model,
                            price: `LKR ${item.price}`,
                            img: 'https://picsum.photos/seed/ram/400/400',
                            category: 'RAM'
                          })}
                          className="flex-1 flex items-center justify-center gap-2 py-2 border border-primary/30 text-primary rounded-sm hover:bg-primary hover:text-surface transition-all font-bold text-[10px] uppercase tracking-widest shadow-[0_0_10px_rgba(0,242,255,0.2)]"
                        >
                          <span className="material-icons text-lg">add_shopping_cart</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-[#25D366]/30 text-[#25D366] rounded-sm hover:bg-[#25D366] hover:text-surface transition-all font-bold text-[10px] uppercase tracking-widest">
                          <span className="material-icons text-lg">chat</span>
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
            <div className="flex flex-wrap gap-4 border-b border-primary/20 pb-4">
              {Object.keys(usedStorage).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
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
                    className="group bg-surface-container border border-primary/20 hover:neon-border-cyan transition-all p-6 rounded-sm flex items-center gap-6 relative overflow-hidden"
                  >
                    <ConditionBadge condition="used" />
                    {(item as any).outOfStock && <OutOfStockOverlay />}
                    <div className="w-20 h-20 flex-shrink-0 bg-surface rounded-sm border border-primary/30 flex items-center justify-center group-hover:neon-border-cyan transition-all shadow-[inset_0_0_15px_rgba(0,242,255,0.1)]">
                      <span className="material-icons text-5xl text-primary neon-glow-cyan">{item.icon}</span>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-headline font-bold text-white group-hover:text-primary transition-colors uppercase tracking-tight mb-2 text-lg">{item.model}</h4>
                      <div className="text-2xl font-black text-primary neon-glow-cyan mb-4">
                        <span className="text-xs font-bold mr-1">Rs.</span>
                        {item.price}/=
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => addToCart({
                            id: `used-storage-${item.model}`,
                            title: item.model,
                            price: `LKR ${item.price}`,
                            img: 'https://picsum.photos/seed/storage/400/400',
                            category: 'Storage'
                          })}
                          className="flex-1 flex items-center justify-center gap-2 py-2 border border-primary/30 text-primary rounded-sm hover:bg-primary hover:text-surface transition-all font-bold text-[10px] uppercase tracking-widest shadow-[0_0_10px_rgba(0,242,255,0.2)]"
                        >
                          <span className="material-icons text-lg">add_shopping_cart</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-[#25D366]/30 text-[#25D366] rounded-sm hover:bg-[#25D366] hover:text-surface transition-all font-bold text-[10px] uppercase tracking-widest">
                          <span className="material-icons text-lg">chat</span>
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
      sections.push(
        <div key="search-results" className="space-y-12">
          <h3 className="font-headline text-xl font-black text-primary mb-8 uppercase tracking-widest neon-glow-cyan">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Components'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ...Object.values(usedProcessors).flat(),
              ...Object.values(usedRAM).flat(),
              ...Object.values(usedStorage).flat(),
              ...verifiedIntelInventory,
              ...Object.values(intelBrandNew).flat(),
              ...Object.values(ryzenBrandNew).flat()
            ].filter((item: any) => 
              (item.model?.toLowerCase().includes(searchQuery.toLowerCase())) || 
              (item.name?.toLowerCase().includes(searchQuery.toLowerCase()))
            ).map((item: any, i: number) => (
              <motion.div
                key={item.model || item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-surface-container border border-primary/20 hover:neon-border-cyan transition-all p-6 rounded-sm flex items-center gap-6 relative overflow-hidden"
              >
                <ConditionBadge condition={item.warranty ? 'new' : 'used'} />
                {item.outOfStock && <OutOfStockOverlay />}
                <div className="w-20 h-20 flex-shrink-0 bg-surface rounded-sm border border-primary/30 flex items-center justify-center group-hover:neon-border-cyan transition-all shadow-[inset_0_0_15px_rgba(0,242,255,0.1)]">
                  <span className="material-icons text-5xl text-primary neon-glow-cyan">inventory_2</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-headline font-bold text-white group-hover:text-primary transition-colors uppercase tracking-tight mb-2 text-lg">{item.model || item.name}</h4>
                  <div className="text-2xl font-black text-primary neon-glow-cyan mb-4">
                    <span className="text-xs font-bold mr-1">Rs.</span>
                    {item.price}/=
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => addToCart({
                        id: `search-${item.model || item.name}`,
                        title: item.model || item.name,
                        price: `LKR ${item.price}`,
                        img: 'https://picsum.photos/seed/search/400/400',
                        category: 'Search Result'
                      })}
                      className="flex-1 flex items-center justify-center gap-2 py-2 border border-primary/30 text-primary rounded-sm hover:bg-primary hover:text-surface transition-all font-bold text-[10px] uppercase tracking-widest shadow-[0_0_10px_rgba(0,242,255,0.2)]"
                    >
                      <span className="material-icons text-lg">add_shopping_cart</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-[#25D366]/30 text-[#25D366] rounded-sm hover:bg-[#25D366] hover:text-surface transition-all font-bold text-[10px] uppercase tracking-widest">
                      <span className="material-icons text-lg">chat</span>
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
          <div className="text-center py-20 border border-dashed border-primary/20 rounded-sm">
            <span className="material-icons text-6xl text-primary/20 mb-4">inventory_2</span>
            <p className="text-primary/40 font-headline uppercase tracking-widest">No matching inventory found for this selection</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-surface py-20 px-8">
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
          className="mb-12"
        >
          <h1 className={`font-headline text-5xl md:text-7xl font-black text-${brandColor} tracking-tighter uppercase mb-6 ${neonGlow}`}>
            {filter === 'all' ? 'Complete' : (filter === 'used' ? 'Certified' : 'Brand New')} <br/>
            <span className="text-white opacity-20">{slug}</span>
          </h1>
          <div className={`h-[1px] w-24 bg-${brandColor} mt-4 shadow-[0_0_10px_rgba(0,242,255,0.8)]`}></div>
        </motion.div>

        {/* Filter UI */}
        <div className="flex flex-wrap gap-4 mb-16">
          {[
            { id: 'all', label: 'All Inventory' },
            { id: 'new', label: 'Brand New (Factory Sealed)' },
            { id: 'used', label: 'Used (Certified Value)' }
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

        {renderSpecializedGrid()}
      </div>
    </div>
  );
}
