import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Mail, Lock, Loader2, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth } from '../firebase';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  User as FirebaseUser 
} from 'firebase/auth';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Auth States
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState('');

  // Handle Auth State Change
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

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

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Service', path: '/service' },
    { name: 'Category', path: '/category' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      setError('Authentication system is currently offline.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      if (authMode === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setActiveTab(null);
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
    } catch (err: any) {
      console.error("Logout Error:", err.message);
    }
  };

  return (
    <>
      {/* CRITICAL: "fixed top-0 left-0 w-full" 
          This keeps the navbar pinned to the top while scrolling.
      */}
      <header 
        className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 ${
          scrolled 
            ? 'bg-[#0a0a0a]/90 backdrop-blur-md py-3 shadow-2xl border-b border-[#00ccff]/30' 
            : 'bg-[#0a0a0a] py-5 border-b border-white/5'
        }`}
      >
        <div className="w-full px-4 md:px-12 mx-auto flex items-center justify-between">
          
          {/* BRANDING */}
          <Link to="/" className="flex items-center gap-4 group shrink-0">
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

          {/* RIGHT SIDE: NAV + ACTIONS */}
          <div className="flex items-center gap-8">
            {/* NAVIGATION LINKS */}
            <nav className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className="text-[11px] font-bold text-neutral-500 hover:text-[#00ccff] transition-all uppercase tracking-[0.3em] relative group/link"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00ccff] shadow-[0_0_10px_#00ccff] transition-all group-hover/link:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* SEARCH & ACTIONS */}
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
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleLogout}
                    className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setActiveTab('account')}
                  className="flex items-center gap-2 group p-1 pr-4 rounded-full bg-white/5 border border-white/10 hover:border-[#00ccff]/50 transition-all"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#00ccff] rounded-full flex items-center justify-center text-black shadow-[0_0_15px_rgba(0,204,255,0.4)]">
                    <User size={20} />
                  </div>
                  <span className="hidden sm:block text-[11px] text-white font-black uppercase tracking-tighter">LOGIN</span>
                </button>
              )}

              <button 
                onClick={() => setActiveTab('cart')}
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

      {/* IMPORTANT: This spacer prevents the content from being hidden 
          behind the fixed navbar when the page loads. 
      */}
      <div className="h-24 md:h-32 w-full"></div>

      {/* --- ACCOUNT MODAL --- */}
      <AnimatePresence>
        {activeTab === 'account' && (
          <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md" 
              onClick={() => setActiveTab(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-10 shadow-[0_0_50px_rgba(0,204,255,0.1)] overflow-hidden"
            >
              {/* Subtle Cyan Glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00ccff]/5 blur-[120px] rounded-full" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#00ccff]/5 blur-[120px] rounded-full" />
              
              <div className="relative z-10">
                <div className="flex flex-col items-center mb-10">
                  <div className="h-[45px] mb-6 relative">
                    <img 
                      src="/citrix-logo.png" 
                      className="h-full w-auto object-contain filter drop-shadow-[0_0_15px_rgba(0,204,255,0.8)]"
                      alt="Citrix" 
                    />
                  </div>
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">
                    {authMode === 'login' ? 'Welcome' : 'Join'} <span className="text-[#00ccff]">{authMode === 'login' ? 'Back' : 'Foundry'}</span>
                  </h2>
                  <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.4em]">
                    {authMode === 'login' ? 'Access your hardware portal' : 'Initialize your account'}
                  </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-5">
                  <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-[#00ccff] transition-colors">
                      <Mail size={20} />
                    </div>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="EMAIL ADDRESS" 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4.5 pl-14 pr-6 text-white text-sm focus:outline-none focus:border-[#00ccff]/50 focus:bg-white/[0.05] transition-all placeholder:text-neutral-800 font-bold tracking-wider"
                    />
                  </div>
                  <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-[#00ccff] transition-colors">
                      <Lock size={20} />
                    </div>
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="PASSWORD" 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4.5 pl-14 pr-6 text-white text-sm focus:outline-none focus:border-[#00ccff]/50 focus:bg-white/[0.05] transition-all placeholder:text-neutral-800 font-bold tracking-wider"
                    />
                  </div>

                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-[10px] font-bold uppercase tracking-wider text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20"
                    >
                      {error}
                    </motion.p>
                  )}

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-5 bg-[#00ccff] text-black rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-[#00ccff] hover:shadow-[0_0_40px_rgba(0,204,255,0.6)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98] group/btn"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={22} /> : (
                      <>
                        <span className="group-hover/btn:scale-110 transition-transform duration-300">
                          {authMode === 'login' ? 'Login' : 'Create Account'}
                        </span>
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-8 flex flex-col items-center gap-4">
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
                    {authMode === 'login' ? "New to Citrix?" : "Already a member?"} 
                    <button 
                      onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                      className="text-[#00ccff] hover:text-white ml-2 transition-colors underline underline-offset-4"
                    >
                      {authMode === 'login' ? 'Initialize Account' : 'Access Portal'}
                    </button>
                  </p>
                  <button 
                    onClick={() => setActiveTab(null)}
                    className="text-[10px] text-neutral-700 hover:text-white font-bold uppercase tracking-[0.3em] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- CART SIDEBAR (CLOSE LOGIC FIXED) --- */}
      {activeTab === 'cart' && (
        <div className="fixed inset-0 z-[1000] flex justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActiveTab(null)}></div>
          <div className="relative w-full max-w-sm bg-[#0a0a0a] border-l border-white/5 h-full p-8 shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-xl font-black text-white uppercase italic tracking-widest">Shopping <span className="text-[#00ccff]">Cart</span></h2>
              {/* CLOSE BUTTON */}
              <button onClick={() => setActiveTab(null)} className="text-white hover:text-red-500 transition-colors">
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