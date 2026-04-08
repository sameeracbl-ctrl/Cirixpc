import React, { useState, useEffect, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  User, 
  ShoppingCart, 
  Menu, 
  X, 
  Facebook, 
  Instagram, 
  MessageSquare, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  Mail, 
  Wrench, 
  Bell, 
  Users, 
  Minus, 
  Plus,
  ShoppingBag
} from 'lucide-react';
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
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
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="logo-box">
          <Link to="/" className="flex items-center gap-4 group whitespace-nowrap">
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTI1MCAxMDBDMTY3LjE1NyAxMDAgMTAwIDE2Ny4xNTcgMTAwIDI1MEMxMDAgMzMyLjg0MyAxNjcuMTU3IDQwMCAyNTAgNDAwVjM1MEMxOTQuNzcyIDM1MCAxNTAgMzA1LjIyOCAxNTAgMjUwQzE1MCAxOTQuNzcyIDE5NC43NzIgMTUwIDI1MCAxNTBWMTAwWiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyKSIvPgogIDxwYXRoIGQ9Ik01MCAxMzBIMTgwQzE4MCAxMzAgMTgwIDE1NSAxNTUgMTU1SDUwQzI1IDE1NSAyNSAxMzAgNTAgMTMwWiIgZmlsbD0idXJsKCNwYWludDFfbGluZWFyKSIvPgogIDxwYXRoIGQ9Ik0yMCAyMTBIMTYwQzE2MCAyMTAgMTYwIDIzNSAxMzUgMjM1SDIwQy01IDIzNSAtNSAyMTAgMjAgMjEwWiIgZmlsbD0idXJsKCNwYWludDJfbGluZWFyKSIvPgogIDxwYXRoIGQ9Ik01MCAyOTBIMTgwQzE4MCAyOTAgMTgwIDMxNSAxNTUgMzE1SDUwQzI1IDMxNSAyNSAyOTAgNTAgMjkwWiIgZmlsbD0idXJsKCNwYWludDNfbGluZWFyKSIvPgogIDxkZWZzPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyIiB4MT0iMTAwIiB5MT0iMjUwIiB4Mj0iMjUwIiB5Mj0iMjUwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMwMDcyRkYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDBGRkZGIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDFfbGluZWFyIiB4MT0iNTAiIHkxPSIxNDIuNSIgeDI9IjE4MCIgeTI9IjE0Mi41IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMwMDcyRkYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDBGRkZGIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDJfbGluZWFyIiB4MT0iMjAiIHkxPSIyMjIuNSIgeDI9IjE2MCIgeTI9IjIyMi41IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMwMDcyRkYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDBGRkZGIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDNfbGluZWFyIiB4MT0iNTAiIHkxPSIzMDIuNSIgeDI9IjE4MCIgeTI9IjMwMi41IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMwMDcyRkYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDBGRkZGIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KPC9zdmc+" 
              alt="Citrix Computer" 
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col leading-none">
              <span className="text-2xl md:text-3xl font-black tracking-[-0.05em] text-white uppercase">
                CITRIX
              </span>
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] text-gray-500 uppercase mt-1">
                COMPUTER
              </span>
            </div>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center nav-links ml-auto mr-12">
          <Link to="/">Home</Link>
          <Link to="/hardware">Hardware</Link>
          <Link to="/repairs">Repair</Link>
          <Link to="/workstations">Workstation</Link>
          <Link to="/deals">Deals</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Functional Icons */}
        <div className="header-icons flex items-center gap-6">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden"
          >
            <Menu className="w-8 h-8" />
          </button>
          <button 
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="w-7 h-7 md:w-8 md:h-8" />
          </button>
          <button 
            onClick={() => setIsUserOpen(true)}
          >
            <User className="w-7 h-7 md:w-8 md:h-8" />
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative"
          >
            <ShoppingCart className="w-7 h-7 md:w-8 md:h-8" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </button>
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
              className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-md"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-full max-w-xs z-[110] bg-black p-8 flex flex-col shadow-2xl border-r border-white/5"
            >
              <div className="flex justify-between items-center mb-16">
                <span className="text-gray-500 text-[10px] font-black tracking-[0.4em] uppercase">Navigation</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-white transition-all">
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="flex flex-col gap-8">
                {['HOME', 'HARDWARE', 'REPAIRS', 'WORKSTATIONS', 'DEALS', 'CONTACT'].map((item) => {
                  const path = item === 'HOME' ? '/' : `/${item.toLowerCase()}`;
                  const isActive = location.pathname === path;
                  return (
                    <Link 
                      key={item}
                      to={path} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-2xl font-black tracking-[0.2em] font-headline uppercase transition-all duration-300 ${
                        isActive ? 'text-white' : 'text-gray-600 hover:text-white'
                      }`}
                    >
                      {item}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto pt-12 border-t border-white/5">
                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.4em] mb-4">Citrix Computer Hub</p>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-500 hover:text-white transition-all hover:scale-110"><Facebook className="w-6 h-6" /></a>
                  <a href="#" className="text-gray-500 hover:text-white transition-all hover:scale-110"><Instagram className="w-6 h-6" /></a>
                  <a href="#" className="text-gray-500 hover:text-white transition-all hover:scale-110"><MessageSquare className="w-6 h-6" /></a>
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
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 text-gray-500 hover:text-white transition-all"
            >
              <X className="w-10 h-10" />
            </button>
            <div className="w-full max-w-3xl">
              <div className="mb-12 text-center">
                <span className="text-gray-500 text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">Search Inventory</span>
                <h2 className="font-headline text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">Find Your Hardware</h2>
              </div>
              <div className="relative">
                <form onSubmit={handleSearchSubmit} className="relative group">
                  <div className="relative flex items-center bg-white/5 border border-white/10 p-2 md:p-4 rounded-sm focus-within:border-white transition-all">
                    <Search className="ml-4 md:ml-6 text-white w-7 h-7 md:w-8 md:h-8" />
                    <input 
                      autoFocus
                      type="text"
                      placeholder="SEARCH INVENTORY..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                      className="w-full bg-transparent p-4 md:p-6 text-lg md:text-2xl font-bold text-white placeholder:text-gray-600 focus:outline-none transition-all"
                    />
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
                    className="px-4 md:px-6 py-2 border border-white/10 text-[9px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest hover:border-white hover:text-white transition-all"
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
              className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-md"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md z-[110] bg-black p-6 md:p-12 flex flex-col shadow-2xl border-l border-white/5"
            >
              <div className="flex justify-between items-center mb-12 md:mb-16">
                <div>
                  <span className="text-gray-500 text-[10px] font-black tracking-[0.4em] uppercase mb-2 block">
                    {userView === 'profile' ? 'Profile' : 'User Access'}
                  </span>
                  <h2 className="font-headline text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">
                    {userView === 'profile' ? currentUser?.name : 'Login'}
                  </h2>
                </div>
                <button 
                  onClick={() => {
                    setIsUserOpen(false);
                    if (userView !== 'profile') setUserView('initial');
                  }} 
                  className="text-gray-500 hover:text-white transition-all"
                >
                  <X className="w-8 h-8" />
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
                        className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-white/90 transition-all"
                      >
                        Login to Foundry
                      </button>
                      <button 
                        onClick={() => setUserView('signup')}
                        className="w-full py-4 border border-white/10 text-gray-500 font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all"
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
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                        <input 
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 p-4 text-xs font-bold text-white focus:outline-none focus:border-white transition-all rounded-sm"
                          placeholder="ENTER EMAIL"
                        />
                      </div>
                      <div className="space-y-2 relative">
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Password</label>
                        <input 
                          required
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 p-4 text-xs font-bold text-white focus:outline-none focus:border-white transition-all rounded-sm"
                          placeholder="ENTER PASSWORD"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-[38px] text-gray-500 hover:text-white transition-all"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <button type="submit" className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-white/90 transition-all">
                        Initialize Login
                      </button>
                      <button 
                        type="button"
                        onClick={() => setUserView('initial')}
                        className="w-full text-[9px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors"
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
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                        <input 
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 p-4 text-xs font-bold text-white focus:outline-none focus:border-white transition-all rounded-sm"
                          placeholder="ENTER FULL NAME"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                        <input 
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 p-4 text-xs font-bold text-white focus:outline-none focus:border-white transition-all rounded-sm"
                          placeholder="ENTER EMAIL"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">WhatsApp Number</label>
                        <div className="relative">
                          <input 
                            required
                            type="tel"
                            value={formData.whatsapp}
                            onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 p-4 text-xs font-bold text-white focus:outline-none focus:border-white transition-all rounded-sm"
                            placeholder="+94 7X XXX XXXX"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] font-black text-gray-500 uppercase tracking-widest">Verify via WA</span>
                        </div>
                      </div>
                      <div className="space-y-2 relative">
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Password</label>
                        <input 
                          required
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 p-4 text-xs font-bold text-white focus:outline-none focus:border-white transition-all rounded-sm"
                          placeholder="CREATE PASSWORD"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-[38px] text-gray-500 hover:text-white transition-all"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <button type="submit" className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-white/90 transition-all">
                        Create Account
                      </button>
                      <button 
                        type="button"
                        onClick={() => setUserView('initial')}
                        className="w-full text-[9px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors"
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
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', damping: 12 }}
                        >
                          <CheckCircle className="w-16 h-16 text-green-500" />
                        </motion.div>
                      </div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4 neon-glow-cyan">Account Verified</h3>
                      <p className="text-[10px] text-accent/60 uppercase tracking-widest leading-relaxed">
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
                      <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
                        <div className="space-y-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                              <User className="text-white w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-[8px] font-black text-gray-500 uppercase tracking-[0.3em] block mb-1">Full Identity</span>
                              <p className="text-sm font-bold text-white uppercase tracking-tight">{currentUser?.name}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                              <Mail className="text-white w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-[8px] font-black text-gray-500 uppercase tracking-[0.3em] block mb-1">Email Protocol</span>
                              <p className="text-xs font-bold text-white/80">{currentUser?.email}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#25D366]/5 border border-[#25D366]/10 flex items-center justify-center">
                              <MessageSquare className="text-[#25D366] w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-[8px] font-black text-gray-500 uppercase tracking-[0.3em] block mb-1">WhatsApp Link</span>
                              <p className="text-xs font-bold text-white/80">{currentUser?.whatsapp}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
                        <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-6">My Saved Builds</h3>
                        <div className="space-y-4">
                          {currentUser?.builds?.length > 0 ? (
                            currentUser.builds.map((build: any, idx: number) => (
                              <div key={idx} className="p-4 border border-white/10 bg-black flex justify-between items-center">
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">{build.name}</span>
                                <span className="text-[9px] font-black text-white">{build.price}</span>
                              </div>
                            ))
                          ) : (
                            <div className="py-8 text-center border border-dashed border-white/10 opacity-30">
                              <Wrench className="w-8 h-8 mx-auto mb-2" />
                              <p className="text-[9px] font-bold uppercase tracking-widest">No Saved Builds Found</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <button className="w-full py-4 border border-white/10 text-gray-500 font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all flex items-center justify-center gap-3">
                          <Bell className="w-4 h-4" />
                          Receive Order Updates on WhatsApp
                        </button>
                        <button 
                          onClick={handleLogout}
                          className="w-full py-4 border border-red-900/30 text-red-500 font-black uppercase tracking-widest text-[10px] hover:bg-red-900/10 transition-all"
                        >
                          Logout from Foundry
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-12 border-t border-white/10">
                  <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-6">Official Community</h3>
                  <p className="text-[11px] text-gray-500 uppercase tracking-widest leading-relaxed mb-8">
                    Join our verified PC builders community for exclusive stock updates and technical support.
                  </p>
                  <a 
                    href="https://chat.whatsapp.com/your-group-link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-[#25D366] text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:brightness-110 transition-all"
                  >
                    <Users className="w-6 h-6" />
                    Join WhatsApp Community
                  </a>
                </div>
              </div>

              <div className="mt-auto pt-12 border-t border-white/10 text-center">
                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.4em]">Home of Citrix PC | Established 2014</p>
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
              className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-md"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md z-[110] bg-black p-6 md:p-12 flex flex-col shadow-2xl border-l border-white/5"
            >
              <div className="flex justify-between items-center mb-12 md:mb-16">
                <div>
                  <span className="text-gray-500 text-[10px] font-black tracking-[0.4em] uppercase mb-2 block">Inventory</span>
                  <h2 className="font-headline text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">Your Cart</h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-white transition-all">
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto no-scrollbar pr-2 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                    <span className="material-icons text-8xl mb-6 text-white">shopping_basket</span>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Cart is Empty</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 md:gap-6 p-4 bg-white/5 border border-white/10 rounded-sm group hover:border-white/30 transition-all">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-black rounded-sm overflow-hidden border border-white/10">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-grow">
                        <span className="text-[8px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-1 block">{item.category}</span>
                        <h4 className="text-[10px] md:text-[11px] font-black text-white uppercase tracking-tight mb-3 line-clamp-1">{item.title}</h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 md:gap-3">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center border border-white/20 text-white hover:bg-white/10 transition-all"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-xs font-bold text-white">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center border border-white/20 text-white hover:bg-white/10 transition-all"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] md:text-xs font-black text-white">{item.price}</div>
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
                <div className="mt-auto pt-12 border-t border-white/10">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Subtotal Manifest</span>
                    <span className="text-xl md:text-2xl font-black text-white">LKR {total.toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/checkout');
                    }}
                    className="w-full py-4 md:py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] md:text-[11px] flex items-center justify-center gap-3 hover:bg-white/90 transition-all group"
                  >
                    <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    Proceed to Checkout
                  </button>
                  <p className="text-center mt-6 text-[8px] font-bold text-gray-600 uppercase tracking-[0.2em]">Secure Order Protocol via Citrix WhatsApp</p>
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
        <Users className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-12 transition-transform" />
        <div className="absolute left-full ml-4 px-4 py-2 bg-surface-container/80 backdrop-blur-md border border-[#25D366]/30 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden md:block">
          <span className="text-[10px] font-black text-[#25D366] uppercase tracking-widest">Join PC Builders Group</span>
        </div>
      </motion.a>
    </>
  );
}
