import { useEffect, useRef, useState } from 'react';
import LightRays from '../components/LightRays/LightRays';
import './AboutUs.css';
import Particles from './Particles';

const team = [
  {
    id: 1,
    name: 'Vijayalekshmi',
    role: 'Founder & Chief Curator',
    relation: 'The Mother',
    quote: '"A saree is not just fabric — it is a language only a woman truly speaks."',
    img: '/photos/team.png',
    initial: 'V',
  },
  {
    id: 2,
    name: 'Sethuparvathy',
    role: 'Creative Director & Storyteller',
    relation: 'The Daughter',
    quote: '"Every collection we build is a love letter to the women who wore sarees before us."',
    img: null,
    initial: 'S',
  },
  {
    id: 3,
    name: 'Aparna',
    role: 'Brand Stylist & Community Lead',
    relation: 'Daughter by Destiny',
    quote: '"When you drape a Trividha saree, you carry centuries of grace in six yards."',
    img: null,
    initial: 'A',
  },
];

const pillars = [
  {
    icon: '◈',
    title: 'Vision',
    desc: 'To make every Indian woman feel the timeless grace of a handpicked saree — no matter the occasion, budget, or milestone. We envision a world where heritage textiles thrive through heartfelt curation.',
  },
  {
    icon: '◇',
    title: 'Mission',
    desc: 'To curate handloom and traditional sarees with deep intention, personal styling guidance, and a commitment to authenticity — bringing the warmth of a family recommendation to every purchase.',
  },
  {
    icon: '✦',
    title: 'Core Values',
    desc: 'Authenticity. Grace. Accessibility. Community. We believe in sarees that last a lifetime, relationships built on trust, and the quiet power of a woman beautifully adorned.',
  },
];

export default function AboutUs() {
  const [visibleSections, setVisibleSections] = useState({});
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setVisibleSections(v => ({ ...v, [e.target.dataset.id]: true }));
      }),
      { threshold: 0.12 }
    );
    refs.current.forEach(r => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="page-wrapper">
      {/* ── About Hero ──────────────────────────────────── */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <LightRays
            raysOrigin="top-center"
            raysColor="#cfc76bff"
            raysSpeed={1.5}
            lightSpread={1.2}
            rayLength={4.5}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1.8}
            saturation={1.2}
          />
        </div>
        <div className="container about-hero-content">
          <span className="section-label">The Trividha Family</span>
          <span className="gold-line" />
          <h1>Meet The Team…<br /><em>Meet The Family.</em></h1>
          <p className="about-hero-sub">Three women. One shared love for the art of the saree. And an unshakeable belief that every woman deserves to feel like poetry.</p>
        </div>
      </section>

      {/* ── Team Cards ──────────────────────────────────── */}
      <section className="team-section" data-id="team" ref={el => refs.current[0] = el} style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'var(--white)' }}>
          <Particles
            particleColors={["#4b040e"]}
            particleCount={300}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={200}
            moveParticlesOnHover
            alphaParticles={false}
            disableRotation={false}
            pixelRatio={1}
          />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className={`team-grid ${visibleSections.team ? 'visible' : ''}`}>
            {team.map((member, i) => (
              <div key={member.id} className="team-card card-float" style={{ transitionDelay: `${i * 0.18}s` }}>
                <div className="team-card-top">
                  <div className="member-photo">
                    {member.img
                      ? <img src={member.img} alt={member.name} />
                      : <div className="member-initial">{member.initial}</div>
                    }
                  </div>
                  <div className="member-badge">{member.relation}</div>
                </div>
                <div className="team-card-body">
                  <h3 className="member-name">{member.name}</h3>
                  <span className="member-role">{member.role}</span>
                  <span className="gold-line" style={{ margin: '1rem 0' }} />
                  <p className="member-quote">{member.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Pillars ───────────────────────────────── */}
      <section className="pillars-section" data-id="pillars" ref={el => refs.current[1] = el}>
        <div className="pillars-bg-strip" />
        <div className="container">
          <div className="pillars-header">
            <span className="section-label">What We Stand For</span>
            <span className="gold-line" style={{ margin: '0.8rem auto' }} />
            <h2 className="section-title">The Trividha Promise.</h2>
          </div>
          <div className={`pillars-grid ${visibleSections.pillars ? 'visible' : ''}`}>
            {pillars.map((p, i) => (
              <div key={i} className="pillar-card" style={{ transitionDelay: `${i * 0.2}s` }}>
                <div className="pillar-icon-wrap">
                  <span className="pillar-icon">{p.icon}</span>
                </div>
                <h3 className="pillar-title">{p.title}</h3>
                <p className="pillar-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote Banner ────────────────────────────────── */}
      <section className="quote-banner">
        <div className="container">
          <div className="ornament-divider"><span>✦</span></div>
          <blockquote className="brand-quote">
            "We don't just sell sarees. We pass on traditions, stories, and the quiet inheritance of grace — one drape at a time."
          </blockquote>
          <p className="quote-attr">— The Trividha Family</p>
        </div>
      </section>
    </main>
  );
}
