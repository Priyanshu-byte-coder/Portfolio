import React from 'react';
import './SectionHeader.css';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    alignment?: 'left' | 'center' | 'right';
    className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    alignment = 'center',
    className = '',
}) => {
    return (
        <div className={`section-header align-${alignment} ${className}`}>
            <h2 className="section-title">
                {title.split(' ').map((word, index) => (
                    <span key={index} className={index % 2 !== 0 ? 'text-gradient' : ''}>
                        {word}{' '}
                    </span>
                ))}
            </h2>
            <div className="title-underline"></div>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
    );
};
