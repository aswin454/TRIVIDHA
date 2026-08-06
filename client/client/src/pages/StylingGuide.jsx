import { useEffect } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import './StylingGuide.css';

export default function StylingGuide() {
  const pdfUrl = "/Trividha%20Kerala%20Saree%20Styling%20Guide%202026%20(2).pdf";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="page-wrapper styling-guide-page" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container" style={{ padding: '0 1.5rem 3rem' }}>

        {/* Header Section */}
        <div className="section-header-center" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <span className="section-label">Exclusive Weaves</span>
          <h1 className="guide-headline" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.8rem', fontWeight: '400', margin: '0.5rem 0 1.5rem' }}>
            Styling Guide 2026
          </h1>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={pdfUrl} download className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.75rem 1.8rem' }}>
              <Download size={16} /> Download Guide PDF
            </a>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.75rem 1.8rem' }}>
              <ExternalLink size={16} /> Open in New Tab
            </a>
          </div>
        </div>

        {/* Centered PDF Viewer Box */}
        <div className="pdf-iframe-container" style={{
          height: '75vh',
          maxWidth: '900px',
          margin: '0 auto',
          aspectRatio: 'auto',
          border: '1px solid rgba(212, 175, 55, 0.25)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lift)',
          background: '#1e1e1e'
        }}>
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0`}
            width="100%"
            height="100%"
            title="Trividha Saree Styling Guide 2026"
            style={{ border: 'none' }}
          />
        </div>

      </div>
    </main>
  );
}
