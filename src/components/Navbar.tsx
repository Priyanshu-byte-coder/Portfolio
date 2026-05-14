import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { PERSONAL } from '../data';

const NAV_LINKS = [
  ['About', '#about'],
  ['Projects', '#projects'],
  ['Skills', '#skills'],
  ['Research', '#research'],
  ['GitHub', '#github'],
  ['Contact', '#contact'],
] as const;

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="#home" className="nav-logo">
          PD<span className="dot">.</span>
        </a>
        <ul className="nav-links">
          {NAV_LINKS.map(([label, href]) => (
            <li key={href}><a href={href}>{label}</a></li>
          ))}
          <li><Link to="/chat" className="nav-chat-link">Chat</Link></li>
        </ul>
        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`hamburger ${mobileOpen ? 'open' : ''}`}>
            <span /><span /><span />
          </span>
        </button>
      </nav>

      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-content">
          {NAV_LINKS.map(([label, href], i) => (
            <a
              key={href}
              href={href}
              className="mobile-drawer-link"
              style={{ transitionDelay: mobileOpen ? `${0.05 + i * 0.05}s` : '0s' }}
              onClick={() => setMobileOpen(false)}
            >
              <span className="mobile-drawer-num">{String(i + 1).padStart(2, '0')}</span>
              {label}
            </a>
          ))}
          <Link
            to="/chat"
            className="mobile-drawer-link"
            style={{ transitionDelay: mobileOpen ? `${0.05 + NAV_LINKS.length * 0.05}s` : '0s' }}
            onClick={() => setMobileOpen(false)}
          >
            <span className="mobile-drawer-num">{String(NAV_LINKS.length + 1).padStart(2, '0')}</span>
            Chat
          </Link>
          <div className="mobile-drawer-footer">
            <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={PERSONAL.twitter} target="_blank" rel="noopener noreferrer">X</a>
          </div>
        </div>
      </div>
    </>
  );
};
