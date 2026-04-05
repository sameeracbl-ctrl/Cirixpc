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
        <div className="p-6 bg-surface/40 border border-primary/10 rounded-sm">
          <p className="text-xs text-white/40 uppercase tracking-[0.2em] italic">
            Detailed specifications for this item are available upon request. 
            Please contact Citrix Support for full technical data.
          </p>
        </div>
      );
    }

    const specItems = Object.entries(product.specs).map(([key, value]) => {
      let icon = <Activity size={16} className="text-primary" />;
      let label = key.charAt(0).toUpperCase() + key.slice(1);

      // Map keys to icons and better labels
      if (key === 'cores' || key === 'threads') {
        icon = <Cpu size={16} className="text-primary" />;
      } else if (key === 'base' || key === 'boost' || key === 'speed') {
        icon = <Clock size={16} className="text-primary" />;
        label = key === 'base' ? 'Base Clock' : (key === 'boost' ? 'Boost Clock' : 'Speed');
      } else if (key === 'cache') {
        icon = <Zap size={16} className="text-primary" />;
      } else if (key === 'tdp') {
        icon = <Zap size={16} className="text-primary" />;
        label = 'TDP (Power)';
      } else if (key === 'socket') {
        icon = <Box size={16} className="text-primary" />;
      } else if (key === 'support') {
        icon = <ShieldCheck size={16} className="text-primary" />;
        label = 'CPU Support';
      } else if (key === 'pcie' || key === 'slot') {
        icon = <Activity size={16} className="text-primary" />;
        label = key === 'pcie' ? 'PCIe Version' : 'Expansion Slot';
      } else if (key === 'ram') {
        icon = <Layers size={16} className="text-primary" />;
        label = 'RAM Support';
      } else if (key === 'capacity' || key === 'vram') {
        icon = <Database size={16} className="text-primary" />;
        label = key === 'vram' ? 'VRAM' : 'Capacity';
      } else if (key === 'type') {
        icon = <Layers size={16} className="text-primary" />;
        label = 'Memory Type';
      } else if (key === 'formFactor') {
        icon = <Box size={16} className="text-primary" />;
        label = 'Form Factor';
      } else if (key === 'cooling') {
        icon = <Fan size={16} className="text-primary" />;
      } else if (key === 'interface' || key === 'busWidth') {
        icon = <HardDrive size={16} className="text-primary" />;
        label = key === 'busWidth' ? 'Bus Width' : 'Interface';
      }

      return (
        <div key={key} className="flex items-center justify-between p-3 bg-surface/30 border border-primary/5 rounded-sm hover:border-primary/20 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-primary/10 rounded-sm">
              {icon}
            </div>
            <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{label}</span>
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
            className="absolute inset-0 bg-surface/90 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-[#0a0f1a]/80 border border-primary/30 rounded-sm shadow-[0_0_50px_rgba(0,242,255,0.2)] overflow-hidden flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 text-primary/40 hover:text-primary hover:bg-primary/10 transition-all rounded-sm"
            >
              <X size={24} />
            </button>

            {/* Left Side: Product Image */}
            <div className="w-full md:w-5/12 bg-surface/50 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-primary/10 relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
              
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
                  <div className="w-full h-full flex items-center justify-center bg-surface-container/50 border border-primary/10 rounded-sm">
                    <Box size={80} className="text-primary/20" />
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
                <ShieldCheck size={16} className="text-primary" />
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">100% Tested / Warranty Verified</span>
              </div>
            </div>

            {/* Right Side: Product Info & Specs */}
            <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col max-h-[80vh] overflow-y-auto custom-scrollbar">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[1px] w-8 bg-primary"></div>
                  <span className="text-primary text-[10px] font-black tracking-[0.4em] uppercase">
                    {product.condition === 'new' ? 'Brand New Protocol' : 'Certified Used Hardware'}
                  </span>
                </div>
                <h2 className="font-headline text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4 leading-none">
                  {product.model || product.name}
                </h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-primary/60 uppercase tracking-widest">Price Point:</span>
                  <div className="text-4xl font-black text-primary neon-glow-cyan">
                    <span className="text-lg font-bold mr-1">Rs.</span>
                    {product.price}/=
                  </div>
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-2">
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Technical Specifications</h3>
                  <span className="text-[8px] font-bold text-primary/40 uppercase tracking-widest">Citrix Hardware ID: {product.id}</span>
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
                  className="flex-1 py-4 bg-primary text-surface font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)] flex items-center justify-center gap-3 group"
                >
                  <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
                  Add to Cart
                </button>
                <a 
                  href={`https://wa.me/94789827123?text=${encodeURIComponent(`Hi Citrix Computer, I am interested in the ${product.model || product.name}. Can I get more details?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-4 border border-[#25D366]/30 text-[#25D366] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#25D366] hover:text-surface transition-all flex items-center justify-center gap-3 group"
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
