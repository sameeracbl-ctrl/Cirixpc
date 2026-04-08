import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SocialSidebar from './components/SocialSidebar';
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
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';

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
  return (
    <CartProvider>
      <SearchProvider>
        <Router>
          <ScrollToHash />
          <div className="flex flex-col min-h-screen bg-surface text-on-surface">
            <Navbar />
            <SocialSidebar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category/:slug" element={<CategorySelection />} />
                <Route path="/category/:slug/:condition" element={<ProductGrid />} />
                <Route path="/hardware" element={<HardwareCatalog />} />
                <Route path="/repairs" element={<Repairs />} />
                <Route path="/workstations" element={<Workstations />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/warranty" element={<Warranty />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </SearchProvider>
    </CartProvider>
  );
}
