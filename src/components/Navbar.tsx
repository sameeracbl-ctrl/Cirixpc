import React, { useState, useEffect, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';

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
      <header className="glass-nav sticky top-0 z-[60]">
        <nav className="flex justify-between items-center w-full px-4 md:px-12 py-4 max-w-screen-2xl mx-auto font-headline tracking-tight">
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(0,242,255,0.8)]">
                <path 
                  d="M80 20 C60 5 30 5 15 30 C0 55 5 85 35 95 C55 100 80 90 90 70" 
                  fill="none" 
                  stroke="url(#neonGradient)" 
                  strokeWidth="8" 
                  strokeLinecap="round"
                  className="animate-pulse"
                />
                <path d="M30 40 L50 40 M30 60 L60 60" stroke="#00f2ff" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
                <defs>
                  <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f2ff" />
                    <stop offset="100%" stopColor="#0066ff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="text-sm md:text-xl font-black tracking-tighter text-primary neon-glow-cyan uppercase line-clamp-1">
              CITRIX COMPUTER
            </span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8">
            {['HOME', 'HARDWARE', 'REPAIRS', 'WORKSTATIONS', 'DEALS'].map((item) => {
              const path = item === 'HOME' ? '/' : `/${item.toLowerCase()}`;
              const isActive = location.pathname === path;
              return (
                <Link 
                  key={item}
                  to={path} 
                  className={`relative text-[10px] font-bold tracking-[0.2em] transition-all duration-300 py-2 ${
                    isActive ? 'text-primary neon-glow-cyan' : 'text-primary/70 hover:text-primary hover:neon-glow-cyan'
                  }`}
                >
                  {item}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-glow"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_10px_rgba(0,242,255,0.8)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-primary/70 hover:text-primary transition-all hover:neon-glow-cyan"
            >
              <span className="material-icons text-2xl">menu</span>
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-primary/70 hover:text-primary transition-all hover:neon-glow-cyan"
            >
              <span className="material-icons text-xl md:text-2xl">search</span>
            </button>
            <button 
              onClick={() => setIsUserOpen(true)}
              className="text-primary/70 hover:text-primary transition-all hover:neon-glow-cyan"
            >
              <span className="material-icons text-xl md:text-2xl">person</span>
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className={`text-primary/70 hover:text-primary transition-all hover:neon-glow-cyan relative ${cartPulse ? 'animate-bounce-neon' : ''}`}
            >
              <span className="material-icons text-xl md:text-2xl">shopping_cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-[0_0_10px_rgba(0,102,255,0.5)]">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </nav>
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
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-primary/40 hover:text-primary transition-colors">
                  <span className="material-icons text-3xl">close</span>
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
                      className={`text-xl font-black tracking-tighter uppercase transition-all duration-300 ${
                        isActive ? 'text-primary neon-glow-cyan' : 'text-white/40 hover:text-primary'
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
                  <a href="#" className="text-primary/40 hover:text-primary transition-colors"><span className="material-icons text-xl">facebook</span></a>
                  <a href="#" className="text-primary/40 hover:text-primary transition-colors"><span className="material-icons text-xl">instagram</span></a>
                  <a href="#" className="text-primary/40 hover:text-primary transition-colors"><span className="material-icons text-xl">chat</span></a>
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
              className="absolute top-8 right-8 text-primary/40 hover:text-primary transition-colors"
            >
              <span className="material-icons text-4xl">close</span>
            </button>
            <div className="w-full max-w-3xl">
              <div className="mb-12 text-center">
                <span className="text-primary text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">Foundry Search Protocol</span>
                <h2 className="font-headline text-3xl md:text-5xl font-black text-white uppercase tracking-tighter neon-glow-cyan">Find Your Hardware</h2>
              </div>
              <form onSubmit={handleSearchSubmit} className="relative group">
                <input 
                  autoFocus
                  type="text"
                  placeholder="SEARCH INVENTORY (e.g. H81, RTX 4060, RYZEN 5)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-container/40 border-b-2 border-primary/20 p-4 md:p-8 text-lg md:text-2xl font-bold text-white placeholder:text-primary/20 focus:outline-none focus:border-primary transition-all group-hover:border-primary/50"
                />
                <button type="submit" className="material-icons absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-primary/40 text-2xl md:text-4xl group-hover:text-primary transition-colors">terminal</button>
              </form>
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
                  className="text-primary/40 hover:text-primary transition-colors"
                >
                  <span className="material-icons text-3xl">close</span>
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
                          className="absolute right-4 top-[38px] text-primary/40 hover:text-primary"
                        >
                          <span className="material-icons text-sm">{showPassword ? 'visibility_off' : 'visibility'}</span>
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
                          className="absolute right-4 top-[38px] text-primary/40 hover:text-primary"
                        >
                          <span className="material-icons text-sm">{showPassword ? 'visibility_off' : 'visibility'}</span>
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
                          className="material-icons text-6xl text-green-500"
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
                              <span className="material-icons text-primary text-xl">person</span>
                            </div>
                            <div>
                              <span className="text-[8px] font-black text-primary/40 uppercase tracking-[0.3em] block mb-1">Full Identity</span>
                              <p className="text-sm font-bold text-white uppercase tracking-tight">{currentUser?.name}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                              <span className="material-icons text-primary text-xl">alternate_email</span>
                            </div>
                            <div>
                              <span className="text-[8px] font-black text-primary/40 uppercase tracking-[0.3em] block mb-1">Email Protocol</span>
                              <p className="text-xs font-bold text-primary/80">{currentUser?.email}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center">
                              <span className="material-icons text-[#25D366] text-xl">chat</span>
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
                              <span className="material-icons text-3xl mb-2">construction</span>
                              <p className="text-[9px] font-bold uppercase tracking-widest">No Saved Builds Found</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <button className="w-full py-4 border border-primary/30 text-primary font-black uppercase tracking-widest text-[10px] hover:bg-primary/10 transition-all flex items-center justify-center gap-3">
                          <span className="material-icons text-sm">notifications</span>
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
                    <span className="material-icons">groups</span>
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
                <button onClick={() => setIsCartOpen(false)} className="text-primary/40 hover:text-primary transition-colors">
                  <span className="material-icons text-3xl">close</span>
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
                              <span className="material-icons text-xs">remove</span>
                            </button>
                            <span className="text-xs font-bold text-white">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center border border-primary/20 text-primary hover:bg-primary/10 transition-all"
                            >
                              <span className="material-icons text-xs">add</span>
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
                    onClick={checkoutViaWhatsApp}
                    className="w-full py-4 md:py-5 bg-primary text-surface font-black uppercase tracking-widest text-[10px] md:text-[11px] flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,242,255,0.4)] hover:brightness-110 transition-all group"
                  >
                    <span className="material-icons group-hover:scale-110 transition-transform">chat</span>
                    Checkout via WhatsApp
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
        <span className="material-icons text-2xl md:text-3xl group-hover:rotate-12 transition-transform">groups</span>
        <div className="absolute left-full ml-4 px-4 py-2 bg-surface-container/80 backdrop-blur-md border border-[#25D366]/30 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden md:block">
          <span className="text-[10px] font-black text-[#25D366] uppercase tracking-widest">Join PC Builders Group</span>
        </div>
      </motion.a>
    </>
  );
}
