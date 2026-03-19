import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import BestOfMonth from './pages/BestOfMonth';
import HowToShop from './pages/HowToShop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/best" element={<BestOfMonth />} />
        <Route path="/shop" element={<HowToShop />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
