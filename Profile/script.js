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

