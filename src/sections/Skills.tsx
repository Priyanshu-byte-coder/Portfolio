import React from 'react';
import './Skills.css';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';
import { useInView } from '../hooks/useInView';

const skillCategories = [
    {
        title: "Programming Languages",
        icon: "fas fa-code",
        skills: ["Python", "C++", "C", "TypeScript", "JavaScript", "HTML", "CSS"]
    },
    {
        title: "Machine Learning & Deep Learning",
        icon: "fas fa-brain",
        skills: ["PyTorch", "CatBoost", "Scikit-Learn", "NumPy", "Pandas", "Matplotlib", "TensorFlow", "Keras", "OpenCV"]
    },
    {
        title: "Web Development",
        icon: "fas fa-globe",
        skills: ["React", "Next.js", "Tailwind CSS", "Node.js", "Streamlit", "Vercel", "REST APIs"]
    },
    {
        title: "Tools & Technologies",
        icon: "fas fa-tools",
        skills: ["Git", "GitHub", "Google Cloud Platform (GCP)", "VS Code", "Jupyter Notebook", "Docker", "WebAR"]
    },
    {
        title: "Soft Skills",
        icon: "fas fa-users",
        skills: ["Team Collaboration", "Leadership", "Problem Solving", "Communication", "Project Management"]
    }
];

export const Skills: React.FC = () => {
    const { ref, isInView } = useInView({ threshold: 0.1 });

    return (
        <section id="skills" className="skills" ref={ref}>
            <div className="container">
                <div className={`reveal ${isInView ? 'active' : ''}`}>
                    <SectionHeader title="Skills & Arsenal" subtitle="The tools and technologies I use to build solutions." />
                </div>

                <div className={`skills-grid stagger-children ${isInView ? 'active' : ''}`}>
                    {skillCategories.map((category, index) => (
                        <Card key={index} className="skill-category-card">
                            <div className="category-header">
                                <i className={`${category.icon} icon text-gradient`}></i>
                                <h3>{category.title}</h3>
                            </div>
                            <div className="skills-list">
                                {category.skills.map((skill, i) => (
                                    <span key={i} className="skill-chip">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
