import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import HeroSection from '../components/HeroSection';

const MB_INTEL_USED = ['H61 (3rd)', 'H81', 'H110', 'H110 M.2', 'H310', 'H310 M.2', 'H410 M.2', 'H510 M.2', 'B75', 'B85', 'B150', 'B250', 'B360', 'B460', 'Z97', 'Z170', 'Z270', 'Z370', 'Z390', 'Z490'];
const MB_RYZEN_USED = ['A320', 'A520', 'B450'];
const PROC_INTEL_USED = ['Core i3 4th Gen', 'Core i5 4th Gen', 'Core i7 4th Gen', 'Core i5 6th Gen', 'Core i7 6th Gen', 'Core i5 8th Gen', 'Core i7 8th Gen', 'Core i5 9th Gen', 'Core i7 9th Gen'];
const PROC_RYZEN_USED = ['Ryzen 3 3200G', 'Ryzen 5 3600', 'Ryzen 7 3700X', 'Ryzen 5 5600G (Used)', 'Ryzen 7 5800X (Used)'];
const RAM_USED = ['4GB DDR3', '8GB DDR3', '16GB DDR3', '4GB DDR4', '8GB DDR4', '16GB DDR4', '32GB DDR4'];
const PSU_USED = ['450W', '500W', '500W 80+', '600W', '600W 80+', '700W', '700W 80+', '800W 80+'];
const HDD_USED = ['320GB', '500GB', '1TB', '2TB'];
const SSD_USED = ['120GB', '256GB', '512GB', '1TB'];
const M2_USED = ['128GB', '256GB', '512GB', '1TB'];
const NVME_USED = ['256GB', '512GB', '1TB', '2TB'];

const Particles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full opacity-40 shadow-[0_0_8px_rgba(0,242,255,0.8)]"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            y: [null, "-=100"],
            x: [null, (Math.random() - 0.5) * 50 + "%"],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
        />
      ))}
    </div>
  );
};

const MB_NEW = ['H610M', 'B660M', 'B760M', 'Z790', 'A520M', 'B550M', 'X570', 'B650M'];
const PROC_INTEL_NEW = ['Core i3-12100', 'Core i5-12400', 'Core i5-13400', 'Core i7-13700', 'Core i9-14900'];
const PROC_RYZEN_NEW = ['Ryzen 5 5600G', 'Ryzen 5 5600X', 'Ryzen 7 5700X', 'Ryzen 5 7600', 'Ryzen 7 7800X3D'];
const RAM_NEW = ['8GB DDR4', '16GB DDR4', '32GB DDR4', '16GB DDR5', '32GB DDR5'];
const PSU_NEW = ['550W Bronze', '650W Gold', '750W Gold', '850W Gold'];
const MONITORS_FRAMELESS = ['19" Frameless', '22" Frameless', '24" Frameless (75Hz)', '24" Frameless (144Hz)'];
const MONITORS_NEW = ['Samsung 24" Brand New', 'ASUS 27" 144Hz Brand New', 'MSI 32" Curved Brand New', 'ViewSonic 22" Brand New'];

// Future-proof Price Data Structure
const COMPONENT_PRICES: Record<string, number> = {
  // Example: 'Core i5 4th Gen': 12500,
};

