import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 w-full mt-auto relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-4 md:px-12 py-20 max-w-screen-2xl mx-auto relative z-10">
        <div className="space-y-8 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path 
                  d="M80 20 C60 5 30 5 15 30 C0 55 5 85 35 95 C55 100 80 90 90 70" 
                  fill="none" 
                  stroke="#000000" 
                  strokeWidth="8" 
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tighter text-black uppercase">CITRIX COMPUTER</span>
          </div>
          <p className="text-gray-400 text-[10px] font-body uppercase tracking-[0.2em] leading-relaxed border-l-2 border-gray-100 pl-6 max-w-xs md:text-left">
            The pinnacle of high-end computing solutions and professional technical services in Sri Lanka. 
            Established 2014.
          </p>
        </div>

        <div>
          <h4 className="text-[10px] font-black text-black uppercase tracking-[0.4em] mb-8">Foundry Navigation</h4>
          <ul className="space-y-4">
            <li><Link className="text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors" to="/hardware">Hardware Catalog</Link></li>
            <li><Link className="text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors" to="/workstations">Workstations</Link></li>
            <li><Link className="text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors" to="/deals">Foundry Drops</Link></li>
            <li><Link className="text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors" to="/repairs">Repair Center</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-black text-black uppercase tracking-[0.4em] mb-8">Store Protocol</h4>
          <ul className="space-y-4">
            <li className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Main Street, Galle</li>
            <li><a className="text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors" href="https://wa.me/94789827123" target="_blank" rel="noopener noreferrer">0789827123</a></li>
            <li><a className="text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors" href="https://wa.me/94789827123" target="_blank" rel="noopener noreferrer">HOTLINE: 0789827123</a></li>
            <li><Link className="text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors" to="/contact">View on Map</Link></li>
            <li><Link className="text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors" to="/warranty">Warranty Policy</Link></li>
          </ul>
          {/* Small Footer Map */}
          <div className="mt-8 w-full aspect-video rounded-sm overflow-hidden border border-gray-100 grayscale hover:grayscale-0 transition-all duration-500">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.579461141723!2d80.21440787413662!3d6.052296493933481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae17300456185bb%3A0xc07a2761899148d!2sCitrix%20Computer!5e0!3m2!1sen!2slk!4v1712404700000!5m2!1sen!2slk" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-black text-black uppercase tracking-[0.4em] mb-8">Support Hub</h4>
          <ul className="space-y-4">
            <li><Link className="text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors" to="/terms">Terms of Service</Link></li>
            <li><Link className="text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors" to="/privacy">Privacy Policy</Link></li>
            <li><a className="text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors" href="https://wa.me/94789827123" target="_blank" rel="noopener noreferrer">Contact Expert</a></li>
            <li><a className="text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors" href="https://wa.me/94789827123" target="_blank" rel="noopener noreferrer">Wholesale Inquiry</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100 py-12 px-4 md:px-12 max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <p className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.4em]">© 2024 Citrix Computer. All Rights Reserved. Designed for Performance.</p>
        <div className="flex gap-6">
          <img alt="Visa" className="h-4 opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEjN4sxGv-bzmIyCpgbeGpf5BFWKlU_QTQcfWRDTmqwXsJRwYlW-azTi8ifqPAWcwwHuxK-veauYi9J3IDh8zTYsevtPLXIiX7u5J_-jAGhkCFpU2I7bNSOIhANZTXCU2BysEF7JPWoma9hqev-aERzal9-82_XQX6QAGWGHTQYxLiOyBl4N7sjT5x1j-qfjkyFrZk-DQxhm0PFqt9aWuV9b7gjq81kcNZB15PStns3rqUlOoSqnXdtZvKNXVkkB1O83t8drAF" referrerPolicy="no-referrer" />
          <img alt="Mastercard" className="h-4 opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsTiUFg9RMts_0xIUJclERA3d7zpMZGMv7lZSCEPUd-9bVRJIzM4LfbNT_zHq243S-zGxUUxZZZGwuH-ITSyzA8GpdS4X7KnPMmWxJWPkG9AU6Fp--1xM4u_V7Lem8PzpLtJmdyd8rV65PECWE1sdxyz5uuwP3DeF4JKMdtlwPS6PdmN1e5FDiXPFxyE9HVOVHc0hgt7DiC13-rpY85lNiDqkikAktk-c4e7fXy_5m1LXaoDTfH4k3MbWsq2uZE2gewL69sNha" referrerPolicy="no-referrer" />
        </div>
      </div>
    </footer>
  );
}
