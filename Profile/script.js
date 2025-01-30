document.addEventListener("DOMContentLoaded", function () {
    let header = document.querySelector("header");
    header.style.opacity = "0";
    setTimeout(() => {
        header.style.transition = "opacity 1s ease-in-out";
        header.style.opacity = "1";
    }, 500);

    let about = document.querySelector(".about");
    about.style.opacity = "0";
    setTimeout(() => {
        about.style.transition = "opacity 1s ease-in-out";
        about.style.opacity = "1";
    }, 800);

    // Smooth scrolling animation for navbar links
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50, // Adjust offset for navbar
                    behavior: 'smooth'
                });

                // Add fade-in effect on scroll
                targetSection.style.opacity = "0";
                setTimeout(() => {
                    targetSection.style.transition = "opacity 0.8s ease-in-out";
                    targetSection.style.opacity = "1";
                }, 300);
            }
        });
    });
});
