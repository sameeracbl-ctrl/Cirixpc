import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Filter } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SocialSidebar from './components/SocialSidebar';
import CategorySidebar from './components/CategorySidebar';
import Home from './pages/Home';
import CategorySelection from './pages/CategorySelection';
import ProductGrid from './pages/ProductGrid';
import Checkout from './pages/Checkout';
import HardwareCatalog from './pages/HardwareCatalog';
import Repairs from './pages/Repairs';
import Workstations from './pages/Workstations';
import Deals from './pages/Deals';
import Warranty from './pages/Warranty';
import Contact from './pages/Contact';
import Payments from './pages/Payments';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './pages/Login';
import Signup from './pages/Signup';

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        // Use a small timeout to ensure the element is rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash, pathname]);

  return null;
}

export default function App() {
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <SearchProvider>
            <Router>
              <ScrollToHash />
              <div className="flex flex-col min-h-screen bg-surface text-on-surface w-full overflow-x-hidden">
                <Navbar onOpenCategories={() => setIsCategoryDrawerOpen(true)} />
                <div className="flex flex-grow relative w-full overflow-x-hidden">
                  {/* Vertical Mega Menu Sidebar (Desktop) */}
                  <div className="hidden lg:block shrink-0">
                    <CategorySidebar />
                  </div>

                  {/* Mobile Category Drawer */}
                  <div className="lg:hidden">
                    <button
                      onClick={() => setIsCategoryDrawerOpen(true)}
                      className="fixed top-28 left-4 z-[1000] w-12 h-12 bg-[#00ccff] text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,204,255,0.4)] hover:scale-110 active:scale-95 transition-all"
                      aria-label="Open Categories"
                    >
                      <Filter size={20} />
                    </button>

                    <AnimatePresence>
                      {isCategoryDrawerOpen && (
                        <>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCategoryDrawerOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1001]"
                          />
                          <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-full md:w-80 bg-[#0a0a0a] z-[1002] shadow-2xl sidebar active"
                          >
                            <CategorySidebar isMobile onClose={() => setIsCategoryDrawerOpen(false)} />
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <div className="flex-grow relative">
                    <SocialSidebar />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/category/:slug" element={<CategorySelection />} />
                      <Route path="/category/:slug/:condition" element={<ProductGrid />} />
                      <Route path="/hardware" element={<HardwareCatalog />} />
                      <Route path="/repairs" element={<Repairs />} />
                      <Route path="/workstations" element={<Workstations />} />
                      <Route path="/deals" element={<Deals />} />
                      <Route path="/warranty" element={<Warranty />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/payments" element={<Payments />} />
                      <Route path="/checkout" element={<Checkout />} />
                    </Routes>
                  </div>
                </div>
                <Footer />
              </div>
            </Router>
          </SearchProvider>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
