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
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offsetTop = targetSection.offsetTop - navbarHeight - 10; // Extra 10px buffer
                
                window.scrollTo({
                    top: offsetTop,
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
    document.body.style.opacity = '1';
    
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

// Update the smooth scroll function to account for fixed navbar
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const offsetTop = targetSection.offsetTop - navbarHeight - 10; // Extra 10px buffer
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll event for navbar styling
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
});

function scrollToProjects() {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const offsetTop = projectsSection.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add this to your existing DOMContentLoaded event listener or create a new one
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in effect for the body
    document.body.style.opacity = '1';
    
    // Smooth scroll for navigation links
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offsetTop = targetSection.offsetTop - navbarHeight - 10;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('navbar-menu');
    const toggle = document.querySelector('.navbar-toggle');
    
    menu.classList.toggle('show');
    //check
    // Change hamburger icon
    const icon = toggle.querySelector('i');
    if (menu.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Enhanced navbar scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll (optional)
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Active nav item highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const navLink = document.querySelector(`a[href="#${section.id}"]`);
        
        if (rect.top <= 100 && rect.bottom >= 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar');
    const menu = document.getElementById('navbar-menu');
    const toggle = document.querySelector('.navbar-toggle');
    
    if (!navbar.contains(event.target) && menu.classList.contains('show')) {
        menu.classList.remove('show');
        const icon = toggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

