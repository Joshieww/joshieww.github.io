document.addEventListener('DOMContentLoaded', function () {
    const typed = document.getElementById('typed');
    const text = typed.dataset.text || '';
    let index = 0;
    function type() {
        if (index <= text.length) {
            typed.textContent = text.substring(0, index);
            index++;
            setTimeout(type, 100);
        }
    }
    type();

    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('section').forEach(sec => observer.observe(sec));
});

