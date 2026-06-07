import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import HowToShop from './pages/HowToShop';
import Album from './pages/Album';
import OurSarees from './pages/OurSarees';
import WhatsAppButton from './components/WhatsAppButton';
import Preloader from './components/Preloader';

export default function App() {
  return (
    <BrowserRouter>
      <Preloader />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/shop" element={<HowToShop />} />
        <Route path="/album" element={<Album />} />
        <Route path="/oursarees" element={<OurSarees />} />
      </Routes>
      <WhatsAppButton />
      <Footer />
    </BrowserRouter>
  );
}
