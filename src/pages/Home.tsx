import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import HeroSection from '../components/HeroSection';
import Testimonials from '../components/Testimonials';

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
    <div className="flex flex-col min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black relative">
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
              className="absolute inset-0 bg-white/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-white border border-gray-100 p-8 md:p-12 rounded-sm shadow-2xl overflow-hidden"
            >
              {/* Decorative Background */}
              <div className="absolute top-0 left-0 w-full h-1 bg-black"></div>

              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="text-gray-400 text-[10px] font-black tracking-[0.4em] uppercase mb-2 block">PC Configurator</span>
                  <h2 className="font-headline text-4xl font-black text-black tracking-tighter uppercase">Build Your PC</h2>
                </div>
                <button 
                  onClick={() => {
                    setIsBuilderModalOpen(false);
                    setStep(1);
                  }}
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  <span className="material-icons text-3xl">close</span>
                </button>
              </div>

              {/* Step Indicator */}
              <div className="flex items-center gap-2 mb-10 overflow-x-auto no-scrollbar pb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div 
                    key={s}
                    className={`flex-shrink-0 h-1 transition-all duration-500 ${s <= step ? 'w-12 bg-black' : 'w-8 bg-gray-100'}`}
                  />
                ))}
                <span className="ml-auto text-[10px] font-black text-gray-400 uppercase tracking-widest">Step {step} of 5</span>
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
                          <h3 className="text-xs font-black text-black uppercase tracking-[0.3em] border-l-2 border-black pl-3">Processor Unit</h3>
                          
                          <div className="space-y-4">
                            <div className="flex gap-2">
                              {['Intel', 'Ryzen'].map(type => (
                                <button
                                  key={type}
                                  onClick={() => setBuildConfig({...buildConfig, processorType: type})}
                                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${buildConfig.processorType === type ? 'bg-black text-white border-black' : 'border-gray-100 text-gray-400'}`}
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
                                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${buildConfig.processorCondition === cond ? 'bg-black text-white border-black' : 'border-gray-100 text-gray-400'}`}
                                >
                                  {cond}
                                </button>
                              ))}
                            </div>
                            <div className="relative">
                              <select 
                                value={buildConfig.processorModel}
                                onChange={(e) => setBuildConfig({...buildConfig, processorModel: e.target.value})}
                                className="w-full bg-white border border-gray-100 p-4 pr-10 text-black font-bold tracking-tight focus:border-black focus:outline-none transition-all rounded-sm appearance-none cursor-pointer"
                              >
                                {(buildConfig.processorCondition === 'Used' 
                                  ? (buildConfig.processorType === 'Intel' ? PROC_INTEL_USED : PROC_RYZEN_USED)
                                  : (buildConfig.processorType === 'Intel' ? PROC_INTEL_NEW : PROC_RYZEN_NEW)
                                ).map(opt => (
                                  <option key={opt} value={opt} className="bg-white text-black">{opt}</option>
                                ))}
                              </select>
                              <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
                            </div>
                          </div>
                        </div>

                        {/* Motherboard Section */}
                        <div className="space-y-6">
                          <h3 className="text-xs font-black text-black uppercase tracking-[0.3em] border-l-2 border-black pl-3">Motherboard</h3>
                          
                          <div className="space-y-4">
                            <div className="flex gap-2">
                              {['Intel', 'Ryzen'].map(type => (
                                <button
                                  key={type}
                                  onClick={() => setBuildConfig({...buildConfig, motherboardType: type})}
                                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${buildConfig.motherboardType === type ? 'bg-black text-white border-black' : 'border-gray-100 text-gray-400'}`}
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
                                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${buildConfig.motherboardCondition === cond ? 'bg-black text-white border-black' : 'border-gray-100 text-gray-400'}`}
                                >
                                  {cond}
                                </button>
                              ))}
                            </div>
                            <div className="relative">
                              <select 
                                value={buildConfig.motherboardModel}
                                onChange={(e) => setBuildConfig({...buildConfig, motherboardModel: e.target.value})}
                                className="w-full bg-white border border-gray-100 p-4 pr-10 text-black font-bold tracking-tight focus:border-black focus:outline-none transition-all rounded-sm appearance-none cursor-pointer"
                              >
                                {(buildConfig.motherboardCondition === 'Used' 
                                  ? (buildConfig.motherboardType === 'Intel' ? MB_INTEL_USED : MB_RYZEN_USED)
                                  : MB_NEW
                                ).map(opt => (
                                  <option key={opt} value={opt} className="bg-white text-black">{opt}</option>
                                ))}
                              </select>
                              <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
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
                          <h3 className="text-xs font-black text-black uppercase tracking-[0.3em] border-l-2 border-black pl-3">Memory (RAM)</h3>
                          
                          <div className="space-y-4">
                            <div className="flex gap-2">
                              {['DDR3', 'DDR4', 'DDR5'].map(type => (
                                <button
                                  key={type}
                                  onClick={() => setBuildConfig({...buildConfig, ramType: type})}
                                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${buildConfig.ramType === type ? 'bg-black text-white border-black' : 'border-gray-100 text-gray-400'}`}
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
                                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${buildConfig.ramCondition === cond ? 'bg-black text-white border-black' : 'border-gray-100 text-gray-400'}`}
                                >
                                  {cond}
                                </button>
                              ))}
                            </div>
                            <div className="relative">
                              <select 
                                value={buildConfig.ramCapacity}
                                onChange={(e) => setBuildConfig({...buildConfig, ramCapacity: e.target.value})}
                                className="w-full bg-white border border-gray-100 p-4 pr-10 text-black font-bold tracking-tight focus:border-black focus:outline-none transition-all rounded-sm appearance-none cursor-pointer"
                              >
                                {(buildConfig.ramCondition === 'Used' 
                                  ? RAM_USED
                                  : RAM_NEW
                                ).map(opt => (
                                  <option key={opt} value={opt} className="bg-white text-black">{opt}</option>
                                ))}
                              </select>
                              <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
                            </div>
                          </div>
                        </div>

                        {/* PSU Section */}
                        <div className="space-y-6">
                          <h3 className="text-xs font-black text-black uppercase tracking-[0.3em] border-l-2 border-black pl-3">Power Supply (PSU)</h3>
                          
                          <div className="space-y-4">
                            <div className="flex gap-2">
                              {['Used', 'Brand New'].map(cond => (
                                <button
                                  key={cond}
                                  onClick={() => setBuildConfig({...buildConfig, psuCondition: cond})}
                                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${buildConfig.psuCondition === cond ? 'bg-black text-white border-black' : 'border-gray-100 text-gray-400'}`}
                                >
                                  {cond}
                                </button>
                              ))}
                            </div>
                            <div className="relative">
                              <select 
                                value={buildConfig.psuModel}
                                onChange={(e) => setBuildConfig({...buildConfig, psuModel: e.target.value})}
                                className="w-full bg-white border border-gray-100 p-4 pr-10 text-black font-bold tracking-tight focus:border-black focus:outline-none transition-all rounded-sm appearance-none cursor-pointer"
                              >
                                {(buildConfig.psuCondition === 'Used' ? PSU_USED : PSU_NEW).map(opt => (
                                  <option key={opt} value={opt} className="bg-white text-black">{opt}</option>
                                ))}
                              </select>
                              <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
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
                          <h3 className="text-xs font-black text-black uppercase tracking-[0.3em] border-l-2 border-black pl-3">Storage</h3>
                          
                          <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                              {['HDD', 'SSD', 'M.2', 'NVMe'].map(type => (
                                <button
                                  key={type}
                                  onClick={() => setBuildConfig({...buildConfig, storageType: type})}
                                  className={`flex-1 min-w-[60px] py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${buildConfig.storageType === type ? 'bg-black text-white border-black' : 'border-gray-100 text-gray-400'}`}
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
                                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${buildConfig.storageCondition === cond ? 'bg-black text-white border-black' : 'border-gray-100 text-gray-400'}`}
                                >
                                  {cond}
                                </button>
                              ))}
                            </div>
                            <div className="relative">
                              <select 
                                value={buildConfig.storageCapacity}
                                onChange={(e) => setBuildConfig({...buildConfig, storageCapacity: e.target.value})}
                                className="w-full bg-white border border-gray-100 p-4 pr-10 text-black font-bold tracking-tight focus:border-black focus:outline-none transition-all rounded-sm appearance-none cursor-pointer"
                              >
                                {(buildConfig.storageCondition === 'Used' 
                                  ? (buildConfig.storageType === 'HDD' ? HDD_USED : buildConfig.storageType === 'SSD' ? SSD_USED : buildConfig.storageType === 'M.2' ? M2_USED : NVME_USED)
                                  : ['256GB', '512GB', '1TB', '2TB']
                                ).map(opt => (
                                  <option key={opt} value={opt} className="bg-white text-black">{opt}</option>
                                ))}
                              </select>
                              <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
                            </div>
                          </div>
                        </div>

                        {/* Cooling Section */}
                        <div className="space-y-6">
                          <h3 className="text-xs font-black text-black uppercase tracking-[0.3em] border-l-2 border-black pl-3">Cooling System</h3>
                          
                          <div className="space-y-4">
                            <div className="relative">
                              <select 
                                value={buildConfig.cooling}
                                onChange={(e) => setBuildConfig({...buildConfig, cooling: e.target.value})}
                                className="w-full bg-white border border-gray-100 p-4 pr-10 text-black font-bold tracking-tight focus:border-black focus:outline-none transition-all rounded-sm appearance-none cursor-pointer"
                              >
                                {['Intel Stock Cooler', 'RGB Air Cooler', 'Liquid Cooler'].map(opt => (
                                  <option key={opt} value={opt} className="bg-white text-black">{opt}</option>
                                ))}
                              </select>
                              <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
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
                          <h3 className="text-xs font-black text-black uppercase tracking-[0.3em] border-l-2 border-black pl-3">Casing & Lighting</h3>
                          
                          <div className="space-y-4">
                            <div className="relative">
                              <select 
                                value={buildConfig.caseModel}
                                onChange={(e) => setBuildConfig({...buildConfig, caseModel: e.target.value})}
                                className="w-full bg-white border border-gray-100 p-4 pr-10 text-black font-bold tracking-tight focus:border-black focus:outline-none transition-all rounded-sm appearance-none cursor-pointer"
                              >
                                {['Standard ATX', 'Gaming RGB Case', 'Mini-ITX Case', 'Full Tower'].map(opt => (
                                  <option key={opt} value={opt} className="bg-white text-black">{opt}</option>
                                ))}
                              </select>
                              <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
                            </div>
                            <div className="relative">
                              <select 
                                value={buildConfig.fans}
                                onChange={(e) => setBuildConfig({...buildConfig, fans: e.target.value})}
                                className="w-full bg-white border border-gray-100 p-4 pr-10 text-black font-bold tracking-tight focus:border-black focus:outline-none transition-all rounded-sm appearance-none cursor-pointer"
                              >
                                {['None', 'RGB Fans', 'ARGB Fans'].map(opt => (
                                  <option key={opt} value={opt} className="bg-white text-black">{opt}</option>
                                ))}
                              </select>
                              <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
                            </div>
                            <div className="relative">
                              <select 
                                value={buildConfig.lighting}
                                onChange={(e) => setBuildConfig({...buildConfig, lighting: e.target.value})}
                                className="w-full bg-white border border-gray-100 p-4 pr-10 text-black font-bold tracking-tight focus:border-black focus:outline-none transition-all rounded-sm appearance-none cursor-pointer"
                              >
                                {['None', 'Static RGB', 'ARGB Remote Control'].map(opt => (
                                  <option key={opt} value={opt} className="bg-white text-black">{opt}</option>
                                ))}
                              </select>
                              <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
                            </div>
                          </div>
                        </div>

                        {/* Monitor Section */}
                        <div className="space-y-6">
                          <h3 className="text-xs font-black text-black uppercase tracking-[0.3em] border-l-2 border-black pl-3">Monitor</h3>
                          
                          <div className="space-y-4">
                            <div className="flex gap-2">
                              {['Frameless Monitor', 'Brand New Monitor'].map(type => (
                                <button
                                  key={type}
                                  onClick={() => setBuildConfig({...buildConfig, monitorType: type})}
                                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${buildConfig.monitorType === type ? 'bg-black text-white border-black' : 'border-gray-100 text-gray-400'}`}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                            <div className="relative">
                              <select 
                                value={buildConfig.monitorModel}
                                onChange={(e) => setBuildConfig({...buildConfig, monitorModel: e.target.value})}
                                className="w-full bg-white border border-gray-100 p-4 pr-10 text-black font-bold tracking-tight focus:border-black focus:outline-none transition-all rounded-sm appearance-none cursor-pointer"
                              >
                                {(buildConfig.monitorType === 'Frameless Monitor' 
                                  ? MONITORS_FRAMELESS
                                  : MONITORS_NEW
                                ).map(opt => (
                                  <option key={opt} value={opt} className="bg-white text-black">{opt}</option>
                                ))}
                              </select>
                              <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
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
                        <h3 className="text-xs font-black text-black uppercase tracking-[0.3em] border-l-2 border-black pl-3">Optional Peripherals</h3>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {Object.entries(buildConfig.peripherals).map(([key, checked]) => (
                            <button
                              key={key}
                              onClick={() => setBuildConfig({
                                ...buildConfig, 
                                peripherals: { ...buildConfig.peripherals, [key]: !checked }
                              })}
                              className={`p-4 border rounded-sm flex items-center gap-3 transition-all ${checked ? 'bg-black text-white border-black' : 'border-gray-100 text-gray-400 hover:border-black/30'}`}
                            >
                              <span className="material-icons text-lg">{checked ? 'check_box' : 'check_box_outline_blank'}</span>
                              <span className="text-[10px] font-bold uppercase tracking-widest">{key}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 bg-gray-50 border border-gray-100 rounded-sm">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-[10px] font-black text-black uppercase tracking-[0.2em]">Configuration Summary</h4>
                          <div className="text-right">
                            <span className="text-[8px] text-gray-400 uppercase font-bold block">Estimated Total</span>
                            <span className="text-sm font-black text-black">LKR {calculateTotal().toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                          <div className="text-[9px] text-gray-400 uppercase font-bold">Processor:</div>
                          <div className="text-[9px] text-black font-bold">{buildConfig.processorModel}</div>
                          <div className="text-[9px] text-gray-400 uppercase font-bold">Motherboard:</div>
                          <div className="text-[9px] text-black font-bold">{buildConfig.motherboardModel}</div>
                          <div className="text-[9px] text-gray-400 uppercase font-bold">Memory:</div>
                          <div className="text-[9px] text-black font-bold">{buildConfig.ramCapacity}</div>
                          <div className="text-[9px] text-gray-400 uppercase font-bold">Storage:</div>
                          <div className="text-[9px] text-black font-bold">{buildConfig.storageCapacity} {buildConfig.storageType}</div>
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
                    className="flex-1 py-4 border border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all"
                  >
                    Back
                  </button>
                )}
                {step < 5 ? (
                  <button 
                    onClick={() => setStep(prev => prev + 1)}
                    className="flex-[2] bg-black text-white !py-4 !text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-black/90 transition-all"
                  >
                    Next Category
                    <span className="material-icons text-lg">arrow_forward</span>
                  </button>
                ) : (
                  <button 
                    onClick={generateQuotation}
                    className="flex-[2] bg-black text-white !py-4 !text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 group hover:bg-black/90 transition-all"
                  >
                    <span className="material-icons text-lg group-hover:scale-110 transition-transform">description</span>
                    Generate Quotation
                  </button>
                )}
              </div>

              <p className="text-center mt-8 text-[9px] font-bold text-gray-300 uppercase tracking-[0.3em]">
                Citrix Computer | Premium Custom PC Solutions
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Premium Category Grid */}
      <section id="hardware" className="py-20 bg-white relative overflow-hidden scroll-mt-24">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-12 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-12 bg-black"></div>
              <span className="text-gray-400 text-[11px] font-black tracking-[0.6em] uppercase block">Hardware Collection</span>
            </div>
            <h2 className="font-headline text-4xl md:text-6xl font-black text-black tracking-tighter uppercase">
              Browse <span className="text-gray-200">Categories.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Processors', slug: 'processors', img: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=600' },
              { label: 'Motherboards', slug: 'motherboards', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600' },
              { label: 'RAM', slug: 'ram', img: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=600' },
              { label: 'Storage', slug: 'storage', img: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&q=80&w=600' },
              { label: 'VGA', slug: 'vga', img: 'https://images.unsplash.com/photo-1591489378430-ef2f4c626b35?auto=format&fit=crop&q=80&w=600' },
              { label: 'PSU', slug: 'psu', img: 'https://images.unsplash.com/photo-1616132422484-916940007802?auto=format&fit=crop&q=80&w=600' },
              { label: 'Casing', slug: 'casings', img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=600' },
              { label: 'Laptops', slug: 'laptops', img: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=600' },
              { label: 'Keyboards', slug: 'keyboards', img: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=600' },
              { label: 'Mouse', slug: 'mouse', img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=600' },
              { label: 'Speakers', slug: 'speakers', img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=600' },
              { label: 'Laptop Acc', slug: 'laptop-accessories', img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=600' },
              { label: 'Network', slug: 'network-accessories', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600' },
              { label: 'Cables', slug: 'cables', img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=600' },
              { label: 'UPS', slug: 'ups', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600' },
              { label: 'Party Boxes', slug: 'party-boxes', img: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?auto=format&fit=crop&q=80&w=600' },
            ].map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link 
                  to={`/category/${cat.slug}`}
                  className="group relative block aspect-[4/3] md:aspect-square bg-gray-50 border border-gray-100 rounded-sm overflow-hidden transition-all duration-500 hover:border-black hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 opacity-60"></div>
                  <motion.img 
                    src={cat.img} 
                    alt={cat.label}
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 z-20">
                    <h3 className="font-headline text-lg md:text-xl font-black text-black uppercase tracking-tighter group-hover:text-black transition-all duration-300">
                      {cat.label}
                    </h3>
                  </div>
                  <div className="absolute top-0 right-0 p-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="material-symbols-outlined text-black icon-enhanced">arrow_forward</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hardware */}
      <section id="featured" className="py-24 bg-gray-50 scroll-mt-24">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-12">
          <div className="flex items-center justify-between mb-16">
            <h2 className="font-headline text-2xl font-black text-black tracking-widest uppercase">Featured Inventory</h2>
            <Link className="text-[10px] font-bold text-black border-b border-gray-200 pb-1 hover:border-black transition-all uppercase tracking-widest" to="/hardware">Access Full Catalog</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <div key={i} className="group flex flex-col bg-white rounded-sm overflow-hidden border border-gray-100 hover:border-black transition-all duration-500">
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <img alt={prod.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" src={prod.img} referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 bg-black text-white text-[8px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest">{prod.tag}</div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-2">{prod.category}</span>
                  <h3 className="font-headline font-bold text-sm text-black mb-4 line-clamp-2 uppercase tracking-tight group-hover:text-black transition-colors">{prod.title}</h3>
                  <div className="mt-auto">
                    <div className="text-xl font-black text-black mb-6">LKR {prod.price.replace('LKR ', '')}</div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-black text-white py-2 flex items-center justify-center hover:bg-black/90 transition-all">
                        <span className="material-icons">add_shopping_cart</span>
                      </button>
                      <button className="w-10 h-10 flex items-center justify-center border border-gray-200 text-gray-400 rounded-sm hover:border-black hover:text-black transition-all">
                        <span className="material-icons text-lg">chat</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
}
