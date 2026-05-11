import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, ChevronRight, ChevronLeft, MessageCircle } from 'lucide-react';
import LazyImage from '../components/LazyImage';
import './OurSarees.css';

import g1 from '../../../photos/g1.jpeg';
import g2 from '../../../photos/g2.jpeg';
import g3 from '../../../photos/g3.jpeg';
import g4 from '../../../photos/g4.jpeg';
import g5 from '../../../photos/g5.jpeg';
import g6 from '../../../photos/g6.jpeg';
import g7 from '../../../photos/g7.jpeg';
import g8 from '../../../photos/g8.jpeg';
import g9 from '../../../photos/g9.jpeg';
import g10 from '../../../photos/g10.jpeg';
import g11 from '../../../photos/g11.jpeg';
import g12 from '../../../photos/g12.jpeg';

const sareesData = [
  {
    id: 1,
    name: 'Kanjivaram Silk Royalty',
    description: 'An elegant handwoven Kanjivaram silk saree with authentic zari borders. Perfect for weddings, receptions, and grand auspicious occasions.',
    price: '₹ 25,000',
    images: [g1, g2, g3],
    waLink: 'https://wa.link/7kuigp'
  },
  {
    id: 2,
    name: 'Banarasi Heritage Drape',
    description: 'A luxurious Banarasi brocade, featuring intricate floral motifs and a timeless appeal that never fades. An heirloom piece.',
    price: '₹ 18,500',
    images: [g4, g5, g6],
    waLink: 'https://wa.link/7kuigp'
  },
  {
    id: 3,
    name: 'Chanderi Summer Bloom',
    description: 'Lightweight Chanderi silk with delicate embroidery, offering comfort and sophistication for day events and pujas.',
    price: '₹ 12,000',
    images: [g7, g8, g9],
    waLink: 'https://wa.link/7kuigp'
  },
  {
    id: 4,
    name: 'Pochampally Ikat Splendor',
    description: 'A masterpiece of precision, this double Ikat Pochampally brings vibrant colors and striking geometry to your wardrobe.',
    price: '₹ 21,000',
    images: [g10, g11, g12],
    waLink: 'https://wa.link/7kuigp'
  }
];

function SareeCard({ saree, index }) {
  const [activeImg, setActiveImg] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const nextImg = () => setActiveImg((prev) => (prev + 1) % saree.images.length);
  const prevImg = () => setActiveImg((prev) => (prev - 1 + saree.images.length) % saree.images.length);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextImg();
    if (isRightSwipe) prevImg();
  };

  return (
    <div 
      ref={cardRef} 
      className={`saree-card ${isVisible ? 'visible' : ''}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="saree-gallery">
        <div 
          className="main-image"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {saree.images.map((img, i) => (
            <div key={i} className={`img-wrapper ${i === activeImg ? 'active' : ''}`}>
              <LazyImage src={img} alt={`${saree.name} view ${i + 1}`} width="500" height="700" loading="lazy" />
            </div>
          ))}
          
          <button className="gallery-nav-btn prev-btn" onClick={prevImg} aria-label="Previous image">
            <ChevronLeft size={24} />
          </button>
          <button className="gallery-nav-btn next-btn" onClick={nextImg} aria-label="Next image">
            <ChevronRight size={24} />
          </button>

          <div className="price-tag">{saree.price}</div>
        </div>
      </div>
      
      <div className="saree-info">
        <div className="saree-header">
          <span className="saree-id">No. {String(saree.id).padStart(2, '0')}</span>
          <h2 className="saree-title">{saree.name}</h2>
        </div>
        <p className="saree-desc">{saree.description}</p>
        
        <div className="saree-actions">
          <a href={saree.waLink} target="_blank" rel="noopener noreferrer" className="buy-btn">
            <span className="btn-bg"></span>
            <span className="btn-content">
              <ShoppingBag size={18} />
              Buy on WhatsApp
              <ChevronRight size={18} className="arrow-icon" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function OurSarees() {
  return (
    <main className="page-wrapper our-sarees-page">
      {/* Hero Section */}
      <section className="sarees-hero">
        <div className="container">
          <span className="section-label">Trividha Collection</span>
          <span className="gold-line"></span>
          <h1>Our Sarees.</h1>
          <p>Explore our curated selection of handwoven poetry, designed to elevate your grace on every occasion.</p>
        </div>
      </section>

      {/* Sarees Grid Section */}
      <section className="sarees-grid-section">
        <div className="container">
          <div className="sarees-list">
            {sareesData.map((saree, i) => (
              <SareeCard key={saree.id} saree={saree} index={i} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer Banner */}
      <section className="sarees-cta">
        <div className="container">
          <h2>Looking for something specific?</h2>
          <p>Reach out to us directly for personalized styling and exclusive pieces not listed here.</p>
          <a href="https://wa.link/7kuigp" target="_blank" rel="noopener noreferrer" className="btn-outline">
            <MessageCircle size={18} style={{ marginRight: '8px' }} />
            Chat with Trividha
          </a>
        </div>
      </section>
    </main>
  );
}
