// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// Scroll Animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.pillar-card, .stat-card, .member-card, .timeline-item').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 11, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 11, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Replace YOUR_FORMSPREE_ID with actual Formspree form ID
    // Or use mailto: fallback
    const formspreeId = 'YOUR_FORMSPREE_ID';
    
    if (formspreeId !== 'YOUR_FORMSPREE_ID') {
        try {
            const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                alert('Thank you for your interest in CLEAR! We will be in touch soon.');
                contactForm.reset();
            } else {
                alert('There was an issue sending your message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an issue sending your message. Please try again.');
        }
    } else {
        // Fallback: mailto link
        const subject = encodeURIComponent(`CLEAR Inquiry from ${data.name}`);
        const body = encodeURIComponent(
            `Name: ${data.name}\n` +
            `Email: ${data.email}\n` +
            `Affiliation: ${data.affiliation}\n` +
            `Interest: ${data.interest}\n\n` +
            `Message:\n${data.message}`
        );
        window.location.href = `mailto:clear@africanlanguageslab.com?subject=${subject}&body=${body}`;
        alert('Opening your email client to send the message...');
        contactForm.reset();
    }
});

// Add loading state to buttons
document.querySelectorAll('button[type="submit"], .btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            const originalText = this.textContent;
            this.classList.add('loading');
            this.dataset.originalText = originalText;
            
            setTimeout(() => {
                this.classList.remove('loading');
            }, 2000);
        }
    });
});
