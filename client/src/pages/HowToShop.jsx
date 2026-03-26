import { useRef, useState, useEffect } from 'react';
import './HowToShop.css';

const steps = [
  {
    num: '01',
    icon: '✦',
    title: 'Discover',
    subtitle: 'Browse Our Collections',
    desc: 'Explore our curated collections on Instagram and Facebook. Each post is a glimpse into a carefully selected piece — with stories, styling notes, and the weaver behind the loom.',
    platforms: ['Instagram', 'Facebook'],
  },
  {
    num: '02',
    icon: '☽',
    title: 'Connect',
    subtitle: 'Message Us on WhatsApp',
    desc: 'Drop us a WhatsApp message with the saree you loved, your occasion, and your budget. No forms, no bots — just a warm conversation with a real person who loves sarees.',
    platforms: ['WhatsApp'],
  },
  {
    num: '03',
    icon: '◇',
    title: 'Consult',
    subtitle: 'Personalised Styling Help',
    desc: 'We\'ll share weaving details, blouse suggestions, draping styles, and pricing. Think of it as a styling consultation — with the warmth of a family recommendation.',
    platforms: [],
  },
  {
    num: '04',
    icon: '❋',
    title: 'Confirm',
    subtitle: 'Reserve Your Saree',
    desc: 'A small advance secures your saree. We\'ll dispatch it carefully packaged, with a personal note. Your saree arrives ready to become a part of your family\'s story.',
    platforms: [],
  },
];

const occasions = [
  { icon: '💛', title: 'First Salary Saree for Amma', desc: 'A milestone gift she\'ll cherish forever — elegant, timeless, and chosen with love.' },
  { icon: '⛪', title: 'Churchwear', desc: 'Graceful drapes in muted or jewel tones, perfect for Sunday morning prayers.' },
  { icon: '💼', title: 'Corporate Chic', desc: 'Structured linens and cotton silks that speak authority without losing grace.' },
  { icon: '🌟', title: 'Milestones', desc: 'Birthdays, promotions, retirements — every achievement deserves a saree story.' },
  { icon: '🪔', title: 'Festivals & Celebrations', desc: 'Silks, brocades, and handlooms to light up Onam, Diwali, Christmas, and more.' },
  { icon: '💍', title: 'Wedding Season', desc: 'From bride\'s mother to guest of honour — we have the perfect drape for every role.' },
];

const waLink = `https://wa.me/917736687371?text=${encodeURIComponent('Hi Trividha! I\'d love to start my saree journey with you.')}`;

export default function HowToShop() {
  const [activeStep, setActiveStep] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const occasionsRef = useRef(null);
  const processRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setVisibleSections(v => ({ ...v, [e.target.id]: true }));
      }),
      { threshold: 0.1 }
    );
    [occasionsRef, processRef].forEach(r => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, []);

  // Auto-advance steps
  useEffect(() => {
    const timer = setInterval(() => setActiveStep(s => (s + 1) % steps.length), 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="page-wrapper">
      {/* ── Page Hero ──────────────────────────────────── */}
      <section className="shop-hero">
        <div className="container shop-hero-content">
          <span className="section-label">Simple, Warm, Personal</span>
          <span className="gold-line" />
          <h1>How to Shop<br /><em>with Trividha.</em></h1>
          <p>No cart. No checkout. Just a conversation — and a saree chosen just for you.</p>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ marginTop: '2rem', display: 'inline-flex' }}>Begin Your Journey →</a>
        </div>
      </section>

      {/* ── Process ────────────────────────────────────── */}
      <section id="process" ref={processRef} className={`process-section ${visibleSections.process ? 'visible' : ''}`}>
        <div className="container">
          <div className="process-header">
            <span className="section-label">Step-by-Step</span>
            <span className="gold-line" style={{ margin: '0.8rem 0 0' }} />
            <h2 className="section-title">Your Saree Journey.</h2>
          </div>
          <div className="process-layout">
            {/* Step tabs */}
            <div className="step-tabs">
              {steps.map((s, i) => (
                <button 
                  key={i} 
                  className={`step-tab ${i === activeStep ? 'active' : ''}`} 
                  onClick={() => setActiveStep(i)}
                  aria-label={`View step ${i + 1}: ${s.title}`}
                >
                  <div className="step-tab-indicator">
                    <span className="step-num">{s.num}</span>
                    {i < steps.length - 1 && <div className="step-connector" />}
                  </div>
                  <div className="step-tab-content">
                    <span className="step-title">{s.title}</span>
                    <span className="step-sub">{s.subtitle}</span>
                  </div>
                </button>
              ))}
            </div>
            {/* Step detail */}
            <div className="step-detail">
              {steps.map((s, i) => (
                <div key={i} className={`step-panel ${i === activeStep ? 'show' : ''}`}>
                  <div className="step-icon-big">{s.icon}</div>
                  <h3 className="step-detail-title">{s.title}: {s.subtitle}</h3>
                  <p className="step-detail-desc">{s.desc}</p>
                  {s.platforms.length > 0 && (
                    <div className="step-platforms">
                      {s.platforms.map(p => (
                        <span key={p} className="platform-tag">{p}</span>
                      ))}
                    </div>
                  )}
                  {i === steps.length - 1 && (
                    <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
                      Start Here →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Occasions ──────────────────────────────────── */}
      <section id="occasions" ref={occasionsRef} className={`occasions-section ${visibleSections.occasions ? 'visible' : ''}`}>
        <div className="occasions-bg" />
        <div className="container">
          <div className="occasions-header">
            <span className="section-label">Every Chapter of Your Life</span>
            <span className="gold-line" style={{ margin: '0.8rem auto' }} />
            <h2 className="section-title">Sarees for Every Occasion.</h2>
            <p className="occasions-sub">Whatever the moment, we have the perfect saree waiting to become part of your story.</p>
          </div>
          <div className="occasions-grid">
            {occasions.map((o, i) => (
              <div key={i} className="occasion-card" style={{ transitionDelay: `${i * 0.12}s` }}>
                <span className="occasion-icon">{o.icon}</span>
                <h3 className="occasion-title">{o.title}</h3>
                <p className="occasion-desc">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ────────────────────────────────── */}
      <section className="shop-cta-section">
        <div className="container">
          <div className="shop-cta-inner">
            <h2>Ready to find <em>your</em> saree?</h2>
            <p>Every conversation with Trividha begins with a simple message — and ends with a saree that feels like it was always yours.</p>
            <div className="cta-row">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-gold">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.522 5.858L0 24l6.343-1.499A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.815 9.815 0 0 1-5.006-1.371l-.36-.213-3.764.89.941-3.664-.233-.373A9.831 9.831 0 0 1 2.182 12C2.182 6.557 6.557 2.182 12 2.182S21.818 6.557 21.818 12 17.443 21.818 12 21.818z" /></svg>
                Message on WhatsApp
              </a>
              <a href="https://instagram.com/trividha" target="_blank" rel="noopener noreferrer" className="btn-outline">Explore on Instagram</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
