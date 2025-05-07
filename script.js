// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Animation handling
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to elements that should animate
    document.querySelectorAll('.skills-grid, .projects-grid, .skill-category, .project-card, .stat-item, .contact-item, .hero-content, .about-content, .timeline-item').forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Project card hover effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Skill item hover effect
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = 'var(--primary-color)';
            item.style.color = 'white';
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.color = 'white';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'var(--background-off)';
            item.style.color = 'var(--text-primary)';
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.color = 'var(--primary-color)';
            }
        });
    });
});