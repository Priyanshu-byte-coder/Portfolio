import React from 'react';
import './Card.css';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    hoverEffect = true
}) => {
    return (
        <div className={`card glass-panel ${hoverEffect ? 'card-hover' : ''} ${className}`}>
            {children}
        </div>
    );
};
