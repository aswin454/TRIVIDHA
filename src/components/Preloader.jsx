import { useEffect, useState } from 'react';
import './Preloader.css';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Check if the preloader has already run in this session to prevent annoying repetitive loading screens
    const hasLoaded = sessionStorage.getItem('trividha_loaded');
    
    // For luxury feel, guarantee at least 2.2 seconds of animation, or wait for window load
    const timer = setTimeout(() => {
      setFade(true);
      const exitTimer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('trividha_loaded', 'true');
      }, 800); // Duration of fade-out CSS animation
      return () => clearTimeout(exitTimer);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className={`preloader-wrapper ${fade ? 'preloader-wrapper--fade-out' : ''}`}>
      <div className="preloader-content">
        <div className="preloader-logo-wrap">
          <img src="/photos/1.png" alt="Trividha Logo" className="preloader-logo" />
        </div>
        <h2 className="preloader-brand-title">Trividha</h2>
        <p className="preloader-subtitle">TRADITION | CRAFT | ELEGANCE</p>
        <div className="preloader-line-container">
          <div className="preloader-line"></div>
        </div>
      </div>
    </div>
  );
}