export default function Home() {
  const [isBuilderModalOpen, setIsBuilderModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [buildConfig, setBuildConfig] = useState({
    processorType: 'Intel',
    processorCondition: 'Used',
    processorModel: 'Core i5 4th Gen',
    motherboardType: 'Intel',
    motherboardCondition: 'Used',
    motherboardModel: 'H81',
    ramCondition: 'Used',
    ramType: 'DDR4',
    ramCapacity: '8GB',
    psuCondition: 'Used',
    psuModel: '500W',
    cooling: 'Intel Stock Cooler',
    storageType: 'SSD',
    storageCondition: 'Used',
    storageCapacity: '256GB',
    caseModel: 'Standard ATX',
    fans: 'None',
    lighting: 'None',
    monitorType: 'Frameless Monitor',
    monitorModel: '22" Frameless',
    peripherals: {
      mouse: false,
      keyboard: false,
      speaker: false,
      headset: false,
      webcam: false
    }
  });

  const techSupportUrl = `https://wa.me/94789827123?text=${encodeURIComponent("Hi Citrix Computer, I need assistance with a technical issue/repair.")}`;

  const generateQuotation = () => {
    const p = buildConfig.peripherals;
    const selectedPeripherals = Object.entries(p)
      .filter(([_, checked]) => checked)
      .map(([name]) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(', ');

    const text = `*CITRIX COMPUTER - CUSTOM PC QUOTATION*
------------------------------------------
*PROTOCOL:* Foundry v5.0
*DATE:* ${new Date().toLocaleDateString()}

*CORE ARCHITECTURE*
• Processor: ${buildConfig.processorModel}
  Type: ${buildConfig.processorType} | Condition: ${buildConfig.processorCondition}
• Motherboard: ${buildConfig.motherboardModel}
  Type: ${buildConfig.motherboardType} | Condition: ${buildConfig.motherboardCondition}
• Memory: ${buildConfig.ramCapacity} ${buildConfig.ramType}
  Condition: ${buildConfig.ramCondition}
• Power Supply: ${buildConfig.psuModel}
  Condition: ${buildConfig.psuCondition}

*STORAGE & THERMALS*
• Cooling: ${buildConfig.cooling}
• Primary Storage: ${buildConfig.storageCapacity} ${buildConfig.storageType}
  Condition: ${buildConfig.storageCondition}

*CHASSIS & DISPLAY*
• Case Model: ${buildConfig.caseModel}
• Fan Config: ${buildConfig.fans}
• Lighting: ${buildConfig.lighting}
• Monitor: ${buildConfig.monitorModel} (${buildConfig.monitorType})

*PERIPHERALS & EXTRAS*
• Selected: ${selectedPeripherals || 'None'}

------------------------------------------
*ESTIMATED TOTAL:* LKR ${calculateTotal().toLocaleString()}
------------------------------------------
Please confirm availability and final pricing.`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/94789827123?text=${encodedText}`, '_blank');
  };

  const calculateTotal = () => {
    let total = 0;
    const components = [
      buildConfig.processorModel,
      buildConfig.motherboardModel,
      buildConfig.ramCapacity,
      buildConfig.psuModel,
      buildConfig.storageCapacity,
      buildConfig.cooling,
      buildConfig.caseModel,
      buildConfig.fans,
      buildConfig.lighting,
      buildConfig.monitorModel
    ];

    components.forEach(comp => {
      if (COMPONENT_PRICES[comp]) {
        total += COMPONENT_PRICES[comp];
      }
    });

    return total;
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <HeroSection 
        onStartBuild={() => setIsBuilderModalOpen(true)} 
        techSupportUrl={techSupportUrl} 
      />

      {/* PC Builder Modal */}
      <AnimatePresence>
        {isBuilderModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBuilderModalOpen(false)}
              className="absolute inset-0 bg-surface/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-surface-container/60 backdrop-blur-2xl border border-primary/30 p-8 md:p-12 rounded-sm shadow-[0_0_50px_rgba(0,242,255,0.2)] overflow-hidden"
            >
              {/* Decorative Background */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(0,242,255,1)]"></div>
              <div className="scanline opacity-5"></div>

              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="text-primary text-[10px] font-black tracking-[0.4em] uppercase mb-2 block">Foundry Protocol v5.0</span>
                  <h2 className="font-headline text-4xl font-black text-white tracking-tighter uppercase neon-glow-cyan">PC Configurator</h2>
                </div>
                <button 
                  onClick={() => {
                    setIsBuilderModalOpen(false);
                    setStep(1);
                  }}
                  className="text-primary/40 hover:text-primary transition-colors"
                >
                  <span className="material-icons text-3xl">close</span>
                </button>
              </div>

              {/* Step Indicator */}
              <div className="flex items-center gap-2 mb-10 overflow-x-auto no-scrollbar pb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div 
                    key={s}
                    className={`flex-shrink-0 h-1 transition-all duration-500 ${s <= step ? 'w-12 bg-primary shadow-[0_0_10px_rgba(0,242,255,0.8)]' : 'w-8 bg-primary/20'}`}
                  />
                ))}
                <span className="ml-auto text-[10px] font-black text-primary uppercase tracking-widest">Step {step} of 5</span>
              </div>

              <div className="min-h-[400px] max-h-[60vh] overflow-y-auto no-scrollbar pr-2 mb-10">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Processor Section */}
                        <div className="space-y-6">
                          <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] border-l-2 border-primary pl-3">Processor Unit</h3>
                          
                          <div className="space-y-4">
                            <div className="flex gap-2">
                              {['Intel', 'Ryzen'].map(type => (
                                <button
                                  key={type}
                                  onClick={() => setBuildConfig({...buildConfig, processorType: type})}
                                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${buildConfig.processorType === type ? 'bg-primary/20 border-primary text-primary' : 'border-primary/20 text-primary/40'}`}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              {['Used', 'Brand New'].map(cond => (
                                <button
                                  key={cond}
                                  onClick={() => setBuildConfig({...buildConfig, processorCondition: cond})}
                                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${buildConfig.processorCondition === cond ? 'bg-primary/20 border-primary text-primary' : 'border-primary/20 text-primary/40'}`}
                                >
                                  {cond}
                                </button>
                              ))}
                            </div>
                            <div className="relative">
                              <select 
                                value={buildConfig.processorModel}
                                onChange={(e) => setBuildConfig({...buildConfig, processorModel: e.target.value})}
                                className="w-full bg-surface border border-primary/20 p-4 pr-10 text-white font-bold tracking-tight focus:border-primary focus:outline-none transition-all rounded-sm appearance-none cursor-pointer"
                              >
                                {(buildConfig.processorCondition === 'Used' 
                                  ? (buildConfig.processorType === 'Intel' ? PROC_INTEL_USED : PROC_RYZEN_USED)
                                  : (buildConfig.processorType === 'Intel' ? PROC_INTEL_NEW : PROC_RYZEN_NEW)
                                ).map(opt => (
                                  <option key={opt} value={opt} className="bg-surface text-white">{opt}</option>
                                ))}
                              </select>
                              <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none">expand_more</span>
                            </div>
                          </div>
                        </div>

                        {/* Motherboard Section */}
                        <div className="space-y-6">
                          <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] border-l-2 border-primary pl-3">Motherboard</h3>
                          
                          <div className="space-y-4">
                            <div className="flex gap-2">
                              {['Intel', 'Ryzen'].map(type => (
                                <button
                                  key={type}
                                  onClick={() => setBuildConfig({...buildConfig, motherboardType: type})}
                                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${buildConfig.motherboardType === type ? 'bg-primary/20 border-primary text-primary' : 'border-primary/20 text-primary/40'}`}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              {['Used', 'Brand New'].map(cond => (
                                <button
                                  key={cond}
                                  onClick={() => setBuildConfig({...buildConfig, motherboardCondition: cond})}
                                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${buildConfig.motherboardCondition === cond ? 'bg-primary/20 border-primary text-primary' : 'border-primary/20 text-primary/40'}`}
                                >
                                  {cond}
                                </button>
                              ))}
                            </div>
                            <div className="relative">
                              <select 
                                value={buildConfig.motherboardModel}
                                onChange={(e) => setBuildConfig({...buildConfig, motherboardModel: e.target.value})}
                                className="w-full bg-surface border border-primary/20 p-4 pr-10 text-white font-bold tracking-tight focus:border-primary focus:outline-none transition-all rounded-sm appearance-none cursor-pointer"
                              >
                                {(buildConfig.motherboardCondition === 'Used' 
                                  ? (buildConfig.motherboardType === 'Intel' ? MB_INTEL_USED : MB_RYZEN_USED)
                                  : MB_NEW
                                ).map(opt => (
                                  <option key={opt} value={opt} className="bg-surface text-white">{opt}</option>
                                ))}
                              </select>
                              <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none">expand_more</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* RAM Section */}
                        <div className="space-y-6">
                          <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] border-l-2 border-primary pl-3">Memory (RAM)</h3>
                          
                          <div className="space-y-4">
                            <div className="flex gap-2">
                              {['DDR3', 'DDR4', 'DDR5'].map(type => (
                                <button
                                  key={type}
                                  onClick={() => setBuildConfig({...buildConfig, ramType: type})}
                                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${buildConfig.ramType === type ? 'bg-primary/20 border-primary text-primary' : 'border-primary/20 text-primary/40'}`}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              {['Used', 'Brand New'].map(cond => (
                                <button
                                  key={cond}
                                  onClick={() => setBuildConfig({...buildConfig, ramCondition: cond})}
                                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${buildConfig.ramCondition === cond ? 'bg-primary/20 border-primary text-primary' : 'border-primary/20 text-primary/40'}`}
                                >
                                  {cond}
                                </button>
                              ))}
                            </div>
                            <div className="relative">
                              <select 
                                value={buildConfig.ramCapacity}
                                onChange={(e) => setBuildConfig({...buildConfig, ramCapacity: e.target.value})}
                                className="w-full bg-surface border border-primary/20 p-4 pr-10 text-white font-bold tracking-tight focus:border-primary focus:outline-none transition-all rounded-sm appearance-none cursor-pointer"
                              >
                                {(buildConfig.ramCondition === 'Used' 
                                  ? RAM_USED
                                  : RAM_NEW
                                ).map(opt => (
                                  <option key={opt} value={opt} className="bg-surface text-white">{opt}</option>
                                ))}
                              </select>
                              <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none">expand_more</span>
                            </div>
                          </div>
                        </div>

                        {/* PSU Section */}
                        <div className="space-y-6">
                          <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] border-l-2 border-primary pl-3">Power Supply (PSU)</h3>
                          
                          <div className="space-y-4">
                            <div className="flex gap-2">
                              {['Used', 'Brand New'].map(cond => (
                                <button
                                  key={cond}
                                  onClick={() => setBuildConfig({...buildConfig, psuCondition: cond})}
                                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${buildConfig.psuCondition === cond ? 'bg-primary/20 border-primary text-primary' : 'border-primary/20 text-primary/40'}`}
                                >
                                  {cond}
                                </button>
                              ))}
                            </div>
                            <div className="relative">
                              <select 
                                value={buildConfig.psuModel}
                                onChange={(e) => setBuildConfig({...buildConfig, psuModel: e.target.value})}
                                className="w-full bg-surface border border-primary/20 p-4 pr-10 text-white font-bold tracking-tight focus:border-primary focus:outline-none transition-all rounded-sm appearance-none cursor-pointer"
                              >
                                {(buildConfig.psuCondition === 'Used' ? PSU_USED : PSU_NEW).map(opt => (
                                  <option key={opt} value={opt} className="bg-surface text-white">{opt}</option>
                                ))}
                              </select>
                              <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none">expand_more</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Storage Section */}
                        <div className="space-y-6">
                          <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] border-l-2 border-primary pl-3">Storage</h3>
                          
                          <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                              {['HDD', 'SSD', 'M.2', 'NVMe'].map(type => (
                                <button
                                  key={type}
                                  onClick={() => setBuildConfig({...buildConfig, storageType: type})}
                                  className={`flex-1 min-w-[60px] py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${buildConfig.storageType === type ? 'bg-primary/20 border-primary text-primary' : 'border-primary/20 text-primary/40'}`}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              {['Used', 'Brand New'].map(cond => (
                                <button
                                  key={cond}
                                  onClick={() => setBuildConfig({...buildConfig, storageCondition: cond})}
                                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${buildConfig.storageCondition === cond ? 'bg-primary/20 border-primary text-primary' : 'border-primary/20 text-primary/40'}`}
                                >
                                  {cond}
                                </button>
                              ))}
                            </div>
                            <div className="relative">
                              <select 
                                value={buildConfig.storageCapacity}
                                onChange={(e) => setBuildConfig({...buildConfig, storageCapacity: e.target.value})}
                                className="w-full bg-surface border border-primary/20 p-4 pr-10 text-white font-bold tracking-tight focus:border-primary focus:outline-none transition-all rounded-sm appearance-none cursor-pointer"
                              >
                                {(buildConfig.storageCondition === 'Used' 
                                  ? (buildConfig.storageType === 'HDD' ? HDD_USED : buildConfig.storageType === 'SSD' ? SSD_USED : buildConfig.storageType === 'M.2' ? M2_USED : NVME_USED)
                                  : ['256GB', '512GB', '1TB', '2TB']
                                ).map(opt => (
                                  <option key={opt} value={opt} className="bg-surface text-white">{opt}</option>
                                ))}
                              </select>
                              <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none">expand_more</span>
                            </div>
                          </div>
                        </div>

                        {/* Cooling Section */}
                        <div className="space-y-6">
                          <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] border-l-2 border-primary pl-3">Cooling System</h3>
                          
                          <div className="space-y-4">
                            <div className="relative">
                              <select 
                                value={buildConfig.cooling}
                                onChange={(e) => setBuildConfig({...buildConfig, cooling: e.target.value})}
                                className="w-full bg-surface border border-primary/20 p-4 pr-10 text-white font-bold tracking-tight focus:border-primary focus:outline-none transition-all rounded-sm appearance-none cursor-pointer"
                              >
                                {['Intel Stock Cooler', 'RGB Air Cooler', 'Liquid Cooler'].map(opt => (
                                  <option key={opt} value={opt} className="bg-surface text-white">{opt}</option>
                                ))}
                              </select>
                              <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none">expand_more</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Casing Section */}
                        <div className="space-y-6">
                          <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] border-l-2 border-primary pl-3">Casing & Lighting</h3>
                          
                          <div className="space-y-4">
                            <div className="relative">
                              <select 
                                value={buildConfig.caseModel}
                                onChange={(e) => setBuildConfig({...buildConfig, caseModel: e.target.value})}
                                className="w-full bg-surface border border-primary/20 p-4 pr-10 text-white font-bold tracking-tight focus:border-primary focus:outline-none transition-all rounded-sm appearance-none cursor-pointer"
                              >
                                {['Standard ATX', 'Gaming RGB Case', 'Mini-ITX Case', 'Full Tower'].map(opt => (
                                  <option key={opt} value={opt} className="bg-surface text-white">{opt}</option>
                                ))}
                              </select>
                              <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none">expand_more</span>
                            </div>
                            <div className="relative">
                              <select 
                                value={buildConfig.fans}
                                onChange={(e) => setBuildConfig({...buildConfig, fans: e.target.value})}
                                className="w-full bg-surface border border-primary/20 p-4 pr-10 text-white font-bold tracking-tight focus:border-primary focus:outline-none transition-all rounded-sm appearance-none cursor-pointer"
                              >
                                {['None', 'RGB Fans', 'ARGB Fans'].map(opt => (
                                  <option key={opt} value={opt} className="bg-surface text-white">{opt}</option>
                                ))}
                              </select>
                              <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none">expand_more</span>
                            </div>
                            <div className="relative">
                              <select 
                                value={buildConfig.lighting}
                                onChange={(e) => setBuildConfig({...buildConfig, lighting: e.target.value})}
                                className="w-full bg-surface border border-primary/20 p-4 pr-10 text-white font-bold tracking-tight focus:border-primary focus:outline-none transition-all rounded-sm appearance-none cursor-pointer"
                              >
                                {['None', 'Static RGB', 'ARGB Remote Control'].map(opt => (
                                  <option key={opt} value={opt} className="bg-surface text-white">{opt}</option>
                                ))}
                              </select>
                              <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none">expand_more</span>
                            </div>
                          </div>
                        </div>

                        {/* Monitor Section */}
                        <div className="space-y-6">
                          <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] border-l-2 border-primary pl-3">Monitor</h3>
                          
                          <div className="space-y-4">
                            <div className="flex gap-2">
                              {['Frameless Monitor', 'Brand New Monitor'].map(type => (
                                <button
                                  key={type}
                                  onClick={() => setBuildConfig({...buildConfig, monitorType: type})}
                                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${buildConfig.monitorType === type ? 'bg-primary/20 border-primary text-primary' : 'border-primary/20 text-primary/40'}`}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                            <div className="relative">
                              <select 
                                value={buildConfig.monitorModel}
                                onChange={(e) => setBuildConfig({...buildConfig, monitorModel: e.target.value})}
                                className="w-full bg-surface border border-primary/20 p-4 pr-10 text-white font-bold tracking-tight focus:border-primary focus:outline-none transition-all rounded-sm appearance-none cursor-pointer"
                              >
                                {(buildConfig.monitorType === 'Frameless Monitor' 
                                  ? MONITORS_FRAMELESS
                                  : MONITORS_NEW
                                ).map(opt => (
                                  <option key={opt} value={opt} className="bg-surface text-white">{opt}</option>
                                ))}
                              </select>
                              <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none">expand_more</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="space-y-6">
                        <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] border-l-2 border-primary pl-3">Optional Peripherals</h3>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {Object.entries(buildConfig.peripherals).map(([key, checked]) => (
                            <button
                              key={key}
                              onClick={() => setBuildConfig({
                                ...buildConfig, 
                                peripherals: { ...buildConfig.peripherals, [key]: !checked }
                              })}
                              className={`p-4 border rounded-sm flex items-center gap-3 transition-all ${checked ? 'bg-primary/20 border-primary text-primary' : 'border-primary/10 text-primary/40 hover:border-primary/30'}`}
                            >
                              <span className="material-icons text-lg">{checked ? 'check_box' : 'check_box_outline_blank'}</span>
                              <span className="text-[10px] font-bold uppercase tracking-widest">{key}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 bg-primary/5 border border-primary/20 rounded-sm">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Configuration Summary</h4>
                          <div className="text-right">
                            <span className="text-[8px] text-primary/40 uppercase font-bold block">Estimated Total</span>
                            <span className="text-sm font-black text-primary neon-glow-cyan">LKR {calculateTotal().toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                          <div className="text-[9px] text-primary/40 uppercase font-bold">Processor:</div>
                          <div className="text-[9px] text-white font-bold">{buildConfig.processorModel}</div>
                          <div className="text-[9px] text-primary/40 uppercase font-bold">Motherboard:</div>
                          <div className="text-[9px] text-white font-bold">{buildConfig.motherboardModel}</div>
                          <div className="text-[9px] text-primary/40 uppercase font-bold">Memory:</div>
                          <div className="text-[9px] text-white font-bold">{buildConfig.ramCapacity}</div>
                          <div className="text-[9px] text-primary/40 uppercase font-bold">Storage:</div>
                          <div className="text-[9px] text-white font-bold">{buildConfig.storageCapacity} {buildConfig.storageType}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex gap-4">
                {step > 1 && (
                  <button 
                    onClick={() => setStep(prev => prev - 1)}
                    className="flex-1 py-4 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 transition-all"
                  >
                    Back
                  </button>
                )}
                {step < 5 ? (
                  <button 
                    onClick={() => setStep(prev => prev + 1)}
                    className="flex-[2] btn-neon-cyan !py-4 !text-[10px] flex items-center justify-center gap-3"
                  >
                    Next Category
                    <span className="material-icons text-lg">arrow_forward</span>
                  </button>
                ) : (
                  <button 
                    onClick={generateQuotation}
                    className="flex-[2] btn-neon-cyan !py-4 !text-[10px] flex items-center justify-center gap-3 group"
                  >
                    <span className="material-icons text-lg group-hover:scale-110 transition-transform">description</span>
                    Generate Quotation
                  </button>
                )}
              </div>

              <p className="text-center mt-8 text-[9px] font-bold text-primary/30 uppercase tracking-[0.3em]">
                Secure Encryption Protocol Active | Citrix Systems Foundry
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Immersive Category Showcase */}
      <section className="min-h-screen py-32 bg-surface relative overflow-hidden flex flex-col justify-center">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full cyber-metal opacity-40 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-surface to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-surface to-transparent z-10"></div>

        <div className="max-w-screen-2xl mx-auto px-8 relative z-20 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-primary shadow-[0_0_10px_rgba(0,242,255,1)]"></div>
              <span className="text-primary text-[11px] font-black tracking-[0.6em] uppercase block">Hardware Foundry Protocol</span>
            </div>
            <h2 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter uppercase neon-glow-cyan leading-[0.9]">
              CORE <span className="text-primary/20">FOUNDRY.</span>
            </h2>
          </motion.div>

          <div className="flex gap-10 overflow-x-auto pb-24 no-scrollbar snap-x snap-mandatory">
            {[
              { 
                label: 'PROCESSORS', 
                slug: 'processors', 
                img: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=1000',
                desc: 'Hyper-threaded performance with exposed silicon precision.',
                hasRGB: true
              },
              { 
                label: 'MOTHERBOARDS', 
                slug: 'motherboards', 
                img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000',
                desc: 'The industrial-grade foundation for your digital architecture.',
                hasRGB: true
              },
              { 
                label: 'VGA', 
                slug: 'vga', 
                img: 'https://images.unsplash.com/photo-1591489378430-ef2f4c626b35?auto=format&fit=crop&q=80&w=1000',
                desc: 'Triple-fan cooling with side-lit RGB illumination.',
                hasFans: true,
                hasRGB: true
              },
              { 
                label: 'RAM', 
                slug: 'ram', 
                img: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=1000',
                desc: 'High-speed performance modules with dynamic RGB cycling.',
                hasRGB: true
              },
              { 
                label: 'STORAGE', 
                slug: 'storage', 
                img: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&q=80&w=1000',
                desc: 'NVMe M.2 acceleration with integrated heatsink technology.'
              },
              { 
                label: 'CASINGS', 
                slug: 'casings', 
                img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1000',
                desc: 'Panoramic views with visible internal airflow systems.',
                hasFans: true,
                hasRGB: true
              },
              { 
                label: 'PSU', 
                slug: 'psu', 
                img: 'https://images.unsplash.com/photo-1616132422484-916940007802?auto=format&fit=crop&q=80&w=1000',
                desc: 'Modular power delivery for high-end hardware stability.'
              },
              { 
                label: 'MONITORS', 
                slug: 'monitors', 
                img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000',
                desc: 'Crystal-clear 4K displays with ultra-fast refresh rates.'
              },
              { 
                label: 'LAPTOPS', 
                slug: 'laptops', 
                img: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=1000',
                desc: 'Portable powerhouses for professionals and elite gamers.',
                hasRGB: true
              },
            ].map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-shrink-0 w-[350px] md:w-[550px] h-[550px] md:h-[750px] snap-center"
              >
                <Link 
                  to={`/category/${cat.slug}`} 
                  className="group relative block w-full h-full perspective-1000"
                >
                  <motion.div 
                    whileHover={{ rotateY: 15, rotateX: -10, scale: 1.05 }}
                    className="w-full h-full cyber-metal rounded-sm border border-primary/30 overflow-hidden relative transition-all duration-700 group-hover:neon-border-cyan group-hover:shadow-[0_0_60px_rgba(0,242,255,0.3)]"
                  >
                    {/* Scanline Effect */}
                    <div className="scanline"></div>

                    {/* LED Strip Lights */}
                    <div className="absolute top-12 left-0 led-strip opacity-20 group-hover:opacity-80 transition-opacity"></div>
                    <div className="absolute bottom-12 left-0 led-strip opacity-20 group-hover:opacity-80 transition-opacity"></div>
                    <div className="absolute top-0 left-16 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/40 to-transparent opacity-20"></div>
                    <div className="absolute top-0 right-16 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/40 to-transparent opacity-20"></div>

                    {/* Product Image with Bloom and RGB cycling */}
                    <div className="absolute inset-0 flex items-center justify-center p-20">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <motion.img 
                          src={cat.img} 
                          alt={cat.label} 
                          className="w-full h-full object-contain neon-bloom brightness-75 group-hover:brightness-125 transition-all duration-700"
                          animate={{ 
                            y: [0, -20, 0],
                            filter: cat.hasRGB ? [
                              "drop-shadow(0 0 25px rgba(0, 242, 255, 0.5)) hue-rotate(0deg)",
                              "drop-shadow(0 0 50px rgba(0, 242, 255, 0.8)) hue-rotate(180deg)",
                              "drop-shadow(0 0 25px rgba(0, 242, 255, 0.5)) hue-rotate(360deg)"
                            ] : [
                              "drop-shadow(0 0 25px rgba(0, 242, 255, 0.5))",
                              "drop-shadow(0 0 50px rgba(0, 242, 255, 0.8))",
                              "drop-shadow(0 0 25px rgba(0, 242, 255, 0.5))"
                            ]
                          }}
                          transition={{ 
                            duration: 5, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                          }}
                          referrerPolicy="no-referrer"
                        />

                        {/* Simulated Spinning Fans for VGA/Casings */}
                        {cat.hasFans && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <div className="relative w-full h-full">
                              <motion.span 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
                                className="material-icons absolute top-1/4 left-1/4 text-primary/30 text-7xl"
                              >
                                mode_fan
                              </motion.span>
                              <motion.span 
                                animate={{ rotate: -360 }}
                                transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
                                className="material-icons absolute bottom-1/4 right-1/4 text-primary/30 text-7xl"
                              >
                                mode_fan
                              </motion.span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tech Badge Label */}
                    <div className="absolute top-12 left-12">
                      <div className="inline-block px-8 py-3 border border-primary/60 bg-surface/95 backdrop-blur-2xl rounded-sm shadow-[0_0_20px_rgba(0,242,255,0.4)]">
                        <span className="font-mono text-[12px] font-black text-primary tracking-[0.6em] neon-glow-cyan">
                          {cat.label}
                        </span>
                      </div>
                    </div>

                    {/* Decorative Tech Elements */}
                    <div className="absolute top-12 right-12 flex flex-col gap-2 opacity-50">
                      <div className="w-12 h-[1px] bg-primary"></div>
                      <div className="w-6 h-[1px] bg-primary ml-auto"></div>
                      <div className="w-8 h-[1px] bg-primary ml-auto"></div>
                    </div>

                    {/* Description Overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-12 bg-gradient-to-t from-surface via-surface/98 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out">
                      <div className="w-16 h-[2px] bg-primary mb-8 shadow-[0_0_15px_rgba(0,242,255,1)]"></div>
                      <p className="text-[12px] font-bold text-primary/90 uppercase tracking-[0.3em] leading-relaxed mb-8 max-w-[85%]">
                        {cat.desc}
                      </p>
                      <div className="flex items-center gap-4 text-primary font-black text-[12px] tracking-[0.5em] uppercase group/link">
                        Initialize Protocol 
                        <span className="material-icons text-lg group-hover/link:translate-x-3 transition-transform">terminal</span>
                      </div>
                    </div>

                    {/* Pulse Bloom Effect */}
                    <motion.div 
                      className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{ 
                        opacity: [0, 0.2, 0] 
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity 
                      }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
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
                      <button className="flex-1 btn-neon-cyan !py-2 !px-0 flex items-center justify-center">
                        <span className="material-icons">add_shopping_cart</span>
                      </button>
                      <button className="w-10 h-10 flex items-center justify-center border border-[#25D366]/50 text-[#25D366] rounded-sm hover:bg-[#25D366] hover:text-surface transition-all">
                        <span className="material-icons text-xl">chat</span>
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
