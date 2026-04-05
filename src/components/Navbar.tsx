import React, { useState, useEffect, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import SearchSuggestions from './SearchSuggestions';
import { searchProducts, Product } from '../constants/inventory';

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();
  const { cart, itemCount, total, updateQuantity, removeFromCart } = useCart();
  const [cartPulse, setCartPulse] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Auth State
  const [userView, setUserView] = useState<'initial' | 'login' | 'signup' | 'profile' | 'success'>('initial');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    password: ''
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const results = searchProducts(searchQuery);
      setSuggestions(results.slice(0, 8));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSuggestionSelect = (product: Product) => {
    setSearchQuery(product.model || product.name || '');
    setShowSuggestions(false);
    setIsSearchOpen(false);
    navigate(`/category/all/new`);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('citrix_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setUserView('profile');
    }
  }, []);

  useEffect(() => {
    if (itemCount > 0) {
      setCartPulse(true);
      const timer = setTimeout(() => setCartPulse(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    // Mock Signup
    const newUser = { ...formData, id: Date.now(), builds: [] };
    localStorage.setItem('citrix_user', JSON.stringify(newUser));
    setUserView('success');
    setTimeout(() => {
      setCurrentUser(newUser);
      setUserView('profile');
    }, 2000);
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const savedUser = localStorage.getItem('citrix_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.email === formData.email && user.password === formData.password) {
        setCurrentUser(user);
        setUserView('profile');
      } else {
        alert('Invalid credentials (Mock Auth)');
      }
    } else {
      alert('No user found. Please create an account.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserView('initial');
    // We keep the user in localStorage for mock persistence, but "log out" the session
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    if (!location.pathname.includes('/category')) {
      navigate('/category/all/new'); // Redirect to global search results
    }
  };

  const checkoutViaWhatsApp = () => {
    const cartList = cart.map(item => `• ${item.title} (${item.quantity}x) - ${item.price}`).join('\n');
    const message = `*CITRIX COMPUTER - NEW ORDER*\n------------------------------------------\n${cartList}\n------------------------------------------\n*TOTAL:* LKR ${total.toLocaleString()}\n------------------------------------------\nPlease confirm availability and payment details.`;
    window.open(`https://wa.me/94789827123?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      <header className="sticky top-0 z-[60] bg-surface/80 backdrop-blur-[15px] overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] animate-scroll-slow" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
        </div>

        <nav className="relative flex items-center w-full px-4 md:px-12 py-4 max-w-screen-2xl mx-auto font-headline">
          <div className="flex-1 flex justify-start">
            <Link to="/" className="flex items-center gap-3 md:gap-5 group whitespace-nowrap">
              <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,242,255,0.9)]">
                  <path 
                     d="M80 20 C60 5 30 5 15 30 C0 55 5 85 35 95 C55 100 80 90 90 70" 
                     fill="none" 
                     stroke="url(#neonGradientLogo)" 
                     strokeWidth="10" 
                     strokeLinecap="round"
                     className="animate-pulse"
                  />
                  <path d="M35 40 L55 40 M35 60 L65 60" stroke="#00f2ff" strokeWidth="5" strokeLinecap="round" className="animate-pulse" />
                  <defs>
                    <linearGradient id="neonGradientLogo" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00f2ff" />
                      <stop offset="100%" stopColor="#0066ff" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl md:text-3xl font-black tracking-[-0.05em] text-primary neon-glow-cyan-intense uppercase">
                  CITRIX
                </span>
                <span className="text-[10px] md:text-[12px] font-bold tracking-[0.4em] text-secondary/80 neon-glow-blue uppercase mt-1">
                  COMPUTER
                </span>
              </div>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center justify-center gap-10">
            {['HOME', 'HARDWARE', 'REPAIRS', 'WORKSTATIONS', 'DEALS'].map((item) => {
              const path = item === 'HOME' ? '/' : `/${item.toLowerCase()}`;
              const isActive = location.pathname === path;
              return (
                <Link 
                  key={item}
                  to={path} 
                  className={`group relative text-sm xl:text-base font-black tracking-[0.3em] transition-all duration-300 px-2 py-3 ${
                    isActive ? 'text-white neon-glow-cyan-intense' : 'text-primary/40 hover:text-white hover:neon-glow-cyan-intense'
                  }`}
                >
                  {item}
                  {/* Expanding Underline Effect */}
                  <span className={`absolute bottom-0 left-1/2 w-0 h-[2px] bg-primary shadow-[0_0_20px_rgba(0,242,255,1)] transition-all duration-300 group-hover:w-full group-hover:left-0 ${isActive ? 'w-full left-0' : ''}`} />
                </Link>
              );
            })}
          </div>

          <div className="flex-1 flex items-center justify-end gap-4 md:gap-8">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-primary/60 hover:text-primary transition-all hover:neon-glow-cyan"
            >
              <span className="material-symbols-outlined text-[32px] icon-enhanced">menu</span>
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-primary/60 hover:text-primary transition-all hover:neon-glow-cyan"
            >
              <span className="material-symbols-outlined text-[28px] md:text-[32px] icon-enhanced">search</span>
            </button>
            <button 
              onClick={() => setIsUserOpen(true)}
              className="text-primary/60 hover:text-primary transition-all hover:neon-glow-cyan"
            >
              <span className="material-symbols-outlined text-[28px] md:text-[32px] icon-enhanced">person</span>
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className={`text-primary/60 hover:text-primary transition-all hover:neon-glow-cyan relative ${cartPulse ? 'animate-bounce-neon' : ''}`}
            >
              <span className="material-symbols-outlined text-[28px] md:text-[32px] icon-enhanced">shopping_cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-[0_0_15px_rgba(0,102,255,0.8)]">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* Dynamic Glowing Separation Line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary/20 overflow-hidden">
          <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-1/3 h-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(0,242,255,0.8)]"
          />
          <div className="absolute inset-0 bg-primary/10 animate-pulse" />
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[100] bg-surface/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-full max-w-xs z-[110] bg-surface-container/80 backdrop-blur-3xl border-r border-primary/20 p-8 flex flex-col shadow-[20px_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex justify-between items-center mb-16">
                <span className="text-primary text-[10px] font-black tracking-[0.4em] uppercase">Navigation Protocol</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-primary/40 hover:text-primary transition-all">
                  <span className="material-symbols-outlined text-[32px] icon-enhanced">close</span>
                </button>
              </div>

              <div className="flex flex-col gap-8">
                {['HOME', 'HARDWARE', 'REPAIRS', 'WORKSTATIONS', 'DEALS'].map((item) => {
                  const path = item === 'HOME' ? '/' : `/${item.toLowerCase()}`;
                  const isActive = location.pathname === path;
                  return (
                    <Link 
                      key={item}
                      to={path} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-2xl font-black tracking-[0.2em] font-headline uppercase transition-all duration-300 ${
                        isActive ? 'text-primary neon-glow-cyan' : 'text-white/40 hover:text-primary hover:neon-glow-cyan'
                      }`}
                    >
                      {item}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto pt-12 border-t border-primary/10">
                <p className="text-[9px] font-bold text-primary/20 uppercase tracking-[0.4em] mb-4">Citrix Computer Hub</p>
                <div className="flex gap-4">
                  <a href="#" className="text-primary/40 hover:text-primary transition-all hover:scale-110"><span className="material-symbols-outlined text-[24px] icon-enhanced">facebook</span></a>
                  <a href="#" className="text-primary/40 hover:text-primary transition-all hover:scale-110"><span className="material-symbols-outlined text-[24px] icon-enhanced">instagram</span></a>
                  <a href="#" className="text-primary/40 hover:text-primary transition-all hover:scale-110"><span className="material-symbols-outlined text-[24px] icon-enhanced">chat</span></a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-surface/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 text-primary/40 hover:text-primary transition-all"
            >
              <span className="material-symbols-outlined text-[40px] icon-enhanced">close</span>
            </button>
            <div className="w-full max-w-3xl">
              <div className="mb-12 text-center">
                <span className="text-primary text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">Foundry Search Protocol</span>
                <h2 className="font-headline text-3xl md:text-5xl font-black text-white uppercase tracking-tighter neon-glow-cyan">Find Your Hardware</h2>
              </div>
              <div className="relative">
                <form onSubmit={handleSearchSubmit} className="relative group">
                  <div className="absolute inset-0 bg-primary/5 blur-xl group-hover:bg-primary/10 transition-all rounded-sm" />
                  <div className="relative flex items-center bg-surface-container/40 backdrop-blur-3xl border border-primary/20 p-2 md:p-4 rounded-sm group-hover:border-primary/50 transition-all shadow-[0_0_30px_rgba(0,242,255,0.05)]">
                    <span className="material-symbols-outlined ml-4 md:ml-6 text-primary neon-glow-cyan text-[28px] md:text-[32px] icon-enhanced">search</span>
                    <input 
                      autoFocus
                      type="text"
                      placeholder="SEARCH INVENTORY (e.g. H81, RTX 4060, RYZEN 5)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                      className="w-full bg-transparent p-4 md:p-6 text-lg md:text-2xl font-bold text-white placeholder:text-primary/20 focus:outline-none transition-all"
                    />
                    <button 
                      type="submit" 
                      className="material-symbols-outlined mr-4 md:mr-6 text-primary/40 text-[28px] md:text-[32px] hover:text-primary transition-all icon-enhanced"
                    >
                      terminal
                    </button>
                  </div>
                </form>
                
                <SearchSuggestions 
                  suggestions={suggestions} 
                  onSelect={handleSuggestionSelect}
                  isVisible={showSuggestions}
                />
              </div>
              
              <div className="mt-12 flex flex-wrap gap-4 justify-center">
                {['H81', 'RTX 4060', 'RYZEN 5', 'DDR4', 'SSD', 'PSU'].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      setIsSearchOpen(false);
                      if (!location.pathname.includes('/category')) {
                        navigate('/category/processors/all');
                      }
                    }}
                    className="px-4 md:px-6 py-2 border border-primary/10 text-[9px] md:text-[10px] font-bold text-primary/40 uppercase tracking-widest hover:border-primary hover:text-primary transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Drawer (The Foundry Hub) */}
      <AnimatePresence>
        {isUserOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsUserOpen(false)}
              className="fixed inset-0 z-[100] bg-surface/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md z-[110] bg-surface-container/80 backdrop-blur-3xl border-l border-primary/20 p-6 md:p-12 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex justify-between items-center mb-12 md:mb-16">
                <div>
                  <span className="text-primary text-[10px] font-black tracking-[0.4em] uppercase mb-2 block">
                    {userView === 'profile' ? 'Foundry Profile' : 'Foundry Hub v1.0'}
                  </span>
                  <h2 className="font-headline text-2xl md:text-4xl font-black text-white uppercase tracking-tighter neon-glow-cyan">
                    {userView === 'profile' ? currentUser?.name : 'User Access'}
                  </h2>
                </div>
                <button 
                  onClick={() => {
                    setIsUserOpen(false);
                    if (userView !== 'profile') setUserView('initial');
                  }} 
                  className="text-primary/40 hover:text-primary transition-all"
                >
                  <span className="material-symbols-outlined text-[32px] icon-enhanced">close</span>
                </button>
              </div>

              <div className="space-y-8 flex-grow overflow-y-auto no-scrollbar">
                <AnimatePresence mode="wait">
                  {userView === 'initial' && (
                    <motion.div 
                      key="initial"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <button 
                        onClick={() => setUserView('login')}
                        className="w-full py-4 bg-primary text-surface font-black uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(0,242,255,0.4)] hover:brightness-110 transition-all"
                      >
                        Login to Foundry
                      </button>
                      <button 
                        onClick={() => setUserView('signup')}
                        className="w-full py-4 border border-primary/30 text-primary font-black uppercase tracking-widest text-[10px] hover:bg-primary/10 transition-all"
                      >
                        Create New Account
                      </button>
                    </motion.div>
                  )}

                  {userView === 'login' && (
                    <motion.form 
                      key="login"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleLogin}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-primary/60 uppercase tracking-widest ml-1">Email Address</label>
                        <input 
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-surface/40 border border-primary/20 p-4 text-xs font-bold text-white focus:outline-none focus:border-primary transition-all rounded-sm"
                          placeholder="ENTER EMAIL"
                        />
                      </div>
                      <div className="space-y-2 relative">
                        <label className="text-[9px] font-black text-primary/60 uppercase tracking-widest ml-1">Password</label>
                        <input 
                          required
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          className="w-full bg-surface/40 border border-primary/20 p-4 text-xs font-bold text-white focus:outline-none focus:border-primary transition-all rounded-sm"
                          placeholder="ENTER PASSWORD"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-[38px] text-primary/40 hover:text-primary transition-all"
                        >
                          <span className="material-symbols-outlined text-[20px] icon-enhanced">{showPassword ? 'visibility_off' : 'visibility'}</span>
                        </button>
                      </div>
                      <button type="submit" className="w-full py-4 bg-primary text-surface font-black uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(0,242,255,0.4)]">
                        Initialize Login
                      </button>
                      <button 
                        type="button"
                        onClick={() => setUserView('initial')}
                        className="w-full text-[9px] font-black text-primary/40 uppercase tracking-widest hover:text-primary transition-colors"
                      >
                        Back to Selection
                      </button>
                    </motion.form>
                  )}

                  {userView === 'signup' && (
                    <motion.form 
                      key="signup"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleSignup}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-primary/60 uppercase tracking-widest ml-1">Full Name</label>
                        <input 
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-surface/40 border border-primary/20 p-4 text-xs font-bold text-white focus:outline-none focus:border-primary transition-all rounded-sm"
                          placeholder="ENTER FULL NAME"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-primary/60 uppercase tracking-widest ml-1">Email Address</label>
                        <input 
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-surface/40 border border-primary/20 p-4 text-xs font-bold text-white focus:outline-none focus:border-primary transition-all rounded-sm"
                          placeholder="ENTER EMAIL"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-primary/60 uppercase tracking-widest ml-1">WhatsApp Number</label>
                        <div className="relative">
                          <input 
                            required
                            type="tel"
                            value={formData.whatsapp}
                            onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                            className="w-full bg-surface/40 border border-primary/20 p-4 text-xs font-bold text-white focus:outline-none focus:border-primary transition-all rounded-sm"
                            placeholder="+94 7X XXX XXXX"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] font-black text-primary/40 uppercase tracking-widest">Verify via WA</span>
                        </div>
                      </div>
                      <div className="space-y-2 relative">
                        <label className="text-[9px] font-black text-primary/60 uppercase tracking-widest ml-1">Password</label>
                        <input 
                          required
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          className="w-full bg-surface/40 border border-primary/20 p-4 text-xs font-bold text-white focus:outline-none focus:border-primary transition-all rounded-sm"
                          placeholder="CREATE PASSWORD"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-[38px] text-primary/40 hover:text-primary transition-all"
                        >
                          <span className="material-symbols-outlined text-[20px] icon-enhanced">{showPassword ? 'visibility_off' : 'visibility'}</span>
                        </button>
                      </div>
                      <button type="submit" className="w-full py-4 bg-primary text-surface font-black uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(0,242,255,0.4)]">
                        Create Account
                      </button>
                      <button 
                        type="button"
                        onClick={() => setUserView('initial')}
                        className="w-full text-[9px] font-black text-primary/40 uppercase tracking-widest hover:text-primary transition-colors"
                      >
                        Back to Selection
                      </button>
                    </motion.form>
                  )}

                  {userView === 'success' && (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center py-12"
                    >
                      <div className="w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', damping: 12 }}
                          className="material-symbols-outlined text-6xl text-green-500 icon-enhanced"
                        >
                          check
                        </motion.span>
                      </div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4 neon-glow-cyan">Account Verified</h3>
                      <p className="text-[10px] text-primary/60 uppercase tracking-widest leading-relaxed">
                        Welcome to the Citrix Foundry. <br/>
                        Initializing your personalized hub...
                      </p>
                    </motion.div>
                  )}

                  {userView === 'profile' && (
                    <motion.div 
                      key="profile"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-8"
                    >
                      {/* User Info Card */}
                      <div className="p-6 bg-surface/40 border border-primary/20 rounded-sm shadow-[inset_0_0_20px_rgba(0,242,255,0.05)]">
                        <div className="space-y-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                              <span className="material-symbols-outlined text-primary text-xl icon-enhanced">person</span>
                            </div>
                            <div>
                              <span className="text-[8px] font-black text-primary/40 uppercase tracking-[0.3em] block mb-1">Full Identity</span>
                              <p className="text-sm font-bold text-white uppercase tracking-tight">{currentUser?.name}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                              <span className="material-symbols-outlined text-primary text-xl icon-enhanced">alternate_email</span>
                            </div>
                            <div>
                              <span className="text-[8px] font-black text-primary/40 uppercase tracking-[0.3em] block mb-1">Email Protocol</span>
                              <p className="text-xs font-bold text-primary/80">{currentUser?.email}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center">
                              <span className="material-symbols-outlined text-[#25D366] text-xl icon-enhanced">chat</span>
                            </div>
                            <div>
                              <span className="text-[8px] font-black text-primary/40 uppercase tracking-[0.3em] block mb-1">WhatsApp Link</span>
                              <p className="text-xs font-bold text-primary/80">{currentUser?.whatsapp}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-surface/40 border border-primary/10 rounded-sm">
                        <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-6">My Saved Builds</h3>
                        <div className="space-y-4">
                          {currentUser?.builds?.length > 0 ? (
                            currentUser.builds.map((build: any, idx: number) => (
                              <div key={idx} className="p-4 border border-primary/5 bg-surface-container/40 flex justify-between items-center">
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">{build.name}</span>
                                <span className="text-[9px] font-black text-primary">{build.price}</span>
                              </div>
                            ))
                          ) : (
                            <div className="py-8 text-center border border-dashed border-primary/10 opacity-30">
                              <span className="material-symbols-outlined text-3xl mb-2 icon-enhanced">construction</span>
                              <p className="text-[9px] font-bold uppercase tracking-widest">No Saved Builds Found</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <button className="w-full py-4 border border-primary/30 text-primary font-black uppercase tracking-widest text-[10px] hover:bg-primary/10 transition-all flex items-center justify-center gap-3">
                          <span className="material-symbols-outlined text-sm icon-enhanced">notifications</span>
                          Receive Order Updates on WhatsApp
                        </button>
                        <button 
                          onClick={handleLogout}
                          className="w-full py-4 border border-red-500/30 text-red-500 font-black uppercase tracking-widest text-[10px] hover:bg-red-500/10 transition-all"
                        >
                          Logout from Foundry
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-12 border-t border-primary/10">
                  <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-6">Official Community</h3>
                  <p className="text-[11px] text-primary/40 uppercase tracking-widest leading-relaxed mb-8">
                    Join our verified PC builders community for exclusive stock updates and technical support.
                  </p>
                  <a 
                    href="https://chat.whatsapp.com/your-group-link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-[#25D366] text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:brightness-110 transition-all"
                  >
                    <span className="material-symbols-outlined text-2xl icon-enhanced">groups</span>
                    Join WhatsApp Community
                  </a>
                </div>
              </div>

              <div className="mt-auto pt-12 border-t border-primary/10 text-center">
                <p className="text-[9px] font-bold text-primary/20 uppercase tracking-[0.4em]">Home of Citrix PC | Established 2014</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Shopping Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-[100] bg-surface/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md z-[110] bg-surface-container/80 backdrop-blur-3xl border-l border-primary/20 p-6 md:p-12 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex justify-between items-center mb-12 md:mb-16">
                <div>
                  <span className="text-primary text-[10px] font-black tracking-[0.4em] uppercase mb-2 block">Inventory Manifest</span>
                  <h2 className="font-headline text-2xl md:text-4xl font-black text-white uppercase tracking-tighter neon-glow-cyan">Your Cart</h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="text-primary/40 hover:text-primary transition-all">
                  <span className="material-symbols-outlined text-[32px] icon-enhanced">close</span>
                </button>
              </div>

              <div className="flex-grow overflow-y-auto no-scrollbar pr-2 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                    <span className="material-icons text-8xl mb-6">shopping_basket</span>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em]">Cart is Empty</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 md:gap-6 p-4 bg-surface/40 border border-primary/10 rounded-sm group hover:border-primary/30 transition-all">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-surface-container rounded-sm overflow-hidden border border-primary/10">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-grow">
                        <span className="text-[8px] font-bold text-primary/50 uppercase tracking-[0.2em] mb-1 block">{item.category}</span>
                        <h4 className="text-[10px] md:text-[11px] font-black text-white uppercase tracking-tight mb-3 line-clamp-1">{item.title}</h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 md:gap-3">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center border border-primary/20 text-primary hover:bg-primary/10 transition-all"
                            >
                              <span className="material-symbols-outlined text-[16px] icon-enhanced">remove</span>
                            </button>
                            <span className="text-xs font-bold text-white">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center border border-primary/20 text-primary hover:bg-primary/10 transition-all"
                            >
                              <span className="material-symbols-outlined text-[16px] icon-enhanced">add</span>
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] md:text-xs font-black text-primary">{item.price}</div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-[8px] font-bold text-red-500/50 hover:text-red-500 uppercase tracking-widest mt-1"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="mt-auto pt-12 border-t border-primary/10">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em]">Subtotal Manifest</span>
                    <span className="text-xl md:text-2xl font-black text-primary neon-glow-cyan">LKR {total.toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/checkout');
                    }}
                    className="w-full py-4 md:py-5 bg-primary text-surface font-black uppercase tracking-widest text-[10px] md:text-[11px] flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,242,255,0.4)] hover:brightness-110 transition-all group"
                  >
                    <span className="material-symbols-outlined text-2xl icon-enhanced group-hover:scale-110 transition-transform">shopping_cart_checkout</span>
                    Proceed to Checkout
                  </button>
                  <p className="text-center mt-6 text-[8px] font-bold text-primary/20 uppercase tracking-[0.2em]">Secure Order Protocol via Citrix WhatsApp</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Group Button */}
      <motion.a
        href="https://chat.whatsapp.com/your-group-link"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-[50] w-12 h-12 md:w-14 md:h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.5)] group"
      >
        <span className="material-symbols-outlined text-2xl md:text-3xl group-hover:rotate-12 transition-transform icon-enhanced">groups</span>
        <div className="absolute left-full ml-4 px-4 py-2 bg-surface-container/80 backdrop-blur-md border border-[#25D366]/30 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden md:block">
          <span className="text-[10px] font-black text-[#25D366] uppercase tracking-widest">Join PC Builders Group</span>
        </div>
      </motion.a>
    </>
  );
}
