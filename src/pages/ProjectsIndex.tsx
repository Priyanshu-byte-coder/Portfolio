import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProjectPage.css'; // shared header/footer styles
import './ProjectsIndex.css';
import { PROJECT_DETAILS } from '../projects-data';
import { useScrollReveal } from '../hooks/useScrollReveal';

function IndexRow({ p, i }: { p: (typeof PROJECT_DETAILS)[number]; i: number }) {
  const [ref, visible] = useScrollReveal(0.05);
  return (
    <Link
      to={`/projects/${p.id}`}
      ref={ref as React.RefObject<HTMLAnchorElement>}
      className={`pi-row reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${(i % 6) * 0.05}s`, '--p-accent': p.accent } as React.CSSProperties}
    >
      <span className="pi-num">{String(i + 1).padStart(2, '0')}</span>
      <span className="pi-title">{p.title}</span>
      <span className="pi-cat">{p.category}</span>
      <span className="pi-year">{p.year}</span>
      <span className="pi-arrow">→</span>
    </Link>
  );
}

export const ProjectsIndex: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Projects — Priyanshu Doshi';
    return () => { document.title = 'Priyanshu Doshi — AI & ML Engineer'; };
  }, []);

  return (
    <div className="pi-root">
      <header className="pp-header">
        <Link to="/" className="pp-back">← Index</Link>
        <Link to="/" className="pp-logo">PD<span>.</span></Link>
        <a href="/#contact" className="pp-all">Contact</a>
      </header>

      <div className="pi-hero">
        <span className="pi-eyebrow">The full record</span>
        <h1>All<br /><em>Projects</em></h1>
        <p>{PROJECT_DETAILS.length} projects — industrial vision, edge AI, open source, voice agents, quant. Every one has a dedicated page.</p>
      </div>

      <div className="pi-list">
        {PROJECT_DETAILS.map((p, i) => <IndexRow key={p.id} p={p} i={i} />)}
      </div>

      <footer className="pp-footer">
        <p>PRIYANSHU DOSHI</p>
        <p>{new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};
