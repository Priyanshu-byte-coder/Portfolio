import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ProjectPage.css';
import { PROJECT_BY_ID, nextProject } from '../projects-data';
import { ProjectMotif } from '../components/ProjectMotif';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * Media is discovered automatically: drop files into
 *   src/assets/projects/<project-id>/
 * and they render in the gallery. Empty folder (or no folder) = no gallery.
 */
const MEDIA_FILES = import.meta.glob(
  '../assets/projects/*/*.{png,jpg,jpeg,webp,gif,svg,mp4,webm}',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>;

function mediaFor(id: string): { url: string; isVideo: boolean; name: string }[] {
  return Object.entries(MEDIA_FILES)
    .filter(([path]) => path.includes(`/projects/${id}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, url]) => ({
      url,
      isVideo: /\.(mp4|webm)$/i.test(path),
      name: path.split('/').pop()?.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ') ?? '',
    }));
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, visible] = useScrollReveal(0.08);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? PROJECT_BY_ID[id] : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) document.title = `${project.title} — Priyanshu Doshi`;
    return () => { document.title = 'Priyanshu Doshi — AI & ML Engineer'; };
  }, [project]);

  if (!project) {
    return (
      <div className="pp-root">
        <header className="pp-header">
          <Link to="/" className="pp-back">← Index</Link>
          <Link to="/" className="pp-logo">PD<span>.</span></Link>
        </header>
        <div className="pp-notfound">
          <span className="pp-eyebrow">404</span>
          <h1>No such project on record.</h1>
          <Link to="/projects" className="pp-cta">All projects →</Link>
        </div>
      </div>
    );
  }

  const media = mediaFor(project.id);
  // Any file whose name starts with "cover" becomes the full-width hero image;
  // the rest go to the gallery.
  const cover = media.find((m) => m.name.toLowerCase().startsWith('cover'));
  const gallery = media.filter((m) => m !== cover);
  const next = nextProject(project.id);

  return (
    <div className="pp-root" style={{ '--p-accent': project.accent } as React.CSSProperties}>
      <header className="pp-header">
        <Link to="/" className="pp-back">← Index</Link>
        <Link to="/" className="pp-logo">PD<span>.</span></Link>
        <Link to="/projects" className="pp-all">All Projects</Link>
      </header>

      {/* ── Hero ── */}
      <section className="pp-hero">
        <span className="pp-eyebrow">{project.category}</span>
        <h1 className="pp-title">{project.title}</h1>
        <p className="pp-subtitle">{project.subtitle}</p>
        {project.badge && <div className="pp-badge">{project.badge}</div>}

        <div className="pp-meta">
          <div><span>Year</span>{project.year}</div>
          <div><span>Role</span>{project.role}</div>
          <div className="pp-meta-links">
            <span>Links</span>
            {project.links.length > 0
              ? project.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>
                ))
              : <em>Private / on request</em>}
          </div>
        </div>
      </section>

      {/* ── Signature motif ── */}
      <Reveal className="pp-motif">
        <ProjectMotif kind={project.motif} terminal={project.terminal} />
      </Reveal>

      {/* ── Cover image (drop cover.* into the project's media folder) ── */}
      {cover && (
        <Reveal className="pp-cover">
          {cover.isVideo
            ? <video src={cover.url} autoPlay loop muted playsInline />
            : <img src={cover.url} alt={`${project.title} cover`} />}
        </Reveal>
      )}

      {/* ── Numbers band ── */}
      <Reveal className="pp-numbers">
        {project.numbers.map((n) => (
          <div key={n.label} className="pp-number">
            <div className="pp-number-val">{n.value}</div>
            <div className="pp-number-label">{n.label}</div>
          </div>
        ))}
      </Reveal>

      {/* ── Summary ── */}
      <section className="pp-section">
        <Reveal><p className="pp-summary">{project.summary}</p></Reveal>
      </section>

      {/* ── Story ── */}
      <section className="pp-section">
        {project.story.map((s, i) => (
          <Reveal key={s.heading} delay={i * 0.05} className="pp-story-row">
            <div className="pp-story-num">{String(i + 1).padStart(2, '0')}</div>
            <div className="pp-story-head">{s.heading}</div>
            <p className="pp-story-body">{s.body}</p>
          </Reveal>
        ))}
      </section>

      {/* ── Highlights ── */}
      <section className="pp-section">
        <Reveal>
          <div className="pp-label">Highlights</div>
          <ul className="pp-highlights">
            {project.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </Reveal>
      </section>

      {/* ── Media (auto-discovered; hidden when empty) ── */}
      {gallery.length > 0 && (
        <section className="pp-section">
          <Reveal>
            <div className="pp-label">Gallery</div>
            <div className="pp-gallery">
              {gallery.map((m) => (
                <figure key={m.url} className="pp-media">
                  {m.isVideo
                    ? <video src={m.url} controls muted playsInline />
                    : <img src={m.url} alt={m.name} loading="lazy" />}
                  <figcaption>{m.name}</figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* ── Tech ── */}
      <section className="pp-section">
        <Reveal>
          <div className="pp-label">Stack</div>
          <div className="pp-tech">
            {project.tech.map((t) => <span key={t}>{t}</span>)}
          </div>
        </Reveal>
      </section>

      {/* ── Next project ── */}
      <Link to={`/projects/${next.id}`} className="pp-next">
        <span className="pp-next-label">Next project</span>
        <span className="pp-next-title">{next.title} →</span>
        <span className="pp-next-sub">{next.subtitle}</span>
      </Link>

      <footer className="pp-footer">
        <p>PRIYANSHU DOSHI</p>
        <p>{new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};
