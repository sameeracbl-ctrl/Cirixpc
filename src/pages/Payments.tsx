import React from 'react';
import { motion } from 'motion/react';
import { Phone, Truck, ShieldCheck, MessageCircle, Landmark, CreditCard, Info } from 'lucide-react';

export default function Payments() {
  const bankDetails = [
    {
      bank: "People's Bank",
      accountName: 'Citrix Computer',
      accountNumber: '343100100021184',
      branch: 'Karapitiya'
    },
    {
      bank: 'Bank of Ceylon (BOC)',
      accountName: 'AVA ILIKA',
      accountNumber: '83279320',
      branch: 'Karapitiya'
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black text-[#00f2ff] uppercase tracking-tighter mb-4 drop-shadow-[0_0_15px_rgba(0,242,255,0.3)]">
            How to Order & Pay
          </h1>
          <p className="text-[#87cefa] font-bold uppercase tracking-[0.3em] text-sm">ඇණවුම් කිරීම සහ ගෙවීම්</p>
        </motion.div>

        <div className="space-y-12 mb-20">
          {/* Step 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0a0a0a] border border-white/30 p-4 md:p-8 rounded-2xl relative overflow-hidden group hover:border-[#00f2ff]/50 transition-all shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Phone size={80} className="text-[#ffb347]" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#ffb347]/10 flex items-center justify-center text-[#ffb347] border border-[#ffb347]/20">
                  <span className="font-black text-xl">01</span>
                </div>
                <h2 className="text-xl font-black text-[#ffb347] uppercase tracking-tight">
                  Step One: Stock Check | <span className="text-[#87cefa]/80">පළමු පියවර: තොග පරීක්ෂාව</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <p className="text-xs font-black text-[#ffb347] uppercase tracking-widest">English</p>
                  <p className="text-[#ffffff] leading-relaxed font-medium">
                    Before making any payment, please call or WhatsApp us at <span className="text-[#00f2ff] font-bold">0789827123</span> to confirm if the item is in stock and to verify the latest price.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-black text-[#ffb347] uppercase tracking-widest">සිංහල</p>
                  <p className="text-[#87cefa] leading-relaxed font-sinhala font-medium">
                    ඕනෑම ගෙවීමක් සිදු කිරීමට පෙර, අදාළ භාණ්ඩය තොග පවතින බව සහ නවතම මිල තහවුරු කර ගැනීමට කරුණාකර 0789827123 අංකයට අමතන්න හෝ WhatsApp පණිවිඩයක් එවන්න.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0a0a0a] border border-white/30 p-4 md:p-8 rounded-2xl relative overflow-hidden group hover:border-[#00f2ff]/50 transition-all shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Truck size={80} className="text-[#ffb347]" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#ffb347]/10 flex items-center justify-center text-[#ffb347] border border-[#ffb347]/20">
                  <span className="font-black text-xl">02</span>
                </div>
                <h2 className="text-xl font-black text-[#ffb347] uppercase tracking-tight">
                  Step Two: Payment Policy | <span className="text-[#87cefa]/80">දෙවන පියවර: ගෙවීම් රීති</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <p className="text-xs font-black text-[#ffb347] uppercase tracking-widest">English</p>
                  <p className="text-[#ffffff] leading-relaxed font-medium">
                    We strictly operate on a <span className="text-[#00f2ff] font-bold underline decoration-[#ffb347]/50">Pre-payment basis</span>. We do not provide Cash on Delivery (COD). Full payment is required before dispatching via courier.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-black text-[#ffb347] uppercase tracking-widest">සිංහල</p>
                  <p className="text-[#87cefa] leading-relaxed font-sinhala font-medium">
                    අප ආයතනය Cash on Delivery (COD) සේවාව සපයනු නොලැබේ. භාණ්ඩය කුරියර් කිරීමට පෙර සම්පූර්ණ මුදල ගෙවිය යුතුය.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0a0a0a] border border-white/30 p-4 md:p-8 rounded-2xl relative overflow-hidden group hover:border-[#00f2ff]/50 transition-all shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShieldCheck size={80} className="text-[#ffb347]" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#ffb347]/10 flex items-center justify-center text-[#ffb347] border border-[#ffb347]/20">
                  <span className="font-black text-xl">03</span>
                </div>
                <h2 className="text-xl font-black text-[#ffb347] uppercase tracking-tight">
                  Step Three: Order Confirmation | <span className="text-[#87cefa]/80">තෙවන පියවර: ඇණවුම තහවුරු කිරීම</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <p className="text-xs font-black text-[#ffb347] uppercase tracking-widest">English</p>
                  <p className="text-[#ffffff] leading-relaxed font-medium">
                    Once the transfer is done, send your <span className="text-[#00f2ff] font-bold">Payment Proof</span> (Slip/Screenshot) along with your Name, Address, and 2 Contact Numbers to our WhatsApp.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-black text-[#ffb347] uppercase tracking-widest">සිංහල</p>
                  <p className="text-[#87cefa] leading-relaxed font-sinhala font-medium">
                    ගෙවීම් කළ පසු, එහි රිසිට් පත (Slip/Screenshot) සමඟ ඔබේ නම, ලිපිනය සහ දුරකථන අංක 2ක් අපගේ WhatsApp අංකයට යොමු කරන්න.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bank Accounts */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <Landmark className="text-[#00f2ff]" size={32} />
            <h2 className="text-2xl font-black text-[#00f2ff] uppercase tracking-tight">
              Official Bank Accounts | <span className="text-[#87cefa]/80">නිල බැංකු ගිණුම් විස්තර</span>
            </h2>
          </div>

          <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/30 bg-[#0a0a0a] shadow-2xl bank-details-table">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-6 text-[10px] font-black text-[#ffb347] uppercase tracking-widest">Bank Name</th>
                  <th className="p-6 text-[10px] font-black text-[#ffb347] uppercase tracking-widest">Account Name</th>
                  <th className="p-6 text-[10px] font-black text-[#ffb347] uppercase tracking-widest">Account Number</th>
                  <th className="p-6 text-[10px] font-black text-[#ffb347] uppercase tracking-widest">Branch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bankDetails.map((bank, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">
                          <Landmark size={16} className="text-[#00f2ff]" />
                        </div>
                        <span className="text-[#ffffff] font-bold uppercase text-xs tracking-wider">{bank.bank}</span>
                      </div>
                    </td>
                    <td className="p-6 text-[#87cefa] text-xs font-bold uppercase tracking-wider">{bank.accountName}</td>
                    <td className="p-6">
                      <span className="text-[#00f2ff] font-mono font-bold text-sm tracking-widest">{bank.accountNumber}</span>
                    </td>
                    <td className="p-6 text-[#ffffff] text-[10px] font-black uppercase tracking-widest">{bank.branch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Bank Cards */}
          <div className="md:hidden space-y-4">
            {bankDetails.map((bank, idx) => (
              <div key={idx} className="bg-[#0a0a0a] border border-white/30 p-6 rounded-2xl space-y-4 shadow-xl">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <div className="w-10 h-10 rounded bg-[#00f2ff]/10 flex items-center justify-center">
                    <Landmark size={20} className="text-[#00f2ff]" />
                  </div>
                  <span className="text-[#ffffff] font-black uppercase text-sm tracking-widest">{bank.bank}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] font-black text-[#ffb347] uppercase tracking-widest block mb-1">Account Name</span>
                    <p className="text-[#87cefa] text-xs font-bold uppercase">{bank.accountName}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-[#ffb347] uppercase tracking-widest block mb-1">Branch</span>
                    <p className="text-[#ffffff] text-xs font-black uppercase">{bank.branch}</p>
                  </div>
                </div>
                <div>
                  <span className="text-[9px] font-black text-[#ffb347] uppercase tracking-widest block mb-1">Account Number</span>
                  <p className="text-[#00f2ff] font-mono font-bold text-lg tracking-widest">{bank.accountNumber}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* WhatsApp Button */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-[#0a0a0a] border border-[#00f2ff]/40 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] relative overflow-hidden shadow-[0_0_50px_rgba(0,242,255,0.15)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent"></div>
            <h3 className="text-2xl font-black text-[#ffffff] uppercase tracking-tight mb-4">Ready to confirm your order?</h3>
            <p className="text-[#87cefa] text-sm uppercase tracking-widest mb-10 font-bold">Our experts are standing by to assist you.</p>
            
            <a 
              href="https://wa.me/94789827123" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-[#00f2ff] text-black px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-[#00f2ff]/80 hover:shadow-[0_0_40px_rgba(0,242,255,0.6)] transition-all active:scale-95 group"
            >
              <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
              Click to WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
