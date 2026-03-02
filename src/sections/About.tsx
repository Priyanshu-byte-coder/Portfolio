import React from 'react';
import './About.css';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';
import { useInView } from '../hooks/useInView';

export const About: React.FC = () => {
    const { ref, isInView } = useInView({ threshold: 0.1 });

    return (
        <section id="about" className="about" ref={ref}>
            <div className="container">
                <div className={`reveal ${isInView ? 'active' : ''}`}>
                    <SectionHeader title="About Me" subtitle="A brief look into who I am and what I do." />
                </div>

                <div className={`about-content stagger-children ${isInView ? 'active' : ''}`}>
                    <div className="about-text-wrapper">
                        <Card className="about-text-card">
                            <p>
                                Hi, I'm <span className="text-gradient">Priyanshu Doshi</span>, a B.Tech student specializing in Artificial Intelligence and Machine Learning at the Institute of Technology, Nirma University, driven by curiosity and a strong passion for building technology that solves real-world problems.
                            </p>
                            <br />
                            <p>
                                I enjoy working at the intersection of AI, software engineering, and product development — transforming ideas into functional systems. From developing and deploying production-ready web platforms to working on machine learning research involving anomaly detection and industrial robotics, I constantly explore how intelligent systems can improve efficiency, reliability, and decision-making.
                            </p>
                            <br />
                            <p className="about-text-extended">
                                My interests extend beyond academics into startup innovation and scalable digital solutions. I've worked on projects ranging from AI-driven analytics and web-based interactive experiences to real-world problem statements in healthcare regulation and supply-chain accountability. I enjoy owning the complete development cycle — designing, building, deploying, and continuously improving products.
                            </p>
                            <br />
                            <p className="about-text-extended">
                                At my core, I'm someone who loves learning fast, building boldly, and turning ambitious ideas into reality.
                            </p>
                        </Card>
                    </div>

                    <div className="about-details">
                        <Card className="detail-card education-card">
                            <i className="fas fa-graduation-cap icon text-gradient"></i>
                            <h3>Education</h3>
                            <p className="detail-title">B.Tech in AI &amp; ML</p>
                            <p className="detail-subtitle">Institute of Technology, Nirma University</p>
                            <p className="detail-subtitle">July 2024 – July 2028</p>
                            <p className="detail-highlight">GPA: 8.85 / 10.0</p>
                        </Card>

                        <Card className="detail-card achievement-card">
                            <i className="fas fa-trophy icon text-gradient"></i>
                            <h3>Achievements</h3>
                            <ul className="achievement-list">
                                <li>
                                    <i className="fa-solid fa-code"></i> Winner – CodeAdda Premier League (1st / 200+ participants, Apr 2025)
                                </li>
                                <li>
                                    <i className="fa-solid fa-star"></i> Reliance Foundation Undergraduate Scholar (2025)
                                </li>
                            </ul>
                        </Card>

                        <a href="https://leetcode.com/u/Priyanshu_doshi/" target="_blank" rel="noopener noreferrer" className="leetcode-link-card">
                            <Card className="detail-card leetcode-card">
                                <i className="fa-solid fa-code-branch icon text-gradient"></i>
                                <div className="leetcode-content">
                                    <h3>LeetCode Profile</h3>
                                    <p>200+ Problems Solved</p>
                                </div>
                                <i className="fa-solid fa-arrow-right arrow-icon"></i>
                            </Card>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
