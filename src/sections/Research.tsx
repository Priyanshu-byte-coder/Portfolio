import React from 'react';
import './Research.css';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useInView } from '../hooks/useInView';

export const Research: React.FC = () => {
    const { ref, isInView } = useInView({ threshold: 0.1 });

    return (
        <section id="research" className="research" ref={ref}>
            <div className="container">
                <div className={`reveal ${isInView ? 'active' : ''}`}>
                    <SectionHeader title="Research & Publications" subtitle="My academic contributions to the field of AI and industrial application." />
                </div>

                <div className={`reveal-scale ${isInView ? 'active' : ''}`} style={{ transitionDelay: '0.2s' }}>
                <Card className="research-card">
                    <div className="research-content-grid">
                        <div className="research-info">
                            <span className="publication-badge">IEEE Sensors Letters (2026)</span>
                            <h3 className="research-title">
                                Robotic Arm Fault Detection using CatBoost Classifier
                            </h3>

                            <div className="research-metrics">
                                <div className="metric">
                                    <i className="fas fa-bullseye icon text-gradient"></i>
                                    <div className="metric-text">
                                        <strong>97.20%</strong>
                                        <span>Accuracy</span>
                                    </div>
                                </div>
                                <div className="metric">
                                    <i className="fas fa-chart-line icon text-gradient"></i>
                                    <div className="metric-text">
                                        <strong>0.9718</strong>
                                        <span>F1 Score</span>
                                    </div>
                                </div>
                            </div>

                            <p className="research-abstract">
                                Proposed a CatBoost-based anomaly detection system for predictive industrial fault detection. Evaluated using the CASPER robotic arm dataset, this model successfully outperformed traditional baseline algorithms including SVM, Logistic Regression, Naive Bayes, and Quadratic Discriminant Analysis.
                            </p>

                            <div className="research-actions">
                                <Button
                                    href="https://ieeexplore.ieee.org/document/11359621"
                                    variant="primary"
                                    icon="fas fa-book-open"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Read IEEE Paper
                                </Button>
                            </div>
                        </div>

                        <div className="research-visual">
                            <div className="research-graphic">
                                <div className="graphic-circle outer"></div>
                                <div className="graphic-circle middle"></div>
                                <div className="graphic-circle inner">
                                    <img src="/logo_apscon.png" alt="APSCON Logo" className="research-logo" />
                                </div>

                                <div className="data-node n1">CatBoost</div>
                                <div className="data-node n2">Sensors</div>
                                <div className="data-node n3">Industrial AI</div>
                            </div>
                        </div>
                    </div>
                </Card>
                </div>
            </div>
        </section>
    );
};
