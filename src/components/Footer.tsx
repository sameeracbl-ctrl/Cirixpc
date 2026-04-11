import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 w-full mt-auto relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-4 py-20 max-w-7xl mx-auto relative z-10">
        <div className="space-y-8 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="h-[45px] flex-shrink-0">
              <img 
                src="/citrix-logo.png" 
                alt="Citrix Logo" 
                className="h-full w-auto object-contain filter drop-shadow-[0_0_10px_rgba(0,204,255,0.8)]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black tracking-[-0.05em] text-white uppercase">
                CITRIX
              </span>
              <span className="text-[8px] font-bold tracking-[0.4em] text-[#00ccff] uppercase mt-1">
                COMPUTER
              </span>
            </div>
          </div>
          <p className="text-neutral-500 text-[10px] font-body uppercase tracking-[0.2em] leading-relaxed border-l-2 border-white/5 pl-6 max-w-xs md:text-left">
            The pinnacle of high-end computing solutions and professional technical services in Sri Lanka. 
            Established 2014.
          </p>
        </div>

        <div>
          <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-8">Foundry Navigation</h4>
          <ul className="space-y-4">
            <li><Link className="text-[10px] font-bold text-neutral-500 hover:text-[#00ccff] uppercase tracking-widest transition-colors" to="/hardware">Hardware Catalog</Link></li>
            <li><Link className="text-[10px] font-bold text-neutral-500 hover:text-[#00ccff] uppercase tracking-widest transition-colors" to="/workstations">Workstations</Link></li>
            <li><Link className="text-[10px] font-bold text-neutral-500 hover:text-[#00ccff] uppercase tracking-widest transition-colors" to="/deals">Foundry Drops</Link></li>
            <li><Link className="text-[10px] font-bold text-neutral-500 hover:text-[#00ccff] uppercase tracking-widest transition-colors" to="/repairs">Repair Center</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-8">Store Protocol</h4>
          <ul className="space-y-4">
            <li className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Main Street, Galle</li>
            <li><a className="text-[10px] font-bold text-neutral-500 hover:text-[#00ccff] uppercase tracking-widest transition-colors" href="https://wa.me/94789827123" target="_blank" rel="noopener noreferrer">0789827123</a></li>
            <li><a className="text-[10px] font-bold text-neutral-500 hover:text-[#00ccff] uppercase tracking-widest transition-colors" href="https://wa.me/94789827123" target="_blank" rel="noopener noreferrer">HOTLINE: 0789827123</a></li>
            <li><Link className="text-[10px] font-bold text-neutral-500 hover:text-[#00ccff] uppercase tracking-widest transition-colors" to="/contact">View on Map</Link></li>
            <li><Link className="text-[10px] font-bold text-neutral-500 hover:text-[#00ccff] uppercase tracking-widest transition-colors" to="/warranty">Warranty Policy</Link></li>
          </ul>
          {/* Small Footer Map */}
          <div className="mt-8 w-full aspect-video rounded-xl overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-500">
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
          <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-8">Support Hub</h4>
          <ul className="space-y-4 mb-8">
            <li><Link className="text-[10px] font-bold text-neutral-500 hover:text-[#00ccff] uppercase tracking-widest transition-colors" to="/payments">How to Order & Pay</Link></li>
            <li><Link className="text-[10px] font-bold text-neutral-500 hover:text-[#00ccff] uppercase tracking-widest transition-colors" to="/terms">Terms of Service</Link></li>
            <li><Link className="text-[10px] font-bold text-neutral-500 hover:text-[#00ccff] uppercase tracking-widest transition-colors" to="/privacy">Privacy Policy</Link></li>
            <li><a className="text-[10px] font-bold text-neutral-500 hover:text-[#00ccff] uppercase tracking-widest transition-colors" href="https://wa.me/94789827123" target="_blank" rel="noopener noreferrer">Contact Expert</a></li>
            <li><a className="text-[10px] font-bold text-neutral-500 hover:text-[#00ccff] uppercase tracking-widest transition-colors" href="https://wa.me/94789827123" target="_blank" rel="noopener noreferrer">Wholesale Inquiry</a></li>
          </ul>
          
          <div className="flex gap-4">
            <a href="https://wa.me/94789827123" target="_blank" rel="noopener noreferrer" className="social-icon-premium" title="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </a>
            <a href="https://www.facebook.com/share/1KCanXjNAP/" target="_blank" rel="noopener noreferrer" className="social-icon-premium" title="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@sameeraja4" target="_blank" rel="noopener noreferrer" className="social-icon-premium" title="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.53 1.53-.3 2.7-1.67 2.67-3.22.03-5.45 0-10.89.01-16.34z"/></svg>
            </a>
            <a href="mailto:computercitrix@gmail.com" className="social-icon-premium" title="Gmail">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08c1.618-1.214 3.927-.059 3.927 1.964z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-12 px-4 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <p className="text-[9px] font-bold text-neutral-700 uppercase tracking-[0.4em]">© 2024 Citrix Computer. All Rights Reserved. Designed for Performance.</p>
        <div className="flex gap-6">
          <img alt="Visa" className="h-4 opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEjN4sxGv-bzmIyCpgbeGpf5BFWKlU_QTQcfWRDTmqwXsJRwYlW-azTi8ifqPAWcwwHuxK-veauYi9J3IDh8zTYsevtPLXIiX7u5J_-jAGhkCFpU2I7bNSOIhANZTXCU2BysEF7JPWoma9hqev-aERzal9-82_XQX6QAGWGHTQYxLiOyBl4N7sjT5x1j-qfjkyFrZk-DQxhm0PFqt9aWuV9b7gjq81kcNZB15PStns3rqUlOoSqnXdtZvKNXVkkB1O83t8drAF" referrerPolicy="no-referrer" />
          <img alt="Mastercard" className="h-4 opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsTiUFg9RMts_0xIUJclERA3d7zpMZGMv7lZSCEPUd-9bVRJIzM4LfbNT_zHq243S-zGxUUxZZZGwuH-ITSyzA8GpdS4X7KnPMmWxJWPkG9AU6Fp--1xM4u_V7Lem8PzpLtJmdyd8rV65PECWE1sdxyz5uuwP3DeF4JKMdtlwPS6PdmN1e5FDiXPFxyE9HVOVHc0hgt7DiC13-rpY85lNiDqkikAktk-c4e7fXy_5m1LXaoDTfH4k3MbWsq2uZE2gewL69sNha" referrerPolicy="no-referrer" />
        </div>
      </div>
    </footer>
  );
}
