import React, { useState } from 'react';
import './About.css';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { EXPERIENCES } from '../data';

const ExpItem: React.FC<{ exp: typeof EXPERIENCES[number]; delay: string; visible: boolean }> = ({ exp, delay, visible }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`exp-item reveal ${visible ? 'visible' : ''} ${open ? 'exp-open' : ''}`}
      style={{ transitionDelay: delay }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="exp-when">{exp.duration}</div>
      <div className="exp-content">
        <div className="exp-header">
          <div>
            <div className="exp-role">{exp.role}</div>
            <div className="exp-company">{exp.company} <span className="exp-type">· {exp.type}</span></div>
          </div>
          <span className={`exp-chevron ${open ? 'exp-chevron-open' : ''}`}>▾</span>
        </div>
        <div className={`exp-details ${open ? 'exp-details-open' : ''}`}>
          <p className="exp-desc">{exp.desc}</p>
        </div>
      </div>
    </div>
  );
};

export const About: React.FC = () => {
  const [ref, visible] = useScrollReveal(0.06);

  return (
    <section className="section" id="about" style={{ background: 'var(--bg-warm)' }}>
      <div className="section-inner" ref={ref as React.RefObject<HTMLDivElement>}>
        <span className={`section-number reveal ${visible ? 'visible' : ''}`}>01 — About</span>
        <h2 className={`section-heading reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          Who I <span className="thin">Am</span>
        </h2>

        <div className="about-split">
          <div>
            <p className={`about-text reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
              <span className="about-highlight">B.Tech student at Nirma University</span> specializing in AI/ML.
              I build intelligent systems end-to-end — from industrial computer vision and edge AI to
              full-stack platforms with GenAI.
            </p>
            <p className={`about-text reveal ${visible ? 'visible' : ''}`} style={{ marginTop: 20, transitionDelay: '0.3s' }}>
              From winning national hackathons and publishing in <span className="about-highlight">IEEE</span> to
              building privacy-preserving edge AI on Raspberry Pi — I ship systems that work in the real world,
              not just on paper.
            </p>
            <div className={`about-edu reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
              <div className="about-edu-title">Nirma University — Institute of Technology</div>
              <div className="about-edu-detail">B.Tech Artificial Intelligence &amp; Machine Learning · 2024 — 2028</div>
              <div className="about-edu-detail" style={{ marginTop: 8 }}>
                CGPA: <span className="about-edu-stat">8.65</span>&nbsp;·&nbsp;
                Class XII: <span className="about-edu-stat">96.7%</span>&nbsp;·&nbsp;
                Percentile: <span className="about-edu-stat">99.1</span>
              </div>
            </div>
          </div>

          <div className="exp-list">
            <h3 className={`exp-heading reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.15s' }}>Experience</h3>
            {EXPERIENCES.map((exp, i) => (
              <ExpItem
                key={i}
                exp={exp}
                delay={`${0.2 + i * 0.1}s`}
                visible={visible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
