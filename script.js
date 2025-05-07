// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Function to start page animations
    function startPageAnimations() {
        // Set initial styles for animation
        document.querySelectorAll('.skill-category, .project-card, .stat-item, .contact-item').forEach(element => {
            element.style.opacity = '1'; // Set initial opacity to 1
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        // Start typing effect
        const typingText = document.querySelector('.hero-text h1');
        if (typingText) {
            const originalHTML = typingText.innerHTML;
            const textToType = "Hey, I'm Priyanshu";
            typingText.innerHTML = '';
            
            let i = 0;
            function typeWriter() {
                if (i < textToType.length) {
                    if (i === 0) {
                        typingText.innerHTML = '<span class="highlight">';
                    }
                    typingText.innerHTML += textToType.charAt(i);
                    if (i === textToType.length - 1) {
                        typingText.innerHTML += '</span>';
                    }
                    i++;
                    setTimeout(typeWriter, 100);
                }
            }
            
            // Start typing effect
            typeWriter();
        }

        // Run animation check
        animateOnScroll();
    }

    // Start animations immediately
    startPageAnimations();

    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-category, .project-card, .stat-item, .contact-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);

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
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
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