import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Image as ImageIcon, ExternalLink } from 'lucide-react';
import './Album.css';

const API_KEY = 'AIzaSyA-pu1v4iDFlp4zB976aFE59Jr4bBTOFc8';
const FOLDER_ID = '1g9SS9PI6oom7I2iw35Njp_YrWwBGUVG0'; // Corrected Folder ID
// Note: The Google Drive folder MUST be set to "Anyone with the link can view"

function useColumns() {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) setCols(1);
      else if (window.innerWidth <= 992) setCols(2);
      else setCols(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return cols;
}

export default function Album() {
  const [activeTab, setActiveTab] = useState('all');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const columnsCount = useColumns();
  const columns = Array.from({ length: columnsCount }, () => []);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (FOLDER_ID === 'YOUR_GOOGLE_DRIVE_FOLDER_ID') {
        setError('Please set your Google Drive Folder ID in the code (FOLDER_ID variable).');
        setLoading(false);
        return;
      }
      try {
        // Query to get all files in the folder that are not trashed
        const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+trashed=false&key=${API_KEY}&fields=files(id,name,mimeType,createdTime,thumbnailLink)&orderBy=createdTime desc&pageSize=100`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error.message);
        }

        // Filter only images
        const fetchedPhotos = data.files
          .filter(file => file.mimeType.startsWith('image/'))
          .map((file) => ({
            id: file.id,
            src: file.thumbnailLink ? file.thumbnailLink.replace('=s220', '=s1000') : `https://drive.google.com/uc?export=view&id=${file.id}`,
            alt: file.name
          }));
        
        setPhotos(fetchedPhotos);
      } catch (err) {
        console.error('Error fetching photos:', err);
        setError('Failed to load photos from Google Drive. Ensure the folder is public (Anyone with the link).');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPhotos();
    window.scrollTo(0, 0);
  }, []);

  photos.forEach((photo, index) => {
    columns[index % columnsCount].push(photo);
  });

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
              href="https://www.instagram.com/trividha.official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="btn-instagram"
            >
              <Instagram size={18} />
              <span>Follow @trividhatraditions</span>
            </a>
          </div>

          <div className="instagram-grid-masonry">
            {loading && <div style={{ textAlign: 'center', width: '100%', padding: '2rem' }}>Loading images from Google Drive...</div>}
            {error && <div style={{ textAlign: 'center', width: '100%', color: 'red', padding: '2rem' }}>{error}</div>}
            
            {!loading && !error && columns.map((col, colIndex) => (
              <div key={colIndex} className="grid-col">
                {col.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="instagram-item"
                    onClick={() => window.open('https://www.instagram.com/trividha.official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', '_blank')}
                  >
                    <div className="instagram-img-wrapper">
                      <img src={photo.src} alt={photo.alt} loading="lazy" referrerPolicy="no-referrer" />
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
              </div>
            ))}
          </div>

          <div className="gallery-footer">
            <p className="footer-text">Capturing elegance, one thread at a time.</p>
            <div className="footer-divider" />
            <div className="gallery-footer-btns">
              <a
                href="https://www.instagram.com/trividha.official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.522 5.858L0 24l6.343-1.499A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.815 9.815 0 0 1-5.006-1.371l-.36-.213-3.764.89.941-3.664-.233-.373A9.831 9.831 0 0 1 2.182 12C2.182 6.557 6.557 2.182 12 2.182S21.818 6.557 21.818 12 17.443 21.818 12 21.818z" /></svg>
                WhatsApp Inquiry
              </a>
              <br />
              <a href="https://www.instagram.com/trividha.official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="btn-outline">
                Visit Official Profile
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
