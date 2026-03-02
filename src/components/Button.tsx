import React from 'react';
import './Button.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: 'primary' | 'secondary' | 'outline';
    href?: string;
    icon?: string;
    children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    href,
    icon,
    children,
    className = '',
    ...props
}) => {
    const baseClass = `btn btn-${variant} ${className}`;

    const content = (
        <>
            {icon && <i className={`${icon} btn-icon`}></i>}
            {children}
        </>
    );

    if (href) {
        return (
            <a href={href} className={baseClass} {...(props as any)}>
                {content}
            </a>
        );
    }

    return (
        <button className={baseClass} {...props}>
            {content}
        </button>
    );
};
