import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { FEATURED_PROJECTS, SECONDARY_PROJECTS } from '../data';
import type { FeaturedProject, SecondaryProject } from '../data';
import { PROJECT_LINKS } from '../project-links';

function FeaturedProjectCard({ project, index }: { project: FeaturedProject; index: number }) {
  const [ref, visible] = useScrollReveal(0.08);
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, '0');
  // Merge links: project-links.ts overrides data.ts (empty string = hide button)
  const links = { ...project.links, ...PROJECT_LINKS[project.id] };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`fp-card reveal ${visible ? 'visible' : ''} ${hovered ? 'hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="fp-number">{num}</div>
      <div className="fp-left">
        <div className="fp-badge">{project.badge}</div>
        <h3 className="fp-title">{project.title}</h3>
        <p className="fp-subtitle">{project.subtitle}</p>
        <p className="fp-desc">{project.description}</p>
      </div>
      <div className="fp-right">
        <div className="fp-tech-row">
          {project.tech.map((t, ti) => (
            <span
              key={t}
              className="fp-tech-tag"
              style={{ transitionDelay: hovered ? `${ti * 0.03}s` : '0s' }}
            >{t}</span>
          ))}
        </div>
        <div className="fp-metrics-row">
          {project.metrics.map((m) => (
            <div key={m.label} className="fp-metric">
              <div className="fp-metric-val">{m.value}</div>
              <div className="fp-metric-label">{m.label}</div>
            </div>
          ))}
        </div>
        <div className="fp-links-row">
          {links.github && (
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="fp-link-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              Code
            </a>
          )}
          {links.docs && (
            <a href={links.docs} target="_blank" rel="noopener noreferrer" className="fp-link-btn">Docs</a>
          )}
          {links.video && (
            <a href={links.video} target="_blank" rel="noopener noreferrer" className="fp-link-btn">Video</a>
          )}
          <Link to={`/projects/${project.id}`} className="fp-link-btn fp-link-more">
            View Project →
          </Link>
        </div>
      </div>
    </div>
  );
}

function SecondaryProjectCell({ project, index }: { project: SecondaryProject; index: number }) {
  const [ref, visible] = useScrollReveal(0.06);
  return (
    <Link
      to={`/projects/${project.id}`}
      ref={ref as React.RefObject<HTMLAnchorElement>}
      className={`sp-cell reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.07}s` }}
    >
      <div className="sp-tag">{project.tag}</div>
      <h4 className="sp-title">{project.title}</h4>
      <p className="sp-desc">{project.desc}</p>
      {project.stat && <div className="sp-stat">{project.stat}</div>}
      <div className="sp-tech-mini">
        {project.tech.map((t) => <span key={t}>{t}</span>)}
      </div>
      <div className="sp-more">View project →</div>
    </Link>
  );
}

export const Projects: React.FC = () => {
  const [ref, visible] = useScrollReveal(0.04);

  return (
    <section className="section" id="projects">
      <div className="section-inner" ref={ref as React.RefObject<HTMLDivElement>}>
        <span className={`section-number reveal ${visible ? 'visible' : ''}`}>02 — Work</span>
        <h2 className={`section-heading reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          Featured<br /><span className="thin">Projects</span>
        </h2>

        <div className="fp-list">
          {FEATURED_PROJECTS.map((p, i) => (
            <FeaturedProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        <div style={{ marginTop: 80 }}>
          <span className={`section-number reveal ${visible ? 'visible' : ''}`}>02.B</span>
          <h2
            className={`section-heading reveal ${visible ? 'visible' : ''}`}
            style={{ fontSize: 'clamp(28px,4vw,40px)', marginBottom: 0 }}
          >
            More <span className="thin">Work</span>
          </h2>
          <div className="sp-grid">
            {SECONDARY_PROJECTS.map((p, i) => (
              <SecondaryProjectCell key={p.title} project={p} index={i} />
            ))}
          </div>
          <Link to="/projects" className="sp-all-link">
            All projects — the full record →
          </Link>
        </div>
      </div>
    </section>
  );
};
