import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Mail, Lock, Loader2, LogOut, MapPin, Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Escape Key for Modals
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsAboutModalOpen(false);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Service', path: '/repairs' },
    { name: 'Category', path: '/category' },
    { name: 'About Us', onClick: () => setIsAboutModalOpen(true) },
    { name: 'Contact Us', path: '/contact' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err: any) {
      console.error("Logout Error:", err.message);
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 ${
          scrolled 
            ? 'bg-[#0a0a0a]/90 backdrop-blur-md py-3 shadow-2xl border-b border-[#00ccff]/30' 
            : 'bg-[#0a0a0a] py-5 border-b border-white/5'
        }`}
      >
        <div className="w-full px-4 md:px-12 mx-auto flex items-center justify-between max-md:flex-col max-md:gap-4">
          <Link to="/" className="flex items-center gap-4 group shrink-0 max-md:mx-auto">
            <div className="relative h-16 flex items-center justify-center">
              <img 
                src="/citrix-logo.png" 
                className="h-full w-auto object-contain filter drop-shadow-[0_0_10px_rgba(0,204,255,0.7)]"
                alt="Citrix" 
              />
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap font-rajdhani">
              <span className="text-2xl md:text-4xl font-bold text-white uppercase tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">CITRIX</span>
              <span className="text-2xl md:text-4xl font-bold text-[#00ccff] uppercase tracking-tight drop-shadow-[0_0_12px_rgba(0,204,255,0.6)]">COMPUTER</span>
            </div>
          </Link>

          <div className="flex items-center gap-8">
            <nav className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => (
                item.onClick ? (
                  <button 
                    key={item.name} 
                    onClick={item.onClick}
                    className="text-[11px] font-bold text-neutral-500 hover:text-[#00ccff] transition-all uppercase tracking-[0.3em] relative group/link cursor-pointer"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00ccff] shadow-[0_0_10px_#00ccff] transition-all group-hover/link:w-full"></span>
                  </button>
                ) : (
                  <Link 
                    key={item.name} 
                    to={item.path!} 
                    className="text-[11px] font-bold text-neutral-500 hover:text-[#00ccff] transition-all uppercase tracking-[0.3em] relative group/link"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00ccff] shadow-[0_0_10px_#00ccff] transition-all group-hover/link:w-full"></span>
                  </Link>
                )
              ))}
            </nav>

            <div className="flex items-center gap-4 md:gap-6">
              <div className="hidden xl:flex relative group">
                <input 
                  type="text" 
                  placeholder="SEARCH..." 
                  className="bg-white/5 border border-white/10 text-white text-[10px] font-bold tracking-widest rounded-full py-2 px-5 w-40 focus:w-64 focus:outline-none focus:border-[#00ccff]/50 focus:bg-black transition-all" 
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-[#00ccff]" size={14} />
              </div>

              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-[#00ccff]/30">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#00ccff] flex items-center justify-center text-black font-black text-xs">
                          {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                        </div>
                      )}
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-[10px] font-black text-white uppercase tracking-tighter leading-none">{user.displayName || 'Protocol User'}</p>
                      <p className="text-[8px] text-primary/60 uppercase tracking-widest mt-1">Verified</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all group"
                    title="Logout"
                  >
                    <LogOut size={18} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="flex items-center gap-2 group p-1 pr-4 rounded-full bg-white/5 border border-white/10 hover:border-[#00ccff]/50 transition-all"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#00ccff] rounded-full flex items-center justify-center text-black shadow-[0_0_15px_rgba(0,204,255,0.4)]">
                    <User size={20} />
                  </div>
                  <span className="hidden sm:block text-[11px] text-white font-black uppercase tracking-tighter">LOGIN</span>
                </Link>
              )}

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 md:p-3 bg-white/5 border border-white/10 rounded-full hover:border-[#00ccff]/50 transition-all"
              >
                <ShoppingCart size={20} className="text-white" />
                <span className="absolute -top-1 -right-1 bg-[#00ccff] text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">0</span>
              </button>

              <button className="lg:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="h-24 md:h-32 w-full"></div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[1000] bg-[#0a0a0a] flex flex-col p-8 pt-24 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              {menuItems.map((item) => (
                item.onClick ? (
                  <button 
                    key={item.name} 
                    onClick={() => {
                      item.onClick!();
                      setIsMenuOpen(false);
                    }}
                    className="text-2xl font-bold text-white uppercase tracking-widest text-left"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link 
                    key={item.name} 
                    to={item.path!} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-bold text-white uppercase tracking-widest"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
            
            <div className="mt-auto pt-10 border-t border-white/5">
              <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.4em] mb-4">Search Portal</p>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="SEARCH..." 
                  className="w-full bg-white/5 border border-white/10 text-white text-xs font-bold tracking-widest rounded-xl py-4 px-6 focus:outline-none focus:border-[#00ccff]/50 transition-all" 
                />
                <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAboutModalOpen && (
          <div className="fixed inset-0 z-[1002] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
              onClick={() => setIsAboutModalOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-slate-950/90 border border-[#00ccff]/30 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_50px_rgba(0,204,255,0.15)] backdrop-blur-xl overflow-hidden"
            >
              <button 
                onClick={() => setIsAboutModalOpen(false)}
                className="absolute top-6 right-6 text-neutral-500 hover:text-[#00ccff] transition-colors p-2 hover:bg-white/5 rounded-full z-20"
                aria-label="Close Modal"
              >
                <X size={24} />
              </button>

              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00ccff]/10 blur-[100px] rounded-full" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#00ccff]/10 blur-[100px] rounded-full" />
              
              <div className="relative z-10">
                <div className="text-center mb-10">
                  <div className="flex items-center justify-center gap-3 mb-4 font-rajdhani">
                    <span className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">CITRIX</span>
                    <span className="text-3xl md:text-5xl font-bold text-[#00ccff] uppercase tracking-tight drop-shadow-[0_0_12px_rgba(0,204,255,0.6)]">COMPUTER</span>
                  </div>
                  <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#00ccff] to-transparent mx-auto" />
                </div>

                <div className="space-y-8">
                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-[#00ccff]/10 border border-[#00ccff]/20 flex items-center justify-center shrink-0 group-hover:bg-[#00ccff]/20 transition-all duration-300">
                      <MapPin className="text-[#00ccff]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] mb-1">Location</h4>
                      <p className="text-white font-bold tracking-wide">Main Street, Galle, Sri Lanka</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-[#00ccff]/10 border border-[#00ccff]/20 flex items-center justify-center shrink-0 group-hover:bg-[#00ccff]/20 transition-all duration-300">
                      <Phone className="text-[#00ccff]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] mb-1">Direct Line</h4>
                      <a href="tel:0789827123" className="text-white font-bold tracking-wide hover:text-[#00ccff] transition-colors">0789827123</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-[#00ccff]/10 border border-[#00ccff]/20 flex items-center justify-center shrink-0 group-hover:bg-[#00ccff]/20 transition-all duration-300">
                      <Mail className="text-[#00ccff]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] mb-1">Electronic Mail</h4>
                      <a href="mailto:computercitrix@gmail.com" className="text-white font-bold tracking-wide hover:text-[#00ccff] transition-colors break-all">computercitrix@gmail.com</a>
                    </div>
                  </div>

                  <div className="pt-4">
                    <a 
                      href="https://wa.me/94789827123" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-5 bg-[#00ccff] text-black rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-[#00ccff] hover:shadow-[0_0_40px_rgba(0,204,255,0.6)] transition-all duration-300 flex items-center justify-center gap-3 group/wa active:scale-[0.98]"
                    >
                      <MessageCircle size={22} className="group-hover/wa:scale-110 transition-transform" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>

                <p className="mt-10 text-center text-[9px] font-bold text-neutral-600 uppercase tracking-[0.5em]">
                  Established 2014 • High-End Hardware Foundry
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {isCartOpen && (
        <div className="fixed inset-0 z-[1000] flex justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-sm bg-[#0a0a0a] border-l border-white/5 h-full p-8 shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-xl font-black text-white uppercase italic tracking-widest">Shopping <span className="text-[#00ccff]">Cart</span></h2>
              <button onClick={() => setIsCartOpen(false)} className="text-white hover:text-red-500 transition-colors">
                <X size={30} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <p className="text-neutral-500 font-bold italic">Empty cart.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
