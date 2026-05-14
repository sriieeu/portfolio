// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
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

// Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

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

// Form submission (only when a contact form exists on the page)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name')?.value ?? '';
        const email = document.getElementById('email')?.value ?? '';
        const message = document.getElementById('message')?.value ?? '';

        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Scroll Animation - Fade in elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe project cards and skill items
document.querySelectorAll('.project-card, .skill-category, .timeline-item, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navbar styling on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

// Counter animation for stats (preserves trailing "+" when present)
const stats = document.querySelectorAll('.stat h3');

const animateCounter = (element) => {
    const original = element.textContent.trim();
    const wantsPlus = original.includes('+');
    const target = parseInt(original.replace(/\D/g, ''), 10);
    if (Number.isNaN(target)) return;

    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = wantsPlus ? `${target}+` : String(target);
            clearInterval(counter);
        } else {
            const n = Math.floor(current);
            element.textContent = wantsPlus ? `${n}+` : String(n);
        }
    }, 16);
};

const statsObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                stats.forEach((stat) => {
                    if (!stat.dataset.counted) {
                        stat.dataset.counted = '1';
                        animateCounter(stat);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

const aboutStatsEl = document.querySelector('.about-stats');
if (aboutStatsEl) statsObserver.observe(aboutStatsEl);

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Accessibility: Add focus visible style
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Back to top button
const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.id = 'backToTop';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999;
        transition: transform 0.25s ease, opacity 0.25s ease;
        font-size: 1.2rem;
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-4px) scale(1.05)';
    });

    button.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
};

createBackToTopButton();

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully');
});
