import React from 'react';
import './Hero.css';
import { Button } from '../components/Button';

interface HeroProps {
    revealed?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ revealed = false }) => {
    const r = revealed ? 'hero--revealed' : '';

    return (
        <section id="home" className={`hero ${r}`}>
            <div className="container hero-content">
                <div className="hero-text">
                    <p className={`hero-greeting text-gradient hero-anim hero-anim--1`}>Hi, I am</p>
                    <h1 className={`hero-title hero-anim hero-anim--2`}>
                        Priyanshu Doshi
                    </h1>
                    <h2 className={`hero-subtitle hero-anim hero-anim--3`}>
                        AI &amp; Machine Learning Engineer
                    </h2>
                    <p className={`hero-description hero-anim hero-anim--4`}>
                        Passionate about building intelligent solutions, from exploring the frontiers of machine learning to crafting performant web experiences. I teach machines how to think while I'm still figuring out how to get 8 hours of sleep.
                    </p>

                    <div className={`hero-actions hero-anim hero-anim--5`}>
                        <Button href="#projects" variant="primary">
                            View Projects
                        </Button>
                        <Button href="#contact" variant="outline">
                            Contact Me
                        </Button>
                    </div>

                    <div className={`hero-stats hero-anim hero-anim--6`}>
                        <div className="stat">
                            <span className="stat-number text-gradient">200+</span>
                            <span className="stat-label">LeetCode<br />Problems</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <span className="stat-number text-gradient">1</span>
                            <span className="stat-label">IEEE<br />Publication</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <span className="stat-number text-gradient">8.85</span>
                            <span className="stat-label">GPA<br />/ 10.0</span>
                        </div>
                    </div>
                </div>

                <div className={`hero-visual hero-anim hero-anim--3`}>
                    <div className="image-wrapper">
                        <div className="glow-ring"></div>
                        <img src="/1.jpeg" alt="Priyanshu Doshi" className="hero-image" />

                        {/* Floating decorator elements */}
                        <div className="floating-badge badge-1 glass-panel">
                            <i className="fas fa-brain text-gradient"></i> AI/ML
                        </div>
                        <div className="floating-badge badge-2 glass-panel">
                            <i className="fas fa-code text-gradient"></i> Full Stack
                        </div>
                    </div>
                </div>
            </div>

            <div className={`scroll-indicator hero-anim hero-anim--7`}>
                <a href="#dashboard" aria-label="Scroll down">
                    <div className="mouse">
                        <div className="wheel"></div>
                    </div>
                </a>
            </div>
        </section>
    );
};
