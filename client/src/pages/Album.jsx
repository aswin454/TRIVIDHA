import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Image as ImageIcon, ExternalLink } from 'lucide-react';
import './Album.css';

const instagramPhotos = [
  { id: 1, src: '/photos/4.png', alt: 'Trividha Heritage Collection' },
  { id: 2, src: '/photos/5.png', alt: 'Signature Silk Saree' },
  { id: 3, src: '/photos/6.png', alt: 'Elegant Drapes' },
  { id: 4, src: '/photos/7.png', alt: 'Handpicked Heritage' },
  { id: 5, src: '/photos/8.png', alt: 'Traditional Grace' },
  { id: 6, src: '/photos/9.png', alt: 'Modern Elegance' },
  { id: 7, src: '/photos/10.png', alt: 'Premium Collection' },
  { id: 8, src: '/photos/11.png', alt: 'Timeless Beauty' },
  { id: 9, src: '/photos/2.jpeg', alt: 'Festival Special' },
];

export default function Album() {
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="album-page">
      {/* ── Hero Section ─────────────────────────────── */}
      <section className="album-hero">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="album-hero-bg"
        >
          <img src="/photos/7.png" alt="Hero Background" />
          <div className="album-hero-overlay" />
        </motion.div>

        <div className="container">
          <div className="album-hero-content">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="section-label"
            >
              Moments in 6 Yards
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="album-title"
            >
              The Trividha <em>Album</em>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="album-subtitle"
            >
              A curated collection of our favorite captures, celebrating the quiet poetry of handloom and the women who bring them to life.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Instagram feed Section ────────────────────── */}
      <section className="gallery-section">
        <div className="container">
          <div className="gallery-header">
            <div className="gallery-intro">
              <h2 className="gallery-title">Our Instagram Journey</h2>
              <p>Follow us for daily drapes and heritage stories.</p>
            </div>
            <a
              href="https://www.instagram.com/trividhatraditions?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="btn-instagram"
            >
              <Instagram size={18} />
              <span>Follow @trividhatraditions</span>
            </a>
          </div>

          <motion.div
            layout
            className="instagram-grid"
          >
            {instagramPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="instagram-item"
                onClick={() => window.open('https://www.instagram.com/trividhatraditions', '_blank')}
              >
                <div className="instagram-img-wrapper">
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                  <div className="instagram-overlay">
                    <div className="overlay-content">
                      <Instagram size={24} color="white" />
                      <span>View on Instagram</span>
                      <ExternalLink size={14} className="external-icon" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="gallery-footer">
            <p className="footer-text">Capturing elegance, one thread at a time.</p>
            <div className="footer-divider" />
            <a href="https://www.instagram.com/trividhatraditions?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="btn-outline">
              Visit Official Profile
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
