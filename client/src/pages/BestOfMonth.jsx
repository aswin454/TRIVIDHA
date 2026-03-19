import { useRef, useState, useEffect } from 'react';
import FloatingLines from './FloatingLines';
import Silk from './Silk';
import './BestOfMonth.css';

const sarees = [
  {
    id: 1,
    img: '/photos/4.png',
    name: 'Banarasi Brocade Splendor',
    priceRange: '₹12,000 – ₹18,000',
    fabric: 'Pure Katan Silk',
    work: 'Zari Brocade Weave',
    love: 'Pair this with antique gold jewellery — the richness of the brocade and the glint of gold creates an unmatched heirloom look.',
    occasion: 'Wedding & Reception',
  },
  {
    id: 2,
    img: '/photos/5.png',
    name: 'Kanjivaram Crimson Heritage',
    priceRange: '₹15,000 – ₹22,000',
    fabric: 'Pure Mulberry Silk',
    work: 'Temple Border, Korvai Technique',
    love: 'The contrast border lifts the entire drape. Wear with a simple blouse — let the saree speak. Perfect for a bride\'s family look.',
    occasion: 'Festivals & Weddings',
  },
  {
    id: 3,
    img: '/photos/6.png',
    name: 'Chanderi Moonlight Bloom',
    priceRange: '₹4,500 – ₹7,000',
    fabric: 'Chanderi Silk-Cotton',
    work: 'Booti Embroidery, Zari Border',
    love: 'Drape it in the butterfly style for a modern festival look. Light as a breeze, stunning as sunrise — your first salary saree for Amma.',
    occasion: 'Gifting & Puja Occasions',
  },
  {
    id: 4,
    img: '/photos/7.png',
    name: 'Linen Noir Executive',
    priceRange: '₹3,500 – ₹5,500',
    fabric: 'Pure Linen',
    work: 'Woven Stripes, Self Border',
    love: 'The ideal corporate saree — structured, breathable, and effortlessly elegant. A pencil blouse and a sleek bun complete the power look.',
    occasion: 'Corporate & Professional',
  },
  {
    id: 5,
    img: '/photos/8.png',
    name: 'Pochampally Ikat Dream',
    priceRange: '₹8,000 – ₹12,000',
    fabric: 'Handloom Silk',
    work: 'Double Ikat Resist Dyeing',
    love: 'A piece of true artisan craft. Each motif is dyed before weaving — no two sarees are exactly alike. For the woman who loves stories in her threads.',
    occasion: 'Cultural Events & Church',
  },
];

const testimonials = [
  {
    id: 1,
    img: '/photos/9.png',
    name: 'Meera R.',
    location: 'Kochi',
    quote: 'I wore a Trividha saree to my daughter\'s first birthday. Every guest asked where I got it. The quality is extraordinary and the curation process felt so personal.',
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

const waMsg = encodeURIComponent('Hi Trividha! I saw your monthly edit and I\'d love to know more and reserve a saree.');
const waLink = `https://wa.me/917736687371?text=${waMsg}`;

export default function BestOfMonth() {
  const [active, setActive] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const testimonialsRef = useRef(null);
  const editRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setVisibleSections(v => ({ ...v, [e.target.id]: true }));
      }),
      { threshold: 0.12 }
    );
    [testimonialsRef, editRef].forEach(r => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, []);

  const current = sarees[active];

  return (
    <main className="page-wrapper">
      {/* ── Page Hero ──────────────────────────────────── */}
      <section className="best-hero">
        <div className="hero-silk-bg">
          <Silk
            speed={5}
            scale={1}
            color="#4b040e"
            noiseIntensity={1.5}
            rotation={0}
          />
        </div>
        <div className="best-hero-content container">
          <span className="section-label">March 2026 Edition</span>
          <span className="gold-line" />
          <h1>The Curator's Edit.</h1>
          <p>Our hand-selected five — sarees that stopped us mid-breath this month.</p>
        </div>
      </section>

      {/* ── Top 5 Sarees ───────────────────────────────── */}
      <section id="the-edit" ref={editRef} className={`edit-section ${visibleSections['the-edit'] ? 'visible' : ''}`} style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.6 }}>
          <FloatingLines
            linesGradient={["#3b0d0d","#e12d2d","#540303","#0e0101"]}
            animationSpeed={1}
            interactive
            bendRadius={5}
            bendStrength={-0.5}
            mouseDamping={0.05}
            parallax
            parallaxStrength={0.2}
          />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Tab nav */}
          <div className="saree-tabs">
            {sarees.map((s, i) => (
              <button key={s.id} className={`saree-tab ${i === active ? 'active' : ''}`} onClick={() => setActive(i)}>
                <span className="tab-num">0{i + 1}</span>
                <span className="tab-name">{s.name.split(' ').slice(0, 2).join(' ')}</span>
              </button>
            ))}
          </div>

          {/* Active card */}
          <div className="saree-spotlight">
            <div className="spotlight-img">
              {sarees.map((s, i) => (
                <div key={s.id} className={`spotlight-frame ${i === active ? 'show' : ''}`}>
                  <img src={s.img} alt={s.name} />
                  <div className="spotlight-img-overlay">
                    <span className="spotlight-occasion">{s.occasion}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="spotlight-info">
              <span className="section-label" style={{ color: 'var(--gold)' }}>Pick 0{active + 1} of 05</span>
              <span className="gold-line" />
              <h2 className="spotlight-name">{current.name}</h2>
              <div className="spotlight-price">{current.priceRange}</div>
              <div className="spotlight-specs">
                <div className="spec-row">
                  <span className="spec-key">Fabric</span>
                  <span className="spec-val">{current.fabric}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">Work</span>
                  <span className="spec-val">{current.work}</span>
                </div>
              </div>
              <div className="love-note">
                <span className="love-note-label">♥ Why We Love It</span>
                <p>{current.love}</p>
              </div>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary wa-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.522 5.858L0 24l6.343-1.499A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.815 9.815 0 0 1-5.006-1.371l-.36-.213-3.764.89.941-3.664-.233-.373A9.831 9.831 0 0 1 2.182 12C2.182 6.557 6.557 2.182 12 2.182S21.818 6.557 21.818 12 17.443 21.818 12 21.818z" /></svg>
                Message on WhatsApp to Reserve
              </a>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="thumb-strip">
            {sarees.map((s, i) => (
              <button key={s.id} className={`thumb ${i === active ? 'active' : ''}`} onClick={() => setActive(i)}>
                <img src={s.img} alt={s.name} />
              </button>
            ))}
          </div>
        </div>

        {/* Edit footer note */}
        <div className="edit-footer">
          <div className="ornament-divider"><span>✦</span></div>
          <p>We have many more handpicked sarees beyond this monthly edit.<br />
            <strong>Connect with us on WhatsApp and Instagram to discover more.</strong></p>
          <div className="edit-footer-btns">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary">WhatsApp Us</a>
            <a href="https://instagram.com/trividha" target="_blank" rel="noopener noreferrer" className="btn-outline">Instagram</a>
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────── */}
      <section id="testimonials" ref={testimonialsRef} className={`testimonials-section ${visibleSections.testimonials ? 'visible' : ''}`}>
        <div className="container">
          <div className="testi-header">
            <span className="section-label">Real Women, Real Moments</span>
            <span className="gold-line" style={{ margin: '0.8rem auto' }} />
            <h2 className="section-title">Love Stories.</h2>
          </div>
          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <div key={t.id} className="testi-card card-float" style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className="testi-img-wrap">
                  <img src={t.img} alt={t.name} />
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
    </main>
  );
}
