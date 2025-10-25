document.addEventListener('DOMContentLoaded', function () {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme-preference');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        updateThemeIcon('light');
    } else {
        document.body.classList.remove('dark-mode');
        updateThemeIcon('dark');
    }

    // Netflix-style typing animation
    const typed = document.getElementById('typed');
    if (typed) {
        const text = typed.dataset.text || '';
        let index = 0;

        function type() {
            if (index <= text.length) {
                typed.innerHTML = `${text.substring(0, index)}<span class="cursor"></span>`;
                index++;
                setTimeout(type, 100);
            } else {
                typed.innerHTML = `${text}<span class="cursor"></span>`;
            }
        }
        
        setTimeout(type, 500);
    }
    
    // Smooth scroll with enhanced easing
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
            
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            particle.style.left = `${Math.random() * 100}%`;
            
            particle.style.animationDuration = `${Math.random() * 10 + 20}s`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            
            particles.appendChild(particle);
        }
    }

    createParticles();
});

// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('navbar-menu');
    const toggle = document.querySelector('.navbar-toggle');
    
    menu.classList.toggle('show');
    
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
    
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
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
    
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const navLink = document.querySelector(`a[href="#${section.id}"]`);
        
        if (rect.top <= 100 && rect.bottom >= 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar');
    const menu = document.getElementById('navbar-menu');
    const toggle = document.querySelector('.navbar-toggle');
    
    if (!navbar.contains(event.target) && menu && menu.classList.contains('show')) {
        menu.classList.remove('show');
        const icon = toggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Scroll to projects function
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

// Certificate modal functionality with zoom
function openCertModal(element) {
    const img = element.querySelector('img');
    if (img) {
        const modal = document.createElement('div');
        modal.className = 'cert-modal';
        modal.innerHTML = `
            <div class="cert-modal-content">
                <span class="cert-close" onclick="this.parentElement.parentElement.remove();">&times;</span>
                <img src="${img.src}" alt="${img.alt}" class="cert-modal-img">
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // Close on Escape key
        const closeOnEscape = (e) => {
            if (e.key === 'Escape' && modal.parentElement) {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', closeOnEscape);
            }
        };
        document.addEventListener('keydown', closeOnEscape);
    }
}

// Theme Toggle Function
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('theme-preference', isDarkMode ? 'dark' : 'light');
    
    // Update icon
    updateThemeIcon(isDarkMode ? 'light' : 'dark');
    
    // Add animation effect
    const toggle = document.querySelector('.theme-toggle');
    toggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
        toggle.style.transform = 'scale(1)';
    }, 200);
}

// Update theme icon
function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    if (theme === 'light') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme-preference')) {
        const isDark = e.matches;
        if (isDark) {
            document.body.classList.add('dark-mode');
            updateThemeIcon('light');
        } else {
            document.body.classList.remove('dark-mode');
            updateThemeIcon('dark');
        }
    }
});

