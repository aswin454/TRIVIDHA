import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Users, Star, ShoppingBag } from 'lucide-react';
import './Navbar.css';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/about', label: 'About Us', icon: Users },
  { path: '/best', label: 'Best of Month', icon: Star },
  { path: '/shop', label: 'Shop', icon: ShoppingBag },
];

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
      
      // If scrolling down and past the header, hide it. Otherwise, show it.
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
        {/* Logo */}
        <NavLink to="/" className="navbar-logo">
          <img src="/photos/1.png" alt="Trividha Logo" />
        </NavLink>

        {/* Desktop Nav */}
        <ul className="navbar-links">
          {navItems.map(({ path, label, icon: Icon }) => (
            <li key={path}>
              <NavLink to={path} end={path === '/'} className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}>
                <Icon size={15} strokeWidth={1.6} />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink key={path} to={path} end={path === '/'} className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
            <Icon size={18} strokeWidth={1.5} />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
