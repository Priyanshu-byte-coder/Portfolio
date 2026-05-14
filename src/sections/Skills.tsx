import React, { useState } from 'react';
import './Skills.css';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SKILL_CATEGORIES } from '../data';

export const Skills: React.FC = () => {
  const [ref, visible] = useScrollReveal(0.06);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const cats = Object.entries(SKILL_CATEGORIES);

  return (
    <section className="section" id="skills">
      <div className="section-inner" ref={ref as React.RefObject<HTMLDivElement>}>
        <span className={`section-number reveal ${visible ? 'visible' : ''}`}>03 — Toolkit</span>
        <h2 className={`section-heading reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          Skills &amp; <span className="thin">Technologies</span>
        </h2>
        <div className="skills-matrix">
          {cats.map(([cat, skills], ci) => (
            <div
              key={cat}
              className={`skill-row reveal ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${0.15 + ci * 0.08}s` }}
            >
              <div className="skill-cat">{cat}</div>
              <div className="skill-items">
                {skills.map((s, si) => (
                  <span
                    key={s}
                    className="skill-tag"
                    onMouseEnter={() => setHoveredSkill(s)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    style={{
                      transitionDelay: visible ? `${si * 0.02}s` : '0s',
                      borderColor: hoveredSkill === s ? 'var(--accent)' : undefined,
                      color: hoveredSkill === s ? 'var(--accent)' : undefined,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
