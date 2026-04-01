import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategorySelection from './pages/CategorySelection';
import ProductGrid from './pages/ProductGrid';
import HardwareCatalog from './pages/HardwareCatalog';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-surface text-on-surface">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:slug" element={<CategorySelection />} />
            <Route path="/category/:slug/:condition" element={<ProductGrid />} />
            <Route path="/hardware" element={<HardwareCatalog />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
