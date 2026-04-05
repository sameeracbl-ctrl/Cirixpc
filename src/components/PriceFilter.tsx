import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';

interface PriceFilterProps {
  min: number;
  max: number;
  currentMin: number;
  currentMax: number;
  onChange: (min: number, max: number) => void;
}

export default function PriceFilter({ min, max, currentMin, currentMax, onChange }: PriceFilterProps) {
  const [localMin, setLocalMin] = useState(currentMin);
  const [localMax, setLocalMax] = useState(currentMax);

  useEffect(() => {
    setLocalMin(currentMin);
    setLocalMax(currentMax);
  }, [currentMin, currentMax]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), localMax - 1);
    setLocalMin(value);
    onChange(value, localMax);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), localMin + 1);
    setLocalMax(value);
    onChange(localMin, value);
  };

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  const presets = [
    { label: 'Under 10k', min: min, max: Math.min(10000, max) },
    { label: '10k - 50k', min: Math.max(min, 10000), max: Math.min(50000, max) },
    { label: '50k+', min: Math.max(min, 50000), max: max },
  ].filter(p => p.min < p.max);

  return (
    <div className="bg-surface-container/40 backdrop-blur-xl border border-primary/20 p-6 rounded-sm shadow-[0_0_30px_rgba(0,242,255,0.05)]">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-icons text-primary text-sm neon-glow-cyan">filter_alt</span>
        <h3 className="font-headline text-xs font-black text-white uppercase tracking-[0.3em]">Budget Protocol</h3>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <div className="space-y-1">
            <span className="text-[8px] font-bold text-primary/40 uppercase tracking-widest">Price Range</span>
            <div className="font-tech text-xl text-primary neon-glow-cyan tracking-wider">
              {formatPrice(localMin)} - {formatPrice(localMax)}
            </div>
          </div>
        </div>

        <div className="relative h-6 flex items-center">
          {/* Slider Track */}
          <div className="absolute w-full h-1 bg-primary/10 rounded-full overflow-hidden">
            <div 
              className="absolute h-full bg-primary shadow-[0_0_10px_rgba(0,242,255,0.8)]"
              style={{ 
                left: `${((localMin - min) / (max - min)) * 100}%`,
                right: `${100 - ((localMax - min) / (max - min)) * 100}%`
              }}
            />
          </div>

          {/* Range Inputs */}
          <input
            type="range"
            min={min}
            max={max}
            value={localMin}
            onChange={handleMinChange}
            className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none z-20 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,242,255,0.8)] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(0,242,255,0.8)] [&::-moz-range-thumb]:cursor-pointer"
          />
          <input
            type="range"
            min={min}
            max={max}
            value={localMax}
            onChange={handleMaxChange}
            className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none z-20 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,242,255,0.8)] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(0,242,255,0.8)] [&::-moz-range-thumb]:cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-3">
        <span className="text-[8px] font-bold text-primary/40 uppercase tracking-widest block mb-2">Quick Presets</span>
        <div className="grid grid-cols-1 gap-2">
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => onChange(preset.min, preset.max)}
              className={`text-left px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest border transition-all ${
                localMin === preset.min && localMax === preset.max
                  ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(0,242,255,0.2)]'
                  : 'bg-surface-container border-primary/10 text-primary/40 hover:border-primary/40 hover:text-primary'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
