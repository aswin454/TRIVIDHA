import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PixelTransition from './PixelTransition';
import LazyImage from '../components/LazyImage';
import './Home.css';

const heroSlides = [
  { src: '/photos/2.jpeg', alt: 'Trividha Heritage Saree Collection' },
  { src: '/photos/3.jpeg', alt: 'Trividha Signature Drape' },
];

const sareeHighlights = [
  { id: 1, src: '/photos/4.png', name: 'Banarasi Silk Grace', occasion: 'Wedding Season' },
  { id: 2, src: '/photos/5.png', name: 'Kanjivaram Heritage', occasion: 'Festive Wear' },
  { id: 3, src: '/photos/6.png', name: 'Chanderi Cotton Bloom', occasion: 'Corporate Chic' },
];

const testimonials = [
  {
    id: 1,
    img: '/photos/9.png',
    name: 'Maria Thomas',
    location: 'Dubai, United Arab Emirates',
    quote: 'I honestly had zero knowledge about sarees. All I did was share what I liked... my colours, the occasion, and what I felt comfortable wearing. Parvathy understood it so naturally and curated something that felt completely like me. It didn’t feel like choosing a saree. It felt like finding one that was already mine. Truly a 10/10 experience in saree curation.',
  },
  {
    id: 2,
    img: '/photos/10.png',
    name: 'Divya M.',
    location: 'Chennai',
    quote: 'Sethuparvathy helped me pick the perfect saree for my first board meeting. I walked in with confidence I didn\'t know a piece of fabric could give me.',
  },
  {
    id: 3,
    img: '/photos/11.png',
    name: 'Anitha K.',
    location: 'Bengaluru',
    quote: 'What sets Trividha apart is the love behind every recommendation. It\'s not just shopping, it\'s a conversation with someone who truly understands sarees.',
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const storyRef = useRef(null);
  const highlightRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Hero slider auto-advance
  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % heroSlides.length), 4500);
    return () => clearInterval(timer);
  }, []);

  // Intersection observer for fade-in sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setIsVisible(v => ({ ...v, [e.target.id]: true }));
      }),
      { threshold: 0.15 }
    );
    [storyRef, highlightRef, testimonialsRef].forEach(r => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="page-wrapper">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="hero">
        {/* Slideshow */}
        <div className="hero-slider">
          {heroSlides.map((slide, i) => (
            <div key={i} className={`hero-slide ${i === current ? 'active' : ''}`}>
              <img
                src={slide.src}
                alt={slide.alt}
                width="1920"
                height="1080"
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "low"}
              />
              <div className="hero-slide-overlay" />
            </div>
          ))}
          {/* Slide dots */}
          <div className="hero-dots">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                className={`hero-dot ${i === current ? 'active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Text */}
        <div className="hero-content">
          <span className="section-label hero-label">HANDPICKED HERITAGE. CURATED FOR YOU</span>
          <h1 className="hero-headline">
            Trividha:<br />
            <em>For Moments </em><br />
            You'll Remember.
          </h1>
          <p className="hero-subtext">
            From quiet everyday grace to life’s most meaningful celebrations, we handpick sarees across budgets and occasions, curating each piece with love, intention, and generational care<br className="br-desktop" /> the quiet poetry of a woman's soul.
          </p>
          <div className="hero-actions">
            <Link to="/oursarees" className="btn-primary">Discover Our Sarees</Link>
            <Link to="/shop" className="btn-outline">How to Shop</Link>
          </div>
          {/* Floating badge */}
          <div className="hero-badge float-anim">
            <span className="hero-badge-number">1000+</span>
            <span className="hero-badge-text">Sarees Handpicked</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── Story ────────────────────────────────────────── */}
      <section id="story-section" ref={storyRef} className={`story-section ${isVisible['story-section'] ? 'visible' : ''}`}>
        <div className="container">
          <div className="story-inner">
            <div className="story-text">
              <span className="section-label">Our Heritage Story</span>
              <span className="gold-line" />
              <h2 className="section-title">The Trividha Story.</h2>
              <p>Trividha was born from a conversation between a mother and her daughters — a shared love for the poetry woven into handloom threads, and a quiet conviction that every woman deserves to wear something that truly speaks to her.</p>
              <br />
              <p>The name <em>Trividha</em> means "threefold" in Sanskrit — a tribute to Vijayalekshmi, Sethuparvathy, and Aparna, whose combined vision and passion gave life to this brand. Together they curate sarees that are not just garments, but heirlooms-in-waiting.</p>
              <br />
              <p>Every saree we bring to you is hand-selected across the textile heartlands of India — touched by master weavers, blessed with centuries of craft, and chosen with one question in mind: would we wear this ourselves?</p>
              <Link to="/about" className="btn-outline" style={{ marginTop: '2rem', display: 'inline-flex' }}>Meet the Family →</Link>
            </div>
            <div className="story-visual">
              <div className="story-img-frame">
                <PixelTransition
                  firstContent={
                    <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", backgroundColor: "var(--burgundy)" }}>
                      <img
                        src="/photos/logo_new.png"
                        alt="Trividha Logo"
                        width="400"
                        height="400"
                        loading="lazy"
                        style={{ width: "85%", height: "85%", objectFit: "contain" }}
                      />
                    </div>
                  }
                  secondContent={
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "grid",
                        placeItems: "center",
                        backgroundColor: "var(--burgundy)"
                      }}
                    >
                      <p style={{ fontWeight: 900, fontSize: "2.2rem", color: "var(--gold-light)", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.1em" }}>Trividha</p>
                    </div>
                  }
                  gridSize={10}
                  pixelColor='#000000'
                  once={false}
                  animationStepDuration={0.4}
                  className="new-logo-img"
                  aspectRatio="100%"
                  style={{ backgroundColor: "var(--burgundy)", borderRadius: "var(--radius)" }}
                />
              </div>
              <div className="story-stat story-stat-1">
                <span className="stat-num">3</span>
                <span className="stat-label">Generations of<br />Saree Wisdom</span>
              </div>
              <div className="story-stat story-stat-2">
                <span className="stat-num">♥</span>
                <span className="stat-label">Curated with<br />Love Always</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Highlights ───────────────────────────────────── */}
      <section id="highlight-section" ref={highlightRef} className={`highlight-section ${isVisible['highlight-section'] ? 'visible' : ''}`}>
        <div className="container">
          <div className="highlight-header">
            <span className="section-label">This Month's Curated Picks</span>
            <span className="gold-line" style={{ margin: '0.8rem auto 0' }} />
            <h2 className="section-title">A Glimpse of the Edit.</h2>
          </div>
          <div className="highlight-grid">
            {sareeHighlights.map((s, i) => (
              <div key={s.id} className="highlight-card card-float" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="highlight-img-wrap">
                  <img src={s.src} alt={s.name} width="600" height="800" loading="lazy" />
                  <div className="highlight-overlay">
                    <Link to="/oursarees" className="btn-gold">View Collection</Link>
                  </div>
                </div>
                <div className="highlight-info">
                  <span className="highlight-occasion">{s.occasion}</span>
                  <h3 className="highlight-name">{s.name}</h3>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/oursarees" className="btn-primary">See All Our Sarees →</Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────── */}
      <section id="testimonials-section" ref={testimonialsRef} className={`testimonials-section ${isVisible['testimonials-section'] ? 'visible' : ''}`}>
        <div className="container">
          <div className="testi-header">
            <span className="section-label">Real Women, Real Moments</span>
            <span className="gold-line" style={{ margin: '0.8rem auto' }} />
            <h2 className="section-title">Love Stories.</h2>
          </div>
          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <div key={t.id} className="testi-card card-float" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="testi-img-wrap">
                  <LazyImage src={t.img} alt={t.name} width="400" height="300" loading="lazy" />
                </div>
                <div className="testi-body">
                  <span className="testi-quote-mark">"</span>
                  <p className="testi-quote">{t.quote}</p>
                  <div className="testi-author">
                    <span className="testi-name">{t.name}</span>
                    <span className="testi-location">{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values Strip ─────────────────────────────────── */}
      <section className="values-strip">
        <div className="container">
          <div className="values-grid">
            {[
              { icon: '✦', title: 'Hand-Curated', desc: 'Every piece personally selected by the Trividha family.' },
              { icon: '☽', title: 'Pure Heritage', desc: 'Sourced directly from master weavers across India.' },
              { icon: '✉', title: 'Personal Service', desc: 'A one-on-one styling conversation, always.' },
              { icon: '❋', title: 'Occasion-Perfect', desc: 'From first salary to milestone, we have your saree.' },
            ].map((v, i) => (
              <div key={i} className="value-item">
                <span className="value-icon">{v.icon}</span>
                <h4 className="value-title">{v.title}</h4>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
