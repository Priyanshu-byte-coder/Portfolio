import React from 'react';
import './Achievements.css';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ACHIEVEMENTS, CERTIFICATIONS } from '../data';

export const Achievements: React.FC = () => {
  const [ref, visible] = useScrollReveal(0.06);

  return (
    <section className="section" id="achievements" style={{ background: 'var(--bg-warm)' }}>
      <div className="section-inner" ref={ref as React.RefObject<HTMLDivElement>}>
        <span className={`section-number reveal ${visible ? 'visible' : ''}`}>06 — Recognition</span>
        <h2 className={`section-heading reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          Achieve<span className="thin">ments</span>
        </h2>

        <div className="ach-row">
          {ACHIEVEMENTS.map((a, i) => (
            <div
              key={i}
              className={`ach-cell reveal ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${0.15 + i * 0.07}s` }}
            >
              <div className="ach-color-bar" style={{ background: a.color }} />
              <div className="ach-label">{a.title}</div>
              <div className="ach-desc">{a.desc}</div>
            </div>
          ))}
        </div>

        <div className={`reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.5s', marginTop: 48 }}>
          <span className="section-number">06.B — Certifications</span>
          <div className="cert-row">
            {CERTIFICATIONS.map((c, i) => (
              <a key={i} href={c.link} target="_blank" rel="noopener noreferrer" className="cert-card">
                <div>
                  <div className="cert-name">{c.title}</div>
                  <div className="cert-org">{c.org}</div>
                </div>
                <div className="cert-score">{c.score}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
