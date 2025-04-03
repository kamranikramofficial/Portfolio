document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    // Scroll Animation
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    function checkScroll() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
            }
        });
    }
    checkScroll();

    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    // Skill Progress Animation
    const progressBars = document.querySelectorAll('.progress');

    function animateProgressBars() {
        progressBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            bar.style.width = percent + '%';
        });
    }
    const skillsSection = document.querySelector('.skills');
    
    function checkSkillsVisibility() {
        const skillsPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (skillsPosition < screenPosition) {
            animateProgressBars();
            window.removeEventListener('scroll', checkSkillsVisibility);
        }
    }
    window.addEventListener('scroll', checkSkillsVisibility);
    checkSkillsVisibility();

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            console.log('Form submitted:', { name, email, subject, message });
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});