import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../constants/inventory';

interface SearchSuggestionsProps {
  suggestions: Product[];
  onSelect: (product: Product) => void;
  isVisible: boolean;
}

export default function SearchSuggestions({ suggestions, onSelect, isVisible }: SearchSuggestionsProps) {
  if (!isVisible || suggestions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-full left-0 w-full mt-2 bg-surface-container/90 backdrop-blur-xl border border-primary/20 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[110] overflow-hidden"
    >
      <div className="max-h-[400px] overflow-y-auto no-scrollbar">
        {suggestions.map((product) => (
          <button
            key={product.id}
            onClick={() => onSelect(product)}
            className="w-full flex items-center gap-4 p-4 hover:bg-primary/10 border-b border-primary/5 last:border-0 transition-all group text-left"
          >
            <div className="w-12 h-12 bg-surface rounded-sm border border-primary/10 overflow-hidden flex-shrink-0">
              {product.img ? (
                <img 
                  src={product.img} 
                  alt={product.model || product.name} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary/40 text-2xl">
                    {product.icon || 'inventory_2'}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-[11px] font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors line-clamp-1">
                  {product.model || product.name}
                </h4>
                <span className="text-[10px] font-black text-primary neon-glow-cyan whitespace-nowrap">
                  Rs. {product.price}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[8px] font-bold text-primary/40 uppercase tracking-widest">
                  {product.category}
                </span>
                <span className="text-[8px] font-bold text-primary/20">•</span>
                <span className={`text-[8px] font-bold uppercase tracking-widest ${product.condition === 'new' ? 'text-green-500/60' : 'text-yellow-500/60'}`}>
                  {product.condition}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="p-3 bg-primary/5 border-t border-primary/10 text-center">
        <p className="text-[8px] font-bold text-primary/40 uppercase tracking-[0.3em]">
          Foundry Search Protocol Active
        </p>
      </div>
    </motion.div>
  );
}
