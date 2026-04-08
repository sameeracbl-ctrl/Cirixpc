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

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
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
        alert('Invalid credentials');
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserView('initial');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    navigate('/category/all/new');
  };

  return (
    <>
      <header className="sticky top-0 z-[60] bg-black/90 backdrop-blur-[15px] border-b border-white/5">
        <nav className="relative flex items-center justify-between w-full px-4 md:px-12 py-6 max-w-screen-2xl mx-auto font-headline">
          
          {/* Logo & Main Nav Group */}
          <div className="flex items-center gap-12 md:gap-20">
            <Link to="/" className="flex items-center gap-3 md:gap-5 group whitespace-nowrap">
              <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                   <path d="M80 20 C60 5 30 5 15 30 C0 55 5 85 35 95 C55 100 80 90 90 70" fill="none" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />
                   <path d="M35 40 L55 40 M35 60 L65 60" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl md:text-3xl font-black tracking-[-0.05em] text-white uppercase">CITRIX</span>
                <span className="text-[10px] md:text-[12px] font-bold tracking-[0.4em] text-gray-500 uppercase mt-1">COMPUTER</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-12">
              {['HOME', 'HARDWARE', 'REPAIRS', 'WORKSTATIONS', 'DEALS', 'CONTACT'].map((item) => {
                const path = item === 'HOME' ? '/' : `/${item.toLowerCase()}`;
                const isActive = location.pathname === path;
                return (
                  <Link key={item} to={path} className={`group relative text-[10px] xl:text-[12px] font-black tracking-[0.3em] transition-all duration-300 py-2 ${isActive ? 'text-white' : 'text-gray-500 hover:text-white'}`}>
                    {item}
                    <span className={`absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full ${isActive ? 'w-full' : ''}`} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Action Icons - FIXED ROW LAYOUT */}
          <div className="flex items-center gap-3 md:gap-6">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-gray-500 hover:text-white transition-all">
              <span className="material-symbols-outlined text-[30px]">menu</span>
            </button>
            <button onClick={() => setIsSearchOpen(true)} className="text-gray-500 hover:text-white transition-all">
              <span className="material-symbols-outlined text-[28px] md:text-[32px]">search</span>
            </button>
            <button onClick={() => setIsUserOpen(true)} className="text-gray-500 hover:text-white transition-all">
              <span className="material-symbols-outlined text-[28px] md:text-[32px]">person</span>
            </button>
            <button onClick={() => setIsCartOpen(true)} className="text-gray-500 hover:text-white transition-all relative">
              <span className="material-symbols-outlined text-[28px] md:text-[32px]">shopping_cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-md" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 left-0 h-full w-full max-w-xs z-[110] bg-black p-8 flex flex-col shadow-2xl border-r border-white/5">
              <div className="flex justify-between items-center mb-16">
                <span className="text-gray-500 text-[10px] font-black tracking-[0.4em] uppercase">Navigation</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-white transition-all">
                  <span className="material-symbols-outlined text-[32px]">close</span>
                </button>
              </div>
              <div className="flex flex-col gap-8">
                {['HOME', 'HARDWARE', 'REPAIRS', 'WORKSTATIONS', 'DEALS', 'CONTACT'].map((item) => (
                  <Link key={item} to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black tracking-[0.2em] font-headline uppercase text-gray-600 hover:text-white transition-all">
                    {item}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4">
            <button onClick={() => setIsSearchOpen(false)} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-all">
              <span className="material-symbols-outlined text-[40px]">close</span>
            </button>
            <div className="w-full max-w-3xl">
              <form onSubmit={handleSearchSubmit} className="relative group">
                <div className="relative flex items-center bg-white/5 border border-white/10 p-2 md:p-4 rounded-sm focus-within:border-white transition-all">
                  <span className="material-symbols-outlined ml-4 text-white text-[32px]">search</span>
                  <input autoFocus type="text" placeholder="SEARCH INVENTORY..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent p-4 text-lg md:text-2xl font-bold text-white focus:outline-none" />
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
