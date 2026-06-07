import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);

      // Hide header when scrolling down past 100px, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${hidden ? 'navbar--hidden' : ''}`}>
      <div className="navbar-inner">
        {/* Left: Hamburger & Navigation Quick Links */}
        <div className="navbar-left">
          <button
            className="menu-toggle-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation drawer"
          >
            {menuOpen ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
          </button>

          <div className="navbar-desktop-links">
            <NavLink to="/" end className="nav-link-custom">Home</NavLink>
            <NavLink to="/oursarees" className="nav-link-custom">Collections</NavLink>
            <NavLink to="/album" className="nav-link-custom">Heritage</NavLink>
            <NavLink to="/about" className="nav-link-custom">Our Story</NavLink>
            <NavLink to="/shop" className="nav-link-custom">How to Shop</NavLink>
          </div>
        </div>

        {/* Center: Centered Logo and Subtitle */}
        <div className="navbar-center">
          <NavLink to="/" className="navbar-logo-centered">
            <img src="/photos/1.png" alt="Trividha" className="logo-img" />
            <span className="logo-subtitle">TRADITION | CRAFT | ELEGANCE</span>
          </NavLink>
        </div>

        {/* Right: Search/Cart Icons (Removed) */}
        <div className="navbar-right">
        </div>
      </div>

      {/* Drawer for all links */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" end className="mobile-nav-link">Home</NavLink>
        <NavLink to="/oursarees" className="mobile-nav-link">Collections</NavLink>
        <NavLink to="/album" className="mobile-nav-link">Heritage</NavLink>
        <NavLink to="/about" className="mobile-nav-link">Our Story</NavLink>
        <NavLink to="/shop" className="mobile-nav-link">How to Shop</NavLink>
      </div>
    </nav>
  );
}
