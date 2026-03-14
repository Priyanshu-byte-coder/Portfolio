import React from 'react';
import './Experience.css';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';
import { useInView } from '../hooks/useInView';

const experiences = [
    {
        role: "Artificial Intelligence Engineer",
        company: "Team CON-SOL-E",
        duration: "Jan 2026 – Mar 2026",
        type: "Full-time · On-site",
        description: [
            "Worked as an AI engineer on RAG-based intelligent agents tailored to real-world problem statements.",
            "Contributed to Web development, WebAR, and app experiences as part of a high-performing hackathon team.",
            "Collaborated on AI-driven solutions from ideation to prototype deployment in Ahmedabad, Gujarat, India."
        ],
        icon: "fas fa-brain"
    },
    {
        role: "Full Stack Developer Intern",
        company: "MZHUB Faithtech (Remote)",
        duration: "Dec 2025 – Dec 2025",
        type: "Remote",
        description: [
            "Developed and maintained a production-ready business website using Next.js with focus on responsive and scalable frontend architecture.",
            "Implemented automated contact form functionality with email notifications.",
            "Deployed and managed the live application on Microsoft Azure App Service ensuring reliable cloud hosting and availability."
        ],
        icon: "fas fa-code",
        link: "https://www.mzhub.in/"
    },
    {
        role: "AI/ML Intern",
        company: "Elevate Labs (Remote)",
        duration: "May 2025 – June 2025",
        type: "Remote",
        description: [
            "Top performer among AI/ML interns; developed end-to-end AI solutions including data preprocessing, feature engineering, model training, and evaluation.",
            "Applied Natural Language Processing (NLP) and Computer Vision techniques using PyTorch, Scikit-learn, and TensorFlow in production-level projects."
        ],
        icon: "fas fa-robot"
    },
    {
        role: "Vice Chair",
        company: "ACM Student Chapter, Nirma University",
        duration: "Sep 2025 – Present",
        type: "Leadership",
        description: [
            "Led planning and execution of technical workshops, hackathons, and industry-oriented events for 500+ students.",
            "Coordinated with faculty and industry professionals to organize seminars on emerging AI technologies and ethical AI practices."
        ],
        icon: "fas fa-users"
    }
];

export const Experience: React.FC = () => {
    const { ref, isInView } = useInView({ threshold: 0.1 });

    return (
        <section id="experience" className="experience" ref={ref}>
            <div className="container">
                <div className={`reveal ${isInView ? 'active' : ''}`}>
                    <SectionHeader title="Experience" subtitle="My professional journey and leadership roles." />
                </div>

                <div className={`timeline stagger-children ${isInView ? 'active' : ''}`}>
                    {experiences.map((exp, index) => (
                        <div className="timeline-item" key={index}>
                            <div className="timeline-marker">
                                <i className={exp.icon}></i>
                            </div>
                            <div className="timeline-content">
                                <Card className="experience-card">
                                    <div className="experience-header">
                                        <h3>{exp.role}</h3>
                                        <span className="duration text-gradient">{exp.duration}</span>
                                    </div>
                                    <h4 className="company">
                                        {exp.company} <span className="type-badge">{exp.type}</span>
                                    </h4>
                                    <ul className="experience-list">
                                        {exp.description.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </Card>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
