import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Button } from './Button';

export const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="container nav-content">
                <a href="#home" className="logo text-gradient" onClick={closeMenu}>
                    PD.
                </a>

                <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <a href="#about" onClick={closeMenu}>About</a>
                    <a href="#experience" onClick={closeMenu}>Experience</a>
                    <a href="#projects" onClick={closeMenu}>Projects</a>
                    <a href="#research" onClick={closeMenu}>Research</a>
                    <a href="#skills" onClick={closeMenu}>Skills</a>
                    <a href="#contact" onClick={closeMenu}>Contact</a>

                    <Button
                        href="/resume.pdf"
                        variant="outline"
                        icon="fas fa-download"
                        className="resume-btn"
                        download
                    >
                        Resume
                    </Button>
                </div>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </div>
        </nav>
    );
};
