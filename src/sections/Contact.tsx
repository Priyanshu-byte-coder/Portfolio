import React from 'react';
import './Contact.css';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { PERSONAL } from '../data';

function GHIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>; }
function LIIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>; }
function XIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>; }
function IGIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>; }
function LCIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 00-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 00-1.209 2.104 5.35 5.35 0 00-.125.513 5.527 5.527 0 00.062 2.362 5.83 5.83 0 00.349 1.017 5.938 5.938 0 001.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 00-1.951-.003l-2.396 2.392a3.021 3.021 0 01-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 01.066-.523 2.545 2.545 0 01.619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 00-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0013.483 0zm-2.866 12.815a1.38 1.38 0 00-1.38 1.382 1.38 1.38 0 001.38 1.382H20.79a1.38 1.38 0 001.38-1.382 1.38 1.38 0 00-1.38-1.382z"/></svg>; }

const INFO_ROWS = [
  ['Based in', 'Ahmedabad, India'],
  ['University', 'Nirma University'],
  ['Graduating', 'July 2028'],
  ['Open to', 'AI/ML Roles & Research'],
];

export const Contact: React.FC = () => {
  const [ref, visible] = useScrollReveal(0.06);

  return (
    <section className="section contact-section" id="contact" style={{ background: 'var(--bg-warm)' }}>
      <div className="section-inner" ref={ref as React.RefObject<HTMLDivElement>}>
        <span className={`section-number reveal ${visible ? 'visible' : ''}`}>07 — Connect</span>
        <div className={`contact-big-text reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          Let's<br /><span className="outline">Talk</span>
        </div>

        <div className="contact-grid">
          <div className={`reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <p className="contact-intro">
              Open to discussing new projects, research collaborations, or opportunities in AI/ML.
              Whether you have a question or just want to say hello — reach out.
            </p>
            <a href={`mailto:${PERSONAL.email}`} className="contact-email-link">{PERSONAL.email}</a>
            <a href={`tel:${PERSONAL.phone.replace(/\s/g, '')}`} className="contact-phone-link">{PERSONAL.phone}</a>
            <p className="contact-loc">{PERSONAL.location}</p>
            <a href="/resume.pdf" download="Priyanshu_Doshi_Resume.pdf" className="contact-resume-btn">
              Download Resume
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
              </svg>
            </a>
            <div className="social-row">
              <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" className="social-btn" title="GitHub"><GHIcon /></a>
              <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn" title="LinkedIn"><LIIcon /></a>
              <a href={PERSONAL.twitter} target="_blank" rel="noopener noreferrer" className="social-btn" title="X"><XIcon /></a>
              <a href={PERSONAL.instagram} target="_blank" rel="noopener noreferrer" className="social-btn" title="Instagram"><IGIcon /></a>
              <a href={PERSONAL.leetcode} target="_blank" rel="noopener noreferrer" className="social-btn" title="LeetCode"><LCIcon /></a>
            </div>
          </div>

          <div className={`contact-info-col reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
            {INFO_ROWS.map(([label, value], i) => (
              <div key={i} className="contact-info-row">
                <div className="contact-info-label">{label}</div>
                <div className="contact-info-value">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
