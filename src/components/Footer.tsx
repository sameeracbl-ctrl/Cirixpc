import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-100 w-full mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 py-16 max-w-screen-2xl mx-auto font-body text-sm">
        <div className="space-y-6">
          <div className="text-lg font-bold text-primary-container uppercase tracking-tighter">CITRIX COMPUTER</div>
          <p className="text-slate-500 leading-relaxed">The pinnacle of high-end computing solutions and professional technical services in Sri Lanka.</p>
          <div className="flex gap-4">
            <a className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-primary-container hover:text-white transition-all" href="#">
              <span className="material-symbols-outlined">social_leaderboard</span>
            </a>
            <a className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-primary-container hover:text-white transition-all" href="#">
              <span className="material-symbols-outlined">share</span>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-primary-container mb-6">Quick Links</h4>
          <ul className="space-y-4">
            <li><Link className="text-slate-500 hover:text-primary-container transition-colors" to="/laptops">Laptop Inventory</Link></li>
            <li><Link className="text-slate-500 hover:text-primary-container transition-colors" to="/pc-config">PC Configuration</Link></li>
            <li><Link className="text-slate-500 hover:text-primary-container transition-colors" to="/repair-tracking">Repair Tracking</Link></li>
            <li><Link className="text-slate-500 hover:text-primary-container transition-colors" to="/blog">Technical Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-primary-container mb-6">Store Info</h4>
          <ul className="space-y-4">
            <li className="text-slate-500">Main Street, Galle</li>
            <li className="text-slate-500">+94 91 222 3344</li>
            <li className="text-slate-500">Service Center: Ext 102</li>
            <li><Link className="text-slate-500 hover:text-primary-container transition-colors" to="/warranty">Warranty Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-primary-container mb-6">Support</h4>
          <ul className="space-y-4">
            <li><Link className="text-slate-500 hover:text-primary-container transition-colors" to="/terms">Terms of Service</Link></li>
            <li><Link className="text-slate-500 hover:text-primary-container transition-colors" to="/privacy">Privacy Policy</Link></li>
            <li><Link className="text-slate-500 hover:text-primary-container transition-colors" to="/contact">Contact Expert</Link></li>
            <li><Link className="text-slate-500 hover:text-primary-container transition-colors" to="/wholesale">Wholesale Inquiry</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-8 px-12 max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-400 text-xs">© 2024 Citrix Computer. All Rights Reserved.</p>
        <div className="flex gap-4">
          <img alt="Visa" className="h-6 opacity-30 grayscale hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEjN4sxGv-bzmIyCpgbeGpf5BFWKlU_QTQcfWRDTmqwXsJRwYlW-azTi8ifqPAWcwwHuxK-veauYi9J3IDh8zTYsevtPLXIiX7u5J_-jAGhkCFpU2I7bNSOIhANZTXCU2BysEF7JPWoma9hqev-aERzal9-82_XQX6QAGWGHTQYxLiOyBl4N7sjT5x1j-qfjkyFrZk-DQxhm0PFqt9aWuV9b7gjq81kcNZB15PStns3rqUlOoSqnXdtZvKNXVkkB1O83t8drAF" referrerPolicy="no-referrer" />
          <img alt="Mastercard" className="h-6 opacity-30 grayscale hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsTiUFg9RMts_0xIUJclERA3d7zpMZGMv7lZSCEPUd-9bVRJIzM4LfbNT_zHq243S-zGxUUxZZZGwuH-ITSyzA8GpdS4X7KnPMmWxJWPkG9AU6Fp--1xM4u_V7Lem8PzpLtJmdyd8rV65PECWE1sdxyz5uuwP3DeF4JKMdtlwPS6PdmN1e5FDiXPFxyE9HVOVHc0hgt7DiC13-rpY85lNiDqkikAktk-c4e7fXy_5m1LXaoDTfH4k3MbWsq2uZE2gewL69sNha" referrerPolicy="no-referrer" />
        </div>
      </div>
    </footer>
  );
}
