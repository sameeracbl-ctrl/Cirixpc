import { useState } from 'react';
import { motion } from 'motion/react';
import { Monitor, Laptop, Send, MessageSquare } from 'lucide-react';

export default function Repairs() {
  const [desktopIssue, setDesktopIssue] = useState('');
  const [laptopIssue, setLaptopIssue] = useState('');

  const sendWhatsApp = (type: 'Desktop' | 'Laptop', message: string) => {
    if (!message.trim()) return;
    
    const formattedMessage = `Hello Citrix Computer, I have an issue with my ${type}: ${message}`;
    const encodedText = encodeURIComponent(formattedMessage);
    window.open(`https://wa.me/94789827123?text=${encodedText}`, '_blank');
  };

  const checkStatus = () => {
    const text = "Hi Citrix Computer, I want to check the status of my repair/get a price for a laptop part.";
    window.open(`https://wa.me/94789827123?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden font-sans text-neutral-200">
      {/* Background Texture & Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,204,255,0.05),transparent_50%)]"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#0a0a0a] to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-20 relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <div className="inline-block px-4 py-1 border border-[#00ccff]/30 bg-[#00ccff]/5 backdrop-blur-sm rounded-full mb-8">
            <span className="text-[#00ccff] text-[10px] font-black tracking-[0.5em] uppercase">Service Protocol v5.0</span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6 leading-none">
            PROFESSIONAL <br/>
            <span className="text-[#00ccff] drop-shadow-[0_0_15px_rgba(0,204,255,0.5)]">REPAIR SOLUTIONS.</span>
          </h1>
          <p className="text-neutral-500 max-w-2xl mx-auto font-bold leading-relaxed uppercase text-xs tracking-[0.3em]">
            Expert diagnostics and hardware restoration for your high-performance machines.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {/* Desktop Service Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="group relative p-8 md:p-10 bg-white/5 border border-white/10 hover:border-[#00ccff]/50 rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,204,255,0.15)] backdrop-blur-xl overflow-hidden"
          >
            <div className="relative z-10">
              <div className="mb-8 w-16 h-16 bg-[#00ccff]/10 border border-[#00ccff]/20 rounded-2xl flex items-center justify-center group-hover:bg-[#00ccff]/20 transition-all duration-500">
                <Monitor className="text-[#00ccff]" size={32} />
              </div>
              
              <h3 className="text-3xl font-black font-headline tracking-tighter text-white mb-2 uppercase">
                Desktop <span className="text-[#00ccff]">Service</span>
              </h3>
              <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-8">
                Workstations, Gaming Rigs & Servers
              </p>

              <div className="space-y-6">
                <div className="relative">
                  <textarea 
                    value={desktopIssue}
                    onChange={(e) => setDesktopIssue(e.target.value)}
                    placeholder="DESCRIBE YOUR DESKTOP ISSUE..."
                    className="w-full h-32 bg-black/40 border border-white/10 rounded-2xl p-5 text-white text-sm font-medium placeholder:text-neutral-700 focus:outline-none focus:border-[#00ccff]/50 focus:ring-1 focus:ring-[#00ccff]/20 transition-all resize-none"
                  />
                </div>

                <button 
                  onClick={() => sendWhatsApp('Desktop', desktopIssue)}
                  disabled={!desktopIssue.trim()}
                  className="w-full group/btn relative flex items-center justify-center gap-3 px-8 py-4 bg-[#00ccff] text-black font-black uppercase tracking-widest text-xs rounded-2xl transition-all duration-500 hover:bg-white hover:shadow-[0_0_30px_rgba(0,204,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#00ccff] disabled:hover:shadow-none"
                >
                  <MessageSquare size={18} />
                  Send via WhatsApp
                  <Send size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00ccff]/5 blur-[100px] rounded-full group-hover:bg-[#00ccff]/10 transition-colors" />
          </motion.div>

          {/* Laptop Service Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="group relative p-8 md:p-10 bg-white/5 border border-white/10 hover:border-[#00ccff]/50 rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,204,255,0.15)] backdrop-blur-xl overflow-hidden"
          >
            <div className="relative z-10">
              <div className="mb-8 w-16 h-16 bg-[#00ccff]/10 border border-[#00ccff]/20 rounded-2xl flex items-center justify-center group-hover:bg-[#00ccff]/20 transition-all duration-500">
                <Laptop className="text-[#00ccff]" size={32} />
              </div>
              
              <h3 className="text-3xl font-black font-headline tracking-tighter text-white mb-2 uppercase">
                Laptop <span className="text-[#00ccff]">Service</span>
              </h3>
              <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-8">
                Notebooks, Ultrabooks & MacBooks
              </p>

              <div className="space-y-6">
                <div className="relative">
                  <textarea 
                    value={laptopIssue}
                    onChange={(e) => setLaptopIssue(e.target.value)}
                    placeholder="DESCRIBE YOUR LAPTOP ISSUE..."
                    className="w-full h-32 bg-black/40 border border-white/10 rounded-2xl p-5 text-white text-sm font-medium placeholder:text-neutral-700 focus:outline-none focus:border-[#00ccff]/50 focus:ring-1 focus:ring-[#00ccff]/20 transition-all resize-none"
                  />
                </div>

                <button 
                  onClick={() => sendWhatsApp('Laptop', laptopIssue)}
                  disabled={!laptopIssue.trim()}
                  className="w-full group/btn relative flex items-center justify-center gap-3 px-8 py-4 bg-[#00ccff] text-black font-black uppercase tracking-widest text-xs rounded-2xl transition-all duration-500 hover:bg-white hover:shadow-[0_0_30px_rgba(0,204,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#00ccff] disabled:hover:shadow-none"
                >
                  <MessageSquare size={18} />
                  Send via WhatsApp
                  <Send size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00ccff]/5 blur-[100px] rounded-full group-hover:bg-[#00ccff]/10 transition-colors" />
          </motion.div>
        </div>

        {/* Status Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-12 bg-white/5 border border-white/10 rounded-[3rem] text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#00ccff]/5 to-transparent"></div>
          
          <h2 className="text-3xl font-black font-headline tracking-tighter text-white mb-8 uppercase relative z-10">
            Already have a device with us? <br/>
            <span className="text-[#00ccff]">Check Repair Status</span>
          </h2>
          
          <button 
            onClick={checkStatus}
            className="group relative inline-flex items-center gap-4 px-12 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#00ccff] transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(0,204,255,0.4)] rounded-2xl"
          >
            Check Status Now
            <span className="material-icons text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
          </button>

          <div className="mt-12 flex items-center justify-center gap-3 text-neutral-600">
            <div className="h-[1px] w-12 bg-white/10"></div>
            <span className="text-[9px] font-black tracking-[0.4em] uppercase">
              10+ YEARS OF TECHNICAL EXCELLENCE
            </span>
            <div className="h-[1px] w-12 bg-white/10"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
