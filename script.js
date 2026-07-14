// Interactive script for theme management, mobile navigation menu, and scroll animations

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. THEME INITIALIZATION & SWITCHER (LIGHT/DARK) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Initialize theme (default to light mode if no preference is saved)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
    } else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
    }

    // Event listener for theme toggle button
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    });


    // --- 2. RESPONSIVE MOBILE MENU ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Open/close mobile menu on toggle click
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    // Close mobile menu automatically when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });


    // --- 3. OTHER EXPERIENCE ACCORDION ---
    const accordionTrigger = document.getElementById('accordion-trigger');
    const accordionContent = document.getElementById('accordion-content');

    if (accordionTrigger && accordionContent) {
        accordionTrigger.addEventListener('click', () => {
            accordionTrigger.classList.toggle('active');
            accordionContent.classList.toggle('open');
        });
    }


    // --- 4. SCROLL ANIMATIONS (INTERSECTION OBSERVER) ---
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    const fadeObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve element once it is animated to optimize performance
                observer.unobserve(entry.target);
            }
        });
    }, fadeObserverObserver = fadeObserverOptions);

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });


    // --- 5. ACTIVE NAV LINK ON SCROLL ---
    const sections = document.querySelectorAll('section[id]');
    
    const navObserverOptions = {
        threshold: 0.2,
        rootMargin: '-80px 0px -50% 0px' // Negative top margin to offset the fixed navbar height
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });


    // Visual hover micro-interaction for the interactive code card
    const codeCard = document.querySelector('.code-card');
    if (codeCard) {
        codeCard.addEventListener('mouseenter', () => {
            codeCard.style.transform = 'translateY(-5px) scale(1.01)';
            codeCard.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.35)';
            codeCard.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        
        codeCard.addEventListener('mouseleave', () => {
            codeCard.style.transform = 'none';
            codeCard.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.25)';
        });
    }

});
