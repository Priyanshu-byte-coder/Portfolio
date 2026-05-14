import React, { useState, useEffect } from 'react';
import './Hero.css';
import { PERSONAL } from '../data';

const ROTATING_TITLES = ['AI Engineer', 'Full-Stack Dev', 'ML Researcher', 'Hackathon Winner', 'IEEE Published'];

function RotatingTitle() {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ROTATING_TITLES.length);
        setShow(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="rotating-title-wrap">
      <span className={`rotating-title ${show ? 'show' : ''}`}>{ROTATING_TITLES[index]}</span>
    </span>
  );
}

interface HeroProps {
  revealed?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ revealed = false }) => {
  const enter = (delay: number): React.CSSProperties => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(60px)',
    transition: `opacity 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <section className="hero" id="home">
      <div className="hero-grain" />

      {/* Abstract geometry */}
      <div className="hero-geo" aria-hidden="true">
        <div className="geo-circle geo-1" />
        <div className="geo-circle geo-2" />
        <div className="geo-line geo-3" />
        <div className="geo-line geo-4" />
        <div className="geo-dot geo-5" />
        <div className="geo-dot geo-6" />
        <div className="geo-dot geo-7" />
      </div>

      {/* Top meta row — in normal flow, no absolute positioning */}
      <div className="hero-top" style={enter(0.3)}>
        <div className="hero-meta">
          Based in Ahmedabad, India<br />
          B.Tech AI/ML · Nirma University<br />
          CGPA 8.85 / 10.0
        </div>
        <div className="hero-status">
          <span className="status-dot" />
          Available for opportunities
        </div>
      </div>

      {/* Flexible spacer pushes name block toward bottom */}
      <div className="hero-spacer" />

      <div className="hero-name-block">
        <h1 className="hero-name">
          <span className="split" style={enter(0.15)}>
            Priyan<span className="accent-char">s</span>hu
          </span>
          <span className="split outline" style={enter(0.3)}>Doshi</span>
        </h1>
        <div className="hero-role" style={enter(0.5)}>
          <span className="hero-role-static">I'm a</span>
          <RotatingTitle />
        </div>
      </div>

      <div className="hero-bottom">
        <p className="hero-tagline" style={enter(0.55)}>
          {PERSONAL.tagline}
        </p>
        <a href="#projects" className="hero-scroll-cta" style={enter(0.65)}>
          <span className="cta-line" />
          Scroll to explore
        </a>
      </div>
    </section>
  );
};
