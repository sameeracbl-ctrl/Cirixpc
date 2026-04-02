import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-primary/10 w-full mt-auto relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_50%_100%,rgba(0,242,255,0.05),transparent_70%)] pointer-events-none"></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 md:px-12 py-20 max-w-screen-2xl mx-auto relative z-10">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(0,242,255,0.8)]">
                <path 
                  d="M80 20 C60 5 30 5 15 30 C0 55 5 85 35 95 C55 100 80 90 90 70" 
                  fill="none" 
                  stroke="#00f2ff" 
                  strokeWidth="8" 
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase">CITRIX COMPUTER</span>
          </div>
          <p className="text-primary/40 text-xs font-body uppercase tracking-widest leading-relaxed border-l-2 border-primary/20 pl-6">
            The pinnacle of high-end computing solutions and professional technical services in Sri Lanka. 
            Established 2014.
          </p>
          <div className="flex gap-4">
            {['facebook', 'instagram', 'chat'].map((icon) => (
              <a 
                key={icon}
                className="w-10 h-10 flex items-center justify-center border border-primary/20 text-primary/40 hover:border-primary hover:text-primary hover:neon-glow-cyan transition-all duration-300" 
                href="#"
              >
                <span className="material-icons text-xl">{icon}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-8">Foundry Navigation</h4>
          <ul className="space-y-4">
            <li><Link className="text-[10px] font-bold text-white/40 hover:text-primary uppercase tracking-widest transition-colors" to="/hardware">Hardware Catalog</Link></li>
            <li><Link className="text-[10px] font-bold text-white/40 hover:text-primary uppercase tracking-widest transition-colors" to="/workstations">Workstations</Link></li>
            <li><Link className="text-[10px] font-bold text-white/40 hover:text-primary uppercase tracking-widest transition-colors" to="/deals">Foundry Drops</Link></li>
            <li><Link className="text-[10px] font-bold text-white/40 hover:text-primary uppercase tracking-widest transition-colors" to="/repairs">Repair Center</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-8">Store Protocol</h4>
          <ul className="space-y-4">
            <li className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Main Street, Galle</li>
            <li className="text-[10px] font-bold text-white/40 uppercase tracking-widest">+94 91 222 3344</li>
            <li className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Service: Ext 102</li>
            <li><Link className="text-[10px] font-bold text-white/40 hover:text-primary uppercase tracking-widest transition-colors" to="/warranty">Warranty Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-8">Support Hub</h4>
          <ul className="space-y-4">
            <li><Link className="text-[10px] font-bold text-white/40 hover:text-primary uppercase tracking-widest transition-colors" to="/terms">Terms of Service</Link></li>
            <li><Link className="text-[10px] font-bold text-white/40 hover:text-primary uppercase tracking-widest transition-colors" to="/privacy">Privacy Policy</Link></li>
            <li><Link className="text-[10px] font-bold text-white/40 hover:text-primary uppercase tracking-widest transition-colors" to="/contact">Contact Expert</Link></li>
            <li><Link className="text-[10px] font-bold text-white/40 hover:text-primary uppercase tracking-widest transition-colors" to="/wholesale">Wholesale Inquiry</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary/10 py-12 px-8 md:px-12 max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <p className="text-[9px] font-bold text-primary/20 uppercase tracking-[0.4em]">© 2024 Citrix Computer. All Rights Reserved. Designed for Performance.</p>
        <div className="flex gap-6">
          <img alt="Visa" className="h-4 opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEjN4sxGv-bzmIyCpgbeGpf5BFWKlU_QTQcfWRDTmqwXsJRwYlW-azTi8ifqPAWcwwHuxK-veauYi9J3IDh8zTYsevtPLXIiX7u5J_-jAGhkCFpU2I7bNSOIhANZTXCU2BysEF7JPWoma9hqev-aERzal9-82_XQX6QAGWGHTQYxLiOyBl4N7sjT5x1j-qfjkyFrZk-DQxhm0PFqt9aWuV9b7gjq81kcNZB15PStns3rqUlOoSqnXdtZvKNXVkkB1O83t8drAF" referrerPolicy="no-referrer" />
          <img alt="Mastercard" className="h-4 opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsTiUFg9RMts_0xIUJclERA3d7zpMZGMv7lZSCEPUd-9bVRJIzM4LfbNT_zHq243S-zGxUUxZZZGwuH-ITSyzA8GpdS4X7KnPMmWxJWPkG9AU6Fp--1xM4u_V7Lem8PzpLtJmdyd8rV65PECWE1sdxyz5uuwP3DeF4JKMdtlwPS6PdmN1e5FDiXPFxyE9HVOVHc0hgt7DiC13-rpY85lNiDqkikAktk-c4e7fXy_5m1LXaoDTfH4k3MbWsq2uZE2gewL69sNha" referrerPolicy="no-referrer" />
        </div>
      </div>
    </footer>
  );
}
