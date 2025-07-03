document.addEventListener('DOMContentLoaded', function () {
    // Netflix-style typing animation
    const typed = document.getElementById('typed');
    const text = typed.dataset.text || '';
    let index = 0;

    function type() {
        if (index <= text.length) {
            typed.innerHTML = `${text.substring(0, index)}<span class="cursor"></span>`;
            index++;
            setTimeout(type, 100);
        } else {
            // Add permanent cursor after typing is complete
            typed.innerHTML = `${text}<span class="cursor"></span>`;
        }
    }
    
    // Smooth scroll with enhanced easing
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced scroll reveal
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.transitionDelay = '0.2s';
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px'
    });

    document.querySelectorAll('section').forEach(sec => observer.observe(sec));
    
    // Start typing animation
    setTimeout(type, 500);

    // Add fade-in effect for the body
    document.body.classList.add('loaded');

    // Add fade-in effect for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.classList.add('fade-in');
        sectionObserver.observe(section);
    });

    // Create particles
    function createParticles() {
        const particles = document.createElement('div');
        particles.className = 'particles';
        document.body.appendChild(particles);

        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size between 2 and 6px
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random starting position
            particle.style.left = `${Math.random() * 100}%`;
            
            // Random animation duration and delay
            particle.style.animationDuration = `${Math.random() * 10 + 20}s`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            
            particles.appendChild(particle);
        }
    }

    createParticles();
});

// Add scroll event for navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

