import React from 'react';
import './Certifications.css';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';
import { useInView } from '../hooks/useInView';

const certifications = [
    {
        title: "Supervised Machine Learning",
        issuer: "DeepLearning.AI (Stanford) — Coursera",
        score: "99.83%",
        icon: "fas fa-award",
        link: "https://www.coursera.org/account/accomplishments/verify/XAJRZO7BC5FV"
    },
    {
        title: "PyTorch for Deep Learning Bootcamp",
        issuer: "Udemy",
        score: "95.4%",
        icon: "fas fa-certificate",
        link: "https://www.udemy.com/certificate/UC-b6ce5ecb-878e-47f8-b575-30da33db7cca/"
    }
];

export const Certifications: React.FC = () => {
    const { ref, isInView } = useInView({ threshold: 0.1 });

    return (
        <section id="certifications" className="certifications" ref={ref}>
            <div className="container">
                <div className={`reveal ${isInView ? 'active' : ''}`}>
                    <SectionHeader title="Certifications" subtitle="Validated credentials that back up my expertise." />
                </div>

                <div className={`certs-grid stagger-children ${isInView ? 'active' : ''}`}>
                    {certifications.map((cert, i) => (
                        <a
                            key={i}
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cert-link"
                        >
                            <Card className="cert-card">
                                <div className="cert-icon-wrap">
                                    <i className={`${cert.icon} text-gradient`}></i>
                                </div>
                                <div className="cert-info">
                                    <h3 className="cert-title">{cert.title}</h3>
                                    <p className="cert-issuer">{cert.issuer}</p>
                                    {cert.score && (
                                        <span className="cert-score">
                                            <i className="fas fa-star"></i> Score: {cert.score}
                                        </span>
                                    )}
                                </div>
                                <i className="fas fa-external-link-alt cert-arrow"></i>
                            </Card>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
