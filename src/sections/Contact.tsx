import React from 'react';
import './Contact.css';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useInView } from '../hooks/useInView';

export const Contact: React.FC = () => {
    const { ref, isInView } = useInView({ threshold: 0.1 });

    return (
        <section id="contact" className="contact" ref={ref}>
            <div className="container">
                <div className={`reveal ${isInView ? 'active' : ''}`}>
                    <SectionHeader title="Get In Touch" subtitle="Have a project in mind or want to challenge me to a game of chess? Let's talk!" />
                </div>

                <div className={`contact-content stagger-children ${isInView ? 'active' : ''}`}>
                    <div className="contact-cards">
                        <Card className="contact-card">
                            <i className="fas fa-envelope contact-icon text-gradient"></i>
                            <h3>Email</h3>
                            <p>doshipriyanshu3@gmail.com</p>
                            <a href="mailto:doshipriyanshu3@gmail.com" className="contact-link">Write a message</a>
                        </Card>

                        <Card className="contact-card">
                            <i className="fas fa-phone contact-icon text-gradient"></i>
                            <h3>Phone</h3>
                            <p>+91 9549926195</p>
                            <a href="tel:+919549926195" className="contact-link">Call me</a>
                        </Card>

                        <Card className="contact-card">
                            <i className="fas fa-map-marker-alt contact-icon text-gradient"></i>
                            <h3>Location</h3>
                            <p>Ahmedabad, Gujarat</p>
                            <span className="contact-link">Open in Maps</span>
                        </Card>
                    </div>

                    <Card className="social-card">
                        <h3>Connect with me</h3>
                        <p>Find me on these platforms to see more of my work, or just to say hi.</p>

                        <div className="social-links">
                            <a href="https://www.linkedin.com/in/priyanshu-doshi-21a54230a/" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <i className="fab fa-linkedin"></i>
                            </a>
                            <a href="https://github.com/Priyanshu-byte-coder" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="https://x.com/Priyanshu_26_11" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="https://www.instagram.com/priyyannshoo/" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>

                        <div className="direct-actions">
                            <Button href="/resume.pdf" variant="primary" icon="fas fa-download" download>
                                Download Resume
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
};
