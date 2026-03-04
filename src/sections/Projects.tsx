import React from 'react';
import './Projects.css';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useInView } from '../hooks/useInView';

const projects = [
    {
        title: "Spectra Scan",
        subtitle: "Automated Paint Defect Detection System",
        description: "Contributed to development of a 2m × 2m × 2m gantry-based automated system for automobile paint defect inspection. Developed a centralized control application for operating and monitoring the complete inspection system. Implemented machine vision analytics for defect detection, along with a RAG-based troubleshooting assistant and WebAR visualization for industrial system monitoring and diagnostics.",
        tech: ["Computer Vision", "WebAR", "RAG", "Python", "Machine Vision"],
        demoLink: "https://drive.google.com/file/d/1LEJZ_Jpn7Zt_7WVXZNjV-yKCUqPXIFZM/view?usp=sharing",
        githubLink: "https://github.com/Mitanshp5/MECup",
        demoText: "Documentation",
        image: "/spectra_scan.png",
        icon: "fas fa-car"
    },
    {
        title: "MZHub",
        subtitle: "Full Stack Web Platform — TypeScript, Next.js",
        description: "Built and deployed a full-stack web platform for MZHub as a Full Stack Developer Intern. Developed responsive UI components, integrated backend APIs, and optimized performance. Deployed at mzhub.in serving real users.",
        tech: ["Azure Deployment","TypeScript", "Next.js", "React", "Tailwind CSS"],
        demoLink: "https://www.mzhub.in/",
        githubLink: "https://github.com/Priyanshu-byte-coder/mzhub",
        demoText: "Live Site",
        image: "/mzhub.png",
        icon: "fas fa-globe"
    },
    {
        title: "Movie Recommender System",
        subtitle: "Python, Streamlit",
        description: "Built content-based recommendation engine using cosine similarity algorithm for personalized movie suggestions. Integrated TMDb API for real-time movie posters and metadata; deployed on Streamlit with interactive user interface.",
        tech: ["Machine Learning", "Python", "Streamlit", "TMDb API"],
        demoLink: "https://movierecommender-l27gqgyeweduhskslis84n.streamlit.app/",
        githubLink: "https://github.com/Priyanshu-byte-coder/movie-recommender",
        demoText: "Live Demo",
        image: "/mv_rec.png",
        icon: "fas fa-film"
    }
];

export const Projects: React.FC = () => {
    const { ref, isInView } = useInView({ threshold: 0.1 });

    return (
        <section id="projects" className="projects" ref={ref}>
            <div className="container">
                <div className={`reveal ${isInView ? 'active' : ''}`}>
                    <SectionHeader title="Featured Projects" subtitle="A showcase of my recent ML models and web applications." />
                </div>

                <div className={`projects-grid stagger-children ${isInView ? 'active' : ''}`}>
                    {projects.map((project, index) => (
                        <Card key={index} className="project-card">
                            <div className="project-image-container">
                                {project.image ? (
                                    <img src={project.image} alt={project.title} className="project-image" />
                                ) : (
                                    <div className="project-placeholder">
                                        <i className={`${project.icon} text-gradient`}></i>
                                    </div>
                                )}
                                <div className="project-overlay"></div>
                            </div>

                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                {project.subtitle && (
                                    <span className="project-subtitle">{project.subtitle}</span>
                                )}
                                <p className="project-description">{project.description}</p>

                                <div className="project-tech">
                                    {project.tech.map((tech, i) => (
                                        <span key={i} className="tech-tag">{tech}</span>
                                    ))}
                                </div>

                                <div className="project-links">
                                    {project.demoLink && (
                                        <Button
                                            href={project.demoLink}
                                            variant="primary"
                                            className="project-btn"
                                            icon="fas fa-external-link-alt"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {project.demoText}
                                        </Button>
                                    )}
                                    {project.githubLink && (
                                        <Button
                                            href={project.githubLink}
                                            variant="outline"
                                            className="project-btn"
                                            icon="fab fa-github"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Source Code
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="projects-more-wrap">
                    <Button
                        href="https://github.com/Priyanshu-byte-coder?tab=repositories"
                        variant="outline"
                        className="projects-more-btn"
                        icon="fab fa-github"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View all repositories on GitHub
                    </Button>
                </div>
            </div>
        </section>
    );
};
