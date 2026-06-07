import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, ChevronRight, ChevronLeft, MessageCircle, Instagram } from 'lucide-react';
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
import g13 from '../../../photos/g13.jpeg';
import g14 from '../../../photos/g14.jpeg';
import g15 from '../../../photos/g15.jpeg';
import g16 from '../../../photos/g16.jpeg';
import g17 from '../../../photos/g17.jpeg';
import g18 from '../../../photos/g18.jpeg';

const sareesData = [
  {
    id: 1,
    name: 'Our handloom linen saree',
    description: `Our handloom linen saree is a perfect blend of comfort and class.
Lightweight, breathable, and beautifully textured, linen brings a natural grace that is perfect for both everyday wear and refined occasions. It's for the woman who loves subtle luxury.`,
    images: [g1, g2, g3],
    waLink: 'https://wa.link/7kuigp'
  },
  {
    id: 2,
    name: 'semi Kanchipuram silk saree',
    description: 'Our premium semi Kanchipuram silk saree in green shade features delicate small border detailing and elegant small buttas , adding a touch of charm and grace.Perfect for those who love minimal beauty with a refined finish',
    images: [g4, g5, g6],
    waLink: 'https://wa.link/7kuigp'
  },
  {
    id: 3,
    name: 'Pure Handloom Kanchi Cotton',
    description: 'Introducing our pure handloom Kanchi cotton sarees where heritage meets everyday elegance.Crafted from fine cotton, these sarees are known for their breathable texture, durability, and soft comfort. The signature contrast borders and rich yet minimal finish make them perfect for both daily wear and special moments.This isn’t just a saree… it’s tradition you can feel, elegance you can wear',
    images: [g7, g8, g9],
    waLink: 'https://wa.link/7kuigp'
  },
  {
    id: 4,
    name: 'handloom semi Kanchipuram silk cotton saree',
    description: 'This handloom semi Kanchipuram silk cotton saree in a serene white and parrot green combination captures the beauty of subtle grace and vibrant charm.This creates a look that feels both calm and striking.. perfect for moments that deserve a touch of tradition with effortless style Perfect for functions and also as temple wear.',
    images: [g10, g11, g12],
    waLink: 'https://wa.link/7kuigp'
  },
  {
    id: 5,
    name: 'Pure Kanchipuram silk saree',
    description: 'This Pure Kanchipuram silk saree in a graceful ivory and mustard yellow combination is a perfect blend of tradition and elegance.',
    images: [g13, g14, g15],
    waLink: 'https://wa.link/7kuigp'
  },
  {
    id: 6,
    name: 'Premium Semi Kanchipuram Saree',
    description: `Presenting our Premium Semi Kanchipuram Saree in a stunning Vadamalli shade… grace that never goes unnoticed. ✨

Woven with delicate butti motifs all over the body and finished with elegant striped detailing on the pallu, this is the kind of saree you’ll reach for when you want to feel effortlessly beautiful.`,
    images: [g16, g17, g18],
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
          <h2>Looking to view more sarees?</h2>
          <p>We have many more handpicked pieces beyond this collection. Visit our Instagram to discover more.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://www.instagram.com/trividha.official" target="_blank" rel="noopener noreferrer" className="btn-outline">
              <Instagram size={18} style={{ marginRight: '8px' }} />
              Visit our Instagram
            </a>
            <a href="https://wa.link/7kuigp" target="_blank" rel="noopener noreferrer" className="btn-outline">
              <MessageCircle size={18} style={{ marginRight: '8px' }} />
              Chat with Trividha
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
