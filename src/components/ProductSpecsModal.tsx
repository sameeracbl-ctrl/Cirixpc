import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Zap, 
  Clock, 
  Database, 
  Box, 
  ShieldCheck, 
  X, 
  ShoppingCart, 
  MessageCircle,
  Activity,
  HardDrive,
  Fan,
  Layers
} from 'lucide-react';

interface ProductSpecsModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: any) => void;
}

export default function ProductSpecsModal({ product, isOpen, onClose, onAddToCart }: ProductSpecsModalProps) {
  if (!product) return null;

  const renderSpecs = () => {
    if (!product.specs) {
      return (
        <div className="p-6 bg-neutral-900/40 border border-white/5 rounded-xl">
          <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] italic">
            Detailed specifications for this item are available upon request. 
            Please contact Citrix Support for full technical data.
          </p>
        </div>
      );
    }

    const specItems = Object.entries(product.specs).map(([key, value]) => {
      let icon = <Activity size={16} className="text-[#00ccff]" />;
      let label = key.charAt(0).toUpperCase() + key.slice(1);

      // Map keys to icons and better labels
      if (key === 'cores' || key === 'threads') {
        icon = <Cpu size={16} className="text-[#00ccff]" />;
      } else if (key === 'base' || key === 'boost' || key === 'speed') {
        icon = <Clock size={16} className="text-[#00ccff]" />;
        label = key === 'base' ? 'Base Clock' : (key === 'boost' ? 'Boost Clock' : 'Speed');
      } else if (key === 'cache') {
        icon = <Zap size={16} className="text-[#00ccff]" />;
      } else if (key === 'tdp') {
        icon = <Zap size={16} className="text-[#00ccff]" />;
        label = 'TDP (Power)';
      } else if (key === 'socket') {
        icon = <Box size={16} className="text-[#00ccff]" />;
      } else if (key === 'support') {
        icon = <ShieldCheck size={16} className="text-[#00ccff]" />;
        label = 'CPU Support';
      } else if (key === 'pcie' || key === 'slot') {
        icon = <Activity size={16} className="text-[#00ccff]" />;
        label = key === 'pcie' ? 'PCIe Version' : 'Expansion Slot';
      } else if (key === 'ram') {
        icon = <Layers size={16} className="text-[#00ccff]" />;
        label = 'RAM Support';
      } else if (key === 'capacity' || key === 'vram') {
        icon = <Database size={16} className="text-[#00ccff]" />;
        label = key === 'vram' ? 'VRAM' : 'Capacity';
      } else if (key === 'type') {
        icon = <Layers size={16} className="text-[#00ccff]" />;
        label = 'Memory Type';
      } else if (key === 'formFactor') {
        icon = <Box size={16} className="text-[#00ccff]" />;
        label = 'Form Factor';
      } else if (key === 'cooling') {
        icon = <Fan size={16} className="text-[#00ccff]" />;
      } else if (key === 'interface' || key === 'busWidth') {
        icon = <HardDrive size={16} className="text-[#00ccff]" />;
        label = key === 'busWidth' ? 'Bus Width' : 'Interface';
      }

      return (
        <div key={key} className="flex items-center justify-between p-3 bg-neutral-900/30 border border-white/5 rounded-xl hover:border-[#00ccff]/30 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[#00ccff]/10 rounded-lg">
              {icon}
            </div>
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{label}</span>
          </div>
          <span className="text-xs font-black text-white tracking-tight">{value as string}</span>
        </div>
      );
    });

    return <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{specItems}</div>;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/5 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 text-neutral-500 hover:text-white hover:bg-white/5 transition-all rounded-full"
            >
              <X size={24} />
            </button>

            {/* Left Side: Product Image */}
            <div className="w-full md:w-5/12 bg-neutral-950 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5 relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00ccff]/5 blur-[100px] rounded-full" />
              
              <div className="relative z-10 w-full aspect-square flex items-center justify-center">
                {product.img ? (
                  <img 
                    src={product.img} 
                    alt={product.model || product.name} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    style={product.category === 'Motherboards' ? { 
                      mixBlendMode: 'screen', 
                      filter: 'contrast(120%) brightness(110%) drop-shadow(0 0 30px rgba(0, 242, 255, 0.3))' 
                    } : {}}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-900 border border-white/5 rounded-2xl">
                    <Box size={80} className="text-neutral-800" />
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-[#00ccff]/10 border border-[#00ccff]/30 rounded-full">
                <ShieldCheck size={16} className="text-[#00ccff]" />
                <span className="text-[10px] font-black text-[#00ccff] uppercase tracking-[0.2em]">100% Tested / Warranty Verified</span>
              </div>
            </div>

            {/* Right Side: Product Info & Specs */}
            <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col max-h-[80vh] overflow-y-auto custom-scrollbar">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[1px] w-8 bg-[#00ccff]"></div>
                  <span className="text-[#00ccff] text-[10px] font-black tracking-[0.4em] uppercase">
                    {product.condition === 'new' ? 'Brand New Protocol' : 'Certified Used Hardware'}
                  </span>
                </div>
                <h2 className="font-headline text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4 leading-none">
                  {product.model || product.name}
                </h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Price Point:</span>
                  <div className="text-4xl font-black text-[#00ccff]">
                    <span className="text-lg font-bold mr-1">Rs.</span>
                    {product.price}/=
                  </div>
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-2">
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Technical Specifications</h3>
                  <span className="text-[8px] font-bold text-neutral-600 uppercase tracking-widest">Citrix Hardware ID: {product.id}</span>
                </div>
                {renderSpecs()}
              </div>

              {/* Actions */}
              <div className="mt-auto flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="flex-1 py-4 bg-[#00ccff] text-black font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all shadow-[0_0_20px_rgba(0,204,255,0.3)] flex items-center justify-center gap-3 group rounded-xl"
                >
                  <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
                  Add to Cart
                </button>
                <a 
                  href={`https://wa.me/94789827123?text=${encodeURIComponent(`Hi Citrix Computer, I am interested in the ${product.model || product.name}. Can I get more details?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-4 border border-[#25D366]/30 text-[#25D366] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#25D366] hover:text-black transition-all flex items-center justify-center gap-3 group rounded-xl"
                >
                  <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                  Inquire Now
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
